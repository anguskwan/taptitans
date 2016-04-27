/**
 *
 * @author
 *
 */
var MessagePayFailPanel = (function (_super) {
    __extends(MessagePayFailPanel, _super);
    function MessagePayFailPanel(rightCb, closeCb) {
        _super.call(this);
        this.closeCallFunction = closeCb;
        this.rightCallFunction = rightCb;
        this.skinName = skins.dialog.MessagePayFailPanelSkin;
    }
    var __egretProto__ = MessagePayFailPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
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
            if (this.closeCallFunction) {
                Util.invokeCallback(this.closeCallFunction, this);
            }
            else {
                gm.guiLayer.removeElement(this);
            }
        }
        if (target == this.rightBtn) {
            if (this.rightCallFunction) {
                Util.invokeCallback(this.rightCallFunction, this);
            }
            else {
                gm.guiLayer.removeElement(this);
            }
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MessagePayFailPanel;
})(egret.gui.SkinnableContainer);
MessagePayFailPanel.prototype.__class__ = "MessagePayFailPanel";
