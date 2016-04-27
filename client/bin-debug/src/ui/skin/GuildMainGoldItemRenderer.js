var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMainGoldItemRenderer = (function (_super) {
        __extends(GuildMainGoldItemRenderer, _super);
        function GuildMainGoldItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMainGoldItemRendererSkin;
        }
        var __egretProto__ = GuildMainGoldItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.infoBtn) {
                var ly = new GuildGoldRewardLayer();
                gm.guiLayer.addElement(ly);
            }
            else {
                this.showMainGoldLayer();
            }
        };
        __egretProto__.showMainGoldLayer = function () {
            gm.guiLayer.addElement(new LoadingResLayer("guildgoldres", function () {
                var ly = new GuildGoldSelectLayer();
                gm.guiLayer.addElement(ly);
            }));
        };
        return GuildMainGoldItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMainGoldItemRenderer = GuildMainGoldItemRenderer;
    GuildMainGoldItemRenderer.prototype.__class__ = "uiskins.GuildMainGoldItemRenderer";
})(uiskins || (uiskins = {}));
