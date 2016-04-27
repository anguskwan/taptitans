/**
 * Created by lhb on 15/9/15.
 */

class MasterManage extends egret.EventDispatcher {

    public data:any;
    private isShadowCloneActive:boolean = false;
    private intervalEntry:number = -1;
    private timeoutEntry:number = -1;

    public constructor(data) {
        super();
        this.data = data;
        this.data.masterBuffs = [];
        this.initMasterSkills();
        this.tryUnlockSkill();
    }

    initMasterSkills() {
        if (!_.isEmpty(this.data.masterSkills)) {
            return;
        }
        _.each(Conf.masterSkill, function (v, id) {
            this.data.masterSkills[id] = {
                level: 0,
                lastTimeUse: 0
            }
        }.bind(this));
    }

    reset() {
        this.data.masterBuffs = [];
        this.initMasterSkills();
    }

    public tapDmg = 0;

    updateTapDamage() {
        this.tapDmg = formula.tapDamage(this.data);
        return this.tapDmg;
    }

    public getTapDamage():number {
        var isBoss =gm.dataManage.isBossMonster();
        var heroBuffs = this.data.heroBuffs;
        var toBoss = isBoss ? heroBuffs[consts.kHeroSkillTypeDamageToBoss] : 0;
        return this.tapDmg * (1 + toBoss);
    }

    getNextLevelDMG() {
        return formula.tapDamage(this.data, this.data.masterLevel+1) - this.tapDmg;
    }

    getUpgradePrice(num?:any) {
        num = num || 1;
        return formula.masterUpgradeCost(this.data.masterLevel, num);
    }

    autoUpgrade() {
        if (this.data.masterLevel < 600) {
            this.levelUp(1);
        }
    }

    levelUp(num) {
        var price = this.getUpgradePrice(num);
        //var limit = formula.masterUpgradesLimit(this.data); //formula.masterUpgradesLimit == 0; ? 错误?
        //num = Math.min(num, limit);
        if (!gm.dataManage.costMoney(price, "gold")) {
            return false;
        }
        this.data.masterLevel += num;
        this.tryUnlockSkill();
        gm.network.sendAction("masterUpgrade", {upgrades:num});
        gm.gameScene.master.showUpgradeEffect();
        gm.postMessage(consts.kMessageLevelUp);

        gm.dataManage.incDailyTaskData("masterUpgrade", num);
    }

    isUnlockSkill(id){
        return this.data.masterSkills[id].unlock;
    }

    tryUnlockSkill() {
        _.each(Conf.masterSkill, function(meta, id) {
            this.data.masterSkills[id].unlock = (this.data.masterLevel >= meta["unlock"]);
            //if (!self.data.masterSkills[id] && self.data.masterLevel >= meta["unlock"]) {
                //self.data.masterSkills[id] = {
                //    level:0,
                //    lastTimeUse:0
                //};
                //gm.postMessage(consts.kMessageNewSkillUnlock);
            //}
        }.bind(this));
    }

    getMasterInfo() {
        return {
            level: this.data.masterLevel,
            dmg : this.getTapDamage(),
            cost : this.getUpgradePrice(),
            addDmg: this.getNextLevelDMG()
        }
    }

    getSkillInfo(sid) {
        var meta = Conf.masterSkill[sid];
        if (!meta || sid == consts.kMasterSkillTypePrestige) {return;}
        return {
            name: meta.name,
            level: this.data.masterSkills[sid].level,
            cost : formula.masterSkillUpgradeCost(this.data, sid),
            value : formula.masterSkillValue(this.data, sid),
            nextValue : meta.upgrade,
            duration : formula.masterSkillDuration(this.data,sid),
            cd : formula.masterSkillCoolDown(this.data, sid)
        }
    }

    getSkillPast(sid){
        var now = new Date();
        var skill = this.data.masterSkills[sid];
        var cd = formula.masterSkillCoolDown(this.data,sid);
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if(past < cd){
            return past;
        }
        else {
            return 0;
        }
    }

    getSkillDuration(sid){
        var now = new Date();
        var skill = this.data.masterSkills[sid];
        var duration = formula.masterSkillDuration(this.data,sid);
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if(past < duration){
            return past;
        }
        else {
            return 0;
        }
    }

