var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildPlayerItem = (function (_super) {
        __extends(GuildPlayerItem, _super);
        function GuildPlayerItem() {
            _super.call(this);
            this.skinName = skins.components.GuildPlayerItemSkin;
        }
        var __egretProto__ = GuildPlayerItem.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.getAliveHeroes = function () {
            return _.count(this.value.warInfo.heroes, "1");
        };
        __egretProto__.isAttPlayer = function (aIndex) {
            return this.value.warInfo["attPlayer" + aIndex];
        };
        __egretProto__.updateItem = function (value) {
            this.value = value;
            this.setNameText();
            this.setIconImg();
            this.setAttText();
            this.setAliveHeroText();
            this.setIconAttImgPlayer1();
            this.setKillHeroTextPlayer1();
            this.setIconAttImgPlayer2();
            this.setKillHeroTextPlayer2();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.value.name || "英雄";
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.value.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setAttText = function () {
            this.attLbl.text = Util.formatNumber(this.value.battlePoint);
        };
        __egretProto__.setAliveHeroText = function () {
            this.aliveHeroLbl.text = this.getAliveHeroes() + "";
        };
        __egretProto__.setIconAttImgPlayer1 = function () {
            if (this.isAttPlayer(1)) {
                var player = this.value.warInfo["attPlayer1"];
                var avatar = player.avatar || "";
                if (avatar != "") {
                    Util.setIconImg(avatar, this.iconAttImg1, 96);
                }
                else {
                    this.iconAttImg1.source = "icon_default";
                }
            }
            else {
                this.iconAttImg1.source = "icon_default";
            }
        };
        __egretProto__.setKillHeroTextPlayer1 = function () {
            if (this.isAttPlayer(1)) {
                var count = this.value.warInfo.attacks[0]["count"];
                this.killHeroLbl1.text = "-" + count;
            }
            else {
                this.killHeroLbl1.text = "0";
            }
        };
        __egretProto__.setIconAttImgPlayer2 = function () {
            if (this.isAttPlayer(2)) {
                var player = this.value.warInfo["attPlayer2"];
                var avatar = player.avatar || "";
                if (avatar != "") {
                    Util.setIconImg(avatar, this.iconAttImg2, 96);
                }
                else {
                    this.iconAttImg2.source = "icon_default";
                }
            }
            else {
                this.iconAttImg2.source = "icon_default";
            }
        };
        __egretProto__.setKillHeroTextPlayer2 = function () {
            if (this.isAttPlayer(2)) {
                var count = this.value.warInfo.attacks[1]["count"];
                this.killHeroLbl2.text = "-" + count;
            }
            else {
                this.killHeroLbl2.text = "0";
            }
        };
        return GuildPlayerItem;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildPlayerItem = GuildPlayerItem;
    GuildPlayerItem.prototype.__class__ = "uiskins.GuildPlayerItem";
})(uiskins || (uiskins = {}));
