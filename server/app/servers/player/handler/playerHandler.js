/**
 * Created by lhb on 15/9/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var playerManager = require("../playerManager");

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

var checkApi = function(name) {
    var sync = ["killTitan", "gainAchievementReward", "goldRain", "masterUpgrade", "masterUpgradeSkill", "useSkill",
        "prestige", "addNewHero", "heroUpgrade", "heroUnlockSkill", "buyNextArtifact", "artifactUpgrade", "powerOfHolding",
        "guardianShield", "refreshSkill", "getDailyBossInfo", "killDailyBoss", "useWeaponItem", "collectOfflineGold",
        "getDailyMonthCardDiamond", "handOfMidasTap", "setTutorialFinish", "prestigeByDiamond", "cheatMoney", "resetArtifact",
        "isContestAvailable", "autoTap", "buyTenTimes", "buyMorale", "updateMorale", "getPKMessage", "addEnemy", "addEnemyLimit",
        "delEnemy", "getServerTime", "revivalHero", "costMorale", "fightEnemy", "revengeFinish", "getDailySupMonthCardDiamond", "getDailyLifeCardDiamond",
        "createGuild", "buyGuildGold", "buyGuildWeapon", "getDailyPurchaseGiftBag", "getVipLevel", "resetWeapon", "getVipGift",
        "donate", "getDailyRelic", "setMasterEquips", "cheatExp", "getDailyReward", "redEnvelope", "shareTimeline", "buyMarketItem",
        "refreshMarket","joinZodiac","gainDailyTaskReward","refreshDailyTask", "gainShareReward", "buyTreasureChest"

    ];

    var async = ["getMonthCardTime", "addFriend", "updateDiamond", "useCoupon", "joinContest", "getContestReward",
        "fightOpponent", "breakProtect", "queryEnemyInfo", "getSupMonthCardTime", "getIsBoughtLifeCard", "getMails", "readMail", "getMailAttachments",
        "joinHardContest", "getWarRewardNum", "getGuildWarReward", "checkIfHasPurchaseGiftBag", "getActivityReward",
        "evolutionEquip", "buyTenEquip", "buyEquip", "queryEquips", "updateEquipValue", "getEnvelope", "getActivityDiamondReward",
        "fightZodiacOpponent","zodiacGuildsRankingList","zodiacMyGuildRanking","zodiacPlayerRankingList", "getZodiacReward","delMail",
        "getGoldenEggsInfo", "smashingGoldenEggs", "getActivityFirstPurchaseGift", "gainActivityFirstPurchaseGift", "refreshActivityFirstPurchaseGift",
        "personalThreeFinish","gainSubscribeReward", "gainNewPlayerGiftBag", "gainGrowthFundAward", "getPetPkList"
    ];
    if(_.contains(sync, name)) {
        return 'sync'
    } else if (_.contains(async, name)) {
        return 'async'
    } else {
        return null;
    }
};

handler.gameAction = function(msg, session, next) {
    var pid = session.uid;
    var player = playerManager.getActivePlayer(pid);
//    log.info("uid : %s, gameAction: %s, serverId: %s, frontendId: %s", pid, msg.__action, app.getServerId(), session.frontendId);
    if (!player) {
        log.error("player not exist", {playerId: pid});
        return next(null, Const.kErrorAuthError);
    }
    player.frontendId = session.frontendId;
    var type = checkApi(msg.__action);
    if (type == 'sync') {
        var ret = player[msg.__action](msg);
        return next(null, ret);
    } else if (type == 'async') {
        player[msg.__action](msg, next);
    } else {
        log.error("调用了非法的player接口", {name: msg.__action});
        return next(null, Const.kErrorInvalidParam);
    }
};

handler.log = function(msg, session, next) {
    var obj = _.clone(msg);
    obj.playerId = session.uid;
    delete obj.__action;
    delete obj.__route__;
    log.stats("客户端log", obj);
    return next(null, Util.packageRes());
};