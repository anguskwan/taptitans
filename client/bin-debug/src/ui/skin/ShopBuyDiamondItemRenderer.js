var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ShopBuyDiamondItemRenderer = (function (_super) {
        __extends(ShopBuyDiamondItemRenderer, _super);
        function ShopBuyDiamondItemRenderer() {
            _super.call(this);
            this.isPlayingShopAni = false;
            this.skinName = skins.components.ShopBuyDiamondItemRendererSkin;
        }
        var __egretProto__ = ShopBuyDiamondItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.getBuyDiamond = function () {
            var vip = gm.dataManage.data.vip;
            var index = (this.data.id - 10) + 1;
            var diamond = 0;
            if (vip <= 5) {
                if (index <= vip) {
                    diamond = Conf.shop[this.data.id].vipNum;
                }
                else {
                    diamond = Conf.shop[this.data.id].diamondNum;
                }
            }
            else {
                diamond = Conf.shop[this.data.id].vipNum;
            }
            return diamond;
        };
        __egretProto__.getName = function () {
            return this.getBuyDiamond() + "钻石";
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setName();
            this.setExplainText();
            this.setIconImg();
            this.setDoubleTipImg();
            this.setDoubleText();
            this.setBtnText();
            this.setBtnIconImg();
            this.setBtnCost();
        };
        __egretProto__.getPayId = function () {
            var mate = Conf.shop[this.data.id];
            var payId = mate.payId;
            return payId;
        };
        __egretProto__.isBuyDouble = function () {
            var payId = this.getPayId();
            if (!gm.dataManage.data.purchaseCount || _.isUndefined(gm.dataManage.data.purchaseCount[payId]) || gm.dataManage.data.purchaseCount[payId] == 0 || Util.isDouble11()) {
                return true;
            }
            return false;
        };
        __egretProto__.onTouchBtnClick = function (event) {
            //alert("begin buy diamond, payId=" + this.getPayId());
            if (event.target == this.btnItem) {
                gm.gameUI.showLoadingLayer();
                gm.network.buyDiamond(this.getPayId(), function (data) {
                    gm.dataManage.addMoney(data.added, "diamond");
                    gm.dataManage.getVipLevel(function () {
                        gm.postMessage(consts.kMessageGetVipLevel);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setDoubleTipImg = function () {
            if (this.isBuyDouble()) {
                this.doubleTipImg.visible = true;
                if (!this.isPlayingShopAni) {
                    this.playDoubleTipAni();
                    this.isPlayingShopAni = true;
                }
            }
            else {
                this.doubleTipImg.visible = false;
                this.stopDoubleTipAni();
                this.isPlayingShopAni = false;
            }
        };
        __egretProto__.playDoubleTipAni = function () {
            this.doubleTipImg.scaleX = 1;
            this.doubleTipImg.scaleY = 1;
            var tw = egret.Tween.get(this.doubleTipImg, { loop: true });
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
        };
        __egretProto__.stopDoubleTipAni = function () {
            egret.Tween.removeTweens(this.doubleTipImg);
        };
        __egretProto__.setDoubleText = function () {
            if (this.isBuyDouble()) {
                this.shopLbl.text = "+" + this.getName();
            }
            else {
                this.shopLbl.text = "";
            }
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = this.getName();
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "shop" + (this.data.id - 1);
        };
        __egretProto__.setExplainText = function () {
            var text;
            var vip = gm.dataManage.data.vip;
            var index = (this.data.id - 11) + 1;
            if (vip <= 5) {
                if (index <= vip) {
                    text = "钻石增加44%";
                }
                else {
                    text = Conf.shop[this.data.id].desc;
                }
            }
            else {
                text = "钻石增加44%";
            }
            this.explainLbl.text = text;
        };
        __egretProto__.setBtnText = function () {
            this.btnItem.textLbl.size = 22;
            this.btnItem.textLbl.text = "购买";
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconGroup.visible = false;
            this.btnItem.iconCostLbl.visible = true;
        };
        __egretProto__.setBtnCost = function () {
            this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ShopBuyDiamondItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ShopBuyDiamondItemRenderer = ShopBuyDiamondItemRenderer;
    ShopBuyDiamondItemRenderer.prototype.__class__ = "uiskins.ShopBuyDiamondItemRenderer";
})(uiskins || (uiskins = {}));
