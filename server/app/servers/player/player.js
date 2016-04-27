/**
 * Created by lhb on 15/9/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
global.consts = require('../../consts/consts');
var formula = require('../../consts/formula');
var moment = require('moment');
var crypto = require('crypto');
var activityHelper = require('../../../util/activityHelper');
var weekUtil = require('../../../util/weekUtil');
var http = require('../../../util/http');
var petServices = require('./../../services/petServices');

// 更新玩家信息
var updateOpts = function(opts) {
    opts.crystal = opts.crystal || 0;
    opts.enemies = opts.enemies || [];
    opts.mailbox = opts.mailbox || [];
    opts.vipGift = opts.vipGift || [];
    opts.dailyEvent = opts.dailyEvent || {};
    opts.dailyReward = opts.dailyReward || {week:1, got:[0,0,0,0,0,0,0]};
    opts.pkMessages = opts.pkMessages || [];
    opts.shopItems = opts.shopItems || [0,0,0,0,0,0,0];
    opts.masterEquips = opts.masterEquips || [0,0,0,0,0,0,0];
    opts.masterEquips = _.isEmpty(opts.masterEquips)? [0,0,0,0,0,0,0] : opts.masterEquips;
    opts.equipValues = opts.equipValues || [0,0,0,0,0,0,0];
    opts.equipValues = _.isEmpty(opts.equipValues)? [0,0,0,0,0,0,0] : opts.equipValues;
    opts.enemyLimit = opts.enemyLimit || 0;
    opts.morale = opts.morale == void 0 ? 100 : opts.morale;
    opts.lastTimeMoraleRestore = opts.lastTimeMoraleRestore || new Date();
    opts.lastTimeKillTitan = opts.lastTimeKillTitan || new Date();
    opts.isBoughtLifeCard = opts.isBoughtLifeCard || false;
    opts.firstPurchaseGiftTime = opts.firstPurchaseGiftTime || 0;
    opts.remainAttMulTime = opts.remainAttMulTime || 0;
    opts.unGainActDiamond =  opts.unGainActDiamond || 0;
    opts.unGainActReward =  opts.unGainActReward || 0;
};

// 载入并初始化玩家信息
var Player = function(opts) {
    updateOpts(opts);
    this.dbKeys = _.chain(opts).keys().without("_id", "__v", "diamond", "monthCardTime", "supMonthCardTime", "isBoughtLifeCard",
        "isNewbiePackageBought", "purchaseCount", "friends", "protectExpire", "isBanned", "purchaseNum","mailbox",
        "goldEggsHammersNum", "goldEggsPurchaseNum", "firstPurchaseGiftTime",
        "guild", "purchaseTime").value();
    _.extend(this, opts);
    this.lastTimeLogin = new Date();
    if (!this.heroes[1]) {this.heroes[1] = {level:0,skill:0, revivalTime:0};}
    if (_.isEmpty(this.masterSkills)) {this.masterSkills = initMasterSkills();}
    this.heroBuffs = formula.heroSkillBuffs(this);

    if (_.isEmpty(this.heroWeapons)) {
        for (var i = 0; i <= _.size(Conf.hero); i++) {
            this.heroWeapons[i] = 0;
        }
    }
    if (_.isEmpty(this.shopItems)) {
        this.shopItems = [0,0,0,0,0,0];
    }

    this.masterBuffs = [];
    this.powerOfHoldingBuff = 0;
    this.updateVip();
    this.calOfflineGold();
    this.checkDailyEventTime();
    this.setAchievementValue(14, this.friends.length);
    this.calAttackMulTime();
    this.activityDiamondReward();
    this.activityReward();
    petServices.createPet(this);
};

module.exports = Player;

var proto = Player.prototype;

// 计算离线收益
proto.calOfflineGold = function() {
    var now = moment();
    var last = moment(this.lastTimeLogout);
    var duration = moment.duration(now - last).asSeconds();
    var secOfDay = 24 * 60 * 60;
    duration = Math.min(duration, secOfDay);
    var gold = formula.stageBasicGold(this);
    var hp = formula.monsterHP(this);
    var dmg = duration * Math.min(formula.allHeroesDPS(this), hp);
    var ff = formula.artifactValue(this, "FuturesFortune");
    this.offlineGold += (Math.floor(gold / hp * dmg) * (1 + ff.effect));

    var vipInfo = this.vipInfo();
    var relic = formula.relicsByPrestige(this);
    var ratio = duration / secOfDay * 0.05 * vipInfo.offlineRelic;
    this.offlineRelic += relic * ratio;
};

// 领取离线金币
proto.collectOfflineGold = function() {
    var gold = this.offlineGold;
    var relic = this.offlineRelic;
    this.addMoney(this.offlineGold, 'gold');
    this.addMoney(this.offlineRelic, 'relic', 'offline');
    this.offlineGold = 0;
    this.offlineRelic = 0;
    return Util.packageRes({gold : gold, relic: relic});
};

// 获得资源(金币,钻石,圣物)
proto.addMoney = function(num, type, reason) {
    if (0 == num) {return;}
    if (!isNaN(parseInt(type))) {
        type = consts.kMoneyNames[type];
    }
    if (isNaN(num)) {
        num += '';
        log.error("[add money] 非法的num", {playerId: this.id, invalidNum:num, typeName:type, reason:reason});
        return;
    }
    if (type == 'gold') {
        this.incAchievementValue(2, num);
    }
    if (type == 'relic') {

        this.incAchievementValue(4, num);
    }
    if (type == 'diamond') {

        Db.Player.findByIdAndUpdate(this.id, {$inc:{diamond: num}}, function(err, player) {
            if (err) {
                log.stats("add diamond fail", {err:err, playerId: this.id});
                return;
            }
            log.stats("add diamond success", {added: num, diamond:player.diamond, name:this.name,openId:this.uniqueId,playerId:this.id, reason:reason});
            this.diamond = player.diamond;
        }.bind(this))
    } else {
        this[type] += num;
    }

    if (type != 'gold') {
        log.stats("add money", {playerId: this.id, num: num, remain: this[type], typeName:type, reason: reason});
    }
};

// 消费资源
proto.costMoney = function(num, type, reason) {
    if (0 == num) {return;}
    if (!isNaN(parseInt(type))) {
        type = consts.kMoneyNames[type];
    }
    if (isNaN(num)) {
        num += '';
        log.error("[cost money] 非法的num", {playerId: this.id, invalidNum:num, typeName:type, reason:reason});
        return;
    }
    var money = this[type];
    if (money < num) {
        return false;
    } else {
        if (type == 'diamond') {
            if (Util.isDiamondTime()) {
                activityHelper.getPlayerRefreshActivityInfo(this.id, activityHelper.activityType.TOTAL_DIAMOND_CONSUMPTION, function(err, activity){
                    if (!activity.diamond) {
                        activity.diamond = {
                            count: num,
                            got:[]
                        };
                        activity.markModified('diamond');
                        activity.save();
                        return;
                    }
                    if (!activity.diamond.got) {
                        activity.diamond.got = [];
                        activity.diamond.count += num;
                        activity.markModified('diamond');
                        activity.save();
                    } else {
                        Db.activity.update({_id:this.id}, {$inc:{"diamond.count":num}}, function(){});
                    }
                }.bind(this));
            }
            Db.Player.findByIdAndUpdate({_id:this.id}, {$inc:{diamond: -1*num}}, function(err, player) {
                log.stats("cost diamond", {cost: num, diamond:player.diamond, playerId:this.id, reason:reason});
                this.diamond = player.diamond;
            }.bind(this))
        }
        this[type] -= num;
        if (type != 'gold') {
            log.stats("cost money", {playerId: this.id, num: num, remain: this[type], typeName:type, reason: reason});
        }
        return true;
    }
};

// 更新钻石
proto.updateDiamond = function(msg, next) {
    Db.Player.findByIdWithFields(this.id, ['diamond', 'purchaseNum', 'purchaseCount'], function(err, player) {
        if (err) {
            log.stats("[update diamond] 读取信息失败", {err: err, playerId:this.id});
            next(null, Const.kErrorDBDataRacing);
            return;
        }
        var added = player.diamond - this.diamond;
        if (this.diamond != player.diamond) {
            this.diamond = player.diamond;
            this.purchaseNum = player.purchaseNum;
            this.updateVip();
            log.stats("update diamond",  {diamond:this.diamond, playerId: this.id, added:added, purchaseCount:player.purchaseCount})
        }
        next(null, Util.packageRes({diamond: this.diamond, added:added, purchaseNum:this.purchaseNum}));

    }.bind(this));
};

// 获取VIP等级
proto.getVipLevel = function() {
    return Util.packageRes({vip : this.vip, purchaseNum: this.purchaseNum});
};

// 获取VIP礼包
proto.getVipGift = function(msg) {
    var lv = msg.level;
    if (this.vip < lv) {
        return {code: 10000, msg:"未达到vip等级"}
    }
    if (this.vipGift[lv]) {
        return {code:10000, msg:"已经领取过"}
    }
    this.addVipGift(lv);
    this.vipGift[lv] = 1;
    return Util.packageRes({result:true})
};

/**
 * 累积充值补丁
 */
proto.activityReward = function(){
    if (!this.unGainActReward) return;
    var meta = Conf.activityPurchase[this.unGainActReward];
    if (!meta) return;
    self.unGainActReward = 0;
    self.addGoods(meta.diamond, 'diamond', '累计礼包');
    self.addGoods(meta.itemNum, meta.item, '累计礼包');
    self.addGoods(meta.weaponItem, 'weaponItem', '累计礼包');
    self.addGoods(meta.crystal, 'crystal', '累计礼包');
};

// 领取活动奖励
proto.getActivityReward = function(msg, next) {
    var idx = msg.idx;
    var meta = Conf.activityPurchase[idx];
    var self = this;
    if (this.isGetActivityReward) {
        return next(null, {code:10000, msg:"正在领"});
    }
    this.isGetActivityReward = true;
    this.unGainActReward = 0;
    async.waterfall([
        function(cb) {
            Db.activity.findOne({_id:self.id}, {purchase:1}, cb);
        },
        function(activity, cb) {
            var purchase = activity.purchase;
            if (purchase.count < meta.rmb) {
                return cb("充值不足");
            }
            if (purchase.got[idx]) {
                return cb("已经领过");
            }
            self.unGainActReward = idx;
            purchase.got[idx] = true;
            activity.markModified('purchase');
            activity.save(cb);
        }
    ], function(err) {
        if (err) {
            return next(null, {code:10000, msg:err, show:true});
        }
        self.activityReward();
        self.isGetActivityReward = false;
        return next(null, Util.packageRes(meta));
    })
};

/**
 * 钻石返利补丁
 */
proto.activityDiamondReward = function(){
    if (!this.unGainActDiamond) return;
    var meta = Conf.activityDiamond[this.unGainActDiamond];
    if (!meta) return;
    this.unGainActDiamond = 0;
    this.addGoods(meta.itemNum, meta.item, '钻石返利');
    this.addMetaGoods(meta, '钻石返利');
};

// 领取钻石活动返利的奖励
proto.getActivityDiamondReward = function(msg, next) {
    var idx = msg.idx;
    var meta = Conf.activityDiamond[idx];
    var self = this;
    if (this.isGetActivityReward) {
        return next(null, {code:10000, msg:"正在领"});
    }
    this.isGetActivityReward = true;
    this.unGainActDiamond = 0;
    async.waterfall([
        function(cb) {
            Db.activity.findOne({_id:self.id}, {diamond:1}, cb);
        },
        function(activity, cb) {
            var purchase = activity.diamond;
            if (purchase.count < meta.need) {
                return cb("消费钻石不足");
            }
            if (purchase.got[idx]) {
                return cb("已经领过");
            }
            self.unGainActDiamond = idx;
            purchase.got[idx] = true;
            activity.markModified('diamond');
            activity.save(cb);
        }
    ], function(err) {
        if (err) {
            self.isGetActivityReward = false;
            return next(null, {code:10000, msg:err, show:true});
        }
        self.activityDiamondReward();
        self.isGetActivityReward = false;
        return next(null, Util.packageRes(meta));
    })
};

// 领取礼包中其它资源
proto.addMetaGoods = function(meta, reason) {
    _.each(meta, function(v, k) {
        if (v && _.isNumber(v)) {
            this.addGoods(v, k, reason);
        }
    }.bind(this))
};

// 领取VIP礼包
proto.addVipGift = function(lv) {
    var info = this.vipInfo(lv);
    _.each(info, function(v, k) {
        if (v && _.isNumber(v)) {
            this.addGoods(v, k, 'vipgift');
        }
    }.bind(this))
};

// 更新VIP等级
proto.updateVip = function() {
    var vip = this.vip;
    var purchaseNum = this.purchaseNum;
    var meta = Conf.vip;
    for (var i = vip+ 1; i < 14; i++) {
        var info = meta[i];
        if (purchaseNum < info.purchase) {
            break;
        } else {
            this.vip = i;
        }
    }
};

// 获取点击伤害值
proto.getTapDamage = function() {
    this.masterBuffs[consts.kMasterSkillTypeBerserkerRage] = !!this.getMasterSkillDurationAtMission(consts.kMasterSkillTypeBerserkerRage);
    return formula.tapDamage(this, null, this.isBoss);
};

// 获取怪兽血量
proto.getMonsterHP = function() {
    return formula.monsterHP(this, false, this.stage, this.isBoss);
};

