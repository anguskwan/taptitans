/**
 * Created by lhb on 15/9/1.
 */
var DataManage = (function (_super) {
    __extends(DataManage, _super);
    function DataManage(data) {
        _super.call(this);
        this.hasMonster = false;
        this.isDailyBoss = false;
        this.tapsOfMidas = 0;
        this.mDmg = 0;
        this.monsterMaxHp = 0;
        this.midasGold = 0;
        this.holdingPower = false;
        this.data = data;
        this.heroes = new HeroManage(this.data);
        this.master = new MasterManage(this.data);
        this.artifact = new ArtifactManage(this.data);
        this.createMission();
        this.checkAutoTap();
        this.mails = [];
        this.guild = {};
        this.purchaseActivity = {};
        this.costDiamondActivity = {};
        this.oppGuild = {};
        this.equips = {};
        this.serverTime = 0;
        this.newMarket = {};
        this.serverTimeWX = data.sysTime;
        this.isNotFirstShared = data.isNotFirstShard;
        this.shareTimes = data.dailyEvent.shareTimes;
        this.lastShareTime = data.dailyEvent.lastShareTime;
        if (this.shareTimes > 0)
            this.timeRemain = Conf.shareReward[3].duration - (this.serverTimeWX - this.lastShareTime);
        else
            this.timeRemain = 0;
        this.setDailyEvent();
    }
    var __egretProto__ = DataManage.prototype;
    __egretProto__.initDailyTaskData = function () {
        console.log("init daily task data.");
        gm.dataManage.data.dailyTask = {
            dailyTask: 0,
            clickPerSecond: 0,
            stageCount: 0,
            masterUpgrade: 0,
            masterSkill: 0,
            totalClick: 0,
            heroUpgrade: 0,
            artifactUpgrade: 0,
            killMonster: 0,
            dailyStar: {
                clickPerSecond: 0,
                stageCount: 0,
                masterUpgrade: 0,
                masterSkill: 0,
                totalClick: 0,
                heroUpgrade: 0,
                artifactUpgrade: 0,
                killMonster: 0
            }
        };
    };
    __egretProto__.setDailyEvent = function () {
        var currTime = new Date();
        var nextTime = new Date();
        nextTime.setHours(24, 0, 0, 0);
        var offsetTime = nextTime.getTime() - currTime.getTime();
        egret.setTimeout(function () {
            console.log("time to refresh daily data");
            this.initDailyTaskData();
            this.setDailyEvent();
            gm.postMessageNextTick(consts.kMessageDailyNewDay);
        }.bind(this), this, offsetTime);
    };
    __egretProto__.getMonsterHPMax = function () {
        return formula.monsterHP(this.data);
    };
    __egretProto__.isBossMonster = function () {
        return this.data.isBoss;
    };
    __egretProto__.isBossStage = function () {
        return this.data.mission >= this.getMaxMission();
    };
    __egretProto__.getMaxMission = function () {
        return formula.numOfMonstersEachStage(this.data);
    };
    __egretProto__.createMission = function (isBoss) {
        this.missionCreateTime = moment();
        this.hasMonster = true;
        this.tapsPerMission = 0;
        this.mDmg = 0;
        this.data.isBoss = isBoss;
        this.isDailyBoss = false;
        this.monsterHP = this.getMonsterHPMax();
        this.setAchievementValue(3, this.data.stage);
        gm.postMessage(consts.kMessageMonsterHPChange, this.monsterHP);
        gm.postMessage(consts.kMessageOnBossEnter);
    };
    __egretProto__.nextMission = function () {
        var nextIsBoss = false;
        if (this.data.isBoss) {
            this.data.mission = 0;
            this.data.stage++;
            this.incDailyTaskData("stageCount");
            gm.postMessage(consts.kMessageStageComplete, this.data.stage);
            this.heroes.autoUpgrade(this.data.stage % 33 + 1);
            this.autoPrestige();
        }
        else if (!this.isBossStage()) {
            this.data.mission++;
            if (this.isBossStage()) {
                nextIsBoss = true;
            }
        }
        this.createMission(nextIsBoss);
        gm.postMessage(consts.kMessageMissionComplete);
    };
    __egretProto__.monsterDead = function (isDoom) {
        if (this.isDailyBoss) {
            return this.killDailyBoss(isDoom);
        }
        if (this.data.isChest) {
            this.incAchievementValue(11);
        }
        this.incAchievementValue(1);
        this.incAchievementValue(8, this.tapsPerMission);
        this.incDailyTaskData("totalClick", this.tapsPerMission);
        this.incDailyTaskData("killMonster");
        if (this.data.isBoss) {
            this.incAchievementValue(7);
        }
        gm.network.sendAction("killTitan", {
            taps: this.tapsPerMission,
            dmg: this.mDmg,
            isDoom: !!isDoom,
            isBoss: this.data.isBoss,
            hp: this.getMonsterHPMax(),
            heroDps: this.heroes.heroDpsCache
        }, function (data) {
            this.data.isChest = data.isChest;
            this.data.isDivineChalice = data.isDivineChalice;
            this.data.dailyEvent.clicks = data.clicks;
            this.addMoney(data.relic, 'relic');
            this.addMoney(data.gold, "gold");
            this.data.dailyTask.clickPerSecond = data.clickPerSecond;
            this.nextMission();
        }.bind(this), function () {
            console.log("kill titan no response!");
        });
    };
    __egretProto__.createDailyBoss = function (hp) {
        this.tapsPerMission = 0;
        this.hasMonster = true;
        this.isDailyBoss = true;
        this.mDmg = 0;
        this.monsterHP = hp;
        this.monsterMaxHp = hp;
        gm.postMessage(consts.kMessageMonsterHPChange, this.monsterHP);
        gm.postMessage(consts.kMessageOnBossEnter, true);
    };
    __egretProto__.isDivineChalice = function () {
        return this.data.isDivineChalice && !this.data.isChest && !this.data.isBoss;
    };
    __egretProto__.getDailyBossInfo = function (cb) {
        gm.network.sendAction("getDailyBossInfo", {}, function (data) {
            cb(data);
        }.bind(this));
    };
    __egretProto__.fightDailyBoss = function () {
        this.getDailyBossInfo(function (data) {
            if (data) {
                gm.gameScene.removeBoss();
                this.createDailyBoss(data.hp);
            }
        }.bind(this));
    };
    __egretProto__.killDailyBoss = function (isDoom) {
        gm.network.sendAction("killDailyBoss", {
            taps: this.tapsPerMission,
            dmg: this.mDmg,
            isDoom: !!isDoom
        }, function (data) {
            this.addDailyReward(data);
            gm.gameScene.removeBoss();
            gm.postMessage(consts.kMessageKillDailyBoss, data);
            this.createMission();
        }.bind(this));
    };
    __egretProto__.addDailyReward = function (data) {
        switch (data.type) {
            case 'diamond':
                this.addMoney(data.num, 'diamond');
                break;
            case 'weapon':
                this.addWeaponItem(data.num);
                break;
        }
    };
    __egretProto__.addWeaponItem = function (num) {
        if (!num) {
            return;
        }
        RES.loadGroup("getItemAnimation");
        this.data.weaponItem += num;
        gm.postMessage(consts.kMessageWeaponItemUpdate);
    };
    __egretProto__.costWeaponItem = function (num) {
        if (this.data.weaponItem < num) {
            return false;
        }
        this.data.weaponItem--;
        gm.postMessage(consts.kMessageWeaponItemUpdate);
        return true;
    };
    __egretProto__.useWeaponItem = function (cb) {
        if (!this.costWeaponItem(1)) {
            return;
        }
        gm.network.sendAction("useWeaponItem", null, function (data) {
            this.heroes.addHeroWeapon(data.weaponId, 1);
            cb(data.weaponId);
        }.bind(this));
    };
    __egretProto__.resetWeapon = function (wid, cb, fail) {
        gm.network.sendAction("resetWeapon", { wid: wid }, function () {
            this.data.dailyEvent.resetWeapon++;
            this.data.heroWeapons[wid]--;
            this.addWeaponItem(1);
            Util.invokeCallback(cb);
        }.bind(this), fail);
    };
    __egretProto__.addWeaponSets = function (num) {
        for (var i = 1; i <= 33; i++) {
            this.data.heroWeapons[i] += num;
        }
    };
    __egretProto__.addMoney = function (num, type) {
        console.log("add money, num:" + num + ",type:" + type);
        if (isNaN(num)) {
            return;
        }
        if (!isNaN(parseInt(type))) {
            type = consts.kMoneyNames[type];
        }
        if (num == 0) {
            return;
        }
        this.data[type] += num;
        if (type == 'gold') {
            this.incAchievementValue(2, num);
        }
        if (type == 'relic') {
            gm.gameUI.showGetMoneyAni(type);
            this.incAchievementValue(4, num);
        }
        gm.postMessageNextTick(consts.kMessageMoneyUpdate, type);
    };
    __egretProto__.costMoney = function (num, type) {
        console.log("cost money, num:" + num + ",type:" + type);
        if (isNaN(num)) {
            return false;
        }
        if (!isNaN(parseInt(type))) {
            type = consts.kMoneyNames[type];
        }
        var money = this.data[type];
        if (money < num) {
            if (type == "diamond") {
                gm.postMessage(consts.kMessageShowToastLayer, "钻石不足");
            }
            return false;
        }
        else {
            this.data[type] -= num;
            gm.postMessageNextTick(consts.kMessageMoneyUpdate);
            return true;
        }
    };
    __egretProto__.addShopSkill = function (num, type) {
        if (isNaN(num)) {
            return;
        }
        if (num == 0) {
            return;
        }
        if (isNaN(parseInt(type))) {
            type = consts.kShopItemName.indexOf(type);
        }
        this.data.shopItems[type] = this.data.shopItems[type] || 0;
        this.data.shopItems[type] += num;
        gm.postMessage(consts.kMessageShopSkillUpdate, type);
    };
    __egretProto__.isCostShopSkill = function (num, type) {
        if (isNaN(num)) {
            return;
        }
        var skill = this.data.shopItems[type];
        if (skill < num) {
            return false;
        }
        else {
            return true;
        }
    };
    __egretProto__.costShopSkill = function (num, type) {
        if (isNaN(num)) {
            return;
        }
        var skill = this.data.shopItems[type];
        if (!skill || skill < num) {
            return false;
        }
        else {
            this.data.shopItems[type] -= num;
            gm.postMessage(consts.kMessageShopSkillUpdate, type);
            return true;
        }
    };
    __egretProto__.reduceHP = function (value, showText, isDoom, mul, record) {
        if (mul === void 0) { mul = 1; }
        // 攻击整体加成
        var attackScale = 1;
        if (gm.dataManage.data.remainAttMulTime != 0) {
            attackScale = 2; //固定加2倍， todo
        }
        value = value * attackScale;
        if (gm.network.isOffline) {
            return;
        }
        if (!this.hasMonster) {
            return;
        }
        if (record) {
            this.mDmg += value;
        }
        this.monsterHP -= value;
        if (showText) {
            var max = formula.criticalMultiplier(this.data);
            gm.gameScene.showDamageText(value, mul == 1 ? 1 : mul / max + 1);
        }
        if (this.monsterHP <= 0) {
            this.hasMonster = false;
            gm.postMessage(consts.kMessageOnBossDead, isDoom);
        }
        gm.postMessage(consts.kMessageMonsterHPChange, this.monsterHP);
    };
    __egretProto__.calMultiplier = function () {
        var rate = formula.criticalChance(this.data);
        if (Math.random() < rate) {
            var mul = formula.criticalMultiplier(this.data);
            mul = Util.randomReal(mul * 0.35, mul);
            return mul;
        }
        return 1;
    };
    //    public handsOfMidas = 0;
    __egretProto__.onTapDamage = function (pos) {
        if (!this.hasMonster) {
            return;
        }
        this.tapsPerMission++;
        var mul = this.calMultiplier();
        var dmg = this.master.getTapDamage() * mul;
        if (this.data.masterBuffs[consts.kMasterSkillTypeHandOfMidas]) {
            this.tapsOfMidas++;
            gm.postMessage(consts.kMessageOnMidasTap);
        }
        gm.gameScene.onBossHit();
        gm.gameScene.showTapEffect(pos);
        gm.postMessage(consts.kMessageTapDamage, dmg);
        this.reduceHP(dmg, true, false, mul, true);
    };
    __egretProto__.finishHandOfMidas = function () {
        gm.network.sendAction("handOfMidasTap", { taps: this.tapsOfMidas }, function (res) {
            var gold = res.gold;
            this.tapsOfMidas = 0;
            this.midasGold = gold;
            gm.postMessage(consts.kMessageOnMidasTapFinish, gold);
            //this.addMoney(gold, 'gold');
        }.bind(this), function () {
        }, true);
    };
    __egretProto__.isUnlockPrestige = function () {
        if (Util.getQueryString('d') == '1') {
            return true;
        }
        var meta = Conf.masterSkill[consts.kMasterSkillTypePrestige];
        return this.data.masterLevel >= meta.unlock;
    };
    __egretProto__.getPrestigeDiamondCost = function () {
        var vipInfo = this.vipInfo();
        var cost = this.data.stage * Conf.config.prestigeCostCoe * (1 + vipInfo.prestigeCost);
        cost = Math.ceil(cost);
        return cost;
    };
    __egretProto__.prestigeByDiamond = function () {
        var vipInfo = this.vipInfo();
        var cost = this.getPrestigeDiamondCost();
        if (!this.costMoney(cost, 'diamond')) {
            return false;
        }
        this.addMoney(formula.relicsByPrestige(this.data), 'relic');
        this.incAchievementValue(9);
        StageInfoLayer.show("保级蜕变");
        gm.network.sendAction("prestigeByDiamond", {});
        gm.postMessage(consts.kMessageSuperPrestige);
    };
    // 蜕变
    __egretProto__.prestige = function (notify) {
        if (notify === void 0) { notify = true; }
        //        var meta = Conf.masterSkill[consts.kMasterSkillTypePrestige];
        //        if (this.data.masterLevel < meta.unlock) {
        //            return false;
        //        }
        this.hasMonster = false;
        this.data.relic += formula.relicsByPrestige(this.data);
        this.data.heroes = [];
        this.data.gold = 0;
        this.midasGold = 0;
        this.data.heroBuffs = formula.heroSkillBuffs(this.data);
        this.data.masterSkills = [];
        this.data.masterLevel = 1;
        this.data.mission = 0;
        this.data.stage = 1;
        this.master.reset();
        this.heroes.reset();
        gm.gameScene.removeBoss();
        gm.gameScene.removeAllHeroes();
        StageInfoLayer.show("蜕变");
        this.data.protectExpire = moment().add(Conf.config.protectTimeByPrestige, 'h').toDate();
        this.createMission();
        this.incAchievementValue(9);
        if (notify) {
            gm.network.sendAction("prestige", {});
        }
        gm.postMessage(consts.kMessagePrestige);
    };
    __egretProto__.getRelicsByStage = function () {
        return formula.relicsByStage(this.data);
    };
    __egretProto__.getRelicsByHeroes = function () {
        return formula.relicsByHeroesLevel(this.data);
    };
    __egretProto__.getRelicsByPrestige = function () {
        return formula.relicsByPrestige(this.data);
    };
    __egretProto__.goldRain = function (cb) {
        var _this = this;
        if (!this.costShopSkill(1, consts.kShopItemGoldRain)) {
            if (!this.costMoney(Conf.shop[consts.kShopItemGoldRain].cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("goldRain", {}, function () {
            var gold = formula.goldRain(_this.data);
            _this.addMoney(gold, "gold");
            gm.postMessage(consts.kMessageGoldRain);
            Util.invokeCallback(cb);
        });
    };
    __egretProto__.getGoldRain = function () {
        return formula.goldRain(this.data);
    };
    __egretProto__.checkAutoTap = function () {
        var _this = this;
        if (this.data.autoTapRemainTime > 0 && !this.autoTapInterval) {
            this.autoTapInterval = egret.setInterval(function () {
                _this.data.autoTapRemainTime -= 0.2;
                _this.onTapDamage(new egret.Point(gm.winSize.width / 2, gm.winSize.height / 2));
                if (_this.data.autoTapRemainTime <= 0) {
                    egret.clearInterval(_this.autoTapInterval);
                    _this.autoTapInterval = null;
                }
            }, this, 200);
        }
    };
    __egretProto__.buyAutoTap = function (cb) {
        var _this = this;
        if (!this.costShopSkill(1, consts.kShopItemAutoTap)) {
            if (!this.costMoney(Conf.shop[consts.kShopItemAutoTap].cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("autoTap", {}, function (data) {
            _this.data.autoTapRemainTime += 30 * 60;
            _this.checkAutoTap();
            gm.postMessage(consts.kMessageBuyAutoTap);
            Util.invokeCallback(cb);
        });
    };
    __egretProto__.addItem = function (num, type) {
        switch (type) {
            case 'gold':
            case 'diamond':
            case 'relic':
            case 'crystal':
            case 'fragment':
                this.addMoney(num, type);
                break;
            case 'weaponItem':
                this.addWeaponItem(num);
                break;
            case 'goldRain':
            case 'autoTap':
            case 'doom':
            case 'refreshSkill':
            case 'powerOfHolding':
            case 'tenTimes':
                this.addShopSkill(num, type);
                break;
            case 'set':
                this.addWeaponSets(num);
                break;
            case 'equip':
                break;
            case 'exp':
                break;
            case 'attackMul':
                break;
            default:
                break;
        }
    };
    __egretProto__.buyTenTimes = function (cb) {
        var _this = this;
        if (!this.costShopSkill(1, consts.kShopItemTenTimes)) {
            var cost = Conf.shop[consts.kShopItemTenTimes].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("buyTenTimes", {}, function (data) {
            _.each(data, function (v) {
                this.addItem(v.num, v.type);
            }.bind(_this));
            Util.invokeCallback(cb, data);
        });
    };
    __egretProto__.doom = function () {
        if (!this.costShopSkill(1, consts.kShopItemDoom)) {
            var cost = Conf.shop[consts.kShopItemDoom].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        gm.gameScene.master.doom();
    };
    __egretProto__.powerOfHolding = function () {
        if (!this.costShopSkill(1, consts.kShopItemPowerOfHolding)) {
            var cost = Conf.shop[consts.kShopItemPowerOfHolding].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        this.holdingPower = true;
        egret.setTimeout(function () {
            this.holdingPower = false;
            gm.mainLayer.touchEnd();
        }.bind(this), this, 120 * 1000);
        gm.network.sendAction("powerOfHolding", {});
    };
    __egretProto__.getSkillRefreshCost = function () {
        return formula.skillRefreshCost(this.data);
    };
    __egretProto__.refreshSkill = function () {
        if (!this.costShopSkill(1, consts.kShopItemRefreshSkill)) {
            var cost = formula.skillRefreshCost(this.data);
            if (!cost || !this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        for (var i = 1; i < 7; i++) {
            this.data.masterSkills[i].lastTimeUse = 0;
        }
        gm.network.sendAction("refreshSkill");
        gm.postMessage(consts.kMessageRefreshSkill, consts.kShopItemRefreshSkill);
        return true;
    };
    __egretProto__.onFightBossEvent = function (fightBoss) {
        if (!this.hasMonster) {
            return false;
        }
        if (this.isBossStage() || this.isDailyBoss) {
            gm.gameScene.removeBoss();
            this.createMission(fightBoss);
        }
        return true;
    };
    __egretProto__.incAchievementValue = function (id, num) {
        num = _.isUndefined(num) ? 1 : num;
        this.data.achievements[id].value += num;
        if (this.isAchievementRewardAvailable(id)) {
            gm.postMessage(consts.kMessageGetAchievement);
        }
    };
    __egretProto__.setAchievementValue = function (id, num) {
        var a = this.data.achievements[id];
        a.value = Math.max(a.value, num);
        if (this.isAchievementRewardAvailable(id)) {
            gm.postMessage(consts.kMessageGetAchievement);
        }
    };
    __egretProto__.isAchievementRewardAvailable = function (id) {
        var a = this.data.achievements[id];
        var meta = Conf.achievements[id];
        var next = a.stars + 1;
        return meta["star" + next] && meta["star" + next] <= a.value;
    };
    __egretProto__.gainAchievementReward = function (id) {
        if (!this.isAchievementRewardAvailable(id)) {
            return false;
        }
        var a = this.data.achievements[id];
        a.stars++;
        var diamond = consts.kAchievementsRewards[a.stars];
        this.addMoney(diamond, 'diamond');
        gm.network.sendAction("gainAchievementReward", { id: id });
        gm.postMessage(consts.kMessageGetAchievement);
    };
    __egretProto__.collectOfflineGold = function (cb) {
        gm.network.sendAction("collectOfflineGold", null, function (data) {
            cb(data);
        }.bind(this));
    };
    __egretProto__.getDailyMonthCardDiamond = function (cb) {
        gm.network.sendAction("getDailyMonthCardDiamond", null, function (data) {
            cb(data);
        });
    };
    __egretProto__.isTodayMonthCardRewardAvailable = function () {
        var getTime = moment(this.data.getMCDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    };
    __egretProto__.remainMonthCardDays = function () {
        var expireTime = moment(this.data.monthCardTime).add(30, 'd').startOf('d');
        return expireTime.diff(moment(), 'days', true);
    };
    __egretProto__.getDailySupMonthCardDiamond = function (cb) {
        gm.network.sendAction("getDailySupMonthCardDiamond", null, function (data) {
            cb(data);
        });
    };
    __egretProto__.getDailyLifeCardDiamond = function (cb) {
        gm.network.sendAction("getDailyLifeCardDiamond", null, function (data) {
            gm.dataManage.data.getLifeCardDailyDiamondTime = new Date();
            cb(data);
        });
    };
    __egretProto__.isTodaySupMonthCardRewardAvailable = function () {
        var getTime = moment(this.data.getSupMCDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    };
    __egretProto__.remainSupMonthCardDays = function () {
        var expireTime = moment(this.data.supMonthCardTime).add(30, 'd').startOf('d');
        return expireTime.diff(moment(), 'days', true);
    };
    __egretProto__.isTodayLifeCardRewardAvailable = function () {
        if (!this.data.isBoughtLifeCard) {
            return false;
        }
        var getTime = moment(this.data.getLifeCardDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    };
    __egretProto__.getStageSetId = function () {
        var stage = this.data.stage;
        var setId = Math.ceil(stage / 5);
        setId = Util.modByLimit(setId, 10);
        return setId;
    };
    __egretProto__.setTutorialFinish = function (id) {
        this.data.tutorials[id] = true;
        gm.network.sendAction("setTutorialFinish", { id: id });
    };
    __egretProto__.calBossId = function () {
        if (this.data.isChest && !this.isBossMonster()) {
            return "chest";
        }
        if (this.isDailyBoss) {
            return "";
        }
        var setId = this.getStageSetId();
        var start = (setId - 1) * 7;
        return Util.randomInt(start + 1, start + 7);
    };
    __egretProto__.isContestAvailable = function (cb) {
        gm.network.sendAction('isContestAvailable', {}, function (data) {
            Util.invokeCallback(cb, data);
        });
    };
    __egretProto__.getContestReward = function (cb) {
        var _this = this;
        gm.network.sendAction('getContestReward', {}, function (data) {
            _this.data.contestId = "none";
            _this.data.contestStartTime = 0;
            Util.invokeCallback(cb, data);
        });
    };
    __egretProto__.isInContest = function () {
        return this.data.contestId != "none";
    };
    __egretProto__.isContestFinish = function () {
        if (!this.data.contestId) {
            return false;
        }
        var diff = moment().diff(moment(this.data.contestStartTime), 'hours', true);
        return diff >= consts.kContestDuration;
    };
    __egretProto__.joinContest = function (cb) {
        var _this = this;
        gm.network.sendAction('joinContest', {}, function (data) {
            _this.prestige(false);
            _this.data.contestId = data.contestId;
            _this.data.contestStartTime = data.startTime;
            Util.invokeCallback(cb, data);
        });
        return true;
    };
    __egretProto__.joinHardContest = function (cb) {
        var _this = this;
        gm.network.sendAction('joinHardContest', {}, function (data) {
            _this.prestige(false);
            _this.data.contestId = data.contestId;
            _this.data.contestStartTime = data.startTime;
            Util.invokeCallback(cb, data);
        });
        return true;
    };
    __egretProto__.isHardContest = function () {
        return _.startsWith(this.data.contestId, 'hard-');
    };
    __egretProto__.checkIfHasPurchaseGiftBag = function (cb, fail) {
        gm.network.sendAction('checkIfHasPurchaseGiftBag', {}, function (data) {
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.getDailyPurchaseGiftBag = function (cb, fail) {
        var _this = this;
        gm.network.sendAction('getDailyPurchaseGiftBag', {}, function (data) {
            _this.data.dailyEvent.purchaseGiftBag = true;
            gm.postMessage(consts.kMessageIsGetActivityGiftBag);
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.getVipLevel = function (cb, fail) {
        gm.network.sendAction('getVipLevel', {}, function (data) {
            gm.dataManage.data.vip = data.vip;
            gm.dataManage.data.purchaseNum = data.purchaseNum;
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.getVipGift = function (lv, cb, fail) {
        var _this = this;
        gm.network.sendAction('getVipGift', { level: lv }, function (data) {
            _this.addVipGift(lv);
            _this.data.vipGift[lv] = 1;
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.getDailyRelic = function (cb, fail) {
        var _this = this;
        gm.network.sendAction('getDailyRelic', {}, function (data) {
            _this.data.dailyEvent.getRelic = 1;
            _this.addItem(data.relic, "relic");
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.vipInfo = function (lv) {
        lv = ((lv == void 0) ? this.data.vip : lv);
        return Conf.vip[lv];
    };
    __egretProto__.addVipGift = function (lv) {
        var info = this.vipInfo(lv);
        _.each(info, function (v, k) {
            this.addItem(v, k);
        }.bind(this));
    };
    __egretProto__.donate = function (gid, type, diamond, cb, fail) {
        var _this = this;
        gm.network.sendAction('donate', { gid: gid, type: type, diamond: diamond }, function () {
            _this.data.dailyEvent.donate++;
            _this.addMoney(diamond, 'crystal');
            if (!_this.guild.contribution) {
                _this.guild.contribution = {};
            }
            if (!_this.guild.upgrades) {
                _this.guild.upgrades = {};
            }
            _this.guild.upgrades[type] = _this.guild.upgrades[type] || { exp: 0, level: 1 };
            var guild;
            if (consts.kGuildUpgradeTypeMember == type) {
                guild = _this.guild;
            }
            else {
                guild = _this.guild.upgrades[type];
            }
            var meta = Conf.guildLevel[guild.level];
            guild.exp += diamond;
            if (meta && guild.exp >= meta.exp) {
                guild.level++;
                guild.exp = 0;
            }
            Util.invokeCallback(cb);
        }, fail);
    };
    __egretProto__.updateDiamond = function (cb, fail) {
        var _this = this;
        gm.network.sendAction('updateDiamond', {}, function (data) {
            var addDiamond = data.diamond - _this.data.diamond;
            _this.addItem(addDiamond, "diamond");
            Util.invokeCallback(cb, addDiamond);
        }, fail);
    };
    __egretProto__.buyEquip = function (type, cb, fail) {
        var _this = this;
        var cost;
        if (type == 1) {
            cost = gm.gameUI.getGuildTypeSource(3).cost;
            if (!this.costMoney(cost, consts.kMoneyTypeCrystal)) {
                Util.invokeCallback(fail);
                return;
            }
        }
        else {
            cost = Conf.market[9].cost;
            if (!this.costMoney(cost, consts.kMoneyTypeDiamond)) {
                Util.invokeCallback(fail);
                return;
            }
        }
        gm.network.sendAction('buyEquip', { type: type }, function (data) {
            if (data.type != "equip") {
                _this.addItem(data.num, data.type);
            }
            else {
                gm.gameUI.isAddNewEquip = true;
                gm.postMessage(consts.kMessageAddNewEquip);
            }
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.buyTenEquip = function (type, cb, fail) {
        var _this = this;
        var cost;
        if (type == 1) {
            cost = gm.gameUI.getGuildTypeSource(4).cost;
            if (!this.costMoney(cost, consts.kMoneyTypeCrystal)) {
                Util.invokeCallback(fail);
                return;
            }
        }
        else {
            cost = Conf.market[10].cost;
            if (!this.costMoney(cost, consts.kMoneyTypeDiamond)) {
                Util.invokeCallback(fail);
                return;
            }
        }
        gm.network.sendAction('buyTenEquip', { type: type }, function (data) {
            _.each(data, function (v) {
                if (v.type != 'equip') {
                    this.addItem(v.num, v.type);
                }
                else {
                    gm.gameUI.isAddNewEquip = true;
                    gm.postMessage(consts.kMessageAddNewEquip);
                }
            }.bind(_this));
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.evolutionEquip = function (eid, cb, fail) {
        gm.network.sendAction('evolutionEquip', { eid: eid }, function (data) {
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.queryEquips = function (cb, fail) {
        var _this = this;
        gm.network.sendAction('queryEquips', {}, function (data) {
            _this.equips = data.equips || {};
            Util.invokeCallback(cb);
        }, fail);
    };
    __egretProto__.setMasterEquips = function (equips, cb, fail) {
        var _this = this;
        gm.network.sendAction('setMasterEquips', { equips: equips }, function (data) {
            _this.data.masterEquips = equips;
            Util.invokeCallback(cb, data);
        }, fail);
    };
    __egretProto__.updateEquipValue = function (cb, fail) {
        gm.network.sendAction("updateEquipValue", {}, function (data) {
            this.data.equipValues = data;
            gm.postMessage(consts.kMessageUpdateEquipValues);
            Util.invokeCallback(cb);
        }.bind(this), fail);
    };
    __egretProto__.getDailyReward = function (cb, fail) {
        gm.network.sendAction("getDailyReward", {}, function (data) {
            if (data.result) {
                this.data.dailyReward.got = data.info;
                this.data.dailyEvent.dailyLoginReward = true;
                this.addItem(data.num, data.type);
            }
            Util.invokeCallback(cb, data);
        }.bind(this), fail);
    };
    __egretProto__.getServerTime = function (cb, fail) {
        gm.network.sendAction("getServerTime", {}, function (data) {
            this.serverTime = data;
            Util.invokeCallback(cb, data);
        }.bind(this), fail);
    };
    __egretProto__.buyMarketItem = function (itemId, cb, fail) {
        var id = itemId;
        var meta = Conf.market[id];
        if (!this.costMoney(meta.cost, 'diamond')) {
            Util.invokeCallback(fail);
            return false;
        }
        gm.network.sendAction("buyMarketItem", { itemId: itemId }, function () {
            if (meta.type == "exp") {
                this.updateEquipValue(function () {
                    Util.invokeCallback(cb, { num: meta.num, type: meta.type });
                }.bind(this), function () {
                    Util.invokeCallback(fail);
                }.bind(this));
            }
            else if (meta.type == "gold") {
                var gold = formula.goldRain(this.data);
                var num = gold * meta.num;
                this.addMoney(num, "gold");
                Util.invokeCallback(cb, { num: num, type: meta.type });
            }
            else {
                this.addItem(meta.num, meta.type);
                Util.invokeCallback(cb, { num: meta.num, type: meta.type });
            }
        }.bind(this), fail);
    };
    __egretProto__.refreshMarket_activity = function (cb, fail) {
        if (!this.costMoney(50, 'diamond')) {
            Util.invokeCallback(fail);
            return;
        }
        gm.network.sendAction("refreshMarket", {}, function () {
            Util.invokeCallback(cb);
        }.bind(this), fail);
    };
    __egretProto__.joinZodiac = function (cb, fail) {
        gm.network.sendAction("joinZodiac", {}, function (data) {
            this.data.zodiacId = data.id;
            Util.invokeCallback(cb);
        }.bind(this), fail);
    };
    __egretProto__.getZodiacReward = function (cb, fail) {
        gm.network.sendAction("getZodiacReward", {}, function (data) {
            this.data.dailyEvent.zodiacReward = true;
            if (_.size(data.reward) != 0) {
                this.addItem(data.reward.crystal, "crystal");
                this.addItem(data.reward.fragment, "fragment");
            }
            Util.invokeCallback(cb, data);
        }.bind(this), fail);
    };
    __egretProto__.autoPrestige = function () {
        var prestige = tt.Setting.isOpenAutoPrestige();
        var stage = tt.Setting.getAutoPrestigeStage();
        var level = this.data.masterLevel;
        if (prestige && this.data.stage >= stage && level >= 600) {
            this.prestige();
        }
    };
    __egretProto__.cheatMoney = function (gold, diamond, relic, weapon, crystal, fragment) {
        gold = gold || 0;
        diamond = diamond || 0;
        relic = relic || 0;
        crystal = crystal || 0;
        fragment = fragment || 0;
        gm.network.sendAction("cheatMoney", {
            gold: gold,
            diamond: diamond,
            relic: relic,
            weapon: weapon,
            crystal: crystal
        }, function (data) {
            this.addMoney(gold, "gold");
            this.addMoney(relic, "relic");
            this.addMoney(diamond, "diamond");
            this.addMoney(crystal, "crystal");
            this.addMoney(fragment, "fragment");
            this.addWeaponItem(weapon);
        }.bind(this));
    };
    __egretProto__.cheatExp = function (exp) {
        gm.network.sendAction("cheatExp", { exp: exp }, function () {
            this.updateEquipValue(function () {
            }, function () {
            });
        }.bind(this));
    };
    __egretProto__.maxMorale = function () {
        return formula.maxMorale(this.data);
    };
    ////////////////////////////////////////
    //- Daily task part
    ////////////////////////////////////////
    __egretProto__.isDailyTaskRewardAvailable = function (id) {
        if (this.isDailyTaskRewardGained(id)) {
            console.log("daily is not available because gained, id" + id);
            return false;
        }
        var config = Conf.dailyTask[id];
        var dailyData = this.data.dailyTask;
        var currentCount = this.data.dailyTask[config["name"]];
        var targetCount = config["target"];
        // console.log("daily is available:" + (currentCount >= targetCount));
        return currentCount >= targetCount;
    };
    __egretProto__.isAnyDailyTaskAvailable = function () {
        var dailyTaskIDs = this.getCurrentDailyTaskIDs();
        return _.some(dailyTaskIDs, function (id) {
            if (this.isDailyTaskRewardAvailable(id)) {
                //console.log("some daily task available, id:" + id);
                return true;
            }
            //console.log("some daily task is not available, id:" + id);
            return false;
        }.bind(this));
    };
    __egretProto__.getDailyTaskGoldReward = function (id) {
        var config = Conf.dailyTask[id];
        return Math.floor(this.getGoldRain() * config["gold"]);
    };
    __egretProto__.getDailyTaskRelicReward = function (id) {
        var config = Conf.dailyTask[id];
        var relicPercent = config["relic"];
        var prestige = gm.dataManage.getRelicsByPrestige();
        var relicCount = prestige * relicPercent;
        if (relicCount < 1) {
            relicCount = 1;
        }
        return Math.floor(relicCount);
    };
    __egretProto__.gainDailyTaskReward = function (id) {
        if (!this.isDailyTaskRewardAvailable(id)) {
            return false;
        }
        gm.network.sendAction("gainDailyTaskReward", { id: id }, function (data) {
            console.log("gainDailyTaskReward: data:" + JSON.stringify(data));
            if (!data.result) {
                console.log("gainDailyTaskReward: failed.");
                return;
            }
            var config = Conf.dailyTask[id];
            var dailyData = this.data.dailyTask;
            dailyData.dailyStar[config["name"]] += 1;
            gm.postMessage(consts.kMessageGainDailyTask);
            if (config["gold"] > 0) {
                this.addMoney(this.getDailyTaskGoldReward(id), "gold");
                return true;
            }
            else if (config["relic"] > 0) {
                this.addMoney(this.getDailyTaskRelicReward(id), "relic");
                return true;
            }
            this.addMoney(config["diamond"], "diamond");
            this.addMoney(config["crystal"], "crystal");
            this.addMoney(config["fragment"], "fragment");
            return true;
        }.bind(this));
    };
    __egretProto__.isDailyTaskRewardGained = function (id) {
        var config = Conf.dailyTask[id];
        var dailyData = this.data.dailyTask;
        var gained = dailyData.dailyStar[config["name"]];
        if (gained > dailyData.dailyTask) {
            // console.log("is daily task reward gained, id:" + id + ":" + gained + "-" + true);
            return true;
        }
        // console.log("is daily task reward gained, id:" + id + ":" + gained + "-" + false);
        return false;
    };
    __egretProto__.getCurrentDailyTaskIDs = function () {
        var IDs = [];
        for (var i = 0; i < constsLocal.kDailyTaskTypeCount; ++i) {
            var index = this.data.dailyTask.dailyTask * constsLocal.kDailyTaskTypeCount + i;
            IDs.push(index + 1);
        }
        return IDs;
    };
    __egretProto__.isCurrentPageDailyTaskRewardGained = function () {
        var dailyTaskIDs = this.getCurrentDailyTaskIDs();
        var dailyData = this.data.dailyTask;
        return _.every(dailyTaskIDs, function (id) {
            if (this.isDailyTaskRewardGained(id)) {
                return true;
            }
            console.log("is current page daily task reward gained" + ":" + false);
            return false;
        }.bind(this));
    };
    __egretProto__.isAllDailyTaskRewardGained = function () {
        var dailyData = this.data.dailyTask;
        if (dailyData.dailyTask == 2 && this.isCurrentPageDailyTaskRewardGained()) {
            return true;
        }
        return false;
    };
    __egretProto__.incDailyTaskData = function (name, count) {
        if (count === void 0) { count = 1; }
        if (this.data.dailyTask == undefined) {
            console.log("daily task data is undefined");
            return;
        }
        if (name in this.data.dailyTask) {
            this.data.dailyTask[name] += count;
            gm.postMessageNextTick(consts.kMessageRefreshDailyTip);
            // console.log("increase daily task data, " + name + ":" + count + ", to:" + this.data.dailyTask[name]);
            return;
        }
        console.error("increase a error name:" + name);
    };
    return DataManage;
})(egret.EventDispatcher);
DataManage.prototype.__class__ = "DataManage";
