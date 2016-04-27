/**
 * Created by lhb on 15/10/4.
 */
var Master = (function (_super) {
    __extends(Master, _super);
    function Master() {
        _super.call(this);
        this.tapTimes = 0;
        this.attackIdx = 1;
        this.inSpecAction = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        gm.registerMessage(consts.kMessageTapDamage, this.onTapDamage, this);
    }
    var __egretProto__ = Master.prototype;
    __egretProto__.onAddToStage = function () {
        this.addArmature();
        gm.dataManage.master.revivalSkill();
    };
    __egretProto__.onTapDamage = function () {
        var self = this;
        if (this.inSpecAction) {
            return;
        }
        this.tapTimes++;
        var times = this.tapTimes;
        this.armature.play('attack' + this.attackIdx);
        function end() {
            if (times == self.tapTimes) {
                self.tapTimes = 0;
            }
            self.armature.removeEventListener(self.armature.ANIM_END, end, this);
        }
        this.armature.addEventListener(this.armature.ANIM_END, end, this);
        self.attackIdx = Util.modByLimit(self.attackIdx + 1, 5);
    };
    __egretProto__.getNames = function () {
        var ret = [];
        var meta = Conf.equipMeta;
        var masterEquips = gm.dataManage.data.masterEquips;
        for (var i = 1; i < 7; i++) {
            var id = masterEquips[i];
            var num;
            if (id) {
                num = meta[id].num;
            }
            else {
                num = 1;
            }
            var name = consts.kMasterEquipNames[i];
            ret.push("master_" + name + num);
        }
        return ret;
    };
    __egretProto__.refreshArmature = function () {
        Util.removeFromParent(this.armature);
        this.addArmature();
    };
    __egretProto__.addArmature = function () {
        var armature = this.armature = new tt.Armature('master_template');
        armature.defaultAnimation = 'idle';
        armature.play('idle', true);
        this.addChild(armature);
        armature.x = 240;
        armature.y = 410;
        //        var names = ["master_cloak1", "master_head1", "master_weapon1", "master_wing1",
        //            "master_light1", "master_body1"];
        var names = this.getNames();
        egret.setTimeout(function () {
            armature.loadChildArmatureGroup(names, function () {
                for (var i = 0; i < 6; i++) {
                    armature.addChildArmature(consts.kMasterEquipNames[i + 1], names[i], "idle");
                }
            }, true);
        }, this, 3000);
    };
    __egretProto__.showUpgradeEffect = function () {
        var mc = pool.createMovieClip("heroUpgrade");
        mc.play();
        mc.x = 240;
        mc.y = 410;
        this.addChild(mc);
    };
    __egretProto__.doom = function () {
        var self = this;
        this.inSpecAction = true;
        var armature = new tt.Armature('master_strike');
        armature.play('strike');
        armature.autoRemove = true;
        this.addChild(armature);
        armature.x = 240;
        armature.y = 410;
        function cb() {
            self.inSpecAction = false;
            gm.dataManage.reduceHP(gm.dataManage.monsterHP, true, true);
            armature.removeEventListener(self.armature.ANIM_END, cb, this);
        }
        armature.addEventListener(this.armature.ANIM_END, cb, this);
    };
    __egretProto__.heavenlyStrike = function (dmg) {
        var self = this;
        this.inSpecAction = true;
        var armature = new tt.Armature('master_strike');
        armature.play('strike');
        armature.autoRemove = true;
        this.addChild(armature);
        armature.x = 240;
        armature.y = 410;
        function cb() {
            self.inSpecAction = false;
            gm.dataManage.reduceHP(dmg, true, false, 1, true);
            gm.gameScene.onBossHit();
            armature.removeEventListener(self.armature.ANIM_END, cb, this);
        }
        armature.addEventListener(this.armature.ANIM_END, cb, this);
    };
    __egretProto__.shadowClone = function () {
        var armature = this.shadowArm = new tt.Armature('master_skill');
        armature.play('skill2');
        armature.defaultAnimation = 'skill2-cycle';
        this.addChild(armature);
        armature.x = 240;
        armature.y = 410;
    };
    __egretProto__.stopShadowArm = function () {
        Util.removeFromParent(this.shadowArm);
    };
    return Master;
})(egret.DisplayObjectContainer);
Master.prototype.__class__ = "Master";
