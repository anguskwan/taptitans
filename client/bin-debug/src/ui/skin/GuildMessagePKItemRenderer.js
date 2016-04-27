var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMessagePKItemRenderer = (function (_super) {
        __extends(GuildMessagePKItemRenderer, _super);
        function GuildMessagePKItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMessagePKItemRendererSkin;
        }
        var __egretProto__ = GuildMessagePKItemRenderer.prototype;
        __egretProto__.isGuildWin = function () {
            return this.data.isWin;
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setTitleText();
            this.setIconImg();
            this.setTimeText();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            //this.data["index"] = this.itemIndex;
            var ly = new GuildMessagePKInfoLayer(this.data);
            gm.guiLayer.addElement(ly);
        };
        __egretProto__.setIconImg = function () {
            var source;
            if (this.isGuildWin() == 1) {
                source = "guild_message_victory";
            }
            if (this.isGuildWin() == 0) {
                source = "guild_message_draw";
            }
            if (this.isGuildWin() == -1) {
                source = "guild_message_lose";
            }
            this.iconImg.source = source;
        };
        __egretProto__.setTitleText = function () {
            var text;
            if (this.isGuildWin() == 1) {
                text = "捷报！你所在的公会胜利了";
            }
            if (this.isGuildWin() == 0) {
                text = "平局！本次比赛你们势均力敌";
            }
            if (this.isGuildWin() == -1) {
                text = "战败！你所在的公会失败了";
            }
            this.titleLbl.text = text;
        };
        __egretProto__.setTimeText = function () {
            this.timeLbl.text = _.sprintf("战争时间：%s", moment(this.data.time).format("YYYY年MM月DD日"));
        };
        return GuildMessagePKItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMessagePKItemRenderer = GuildMessagePKItemRenderer;
    GuildMessagePKItemRenderer.prototype.__class__ = "uiskins.GuildMessagePKItemRenderer";
})(uiskins || (uiskins = {}));