// 检查怪兽是否被杀死
proto.checkKillTitan = function(msg) {
    // check taps
//    return true;
    var duration = new Date() - this.lastTimeKillTitan;
    var tapsPerSec = msg.taps / duration * 1000;

    var limit = this.powerOfHoldingBuff ? 60 : 30;
    if (tapsPerSec > limit) {
        log.stats("[作弊行为] 指如疾风势如闪电", {tapsPerSec: tapsPerSec, taps:msg.taps, playerId:this.id});
        return false;
    }
    var total = msg.dmg;
    //console.warn("本人攻击:" + total);
    var hp = this.getMonsterHP();
    var heroDps = Math.min(formula.allHeroesDPS(this), hp);
    //console.warn("英雄攻击:" + heroDps);
    if (!!this.remainAttMulTime) heroDps *= 2;          // 攻击双倍;
    //console.warn("英雄攻击:" + heroDps);
    total += heroDps * Math.ceil(duration / 1000);
    this.calAttackMulTime();
    if (total < hp) {
        log.stats("[作弊行为] 伤血量不够", {hp: hp.toString(),name:this.name, playerId:this.id, heroDps:heroDps.toString(), duration:duration, tapDmg:msg.dmg.toString(), tapsPerSec:tapsPerSec});
//        this.dailyEvent.cheatSpeed ++;
//        if (this.dailyEvent.cheatSpeed == 20) {
//            this.cheatLevel ++;
//        }
        return false;
    }
    return true;
};

// 忽略对checkKillTitan失败的检查 (由于网络延时或者其它未知原因,每5分钟可以允许一次没打败怪兽但算他打过)
proto.ignoreCheckFail = function() {
//    return false;
    var now = moment();
    this.lastIgnoreTime = this.lastIgnoreTime || now;
    if (now.diff(this.lastIgnoreTime, 'm') >= 5) {
        log.stats("[忽略击杀检测] success", {playerId: this.id});
        this.lastIgnoreTime = moment();
        return true;
    } else {
        log.stats("[忽略击杀检测] fail", {playerId: this.id});
        return false;
    }

};

// 获取主角某项技能在本次关卡中使用时间
proto.getMasterSkillDurationAtMission = function(sid) {   // return ms
    var duration = formula.masterSkillDuration(this, sid)+60;
    var now = moment();
    var end = moment(this.masterSkills[sid].lastTimeUse).add(duration, 's');
    end = moment.min(now, end);
    var missionStart = moment(this.lastTimeKillTitan);
    if (end.isBefore(missionStart)) {return 0}
    return moment.duration(end - missionStart).asMilliseconds();
};

// 新手礼包邮件
proto.newbieGiftMail = function() {
    //var stages = [2, 5, 10, 15, 20];
    //var idx = stages.indexOf(this.highestStage);
    //var start = 18;
    //if (env == 'development' || env == 'testing') {
    //    start = 1;
    //}
    //if (idx != -1) {
    //    Db.Player.update({_id:this.id}, {$push: {mailbox: {$each:[{id:idx+start, read:0, getGoods:0}],$position:0, $slice:20}}}, function(err) {
    //        if (!err) {
    //            var user = {uid: this.id, sid: this.frontendId};
    //            app.channelService.pushMessageByUids("newMail", {}, [user], function(){});
    //        }
    //    }.bind(this));
    //}
};

// 创建新关卡
proto.createMission = function() {
    this.isChest = formula.isChest(this);
    this.isDivineChalice = formula.isDivineChalice(this);
    this.stage = this.isBoss ? this.stage + 1 : this.stage;
    this.mission = this.isBoss ? 0 : Math.min(this.mission + 1, formula.numOfMonstersEachStage(this));
    if (this.stage > this.highestStage) {
        this.newbieGiftMail();
        this.highestStage = this.stage;
        this.setAchievementValue(3, this.stage);
        petServices.createPet(this, true);
        var data = this.strip();
        data.id = this.id;
        app.rpc.rank.rankRemote.updateRank(this.id, data, function(err, serverRank){

        });
    }
    if (this.contestId != "none" && moment().diff(moment(this.contestStartTime), 'hours', true) < consts.kContestDuration) {
        Db.updatePlayerContestRank(this.contestId, this.id, this.stage, function() {});
    }
};

/**
 * 领取成长基金;
 * @param msg
 * @param next
 */
proto.gainGrowthFundAward = function(msg, next){
    var growthId = msg.growthId;
    if (!growthId || !Conf.activityGrowthFund[growthId]){
        next(null, Const.kErrorInvalidParam);
        return;
    }
    var self = this;
    async.waterfall([
        function(callback){
            activityHelper.getPlayerRefreshActivityInfo(self.id, activityHelper.activityType.GROWTH_FUND, callback);
        },
        function(info, callback){
            if (!info){
                next(null, Const.kErrorInternalError);
                return;
            }
            var success = false;
            for (var i = 0, j = info.growthFund.statusArr.length; i < j; ++ i){
                if (!info.growthFund.statusArr[i]) continue;
                if (info.growthFund.statusArr[i].id != growthId) continue;
                if (info.growthFund.statusArr[i].status != consts.kGrowthFundStatus.Can_Gain){
                    next(null, Const.kErrorHasGot);
                    return;
                }
                info.growthFund.statusArr[i].status = consts.kGrowthFundStatus.Gained;
                success = true;
                self.addMoney(Conf.activityGrowthFund[growthId].diamond, 'diamond', "gainGrowthFundAward");
                break;
            }
            if (!success){
                next(null, Const.kErrorNoneReward);
                return;
            }

            info.markModified('growthFund');
            info.save(callback);
        }
    ], function(err){
        if (!!err){
            next(null, Const.kErrorInvalidParam);
            return;
        }
        next(null, Util.packageRes());
    });
};

// 检查过关速度
proto.checkSpeed = function() {
    if (!this.lastTimePassTenStage) {
        this.lastTimePassTenStage = new Date().getTime();
        return;
    }
    var now = new Date().getTime();
    var duration = Math.ceil((now - this.lastTimePassTenStage) / 1000);
    if (duration < 33) {
        this.dailyEvent.cheatSpeed ++;
        if (this.dailyEvent.cheatSpeed == 20) {
            this.cheatLevel ++;
            Db.Player.update({_id:this.id}, {$set:{isBanned:true}}, function(err) {
                var user = {uid: this.id, sid: this.frontendId};
                app.channelService.pushMessageByUids("shutdown", {}, [user], function(){});
            }.bind(this))
        }
        log.stats("加速器", {playerId:this.id, name:this.name, duration:duration, uniqueId:this.uniqueId});
    }
    this.lastTimePassTenStage = new Date().getTime();
};

// 击败一个怪兽
proto.killTitan = function(msg) {
    this.checkDailyEventTime();
    if (msg.isBoss) {
        if (!formula.isBoss(this)) {
            log.error("这一关不是BOSS关");
            return Const.kErrorKillTitanFail;
        }
        this.isBoss = true;
    } else {
        this.isBoss = false;
    }
    if (msg.isDoom) {
        var cost = Conf.shop[consts.kShopItemDoom].cost;
        if (!this.costShopItem(consts.kShopItemDoom) && !this.costMoney(cost, consts.kMoneyTypeDiamond, "doom")) {
            return Const.kErrorNotEnoughMoney;
        }
    } else if (!this.checkKillTitan(msg) && !this.ignoreCheckFail()) {
        return Const.kErrorKillTitanFail;
    }
    this.dailyEvent.clicks -= msg.taps;
    var duration = new Date() - this.lastTimeKillTitan;
    var tapsPerSec = msg.taps / duration * 1000;
    if (tapsPerSec > this.dailyEvent.clickPerSecond) {
        this.dailyEvent.clickPerSecond = tapsPerSec;
    }
    if (this.isBoss) {
        this.dailyEvent.stageCount += 1;
    }
    this.dailyEvent.killMonster += 1;
    this.dailyEvent.totalClick += msg.taps;
    var gold = formula.goldByMonster(this) * (Util.isChristmas()? 2:1);
    this.addMoney(gold, 'gold');
    var relic = 0;
    var vipInfo = this.vipInfo();
    if (this.stage % 10 == 0 && formula.isBoss(this) && this.isBoss && this.stage >= 80) {
        relic = 1 + vipInfo.relicPerTen;
        this.checkSpeed();
        this.addMoney(relic, 'relic', 'killTitan');
        if (this.stage % 100 == 0 && this.guild) {
            Db.updateGuildBPRank(this.guild, function() {});
        }
    }
    this.lastTimeKillTitan = new Date();
    if (this.isChest) {
        this.incAchievementValue(11);
    }
    this.createMission();
    this.incAchievementValue(1);
    this.incAchievementValue(8, msg.taps);
    if (this.isBoss) {
        var bp = formula.maxFightValue(this);
        Db.updatePlayerFightRank(this.serverId, this.id, bp, function(){});
        Db.updatePlayerBPRank(this.id, bp, function(){});
        this.incAchievementValue(7);
        this.save();
    }
    return Util.packageRes({
        relic: relic,
        mission : this.mission,
        gold : gold,
        isChest : this.isChest,
        isDivineChalice: this.isDivineChalice,
        clicks: this.dailyEvent.clicks,
        clickPerSecond: this.dailyEvent.clickPerSecond
    });
};

// 递增成就数值
proto.incAchievementValue = function(id, num) {
    if (num === void 0) { num = 1; }
    var ach = this.achievements[id];
    ach.value += num;
};

// 设置成就数值
proto.setAchievementValue = function(id, num) {
    var ach = this.achievements[id];
    ach.value = Math.max(ach.value, num);
};

// 判断某项成就是否已达标
proto.isAchievementRewardAvailable = function(id) {
    var a = this.achievements[id];
    var meta = Conf.achievements[id];
    var next = a.stars + 1;

    return meta["star" + next] && meta["star" + next] <= a.value;
};

// 领取成就奖励
proto.gainAchievementReward = function(msg) {
    var id = msg.id;
    if (!this.isAchievementRewardAvailable(id)) {return Const.kErrorAchievementReward}
    var a = this.achievements[id];
    a.stars++;
    var diamond = consts.kAchievementsRewards[a.stars];
    this.addMoney(diamond, 'diamond', "gainAchievementReward");
    return Util.packageRes();
};

// 判断某项每日任务是否可以领取
proto.isDailyTaskRewardAvailable = function(meta) {
    var level = this.dailyEvent.dailyTask + 1;
    var name = meta.name;
    var value = this.dailyEvent[name];
    var star = this.dailyEvent.dailyStar[name];
    // log.info("daliyTask: ", {"meta": meta, "level": level, "value": value, "star": star});
    return level == meta.level && value >= meta.target && star < level;
}

// 领取每日任务奖励
proto.gainDailyTaskReward = function(msg) {
    this.checkDailyEventTime();
    var id = msg.id;
    var meta = Conf.dailyTask[id];
    if (!this.isDailyTaskRewardAvailable(meta)) {
        return Util.packageRes({result:false});
    }
    var gold = meta.gold * formula.goldRain(this);
    var relic = meta.relic * formula.relicsByPrestige(this);
    if (meta.relic > 0 && relic < 1) {
        relic = 1;
    }
    this.addGoods(gold, 'gold', '每日任务奖励');
    this.addGoods(relic, 'relic', '每日任务奖励');
    this.addGoods(meta.diamond, 'diamond', '每日任务奖励');
    this.addGoods(meta.crystal, 'crystal', '每日任务奖励');
    this.addGoods(meta.fragment, 'fragment', '每日任务奖励');
    this.dailyEvent.dailyStar[meta.name] += 1;
    return Util.packageRes({result:true});
};

// 刷新每日任务
proto.refreshDailyTask = function(msg) {
    var level = this.dailyEvent.dailyTask;
    var diamond = 200;
    if (level > 0) {
        diamond = 500;
    }
    if (!this.costMoney(diamond, 'diamond', 'refreshDailyTask')) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.dailyEvent.dailyTask += 1;
    return Util.packageRes();
};

// 领取天将黄金
proto.goldRain = function(msg) {
    var cost = Conf.shop[consts.kShopItemGoldRain].cost;
    if (!this.costShopItem(consts.kShopItemGoldRain) && !this.costMoney(cost, "diamond", "goldRain")) {
        return Const.kErrorNotEnoughMoney;
    }
    var gold = formula.goldRain(this);
    this.addMoney(gold, "gold");
    return Util.packageRes();
};

// 升级主角等级
proto.masterUpgrade = function(msg) {

    var price = formula.masterUpgradeCost(this.masterLevel, msg.upgrades);
    if (!this.costMoney(price, 'gold')) {
        return Const.kErrorNotEnoughMoney;
    }
    this.masterLevel += msg.upgrades;
    this.dailyEvent.masterUpgrade += msg.upgrades;
    return Util.packageRes();
};

// 升级主角技能
proto.masterUpgradeSkill = function(msg) {

    var skillId = msg.skillId;
    var skill = this.masterSkills[skillId];
    if (!skill) {
        skill = this.masterSkills[skillId] = {
            id: skillId,
            level : 0,
            lastTimeUse : 0
        }
    }
    var cost = formula.masterSkillUpgradeCost(this, skillId);
    if (!this.costMoney(cost, 'gold')) {
        return Const.kErrorNotEnoughMoney;
    }
    skill.level ++;
    return Util.packageRes();
};

// 主角使用技能
proto.useSkill = function(msg) {
    var sid = msg.skillId;
    var skill = this.masterSkills[sid];
    var cd = formula.masterSkillCoolDown(this, sid);
    var now = new Date().getTime();
    var past = (now - new Date(skill.lastTimeUse).getTime()) / 1000;
    if (past < cd) {
        return Const.kErrorSkillInCoolDown;
    }
    skill.lastTimeUse = now;
    if (sid == consts.kMasterSkillTypeHeavenlyStrike) {
        this.incAchievementValue(12);
    }
    if (sid == consts.kMasterSkillTypeCriticalStrike) {
        this.incAchievementValue(13);
    }
    this.dailyEvent.masterSkill += 1;
    return Util.packageRes();
};

