var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityEggGroup = (function (_super) {
        __extends(ActivityEggGroup, _super);
        function ActivityEggGroup(closeFunction) {
            _super.call(this);
            this.EGG_SUM = 4;
            this.HAMMER_SUM_ONE_DAY = 10;
            this.HAMMER_GET_PER_PURCHASE = 12;
            this.SMASH_DIAMOND_PRICE = 30;
            this.closeFunction = closeFunction;
            this.eggImageArray = [];
            this.skinName = skins.components.ActivityEggGroupSkin;
        }
        var __egretProto__ = ActivityEggGroup.prototype;
        __egretProto__.childrenCreated = function () {
            var _this = this;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setBackgroundImg();
            this.refreshDisplayDate();
            this.eggImageArray.push(this.egg1);
            this.eggImageArray.push(this.egg2);
            this.eggImageArray.push(this.egg3);
            this.eggImageArray.push(this.egg4);
            gm.network.sendAction("getGoldenEggsInfo", {}, function (data) {
                console.log("EggActivity: getGoldEggsInfo, goldEggsHammersNum=" + data.goldEggsHammersNum + ", goldEggsTotalReward=" + data.goldEggsTotalReward + ", goldEggsPurchaseNum=" + data.goldEggsPurchaseNum);
                gm.dataManage.data.goldEggsHammersNum = data.goldEggsHammersNum;
                gm.dataManage.data.goldEggsPurchaseNum = data.goldEggsPurchaseNum;
                gm.dataManage.data.dailyEvent.goldEggsTotalReward = data.goldEggsTotalReward;
                gm.dataManage.data.goldEggs = data.goldEggs;
                _this.refreshCountLabel();
                _this.refreshEggDisplay();
            });
        };
        __egretProto__.onTouchLayer = function (event) {
            var _this = this;
            if (event.target == this.buyBtn && this.buyBtn.enabled) {
                gm.postMessage(consts.kMessageSelectShopPay);
                Util.invokeCallback(this.closeFunction);
                return;
            }
            for (var i = 0; i < this.EGG_SUM; ++i) {
                if (event.target == this.eggImageArray[i]) {
                    if (gm.dataManage.data.goldEggsHammersNum <= 0) {
                        gm.postMessage(consts.kMessageShowToastLayer, "锤子不足");
                        return;
                    }
                    if (gm.dataManage.data.diamond < this.SMASH_DIAMOND_PRICE) {
                        gm.postMessage(consts.kMessageShowToastLayer, "钻石不足");
                        return;
                    }
                    console.log("EggActivity: goldEggsHammersNum=" + gm.dataManage.data.goldEggsHammersNum);
                    gm.dataManage.data.goldEggsHammersNum -= 1;
                    console.log("EggActivity: goldEggsHammersNum=" + gm.dataManage.data.goldEggsHammersNum);
                    console.log("EggActivity: Try to smash the egg, index=" + i);
                    gm.network.sendAction("smashingGoldenEggs", { pos: i + 1 }, function (data) {
                        console.log("EggActivity: getGoldEggsInfo, goldEggsHammersNum=" + data.goldEggsHammersNum + ", goldEggsTotalReward=" + data.goldEggsTotalReward);
                        gm.dataManage.data.goldEggsHammersNum = data.goldEggsHammersNum;
                        gm.dataManage.data.dailyEvent.goldEggsTotalReward = data.goldEggsTotalReward;
                        gm.dataManage.data.goldEggs = data.goldEggs;
                        gm.dataManage.costMoney(_this.SMASH_DIAMOND_PRICE, "diamond");
                        gm.dataManage.addMoney(data.goldEggsCrystal, "crystal");
                        _this.refreshCountLabel();
                        _this.refreshEggDisplay();
                        var ly = new MessageGetRewardPanel("领取奖励", [{ type: "crystal", num: data.goldEggsCrystal }]);
                        gm.guiLayer.addElement(ly);
                    });
                }
            }
        };
        __egretProto__.setBackgroundImg = function () {
            var url = Util.getImageUrl("activity_bg_egg");
            RES.getResByUrl(url, function (event) {
                this.background.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.resetEggDisplay = function () {
            for (var i = 0; i < this.eggImageArray.length; ++i) {
                this.eggImageArray[i].enabled = true;
            }
        };
        __egretProto__.refreshDisplayDate = function () {
            var activityInfo = ActivityUtil.getActivityInfo(4 /* SMASHING_GOLDEN_EGGS */);
            if (!!activityInfo) {
                this.validTimeLabel.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
            }
            else {
                this.validTimeLabel.text = "";
            }
            //var activity = gm.dataManage.activityTime.activity[4];
            //this.validTimeLabel.text = Util.formatActivityDate(activity.beginTime, activity.endTime);
            //console.warn("~~~~~validTimeLabel " + this.validTimeLabel.text);
        };
        __egretProto__.refreshEggDisplay = function () {
            this.resetEggDisplay();
            var goldEggs = gm.dataManage.data.goldEggs;
            console.log("EggActivity: Gold Eggs = " + JSON.stringify(goldEggs));
            for (var i = 0; i < goldEggs.length; ++i) {
                this.eggImageArray[goldEggs[i].pos - 1].enabled = false;
            }
        };
        __egretProto__.refreshCountLabel = function () {
            if (gm.dataManage.data.goldEggsHammersNum < 0)
                gm.dataManage.data.goldEggsHammersNum = 0;
            this.hammerCountLbl.text = gm.dataManage.data.goldEggsHammersNum;
            this.todayGainCrystalLbl.text = gm.dataManage.data.dailyEvent.goldEggsTotalReward;
            this.canGetHammerCountLbl.text = (this.HAMMER_SUM_ONE_DAY - Math.floor(gm.dataManage.data.goldEggsPurchaseNum / this.HAMMER_GET_PER_PURCHASE)).toString();
            console.log("EggActivity: goldEggsHammersNum=" + gm.dataManage.data.goldEggsHammersNum + ", goldEggsTotalReward=" + gm.dataManage.data.dailyEvent.goldEggsTotalReward);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityEggGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityEggGroup = ActivityEggGroup;
    ActivityEggGroup.prototype.__class__ = "uiskins.ActivityEggGroup";
})(uiskins || (uiskins = {}));
