var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityLifeCardGroup = (function (_super) {
        __extends(ActivityLifeCardGroup, _super);
        function ActivityLifeCardGroup(closeFunction) {
            _super.call(this);
            this.closeFunction = closeFunction;
            this.skinName = skins.components.ActivityLifeCardGroupSkin;
        }
        var __egretProto__ = ActivityLifeCardGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setBackgroundImg();
            this.loadCheckIfHasPurchaseLifeCard();
            var activityInfo = ActivityUtil.getActivityInfo(1 /* LIFE_CARD */);
            if (!!activityInfo) {
                this.validTimeLabel.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
            }
            else {
                this.validTimeLabel.text = "";
            }
            //var begin=gm.dataManage.activityTime.activity[1].beginTime;
            //var end=gm.dataManage.activityTime.activity[1].endTime;
            //this.validTimeLabel.text=Util.formatActivityDate(begin,end);
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.buyBtn && this.buyBtn.enabled) {
                gm.gameUI.showLoadingLayer();
                gm.network.buyLifeCard(function (data) {
                    gm.dataManage.data.isBoughtLifeCard = data.isBoughtLifeCard;
                    this.loadCheckIfHasPurchaseLifeCard();
                    gm.postMessage(consts.kMessageBuyLifeCard);
                    gm.dataManage.getVipLevel(function () {
                        gm.postMessage(consts.kMessageGetVipLevel);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                });
            }
        };
        __egretProto__.setBackgroundImg = function () {
            var url = Util.getImageUrl("activity_bg_lifecard");
            RES.getResByUrl(url, function (event) {
                this.background.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.loadCheckIfHasPurchaseLifeCard = function () {
            if (!gm.dataManage.data.isBoughtLifeCard) {
                this.buyBtnLbl.text = "￥188";
                this.buyBtn.enabled = true;
            }
            else {
                this.buyBtnLbl.text = "已购买";
                this.buyBtn.enabled = false;
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityLifeCardGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityLifeCardGroup = ActivityLifeCardGroup;
    ActivityLifeCardGroup.prototype.__class__ = "uiskins.ActivityLifeCardGroup";
})(uiskins || (uiskins = {}));
