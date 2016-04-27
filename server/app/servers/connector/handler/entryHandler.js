module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
    app.userInfo = {};
    app.loginUsers = {};
};

var handler = Handler.prototype;

//var IPIP = require('ipip').IPIP;
//var ipip = new IPIP();
var moment = require("moment");
/**
 * new user enter, bind to session
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {void}
 */
handler.enter = function(msg, session, next) {
    if (!msg.playerId) {
        log.info("[enter] 参数错误", msg);
        next(null, {code: 500, error: true, msg: 'missing playerId'});
        return;
    }
    var app = this.app;
    var player;
    if (app.loginUsers[msg.playerId]) {
        log.info("[Enter] 上次未登出", {playerId:msg.playerId});
//        delete app.loginUsers[msg.playerId];
        next(null, Const.kErrorDuplicatedLoginError);
        return;
    }
    app.loginUsers[msg.playerId] = true;
    var sessionService = app.get('sessionService');
    async.waterfall([
        function(cb) {

            // 重复登录 把已经登录的session踢下线
            app.rpc.player.playerRemote.login(msg.playerId, msg.playerId, msg.loginType, function(player) {
                if(!player) return cb(Const.kErrorPlayerNotExist);
                var user = {uid: msg.playerId, sid: app.serverId};
                app.channelService.pushMessageByUids("kicked", {msg: "重复登陆"}, [user], function() {
                    cb(null, player);
                });
            });
        },
        function(p, cb) {
            player = p;
            session.bind(player.id);
            session.set("gameServerId", player.serverId);
            session.pushAll(cb);
        }
    ], function(err) {
        session.on('closed', onUserLeave.bind(null, app));
        if (msg.playerId) {
            delete app.loginUsers[msg.playerId];
        }
        if(err) {
            log.info("[Enter] 进入游对战大厅出错", {err: err, msg: msg});
            return next(null, { code: err.code, error: true, msg: err.msg});
        }
        if (player.isBanned) {
            return next(null, {show: true, msg:"该账号已经被禁止使用"});
        }
        log.stats("用户登录", {playerId: player.id, ip: sessionService.getClientAddressBySessionId(session.id).ip});
        app.userInfo[player.id] = Util.logPlayer(player);
        Db.rds.dailyActive.sadd("daily-active-"+moment().format('YYYY-MM-DD'), player.uniqueId, function(err, added) {
            if(err) {log.info("daily-active 出错");}
        });
        Db.rds.dailyActive.sadd("daily-active-"+moment().format('YYYY-MM-DD')+"-server"+player.serverId, player.uniqueId, function(err, added) {
            if(err) {log.info("daily-active 出错");}
        });
        next(null, Util.packageRes(player));
    });
};

handler.create = function(msg, session, next) {
    var app = this.app;
    if (env != "development") {
        return next(500);
    }
    if (msg.playerId) {
        return next(null, Const.kErrorInvalidParam);
    }
    var player;
    async.waterfall([

        function(cb) {
            Db.createPlayer({}, cb);
        },
        function(p, affectedRows, cb) {
            if(_.isFunction(affectedRows)) cb = affectedRows;
            player = p;
            if(!player) return cb(Const.kErrorPlayerNotExist);
            session.bind(player.id);
            session.set("gameServerId", player.serverId);
            session.pushAll(cb);
        }
    ], function(err) {
        if(err) {
            log.info("[Enter] 进入游对战大厅出错", {err: err, msg: msg});
            return next(null, { code: err.code, error: true, msg: err.msg});
        }
        log.info("用户登录", {playerId: player.id});
        app.userInfo[player.id] = Util.logPlayer(player);
        app.rpc.player.playerRemote.join(session.uid, player, function(target) {
            target.id = player.id;
            target.diamond = player.diamond;
            target.monthCardTime = player.monthCardTime;
            target.isNewbiePackageBought = player.isNewbiePackageBought;
            target.purchaseCount = player.purchaseCount;
            target.isSubscribed = player.isSubscribed;
            target.guild = player.guild;
            target.dailyTask = player.dailyTask;
            target.sysTime =  Date.now();
            session.on('closed', onUserLeave.bind(null, app));
            next(null, Util.packageRes(target));
        });
    });
};

var onUserLeave = function(app, session, reason) {
    if (!session || !session.uid) {
        return;
    }
    if (!app.get('sessionService').getByUid(session.uid)) {
        app.rpc.player.playerRemote.kick(session.uid, session.uid, function() {});
    }
    delete app.userInfo[session.uid];
    delete app.loginUsers[session.uid];
    log.stats("用户登出", {playerId: session.uid});
};

//app.foo = function() {
//    var db = app.dbModule;
//    db.Player.update({_id:38}, {$push: {mailbox: {$each:[{id:5, read:0, get:0}]}}}, function(err) {
//        log.info(err);
//    });
//    return true;
//};