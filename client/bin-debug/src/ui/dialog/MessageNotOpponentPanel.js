/**
 *
 * @author
 *
 */
var MessageNotOpponentPanel = (function (_super) {
    __extends(MessageNotOpponentPanel, _super);
    function MessageNotOpponentPanel() {
        _super.call(this);
        this.skinName = skins.dialog.MessageNotOpponentPanelSkin;
    }
    var __egretProto__ = MessageNotOpponentPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
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
    return MessageNotOpponentPanel;
})(egret.gui.SkinnableContainer);
MessageNotOpponentPanel.prototype.__class__ = "MessageNotOpponentPanel";
