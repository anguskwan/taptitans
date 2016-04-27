var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildHeroItem = (function (_super) {
        __extends(GuildHeroItem, _super);
        function GuildHeroItem() {
            _super.call(this);
            this.skinName = skins.components.GuildHeroItemSkin;
        }
        var __egretProto__ = GuildHeroItem.prototype;
        __egretProto__.getHeroId = function () {
            return this.value.index + 1;
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.updateItem = function (value, dpsValue) {
            this.value = value;
            this.dpsValue = dpsValue;
            this.setNameText();
            this.setIconImg();
            this.setDpsText();
            this.setDeadRect();
            this.setVictoryImg();
            this.setEquip();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = Conf.hero[this.getHeroId()].name;
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "hero" + this.getHeroId();
        };
        __egretProto__.setDpsText = function () {
            if (this.dpsValue) {
                this.dpsLbl.text = Util.formatNumber(this.dpsValue.dps);
            }
            else {
                this.dpsLbl.text = Util.formatNumber(this.value.bp);
            }
        };
        __egretProto__.setEquip = function () {
            if (this.dpsValue) {
                if (this.dpsValue.nerf != 0) {
                    this.equipGroup.visible = true;
                    this.equipLbl.text = _.sprintf("-%.1f%%", this.dpsValue.nerf * 100);
                }
                else {
                    this.equipGroup.visible = false;
                }
            }
            else {
                this.equipGroup.visible = false;
            }
        };
        __egretProto__.setDeadRect = function () {
            this.deadRect.visible = this.value.isDead;
        };
        __egretProto__.setVictoryImg = function () {
            if (this.value.oppDead || this.value.isDead) {
                this.victoryImg.visible = false;
                this.tombstoneImg.visible = false;
            }
            else {
                if (this.value.isAtt) {
                    if (this.value.attDead == 0) {
                        this.victoryImg.visible = false;
                        this.tombstoneImg.visible = false;
                    }
                    if (this.value.attDead == 1) {
                        this.victoryImg.visible = true;
                        this.tombstoneImg.visible = false;
                    }
                    if (this.value.attDead == -1) {
                        this.victoryImg.visible = false;
                        this.tombstoneImg.visible = true;
                    }
                }
                else {
                    this.victoryImg.visible = false;
                    this.tombstoneImg.visible = false;
                }
            }
        };
        return GuildHeroItem;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildHeroItem = GuildHeroItem;
    GuildHeroItem.prototype.__class__ = "uiskins.GuildHeroItem";
})(uiskins || (uiskins = {}));
