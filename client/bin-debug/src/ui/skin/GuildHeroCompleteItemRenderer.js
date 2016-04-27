var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildHeroCompleteItemRenderer = (function (_super) {
        __extends(GuildHeroCompleteItemRenderer, _super);
        function GuildHeroCompleteItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildHeroCompleteItemRendererSkin;
        }
        var __egretProto__ = GuildHeroCompleteItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.killNumLbl.text = this.data.killNum + "";
        };
        return GuildHeroCompleteItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildHeroCompleteItemRenderer = GuildHeroCompleteItemRenderer;
    GuildHeroCompleteItemRenderer.prototype.__class__ = "uiskins.GuildHeroCompleteItemRenderer";
})(uiskins || (uiskins = {}));
