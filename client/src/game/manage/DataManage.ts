/**
 * Created by lhb on 15/9/1.
 */

class DataManage extends egret.EventDispatcher{

    public data:any;
    public monsterHP:number;
    public hasMonster: boolean = false;
    public isDailyBoss : boolean = false;
    public heroes:HeroManage;
    public master:MasterManage;
    public artifact:ArtifactManage;
    private tapsPerMission:number;
    public tapsOfMidas:number = 0;
    public mDmg = 0;
    public mails:any;
    public guild:any;
    public purchaseActivity:any;
    public costDiamondActivity:any;
    public oppGuild:any;
    public equips:any;
    public serverTime:any;
    public newMarket:any;
    public activityTime:any;
    public serverTimeWX:any;
    public isNotFirstShared:any;
    public shareTimes:any;
    public lastShareTime:any;
    public timeRemain:any;
    public threeFinish:any;
    public firstPurchaseGiftTime:any;

    public constructor(data) {
        super();
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
        this.isNotFirstShared= data.isNotFirstShard;
        this.shareTimes= data.dailyEvent.shareTimes;
        this.lastShareTime= data.dailyEvent.lastShareTime;

        if (this.shareTimes>0)
            this.timeRemain= Conf.shareReward[3].duration - (this.serverTimeWX - this.lastShareTime);
        else
            this.timeRemain= 0;


        this.setDailyEvent();
    }

