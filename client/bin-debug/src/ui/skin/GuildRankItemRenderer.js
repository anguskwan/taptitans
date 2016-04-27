var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildRankItemRenderer = (function (_super) {
        __extends(GuildRankItemRenderer, _super);
        function GuildRankItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildRankItemRendererSkin;
        }
        var __egretProto__ = GuildRankItemRenderer.prototype;
        __egretProto__.getMaxMember = function () {
            var members = this.data.level - 1;
            return 10 + members;
        };
        __egretProto__.isFull = function () {
            return this.data.memberCount >= this.getMaxMember();
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setIconImg();
            this.setMemberText();
            this.setAttText();
            this.setRank();
            this.setNameText();
            this.setLevelText();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.name;
        };
        __egretProto__.setIconImg = function () {
            var name = this.data.presidentName || "英雄会长";
            var data = {
                iconSource: this.data.icon,
                name: name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        };
        __egretProto__.setMemberText = function () {
            this.memberLbl.text = _.sprintf("%d/%d", this.data.memberCount, this.getMaxMember());
            if (this.isFull()) {
                this.memberLbl.textColor = 0xF34627;
            }
            else {
                this.memberLbl.textColor = 0x25ff3a;
            }
        };
        __egretProto__.setAttText = function () {
            this.attLbl.text = Util.formatNumber(this.data.score);
        };
        __egretProto__.setLevelText = function () {
            var level = this.data.level || 1;
            this.lvLbl.text = _.sprintf("Lv.%d", level);
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
        return GuildRankItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildRankItemRenderer = GuildRankItemRenderer;
    GuildRankItemRenderer.prototype.__class__ = "uiskins.GuildRankItemRenderer";
})(uiskins || (uiskins = {}));
