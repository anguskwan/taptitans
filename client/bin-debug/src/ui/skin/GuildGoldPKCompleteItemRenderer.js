var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldPKCompleteItemRenderer = (function (_super) {
        __extends(GuildGoldPKCompleteItemRenderer, _super);
        function GuildGoldPKCompleteItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildGoldPKCompleteItemRendererSkin;
        }
        var __egretProto__ = GuildGoldPKCompleteItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setTitleImg(this.data);
            this.setExpText(this.data);
        };
        __egretProto__.setExpText = function (data) {
            var exp = data.exp;
            this.expLbl.text = "" + exp;
        };
        __egretProto__.setTitleImg = function (data) {
            this.titleImg.source = data.isWin ? "pk_complete_victory" : "pk_complete_lose";
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildGoldPKCompleteItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildGoldPKCompleteItemRenderer = GuildGoldPKCompleteItemRenderer;
    GuildGoldPKCompleteItemRenderer.prototype.__class__ = "uiskins.GuildGoldPKCompleteItemRenderer";
})(uiskins || (uiskins = {}));