    initDailyTaskData() {
        console.log("init daily task data.");

        gm.dataManage.data.dailyTask = {
            dailyTask: 0,            // 每日任务等级
            clickPerSecond: 0,       // 每秒点击速度
            stageCount: 0,           // 通过关卡次数
            masterUpgrade: 0,        // 提升主角等级
            masterSkill: 0,          // 释放主角技能
            totalClick: 0,           // 累计点击次数
            heroUpgrade: 0,          // 提升英雄等级
            artifactUpgrade: 0,      // 提升神器等级
            killMonster: 0,          // 杀死怪兽次数
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
    }

    setDailyEvent() {
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
    }

    public getMonsterHPMax():number {
        return formula.monsterHP(this.data);
    }

    isBossMonster() {
        return this.data.isBoss;
    }

    isBossStage():boolean {
        return this.data.mission >= this.getMaxMission();
    }

    getMaxMission() {
        return formula.numOfMonstersEachStage(this.data);
    }

    private missionCreateTime:any;
    createMission(isBoss?) {
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
    }

    public nextMission():void {

        var nextIsBoss = false;
        if (this.data.isBoss) {
            this.data.mission = 0;
            this.data.stage ++;

            this.incDailyTaskData("stageCount");
            gm.postMessage(consts.kMessageStageComplete, this.data.stage);
            this.heroes.autoUpgrade(this.data.stage %33+1);
            this.autoPrestige();
        } else if (!this.isBossStage()){
            this.data.mission ++;
            if (this.isBossStage()) {
                nextIsBoss = true;
            }
        }
        this.createMission(nextIsBoss);


        gm.postMessage(consts.kMessageMissionComplete);
    }

    monsterDead(isDoom) {
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

        if (this.data.isBoss) {this.incAchievementValue(7)}

        gm.network.sendAction("killTitan", {
            taps: this.tapsPerMission,
            dmg : this.mDmg,
            isDoom : !!isDoom,
            isBoss : this.data.isBoss,
            hp:this.getMonsterHPMax(),
            heroDps: this.heroes.heroDpsCache
        }, function(data) {
            this.data.isChest = data.isChest;
            this.data.isDivineChalice = data.isDivineChalice;
            this.data.dailyEvent.clicks = data.clicks;
            this.addMoney(data.relic, 'relic');
            this.addMoney(data.gold, "gold");
            this.data.dailyTask.clickPerSecond = data.clickPerSecond;

            this.nextMission();
        }.bind(this), function() {
            console.log("kill titan no response!");
        });
    }

    public monsterMaxHp:number = 0;
    createDailyBoss(hp) {
        this.tapsPerMission = 0;
        this.hasMonster = true;
        this.isDailyBoss = true;
        this.mDmg = 0;
        this.monsterHP = hp;
        this.monsterMaxHp = hp;
        gm.postMessage(consts.kMessageMonsterHPChange, this.monsterHP);
        gm.postMessage(consts.kMessageOnBossEnter, true);
    }

    isDivineChalice() {
        return this.data.isDivineChalice && !this.data.isChest && !this.data.isBoss;
    }

    getDailyBossInfo(cb) {
        gm.network.sendAction("getDailyBossInfo", {}, function(data) {
            cb(data);
        }.bind(this));
    }

    fightDailyBoss() {

        this.getDailyBossInfo(function(data) {
            if (data) {
                gm.gameScene.removeBoss();
                this.createDailyBoss(data.hp);
            }
        }.bind(this))
    }

    killDailyBoss(isDoom) {
        gm.network.sendAction("killDailyBoss", {
            taps: this.tapsPerMission,
            dmg: this.mDmg,
            isDoom : !!isDoom
        }, function(data) {
            this.addDailyReward(data);
            gm.gameScene.removeBoss();
            gm.postMessage(consts.kMessageKillDailyBoss,data);
            this.createMission();
        }.bind(this));
    }

    addDailyReward(data) {
        switch (data.type) {
            case 'diamond':
                this.addMoney(data.num, 'diamond');
                break;
            case 'weapon':
                this.addWeaponItem(data.num);
                break;
        }
    }

    addWeaponItem(num) {
        if (!num) {return;}
        RES.loadGroup("getItemAnimation");
        this.data.weaponItem += num;
        gm.postMessage(consts.kMessageWeaponItemUpdate);
    }

    costWeaponItem(num) {
        if (this.data.weaponItem < num) {return false;}
        this.data.weaponItem --;
        gm.postMessage(consts.kMessageWeaponItemUpdate);
        return true;
    }

    useWeaponItem(cb) {
        if (!this.costWeaponItem(1)) {return;}
        gm.network.sendAction("useWeaponItem", null, function(data) {
            this.heroes.addHeroWeapon(data.weaponId, 1);
            cb(data.weaponId);
        }.bind(this))
    }

    resetWeapon(wid,cb,fail){
        gm.network.sendAction("resetWeapon",{wid:wid}, function() {
            this.data.dailyEvent.resetWeapon++;
            this.data.heroWeapons[wid] --;
            this.addWeaponItem(1);
            Util.invokeCallback(cb);
        }.bind(this),fail)
    }

    addWeaponSets(num) {
        for (var i = 1; i <=33; i++) {
            this.data.heroWeapons[i] += num;
        }
    }

    addMoney(num, type) {
        console.log("add money, num:" + num + ",type:" + type);
        if (isNaN(num)) {return;}
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
        gm.postMessageNextTick(consts.kMessageMoneyUpdate,type);
    }

    costMoney(num, type) {
        console.log("cost money, num:" + num + ",type:" + type);
        if (isNaN(num)) {return false;}
        if (!isNaN(parseInt(type))) {
            type = consts.kMoneyNames[type];
        }
        var money = this.data[type];
        if (money < num) {
            if(type == "diamond"){
                gm.postMessage(consts.kMessageShowToastLayer,"钻石不足");
            }
            return false;
        } else {
            this.data[type] -= num;
            gm.postMessageNextTick(consts.kMessageMoneyUpdate);
            return true;
        }
    }

    addShopSkill(num,type){
        if (isNaN(num)) {return;}
        if (num == 0) {
            return;
        }
        if (isNaN(parseInt(type))) {
            type = consts.kShopItemName.indexOf(type);
        }
        this.data.shopItems[type] = this.data.shopItems[type] || 0;
        this.data.shopItems[type] += num;
        gm.postMessage(consts.kMessageShopSkillUpdate,type);
    }

    isCostShopSkill(num,type){
        if (isNaN(num)) {return;}
        var skill = this.data.shopItems[type];
        if (skill < num) {
            return false;
        } else {
            return true;
        }
    }

    costShopSkill(num, type) {
        if (isNaN(num)) {return;}
        var skill = this.data.shopItems[type];
        if (!skill || skill < num) {
            return false;
        } else {
            this.data.shopItems[type] -= num;
            gm.postMessage(consts.kMessageShopSkillUpdate,type);
            return true;
        }
    }

    public reduceHP(value:number, showText?, isDoom?, mul = 1, record?) {
        // 攻击整体加成
        var attackScale = 1;
        if (gm.dataManage.data.remainAttMulTime != 0) {
            attackScale = 2; //固定加2倍， todo
        }
        value = value * attackScale;

        if (gm.network.isOffline) {return;}
        if (!this.hasMonster) {return;}
        if (record) {
            this.mDmg += value;
        }
        this.monsterHP -= value;
        if (showText) {
            var max = formula.criticalMultiplier(this.data);
            gm.gameScene.showDamageText(value, mul == 1? 1:mul / max + 1);
        }
        if (this.monsterHP <= 0) {
            this.hasMonster = false;
            gm.postMessage(consts.kMessageOnBossDead, isDoom);
        }
        gm.postMessage(consts.kMessageMonsterHPChange, this.monsterHP);
    }

    private calMultiplier() {
        var rate = formula.criticalChance(this.data);
        if (Math.random() < rate) {
            var mul = formula.criticalMultiplier(this.data);
            mul = Util.randomReal(mul*0.35, mul);
            return mul;
        }
        return 1;
    }

//    public handsOfMidas = 0;

    public onTapDamage(pos):any {
        if (!this.hasMonster) {return}
        this.tapsPerMission++;
        var mul = this.calMultiplier();
        var dmg = this.master.getTapDamage() * mul;
        if (this.data.masterBuffs[consts.kMasterSkillTypeHandOfMidas]) {
            this.tapsOfMidas ++;
            gm.postMessage(consts.kMessageOnMidasTap);
        }
        gm.gameScene.onBossHit();
        gm.gameScene.showTapEffect(pos);
        gm.postMessage(consts.kMessageTapDamage,dmg);
        this.reduceHP(dmg, true, false, mul, true);
    }

    public midasGold = 0;
    finishHandOfMidas() {
        gm.network.sendAction("handOfMidasTap", {taps:this.tapsOfMidas}, function(res) {
            var gold = res.gold;
            this.tapsOfMidas = 0;
            this.midasGold = gold;
            gm.postMessage(consts.kMessageOnMidasTapFinish, gold);
            //this.addMoney(gold, 'gold');
        }.bind(this), function() {}, true);
    }

    isUnlockPrestige(){
        if(Util.getQueryString('d') == '1'){
            return true;
        }
        var meta = Conf.masterSkill[consts.kMasterSkillTypePrestige];
        return this.data.masterLevel >= meta.unlock;
    }

    getPrestigeDiamondCost() {
        var vipInfo = this.vipInfo();
        var cost = this.data.stage * Conf.config.prestigeCostCoe * (1 + vipInfo.prestigeCost);
        cost = Math.ceil(cost);
        return cost;
    }

    prestigeByDiamond() {
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
    }

    // 蜕变
    prestige(notify = true) {
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
    }

    getRelicsByStage() {
        return formula.relicsByStage(this.data);
    }

    getRelicsByHeroes() {
        return formula.relicsByHeroesLevel(this.data);
    }

    getRelicsByPrestige() {
        return formula.relicsByPrestige(this.data);
    }

    goldRain(cb) {
        if(!this.costShopSkill(1,consts.kShopItemGoldRain)) {
            if (!this.costMoney(Conf.shop[consts.kShopItemGoldRain].cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("goldRain",{},()=> {
            var gold = formula.goldRain(this.data);
            this.addMoney(gold, "gold");
            gm.postMessage(consts.kMessageGoldRain);
            Util.invokeCallback(cb);
        });
    }

    getGoldRain(){
        return formula.goldRain(this.data);
    }

    private autoTapInterval;

    checkAutoTap() {
        if (this.data.autoTapRemainTime > 0 && !this.autoTapInterval) {
            this.autoTapInterval = egret.setInterval(() => {
                this.data.autoTapRemainTime -= 0.2;
                this.onTapDamage(new egret.Point(gm.winSize.width / 2, gm.winSize.height / 2));
                if (this.data.autoTapRemainTime <= 0) {
                    egret.clearInterval(this.autoTapInterval);
                    this.autoTapInterval = null;
                }
            }, this, 200);
        }
    }

    buyAutoTap(cb) {
        if(!this.costShopSkill(1,consts.kShopItemAutoTap)) {
            if (!this.costMoney(Conf.shop[consts.kShopItemAutoTap].cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("autoTap", {}, (data) => {
            this.data.autoTapRemainTime += 30 * 60;
            this.checkAutoTap();
            gm.postMessage(consts.kMessageBuyAutoTap);
            Util.invokeCallback(cb);
        });
    }

    addItem(num,type){
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
                //todo
                break;    

            default:
                break;
        }
    }

    buyTenTimes(cb){
        if(!this.costShopSkill(1,consts.kShopItemTenTimes)) {
            var cost = Conf.shop[consts.kShopItemTenTimes].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        gm.network.sendAction("buyTenTimes", {}, (data) => {
            _.each(data,function(v){
                this.addItem(v.num,v.type);
            }.bind(this));
            Util.invokeCallback(cb,data);
        });
    }

    doom() {
        if(!this.costShopSkill(1,consts.kShopItemDoom)) {
            var cost = Conf.shop[consts.kShopItemDoom].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        gm.gameScene.master.doom();
    }

    public holdingPower:boolean = false;

    powerOfHolding() {
        if(!this.costShopSkill(1,consts.kShopItemPowerOfHolding)){
            var cost = Conf.shop[consts.kShopItemPowerOfHolding].cost;
            if (!this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        this.holdingPower = true;
        egret.setTimeout(function() {
            this.holdingPower = false;
            gm.mainLayer.touchEnd();
        }.bind(this), this, 120 * 1000);
        gm.network.sendAction("powerOfHolding", {});
    }

    getSkillRefreshCost() {
        return formula.skillRefreshCost(this.data);
    }

    refreshSkill() {
        if(!this.costShopSkill(1,consts.kShopItemRefreshSkill)) {
            var cost = formula.skillRefreshCost(this.data);
            if (!cost || !this.costMoney(cost, "diamond")) {
                return false;
            }
        }
        for(var i = 1; i < 7; i++) {
            this.data.masterSkills[i].lastTimeUse = 0;
        }
        gm.network.sendAction("refreshSkill");
        gm.postMessage(consts.kMessageRefreshSkill,consts.kShopItemRefreshSkill);
        return true;
    }

    onFightBossEvent(fightBoss) {
        if (!this.hasMonster) {return false;}
        if (this.isBossStage() || this.isDailyBoss) {
            gm.gameScene.removeBoss();
            this.createMission(fightBoss);
        }
        return true;
    }

    incAchievementValue(id, num?) {
        num = _.isUndefined(num) ? 1 : num;
        this.data.achievements[id].value += num;
        if (this.isAchievementRewardAvailable(id)) {
            gm.postMessage(consts.kMessageGetAchievement);
        }
    }

    setAchievementValue(id, num) {
        var a = this.data.achievements[id];
        a.value = Math.max(a.value, num);
        if (this.isAchievementRewardAvailable(id)) {
            gm.postMessage(consts.kMessageGetAchievement);
        }
    }

    isAchievementRewardAvailable(id) {
        var a = this.data.achievements[id];
        var meta = Conf.achievements[id];
        var next = a.stars + 1;

        return meta["star" + next] && meta["star" + next] <= a.value;
    }

    gainAchievementReward(id) {
        if (!this.isAchievementRewardAvailable(id)) {return false}
        var a = this.data.achievements[id];
        a.stars++;
        var diamond = consts.kAchievementsRewards[a.stars];
        this.addMoney(diamond, 'diamond');
        gm.network.sendAction("gainAchievementReward", {id: id});
        gm.postMessage(consts.kMessageGetAchievement);
    }

    collectOfflineGold(cb) {
        gm.network.sendAction("collectOfflineGold", null, function(data) {
            cb(data);
        }.bind(this));
    }

    getDailyMonthCardDiamond(cb) {
        gm.network.sendAction("getDailyMonthCardDiamond", null, function(data) {
            cb(data);
        })
    }

    isTodayMonthCardRewardAvailable() {
        var getTime = moment(this.data.getMCDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    }

    remainMonthCardDays() {
        var expireTime = moment(this.data.monthCardTime).add(30, 'd').startOf('d');
        return expireTime.diff(moment(), 'days', true);
    }

    getDailySupMonthCardDiamond(cb) {
        gm.network.sendAction("getDailySupMonthCardDiamond", null, function(data) {
            cb(data);
        })
    }

    getDailyLifeCardDiamond(cb) {
        gm.network.sendAction("getDailyLifeCardDiamond", null, function(data) {
            gm.dataManage.data.getLifeCardDailyDiamondTime = new Date();
            cb(data);
        })
    }

    isTodaySupMonthCardRewardAvailable() {
        var getTime = moment(this.data.getSupMCDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    }

    remainSupMonthCardDays() {
        var expireTime = moment(this.data.supMonthCardTime).add(30, 'd').startOf('d');
        return expireTime.diff(moment(), 'days', true);
    }

    isTodayLifeCardRewardAvailable() {
        if (!this.data.isBoughtLifeCard) {
            return false;
        }

        var getTime = moment(this.data.getLifeCardDailyDiamondTime);
        return !getTime.isSame(moment(), 'd');
    }


    getStageSetId() {

        var stage = this.data.stage;
        var setId = Math.ceil(stage / 5);
        setId = Util.modByLimit(setId, 10);
        return setId;
    }

    setTutorialFinish(id) {
        this.data.tutorials[id] = true;
        gm.network.sendAction("setTutorialFinish", {id: id});
    }

    public calBossId() {
        if (this.data.isChest && !this.isBossMonster()) {
            return "chest";
        }
        if (this.isDailyBoss) {
            return "";
        }
        var setId = this.getStageSetId();
        var start = (setId-1) * 7;
        return Util.randomInt(start+1, start + 7 );
    }

    public isContestAvailable(cb) {
        gm.network.sendAction('isContestAvailable', {}, (data) => {
            Util.invokeCallback(cb, data);
        })
    }

    public getContestReward(cb){
        gm.network.sendAction('getContestReward', {}, (data) => {
            this.data.contestId = "none";
            this.data.contestStartTime = 0;
            Util.invokeCallback(cb, data);
        });
    }

    public isInContest() {
        return this.data.contestId != "none";
    }

    public isContestFinish() {
        if (!this.data.contestId) {return false;}

        var diff = moment().diff(moment(this.data.contestStartTime), 'hours', true);
        return diff >= consts.kContestDuration;
    }

    public joinContest(cb) {
        gm.network.sendAction('joinContest', {}, (data) => {
            this.prestige(false);
            this.data.contestId = data.contestId;
            this.data.contestStartTime = data.startTime;
            Util.invokeCallback(cb, data);
        });
        return true;
    }

    public joinHardContest(cb) {
        gm.network.sendAction('joinHardContest', {}, (data) => {
            this.prestige(false);
            this.data.contestId = data.contestId;
            this.data.contestStartTime = data.startTime;
            Util.invokeCallback(cb, data);
        });
        return true;
    }

    public isHardContest() {
        return _.startsWith(this.data.contestId, 'hard-');
    }

    checkIfHasPurchaseGiftBag(cb,fail){
        gm.network.sendAction('checkIfHasPurchaseGiftBag', {}, (data) => {
            Util.invokeCallback(cb, data);
        },fail);
    }

    getDailyPurchaseGiftBag(cb,fail){
        gm.network.sendAction('getDailyPurchaseGiftBag', {}, (data) => {
            this.data.dailyEvent.purchaseGiftBag = true;
            gm.postMessage(consts.kMessageIsGetActivityGiftBag);
            Util.invokeCallback(cb, data);
        },fail);
    }

    getVipLevel(cb,fail){
        gm.network.sendAction('getVipLevel', {}, (data) => {
            gm.dataManage.data.vip = data.vip;
            gm.dataManage.data.purchaseNum = data.purchaseNum;
            Util.invokeCallback(cb, data);
        },fail);
    }

    getVipGift(lv,cb,fail){
        gm.network.sendAction('getVipGift', {level:lv}, (data) => {
            this.addVipGift(lv);
            this.data.vipGift[lv] = 1;
            Util.invokeCallback(cb, data);
        },fail);
    }

    getDailyRelic(cb,fail){
        gm.network.sendAction('getDailyRelic', {}, (data) => {
            this.data.dailyEvent.getRelic = 1;
            this.addItem(data.relic,"relic");
            Util.invokeCallback(cb, data);
        },fail);
    }

    vipInfo(lv?) {
        lv = ((lv == void 0) ? this.data.vip : lv);
        return Conf.vip[lv];
    }

    addVipGift(lv) {
        var info = this.vipInfo(lv);
        _.each(info, function(v, k) {
            this.addItem(v, k);
        }.bind(this))
    }

    donate(gid,type,diamond,cb,fail){
        gm.network.sendAction('donate', {gid:gid,type:type,diamond:diamond}, () => {
            this.data.dailyEvent.donate++;
            this.addMoney(diamond, 'crystal');
            if (!this.guild.contribution) {this.guild.contribution = {}}
            if (!this.guild.upgrades) {this.guild.upgrades = {}}
            this.guild.upgrades[type] = this.guild.upgrades[type] || {exp:0, level:1};
            var guild;
            if (consts.kGuildUpgradeTypeMember == type) {
                guild = this.guild;
            } else {
                guild = this.guild.upgrades[type];
            }
            var meta = Conf.guildLevel[guild.level];
            guild.exp += diamond;
            if (meta && guild.exp >= meta.exp) {
                guild.level ++;
                guild.exp = 0;
            }
            Util.invokeCallback(cb);
        },fail);
    }

    updateDiamond(cb,fail){
        gm.network.sendAction('updateDiamond', {}, (data) => {
            var addDiamond = data.diamond - this.data.diamond;
            this.addItem(addDiamond,"diamond");
            Util.invokeCallback(cb,addDiamond);
        },fail);
    }

    buyEquip(type,cb,fail){
        var cost;
        if(type == 1){
            cost = gm.gameUI.getGuildTypeSource(3).cost;
            if (!this.costMoney(cost, consts.kMoneyTypeCrystal)) {
                Util.invokeCallback(fail);
                return ;
            }
        }
        else {
            cost = Conf.market[9].cost;
            if (!this.costMoney(cost, consts.kMoneyTypeDiamond)) {
                Util.invokeCallback(fail);
                return ;
            }
        }
        gm.network.sendAction('buyEquip', {type:type}, (data) => {
            if(data.type != "equip"){
                this.addItem(data.num,data.type);
            }
            else {
                gm.gameUI.isAddNewEquip = true;
                gm.postMessage(consts.kMessageAddNewEquip);
            }
            Util.invokeCallback(cb,data);
        },fail);
    }

    buyTenEquip(type,cb,fail){
        var cost;
        if(type == 1){
            cost = gm.gameUI.getGuildTypeSource(4).cost;
            if (!this.costMoney(cost, consts.kMoneyTypeCrystal)) {
                Util.invokeCallback(fail);
                return ;
            }
        }
        else {
            cost = Conf.market[10].cost;
            if (!this.costMoney(cost, consts.kMoneyTypeDiamond)) {
                Util.invokeCallback(fail);
                return ;
            }
        }
        gm.network.sendAction('buyTenEquip', {type:type}, (data) => {
            _.each(data,function(v){
                if(v.type != 'equip'){
                    this.addItem(v.num,v.type);
                }
                else {
                    gm.gameUI.isAddNewEquip = true;
                    gm.postMessage(consts.kMessageAddNewEquip);
                }
            }.bind(this));
            Util.invokeCallback(cb,data);
        },fail);
    }

    evolutionEquip(eid,cb,fail){
        gm.network.sendAction('evolutionEquip', {eid:eid}, (data) => {
            Util.invokeCallback(cb,data);
        },fail);
    }

    queryEquips(cb,fail){
        gm.network.sendAction('queryEquips', {}, (data) => {
            this.equips = data.equips || {};
            Util.invokeCallback(cb);
        },fail);
    }

    setMasterEquips(equips,cb,fail){
        gm.network.sendAction('setMasterEquips', {equips:equips}, (data) => {
            this.data.masterEquips = equips;
            Util.invokeCallback(cb,data);
        },fail);
    }

    updateEquipValue(cb,fail){
        gm.network.sendAction("updateEquipValue", {},function(data){
            this.data.equipValues = data;
            gm.postMessage(consts.kMessageUpdateEquipValues);
            Util.invokeCallback(cb);
        }.bind(this),fail);
    }

    getDailyReward(cb,fail){
        gm.network.sendAction("getDailyReward", {},function(data){
            if(data.result){
                this.data.dailyReward.got = data.info;
                this.data.dailyEvent.dailyLoginReward = true;
                this.addItem(data.num,data.type);
            }
            Util.invokeCallback(cb,data);
        }.bind(this),fail);
    }

    getServerTime(cb,fail){
        gm.network.sendAction("getServerTime", {},function(data){
            this.serverTime = data;
            Util.invokeCallback(cb, data);
        }.bind(this),fail);
    }

    buyMarketItem(itemId,cb,fail){
        var id = itemId;
        var meta = Conf.market[id];
        if (!this.costMoney(meta.cost, 'diamond')) {
            Util.invokeCallback(fail);
            return false;
        }
        gm.network.sendAction("buyMarketItem", {itemId:itemId},function(){
            if(meta.type == "exp"){
                this.updateEquipValue(function(){
                    Util.invokeCallback(cb,{num:meta.num,type:meta.type});
                }.bind(this),function(){
                    Util.invokeCallback(fail);
                }.bind(this));
            } else if (meta.type == "gold"){
                var gold = formula.goldRain(this.data);
                var num = gold * meta.num;
                this.addMoney( num, "gold"); 
                Util.invokeCallback(cb,{num:num,type:meta.type});               
            }
            else {
                this.addItem(meta.num, meta.type);
                Util.invokeCallback(cb,{num:meta.num,type:meta.type});
            }
        }.bind(this),fail);
    }

    refreshMarket_activity(cb,fail){
        if (!this.costMoney(50, 'diamond')) {
            Util.invokeCallback(fail);
            return ;
        }
        gm.network.sendAction("refreshMarket", {},function(){
            Util.invokeCallback(cb);
        }.bind(this),fail);
    }

    joinZodiac(cb,fail){
        gm.network.sendAction("joinZodiac", {},function(data){
            this.data.zodiacId = data.id;
            Util.invokeCallback(cb);
        }.bind(this),fail);
    }

    getZodiacReward(cb,fail){
        gm.network.sendAction("getZodiacReward", {},function(data){
            this.data.dailyEvent.zodiacReward = true;
            if(_.size(data.reward) != 0){
                this.addItem(data.reward.crystal,"crystal");
                this.addItem(data.reward.fragment,"fragment");
            }
            Util.invokeCallback(cb,data);
        }.bind(this),fail);
    }

    autoPrestige(){
        var prestige = tt.Setting.isOpenAutoPrestige();
        var stage = tt.Setting.getAutoPrestigeStage();
        var level = this.data.masterLevel;
        if(prestige && this.data.stage >= stage && level >= 600){
            this.prestige();
        }
    }

    cheatMoney(gold, diamond, relic, weapon,crystal,fragment) {
        gold = gold || 0;
        diamond = diamond || 0;
        relic = relic || 0;
        crystal = crystal || 0;
        fragment = fragment || 0;
        gm.network.sendAction("cheatMoney", {
            gold: gold,
            diamond : diamond,
            relic : relic,
            weapon : weapon,
            crystal: crystal
        }, function(data) {
            this.addMoney(gold, "gold");
            this.addMoney(relic, "relic");
            this.addMoney(diamond, "diamond");
            this.addMoney(crystal, "crystal");
            this.addMoney(fragment, "fragment");
            this.addWeaponItem(weapon);
        }.bind(this));
    }

    cheatExp(exp){
        gm.network.sendAction("cheatExp", {exp:exp}, function(){
            this.updateEquipValue(function(){},function(){});
        }.bind(this));
    }

    maxMorale(){
        return formula.maxMorale(this.data);
    }

    ////////////////////////////////////////
    //- Daily task part
    ////////////////////////////////////////

    isDailyTaskRewardAvailable(id) {
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
    }

    isAnyDailyTaskAvailable(): boolean {
        var dailyTaskIDs = this.getCurrentDailyTaskIDs();

        return _.some(dailyTaskIDs, function(id) {
            if (this.isDailyTaskRewardAvailable(id)) {
                //console.log("some daily task available, id:" + id);
                return true;
            }

            //console.log("some daily task is not available, id:" + id);
            return false;
        }.bind(this));
    }

    getDailyTaskGoldReward(id) {
        var config = Conf.dailyTask[id];
        return Math.floor(this.getGoldRain() * config["gold"]);
    }

    getDailyTaskRelicReward(id) {
        var config = Conf.dailyTask[id];

        var relicPercent = config["relic"];
        var prestige =  gm.dataManage.getRelicsByPrestige();

        var relicCount = prestige * relicPercent;

        if (relicCount < 1) {
            relicCount = 1;
        }

        return Math.floor(relicCount);
    }

    gainDailyTaskReward(id) {

        if (!this.isDailyTaskRewardAvailable(id)) {
            return false;
        }

        gm.network.sendAction("gainDailyTaskReward", {id: id}, function(data) {
            console.log("gainDailyTaskReward: data:" + JSON.stringify(data));

            if (!data.result) {
                console.log("gainDailyTaskReward: failed.");
                return;
            }

            var config = Conf.dailyTask[id];
            var dailyData = this.data.dailyTask;
            dailyData.dailyStar[ config["name"] ] += 1;

            gm.postMessage(consts.kMessageGainDailyTask);

            if (config["gold"] > 0) {
                this.addMoney( this.getDailyTaskGoldReward(id) , "gold");
                return true;
            }
            else if (config["relic"] > 0) {
                this.addMoney( this.getDailyTaskRelicReward(id) , "relic");
                return true;
            }

            this.addMoney(config["diamond"], "diamond");
            this.addMoney(config["crystal"], "crystal");
            this.addMoney(config["fragment"], "fragment");
            return true;
        }.bind(this));
    }

    isDailyTaskRewardGained(id): boolean {
        var config = Conf.dailyTask[id];
        var dailyData = this.data.dailyTask;

        var gained = dailyData.dailyStar[ config["name"] ];
        if (gained > dailyData.dailyTask) {
            // console.log("is daily task reward gained, id:" + id + ":" + gained + "-" + true);
            return true;
        }

        // console.log("is daily task reward gained, id:" + id + ":" + gained + "-" + false);
        return false;
    }

    getCurrentDailyTaskIDs() {
        var IDs = [];
        for (var i = 0; i < constsLocal.kDailyTaskTypeCount; ++i) {
            var index = this.data.dailyTask.dailyTask * constsLocal.kDailyTaskTypeCount + i;

            IDs.push(index + 1);
        }

        return IDs;
    }


    isCurrentPageDailyTaskRewardGained() {

        var dailyTaskIDs = this.getCurrentDailyTaskIDs();
        var dailyData = this.data.dailyTask;

        return _.every(dailyTaskIDs, function(id) {
            if (this.isDailyTaskRewardGained(id)) {
                return true;
            }

            console.log("is current page daily task reward gained" + ":" + false);
            return false;
        }.bind(this));
    }

    isAllDailyTaskRewardGained() {
        var dailyData = this.data.dailyTask;

        if (dailyData.dailyTask == 2 && this.isCurrentPageDailyTaskRewardGained()) {
            return true;
        }

        return false;
    }


    incDailyTaskData(name: string, count: number = 1) {
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
    }

}
