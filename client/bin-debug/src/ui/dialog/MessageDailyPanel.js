/**
 *
 * @author
 *
 */
var MessageDailyPanel = (function (_super) {
    __extends(MessageDailyPanel, _super);
    function MessageDailyPanel(iconSource, num) {
        _super.call(this);
        this.iconSource = iconSource;
        this.num = num;
        this.skinName = skins.dialog.MessageDailyPanelSkin;
    }
    var __egretProto__ = MessageDailyPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.iconImg.source = this.iconSource;
        this.numLbl.text = "x" + this.num;
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
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MessageDailyPanel;
})(egret.gui.SkinnableContainer);
MessageDailyPanel.prototype.__class__ = "MessageDailyPanel";
