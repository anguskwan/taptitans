/**
 *
 * @author
 *
 */
var BottomShowLayer = (function (_super) {
    __extends(BottomShowLayer, _super);
    function BottomShowLayer() {
        _super.call(this);
        this.timeoutTips = -1;
        this.intervalEntry = -2;
        this.intervalEntryTimeout = -3;
        this.tapCount = 0;
        this.isTapTouch = false;
        this.skinName = skins.mod.BottomShowLayerSkin;
    }
    var __egretProto__ = BottomShowLayer.prototype;
    __egretProto__.onRegister = function () {
        gm.registerMessage(consts.kMessageUpdateEquipValues, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageLevelUp, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageAddWeapon, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageUpgradeArtifact, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageBuyNewArtifact, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageDelArtifact, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageTapDamage, this.onTapDamage, this);
        gm.registerMessage(consts.kMessagePrestige, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageMasterSkillTypeBerserkerRage, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageRefreshFightLabelTIps, this.refreshLabelTips, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.refreshUserInfoLabels, this);
    };
    __egretProto__.refreshAllDamageLabel = function () {
        this.tapDamage.text = Util.formatNumber(gm.dataManage.master.updateTapDamage());
        this.heroDps.text = Util.formatNumber(gm.dataManage.heroes.getAllHeroDPS());
        this.onTapDamageTimer();
    };
    __egretProto__.refreshUserInfoLabels = function () {
        this.curDiamond.text = gm.dataManage.data.diamond;
        this.curCrystal.text = gm.dataManage.data.crystal;
        this.curRelic.text = Util.formatNumber(gm.dataManage.data.relic);
    };
    __egretProto__.onTapDamage = function (event) {
        this.isTapTouch = true;
        this.tapCount += event.data;
        this.currDps.text = Util.formatNumber(this.tapCount + gm.dataManage.heroes.heroDpsCache);
    };
    /**
    所有子项和皮肤中的组件都已经创建完毕并完成测量，可以使用
            
    All the components in the children and skin have been
    created and measured, you can use them now.
    */
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onRegister();
        this.refreshAllDamageLabel();
        this.refreshUserInfoLabels();
        this.currDps.text = Util.formatNumber(gm.dataManage.heroes.heroDpsCache);
        //time
        var time = new egret.Timer(1000);
        time.addEventListener(egret.TimerEvent.TIMER, this.onTapDamageTimer, this);
        time.start();
        this.visible = true;
        //提示框
        this.refreshLabelTips();
    };
    __egretProto__.onTapDamageTimer = function () {
        if (this.tapCount < 1) {
            this.isTapTouch = false;
        }
        if (this.isTapTouch) {
            this.tapCount /= 2;
            this.currDps.text = Util.formatNumber(Math.floor(this.tapCount) + gm.dataManage.heroes.heroDpsCache);
        }
    };
    __egretProto__.refreshLabelTips = function () {
        var _this = this;
        this.groupTipsLabel.visible = false;
        var remainTime = gm.dataManage.data.remainAttMulTime;
        if (remainTime == 0) {
            return;
        }
        if (this.timeoutTips != -1) {
            egret.clearTimeout(this.timeoutTips);
            egret.clearInterval(this.intervalEntry);
            egret.clearTimeout(this.intervalEntryTimeout);
            this.timeoutTips = -1;
        }
        this.groupTipsLabel.visible = true;
        this.timeoutTips = egret.setTimeout(function () {
            this.groupTipsLabel.visible = false;
        }.bind(this), this, remainTime);
        //label
        this.intervalEntry = egret.setInterval(function () {
            gm.dataManage.data.remainAttMulTime = gm.dataManage.data.remainAttMulTime - 1000;
            var secNum = Math.floor(gm.dataManage.data.remainAttMulTime / 1000);
            var remainTimesStr = Util.formatTime(secNum, true);
            this.lbl_remainTime.text = remainTimesStr;
        }, this, 1000);
        this.intervalEntryTimeout = egret.setTimeout(function () {
            _this.groupTipsLabel.visible = false;
            gm.dataManage.data.remainAttMulTime = 0;
            egret.clearInterval(_this.intervalEntry);
        }, this, remainTime);
    };
    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
            
            
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return BottomShowLayer;
})(egret.gui.SkinnableComponent);
BottomShowLayer.prototype.__class__ = "BottomShowLayer";