// 初始化主角技能
var initMasterSkills = function() {
    var skills = [];
    _.each(Conf.masterSkill, function(v, id) {
        skills[id] = {
            id: id,
            level : 0,
            lastTimeUse: 0
        }
    });
    return skills;
};

var request = require('request');
var packageName = "com.hortorgames.taptitans";

// 使用兑换码
proto.useCoupon = function(msg, next) {
    var code = msg.code;
    var userId = crypto.createHash('md5').update(this.uniqueId+"").digest("hex");
    var signature = crypto.createHash('md5').update(_.sprintf("%s%shortorgames2013",userId,code)).digest("hex");
    signature = signature.substr(8,16);
    var requestUrl = _.sprintf("%s/coupon/use?userId=%s&couponId=%s&sig=%s&product=%s",
        Conf.get("web:goldHill_url"),userId,code,signature,packageName);
    request(requestUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if(data && data["data"] && data["errcode"] == 0){
                var couponValue = JSON.parse(data["data"]["couponValue"]);
                if(couponValue["gold"]){
                    this.addMoney(couponValue["gold"],"gold");
                }
                if(couponValue["diamond"]){
                    this.addMoney(couponValue["diamond"],"diamond", "coupon");
                }
                if(couponValue["relic"]){
                    this.addMoney(couponValue["relic"],"relic");
                }
                if(couponValue["crystal"]){
                    this.addMoney(couponValue["crystal"],"crystal", 'coupon');
                }
            }
            next(null, Util.packageRes(body));
        } else {
            next(null, Const.kErrorInvalidCoupon);
        }
    }.bind(this))
};

// 保级蜕变
proto.prestigeByDiamond = function() {
    var vipInfo = this.vipInfo();
    var cost = this.stage * Conf.prestigeCostCoe * (1 + vipInfo.prestigeCost);
    cost = Math.ceil(cost);
    if (!this.costMoney(cost, 'diamond', "prestige")) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.addMoney(formula.relicsByPrestige(this), 'relic', 'prestige');
    this.incAchievementValue(9);
    return Util.packageRes();
};

// 领取每日圣物
proto.getDailyRelic = function() {
    var vipInfo = this.vipInfo();
    this.checkDailyEventTime();
    if ( this.dailyEvent.getRelic) {
        log.stats("今日已领过圣物", {playerId:this.id});
        return Const.kErrorDuplicatedOpertaion;
    }
    this.dailyEvent.getRelic = 1;
    var relic = formula.relicsByPrestige(this) * vipInfo.dailyRelic;
    this.addMoney(relic, 'relic', 'dailyRelic');
    return Util.packageRes({relic: relic});
};

// 洗武器, 去掉一个不要的武器换取其它武器
proto.resetWeapon = function(msg) {
    var wid = msg.wid;
    var price = [50, 50, 60, 60, 80, 80, 100];
    var idx = Math.min(6, this.dailyEvent.resetWeapon);
    if (this.heroWeapons[wid] < 1) {
        return {code:10000, msg:"武器数量不足", show:true};
    }
    if (!this.costMoney(price[idx], 'crystal', 'resetWeapon')) {
        return Const.kErrorNotEnoughMoney;
    }
    this.heroWeapons[wid] --;
    this.dailyEvent.resetWeapon ++;
    this.addMoney(1, 'weaponItem', 'resetWeapon');
    return Util.packageRes();
};

// 检查日期并重置每日事件
proto.checkDailyEventTime = function() {
    var day = moment().format('YYYY-MM-DD');
    if (day != this.dailyEvent.day) {
        this.dailyEvent = {
            day: day,
            clicks: 300000,
            resetWeapon : 0,
            donate:0,
            cheatSpeed:0,
            envelope:0,
            zodiacTimes:0,
            dailyTask:0,            // 每日任务等级
            clickPerSecond:0,       // 每秒点击速度
            stageCount:0,           // 通过关卡次数
            masterUpgrade:0,        // 提升主角等级
            masterSkill:0,          // 释放主角技能
            totalClick:0,           // 累计点击次数
            heroUpgrade:0,          // 提升英雄等级
            artifactUpgrade:0,      // 提升神器等级
            killMonster:0,          // 杀死怪兽次数
            goldEggsTotalReward:0,  // 金蛋总收益
            lastShareTime:0,        // 上次分享时间
            shareTimes:0,           // 每日分享次数
            treasureChestTimes:0,   // 购买宝箱次数
            dailyStar: {
                clickPerSecond:0,
                stageCount:0,
                masterUpgrade:0,
                masterSkill:0,
                totalClick:0,
                heroUpgrade:0,
                artifactUpgrade:0,
                killMonster:0
            }
        };
    }
    this.dailyEvent.envelope = this.dailyEvent.envelope || 0;
    this.dailyEvent.zodiacTimes = this.dailyEvent.zodiacTimes || 0;
    this.dailyEvent.dailyTask = this.dailyEvent.dailyTask || 0;
    this.dailyEvent.clickPerSecond = this.dailyEvent.clickPerSecond || 0;
    this.dailyEvent.stageCount = this.dailyEvent.stageCount || 0;
    this.dailyEvent.masterUpgrade = this.dailyEvent.masterUpgrade || 0;
    this.dailyEvent.masterSkill = this.dailyEvent.masterSkill || 0;
    this.dailyEvent.totalClick = this.dailyEvent.totalClick || 0;
    this.dailyEvent.heroUpgrade = this.dailyEvent.heroUpgrade || 0;
    this.dailyEvent.artifactUpgrade = this.dailyEvent.artifactUpgrade || 0;
    this.dailyEvent.killMonster = this.dailyEvent.killMonster || 0;
    this.dailyEvent.goldEggsTotalReward = this.dailyEvent.goldEggsTotalReward || 0;
    this.dailyEvent.lastShareTime = this.dailyEvent.lastShareTime || 0;
    this.dailyEvent.shareTimes = this.dailyEvent.shareTimes || 0;
    this.dailyEvent.treasureChestTimes = this.dailyEvent.treasureChestTimes || 0;
    this.dailyEvent.dailyStar = this.dailyEvent.dailyStar || {};
    this.dailyEvent.dailyStar.clickPerSecond = this.dailyEvent.dailyStar.clickPerSecond || 0;
    this.dailyEvent.dailyStar.stageCount = this.dailyEvent.dailyStar.stageCount || 0;
    this.dailyEvent.dailyStar.masterUpgrade = this.dailyEvent.dailyStar.masterUpgrade || 0;
    this.dailyEvent.dailyStar.masterSkill = this.dailyEvent.dailyStar.masterSkill || 0;
    this.dailyEvent.dailyStar.totalClick = this.dailyEvent.dailyStar.totalClick || 0;
    this.dailyEvent.dailyStar.heroUpgrade = this.dailyEvent.dailyStar.heroUpgrade || 0;
    this.dailyEvent.dailyStar.artifactUpgrade = this.dailyEvent.dailyStar.artifactUpgrade || 0;
    this.dailyEvent.dailyStar.killMonster = this.dailyEvent.dailyStar.killMonster || 0;
};

// 检查每日首充奖励礼包
proto.checkIfHasPurchaseGiftBag = function(msg, next) {
    this.checkDailyEventTime();
    Db.Player.findByIdWithFields(this.id, ['purchaseTime'], function(err, player) {
        this.dailyEvent.purchase = player.purchaseTime && moment().isSame(moment(player.purchaseTime), 'day');
        var has = !this.dailyEvent.purchaseGiftBag && this.dailyEvent.purchase;
        return next(null,Util.packageRes({result: has, dailyEvent: this.dailyEvent, activity:activityHelper.getActivityConfig(), sysTime:Date.now()}));
    }.bind(this));
};

//领取每日首充奖励礼包
proto.getDailyPurchaseGiftBag = function(msg) {
    this.checkDailyEventTime();
    if (this.dailyEvent.purchaseGiftBag || !this.dailyEvent.purchase) {
        return {code:10000, msg:"领取失败", show:true};
    }
    this.dailyEvent.purchaseGiftBag = true;
    var obj = {relic:Math.max(30, formula.relicsByPrestige(this) * 0.1), weaponItem:1, crystal:100};
    this.addGroupGoods(obj, "getDailyPurchaseGiftBag");
    return Util.packageRes(obj);
};

// 添加一组资源
proto.addGroupGoods = function(group, reason) {
    _.each(group, function(v,k) {
        this.addGoods(v, k, reason);
    }.bind(this))
};

// 重置蜕变后玩家信息
proto.resetForPrestige = function() {
    this.addMoney(formula.relicsByPrestige(this), 'relic', 'prestige');
    this.heroes = [];
    this.heroBuffs = formula.heroSkillBuffs(this);
    this.gold = 0;
    this.offlineGold = 0;
    this.masterSkills = initMasterSkills();
    this.masterLevel = 1;
    this.mission = 0;
    this.stage = 1;
    this.dailyBoss.stage = 5;
    this.incAchievementValue(9);
};

// 蜕变
proto.prestige = function() {
    if (this.masterLevel < 600) {return Const.kErrorLowPlayerLevel}
    this.resetForPrestige();
    return Util.packageRes();
};

// 获得新英雄
proto.addNewHero = function(msg) {
    var hero = this.heroes[msg.heroId];

    if (!hero) {
        this.heroes[msg.heroId] = {
            level : 0,
            skill : 0,
            revivalTime: 0
        }
    }
    return Util.packageRes();
};

// 升级英雄等级
proto.heroUpgrade = function(msg) {
    var upgrades = msg.upgrades || 1;
    var hero = this.heroes[msg.heroId];

    if (!hero) {
        hero = this.heroes[msg.heroId] = {
            id : msg.heroId,
            level : 0,
            skill : 0
        }
    }

    if (upgrades > 1000 || upgrades < 1) {
        return Const.kErrorHeroUpgrade;
    }
//    if (hero.level + upgrades > 1000) {
//        return Const.kErrorHeroUpgrade;
//    }
    var multi = formula.getHeroUpgradeCostIndex(this);
    var cost = formula.heroUpgradeCost(this, msg.heroId, hero.level, upgrades, false, multi);
    if (!this.costMoney(cost, 'gold')) {
        return Const.kErrorNotEnoughMoney;
    }
//    if (hero.level == 1000) {
//        hero.skill = 0;
//    }
    hero.level += upgrades;
    this.incAchievementValue(10, upgrades);
    this.setAchievementValue(6, formula.allHeroesDPS(this));
    this.dailyEvent.heroUpgrade += upgrades;
    return Util.packageRes({cost: cost});
};

// 英雄解锁技能
proto.heroUnlockSkill = function(msg) {
    var hid = msg.heroId;
    var hero = this.heroes[hid];
    var sid = hero.skill + 1;
    var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
    if (!unlockLevel) {
        return Const.kErrorHeroUnlockSkill;
    }
    var cost = formula.heroUnlockSkillCost(this, hid, sid);
    if (!this.costMoney(cost, 'gold')) {
        return Const.kErrorNotEnoughMoney;
    }
    hero.skill = sid;
    formula.addHeroBuff(this, hid, sid);
    return Util.packageRes();
};

// 购买新神器
proto.buyNextArtifact = function(msg) {

    var cost = formula.newArtifactCost(this);
    if (!this.costMoney(cost, 'relic', "newArtifact")) {
        return Const.kErrorNotEnoughRelic;
    }
    var artifact = formula.randomArtifact(this);
    if (!artifact) {
        return Const.kErrorRandomArtifact;
    }
    this.artifacts.push({id: artifact, level:1});
    this.setAchievementValue(5, this.artifacts.length);
    return Util.packageRes({id : artifact, cost:cost});
};

// 洗神器
proto.resetArtifact = function(msg) {
    var idx = msg.idx;
    var artifact = this.artifacts[idx];
    var cost = formula.resetArtifactCost(this, artifact.id);
    if (!this.costMoney(cost, 'diamond', "resetArtifact")) {
        return Const.kErrorNotEnoughDiamond;
    }
    var relics = formula.resetArtifactRelics(this, artifact.id);
    this.addMoney(relics, 'relic', "resetArtifact");
    log.stats("洗神器", artifact);
    this.artifacts.splice(idx, 1);
    return Util.packageRes();
};

// 升级神器
proto.artifactUpgrade = function(msg) {
    var aid = msg.artifactId;
    var artifact = _.find(this.artifacts, {id : aid});
    if (!artifact) {
        log.stats("[升级神器] 没有找到指定的神器", msg);
        return Const.kErrorArtifactUpgrade;
    }
    var lv = artifact.level;
    var meta = _.find(Conf.artifacts, {id : aid});
    if (lv == meta.maxLevel) {
        return Const.kErrorArtifactUpgrade;
    }
    var cost = formula.artifactUpgradeCost(this, aid);
    if (!this.costMoney(cost, 'relic', "upgradeArtifact")) {
        return Const.kErrorNotEnoughRelic;
    }
    artifact.level ++;
    this.dailyEvent.artifactUpgrade += 1;
    return Util.packageRes({cost: cost});
};

// 使用坚持神力
proto.powerOfHolding = function() {

    var cost = Conf.shop[consts.kShopItemPowerOfHolding].cost;
    if (!this.costShopItem(consts.kShopItemPowerOfHolding) && !this.costMoney(cost, "diamond", "powerOfHolding")) {
        return Const.kErrorNotEnoughMoney;
    }
    this.powerOfHoldingBuff += 1;
    setTimeout(function() {
        this.powerOfHoldingBuff -= 1;
    }.bind(this), 130 * 1000);
    return Util.packageRes();
};

