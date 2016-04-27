var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldItemRenderer = (function (_super) {
        __extends(GuildGoldItemRenderer, _super);
        function GuildGoldItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildGoldItemRendererSkin;
        }
        var __egretProto__ = GuildGoldItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setRankImg();
            this.setIconImg();
            this.setAttText();
            this.setGuildNameText();
            this.setScoreText();
        };
        __egretProto__.setAttText = function () {
            var battlePoint = this.data.value.battlePoint;
            if (isNaN(parseInt(battlePoint))) {
                battlePoint = parseInt(battlePoint);
            }
            this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
        };
        __egretProto__.setNameText = function () {
            var baseName = this.data.value.name || "英雄";
            var name = _.truncate(baseName, 4);
            this.nameLbl.text = name;
        };
        __egretProto__.setRankImg = function () {
            var rank = this.data.value.rank + 1;
            if (rank <= 3) {
                this.numLbl.visible = false;
                this.numImg.visible = true;
                this.numImg.source = "rank_num" + rank;
            }
            else {
                this.numLbl.visible = true;
                this.numLbl.text = rank + "";
                this.numImg.visible = false;
            }
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.data.value.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setGuildNameText = function () {
            var baseName = this.data.value.guildName || "公会名称";
            var name = _.truncate(baseName, 4);
            var text = _.sprintf("<font color=0xa6600e>公会：</font><font color=0xffffff>%s</font>", name);
            Util.setStyleText(this.guildNameLbl, text);
        };
        __egretProto__.setScoreText = function () {
            var score = this.data.value.score || 0;
            var text = _.sprintf("<font color=0xa6600e>积分：</font><font color=0xfdc812>%d</font>", parseInt(score));
            Util.setStyleText(this.scoreLbl, text);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildGoldItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildGoldItemRenderer = GuildGoldItemRenderer;
    GuildGoldItemRenderer.prototype.__class__ = "uiskins.GuildGoldItemRenderer";
})(uiskins || (uiskins = {}));
