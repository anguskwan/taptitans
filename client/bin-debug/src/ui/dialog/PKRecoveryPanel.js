/**
 *
 * @author
 *
 */
var PKRecoveryPanel = (function (_super) {
    __extends(PKRecoveryPanel, _super);
    function PKRecoveryPanel() {
        _super.call(this);
        this.skinName = skins.dialog.PKRecoveryPanelSkin;
    }
    var __egretProto__ = PKRecoveryPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTimer, this);
        this._timer.start();
        this.onChangeTimer();
    };
    __egretProto__.onChangeTimer = function () {
        var maxMorale = gm.dataManage.maxMorale();
        var currTime = new Date();
        var lastTime = gm.dataManage.data.willRemainTime;
        var currRemain = Math.floor((lastTime - currTime.getTime()) / 1000);
        var lastMorale = maxMorale - gm.dataManage.data.morale - 1;
        var currShow = lastMorale * Conf.config["minutesPerMorale"] * 60 + currRemain;
        this.timeLbl.text = Util.formatTime(currShow, true);
        this.diamondLbl.text = (maxMorale - gm.dataManage.data.morale) * Conf.config.costPerMorale + "";
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            this._timer.stop();
            gm.guiLayer.removeElement(this);
        }
        if (target == this.recoveryBtn) {
            var maxMorale = gm.dataManage.maxMorale();
            var cost = (maxMorale - gm.dataManage.data.morale) * Conf.config.costPerMorale;
            if (cost == 0) {
                return;
            }
            if (!gm.dataManage.costMoney(cost, consts.kMoneyTypeDiamond)) {
                return;
            }
            gm.gameUI.showLoadingLayer();
            tt.BattleManage.buyMorale(function () {
                gm.postMessage(consts.kMessageBuyMorale);
                this._timer.stop();
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
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
    return PKRecoveryPanel;
})(egret.gui.SkinnableComponent);
PKRecoveryPanel.prototype.__class__ = "PKRecoveryPanel";
