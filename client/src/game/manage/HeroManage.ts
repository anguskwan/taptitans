/**
 * Created by lhb on 15/9/15.
 */

class HeroManage extends egret.EventDispatcher {

    public data:any;
    public heroDpsCache : number = 0;

    public constructor(data) {
        super();
        this.data = data;
        this.initHeroBuffs();
        this.initHeroes();
        gm.registerMessage(consts.kMessageMoneyUpdate, this.onMoneyUpdate, this);
        this.initHeroDPSTimer();
    }

    private timer:egret.Timer;

    private initHeroDPSTimer() {
        var timer:egret.Timer = this.timer = new egret.Timer(1000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.heroDamagePerMS, this);
        timer.start();
    }

    public stopHeroDPS() {
        this.timer.stop();
    }

    public reset() {
        this.initHeroBuffs();
        this.initHeroes();
    }

    public autoUpgrade(id) {
        if (tt.Setting.isOpenAutoHook() && id) { // TODO: jinge
            if (!this.data.heroes[id]) {
                id = this.data.heroes.length - 1;
            }
            this.heroUpgrade(this.data.heroes.length - 1, 1000);
            this.heroUpgrade(id, 1000);
            this.unlockHeroSkill(id);
            gm.dataManage.master.autoUpgrade();
        }
    }

    private heroDamagePerMS() {
        if (gm.dataManage.hasMonster) {
            var dmg = this.heroDpsCache;
            gm.dataManage.reduceHP(dmg);
        }
    }

    initHeroes() {
        if (!_.isEmpty(this.data.heroes)) {
            _.each(this.data.heroes, (hero, idx) => {
                if (idx > 0 && !hero) {
                    this.data.heroes[idx] = {level:0, skill:0, revivalTime:0};
                }
            });
            return;
        }
        if (!this.data.heroes[1]) {this.data.heroes[1] = {level:0,skill:0, revivalTime:0};}
    }

    private initHeroBuffs() {
        this.data.heroBuffs = formula.heroSkillBuffs(this.data);
    }

    getActivatedHeroIds() {
        var heroes = this.data.heroes;
        var length = heroes.length;
        var ids = [];
        for(var i = length-1; i > 0; i--) {
            var hero = heroes[i];
            if (hero.level > 0) {
                ids.push(i);
            }
        }
        return ids;
    }

    getHeroInfo(hid) {
        var meta = Conf.hero[hid];
        var hero = this.data.heroes[hid];
        var dps = formula.heroDPS(this.data, hid, hero.level);
        return {
            name : meta.name,
            level : hero.level,
            skills: this.getHeroSkillInfo(hid),
            dps : dps,
            cost : this.getHeroUpgradeCost(hid, 1),
            nextLevelAddDps: formula.heroDPS(this.data, hid, hero.level+1) - dps,
            skill:hero.skill
        }
    }

    getHeroSkillInfo(hid) {
        var meta = Conf.heroSkill[hid];
        var hero = this.data.heroes[hid];
        return _.map(meta, function(v, id) {
            return {
                name : v["name"],
                skillType : v["skill"],
                value : v["value"],
                enabled : hero.skill >= id
            }
        });
    }

    onMoneyUpdate() {
        var heroes = this.data.heroes;
        var id = heroes.length - 1;
        var next = id+1;
        var meta = Conf.hero[next];
        if (!meta) return;
        var cost = this.getHeroUpgradeCostLv1(id);
        if (this.data.gold > cost && !heroes[next]) {
            heroes[next] = {level:0,skill:0, revivalTime:0};
            gm.network.sendAction("addNewHero", {heroId:next});
            gm.postMessage(consts.kMessageNewHeroAppear, {id: next});
        }
    }

    isAllHeroesAlive() {
        return formula.isAllHeroesAlive(this.data);
    }

    getRelicsByHeroesLevel() {
        return formula.relicsByHeroesLevel(this.data);
    }

    getHeroUpgradeCostLv1(id){
        return formula.heroUpgradeCost(this.data, id, 0, 1, false, formula.getHeroUpgradeCostIndex(this.data));
    }

