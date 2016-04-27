var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildShopGroup = (function (_super) {
        __extends(GuildShopGroup, _super);
        function GuildShopGroup() {
            _super.call(this);
            this.skinName = skins.components.GuildShopGroupSkin;
        }
        var __egretProto__ = GuildShopGroup.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //gm.registerMessage(consts.kMessageMoneyUpdate, this.onMoneyUpdate, this);
            this._guildShopItemRenderer = new egret.gui.ClassFactory(uiskins.GuildShopItemRenderer);
            this.shopData = [];
            this.initShopList();
            this.onMoneyUpdate();
        };
        __egretProto__.onMoneyUpdate = function () {
            this.coinLbl.text = gm.dataManage.data.crystal + "";
        };
        __egretProto__.initShopList = function () {
            var data;
            for (var i = 1; i <= 5; i++) {
                data = {
                    id: i,
                    base: {
                        touchBtnDisabledTimeoutIndex: -1,
                        touchBtnDisabledTimeout: 0,
                        touchBtnDisabled: true
                    },
                    updateFunction: function () {
                        this.onMoneyUpdate();
                    }.bind(this)
                };
                this.shopData.push(data);
            }
            var collection = this.shopCollection = new egret.gui.ArrayCollection(this.shopData);
            this.shopList.dataProvider = collection;
            this.shopList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
        };
        __egretProto__.getItemRender = function (event) {
            return this._guildShopItemRenderer;
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildShopGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildShopGroup = GuildShopGroup;
    GuildShopGroup.prototype.__class__ = "uiskins.GuildShopGroup";
})(uiskins || (uiskins = {}));
