var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityThree = (function (_super) {
        __extends(ActivityThree, _super);
        function ActivityThree(closeFunction) {
            _super.call(this);
            this.closeFunction = closeFunction;
            this.skinName = skins.components.ActivityThreeSkin;
        }
        var __egretProto__ = ActivityThree.prototype;
        __egretProto__.childrenCreated = function () {
            var _this = this;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setBackgroundImg();
            //var activity = gm.dataManage.activityTime.activity[9];
            //this.validTimeLabel.text = Util.formatActivityDateThree(activity.endTime);
            var activityInfo = ActivityUtil.getActivityInfo(9 /* FIRST_RECHARGE_GIFT */);
            if (!!activityInfo) {
                this.validTimeLabel.text = Util.formatActivityDateThree(activityInfo.endTime);
            }
            else {
                this.validTimeLabel.text = "";
            }
            this.btnGain.visible = false;
            this.buyBtn.visible = false;
            gm.network.sendAction("getActivityFirstPurchaseGift", {}, function (data) {
                _this.reloadData(data);
            });
        };
        __egretProto__.reloadData = function (data) {
            console.log('reloadThree', data);
            this.btnGain.visible = false;
            if (!!data.firstPurchaseGiftTime) {
                this.buyBtn.visible = false;
            }
            else {
                this.buyBtn.visible = true;
            }
            this.reloadAsset(data, this.asset1, 1);
            this.reloadAsset(data, this.asset2, 2);
            this.reloadAsset(data, this.asset3, 3);
        };
        __egretProto__.reloadAsset = function (data, asset, index) {
            if (data.firstPurchaseGainStatus[index - 1] == 0) {
                if (index == 1)
                    asset.source = "activity3_1";
                else if (index == 2)
                    asset.source = "activity3_2";
                else
                    asset.source = "activity3_3";
            }
            else if (data.firstPurchaseGainStatus[index - 1] == 1) {
                this.btnGain.x = asset.x;
                this.btnGain.y = asset.y;
                this.btnGain.visible = true;
            }
            else if (data.firstPurchaseGainStatus[index - 1] == 2) {
                asset.source = "activity3_already";
            }
            else {
                asset.source = "activity3_pass";
            }
        };
        __egretProto__.onTouchLayer = function (event) {
            var _this = this;
            if (event.target == this.btnGain) {
                gm.network.sendAction("gainActivityFirstPurchaseGift", {}, function (data) {
                    gm.dataManage.addItem(data.diamond, "diamond");
                    _this.reloadData(data);
                });
            }
            else if (event.target == this.buyBtn) {
                gm.gameUI.showLoadingLayer();
                gm.network.buyThreeDiamond(function (data) {
                    this.reloadData(data);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.setBackgroundImg = function () {
            var url = Util.getImageUrl("activity_bg_3");
            RES.getResByUrl(url, function (event) {
                this.background.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        return ActivityThree;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityThree = ActivityThree;
    ActivityThree.prototype.__class__ = "uiskins.ActivityThree";
})(uiskins || (uiskins = {}));
