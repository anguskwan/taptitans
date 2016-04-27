var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityAccuGroup = (function (_super) {
        __extends(ActivityAccuGroup, _super);
        function ActivityAccuGroup() {
            _super.call(this);
            this.startTime = "2016-01-01 00:00:00";
            this.endTime = "2016-01-03 23:59:00";
            this.skinName = skins.components.ActivityAccuGroupSkin;
        }
        var __egretProto__ = ActivityAccuGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._activityAccuItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityAccuItemRenderer);
            this.accuData = [];
            this.onInitList();
            this.setTimeText();
        };
        __egretProto__.onTouchLayer = function (event) {
        };
        __egretProto__.onInitList = function () {
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.purchaseInfo(function (data) {
                gm.dataManage.purchaseActivity = data;
                this.setCurrPurchaseText();
                _.each(Conf.activityPurchase, function (v) {
                    v["updateFunction"] = function () {
                        this.updateList();
                    }.bind(this);
                    this.accuData.push(v);
                }.bind(this));
                var collection = this.accuCollection = new egret.gui.ArrayCollection(this.accuData);
                this.accuList.dataProvider = collection;
                this.accuList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.updateList = function () {
            _.each(this.accuCollection.source, function (v) {
                this.accuCollection.itemUpdated(v);
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._activityAccuItemRenderer;
        };
        __egretProto__.setTimeText = function () {
            var activityInfo = ActivityUtil.getActivityInfo(8 /* RECHARGE_GIFT */);
            if (!!activityInfo) {
                this.timeTextLbl.text = "活动时间：" + Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
            }
            else {
                this.timeTextLbl.text = "";
            }
            //var beginTime = gm.dataManage.activityTime.activity[8].beginTime;
            //var endTime = gm.dataManage.activityTime.activity[8].endTime;
            //this.timeTextLbl.text = "活动时间：" + Util.formatActivityDate(beginTime, endTime);
        };
        __egretProto__.setCurrPurchaseText = function () {
            var count = gm.dataManage.purchaseActivity.count;
            this.currPurchaseLbl.text = _.sprintf("你当前已累计充值：%d", count);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityAccuGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityAccuGroup = ActivityAccuGroup;
    ActivityAccuGroup.prototype.__class__ = "uiskins.ActivityAccuGroup";
})(uiskins || (uiskins = {}));