// 使用自动攻击
proto.autoTap = function() {
    var cost = Conf.shop[consts.kShopItemAutoTap].cost;
    if (!this.costShopItem(consts.kShopItemAutoTap) && !this.costMoney(cost, "diamond", "autoTap")) {
        return Const.kErrorNotEnoughMoney;
    }
    if (!this.autoTapRemainTime) {
        this.lastTimeLogin = new Date();
    }
    this.autoTapRemainTime += (30 * 60);
    return Util.packageRes();
};

// 不用了
proto.guardianShield = function() {
    var cost = Conf.shop[consts.kShopItemGuardianShield].cost;
    if (!this.costMoney(cost, "diamond")) {
        return Const.kErrorNotEnoughMoney;
    }
    this.guardianShieldTime = new Date();
    return Util.packageRes();
};

// 使用技能刷新
proto.refreshSkill = function() {
    var cost = formula.skillRefreshCost(this);
    if (!this.costShopItem(consts.kShopItemRefreshSkill) && !this.costMoney(cost, "diamond", "refreshSkill")) {
        return Const.kErrorNotEnoughMoney;
    }
    for(var i = 1; i < 7; i++) {
        this.masterSkills[i].lastTimeUse = 0;
    }
    return Util.packageRes();
};

// 获取每日副本信息
proto.getDailyBossInfo = function() {
    var dailyBoss = this.dailyBoss;
    if (moment(dailyBoss.lastTime).isSame(moment(), 'day')) {
        return Util.packageRes();
    }
    if (!moment(dailyBoss.lastTime).add(1, 'day').isSame(moment(), 'day') || dailyBoss.day > 5) {
        dailyBoss.day = 1;
    }
    if (!dailyBoss.stage) {
        dailyBoss.stage = this.stage + ( 5 - this.stage % 5);
    }
    var hp = formula.monsterHP(this, false, dailyBoss.stage, true);
    return Util.packageRes({
        day : dailyBoss.day,
        hp : hp
    })
};

// 击败每日副本怪兽
proto.killDailyBoss = function(msg) {
    var dailyBoss = this.dailyBoss;
    if (moment(dailyBoss.lastTime).isSame(moment(), 'day')) {
        return Util.packageRes();
    }
    if (msg.isDoom) {
        var cost = Conf.shop[consts.kShopItemDoom].cost;
        if (!this.costMoney(cost, consts.kMoneyTypeDiamond, "doom")) {
            return Const.kErrorNotEnoughMoney;
        }
    }
//    if (!this.checkKillTitan(msg)) {
//        return Const.kErrorKillTitanFail;
//    }
    this.getDailyBossInfo();
    var ret = {};
    var vipInfo = this.vipInfo();
    if (this.dailyBoss.day < 5) {
        ret.type = 'diamond';
        ret.num = this.dailyBoss.day * 15 * (1+vipInfo.dailyBossDiamond);
        this.addMoney(ret.num, ret.type, "killDailyBoss");
    } else {
        ret.type = 'weapon';
        ret.num = 1+vipInfo.dailyBossWeapon;
        this.addMoney(1+vipInfo.dailyBossWeapon, 'weaponItem', 'dailyBoss');
    }
    this.dailyBoss.lastTime = new Date();
    this.dailyBoss.stage = 0;
    this.dailyBoss.day ++;

    return Util.packageRes(ret);
};

// 使用武器道具
proto.useWeaponItem = function() {

    if (!this.costMoney(1, "weaponItem", "useWeaponItem")) {
        return Const.kErrorNotEnoughWeaponItem;
    }
    log.stats("use weapon item", {playerId: this.id, remain: this.weaponItem});
    var weaponId = Util.randomInt(1, 33);
    this.heroWeapons[weaponId] = this.heroWeapons[weaponId] || 0;
    this.heroWeapons[weaponId] ++;
    return Util.packageRes({
        weaponId : weaponId
    })
};

// 加好友
proto.addFriend = function(msg, next) {
    if (!msg.scode) {
        log.error("[addfriend] 没有scode参数", msg);
        next(null, Const.kErrorMissingParam);
        return;
    }
    if (msg.scode == this.shareCode) {
        next(null, Util.packageRes({result: false, msg:"不能加自己为好友"}));
        return;
    }
    Db.rds.share.get(msg.scode, function(err, pid) {
        if (err || !pid) {
            log.stats("[addfriend] 未找到好友", msg);
            next(null, Const.kErrorInvalidShareCode);
            return;
        }

        Db.Player.findByIdAndUpdate(pid, {$addToSet:{friends: parseInt(this.id)}}, function() {});
        Db.Player.findByIdAndUpdate(this.id, {$addToSet:{friends: parseInt(pid)}}, function(err, player) {
            if (err) {
                log.error("add to friend failed!", {playerId:this.id, friendId: pid, friends:player.friends});
                return;
            }
            this.setAchievementValue(14, player.friends.length);
            return next(null, Util.packageRes({result:true, num: player.friends.length}));
        }.bind(this));

    }.bind(this));

};

// 获取月卡购买时间
proto.getMonthCardTime = function(msg, next) {
    Db.Player.findById(this.id, function(err, player) {
        if (err) {
            log.error("[getMonthCardTime]数据库操作错误");
            next(err);
        }
        this.monthCardTime = player.monthCardTime;
        next(null, Util.packageRes({time : player.monthCardTime}));
    }.bind(this));
};

// 领取月卡钻石
proto.getDailyMonthCardDiamond = function() {
    var expireTime = moment(this.monthCardTime).add(30, 'd').startOf('d');
    var now = moment();
    if (now.isAfter(expireTime)) {
        log.stats("月卡已过期", {playerId: this.id, mcTime: this.monthCardTime});
        return Const.kErrorMonthCardExpire;
    }
    var getTime = moment(this.getMCDailyDiamondTime);
    if (getTime.isSame(now, 'd')) {
        log.stats("今日已领过月卡钻石", {playerId:this.id});
        return Const.kErrorDuplicatedOpertaion;
    }
    var num = Util.randomRate(1/10) ? 200 : 100;
    this.addMoney(num, 'diamond', "monthCard");
    this.getMCDailyDiamondTime = new Date();
    return Util.packageRes({diamond: num});
};

// 获取至尊月卡购买时间
proto.getSupMonthCardTime = function(msg, next) {
    Db.Player.findById(this.id, function(err, player) {
        if (err) {
            log.error("[getSupMonthCardTime]数据库操作错误");
            next(err);
        }
        this.supMonthCardTime = player.supMonthCardTime;
        next(null, Util.packageRes({time : player.supMonthCardTime}));
    }.bind(this));
};

// 领取至尊月卡钻石
proto.getDailySupMonthCardDiamond = function() {
    var expireTime = moment(this.supMonthCardTime).add(30, 'd').startOf('d');
    var now = moment();
    if (now.isAfter(expireTime)) {
        log.stats("至尊月卡已过期", {playerId: this.id, mcTime: this.supMonthCardTime});
        return Const.kErrorMonthCardExpire;
    }
    var getTime = moment(this.getSupMCDailyDiamondTime);
    if (getTime.isSame(now, 'd')) {
        log.stats("今日已领过至尊月卡钻石", {playerId:this.id});
        return Const.kErrorDuplicatedOpertaion;
    }
    var num = Util.randomRate(1/10) ? 1000 : 500;
    this.addMoney(num, 'diamond', "supMonthCard");
    this.getSupMCDailyDiamondTime = new Date();
    return Util.packageRes({diamond: num});
};

proto.getIsBoughtLifeCard = function(msg, next) {
    Db.Player.findById(this.id, function(err, player) {
        if (err) {
            log.error("[getIsBoughtLifeCard]数据库操作错误");
            next(err);
        }
        this.isBoughtLifeCard = player.isBoughtLifeCard;
        next(null, Util.packageRes({isBoughtLifeCard : player.isBoughtLifeCard}));
    }.bind(this));
}

// 领取终身月卡钻石
proto.getDailyLifeCardDiamond = function() {

    var now = moment();
    if (!this.isBoughtLifeCard) {
        log.stats("终身月卡未购买", {playerId: this.id});
        return Const.kErrorLifeCardNotBought;
    }

    var getTime = moment(this.getLifeCardDailyDiamondTime);
    if (getTime.isSame(now, 'd')) {
        log.stats("今日已领过终身月卡钻石", {playerId:this.id});
        return Const.kErrorDuplicatedOpertaion;
    }

    var num = Util.randomRate(1/10) ? 1000 : 500;
    this.addMoney(num, 'diamond', "LifeCard");
    this.getLifeCardDailyDiamondTime = new Date();
    return Util.packageRes({diamond: num});
};

/**
 *  计算3元礼包状态
 */
proto.getFirstPurchaseGiftStatus = function(){
    var status = [];
    var gift = activityHelper.getActivityInfo(activityHelper.activityType.FIRST_RECHARGE_GIFT);
    if (!gift || !gift.reward){
        return status;
    }

    var totalDays = gift.reward.length;  // 总共的天数;
    var day = 0;
    if (!!this.firstPurchaseGiftTime){
        day = weekUtil.getDateDiff(new Date(), new Date(this.firstPurchaseGiftTime));   // 今天第几天;
    }
    for (var i = 0; i < totalDays; ++i){
        if (!this.firstPurchaseGiftTime){
            status[i] = consts.kGainStatus.Not_Time_Yet;
            continue;
        }
        if (!!(this.firstPurchaseGainFlags & (1 << i))){
            // 已领取;
            status[i] = consts.kGainStatus.Gained;
        } else if (day == i){
            // 还未领取;
            status[i] = consts.kGainStatus.Can_Gain;
        } else if (day < i){
            // 还没到;
            status[i] = consts.kGainStatus.Not_Time_Yet;
        } else {
            // 过期;
            status[i] = consts.kGainStatus.Expired;
        }
    }
    return status;
};

/**
 * 刷新首充3元礼包信息
 * @param msg
 * @param next
 */
proto.refreshActivityFirstPurchaseGift = function(msg, next){
    var self = this;
    Db.Player.findById(self.id, function(err, player) {
        if (!!err || !player) {
            log.error("[getActivityFirstPurchaseGift]数据库操作错误");
            next(err);
            return;
        }
        self.firstPurchaseGiftTime = player.firstPurchaseGiftTime;
        log.info("firstPurchaseGiftTime:"+ self.firstPurchaseGiftTime);
        self.getActivityFirstPurchaseGift(msg, next);
    });
};

/**
 * 获取首充3元礼包信息
 * @param msg
 * @param next
 */
proto.getActivityFirstPurchaseGift = function(msg, next){
    next(null, Util.packageRes({
        firstPurchaseGiftTime : this.firstPurchaseGiftTime,
        firstPurchaseGainStatus : this.getFirstPurchaseGiftStatus()
    }));
};

/**
 * 获取新手礼包天降黄金
 * @param msg
 * @param next
 */
proto.gainNewPlayerGiftBag = function(msg, next){
    var self = this;
    Db.Player.findById(self.id, function(err, player) {
        if (!!err || !player) {
            log.error("[gainNewPlayerGiftBag]数据库操作错误");
            next(null, Const.kErrorNotBought);
            return;
        }
        self.isNewbiePackageBought = player.isNewbiePackageBought;
        if (!!self.isNewbiePackageBought && !self.hasGainedNewGiftBag){
            self.hasGainedNewGiftBag = true;
            self.addGoods(2, "goldRain", "新手礼包");
        }
        return next(null, Util.packageRes());
    });
};

/**
 * 领取首充3元礼包
 * @param msg
 * @param next
 */
proto.gainActivityFirstPurchaseGift = function(msg, next){
    // 未买;
    if (!this.firstPurchaseGiftTime){
        next(null, Const.kErrorNotBought);
        return;
    }
    var gift = activityHelper.getActivityInfo(activityHelper.activityType.FIRST_RECHARGE_GIFT);
    if (!gift || !gift.reward){
        next(null, Const.kErrorNoneReward);
        return;
    }
    var day = weekUtil.getDateDiff(new Date(), new Date(this.firstPurchaseGiftTime));
    if (day >= gift.reward.length){
        next(null, Const.kErrorNoneReward);
        return;
    }
    // 已经领取过
    if (!!(this.firstPurchaseGainFlags & (1 << day))){
        next(null, Const.kErrorHasGot);
        return;
    }
    this.firstPurchaseGainFlags |=  (1 << day);

    // 领取奖励
    var diamond = 0;
    if (!!gift.reward[day] && !isNaN(gift.reward[day].diamond)){
        diamond = gift.reward[day].diamond;
        this.addMoney(diamond, 'diamond', 'gainActivityFirstPurchaseGift');
    } else {
        diamond = 0;
    }

    next(null, Util.packageRes({
        firstPurchaseGiftTime : this.firstPurchaseGiftTime,
        diamond : diamond,
        firstPurchaseGainStatus : this.getFirstPurchaseGiftStatus()
    }));
};

//3元礼包是否结束
proto.personalThreeFinish = function(msg, next) {
    var end = false;
    if (!this.firstPurchaseGiftTime) {
        next(null, Util.packageRes({
            result : end
        }));
        return;
    }
    var gift = activityHelper.getActivityInfo(activityHelper.activityType.FIRST_RECHARGE_GIFT);
    if (!gift || !gift.reward){
        next(null, Util.packageRes({
            result : end
        }));
        return;
    }

    var day = weekUtil.getDateDiff(new Date(), new Date(this.firstPurchaseGiftTime));
    if (day >= gift.reward.length){
        end = true;
    } else {
        end = false;
    }

    //log.info("[personalThreeFinish] 3元结束:%d", end);
    next(null, Util.packageRes({
        firstPurchaseGiftTime : this.firstPurchaseGiftTime,
        result : end
    }));
};

