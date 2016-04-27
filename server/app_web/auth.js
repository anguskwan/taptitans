var url = require('url');
var request = require('request');
var qs = require('querystring');
var mysql = require("mysql");
var moment = require('moment');
var activityHelper = require("./../util/activityHelper");
var http = require('./../util/http');
var tokenUtil = require('./../util/token');

var mysql_connection = null;
if (!!Conf.get("main:mysql_channel"))
    mysql_connection = mysql.createConnection("mysql://" + Conf.get("main:mysql_channel"));

var isDouble11 = function() {
    //var d = new Date();
    //return d.getDate() == 22 && d.getMonth() == 1;
    return activityHelper.hasActivityOpened(activityHelper.activityType.FIRST_RECHARGE_DOUBLE_DIAMOND);
};

var isChristmas = function() {
    //var d = new Date();
    //var day = d.getDate();
    //var month = d.getMonth();
    //return month == 0 && day < 4 && day > 0;
    return activityHelper.hasActivityOpened(activityHelper.activityType.RECHARGE_GIFT);
};

var isInLifeCardActivity = function() {
    //var d = new Date();
    //var day = d.getDate();
    //var month = d.getMonth() + 1;
    //
    //log.info("[LifeCard], day=" + day + ", month=" + month);
    //return month == 3 && day <= 18;
    return activityHelper.hasActivityOpened(activityHelper.activityType.LIFE_CARD);
};

/**
 * 是否在成长基金活动中
 * @returns {boolean}
 */
var isInGrowthFundActivity = function(){
    return activityHelper.hasActivityOpened(activityHelper.activityType.GROWTH_FUND);
};

/**
 * 是否在首充3元礼包活动中;
 * @returns {boolean}
 */
var isInFirstRechargeGift = function(){
    return activityHelper.hasActivityOpened(activityHelper.activityType.FIRST_RECHARGE_GIFT);
};

/**
 * 是否在砸金蛋活动中;
 * @returns {boolean}
 */
var isInSmashingGoldenEggs = function(){
    return activityHelper.hasActivityOpened(activityHelper.activityType.SMASHING_GOLDEN_EGGS);
};

/**
 * 是否在砸金蛋活动中;
 * @returns {boolean}
 */
var isInMonthCardActivity = function(){
    return activityHelper.hasActivityOpened(activityHelper.activityType.MONTH_CARD);
};

/**
 * 更新砸金蛋活动信息;
 * @param playerId              角色ID
 * @param goldEggsPurchaseNum   锤子剩余充值数
 * @param consNow               当前充值金额
 * @param lastPurchaseTime      最后充值时间
 */
var updateGoldenEggs = function(playerId, goldEggsPurchaseNum, consNow, lastPurchaseTime){
    // 活动是否开启;
    if (!isInSmashingGoldenEggs()) return;

    var eggAct = activityHelper.getActivityInfo(activityHelper.activityType.SMASHING_GOLDEN_EGGS);
    if (!eggAct) return;

    // 如果不是今天充值的，则将今天的锤子数量重置为0;
    if (!moment().isSame(moment(lastPurchaseTime), 'day')){
        goldEggsPurchaseNum = 0;
    }

    // 查看今天锤子是否达到上限;
    if (!eggAct.maxHammer || isNaN(eggAct.maxHammer)) eggAct.maxHammer = activityHelper.defaultVal.GoldenEggs_Max_Hammer;
    if (!eggAct.exchange) eggAct.exchange = {};
    if (!eggAct.exchange.from || isNaN(eggAct.exchange.from)) eggAct.exchange.from = activityHelper.defaultVal.GoldenEggs_Exchange_From;
    if (!eggAct.exchange.to || isNaN(eggAct.exchange.to)) eggAct.exchange.to = activityHelper.defaultVal.GoldenEggs_Exchange_To;

    var maxPurchaseNum = eggAct.maxHammer * eggAct.exchange.from;
    if (goldEggsPurchaseNum >= maxPurchaseNum) {
        log.info("[updateGoldenEggs] the hammers has reached the upper limit:" + eggAct.maxHammer);
        return;
    }
    if ((goldEggsPurchaseNum + consNow) > maxPurchaseNum){
        consNow = maxPurchaseNum - goldEggsPurchaseNum;
        goldEggsPurchaseNum = maxPurchaseNum;
    } else {
        goldEggsPurchaseNum += consNow;
    }

    // 计算本次充值金额，能够兑换的锤子;
    var addEggsHammersNum = 0;
    if (goldEggsPurchaseNum >= eggAct.exchange.from) {
        addEggsHammersNum = (Math.floor(goldEggsPurchaseNum / eggAct.exchange.from) - Math.floor((goldEggsPurchaseNum - consNow) / eggAct.exchange.from)) * eggAct.exchange.to;
    }
    Db.Player.update({_id: parseInt(playerId)}, {$set: {goldEggsPurchaseNum:goldEggsPurchaseNum}, $inc:{goldEggsHammersNum:addEggsHammersNum}}, function(err){
        if (!!err){
            log.info("[updateGoldenEggs] occur error.");
        }
        log.info("[updateGoldenEggs], in activity, set the player=" + playerId + ", goldEggsPurchaseNum=" + goldEggsPurchaseNum + ", add goldEggsHammersNum=" + addEggsHammersNum);
    });
};

