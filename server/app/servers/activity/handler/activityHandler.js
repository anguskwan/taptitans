/**
 * Created by lhb on 15/12/22.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var activityHelper = require("./../../../../util/activityHelper");

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.catGo = function(msg, session, next) {
    if (!Util.isCatTime()) {
        return next(null, {code:10000, msg:"日期不正确", show:true});
    }

    var uid = session.uid;
    var times = 0;
    async.waterfall([
        function(cb) {
            Db.activity.findOne({_id:uid}, {cat:1}, cb);
        },
        function(activity, cb) {
            times = activity.cat.times;
            Db.Player.findOne({_id:uid}, {diamond:1, vip:1, id:1}, cb);
        },
        function(player, cb) {
            var meta = Conf.activityCat[times+1];
            if (!meta) {
                return cb("没有数据");
            }
            var cost = meta.cost;
            if (player.diamond < cost) {
                return cb("钻石不足");
            }
            if (player.vip < meta.limit) {
                return cb("vip等级不够");
            }
            Db.activity.update({_id:uid}, {$inc:{"cat.times":1}}, function(err) {
                if (err) {
                    return cb(err);
                }
                var val = Util.randomInt(Math.ceil(cost*1.2), Math.ceil(meta.max*0.8));
                if (Util.randomRate(0.02)) {
                    val = Util.randomInt(Math.ceil(meta.max * 0.8), meta.max);
                }
                log.stats("招财猫", {val: val, playerId:uid, times:meta.id});
                //player.diamond += (val - cost);
                //player.save(cb);
                app.rpc.player.playerRemote.costMoney(uid, uid, cost, "diamond", "cat go", function(){});
                app.rpc.player.playerRemote.addMoney(uid, uid, val, "diamond", "cat go", function(){});
                cb();
            });
        }
    ], function(err) {
        if (err) {
            return next(null, {code:10000, msg:err, show:true});
        }
        return next(null, Util.packageRes({result:true}));
    })
};

handler.catInfo = function(msg, session, next) {
    activityHelper.getPlayerRefreshActivityInfo(session.uid, activityHelper.activityType.CAT_GO, function(err, info){
        if (!!err || !info){
            next(null, {code:10000, msg:"get cat activity info err."});
        } else {
            next(null, Util.packageRes(info.cat));
        }
    });
};

handler.purchaseInfo = function(msg, session, next) {
    activityHelper.getPlayerRefreshActivityInfo(session.uid, activityHelper.activityType.RECHARGE_GIFT, function(err, info){
        if (!!err || !info){
            next(null, {code:10000, msg:"get purchase activity info err."});
        } else {
            next(null, Util.packageRes(info.purchase));
        }
    });
};

handler.diamondInfo = function(msg, session, next) {
    activityHelper.getPlayerRefreshActivityInfo(session.uid, activityHelper.activityType.TOTAL_DIAMOND_CONSUMPTION, function(err, info){
        if (!!err || !info){
            next(null, {code:10000, msg:"get diamond activity info err."});
        } else {
            next(null, Util.packageRes(info.diamond));
        }
    });
};

handler.growthFundInfo = function(msg, session, next){
    var activity = null;
    async.waterfall([
        function(callback){
            activityHelper.getPlayerRefreshActivityInfo(session.uid, activityHelper.activityType.GROWTH_FUND, callback);
        },
        function(info, callback){
            if (!info){
                next(null, {code:10000, msg:"get growth fund activity info err."});
                return;
            }
            activity = info;
            var limit = Conf.growthFundMinRMBLimit;
            if (!limit || isNaN(limit)) limit = activityHelper.defaultVal.Growth_Fund_Min_RMB;
            //console.warn("limit:" + limit);
            // 不满足条件;
            if (!activity.growthFund.purchase || activity.growthFund.purchase < limit){
                next(null, Util.packageRes(activity.growthFund));
                return;
            }
            Db.Player.findByIdWithFields(session.uid, ['highestStage'], callback);
        },
        function(player, callback){
            if (!player){
                next(null, Util.packageRes(activity.growthFund));
                return;
            }
            //console.warn("player:" + JSON.stringify(player));
            var iStages = [];
            for (var i = 0, j = activity.growthFund.statusArr.length; i < j; ++i){
                if (!activity.growthFund.statusArr[i]) continue;
                iStages.push(activity.growthFund.statusArr[i].id);
            }
            //console.warn("iStages:" + JSON.stringify(iStages));
            var save = false;
            for (var stageId in Conf.activityGrowthFund){
                if (!Conf.activityGrowthFund.hasOwnProperty(stageId)) continue;
                if (!Conf.activityGrowthFund[stageId]) continue;
                var iStageId = parseInt(stageId);
                var iStage = parseInt(Conf.activityGrowthFund[stageId].level);
                //console.warn("iStageId:" + iStageId);
                //console.warn("level:" + iStage);
                if (!iStage || isNaN(iStage) || !iStageId || isNaN(iStageId)) continue;
                if (iStages.indexOf(iStageId) >= 0) continue;
                if (iStage > player.highestStage) continue;
                //console.warn("iStage > player.highestStage:" + (iStage > player.highestStage));
                if (!save) save = true;
                activity.growthFund.statusArr.push({
                    id : iStageId,
                    status: consts.kGrowthFundStatus.Can_Gain
                });
            }
            //console.warn("activity:" + JSON.stringify(activity));
            if (!!save){
                activity.markModified('growthFund');
                activity.save(callback);
            }
            else
                callback(null);
        }
    ], function(err){
        if (!!err){
            next(null, {code:10000, msg:"get growth fund activity info err."});
            return;
        }
        next(null, Util.packageRes(activity.growthFund));
    });
};

handler.activityInfo = function(msg, session, next) {
    var type = msg.type;
    if (type === "cat"){
        this.catInfo(msg, session, next);
    } else if (type === "recharge"){
        this.purchaseInfo(msg, session, next);
    } else if (type === "diamond") {
        this.diamondInfo(msg, session, next);
    } else if (type === "growth_fund"){
        this.growthFundInfo(msg, session, next);
    } else {
        next(null, {code:10000, msg:"get activity info err."});
    }
};