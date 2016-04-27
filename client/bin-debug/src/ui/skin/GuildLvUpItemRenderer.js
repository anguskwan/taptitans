var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildLvUpItemRenderer = (function (_super) {
        __extends(GuildLvUpItemRenderer, _super);
        function GuildLvUpItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildLvUpItemRendererSkin;
        }
        var __egretProto__ = GuildLvUpItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            this.setIconImg();
            this.setNameText();
            this.setDescText();
            this.setLvText();
            this.setDiamondText();
            this.setProgress();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.lvUpBtn) {
                var limit = 5 + gm.dataManage.vipInfo().donate;
                var donate = gm.dataManage.data.dailyEvent.donate || 0;
                var gid = gm.dataManage.data.guild;
                var type = this.data.id;
                var diamond = gm.dataManage.guild.multiple * 50;
                if (donate >= limit) {
                    gm.postMessage(consts.kMessageShowToastLayer, "捐献次数已达上限");
                    return;
                }
                if (!gm.dataManage.costMoney(diamond, 'diamond')) {
                    return;
                }
                gm.gameUI.showLoadingLayer();
                gm.dataManage.donate(gid, type, diamond, function () {
                    this.setProgress();
                    this.setLvText();
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.initData = function () {
            var upgrades = _.clone(gm.dataManage.guild.upgrades);
            var id = this.data.id;
            if (!upgrades) {
                upgrades = {};
            }
            upgrades[id] = upgrades[id] || { exp: 0, level: 1 };
            if (consts.kGuildUpgradeTypeMember == id) {
                this.currUpgrades = _.clone(gm.dataManage.guild);
            }
            else {
                this.currUpgrades = upgrades[id];
            }
        };
        __egretProto__.setIconImg = function () {
            var icon = gm.gameUI.getGuildLvUpSource(this.data.id).icon;
            this.iconImg.source = icon;
        };
        __egretProto__.setNameText = function () {
            var text = gm.gameUI.getGuildLvUpSource(this.data.id).title;
            this.nameLbl.text = text;
        };
        __egretProto__.setDescText = function () {
            var base = gm.gameUI.getGuildLvUpSource(this.data.id).base;
            var baseType = gm.gameUI.getGuildLvUpSource(this.data.id).baseType;
            var text = gm.gameUI.getGuildLvUpSource(this.data.id).desc;
            var level = this.currUpgrades.level - 1;
            var value = baseType == 1 ? level : level * base;
            Util.setStyleText(this.descLbl, _.sprintf(text, value));
        };
        __egretProto__.setLvText = function () {
            var level = this.currUpgrades.level;
            this.lvLbl.text = _.sprintf("Lv%d", level);
        };
        __egretProto__.setDiamondText = function () {
            var diamond = gm.dataManage.guild.multiple * 50;
            this.diamondLbl.text = _.sprintf("x%d", diamond);
        };
        __egretProto__.setProgress = function () {
            var guild = this.currUpgrades;
            var meta = Conf.guildLevel[guild.level];
            if (meta && guild.exp <= meta.exp) {
                this.progress.maximum = meta.exp;
                this.progress.value = guild.exp;
            }
            else {
                meta = Conf.guildLevel[10];
                this.progress.maximum = meta.exp;
                this.progress.value = meta.exp;
            }
        };
        return GuildLvUpItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildLvUpItemRenderer = GuildLvUpItemRenderer;
    GuildLvUpItemRenderer.prototype.__class__ = "uiskins.GuildLvUpItemRenderer";
})(uiskins || (uiskins = {}));
