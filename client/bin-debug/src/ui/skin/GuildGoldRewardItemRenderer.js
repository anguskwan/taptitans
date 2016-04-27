var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldRewardItemRenderer = (function (_super) {
        __extends(GuildGoldRewardItemRenderer, _super);
        function GuildGoldRewardItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildGoldRewardItemRendererSkin;
        }
        var __egretProto__ = GuildGoldRewardItemRenderer.prototype;
        __egretProto__.getGuildGoldMeta = function () {
            return Conf.guildGoldScore[this.data.id];
        };
        __egretProto__.getRankNumText = function () {
            var meta = this.getGuildGoldMeta();
            var text1 = "";
            var text2 = "";
            var rank1 = meta["rank"][0];
            var rank2 = meta["rank"][1];
            if (rank1) {
                text1 = "" + rank1;
            }
            if (rank2) {
                text2 = "-" + rank2;
            }
            return (text1 + text2);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setRankText();
            this.setFragmentText();
            this.setCrystalText();
        };
        __egretProto__.setRankText = function () {
            this.rankLbl.text = _.sprintf("第%s名", this.getRankNumText());
        };
        __egretProto__.setFragmentText = function () {
            var num = this.getGuildGoldMeta()["fragment"];
            this.fragmentLbl.text = "" + num;
        };
        __egretProto__.setCrystalText = function () {
            var num = this.getGuildGoldMeta()["crystal"];
            this.crystalLbl.text = "" + num;
        };
        return GuildGoldRewardItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildGoldRewardItemRenderer = GuildGoldRewardItemRenderer;
    GuildGoldRewardItemRenderer.prototype.__class__ = "uiskins.GuildGoldRewardItemRenderer";
})(uiskins || (uiskins = {}));