/**
 * 获取砸金蛋信息;
 * @param msg
 * @param next
 */
proto.getGoldenEggsInfo = function(msg, next){
    // 活动未开启;
    if (!activityHelper.hasActivityOpened(activityHelper.activityType.SMASHING_GOLDEN_EGGS)){
        next(null, Const.kErrorInvalidDuration);
        return;
    }
    var self = this;
    Db.Player.findById(self.id, function(err, player) {
        if (!!err || !player) {
            log.error("[getGoldenEggsInfo]数据库操作错误");
            next(err);
            return;
        }

        var goldEggsPurchaseNum = player.goldEggsPurchaseNum;
        self.goldEggsPurchaseNum = player.goldEggsPurchaseNum;
        self.goldEggsHammersNum = player.goldEggsHammersNum;

        // 如果不是今天充值的，则将今天的锤子数量重置为0;
        if (!moment().isSame(moment(player.purchaseTime), 'day')){
            goldEggsPurchaseNum = 0;
        }

        next(null, Util.packageRes({
                goldEggsPurchaseNum : goldEggsPurchaseNum,
                goldEggsHammersNum : self.goldEggsHammersNum,
                goldEggs : self.goldEggs,
                goldEggsTotalReward : self.dailyEvent.goldEggsTotalReward
            }));
    });
};

/**
 * 砸金蛋;
 * @param msg
 * @param next
 */
proto.smashingGoldenEggs = function(msg, next){
    var self = this;
    if (!msg.pos){
        next(null, Const.kErrorMissingParam);
        return;
    }
    // 活动未开启;
    if (!activityHelper.hasActivityOpened(activityHelper.activityType.SMASHING_GOLDEN_EGGS)){
        next(null, Const.kErrorInvalidDuration);
        return;
    }
    var eggAct = activityHelper.getActivityInfo(activityHelper.activityType.SMASHING_GOLDEN_EGGS);
    if (!eggAct) {
        next(null, Const.kErrorInvalidDuration);
        return;
    }

    // 重复的位置;
    for (var k = 0, l = self.goldEggs.length; k < l; ++k){
        if (!self.goldEggs[k]){
            continue;
        }
        if (self.goldEggs[k].pos == msg.pos){
            next(null, Const.kErrorDuplicatedOpertaion);
            return;
        }
    }

    if (!eggAct.consume) eggAct = {};
    if (!eggAct.consume.hammer || isNaN(eggAct.consume.hammer)) eggAct.consume.hammer = activityHelper.defaultVal.GoldenEggs_Consume_Hammer;
    if (!eggAct.consume.diamond || isNaN(eggAct.consume.diamond)) eggAct.consume.diamond = activityHelper.defaultVal.GoldenEggs_Consume_Diamond;

    // 锤子是否足够;
    //console.warn('当前锤子数1:%d', self.goldEggsHammersNum);
    if (self.goldEggsHammersNum < eggAct.consume.hammer){
        next(null, Const.kErrorNotEnoughHammer);
        return;
    }

    // 钻石是否足够;
    if (!self.costMoney(eggAct.consume.diamond, 'diamond', 'smashingGoldenEggs')) {
        next(null, Const.kErrorNotEnoughDiamond);
        return;
    }

    // 命中金蛋;
    var crystal = self.hitGoldenEggs(msg.pos, eggAct);
    if (!!crystal && !isNaN(crystal)){
        self.addMoney(crystal, 'crystal', 'smashingGoldenEggs');
        self.dailyEvent.goldEggsTotalReward += crystal;
    }

    // 消耗锤子;
    self.goldEggsHammersNum -= eggAct.consume.hammer;
    //console.warn('当前锤子数2:%d', self.goldEggsHammersNum);

    Db.Player.findByIdAndUpdate({_id:self.id}, {$inc:{goldEggsHammersNum: -1 * eggAct.consume.hammer}}, function(err, player) {
        log.info("cost hammer", {cost: eggAct.consume.hammer, playerId:self.id, reason:'smashingGoldenEggs'});
        //console.warn('当前锤子数3:%d', self.goldEggsHammersNum);
        //self.goldEggsHammersNum = player.goldEggsHammersNum;
        //console.warn('当前锤子数4:%d', self.goldEggsHammersNum);
        next(null, Util.packageRes({
            goldEggsHammersNum : self.goldEggsHammersNum,
            goldEggsCrystal : crystal,
            goldEggs : self.goldEggs,
            goldEggsTotalReward : self.dailyEvent.goldEggsTotalReward
        }));
    });
};

/**
 * 命中金蛋;
 * @param pos         位置，从1开始;
 * @param eggAct      金蛋配置;
 * @returns {number}  水晶奖励
 */
proto.hitGoldenEggs = function(pos, eggAct){
    var crystal = 0;
    if (!pos || !eggAct || !Array.isArray(eggAct.reward) || !eggAct.reward.length){
        return crystal;
    }
    // 当命中的下标已满的时候，需要重置下;
    if (!this.goldEggs || this.goldEggsRewardIdx.length >= eggAct.reward.length){
        this.goldEggsRewardIdx = [];
        this.goldEggs = [];
    }

    var totalRate = 0;
    var remainEggs = {};
    var maxCrystal = 0;
    for (var i = 1, j = eggAct.reward.length; i <= j; ++i){
        if (!eggAct.reward[i - 1] || !eggAct.reward[i - 1].rate || eggAct.reward[i - 1].rate < 0){
            continue;
        }
        if (eggAct.reward[i - 1].crystal > maxCrystal){
            maxCrystal = eggAct.reward[i - 1].crystal;
        }
        if (this.goldEggsRewardIdx.indexOf(i) >= 0){
            continue;
        }

        totalRate += eggAct.reward[i - 1].rate;
        remainEggs[totalRate] = {
            crystal : eggAct.reward[i - 1].crystal,
            pos : i
        };
    }

    var hitRate = Util.randomInt(0, totalRate);

    for (var rate in remainEggs){
        if (!remainEggs.hasOwnProperty(rate)) continue;
        if (hitRate <= rate){
            crystal = remainEggs[rate].crystal;
            this.goldEggsRewardIdx.push(remainEggs[rate].pos);
            this.goldEggs.push({
                crystal : crystal,
                pos : pos
            });
            break;
        }
    }

    // 当无金蛋可砸，或者本次中奖达到最大钻石数，则刷新;
    if (this.goldEggsRewardIdx.length >= eggAct.reward.length || crystal >= maxCrystal){
        this.goldEggsRewardIdx = [];
        this.goldEggs = [];
    }

    return crystal;
};

/**
 * 领取关注奖励
 * @param msg
 * @param next
 */
proto.gainSubscribeReward = function(msg, next){
    if (!!this.isSubscribed || this.subscribed == consts.kSubscribedType.SUBSCRIBED_HAS_GAINED){
        // 已经领取过;
        next(null, Const.kErrorHasGot);
        return;
    }
    if (this.subscribed == consts.kSubscribedType.SUBSCRIBED_NOT_GAINED){
        // 关注但未领奖;
        this.subscribed = consts.kSubscribedType.SUBSCRIBED_HAS_GAINED;
        var diamond = Conf.subscribedReward;
        if (!!diamond)
            this.addMoney(diamond, "diamond", "关注公众号奖励");
        next(null, Util.packageRes({ret: consts.kSubscribedType.SUBSCRIBED_HAS_GAINED}));
    } else {
        // 未关注;
        var self = this;
        var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
        http.request(route_url + "/isSubscribed", {
            method : "post",
            data : {
                openId : !!self.subChannelUid ? self.subChannelUid : self.uniqueId,
                channel : self.channel
            }
        }, function(err, rep){
            if (!!err || !rep){
                log.info("gainSubscribeReward failed!", rep, err, !!self.subChannelUid ? self.subChannelUid : self.uniqueId);
                next(null, Util.packageRes({ret: consts.kSubscribedType.UN_SUBSCRIBED}));
                return;
            }
            if (!rep.subscribe){
                next(null, Util.packageRes({ret: consts.kSubscribedType.UN_SUBSCRIBED}));
                return;
            }
            self.subscribed = consts.kSubscribedType.SUBSCRIBED_NOT_GAINED;
            self.gainSubscribeReward(msg, next);
        });
    }
};

// 使用米达斯之手
proto.handOfMidasTap = function(msg) {
    if (!msg.taps) {
        return Const.kErrorMissingParam;
    }
    if (isNaN(msg.taps)) {
        return Const.kErrorInvalidParam;
    }
    var skill = this.masterSkills[consts.kMasterSkillTypeHandOfMidas];
    var duration = formula.masterSkillDuration(this, consts.kMasterSkillTypeHandOfMidas);
    if (moment(skill.lastTimeUse).isBefore(moment(this.lastMidasEndTime))) {
        log.stats("不在米达斯之手技能的有效时间内", {lastTimeUse:skill.lastTimeUse, duration:duration, playerId:this.id});
        return Const.kErrorInvalidDuration;
    }
    if (msg.taps / duration > 30 && !this.powerOfHoldingBuff) {
        log.stats("米达斯之手点击过快", {taps:msg.taps, duration:duration, playerId:this.id});
        msg.taps = Math.ceil(duration);
    }
    this.lastMidasEndTime = new Date();
    var gold = formula.goldByMidas(this);
    gold *= msg.taps;
    this.addMoney(gold, 'gold');
    return Util.packageRes({gold: gold});
};

// 完成某项新手引导
proto.setTutorialFinish = function(msg) {
    this.tutorials[msg.id] = true;
    return Util.packageRes();
};

// 领取比赛奖励
proto.getContestReward = function(msg, next) {
    var self = this;
    if (!this.contestId || this.contestId == "none") {
        return next(null, Const.kErrorContestNotStart);
    }
    async.waterfall([

            function(cb) {
                var time = self.contestStartTime;
                if (!time) {cb(true)}
                var diff = moment().diff(moment(time), 'hours', true);
                if (diff < consts.kContestDuration) {
                    cb(true);
                } else {
                    Db.getPlayerContestRank(self.id, self.contestId, cb)
                }
            }
        ],
        function(err, rank) {
            if (err || _.isNull(rank)) {
                log.error("[getContestReward] failed!", {playerId:self.id, contestId:self.contestId});
                return next(null, Const.kErrorContestGetRewardFailed)
            }
            log.stats("getContestReward", {rank: rank, playerId: self.id, contestId:self.contestId});
            rank+=1;   // redis 返回第一名从0开始;
            var reward = self.addContestReward(rank);
            self.contestId = "none";
            self.contestStartTime = 0;
            return next(null, Util.packageRes({rank: rank, reward: reward}));
        }
    );
};

// 领取黄金十二宫奖励
proto.getZodiacReward = function(msg, next) {
    var gid = this.guild;
    if (!gid) {
        return next(null, {code:10000, msg:"不在公会中"});
    }
    var hour = moment().hour();
    if (hour < 21) {
        return next(null, {code:10000, msg:"时间不正确"});
    }
    this.checkDailyEventTime();
    if (this.dailyEvent.zodiacReward) {
        return next(null, {code:10000, msg:"已经领过奖励"});
    }
    this.dailyEvent.zodiacReward = true;
    var self = this;
    Db.getZodiacGuildRank(gid, function(err, rank) {
        if (err) {
            return next(null, {code:10000, msg:"数据库异常"});
        }
        if (_.isNaN(rank)) {
            return next(null, {code:10000, msg:"公会没有名次", show:true});
        }
        rank++;
        var confFile = Conf.guildGoldScore;
        var meta = _.find(confFile, function(v) {
            var range = v.rank;
            if (range[1]) {
                return rank >= range[0] && rank <= range[1];
            } else {
                return rank == range[0];
            }
        });
        if (!meta) {
            return next(null, Util.packageRes({rank:rank, reward:{}}));
        }
        self.addMoney(meta.crystal, 'crystal', 'zodiac');
        self.addMoney(meta.fragment, 'fragment', 'zodiac');

        return next(null, Util.packageRes({rank:rank, reward: {crystal:meta.crystal, fragment: meta.fragment}}));
    })
};

// 根据排名得到比赛奖励
proto.addContestReward = function(rank) {
    var confFile = Conf.contest;
    var meta = _.find(confFile, function(v) {
        var range = v.range;
        return rank >= range[0] && rank <= range[1];
    });
    if (!meta) {return;}
    this.addMoney(meta.diamond, 'diamond', "contestReward");
    this.addMoney(meta.weapon, 'weaponItem', "contestReward");
    this.addMoney(meta.crystal, 'crystal', "contestReward");

    return {diamond: meta.diamond, weaponItem:meta.weapon, crystal:meta.crystal};
};

// 检查是否可以比赛
proto.checkContestAvailable = function() {
    if (this.contestId != "none") {
        return false;
    }
    var weekday = moment().isoWeekday();
    return !(weekday != 1 && weekday != 4);

};

// 获取能否比赛状态
proto.isContestAvailable = function(msg) {
    return Util.packageRes({available:this.checkContestAvailable()})

};