    getHeroUpgradeCost(id, num = 1) {
        var lv = this.data.heroes[id].level;
        return formula.heroUpgradeCost(this.data, id, lv, num, false, formula.getHeroUpgradeCostIndex(this.data));
    }

    heroUpgrade(id, num) {
        var hero = this.data.heroes[id];
        var lv = hero.level;
        var limit = formula.heroUpgradesLimit(this.data, id, formula.getHeroUpgradeCostIndex(this.data));
        if (limit == 0) {return false;}
        num = Math.min(limit, num);
        if (lv < 1000 && lv + num > 1000) {
            num = 1000 - lv;
        }

        gm.network.sendAction("heroUpgrade", {heroId:id, upgrades:num}, (data) => {
            gm.dataManage.costMoney(data.cost, "gold");
            hero.level += num;

            if (hero.level == 1) {
                gm.gameScene.showHeroEnterEffect =true;
                gm.gameScene.refreshHeroes();
            } else {
                gm.gameScene.showHeroUpgradeEffect(id);
            }
            gm.dataManage.incAchievementValue(10, num);
            gm.postMessage(consts.kMessageLevelUp);
            gm.dataManage.setAchievementValue(6, this.heroDpsCache);

            gm.dataManage.incDailyTaskData("heroUpgrade", num);
        });
        return true;
    }

    getHeroSkillUnlockCost(id) {
        var sid = this.data.heroes[id].skill + 1;
        return formula.heroUnlockSkillCost(this.data, id, sid);
    }

    isUnlockHeroSkill(id){
        var hero = this.data.heroes[id];
        var sid = hero.skill + 1;
        var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
        if (!unlockLevel || hero.level < unlockLevel) {
            return false;
        }
        return true;
    }

    unlockHeroSkill(id) {
        var hero = this.data.heroes[id];
        var sid = hero.skill + 1;
        var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
        if (!unlockLevel || hero.level < unlockLevel) {
            return false;
        }

        gm.network.sendAction("heroUnlockSkill", {heroId:id}, (data) => {
            var hero = this.data.heroes[id];
            var sid = hero.skill + 1;
            var cost = formula.heroUnlockSkillCost(this.data, id, sid);
            gm.dataManage.costMoney(cost, consts.kMoneyTypeGold);
            hero.skill = sid;
            formula.addHeroBuff(this.data, id, sid);
            gm.postMessage(consts.kMessageLevelUp);
        });
    }

    getAllHeroDPS() {
        this.heroDpsCache = formula.allHeroesDPS(this.data);
        return this.heroDpsCache;
    }

    showWeaponLayer(id) {
        var ly = new HeroWeaponLayer(id);
        gm.mainLayer.addChild(ly);
    }

    addHeroWeapon(id, num) {
        this.data.heroWeapons[id] = this.data.heroWeapons[id] || 0;
        this.data.heroWeapons[id] += num;
        this.showWeaponLayer(id);
    }

    getFightValue() {
        return formula.totalFightValue(this.data);
    }

    getWeaponTotalNum() {
        var num = 0;
        var length = this.data.heroWeapons.length;
        for(var i = 0; i < length; i++) {
            num += this.data.heroWeapons[i];
        }
        return num;
    }

    getRevivalCost(id) {
        var hero = this.data.heroes[id];
        return Math.floor(moment(hero.revivalTime).diff(moment(), 'h', true) * Conf.config.heroRevivalCost);
    }

    revivalHero(id, cb) {
        var cost = this.getRevivalCost(id);
        if (!gm.dataManage.costMoney(cost, consts.kMoneyTypeDiamond)) {
            return false;
        }
        gm.gameUI.showLoadingLayer();
        gm.network.sendAction("revivalHero", {heroId:id}, (data) => {
            this.data.heroes[id].revivalTime = 0;
            gm.postMessage(consts.kMessageHeroRevival,id);
	    gm.gameUI.hideLoadingLayer();
            Util.invokeCallback(cb, data);
        },function(){
            gm.gameUI.hideLoadingLayer();
        }.bind(this))
    }
}
