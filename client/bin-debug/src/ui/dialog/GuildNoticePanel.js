/**
 *
 * @author
 *
 */
var GuildNoticePanel = (function (_super) {
    __extends(GuildNoticePanel, _super);
    function GuildNoticePanel(text, cb) {
        _super.call(this);
        this._text = text;
        this._cb = cb;
        this.skinName = skins.dialog.GuildNoticePanelSkin;
    }
    var __egretProto__ = GuildNoticePanel.prototype;
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
        this.textInput.text = this._text;
    };
    __egretProto__.setWriteTextInput = function () {
        if (this.textInput.text != this._text) {
            gm.gameUI.showLoadingLayer();
            var id = gm.dataManage.data.guild;
            var text = this.textInput.text;
            tt.GuildManage.modifyNotice(id, text, function () {
                Util.invokeCallback(this._cb, text);
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        else {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildNoticePanel;
})(egret.gui.SkinnableContainer);
GuildNoticePanel.prototype.__class__ = "GuildNoticePanel";
