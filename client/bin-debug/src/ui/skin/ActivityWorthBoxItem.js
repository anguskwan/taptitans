var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityWorthBoxItem = (function (_super) {
        __extends(ActivityWorthBoxItem, _super);
        function ActivityWorthBoxItem(data) {
            _super.call(this);
            //this.dataItem = {};
            //this._showDisabledBtnTime = 0;
            this.data = data;
            this.skinName = skins.components.ActivityWorthBoxItemRendererSkin;
            console.log("ActivityWorthBoxItem data:  " + JSON.stringify(data));
        }
        var __egretProto__ = ActivityWorthBoxItem.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this, true);
            //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            //this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.initUI();
        };
        __egretProto__.initUI = function () {
            console.log("initUI");
            this.setIconImg();
            this.setDescText();
            this.setLimitNumText();
            this.setTitleText();
            this.setPriceText();
            this.setVipCount();
        };
        __egretProto__.refreshData = function (itemData) {
            console.log("refreshData");
        };
        __egretProto__.setIconImg = function () {
            //var icon = gm.gameUI.getActivityBlack(this.data.id).icon;
            var icon = Conf.market[this.data.id].iconName;
            this.iconImg.source = icon;
        };
        __egretProto__.setTitleText = function () {
            var text = Conf.market[this.data.id].name;
            this.lblTitle.text = text;
        };
        __egretProto__.setDescText = function () {
            var meta = Conf.market[this.data.id];
            var num = meta.num;
            //黄金风暴
            if (meta.type == "gold") {
                var gold = formula.goldRain(gm.dataManage.data);
                num = num * gold;
            }
            var str = Util.formatNumber(num);
            this.descLbl.text = "x" + str;
        };
        __egretProto__.setLimitNumText = function () {
            var id = this.data.id;
            var times = Conf.market[id].time;
            var currTimes = gm.dataManage.newMarket.times[id] || 0;
            var remainTimes = _.sprintf("%d", (times - currTimes));
            this.lblRemainTimes.text = remainTimes;
            if (remainTimes == (0).toString()) {
                this.btnBuy.enabled = false;
            }
        };
        __egretProto__.setMarketTimes = function () {
            if (!gm.dataManage.newMarket.times[this.data.id]) {
                gm.dataManage.newMarket.times[this.data.id] = 0;
            }
            gm.dataManage.newMarket.times[this.data.id]++;
            localStorage.setItem("newMarket", JSON.stringify(gm.dataManage.newMarket));
            this.setLimitNumText();
        };
        __egretProto__.setPriceText = function () {
            console.log("JSON.stringify market data", JSON.stringify(Conf.market[this.data.id]));
            this.lblPrice.text = Conf.market[this.data.id].cost;
            this.lblOriPrice.text = Conf.market[this.data.id].costOrigin;
        };
        __egretProto__.setBtnBuy = function (enable) {
            this.btnBuy.enabled = enable;
        };
        __egretProto__.setVipCount = function () {
            var vipLimit = Conf.market[this.data.id].vipLimitNum;
            var curVip = gm.dataManage.data.vip;
            if (curVip < vipLimit) {
            }
            if (vipLimit == 0) {
                // hide
                //this.vipBg.visible = false;
                this.vipIcon.visible = false;
                this.groupVip.visible = false;
            }
            else {
                this.lblVip.text = "V" + vipLimit;
            }
            //limit
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnBuy) {
                this.onUseShop();
            }
        };
        __egretProto__.onUseShop = function () {
            console.log("onUseShop");
            var id = this.data.id;
            var data = Conf.market[this.data.id];
            var type = data.type;
            var icon = data.iconName;
            var times = Conf.market[id].time;
            var currTimes = gm.dataManage.newMarket.times[id] || 0;
            if (currTimes >= times) {
                gm.postMessage(consts.kMessageShowToastLayer, "土豪，货已经被你买光了。");
                return;
            }
            if (icon == "guild_icon_shop3") {
                this.onUseBuyEquip();
            }
            else if (icon == "guild_icon_shop4") {
                this.onUseBuyTenEquip();
            }
            else if (type == "gold") {
                this.onUseBuyGold();
            }
            else {
                this.onBuyMarketItem();
            }
        };
        __egretProto__.onUseBuyEquip = function () {
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
                    this.setMarketTimes();
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.onUseBuyTenEquip = function () {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.buyTenEquip(2, function (data) {
                gm.dataManage.updateEquipValue(function () {
                    var ly = new BuyTenTimesPanel(data);
                    gm.guiLayer.addElement(ly);
                    this.setMarketTimes();
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.onUseBuyGold = function () {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.buyMarketItem(this.data.id, function (data) {
                //黄金风暴
                var obj;
                obj = [{ type: data.type, num: data.num }];
                var ly = new MessageGetRewardPanel("获得物品", obj);
                gm.guiLayer.addElement(ly);
                this.setMarketTimes();
                Util.invokeCallback(this.data.updateFunction);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.onBuyMarketItem = function () {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.buyMarketItem(this.data.id, function (data) {
                var obj;
                obj = [{ type: data.type, num: data.num }];
                var ly = new MessageGetRewardPanel("获得物品", obj);
                gm.guiLayer.addElement(ly);
                this.setMarketTimes();
                Util.invokeCallback(this.data.updateFunction);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        return ActivityWorthBoxItem;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityWorthBoxItem = ActivityWorthBoxItem;
    ActivityWorthBoxItem.prototype.__class__ = "uiskins.ActivityWorthBoxItem";
})(uiskins || (uiskins = {}));
