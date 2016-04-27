var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityBlackBoxItemRenderer = (function (_super) {
        __extends(ActivityBlackBoxItemRenderer, _super);
        function ActivityBlackBoxItemRenderer() {
            _super.call(this);
            this.dataItem = {};
            this._showDisabledBtnTime = 0;
            this.skinName = skins.components.ActivityBlackBoxItemRendererSkin;
        }
        var __egretProto__ = ActivityBlackBoxItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.initData = function () {
            this.dataItem = {};
        };
        __egretProto__.getCost = function () {
            return Conf.market[this.data.id].cost;
        };
        __egretProto__.isShopSkillCost = function () {
            var cost = this.getCost();
            if (cost == 0) {
                return false;
            }
            return gm.dataManage.data.diamond >= cost;
        };
        __egretProto__.isTouchBtn = function () {
            if (this.data.base.touchBtnDisabled) {
                return true;
            }
            return false;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setTitleText();
            this.setDescText();
            this.setIconImg();
            this.setNumText();
            this.setBtnText();
            this.setBtnIconImg();
            this.setBtnCost();
            this.setBtnSourceByTimeout();
            this.setBtnSource();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                this.onUseShop();
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
        __egretProto__.onUseShop = function () {
            var id = this.data.id;
            var type = gm.gameUI.getActivityBlack(id).type;
            var times = Conf.market[id].time;
            var currTimes = gm.dataManage.newMarket.times[id] || 0;
            if (currTimes >= times) {
                gm.postMessage(consts.kMessageShowToastLayer, "土豪，货已经被你买光了。");
                return;
            }
            if (type == "equip") {
                this.onUseBuyEquip();
            }
            else if (type == "superEquip") {
                this.onUseBuyTenEquip();
            }
            else {
                this.onBuyMarketItem();
            }
        };
        __egretProto__.onUseBuyEquip = function () {
            if (this.isTouchBtn()) {
                this.data.base.touchBtnDisabled = false;
                this.setBtnSource();
                gm.gameUI.showLoadingLayer();
                gm.dataManage.buyEquip(2, function (data) {
                    gm.dataManage.updateEquipValue(function () {
                        var obj;
                        if (data.type != "equip") {
                            obj = [{ type: data.type, num: data.num }];
                        }
                        else {
                            obj = [{ type: data.type, id: data.id }];
                        }
                        var ly = new MessageGetRewardPanel("获得物品", obj);
                        gm.guiLayer.addElement(ly);
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                        this.setMarketTimes();
                        Util.invokeCallback(this.data.updateFunction);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    this.data.base.touchBtnDisabled = true;
                    this.setBtnSource();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.onUseBuyTenEquip = function () {
            if (this.isTouchBtn()) {
                this.data.base.touchBtnDisabled = false;
                this.setBtnSource();
                gm.gameUI.showLoadingLayer();
                gm.dataManage.buyTenEquip(2, function (data) {
                    gm.dataManage.updateEquipValue(function () {
                        var ly = new BuyTenTimesPanel(data);
                        gm.guiLayer.addElement(ly);
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                        this.setMarketTimes();
                        Util.invokeCallback(this.data.updateFunction);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        this.data.base.touchBtnDisabled = true;
                        this.setBtnSource();
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    this.data.base.touchBtnDisabled = true;
                    this.setBtnSource();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.onBuyMarketItem = function () {
            if (this.isTouchBtn()) {
                this.data.base.touchBtnDisabled = false;
                this.setBtnSource();
                gm.gameUI.showLoadingLayer();
                gm.dataManage.buyMarketItem(this.data.id, function (data) {
                    var obj;
                    obj = [{ type: data.type, num: data.num }];
                    var ly = new MessageGetRewardPanel("获得物品", obj);
                    gm.guiLayer.addElement(ly);
                    this.data.base.touchBtnDisabled = true;
                    this.setBtnSource();
                    this.setMarketTimes();
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    this.data.base.touchBtnDisabled = true;
                    this.setBtnSource();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.setMarketTimes = function () {
            if (!gm.dataManage.newMarket.times[this.data.id]) {
                gm.dataManage.newMarket.times[this.data.id] = 0;
            }
            gm.dataManage.newMarket.times[this.data.id]++;
            localStorage.setItem("newMarket", JSON.stringify(gm.dataManage.newMarket));
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
        __egretProto__.setIconImg = function () {
            var icon = gm.gameUI.getActivityBlack(this.data.id).icon;
            this.iconImg.source = icon;
        };
        __egretProto__.setTitleText = function () {
            var text = Conf.market[this.data.id].name;
            this.titleLbl.text = text;
        };
        __egretProto__.setDescText = function () {
            var meta = Conf.market[this.data.id];
            var text = meta.desc;
            var num = meta.num;
            this.descLbl.text = _.sprintf(text, num);
        };
        __egretProto__.setNumText = function () {
            var id = this.data.id;
            var times = Conf.market[id].time;
            var currTimes = gm.dataManage.newMarket.times[id] || 0;
            this.numLbl.text = _.sprintf("%d", (times - currTimes));
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconImg.source = "diamond";
        };
        __egretProto__.setBtnCost = function () {
            var text;
            text = this.getCost() + "";
            this.btnItem.iconGroup.visible = true;
            this.btnItem.iconCostLbl.visible = false;
            this.btnItem.iconLbl.text = text;
        };
        __egretProto__.setBtnText = function () {
            this.btnItem.textLbl.text = "使用钻石";
        };
        __egretProto__.setBtnSource = function () {
            var source;
            if (this.data.base.touchBtnDisabled) {
                source = "guild_btn_yellow";
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
        return ActivityBlackBoxItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ActivityBlackBoxItemRenderer = ActivityBlackBoxItemRenderer;
    ActivityBlackBoxItemRenderer.prototype.__class__ = "uiskins.ActivityBlackBoxItemRenderer";
})(uiskins || (uiskins = {}));
