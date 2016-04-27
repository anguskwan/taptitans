/**
 *
 * @author
 *
 */
var GuildSetAttPanel = (function (_super) {
    __extends(GuildSetAttPanel, _super);
    function GuildSetAttPanel(cb) {
        _super.call(this);
        this._text = 0;
        this._cb = cb;
        this.skinName = skins.dialog.GuildSetAttPanelSkin;
    }
    var __egretProto__ = GuildSetAttPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setTextInput();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rightBtn) {
            this.setWriteTextInput();
        }
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.setTextInput = function () {
        this.textInput.text = "0";
    };
    __egretProto__.setWriteTextInput = function () {
        var text = this._text + "";
        if (this.textInput.text != text) {
            if (this.isRegExpCode(this.textInput.text)) {
                Util.invokeCallback(this._cb, parseInt(this.textInput.text));
                gm.guiLayer.removeElement(this);
            }
        }
        else {
            Util.invokeCallback(this._cb, parseInt(this.textInput.text));
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.isRegExpCode = function (str) {
        var re = new RegExp("[0-9]*[1-9][0-9]*");
        return (str.search(re) != -1);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildSetAttPanel;
})(egret.gui.SkinnableContainer);
GuildSetAttPanel.prototype.__class__ = "GuildSetAttPanel";
