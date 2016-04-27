/**
 * Created by lhb on 15/9/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var playerManager = require("../playerManager.js");

module.exports = function(app) {
    return new PlayerRemote(app);
};

var PlayerRemote =  function(app) {
    this.app = app;
//    this.channelService = app.get('channelService');
};

var proto = PlayerRemote.prototype;

proto.login = function(pid, loginType,cb) {
    Db.Player.findOne({_id:pid},{pkMessages:0, equips:0}, function(err, player) {
        if (err || !player) {
            return Util.invokeCallback(cb);
        }
        var ins = playerManager.getPlayer(pid);
        if (ins) {
            playerManager.movePlayerFromRemoveToActive(pid);
        } else {
            ins = playerManager.addPlayer(player.toObject());
        }
        ins.loginType = loginType;
        var data = ins.strip();
        data.id = player.id;
        data.diamond = player.diamond;
        data.friends = player.friends;
        data.monthCardTime = player.monthCardTime;
        data.supMonthCardTime = player.supMonthCardTime;
        data.isNewbiePackageBought = player.isNewbiePackageBought;
        data.purchaseCount = player.purchaseCount;
        data.purchaseNum = player.purchaseNum;
        data.subscribed = player.subscribed;
        //data.isSubscribed = player.isSubscribed;
        data.protectExpire = player.protectExpire;
        data.isBanned = player.isBanned;
        data.dailyTask = data.dailyEvent;
        // log.info("player dailyEvent: ", data.dailyEvent);
        data.guild = player.guild;
        data.isBoughtLifeCard = player.isBoughtLifeCard;
        data.getLifeCardDailyDiamondTime = player.getLifeCardDailyDiamondTime;

        log.info("[LifeCard], player is bought life card=" + player.isBoughtLifeCard + ", get life card daily diamond time=" + player.getLifeCardDailyDiamondTime);

        data.goldEggsHammersNum = player.goldEggsHammersNum;
        data.goldEggsPurchaseNum = player.goldEggsPurchaseNum;

        //log.info("[goldEggs], player goldEggsHammersNum=" + player.goldEggsHammersNum + ", goldEggsPurchaseNum=" + player.goldEggsPurchaseNum + ", goldEggsTotalReward=" + player.dailyEvent.goldEggsTotalReward);
        data.firstPurchaseGiftTime = player.firstPurchaseGiftTime;

        // 增加下发服务器时间;
        data.sysTime =  Date.now();

        delete data.pkMessages;
        delete data.goldEggsRewardIdx;

        Util.invokeCallback(cb, data);
    }.bind(this));
};

proto.join = function(player, cb) {
    var player = playerManager.addPlayer(player);
    Util.invokeCallback(cb, player.strip());
};

proto.getPlayer = function(pid, cb) {
    var player = playerManager.getPlayer(pid);
    if (!player) {
        Util.invokeCallback(cb);
    } else {
        Util.invokeCallback(cb, player.strip());
    }
};

proto.setAttackerPKResult = function(pid, data, cb) {
    var player = playerManager.getPlayer(pid);
    if (player) {
        player.addEquipExp(data.exp);
        player.addMoney(data.fragment, 'fragment', 'pk');
        player.costMorale({num: data.moraleCost});
        if (data.deadId) {
            player.heroes[data.deadId].revivalTime = data.revivalTime;
        }
    }
    Util.invokeCallback(cb);
};

proto.incZodiacTimes = function(pid, cb) {
    var player = playerManager.getPlayer(pid);
    if (player) {
        player.checkDailyEventTime();
        player.dailyEvent.zodiacTimes ++;
        Util.invokeCallback(cb, null);
    }
    Util.invokeCallback(cb, "玩家不存在");
};

proto.getAllPlayerIds = function(cb) {
    var ids = playerManager.getAllPlayerIds();
    Util.invokeCallback(cb, ids);
};

proto.setPkResult = function(pid, result, msg, cb) {
    var player = playerManager.getPlayer(pid);
    if (player) {
        player.pkByOtherPlayer(result, msg);
        var user = {uid: pid, sid: player.frontendId};
        delete result.detail;
        app.channelService.pushMessageByUids("beated", {result: result}, [user], function() {});
        Util.invokeCallback(cb, {online:true});
    } else {
        Util.invokeCallback(cb, {online:false});
    }
};

proto.costMoney = function(pid, num, type, reason, cb) {
    var player = playerManager.getPlayer(pid);
    if (!!player) {
        player.costMoney(num, type, reason);
    }
    Util.invokeCallback(cb);
};

proto.addMoney = function(pid, num, type, reason, cb) {
    var player = playerManager.getPlayer(pid);
    if (!!player) {
        player.addMoney(num, type, reason);
    }
    Util.invokeCallback(cb);
};

proto.pushMessageToClient = function(pid, route, msg, cb) {
    var player = playerManager.getPlayer(pid);
    if (player) {
        var user = {uid: pid, sid: player.frontendId};
        app.channelService.pushMessageByUids(route, msg, [user], cb);
    } else {
        Util.invokeCallback(cb);
    }
};

proto.kick = function(playerId, cb) {
    playerManager.removePlayer(playerId);
    Util.invokeCallback(cb);
};

