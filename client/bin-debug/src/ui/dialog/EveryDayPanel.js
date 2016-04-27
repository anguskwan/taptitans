/**
 *
 * @author
 *
 */
var EveryDayPanel = (function (_super) {
    __extends(EveryDayPanel, _super);
    function EveryDayPanel(data) {
        _super.call(this);
        this.value = data;
        this.skinName = skins.dialog.EveryDayPanelSkin;
    }
    var __egretProto__ = EveryDayPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onEveryDayList();
        this.setRewardBtn();
        this.setTitleImg();
    };
    __egretProto__.onEveryDayList = function () {
        var data;
        for (var i = 1; i <= 7; i++) {
            var index = i - 1;
            data = {
                day: i,
                info: this.value.info[index],
                currDay: this.value.day
            };
            this["selectItem" + i].dataItem = data;
            this["selectItem" + i].changeDataItem();
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.rewardBtn) {
            gm.guiLayer.removeElement(this);
            if (!this.value.dailyLoginReward) {
                var ly = new MessageGetRewardPanel("领取奖励", [{ type: this.value.type, num: this.value.num }]);
                gm.guiLayer.addElement(ly);
            }
        }
    };
    __egretProto__.setRewardBtn = function () {
        if (this.value.dailyLoginReward) {
            this.rewardLbl.text = "确定";
        }
        else {
            this.rewardLbl.text = "领取";
        }
    };
    __egretProto__.setTitleImg = function () {
        var source;
        if (Util.isEveryDayDouble()) {
            source = "dialog_everyday_double_title";
        }
        else {
            source = "dialog_everyday_title";
        }
        this.titleImg.source = source;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return EveryDayPanel;
})(egret.gui.SkinnableComponent);
EveryDayPanel.prototype.__class__ = "EveryDayPanel";
