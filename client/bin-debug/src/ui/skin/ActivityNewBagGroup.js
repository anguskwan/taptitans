var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityNewBagGroup = (function (_super) {
        __extends(ActivityNewBagGroup, _super);
        function ActivityNewBagGroup() {
            _super.call(this);
            this.skinName = skins.components.ActivityNewBagGroupSkin;
        }
        var __egretProto__ = ActivityNewBagGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setNewBagBgImg();
            this.loadCheckIfHasPurchaseGiftBag();
            this.setReward();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.getRewardBtn && this.getRewardBtn.enabled) {
                gm.gameUI.showLoadingLayer();
                gm.dataManage.getDailyPurchaseGiftBag(function (data) {
                    var arrItem = [];
                    _.each(data, function (v, k) {
                        var item = {
                            type: k,
                            num: v
                        };
                        arrItem.push(item);
                        gm.dataManage.addItem(v, k);
                    }.bind(this));
                    var ly = new MessageGetRewardPanel("获得物品", arrItem);
                    gm.guiLayer.addElement(ly);
                    this.getRewardBtn.enabled = false;
                    this.getRewardLbl.text = "已领取";
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.setNewBagBgImg = function () {
            var url = Util.getImageUrl("activity_bg_newbag");
            RES.getResByUrl(url, function (event) {
                this.newBagBgImg.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.loadCheckIfHasPurchaseGiftBag = function () {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.checkIfHasPurchaseGiftBag(function (data) {
                this.getRewardBtn.enabled = data.result;
                if (data.dailyEvent.purchaseGiftBag) {
                    this.getRewardLbl.text = "已领取";
                }
                else {
                    this.getRewardLbl.text = "领取礼包";
                }
                //this.getRewardLbl.text = gm.network.areaId;
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.setReward = function () {
            var relic = Math.max(30, gm.dataManage.getRelicsByPrestige() * 0.1);
            this.rewardLbl1.text = Util.formatNumber(relic);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityNewBagGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityNewBagGroup = ActivityNewBagGroup;
    ActivityNewBagGroup.prototype.__class__ = "uiskins.ActivityNewBagGroup";
})(uiskins || (uiskins = {}));
