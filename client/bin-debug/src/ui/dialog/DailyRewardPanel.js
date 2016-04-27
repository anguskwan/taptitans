/**
 *
 * @author
 *
 */
var DailyRewardPanel = (function (_super) {
    __extends(DailyRewardPanel, _super);
    function DailyRewardPanel(data, close) {
        _super.call(this);
        this.value = data;
        this.closeCallFunction = close;
        this.skinName = skins.dialog.DailyRewardPanelSkin;
    }
    var __egretProto__ = DailyRewardPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.initUI();
    };
    __egretProto__.initUI = function () {
        for (var i = 1; i <= 5; i++) {
            if (i == this.value.day) {
                this["selectImg" + i].visible = true;
                this["selectOffImg" + i].visible = false;
            }
            else if (i < this.value.day) {
                this["selectImg" + i].visible = false;
                this["selectOffImg" + i].visible = false;
            }
            else {
                this["selectImg" + i].visible = false;
                this["selectOffImg" + i].visible = true;
            }
            this.setRewardNum(i);
        }
    };
    __egretProto__.setRewardNum = function (index) {
        var vipInfo = gm.dataManage.vipInfo();
        var num = 0;
        if (index < 5) {
            num = index * 15 * (1 + vipInfo.dailyBossDiamond);
            this["numLbl" + index].text = "X" + num;
        }
        else {
            num = 1 + vipInfo.dailyBossWeapon;
            this["numLbl" + index].text = num;
        }
    };
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this["selectGroup" + this.value.day]) {
            //console.log("selectGroup" + this.value.day);
            gm.guiLayer.removeElement(this);
            gm.dataManage.fightDailyBoss();
            if (this.closeCallFunction) {
                Util.invokeCallback(this.closeCallFunction);
            }
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return DailyRewardPanel;
})(egret.gui.SkinnableContainer);
DailyRewardPanel.prototype.__class__ = "DailyRewardPanel";