if (!!mysql_connection)
    mysql_connection.connect();

module.exports = function(server) {
    /**
     * 获取用户信息
     * @param data      获取信息
     * @param next      回调
     */
    var getUserInfo = function(data, next){
        log.info(JSON.stringify(data));
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        http.request(http.resolve(route_url , "/taptitans-route/getUserInfo"), {
            method : "post",
            data : data
        }, function(err, data){
            if (!!err || _.isEmpty(data)){
                next("getUserInfo error");
            } else {
                next(null, data);
            }
        });
    };

    /**
     * 获取角色ID
     * @param data
     * @param next
     */
    var getPlayerId = function(data, next){
        var playerExists = false;
        var playerId;
        async.waterfall([
            function(callback){
                Db.rds.login.get(data.openId, callback);
            },
            function(id, callback){
                if(id) {
                    // 老用户;
                    playerExists = true;
                    playerId = parseInt(id);
                    callback(null, {id: playerId});
                } else {
                    // 新用户;
                    var channel = null;
                    async.waterfall([
                        function(cb) {
                            //log.info(JSON.stringify(data));
                            getUserInfo(data, cb);
                        },
                        function(userInfo, cb) {
                            channel = userInfo.channel;
                            Db.createPlayer(userInfo, cb);
                        },
                        function(player, affected, cb) {
                            log.info(_.sprintf("[AuthIndex] player id:%d, openId:%s", player.id, player.uniqueId));
                            playerId = player.id;

                            if (channel == "hortor"){
                                if (!!mysql_connection){
                                    mysql_connection.query({
                                            sql: "INSERT INTO `gamecenter`.`channel`(`open_id`,`game_id`,`channel`,`created_at`) VALUES(?,?,?,?)"
                                        },
                                        [data.openId, "taptitans", data.channel, moment().unix()],
                                        function(err){
                                            if(err) {
                                                log.info("insert channel failed, err:" + err);
                                            }
                                            return cb();
                                        });
                                } else {
                                    cb();
                                }
                            } else {
                                cb();
                            }
                        }
                    ], callback);
                }
            }
        ], function(err){
            if (!!err){
                next(err, null);
                return;
            }
            log.info(_.sprintf("[getPlayerId] player id:%d, openId:%s", playerId, data.openId));

            //var encryptedId = helper.encryptCookie(playerId);

            //var cookie = _.sprintf("encryptedId=%s;max-age=7200", encryptedId);
            //res.header("Set-Cookie", cookie);
            next(null, {playerId:playerId});
        });
    };

    server.get('/taptitans/index', function(req, res, next) {
        // 跳转到路由服务器;
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        res.header("Location", _.sprintf("%s?channel=%s", route_url + "/index", req.query.channel || ""));
        res.sendStatus(302);
        next();
    });

    server.get('/taptitans/login', function(req, res, next){
        if (!req.query.userToken){
            log.info("没有定义user token.");
            res.sendStatus(401);
            return next();
        }
        var token = tokenUtil.parse(req.query.userToken, Conf.get("web:route_secret"));
        if (!token){
            log.info("无法解析user token.");
            res.sendStatus(401);
            return next();
        }
        if (Date.now() - token.timestamp > 60000){
            // 过期
            log.info("user token过期.");
            res.sendStatus(401);
            return next();
        }
        getPlayerId({
            openId : token.uid,
            channel : token.channel,
            userToken : token.channelToken
        }, function(err, playerId){
            if(err || !playerId){
                log.info("发生错误:%j,或者无法找到player id.", err);
                res.sendStatus(401);
                return next();
            }
            res.send(playerId);
            next();
        });
    });

    server.get('/taptitans/share', function(req, res, next) {
        // 跳转到路由服务器;
        var channel = req.query.channel;
        if (!channel){
            channel = 'hortor';
        }
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        log.info(_.sprintf("%s?channel=%s", route_url + "/share", channel));
        res.header("Location", _.sprintf("%s?channel=%s", route_url + "/share", channel));
        res.sendStatus(302);
        next();
    });

    server.get('/taptitans/cookie', function(req, res, next) {
        var channel = req.query.channel;
        if (!channel){
            channel = 'hortor';
        }
        // 跳转到路由服务器;
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        log.info(_.sprintf("route url:%s",_.sprintf("%s?channel=%s&openId=%s", route_url + "/cookie", channel, req.query.openId || "")));
        res.header("Location", _.sprintf("%s?channel=%s&openId=%s", route_url + "/cookie", channel, req.query.openId || ""));
        res.sendStatus(302);
        next();
    });

    server.get('/taptitans/remove-cookie', function(req, res, next) {
        // 跳转到路由服务器;
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        res.header("Location", _.sprintf("%s", route_url + "/remove-cookie"));
        res.sendStatus(302);
        next();
    });

    server.get('/taptitans/get-config', function(req, res, next){
        if(!req.query.url) {
            return next(new MissingParamError("url"));
        }
        // 跳转到路由服务器;
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        res.header("Location", _.sprintf("%s?url=%s", route_url + "/get-config", req.query.url));
        res.sendStatus(302);
        next();
    });

    var goods = {
        "301": {
            name:"180钻石",
            type: "diamond",
            diamond: 259
        },
        "302": {
            name:"500钻石",
            type: "diamond",
            diamond: 648
        },
        "303": {
            name:"1200钻石",
            type: "diamond",
            diamond: 1469
        },
        "304": {
            name:"3100钻石",
            type: "diamond",
            diamond: 3629
        },
        "305": {
            name:"6500钻石",
            type: "diamond",
            diamond: 7085
        },
        "306": {
            name:"14000钻石",
            type: "diamond",
            diamond: 14000
        },
        "311": {
            name:"月卡",
            type: "package"
        },
        "312": {
            name:"新手礼包",
            type:"package",
            diamond: 300
        },
        "313": {
            name:"至尊月卡",
            type: "package"
        },
        "314": {
            name:"终身月卡",
            type: "package"
        },
        "315": {
            name:"三元礼包",
            type: "package"
        }

    };

    server.post('/taptitans/update-subscribe', function(req, res, next){
        // 过期;
        next();
        //var openId = req.body.openId;
        //var status = req.body.status;
        //if(!openId || !status) {
        //    return next(new MissingParamError("openId or status"));
        //}
        //var player;
        //async.waterfall([
        //    function(cb) {
        //        Db.Player._getModel("").find({uniqueId: openId}, cb);
        //    },
        //    function(p, cb) {
        //        if(_.isEmpty(p)) {
        //            return cb("USER_NOT_EXISTS");
        //        }
        //        player = p[0];
        //        if(status == "true" && !player.isSubscribed) {
        //            Db.Player._getModel("").update({uniqueId: openId}, {$set: {isSubscribed: true}, $inc: {diamond: 100}}, cb);
        //        }
        //        else {
        //            return cb();
        //        }
        //    }
        //], function(err){
        //    if(err) return next(err);
        //    res.send({
        //        lastestLoginAt: Math.floor(player.lastTimeLogout.getTime() / 1000)
        //    });
        //    next();
        //});
    });

    server.post('/taptitans/add-goods', function(req, res, next){
        var openId = req.body.openId;
        var goodsId = req.body.goodsId;
        if(!openId || !goodsId) {
            return next(new MissingParamError("openId or goodsId"));
        }
        var goodsRule = goods[goodsId];
        var diamond = goodsRule.diamond;
        var meta = Conf.payment[goodsId];
        log.stats("玩家充值", {
            openId : openId,
            goodsId: goodsId
        });
        async.waterfall([

                function(callback) {
                    Db.rds.login.get(openId, callback);
                },
                function(playerId, callback) {
                    Db.Player.findById(parseInt(playerId), function(err, player) {
                        var count = player.purchaseCount[goodsId];
                        if (diamond && (!count || isDouble11()) && goodsRule.type == 'diamond') {
                            log.stats("首冲双倍", {playerId:playerId, openId:openId, goodsId:goodsId, isDouble11: isDouble11()});
                            diamond *= 2;
                        }
                        if (meta) {
                            var cost = meta.cost;
                            Db.incBy("gross-server"+player.serverId, cost, function() {});
                            Db.incBy("gross-"+moment().format('YYYY-MM-DD')+"-server"+player.serverId, cost, function() {});
                        }
                        callback(null, player);
                    });
                },
                function(player, callback) {
                    var playerId = player.id;
                    var cost = 0;
                    if (meta) {
                        cost = meta.cost;
                    }
                    var lastPurchaseTime = player.purchaseTime;
                    var count = player.purchaseCount || {};
                    count[goodsId] = count[goodsId] || 0;
                    count[goodsId]++;
                    Db.Player.update({_id:parseInt(playerId)}, {$set: {purchaseTime:new Date()}}, function() {});
                    if (isChristmas()) {
                        activityHelper.getPlayerRefreshActivityInfo(playerId, activityHelper.activityType.RECHARGE_GIFT, function(err, activity){
                            activity.purchase.count += cost;
                            activity.markModified('purchase');
                            activity.save();
                        });
                    }
                    if (isInGrowthFundActivity()){
                        activityHelper.getPlayerRefreshActivityInfo(playerId, activityHelper.activityType.GROWTH_FUND, function(err, activity){
                            activity.growthFund.purchase += cost;
                            activity.markModified('growthFund');
                            activity.save();
                        });
                    }
                    if(goodsRule.type == "diamond") {
                        Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: diamond, purchaseNum:cost}, $set:{purchaseCount:count}}, callback);
                    }
                    else if(goodsId == "311") {
                        if (isInMonthCardActivity()){
                            log.info("[311 LifeCard], in activity, add the player=" + playerId + " " + 188 + " diamond");
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: 188, purchaseNum:cost}, $set: {monthCardTime: new Date().getTime(), purchaseCount:count}}, callback);
                        } else {
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {purchaseNum:cost}, $set: {monthCardTime: new Date().getTime(), purchaseCount:count}}, callback);
                        }
                    }
                    else if(goodsId == "312") {
                        Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: diamond, purchaseNum:cost}, $set:{isNewbiePackageBought: true, purchaseCount:count}}, callback);
                    }
                    else if(goodsId == "313") {
                        if (isInMonthCardActivity()){
                            log.info("[313 LifeCard], in activity, add the player=" + playerId + " " + 888 + " diamond");
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: 888, purchaseNum:cost}, $set: {supMonthCardTime: new Date().getTime(), purchaseCount:count}}, callback);
                        } else {
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {purchaseNum:cost}, $set: {supMonthCardTime: new Date().getTime(), purchaseCount:count}}, callback);
                        }
                    }
                    else if(goodsId == "314") {
                        if (isInLifeCardActivity()) {
                            log.info("[314 LifeCard], in activity, add the player=" + playerId + " " + 1888 + " diamond");
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: 1888, purchaseNum:cost}, $set: {isBoughtLifeCard: true, purchaseCount:count}}, callback);
                        } else if (isInMonthCardActivity()){
                            log.info("[314 LifeCard], in activity, add the player=" + playerId + " " + 1888 + " diamond");
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {diamond: 1888, purchaseNum:cost}, $set: {isBoughtLifeCard: true, purchaseCount:count}}, callback);
                        }
                        else {
                            log.info("[LifeCard], not in activity add the player=" + playerId);
                            Db.Player.update({_id: parseInt(playerId)}, {$inc: {purchaseNum:cost}, $set: {isBoughtLifeCard: true, purchaseCount:count}}, callback);
                        }
                    }
                    else if (goodsId == "315"){
                        if (isInFirstRechargeGift()) {
                            log.info("[firstPurchaseGift],in activity, add the player=" + playerId);
                            Db.Player.update({_id: parseInt(player.id)}, {$set: {firstPurchaseGiftTime: new Date().getTime()}}, callback);
                        } else {
                            log.info("[firstPurchaseGift],not in activity, add the player=" + playerId);
                        }
                    }
                    updateGoldenEggs(playerId, player.goldEggsPurchaseNum, cost, lastPurchaseTime);
                }
            ], function(err, player){
                if(err) return next(err);
                res.send({});
                next()
            });

    });

};
