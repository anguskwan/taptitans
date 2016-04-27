var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildBagGetItemRenderer = (function (_super) {
        __extends(GuildBagGetItemRenderer, _super);
        function GuildBagGetItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildBagGetItemRendererSkin;
        }
        var __egretProto__ = GuildBagGetItemRenderer.prototype;
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setIconImg();
            this.setDiamondText();
        };
        __egretProto__.setNameText = function () {
            var name = this.data.name || "英雄";
            this.nameLbl.text = name;
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.data.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setDiamondText = function () {
            this.diamondLbl.text = _.sprintf("%d", this.data.num);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildBagGetItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildBagGetItemRenderer = GuildBagGetItemRenderer;
    GuildBagGetItemRenderer.prototype.__class__ = "uiskins.GuildBagGetItemRenderer";
})(uiskins || (uiskins = {}));