// 加入比赛
proto.joinContest = function(msg, next) {
    var self = this;
    if (this.isJoinContest) {
        log.stats("重复进入比赛", {playerId:this.id});
        return next(null, Const.kErrorContestNotStart);
    }
    this.isJoinContest = true;
    if (!this.checkContestAvailable()) {
        log.error("加入比赛失败", {contestId:this.contestId, playerId:this.id});
        return next(null, Const.kErrorContestNotStart);
    }
    var str = "";
    if (this.cheatLevel) {
        str = "cheat";
    }
    var day = moment().format('YYYY-MM-DD');
    if (moment().diff(moment(this.createTime), 'day', true) < 15) {
        str = "new";
    }
    async.waterfall([
            function(cb) {
                Db.inc("contestPlayer"+str+day, cb);
            },
            function(idx, cb) {
                var contestId = str + day+ Math.ceil(idx / Conf.contestSize);
                if (idx % Conf.contestSize == 1) {
                    var now = new Date();
                    Db.setnx("contest"+contestId, now, function(){});
                    cb(null, contestId, now);
                } else {
                    Db.getDict("contest"+contestId, function(err, time) {
                        cb(null, contestId, time ? new Date(time) : new Date());
                    })
                }
            }
        ],
        function(err, contestId, time) {
            if (err || moment().diff(moment(time), 'hours', true) >= consts.kContestDuration) {
                log.stats("[join contest] 生成contestId失败", {playerId:this.id});
                return next(null, Const.kErrorDBDataRacing);
            }
            log.stats("[join contest] success", {playerId: this.id, contestId: contestId});
            self.contestId = contestId;
            self.contestStartTime = time;
            self.resetForPrestige();
            Db.updatePlayerContestRank(this.contestId, this.id, this.stage, function() {});
            next(null, Util.packageRes({contestId: contestId, startTime: time}));
        }.bind(this)
    )
};

// 加入黄金十二宫
proto.joinZodiac = function(msg) {
    var num = moment().hour() - 8;
    if (moment().minute() >= 30) {
        return {code:10000, msg:"入口开启时间为每个整点的前30分钟", show:true};
    }
    if (num <= 0 || num > 12) {
        return {code:10000, msg:"黄金十二宫尚未开启，或已经结束", show:true};
    }
    var day = moment().format('YYYY-MM-DD');
    if (_.startsWith(this.zodiacId, day)) {
        return {code:10000, msg:"今日已经参加过黄金十二宫"};
    }
    this.zodiacId = day + num;
    Db.updatePlayerZodiacRank(this.zodiacId, this.id, 0, function() {});
    Db.updatePlayerZodiacBPRank(this.zodiacId, this.id, formula.maxFightValue(this), function() {});
    return Util.packageRes({id:this.zodiacId});
};

// 增加商店道具
proto.addShopItem = function(num, type, reason) {
    var typeName = '';
    if (isNaN(parseInt(type))) {
        type = consts.kShopItemName.indexOf(type);
        typeName = type;
    } else {
        typeName = consts.kShopItemName[type];
    }
    if (isNaN(num)) {
        num += '';
        log.error("[add shop item] 非法的num", {playerId: this.id, invalidNum:num, typeName:typeName, reason: reason});
        return;
    }
    log.stats("[add shop item]", {playerId: this.id, typeName:typeName, num:num, reason: reason});
    this.shopItems[type] = this.shopItems[type] || 0;
    this.shopItems[type] += num;
};

// 消费商店道具
proto.costShopItem = function(type) {
    var num = this.shopItems[type];
    if (!num || num < 1) {
        return false;
    }
    var typeName = '';
    if (isNaN(parseInt(type))) {
        typeName = type;
    } else {
        typeName = consts.kShopItemName[type];
    }
    log.stats("cost shop item", {playerId: this.id, typeName: typeName});
    this.shopItems[type] --;
    return true;
};

// 购买十连抽
proto.buyTenTimes = function() {

    var cost = Conf.shop[consts.kShopItemTenTimes].cost;
    if (!this.costShopItem(consts.kShopItemTenTimes) && !this.costMoney(cost, consts.kMoneyTypeDiamond, "tentimes")) {
        return Const.kErrorNotEnoughMoney;
    }
    var content = ['goldRain', 'autoTap', 'doom', 'powerOfHolding', 'gold', 'relic'];
    var result = [];
    for (var i = 0; i < 8; i++) {
        var r = _.sample(content);
        var num;
        switch (r) {
            case 'gold':
                num = formula.goldRain(this) * Util.randomReal(1, 5);
                this.addMoney(num, 'gold', 'tentimes');
                break;
            case 'relic':
                num = formula.relicsByPrestige(this) / (this.stage * Conf.prestigeCostCoe) * 200;
                num = Math.max(5, num);
                this.addMoney(num, 'relic', 'tentimes');
                break;
            default :
                num = 1;
                var idx = content.indexOf(r) + 1;
                this.addShopItem(num, idx, 'tentimes');
                break;
        }
        result.push({type: r, num: num})
    }
    var weaponCount = Util.randomInt(3, 10);
    result.push({type:'weaponItem', num: weaponCount});
    this.addMoney(weaponCount, consts.kMoneyTypeWeaponItem, 'tentimes');

    result.push({type: 'refreshSkill', num:1});
    this.addShopItem(1, consts.kShopItemRefreshSkill, 'tentimes');
    return Util.packageRes(result);
};

// 刷新黑市
proto.refreshMarket = function(msg) {
    // 未开启;
    if (!activityHelper.hasActivityOpened(activityHelper.activityType.BLACK_MARKET)){
        return Const.kErrorInvalidDuration;
    }
    if (!this.costMoney(50, 'diamond', 'refreshMarket')) {
        return Const.kErrorNotEnoughDiamond;
    }
    return Util.packageRes();
};

// 抽装备
proto.buyEquip = function(msg, next) {
    if (msg.type == 2) {
        if (!this.costMoney(Conf.market[9].cost, consts.kMoneyTypeDiamond, "抽装备")) {
            next(null, Const.kErrorNotEnoughMoney);
            return;
        }
    } else {
        if (!this.costMoney(260, consts.kMoneyTypeCrystal, "抽装备")) {
            next(null, Const.kErrorNotEnoughMoney);
            return;
        }
    }
    var content = ['goldRain', 'autoTap', 'doom', 'powerOfHolding', 'gold', 'relic', 'equip', 'fragment', 'weaponItem', 'refreshSkill'];
    var r = _.sample(content);
    var result;
    if (r == 'equip') {
        var eid = Util.randomInt(1, _.size(Conf.equipMeta));
        this.addEquip(eid, function(isEquip, num) {
            if (isEquip) {
                result ={type:'equip', id: eid};
            } else {
                result = {type:'fragment', num: num};
            }
            return next(null, Util.packageRes(result));
        });
        return;
    }
    var num;
    switch (r) {
        case 'gold':
            num = formula.goldRain(this) * Util.randomReal(1, 5);
            break;
        case 'relic':
            num = formula.relicsByPrestige(this) / (this.stage * Conf.prestigeCostCoe) * 200;
            num = Math.max(5, num);
            break;
        case 'fragment':
            num = Util.randomInt(3, 10);
            break;
        default:
            num = 1;
            break;
    }
    this.addGoods(num, r, '抽装备');
    result = {type: r, num: num};
    return next(null, Util.packageRes(result));
};

// 装备十连抽
proto.buyTenEquip = function(msg, next) {
    if (msg.type == 2) {
        if (!this.costMoney(Conf.market[10].cost, consts.kMoneyTypeDiamond, "装备十连抽")) {
            next(null, Const.kErrorNotEnoughMoney);
            return;
        }
    } else {
        if (!this.costMoney(2480, consts.kMoneyTypeCrystal, "装备十连抽")) {
            next(null, Const.kErrorNotEnoughMoney);
            return;
        }
    }
    var content = ['goldRain', 'autoTap', 'doom', 'powerOfHolding', 'gold', 'relic'];
    var result = [];
    for (var i = 0; i < 8; i++) {
        var r = _.sample(content);
        var num;
        switch (r) {
            case 'gold':
                num = formula.goldRain(this) * Util.randomReal(1, 5);
                this.addMoney(num, 'gold', '装备十连抽');
                break;
            case 'relic':
                num = formula.relicsByPrestige(this) / (this.stage * Conf.prestigeCostCoe) * 200;
                num = Math.max(5, num);
                this.addMoney(num, 'relic', '装备十连抽');
                break;
            default :
                num = 1;
                var idx = content.indexOf(r) + 1;
                this.addShopItem(num, idx, '装备十连抽');
                break;
        }
        result.push({type: r, num: num})
    }
    var fragment = Util.randomInt(3, 10);
    result.push({type:'fragment', num: fragment});
    this.addMoney(fragment, consts.kMoneyTypeFragment, '装备十连抽');

    var eid = Util.randomInt(1, _.size(Conf.equipMeta));
    this.addEquip(eid, function(isEquip, num) {
        if (isEquip) {
            result.push({type:'equip', id: eid});
        } else {
            result.push({type:'fragment', num: num});
        }
        return next(null, Util.packageRes(result));
    })
};

// 增加装备
proto.addEquipValue = function(type, val) {
    if (!this.equipValues) {this.equipValues = [0,0,0,0,0,0,0]}
    this.equipValues[type] += val;
};

// 更新装备数值
proto.updateEquipValue = function(msg, next) {
    Db.Player.findByIdWithFields(this.id, ['equips', 'id'], function(err, player) {
        var equips = player.equips;
        var meta = Conf.equipMeta;
        var values = [0,0,0,0,0,0,0];
        _.each(equips, function(v, k) {
            var type = meta[k].type;
            values[type] += meta[k].val / 30 * v.level;
        });
        this.equipValues = values;
        next(null, Util.packageRes(this.equipValues));
    }.bind(this))
};

// 增加装备经验值
proto.addEquipExp = function(exp) {
    Db.Player.findByIdWithFields(this.id, ['equips', 'id'], function(err, player) {
        var equips = player.equips;
        var meta = Conf.equipMeta;
        for(var i = 1; i < 7;i++) {
            var id = this.masterEquips[i];
            if (id) {
                var e = equips[id];
                var limit = formula.masterEquipExp(this, id, e.level);
                if (e.level != e.step * 10) {
                    e.exp += exp;
                    if (e.exp >= limit) {
                        e.exp = 0;
                        e.level ++;
                        this.addEquipValue(meta[id].type, meta[id].val / 30);
                    }
                }
            }
        }
        player.markModified('equips');
        player.save();
    }.bind(this));
};

// 增加装备
proto.addEquip = function(eid, cb) {
    Db.Player.findByIdWithFields(this.id, ['equips', 'id'], function(err, player) {
        player.equips = player.equips || {};
        var isEquip = false;
        var meta = Conf.equipMeta[eid];
        var num = (meta.rare+1)*20;// TODO:加入稀有度区分
        if (player.equips[eid]) {
            this.addMoney(num, consts.kMoneyTypeFragment, '抽装备');
        } else {
            isEquip = true;
            var tar = 0;
            var skill = Util.randomInt(1, 9);
            if (skill == 9) {
                tar = Util.randomInt(1, 33);
            }
            this.addEquipValue(meta.type, meta.val / 30);
            log.stats("增加装备", {playerId:this.id, openId:this.uniqueId, equip:eid});
            var obj = {};
            obj["equips."+eid] ={
                exp:0,
                level:1,
                step:1,
                skill:skill,
                target: tar
            };
            Db.Player.update({id:this.id}, {$set:obj}, function() {});
        }
        cb(isEquip, num);
    }.bind(this))
};

// 装备进化
proto.evolutionEquip = function(msg, next) {
    var eid = msg.eid;
    var self = this;
    Db.Player.findByIdWithFields(this.id, ['equips', 'id'],function(err, player) {
        if (err) {
            return next(null, {code:10000, msg:err});
        }
        var e = player.equips[eid];
        if (!e) {
            return next(null, {code:10000, msg:"装备不存在", show:true});
        }
        if (e.step < 3 && e.level != e.step * 10) {
            return next(null, {code:10000, msg:"级别不足", show:true})
        }
        var meta = Conf.equipMeta[eid];
        var cost = 100 + (e.step + meta.rare-1) * 20;
        if (!self.costMoney(cost, consts.kMoneyTypeFragment, 'evolution')) {
            return next(null,Const.kErrorNotEnoughMoney);
        }
        e.step = Math.min(3, e.step+1);
        var skill = Util.randomInt(1, 9);
        e.skill = skill;
        if (skill == 9) {
            e.target = Util.randomInt(1, 33);
        }
        player.markModified('equips');
        player.save(function() {
            next(null, Util.packageRes({result:true, cost:cost, equip:e}));
        });
    })
};

// 查询装备信息
proto.queryEquips = function(msg, next) {
    Db.Player.findByIdWithFields(this.id, ['equips'],function(err, player){
        player.equips = player.equips || {};
        next(null, Util.packageRes(player));
    }.bind(this))
};

// 设置装备
proto.setMasterEquips = function(msg) {
    this.masterEquips = msg.equips;
    return Util.packageRes();
};

// 清空pk保护时间
proto.breakProtect = function(msg, next) {

    Db.Player.findByIdAndUpdate({_id:this.id}, {$set:{protectExpire: new Date(0)}}, function(err, player) {
        return next(null, Util.packageRes());
    }.bind(this));
};

// 无用
proto.queryEnemyInfo = function(msg, next) {
    Db.Player.findByIds(this.enemies, function(err, players) {
        if (err) {
            log.error("[getRankList] getPlayersInfo出错", err);
            return next(null, err)
        }
        var list = _.map(players, function(player) {

            return {
                id : player.id,
                name : player.name,
                avatar : player.avatar,
                gold : player.gold * Conf.goldPerPK,
                relic : player.relic * Conf.relicPerPK,
                fightValue : formula.totalFightValue(player)
            };
        });
        next(null, Util.packageRes(list));
    });
};

