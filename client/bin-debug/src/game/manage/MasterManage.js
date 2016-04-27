/**
 * Created by lhb on 15/9/15.
 */
var MasterManage = (function (_super) {
    __extends(MasterManage, _super);
    function MasterManage(data) {
        _super.call(this);
        this.isShadowCloneActive = false;
        this.intervalEntry = -1;
        this.timeoutEntry = -1;
        this.tapDmg = 0;
        this.data = data;
        this.data.masterBuffs = [];
        this.initMasterSkills();
        this.tryUnlockSkill();
    }
    var __egretProto__ = MasterManage.prototype;
    __egretProto__.initMasterSkills = function () {
        if (!_.isEmpty(this.data.masterSkills)) {
            return;
        }
        _.each(Conf.masterSkill, function (v, id) {
            this.data.masterSkills[id] = {
                level: 0,
                lastTimeUse: 0
            };
        }.bind(this));
    };
    __egretProto__.reset = function () {
        this.data.masterBuffs = [];
        this.initMasterSkills();
    };
    __egretProto__.updateTapDamage = function () {
        this.tapDmg = formula.tapDamage(this.data);
        return this.tapDmg;
    };
    __egretProto__.getTapDamage = function () {
        var isBoss = gm.dataManage.isBossMonster();
        var heroBuffs = this.data.heroBuffs;
        var toBoss = isBoss ? heroBuffs[consts.kHeroSkillTypeDamageToBoss] : 0;
        return this.tapDmg * (1 + toBoss);
    };
    __egretProto__.getNextLevelDMG = function () {
        return formula.tapDamage(this.data, this.data.masterLevel + 1) - this.tapDmg;
    };
    __egretProto__.getUpgradePrice = function (num) {
        num = num || 1;
        return formula.masterUpgradeCost(this.data.masterLevel, num);
    };
    __egretProto__.autoUpgrade = function () {
        if (this.data.masterLevel < 600) {
            this.levelUp(1);
        }
    };
    __egretProto__.levelUp = function (num) {
        var price = this.getUpgradePrice(num);
        //var limit = formula.masterUpgradesLimit(this.data); //formula.masterUpgradesLimit == 0; ? 错误?
        //num = Math.min(num, limit);
        if (!gm.dataManage.costMoney(price, "gold")) {
            return false;
        }
        this.data.masterLevel += num;
        this.tryUnlockSkill();
        gm.network.sendAction("masterUpgrade", { upgrades: num });
        gm.gameScene.master.showUpgradeEffect();
        gm.postMessage(consts.kMessageLevelUp);
        gm.dataManage.incDailyTaskData("masterUpgrade", num);
    };
    __egretProto__.isUnlockSkill = function (id) {
        return this.data.masterSkills[id].unlock;
    };
    __egretProto__.tryUnlockSkill = function () {
        _.each(Conf.masterSkill, function (meta, id) {
            this.data.masterSkills[id].unlock = (this.data.masterLevel >= meta["unlock"]);
            //if (!self.data.masterSkills[id] && self.data.masterLevel >= meta["unlock"]) {
            //self.data.masterSkills[id] = {
            //    level:0,
            //    lastTimeUse:0
            //};
            //gm.postMessage(consts.kMessageNewSkillUnlock);
            //}
        }.bind(this));
    };
    __egretProto__.getMasterInfo = function () {
        return {
            level: this.data.masterLevel,
            dmg: this.getTapDamage(),
            cost: this.getUpgradePrice(),
            addDmg: this.getNextLevelDMG()
        };
    };
    __egretProto__.getSkillInfo = function (sid) {
        var meta = Conf.masterSkill[sid];
        if (!meta || sid == consts.kMasterSkillTypePrestige) {
            return;
        }
        return {
            name: meta.name,
            level: this.data.masterSkills[sid].level,
            cost: formula.masterSkillUpgradeCost(this.data, sid),
            value: formula.masterSkillValue(this.data, sid),
            nextValue: meta.upgrade,
            duration: formula.masterSkillDuration(this.data, sid),
            cd: formula.masterSkillCoolDown(this.data, sid)
        };
    };
    __egretProto__.getSkillPast = function (sid) {
        var now = new Date();
        var skill = this.data.masterSkills[sid];
        var cd = formula.masterSkillCoolDown(this.data, sid);
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < cd) {
            return past;
        }
        else {
            return 0;
        }
    };
    __egretProto__.getSkillDuration = function (sid) {
        var now = new Date();
        var skill = this.data.masterSkills[sid];
        var duration = formula.masterSkillDuration(this.data, sid);
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < duration) {
            return past;
        }
        else {
            return 0;
        }
    };
    __egretProto__.useSkill = function (sid) {
        var _this = this;
        if (sid == consts.kMasterSkillTypePrestige) {
            return;
        }
        var skill = this.data.masterSkills[sid];
        var cd = formula.masterSkillCoolDown(this.data, sid);
        var now = new Date();
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < cd) {
            return false;
        }
        gm.network.sendAction("useSkill", { skillId: sid }, function () {
            skill.lastTimeUse = now;
            _this.activeSkill(sid);
            gm.postMessage(consts.kMessageMasterActiveSkill, sid);
            if (sid == consts.kMasterSkillTypeHeavenlyStrike) {
                gm.dataManage.incAchievementValue(12);
            }
            if (sid == consts.kMasterSkillTypeCriticalStrike) {
                gm.dataManage.incAchievementValue(13);
            }
            gm.dataManage.incDailyTaskData("masterSkill");
        });
    };
    __egretProto__.revivalSkill = function () {
        var _this = this;
        gm.network.sendAction("getServerTime", {}, function (time) {
            var skills = _this.data.masterSkills;
            _.each(skills, function (s) {
                if (s) {
                    var id = s['id'];
                    var duration = formula.masterSkillDuration(_this.data, id);
                    var past = moment(time).diff(moment(s['lastTimeUse']), 's');
                    if (past < duration) {
                        _this.activeSkill(id, duration - past);
                    }
                }
            });
        });
    };
    __egretProto__.activeSkill = function (sid, d) {
        var value = formula.masterSkillValue(this.data, sid);
        var duration = d || formula.masterSkillDuration(this.data, sid);
        var dmg = this.getTapDamage();
        switch (sid) {
            case consts.kMasterSkillTypeHeavenlyStrike:
                dmg *= value;
                gm.gameScene.master.heavenlyStrike(dmg);
                break;
            case consts.kMasterSkillTypeShadowClone:
                var rate = Math.max(1 / value, 0.1);
                if (this.isShadowCloneActive) {
                    egret.clearInterval(this.intervalEntry);
                    egret.clearTimeout(this.timeoutEntry);
                }
                else {
                    gm.gameScene.master.shadowClone();
                    this.isShadowCloneActive = true;
                }
                this.shadowCloneSkillHelper(rate, value, duration);
                break;
            default:
                this.data.masterBuffs[sid] = true;
                if (sid == consts.kMasterSkillTypeBerserkerRage) {
                    gm.postMessage(consts.kMessageMasterSkillTypeBerserkerRage);
                }
                egret.setTimeout(function () {
                    if (sid == consts.kMasterSkillTypeHandOfMidas) {
                        gm.dataManage.finishHandOfMidas();
                    }
                    this.data.masterBuffs[sid] = false;
                    if (sid == consts.kMasterSkillTypeBerserkerRage) {
                        gm.postMessage(consts.kMessageMasterSkillTypeBerserkerRage);
                    }
                }, this, duration * 1000);
                break;
        }
    };
    __egretProto__.shadowCloneSkillHelper = function (rate, value, duration) {
        this.intervalEntry = egret.setInterval(function () {
            var dmg = this.getTapDamage();
            gm.dataManage.reduceHP(dmg * rate * value, true, false, 1, true);
            gm.postMessage(consts.kMessageTapDamage, dmg * rate * value);
        }, this, rate * 1000);
        this.timeoutEntry = egret.setTimeout(function () {
            gm.gameScene.master.stopShadowArm();
            egret.clearInterval(this.intervalEntry);
            this.isShadowCloneActive = false;
        }, this, duration * 1000);
    };
    __egretProto__.upgradeSkill = function (id) {
        var skill = this.data.masterSkills[id];
        var cost = formula.masterSkillUpgradeCost(this.data, id);
        if (!gm.dataManage.costMoney(cost, "gold")) {
            return false;
        }
        skill.level++;
        gm.network.sendAction("masterUpgradeSkill", { skillId: id });
        gm.gameScene.master.showUpgradeEffect();
        gm.postMessage(consts.kMessageMasterUpgradeSkill); // ? postMessage skillId id
    };
    return MasterManage;
})(egret.EventDispatcher);
MasterManage.prototype.__class__ = "MasterManage";
