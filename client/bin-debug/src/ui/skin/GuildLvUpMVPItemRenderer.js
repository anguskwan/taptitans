var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildLvUpMVPItemRenderer = (function (_super) {
        __extends(GuildLvUpMVPItemRenderer, _super);
        function GuildLvUpMVPItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildLvUpMVPItemRendererSkin;
        }
        var __egretProto__ = GuildLvUpMVPItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setContributionText();
            this.setNameText();
            this.setRank();
            this.setIconImg();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.name || "英雄";
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
        __egretProto__.setRank = function () {
            var rank = (this.itemIndex - 5) + 1;
            if (rank <= 3) {
                this.numImg.visible = true;
                this.numLbl.visible = false;
                this.numImg.source = "rank_num" + rank;
            }
            else {
                this.numImg.visible = false;
                this.numLbl.visible = true;
                this.numLbl.text = rank + "";
            }
        };
        __egretProto__.setContributionText = function () {
            this.contributionLbl.text = this.data.contribution + "";
        };
        return GuildLvUpMVPItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildLvUpMVPItemRenderer = GuildLvUpMVPItemRenderer;
    GuildLvUpMVPItemRenderer.prototype.__class__ = "uiskins.GuildLvUpMVPItemRenderer";
})(uiskins || (uiskins = {}));