// 无用
proto.addEnemy = function(msg) {
    if (this.enemies.length >= this.enemyLimit) {
        return Util.packageRes({result:false});
    }
    if (!msg.opponentId) {
        return Const.kErrorMissingParam;
    }
    if (this.enemies.indexOf(msg.opponentId) != -1) {
        return {show: true, msg:"对手已经在列表中"};
    }
    this.enemies.push(msg.opponentId);
    return Util.packageRes({result:true});
};

// 无用
proto.delEnemy = function(msg) {
    var oppId = msg.opponentId;
    if (!msg.opponentId) {
        return Const.kErrorMissingParam;
    }
    var idx = this.enemies.indexOf(oppId);
    if (idx != -1) {
        this.enemies.splice(idx, 1);
        return Util.packageRes({result: true});
    } else {
        return Util.packageRes({result: false});
    }
};

// 无用
proto.addEnemyLimit = function() {
    if (!this.costMoney(Conf.enemyLimitCost * (this.enemyLimit+1), 'diamond', "addEnemyLimit")) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.enemyLimit ++;
    return Util.packageRes({limit:this.enemyLimit});
};

// 无用
proto.fightEnemy = function() {
    if (!this.costMoney(Conf.fightEnemyCost, 'diamond', "fightEnemy")) {
        return Const.kErrorNotEnoughDiamond;
    }
    return Util.packageRes();
};

// 更新士气
proto.updateMorale = function() {
    var remain = 0;
    if (this.morale < formula.maxMorale(this)) {
        var diff = moment().diff(moment(this.lastTimeMoraleRestore), 'm');
        var restore = Math.floor(diff / Conf.minutesPerMorale);
        this.addMorale(restore);
        if (this.morale < formula.maxMorale(this)) {
            this.lastTimeMoraleRestore = moment(this.lastTimeMoraleRestore).add(restore*Conf.minutesPerMorale, 'm').toDate();
            remain = Conf.minutesPerMorale - moment().diff(moment(this.lastTimeMoraleRestore), 'm', true);
        } else {
            this.lastTimeMoraleRestore = new Date();
        }
    }
    return Util.packageRes({morale: this.morale, remain: Math.ceil(remain * 60)});
};
//
//proto.revenge = function(msg) {
//    var msgId = msg.msgId;
//    if (msgId == void 0) {
//        return Const.kErrorMissingParam;
//    }
//    var pkMsg = this.pkMessages[msgId];
//    if (pkMsg.opponentId != msg.opponentId) {
//        log.error("id 不匹配，", pkMsg, msg);
//        return Const.kErrorInvalidParam;
//    }
//    return Util.packageRes();
//};

// 无用
proto.revengeFinish = function(msg) {
    var msgId = msg.msgId;
    var pkMsg = this.pkMessages[msgId];
    pkMsg.isRevenge = true;
    return Util.packageRes();
};

// 购买士气
proto.buyMorale = function() {
    var diff = formula.maxMorale(this) - this.morale;
    var cost = diff * Conf.costPerMorale;
    if (!this.costMoney(cost, consts.kMoneyTypeDiamond, "buyMorale")) {
        return Const.kErrorNotEnoughMoney;
    }
    this.addMorale(diff);
    return Util.packageRes();
};

// 增加士气
proto.addMorale = function(num) {
    this.morale = Math.min(formula.maxMorale(this), this.morale + num);
};

// 消费士气
proto.costMorale = function(msg) {
    var num = msg.num;
    if (this.morale >= formula.maxMorale(this)) {
        this.lastTimeMoraleRestore = new Date();
    }
    this.morale = Math.max(0, this.morale - num);
    return Util.packageRes();
};

// 获取pk消息
proto.getPKMessage = function() {

    return Util.packageRes(this.pkMessages);
};

// 无用
proto.pkByOtherPlayer = function(result, msg) {
    if (result.isWin) {
        var protectExpire = moment().add(Conf.protectTimeByPK, 'h').toDate();
        Db.Player.findByIdAndUpdate({_id:this.id}, {$set:{protectExpire: protectExpire}}, function(err, player) {});
        this.costMoney(result.relic, 'relic', "pk");
        this.costMoney(result.gold, 'gold', "pk");
    } else {
        this.addMoney(result.defenderGold, 'gold', 'pk');
        this.addMoney(result.defenderRelic, 'relic', 'pk');
    }
    log.stats("pkByOtherPlayer", {playerId: this.id, gold: result.gold, relic:result.relic, isLose: result.isWin});
    this.pkMessages.unshift(msg);
    this.pkMessages.splice(10, 10);
    this.save();
};

// 复活英雄
proto.revivalHero = function(msg) {
    var id = msg.heroId;
    var hero = this.heroes[id];
    var revivalTime = hero.revivalTime;
    if (moment().isAfter(moment(revivalTime))) {
        return { show:true, msg : "英雄没有死亡" };
    }
    var cost = Math.floor(moment(revivalTime).diff(moment(), 'h', true) * Conf.heroRevivalCost);
    if (!this.costMoney(cost, 'diamond', 'revivalHero')) {
        return Const.kErrorNotEnoughDiamond;
    }
    hero.revivalTime = new Date();
    return Util.packageRes({cost : cost});
};

// 获取邮件
proto.getMails = function(msg, next) {
    var self = this;
    async.waterfall([
            function(cb) {
                Db.Player.findByIdWithFields(self.id, {mailbox:1}, cb)
            },
            function(player, cb) {
                self.mailbox = player.mailbox;
                Db.mail.findByIds(_.pluck(self.mailbox, 'id'), cb);
            }
        ],
        function(err, mails) {
            if (err || !mails) {
                log.error("[getMails] 出错", err);
                return next(null, {code: 10000, msg:"获取邮件出错"});
            }
            var list = [];
            for (var mailId in self.mailbox){
                if (!self.mailbox.hasOwnProperty(mailId)) continue;
                var item = self.mailbox[mailId];
                if (!item) continue;
                var mail = mails[mailId];
                if (!mail) continue;
                list.push({
                    id : mail.id,
                    title: mail.title,
                    message: mail.message,
                    from: mail.from,
                    attachments : mail.attachments,
                    read: item.read,
                    getGoods: item.getGoods
                });
            }
            next(null, Util.packageRes(list));
        }
    );
};

// 删除邮件
proto.delMail = function(msg, next) {
    Db.Player.update({_id:this.id}, {$pull:{mailbox:{getGoods:msg.getGoods, read:msg.read, id: msg.id}}}, function() {
        return next(null, Util.packageRes());
    });
};

// 设置邮件已读
proto.readMail = function(msg, next) {
    var idx = msg.idx;
    var obj = {};
    obj["mailbox."+idx+".read"] = 1;
    Db.Player.update({_id:this.id}, {$set:obj}, function(err) {
        if (err) {
            log.error("read mail fail.", {err : err});
        }
        return next(null, Util.packageRes());
    });
};

// 领取邮件附件物品
proto.getMailAttachments = function(msg, next) {
    var idx = msg.idx;
    if (this.mailbox[idx].getGoods) {
        log.stats("领取物品请求重复", {playerId: this.id});
        return next(null, {code : 10000, msg: "领取物品失败"});
    }
    this.mailbox[idx].getGoods = 1;
    var self = this;
    async.waterfall([
            function(cb) {
                Db.Player.findByIdWithFields(self.id, {mailbox:1}, cb);
            },
            function(player, cb) {
                var mailbox = player.mailbox;
                if (!mailbox[idx]) {
                    log.stats("邮件不存在", {playerId: self.id});
                    return cb(true);
                }
                if (mailbox[idx].getGoods) {
                    log.stats("重复领取邮件", {playerId: self.id});
                    return cb(true);
                } else {
                    Db.mail.findById(mailbox[idx].id, cb);
                }
            }
        ],
        function(err, mail) {
            if (err || !mail) {
                return next(null, {code : 10000, msg: "领取物品失败"});
            }
            var goods = mail.attachments;
            var obj = {};
            obj["mailbox."+idx+".getGoods"] = 1;
            Db.Player.update({_id:self.id}, {$set:obj}, function(err) {
                if (err) {
                    log.error("get mail fail.", {err : err});
                    return next(null, {code : 10000, msg:"get attachments fail."});
                }
                _.each(goods, function(v) {
                    self.addGoods(v.num, v.type, 'mail');
                });
                return next(null, Util.packageRes());
            });
        }
    )
};

// 增加整套武器
proto.addWeaponSets = function(num) {
    for (var i = 1; i <=33; i++) {
        this.heroWeapons[i] += num;
    }
    log.stats("加整套武器", {playerId:this.id, openId:this.uniqueId, num:num});
};

// 增加各种资源
proto.addGoods = function(num, name, reason) {
    if (isNaN(num)) {
        num += '';
        log.error("[add money] 非法的num", {playerId: this.id, invalidNum:num, typeName:name, reason:reason});
        return;
    }
    switch (name) {
        case 'gold':            // 金币
        case 'diamond':         // 钻石
        case 'relic':           // 圣物
        case 'crystal':         // 水晶
        case 'weaponItem':      // 武器道具
        case 'fragment':        // 碎片
            this.addMoney(num, name, reason);
            break;
        case 'goldRain':        // 天降黄金
        case 'autoTap':         // 自动攻击
        case 'doom':            // 死亡末日
        case 'refreshSkill':    // 刷新技能
        case 'powerOfHolding':  // 坚持神力
        case 'tenTimes':        // 十连抽
            this.addShopItem(num, name, reason);
            break;
        case 'set':
            this.addWeaponSets(num);
            break;
        case 'exp':
            this.addEquipExp(num);
            break;
        case 'attackMul' :
            this.addAttackMulTime(num);  // 增加攻击双倍时间;
            break;
        default:
            break;
    }
};

/**
 * 购买宝箱
 */
proto.buyTreasureChest = function(){
    // 未开启;
    if (!activityHelper.hasActivityOpened(activityHelper.activityType.TREASURE_CHEST)){
        return Const.kErrorInvalidDuration;
    }
    var maxTimes = Conf.treasureChestTimes;
    if (!maxTimes) maxTimes = activityHelper.defaultVal.Treasure_Chest_Max_Times;
    if (this.dailyEvent.treasureChestTimes >= maxTimes){
        return kErrorMaxTimes;
    }
    // 消耗;
    if (!Conf.treasureChest) {
        return Util.packageRes({
            remainAttMulTime : this.remainAttMulTime,
            treasureChestTimes : this.dailyEvent.treasureChestTimes
        });
    }
    var diamond = 0;
    for (var tcId in Conf.treasureChest){
        if (!Conf.treasureChest.hasOwnProperty(tcId)) continue;
        var tc = Conf.treasureChest[tcId];
        if (!tc) continue;
        if (!tc.cost) continue;
        diamond += tc.cost;
    }
    if (!this.costMoney(diamond, 'diamond', 'treasure chest')) {
        return Const.kErrorNotEnoughDiamond;
    }

    // 增加物品;
    for (var tid in Conf.treasureChest){
        if (!Conf.treasureChest.hasOwnProperty(tid)) continue;
        var meta = Conf.treasureChest[tid];
        if (!meta) continue;
        this.addGoods(meta.num, meta.name, 'treasure chest');
    }
    ++this.dailyEvent.treasureChestTimes;
    return Util.packageRes({
        remainAttMulTime : this.remainAttMulTime,
        treasureChestTimes : this.dailyEvent.treasureChestTimes
    });
};

// 购买黑市商品
proto.buyMarketItem = function(msg) {
    // 未开启;
    if (!activityHelper.hasActivityOpened(activityHelper.activityType.BLACK_MARKET)){
        return Const.kErrorInvalidDuration;
    }
    var id = msg.itemId;
    var meta = Conf.market[id];
    if (!this.costMoney(meta.cost, 'diamond', 'market')) {
        return Const.kErrorNotEnoughDiamond;
    }
    
    if (meta.type === 'gold'){
        this.addMoney(formula.goldRain(this) * meta.num, 'gold', 'market');
    } else {
        this.addGoods(meta.num, meta.type, 'market');
    }
    return Util.packageRes();
};

// 领取工会战争奖励
proto.getGuildWarReward = function(msg, next) {
    var uid = this.id;
    var wid = msg.wid;
    var gid = msg.gid;
    this.warRewardRecord = this.warRewardRecord || {};
    if (this.warRewardRecord[wid]) {
        return next(null, {code:10000, msg:"已经领取过", show:true})
    }
    this.warRewardRecord[wid] = true;
    var self = this;
    var war;
    async.waterfall(
        [
            function(cb) {
                Db.war.findById(wid, cb);
            },
            function(data, cb) {
                war = data;
                if (moment().isSame(war.createTime, 'day') && moment().hour() < 21) {
                    return cb("比赛未结束");
                }
                var guild = war.guilds[gid];
                if (!guild) {
                    return cb("公会不在该战争中");
                }
                var player = guild.players[uid];
                if (!player) {
                    return cb("玩家不在战斗中");
                }
                if (player.getReward) {
                    return cb("已经领取过")
                }
                var obj = {};
                obj["guilds."+gid+".players."+uid+".getReward"] = 1;
                Db.war.update({_id:wid}, {$set:obj}, function(err) {cb(err)});
            },
            function(cb) {
                Db.guild.findByIdWithFields(gid, ['upgrades'], cb);
            }
        ], function(err, guild) {
            if (err) {
                log.stats("领取公会战争奖励失败", {msg:err});
                return next(null, {code:10000, show:true, msg:err});
            }
            guild.upgrades = guild.upgrades || {};
            var obj = guild.upgrades[consts.kGuildUpgradeTypePKCrystal];
            var lv = obj ? obj.level : 1;
            var num = calcWarReward(war, gid, lv);
            self.addMoney(num, 'crystal', 'guildWar');
            return next(null, Util.packageRes({crystal:num}));
        }
    )
};

