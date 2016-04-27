var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldLineItemRenderer = (function (_super) {
        __extends(GuildGoldLineItemRenderer, _super);
        function GuildGoldLineItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildGoldLineItemRendererSkin;
        }
        var __egretProto__ = GuildGoldLineItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildGoldLineItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildGoldLineItemRenderer = GuildGoldLineItemRenderer;
    GuildGoldLineItemRenderer.prototype.__class__ = "uiskins.GuildGoldLineItemRenderer";
})(uiskins || (uiskins = {}));
