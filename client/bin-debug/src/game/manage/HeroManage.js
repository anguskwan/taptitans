/**
 * Created by lhb on 15/9/15.
 */
var HeroManage = (function (_super) {
    __extends(HeroManage, _super);
    function HeroManage(data) {
        _super.call(this);
        this.heroDpsCache = 0;
        this.data = data;
        this.initHeroBuffs();
        this.initHeroes();
        gm.registerMessage(consts.kMessageMoneyUpdate, this.onMoneyUpdate, this);
        this.initHeroDPSTimer();
    }
    var __egretProto__ = HeroManage.prototype;
    __egretProto__.initHeroDPSTimer = function () {
        var timer = this.timer = new egret.Timer(1000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.heroDamagePerMS, this);
        timer.start();
    };
    __egretProto__.stopHeroDPS = function () {
        this.timer.stop();
    };
    __egretProto__.reset = function () {
        this.initHeroBuffs();
        this.initHeroes();
    };
    __egretProto__.autoUpgrade = function (id) {
        if (tt.Setting.isOpenAutoHook() && id) {
            if (!this.data.heroes[id]) {
                id = this.data.heroes.length - 1;
            }
            this.heroUpgrade(this.data.heroes.length - 1, 1000);
            this.heroUpgrade(id, 1000);
            this.unlockHeroSkill(id);
            gm.dataManage.master.autoUpgrade();
        }
    };
    __egretProto__.heroDamagePerMS = function () {
        if (gm.dataManage.hasMonster) {
            var dmg = this.heroDpsCache;
            gm.dataManage.reduceHP(dmg);
        }
    };
    __egretProto__.initHeroes = function () {
        var _this = this;
        if (!_.isEmpty(this.data.heroes)) {
            _.each(this.data.heroes, function (hero, idx) {
                if (idx > 0 && !hero) {
                    _this.data.heroes[idx] = { level: 0, skill: 0, revivalTime: 0 };
                }
            });
            return;
        }
        if (!this.data.heroes[1]) {
            this.data.heroes[1] = { level: 0, skill: 0, revivalTime: 0 };
        }
    };
    __egretProto__.initHeroBuffs = function () {
        this.data.heroBuffs = formula.heroSkillBuffs(this.data);
    };
    __egretProto__.getActivatedHeroIds = function () {
        var heroes = this.data.heroes;
        var length = heroes.length;
        var ids = [];
        for (var i = length - 1; i > 0; i--) {
            var hero = heroes[i];
            if (hero.level > 0) {
                ids.push(i);
            }
        }
        return ids;
    };
    __egretProto__.getHeroInfo = function (hid) {
        var meta = Conf.hero[hid];
        var hero = this.data.heroes[hid];
        var dps = formula.heroDPS(this.data, hid, hero.level);
        return {
            name: meta.name,
            level: hero.level,
            skills: this.getHeroSkillInfo(hid),
            dps: dps,
            cost: this.getHeroUpgradeCost(hid, 1),
            nextLevelAddDps: formula.heroDPS(this.data, hid, hero.level + 1) - dps,
            skill: hero.skill
        };
    };
    __egretProto__.getHeroSkillInfo = function (hid) {
        var meta = Conf.heroSkill[hid];
        var hero = this.data.heroes[hid];
        return _.map(meta, function (v, id) {
            return {
                name: v["name"],
                skillType: v["skill"],
                value: v["value"],
                enabled: hero.skill >= id
            };
        });
    };
    __egretProto__.onMoneyUpdate = function () {
        var heroes = this.data.heroes;
        var id = heroes.length - 1;
        var next = id + 1;
        var meta = Conf.hero[next];
        if (!meta)
            return;
        var cost = this.getHeroUpgradeCostLv1(id);
        if (this.data.gold > cost && !heroes[next]) {
            heroes[next] = { level: 0, skill: 0, revivalTime: 0 };
            gm.network.sendAction("addNewHero", { heroId: next });
            gm.postMessage(consts.kMessageNewHeroAppear, { id: next });
        }
    };
    __egretProto__.isAllHeroesAlive = function () {
        return formula.isAllHeroesAlive(this.data);
    };
    __egretProto__.getRelicsByHeroesLevel = function () {
        return formula.relicsByHeroesLevel(this.data);
    };
    __egretProto__.getHeroUpgradeCostLv1 = function (id) {
        return formula.heroUpgradeCost(this.data, id, 0, 1, false, formula.getHeroUpgradeCostIndex(this.data));
    };
    __egretProto__.getHeroUpgradeCost = function (id, num) {
        if (num === void 0) { num = 1; }
        var lv = this.data.heroes[id].level;
        return formula.heroUpgradeCost(this.data, id, lv, num, false, formula.getHeroUpgradeCostIndex(this.data));
    };
    __egretProto__.heroUpgrade = function (id, num) {
        var _this = this;
        var hero = this.data.heroes[id];
        var lv = hero.level;
        var limit = formula.heroUpgradesLimit(this.data, id, formula.getHeroUpgradeCostIndex(this.data));
        if (limit == 0) {
            return false;
        }
        num = Math.min(limit, num);
        if (lv < 1000 && lv + num > 1000) {
            num = 1000 - lv;
        }
        gm.network.sendAction("heroUpgrade", { heroId: id, upgrades: num }, function (data) {
            gm.dataManage.costMoney(data.cost, "gold");
            hero.level += num;
            if (hero.level == 1) {
                gm.gameScene.showHeroEnterEffect = true;
                gm.gameScene.refreshHeroes();
            }
            else {
                gm.gameScene.showHeroUpgradeEffect(id);
            }
            gm.dataManage.incAchievementValue(10, num);
            gm.postMessage(consts.kMessageLevelUp);
            gm.dataManage.setAchievementValue(6, _this.heroDpsCache);
            gm.dataManage.incDailyTaskData("heroUpgrade", num);
        });
        return true;
    };
    __egretProto__.getHeroSkillUnlockCost = function (id) {
        var sid = this.data.heroes[id].skill + 1;
        return formula.heroUnlockSkillCost(this.data, id, sid);
    };
    __egretProto__.isUnlockHeroSkill = function (id) {
        var hero = this.data.heroes[id];
        var sid = hero.skill + 1;
        var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
        if (!unlockLevel || hero.level < unlockLevel) {
            return false;
        }
        return true;
    };
    __egretProto__.unlockHeroSkill = function (id) {
        var _this = this;
        var hero = this.data.heroes[id];
        var sid = hero.skill + 1;
        var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
        if (!unlockLevel || hero.level < unlockLevel) {
            return false;
        }
        gm.network.sendAction("heroUnlockSkill", { heroId: id }, function (data) {
            var hero = _this.data.heroes[id];
            var sid = hero.skill + 1;
            var cost = formula.heroUnlockSkillCost(_this.data, id, sid);
            gm.dataManage.costMoney(cost, consts.kMoneyTypeGold);
            hero.skill = sid;
            formula.addHeroBuff(_this.data, id, sid);
            gm.postMessage(consts.kMessageLevelUp);
        });
    };
    __egretProto__.getAllHeroDPS = function () {
        this.heroDpsCache = formula.allHeroesDPS(this.data);
        return this.heroDpsCache;
    };
    __egretProto__.showWeaponLayer = function (id) {
        var ly = new HeroWeaponLayer(id);
        gm.mainLayer.addChild(ly);
    };
    __egretProto__.addHeroWeapon = function (id, num) {
        this.data.heroWeapons[id] = this.data.heroWeapons[id] || 0;
        this.data.heroWeapons[id] += num;
        this.showWeaponLayer(id);
    };
    __egretProto__.getFightValue = function () {
        return formula.totalFightValue(this.data);
    };
    __egretProto__.getWeaponTotalNum = function () {
        var num = 0;
        var length = this.data.heroWeapons.length;
        for (var i = 0; i < length; i++) {
            num += this.data.heroWeapons[i];
        }
        return num;
    };
    __egretProto__.getRevivalCost = function (id) {
        var hero = this.data.heroes[id];
        return Math.floor(moment(hero.revivalTime).diff(moment(), 'h', true) * Conf.config.heroRevivalCost);
    };
    __egretProto__.revivalHero = function (id, cb) {
        var _this = this;
        var cost = this.getRevivalCost(id);
        if (!gm.dataManage.costMoney(cost, consts.kMoneyTypeDiamond)) {
            return false;
        }
        gm.gameUI.showLoadingLayer();
        gm.network.sendAction("revivalHero", { heroId: id }, function (data) {
            _this.data.heroes[id].revivalTime = 0;
            gm.postMessage(consts.kMessageHeroRevival, id);
            gm.gameUI.hideLoadingLayer();
            Util.invokeCallback(cb, data);
        }, function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    return HeroManage;
})(egret.EventDispatcher);
HeroManage.prototype.__class__ = "HeroManage";
