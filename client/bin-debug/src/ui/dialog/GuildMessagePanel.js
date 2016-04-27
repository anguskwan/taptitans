/**
 *
 * @author
 *
 */
var GuildMessagePanel = (function (_super) {
    __extends(GuildMessagePanel, _super);
    function GuildMessagePanel(title, desc, rightFunction, cancelFunction) {
        _super.call(this);
        this.titleText = title;
        this.descText = desc;
        this.rightFunction = rightFunction;
        this.cancelFunction = cancelFunction;
        this.skinName = skins.dialog.GuildMessagePanelSkin;
    }
    var __egretProto__ = GuildMessagePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setTitleText();
        this.setDescText();
    };
    __egretProto__.setTitleText = function () {
        this.titleLbl.text = this.titleText;
    };
    __egretProto__.setDescText = function () {
        this.descLbl.text = this.descText;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rightBtn) {
            if (this.rightFunction) {
                Util.invokeCallback(this.rightFunction, this);
            }
            else {
                gm.guiLayer.removeElement(this);
            }
        }
        if (event.target == this.cancelBtn) {
            if (this.cancelFunction) {
                Util.invokeCallback(this.cancelFunction, this);
            }
            else {
                gm.guiLayer.removeElement(this);
            }
        }
    };
    return GuildMessagePanel;
})(egret.gui.SkinnableContainer);
GuildMessagePanel.prototype.__class__ = "GuildMessagePanel";
