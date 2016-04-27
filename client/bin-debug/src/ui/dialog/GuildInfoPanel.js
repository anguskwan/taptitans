/**
 *
 * @author
 *
 */
var GuildInfoPanel = (function (_super) {
    __extends(GuildInfoPanel, _super);
    function GuildInfoPanel() {
        _super.call(this);
        this.skinName = skins.dialog.GuildInfoPanelSkin;
    }
    var __egretProto__ = GuildInfoPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    return GuildInfoPanel;
})(egret.gui.SkinnableContainer);
GuildInfoPanel.prototype.__class__ = "GuildInfoPanel";