// 领取工会战争奖励水晶
proto.getWarRewardNum = function(msg, next) {
    var wid = msg.wid;
    var gid = msg.gid;
    var crystalLv = msg.level;
    Db.war.findById(wid, function(err, war) {
        if (err) {
            return next(null, {code:10000, msg:err});
        }
        var num = calcWarReward(war, gid, crystalLv);
        log.stats("获取水晶数量", {num : num, playerId:this.id});
        return next(null, Util.packageRes({num: num}));
    }.bind(this));
};

// 计算工会战争奖励的水晶数
var calcWarReward = function(war, gid, lv) {
    var oppId = war.guilds[gid].opponent;
    var isWin = war.guilds[gid].left > war.guilds[oppId].left;
    var tarId = isWin ? oppId : gid;
    var tarBp = war.guilds[tarId].bp;
    var crystal = Math.ceil(Util.log10(tarBp) * 10);
    crystal = isWin ? crystal : crystal / 4;
    return Math.min(Math.ceil(crystal), 200) + (lv-1) * 10;
};

// 购买工会商店里的天降黄金
proto.buyGuildGold = function() {
    var cost = Conf.shop[consts.kShopItemGoldRain].cost;
    if (!this.costMoney(cost, "crystal", "guildGold")) {
        return Const.kErrorNotEnoughMoney;
    }
    var gold = formula.goldRain(this);
    this.addMoney(gold, "gold");
    return Util.packageRes();
};

// 购买工会商店里的武器道具
proto.buyGuildWeapon = function() {
    if (!this.costMoney(248, 'crystal', 'guildWeapon')) {
        return Const.kErrorNotEnoughMoney;
    }
    var isWeapon = false;
    if (Util.randomRate(0.7)) {
        isWeapon = true;
        this.addMoney(1, consts.kMoneyTypeWeaponItem, 'guildWeapon');
    } else {
        this.addShopItem(1, consts.kShopItemRefreshSkill, 'guildWeapon');
    }
    return Util.packageRes({isWeapon: isWeapon});
};

// 创建新工会
proto.createGuild = function(msg) {
    var gid = msg.gid;
    if (!this.costMoney(Conf.createGuildCost, 'diamond', "createGuild")) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.guild = gid;
    Db.Player.findByIdAndUpdate({_id:this.id}, {$set:{guild: gid}}, function(err, player) {
    }.bind(this));
    return Util.packageRes();
};

// 获取vip信息
proto.vipInfo = function(lv) {
    lv = ((lv == void 0) ? this.vip : lv);
    return Conf.vip[lv];
};

// 领取分享奖励
proto.shareTimeline = function(msg) {
    this.checkDailyEventTime();
    if (this.dailyEvent.shareTimeline) {
        return {code:1000, msg:"已经获得过"}
    }
    this.dailyEvent.shareTimeline = true;
    this.addMoney(100, 'diamond', 'share');
    return Util.packageRes();
};

/**
 * 获取分享奖励
 * @param msg
 */
proto.gainShareReward = function(msg){
    this.checkDailyEventTime();
    // 是否首次分享？
    var award = null;
    if (!this.isNotFirstShard){
        award = Conf.shareReward[this.dailyEvent.shareTimes + 1];
    } else {
        award = Conf.shareReward[this.dailyEvent.shareTimes + 2];
    }
    // 查看时间是否到了;
    if (!award || this.dailyEvent.lastShareTime + award.duration > Date.now()){
        return Const.kErrorInvalidDuration;
    }
    if (!this.isNotFirstShard) this.isNotFirstShard = true;
    ++this.dailyEvent.shareTimes;
    this.dailyEvent.lastShareTime = Date.now();
    this.addMoney(award.awardVal, award.awardType, 'share');
    return Util.packageRes({
        awardType : award.awardType,
        awardVal : award.awardVal,
        shareTimes : this.dailyEvent.shareTimes,
        lastShareTime : this.dailyEvent.lastShareTime
    });
};

// 捐献
proto.donate = function(msg) {
    var gid = msg.gid;
    var type = msg.type;
    var val = msg.diamond;
    this.checkDailyEventTime();
    var limit = 5 + this.vipInfo().donate;
    if (this.dailyEvent.donate >= limit) {
        return {code:10000, msg:"捐献次数已达上限"}
    }
    if (!this.costMoney(val, 'diamond', 'donate')) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.addMoney(val, 'crystal', 'donate');
    this.dailyEvent.donate ++;
    Db.guild.findOne({_id:gid}, {exp:1, level:1, contribution:1, upgrades:1}, function(err, guild) {
        if (err || !guild) {
            log.info("donate failed!", this.guild, err);
            return;
        }
        if (!guild.contribution) {guild.contribution = {}}
        if (!guild.upgrades) {guild.upgrades = {}}
        guild.upgrades[type] = guild.upgrades[type] || {exp:0, level:1};
        var obj;

        if (consts.kGuildUpgradeTypeMember == type) {
            obj = guild;
        } else {
            obj = guild.upgrades[type];
        }
        var meta = Conf.guildLevel[obj.level];
        obj.exp += val;
        if (meta && obj.exp >= meta.exp) {
            obj.level ++;
            obj.exp = 0;
        }

        guild.contribution[this.id] = guild.contribution[this.id] || 0;
        guild.contribution[this.id] += val;
        guild.markModified('contribution');
        guild.markModified('upgrades');
        guild.save();
    }.bind(this));
    return Util.packageRes();
};

// 随机生成红包
proto.splitDiamond = function(total, count) {
    var arr = [];
    while(arr.length < (count-1)) {
        var rm=Util.randomInt(1, total-1);
        var found=false;
        for(var i=0;i<arr.length;i++){
            if(arr[i]==rm){found=true;break}
        }
        if(!found)arr[arr.length]=rm;
    }
    arr = _.sortBy(arr);
    arr.push(total);
    return _.chain(arr).map(function(v, k) {
        if (k == 0) {
            return v;
        }
        return v - arr[k-1];
    }).shuffle().value();
};

// 在工会中发红包
proto.redEnvelope = function(msg) {
    var type = msg.type;
    var meta = Conf.redEnvelope[type];
    this.checkDailyEventTime();
    if (!this.guild) {
        return {code:10000, msg:"公会不存在", show:true};
    }
    if (this.dailyEvent.envelope > 2) {
        return {code:10000, msg:"次数上限", show:true};
    }
    if (!this.costMoney(meta.cost, 'diamond', 'redenvelope')) {
        return Const.kErrorNotEnoughDiamond;
    }
    this.dailyEvent.envelope ++;
    this.addMoney(meta.crystal, 'crystal', 'redenvelope');
    Db.guild.update({_id:this.guild}, {$push: {redEnvelope: {$each:[{time:new Date(), from:this.name, avatar: this.avatar,
        type:type,diamond:this.splitDiamond(meta.diamond,meta.num),list:{}}],$position:0}}}, function() {});
    return Util.packageRes({num:meta.crystal});
};

// 领取红包
proto.getEnvelope = function(msg, next) {
    var idx = msg.idx;
    if (this.isGettingEnvelope) {
        return next(null, Const.kErrorDuplicatedOpertaion);
    }
    this.isGettingEnvelope = true;
    var self = this;
    Db.guild.findByIdWithFields(this.guild, ['redEnvelope'], function(err, guild) {
        var envelope = guild.redEnvelope[idx];
        if (envelope.num < 1) {
            self.isGettingEnvelope = false;
            return next(null, {code:10000, msg:"红包已领光"})
        }
        if (envelope.list[self.id]) {
            self.isGettingEnvelope = false;
            return next(null, {code:10000, msg:"红包已领过"})
        }
        var diamond = envelope.diamond[0];

        self.addMoney(diamond, 'diamond', 'envelope');
        var setobj = {};
        var str = "redEnvelope."+idx;
        setobj[str+".list."+self.id] = {name:self.name, avatar:self.avatar,num:diamond};
        var pop = {};
        pop[str+".diamond"] = -1;
        Db.guild.update({_id:self.guild}, {$set:setobj, $pop:pop}, function(){self.isGettingEnvelope = false;});
        return next(null, Util.packageRes({diamond:diamond}))
    })
};

// 是否双倍每日登录奖励
proto.isDoubleDailyReward = function() {
    var day = moment().date();
    var month = moment().month();
    return month == 1 && day < 23 && day > 6;
};

// 领取每日登录奖励
proto.getDailyReward = function() {
    this.checkDailyEventTime();
    if (this.dailyEvent.dailyLoginReward) {
        return Util.packageRes({result:false});
    }
    this.dailyEvent.dailyLoginReward = true;
    var day = moment().diff(moment(this.createTime).startOf('day'), 'day');
    var week = moment().diff(moment(this.createTime).startOf('day'), 'week') + 1;
    if (this.dailyReward.week != week) {
        this.dailyReward.week = week;
        this.dailyReward.got = [0,0,0,0,0,0,0];
    }
    day = day % 7 + 1;
    this.dailyReward.got[day-1] = 1;
    var meta = Conf.everyDayReward[day];
    var coe = this.isDoubleDailyReward() ? 2 : 1;
    this.addGoods(meta.num * coe, meta.type, 'dailyReward');
    return Util.packageRes({result:true, info:this.dailyReward.got, day:day, type :meta.type, num:meta.num*coe});
};

// 同步服务器时间
proto.getServerTime = function() {
    return Util.packageRes(new Date());
};

// 过滤玩家信息
proto.strip = function() {

    return _.pick(this, this.dbKeys);
};

// 登出
proto.logout = function(cb) {
    this.lastTimeLogout = new Date();
    this.autoTapRemainTime -= (this.lastTimeLogout.getTime() - this.lastTimeLogin.getTime()) / 1000;
    this.autoTapRemainTime = Math.max(this.autoTapRemainTime, 0);
    this.calAttackMulTime();
    this.save(cb);
};

/**
 * 增加双倍时间
 * @param ms 毫秒
 */
proto.addAttackMulTime = function(ms){
    this.remainAttMulTime += ms;
    this.calAttackMulTime();
};

/**
 * 计算攻击双倍时间;
 */
proto.calAttackMulTime = function(){
    if (!this.remainAttMulTime) return;
    var now = Date.now();
    if (!!this.lastTimeCalAttackMul) {
        this.remainAttMulTime -= (now - this.lastTimeCalAttackMul);
        if (this.remainAttMulTime < 0) this.remainAttMulTime = 0;
    }
    if (!this.remainAttMulTime) this.lastTimeCalAttackMul = 0;
    else this.lastTimeCalAttackMul = now;
};

/**
 * 获取宠物PK列表
 * @param msg
 * @param next
 * @returns {*}
 */
proto.getPetPkList = function(msg, next){
    var flush = msg.flush;
    if (!!flush){
        if (!this.costMoney(Conf.flushPetPK, 'diamond', 'flush pet pk')) {
            next(null, Const.kErrorNotEnoughDiamond);
            return;
        }
    } else {
        var now = Date.now();
        if (!!this.lastPetPKTime && Conf.petPKCD > (now - this.lastPetPKTime)){
            petServices.getPetPKList(this, function(err, data){
                if (!!err){
                    next(null, Const.kErrorInvalidDuration);
                    return;
                }
                next(null, Util.packageRes(data));
            });
            return;
        }
        this.lastPetPKTime = now;
    }

    petServices.flushPetPKList(this, function(err, data){
        if (!!err){
            next(null, Const.kErrorInvalidDuration);
            return;
        }
        next(null, Util.packageRes(data));
    })
};

// 保存玩家信息
proto.save = function(cb) {
    var data = this.strip();
    cb = cb || function() {};
    Db.Player.update({id: this.id}, {$set: data}, function(err, result) {
        if (err) {
            log.error("save 存储用户信息出错！", {err: err, playerId:this.id});
        }
        log.info("save player", {playerId: this.id});
        cb(err, result);
//        log.info("player saved: ", data);
    }.bind(this))
};

// 调试加钱
proto.cheatMoney = function(msg) {
    if (env != "testing" && env != 'development' ) {
        log.stats("[作弊行为] cheatMoney", {playerId:this.id, uniqueId: this.uniqueId});
        return Util.packageRes();
    }
    msg.gold = msg.gold || 0;
    msg.diamond = msg.diamond || 0;
    msg.relic = msg.relic || 0;
    msg.weapon = msg.weapon || 0;
    msg.crystal = msg.crystal || 0;
    msg.fragment = msg.fragment || 0;

    this.addMoney(msg.gold, 'gold', 'cheatmoney');
    this.addMoney(msg.diamond, 'diamond', 'cheatmoney');
    this.addMoney(msg.relic, 'relic', 'cheatmoney');
    this.addMoney(msg.weapon, 'weaponItem', 'cheatmoney');
    this.addMoney(msg.crystal, 'crystal', 'cheatmoney');
    this.addMoney(msg.fragment, 'fragment', 'cheatmoney');
    return Util.packageRes();
};

// 调试加经验
proto.cheatExp = function(msg) {
    if (env != "testing" && env != 'development' ) {
        log.stats("[作弊行为] cheatMoney", {playerId:this.id, uniqueId: this.uniqueId});
        return Util.packageRes();
    }

    this.addEquipExp(msg.exp);
    return Util.packageRes();
};