    useSkill(sid) {
        if (sid == consts.kMasterSkillTypePrestige) {return;}
        var skill = this.data.masterSkills[sid];
        var cd = formula.masterSkillCoolDown(this.data, sid);
        var now = new Date();
        var cdTime = new Date(skill.lastTimeUse);
        var past = (now.getTime() - cdTime.getTime()) / 1000;
        if (past < cd) {
            return false;
        }
        gm.network.sendAction("useSkill", {skillId:sid}, ()=> {
            skill.lastTimeUse = now;
            this.activeSkill(sid);
            gm.postMessage(consts.kMessageMasterActiveSkill,sid);
            if (sid == consts.kMasterSkillTypeHeavenlyStrike) {
                gm.dataManage.incAchievementValue(12);
            }
            if (sid == consts.kMasterSkillTypeCriticalStrike) {
                gm.dataManage.incAchievementValue(13);
            }

            gm.dataManage.incDailyTaskData("masterSkill");
        });
    }

    revivalSkill() {
        gm.network.sendAction("getServerTime", {}, (time) => {
            var skills = this.data.masterSkills;
            _.each(skills, (s) => {
                if(s) {
                    var id = s['id'];
                    var duration = formula.masterSkillDuration(this.data,id);
                    var past = moment(time).diff(moment(s['lastTimeUse']), 's');
                    if (past < duration) {
                        this.activeSkill(id, duration - past);
                    }
                }
            });
        });
    }

    activeSkill(sid, d?) {
        var value = formula.masterSkillValue(this.data, sid);
        var duration = d || formula.masterSkillDuration(this.data,sid);
        var dmg = this.getTapDamage();
        switch (sid) {
            case consts.kMasterSkillTypeHeavenlyStrike:
                dmg *= value;
                gm.gameScene.master.heavenlyStrike(dmg);
                break;
            case consts.kMasterSkillTypeShadowClone:
                var rate = Math.max(1 / value, 0.1);
                if (this.isShadowCloneActive)
                {
                    egret.clearInterval(this.intervalEntry);
                    egret.clearTimeout(this.timeoutEntry);
                }
                else {
                    gm.gameScene.master.shadowClone();
                    this.isShadowCloneActive = true;
                }
                this.shadowCloneSkillHelper(rate, value, duration);
                break;
            default :
                this.data.masterBuffs[sid] = true;
                if (sid == consts.kMasterSkillTypeBerserkerRage) {
                    gm.postMessage(consts.kMessageMasterSkillTypeBerserkerRage);
                }
                egret.setTimeout(function() {
                    if (sid == consts.kMasterSkillTypeHandOfMidas) {
                        gm.dataManage.finishHandOfMidas();
                    }
                    this.data.masterBuffs[sid] = false;
                    if(sid == consts.kMasterSkillTypeBerserkerRage){
                        gm.postMessage(consts.kMessageMasterSkillTypeBerserkerRage);
                    }
                }, this, duration * 1000);
                break;
        }
    }

    private shadowCloneSkillHelper(rate:number, value:number, duration:number):void
    {
        this.intervalEntry = egret.setInterval(function() {
            var dmg = this.getTapDamage();
            gm.dataManage.reduceHP(dmg * rate * value, true, false, 1, true);
            gm.postMessage(consts.kMessageTapDamage, dmg * rate * value);
        }, this, rate * 1000);

        this.timeoutEntry = egret.setTimeout(function() {
            gm.gameScene.master.stopShadowArm();
            egret.clearInterval(this.intervalEntry);
            this.isShadowCloneActive = false;
        }, this, duration * 1000);
    }

    upgradeSkill(id) {
        var skill = this.data.masterSkills[id];
        var cost = formula.masterSkillUpgradeCost(this.data, id);
        if (!gm.dataManage.costMoney(cost, "gold")) {
            return false;
        }
        skill.level++;
        gm.network.sendAction("masterUpgradeSkill", {skillId:id});
        gm.gameScene.master.showUpgradeEffect();
        gm.postMessage(consts.kMessageMasterUpgradeSkill); // ? postMessage skillId id
    }
}
