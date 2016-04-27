var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ShopBuySkillItemRenderer = (function (_super) {
        __extends(ShopBuySkillItemRenderer, _super);
        function ShopBuySkillItemRenderer() {
            _super.call(this);
            this.dataItem = {};
            this._showDisabledBtnTime = 0;
            this.skinName = skins.components.ShopBuySkillItemRendererSkin;
        }
        var __egretProto__ = ShopBuySkillItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.initData = function () {
            this.dataItem = {};
        };
        __egretProto__.getRainGold = function () {
            return gm.dataManage.getGoldRain();
        };
        __egretProto__.getRefreshCost = function () {
            return formula.skillRefreshCost(gm.dataManage.data);
        };
        __egretProto__.getCost = function () {
            if (this.data.id == consts.kShopItemRefreshSkill) {
                return this.getRefreshCost();
            }
            else {
                return Conf.shop[this.data.id].cost;
            }
        };
        __egretProto__.getShopItem = function () {
            return gm.dataManage.data.shopItems[this.data.id];
        };
        __egretProto__.getAutoTapTime = function () {
            return Math.floor(gm.dataManage.data.autoTapRemainTime) || 0;
        };
        __egretProto__.isShopSkillCost = function () {
            var shopItem = this.getShopItem();
            var cost = this.getCost();
            if (cost == 0) {
                return false;
            }
            if (shopItem > 0) {
                return true;
            }
            if (gm.dataManage.data.diamond == 0) {
                return false;
            }
            return gm.dataManage.data.diamond >= cost;
        };
        __egretProto__.isTouchBtn = function () {
            if (this.isShopSkillCost() && this.data.base.touchBtnDisabled) {
                return true;
            }
            return false;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setExplainText();
            this.setShopSkillTimeText();
            this.setBtnText();
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnSourceByTimeout();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                this.onUseShopSkill();
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.setTouchBtnTimeout = function (cb) {
            if (this.data.base.touchBtnDisabledTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex);
            }
            this._showDisabledBtnTime = 5000;
            this.data.base.touchBtnDisabledTimeout = new Date().getTime();
            this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function () {
                Util.invokeCallback(cb);
            }.bind(this), this, this._showDisabledBtnTime);
        };
        __egretProto__.onUseShopSkill = function () {
            if (this.data.id == consts.kShopItemGoldRain) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.dataManage.goldRain(function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kShopItemAutoTap) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.dataManage.buyAutoTap(function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setShopSkillTimeText();
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kShopItemDoom) {
                if (this.isTouchBtn()) {
                    gm.dataManage.doom();
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    this.setTouchBtnTimeout(function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kShopItemPowerOfHolding) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.dataManage.powerOfHolding();
                    this.setTouchBtnTimeout(function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
            if (this.data.id == consts.kShopItemRefreshSkill) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = true;
                    gm.dataManage.refreshSkill();
                }
            }
            if (this.data.id == consts.kShopItemTenTimes) {
                if (this.isTouchBtn()) {
                    this.data.base.touchBtnDisabled = false;
                    this.setBtnSource();
                    gm.dataManage.buyTenTimes(function (data) {
                        var ly = new BuyTenTimesPanel(data);
                        gm.guiLayer.addElement(ly);
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                    }.bind(this));
                }
            }
        };
        __egretProto__.setBtnSourceByTimeout = function () {
            var currTime = new Date().getTime();
            var disabledTime = this.data.base.touchBtnDisabledTimeout;
            var offsetTime = currTime - disabledTime;
            if (disabledTime == 0) {
                this.setBtnSource();
            }
            else {
                if (offsetTime < 5000) {
                    this._showDisabledBtnTime = 5000 - offsetTime;
                    this.setShowBtnSource();
                }
                else {
                    this.setBtnSource();
                }
            }
        };
        __egretProto__.setShowBtnSource = function () {
            this.btnItem.setBtnSkinName("btn_disabled");
            this.data.base.touchBtnDisabled = false;
            if (this.data.base.touchBtnDisabledTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex);
            }
            this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function () {
                this.data.base.touchBtnDisabled = true;
                this.setBtnSource();
            }.bind(this), this, this._showDisabledBtnTime);
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = Conf.shop[this.data.id].name;
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "shop" + this.data.id;
        };
        __egretProto__.setShopSkillTimeText = function () {
            var autoTime = this.getAutoTapTime();
            if (this.data.id == consts.kShopItemAutoTap && autoTime > 0) {
                this.shopSkillTimeLbl.visible = true;
                this.playAutoTapTime();
            }
            else {
                this.shopSkillTimeLbl.visible = false;
                this.stopAutoTapTime();
            }
        };
        __egretProto__.showShopSkillTime = function () {
            var autoTime = this.getAutoTapTime();
            this.shopSkillTimeLbl.text = Util.formatTime(autoTime, false);
            if (autoTime < 0) {
                this.shopSkillTimeLbl.visible = false;
                this.stopAutoTapTime();
            }
        };
        __egretProto__.playAutoTapTime = function () {
            if (this.data.base.autoTapInterval != -1) {
                egret.clearInterval(this.data.base.autoTapInterval);
            }
            this.data.base.autoTapInterval = egret.setInterval(function () {
                this.showShopSkillTime();
            }.bind(this), this, 1000);
            this.showShopSkillTime();
        };
        __egretProto__.stopAutoTapTime = function () {
            if (this.data.base.autoTapInterval != -1) {
                egret.clearInterval(this.data.base.autoTapInterval);
            }
        };
        __egretProto__.setExplainText = function () {
            var text;
            var mate = Conf.shop;
            if (this.data.id == consts.kShopItemGoldRain) {
                text = _.sprintf(mate[this.data.id].desc, Util.formatNumber(this.getRainGold()));
            }
            else {
                var desc = mate[this.data.id].desc.replace("\\n", "\n");
                text = desc;
            }
            this.explainLbl.text = text;
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconImg.source = "diamond";
        };
        __egretProto__.setBtnCost = function () {
            var text;
            var shopItem = this.getShopItem();
            if (shopItem > 0) {
                text = shopItem + "个";
                this.btnItem.iconGroup.visible = false;
                this.btnItem.iconCostLbl.visible = true;
                this.btnItem.iconCostLbl.text = text;
            }
            else {
                text = this.getCost() + "";
                this.btnItem.iconGroup.visible = true;
                this.btnItem.iconCostLbl.visible = false;
                this.btnItem.iconLbl.text = text;
            }
        };
        __egretProto__.setBtnText = function () {
            var text;
            if (this.data.id == consts.kShopItemRefreshSkill) {
                text = "刷新技能";
            }
            else {
                text = "使用增强道具";
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnSource = function () {
            var source;
            var shopItem = this.getShopItem();
            var cost = this.getCost();
            if (this.data.base.touchBtnDisabled && (cost > 0 || shopItem > 0)) {
                source = "btn_green";
            }
            else {
                source = "btn_disabled";
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ShopBuySkillItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ShopBuySkillItemRenderer = ShopBuySkillItemRenderer;
    ShopBuySkillItemRenderer.prototype.__class__ = "uiskins.ShopBuySkillItemRenderer";
})(uiskins || (uiskins = {}));
