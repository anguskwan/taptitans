var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ShopBuyLifeCardItemRenderer = (function (_super) {
        __extends(ShopBuyLifeCardItemRenderer, _super);
        function ShopBuyLifeCardItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.ShopBuyLifeCardItemRendererSkin;
        }
        var __egretProto__ = ShopBuyLifeCardItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnText();
            this.setBtnSource();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem && !gm.dataManage.data.isBoughtLifeCard) {
                gm.gameUI.showLoadingLayer();
                gm.network.buyLifeCard(function (data) {
                    gm.dataManage.data.isBoughtLifeCard = data.isBoughtLifeCard;
                    gm.postMessage(consts.kMessageBuyLifeCard, { currBuy: true, index: this.itemIndex });
                    gm.dataManage.getVipLevel(function () {
                        gm.postMessage(consts.kMessageGetVipLevel);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                });
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconGroup.visible = false;
            this.btnItem.iconCostLbl.visible = true;
        };
        __egretProto__.setBtnCost = function () {
            //this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
            this.btnItem.iconCostLbl.text = "￥188";
        };
        __egretProto__.setBtnText = function () {
            var text;
            var size;
            if (gm.dataManage.data.isBoughtLifeCard) {
                text = "已购终身月卡";
                size = 16;
            }
            else {
                text = "购买";
                size = 22;
            }
            this.btnItem.textLbl.text = text;
            this.btnItem.textLbl.size = size;
        };
        __egretProto__.setBtnSource = function () {
            var source;
            if (gm.dataManage.data.isBoughtLifeCard) {
                source = "btn_disabled";
            }
            else {
                source = "btn_blue";
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ShopBuyLifeCardItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ShopBuyLifeCardItemRenderer = ShopBuyLifeCardItemRenderer;
    ShopBuyLifeCardItemRenderer.prototype.__class__ = "uiskins.ShopBuyLifeCardItemRenderer";
})(uiskins || (uiskins = {}));
