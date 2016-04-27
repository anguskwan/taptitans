var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMainRedEnvelopeItemRenderer = (function (_super) {
        __extends(GuildMainRedEnvelopeItemRenderer, _super);
        function GuildMainRedEnvelopeItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMainRedEnvelopeItemRendererSkin;
        }
        var __egretProto__ = GuildMainRedEnvelopeItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.onTouchBtnClick = function (event) {
            //Util.invokeCallback(this.data.delFunction);
            if (event.target == this.infoBtn) {
                var ly = new GuildBagInfoPanel();
                gm.guiLayer.addElement(ly);
            }
            else {
                this.addGuildBagLayer();
            }
        };
        __egretProto__.addGuildBagLayer = function () {
            gm.guiLayer.addElement(new LoadingResLayer("guildbagres", function () {
                gm.guiLayer.addElement(new GuildBagLayer());
            }));
        };
        return GuildMainRedEnvelopeItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMainRedEnvelopeItemRenderer = GuildMainRedEnvelopeItemRenderer;
    GuildMainRedEnvelopeItemRenderer.prototype.__class__ = "uiskins.GuildMainRedEnvelopeItemRenderer";
})(uiskins || (uiskins = {}));
