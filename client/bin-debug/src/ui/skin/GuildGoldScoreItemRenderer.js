var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldScoreItemRenderer = (function (_super) {
        __extends(GuildGoldScoreItemRenderer, _super);
        function GuildGoldScoreItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildGoldScoreItemRendererSkin;
        }
        var __egretProto__ = GuildGoldScoreItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setIconImg();
            this.setScoreText();
            this.setRank();
            this.setNameText();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.name || "公会";
        };
        __egretProto__.setIconImg = function () {
            var name = this.data.presidentName || "英雄会长";
            var data = {
                iconSource: this.data.icon || "guild_badge1",
                name: name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        };
        __egretProto__.setScoreText = function () {
            var score = this.data.score || 0;
            var text = _.sprintf("<font color=0xa6600e>积分：</font><font color=0xfdc812>%d</font>", parseInt(score));
            Util.setStyleText(this.scoreLbl, text);
        };
        __egretProto__.setRank = function () {
            var rank = this.data.rank + 1;
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
        return GuildGoldScoreItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildGoldScoreItemRenderer = GuildGoldScoreItemRenderer;
    GuildGoldScoreItemRenderer.prototype.__class__ = "uiskins.GuildGoldScoreItemRenderer";
})(uiskins || (uiskins = {}));
