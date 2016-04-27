var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityCostDiamondGroup = (function (_super) {
        __extends(ActivityCostDiamondGroup, _super);
        function ActivityCostDiamondGroup() {
            _super.call(this);
            this.startTime = "2016-02-13";
            this.endTime = "2016-02-22";
            this.skinName = skins.components.ActivityCostDiamondGroupSkin;
        }
        var __egretProto__ = ActivityCostDiamondGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._activityCostDiamondItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityCostDiamondItemRenderer);
            this.costDiamondData = [];
            this.onInitList();
            this.setTimeText();
        };
        __egretProto__.onTouchLayer = function (event) {
        };
        __egretProto__.onInitList = function () {
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.activityInfo("diamond", function (data) {
                this.setCurrPurchaseText();
                _.each(Conf.activityDiamond, function (v) {
                    v["updateFunction"] = function () {
                        this.updateList();
                    }.bind(this);
                    this.costDiamondData.push(v);
                }.bind(this));
                var collection = this.costDiamondCollection = new egret.gui.ArrayCollection(this.costDiamondData);
                this.costDiamondList.dataProvider = collection;
                this.costDiamondList.itemRendererFunction = function (item) {
                    return this.getItemRender(item);
                }.bind(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.getItemRender = function (event) {
            return this._activityCostDiamondItemRenderer;
        };
        __egretProto__.updateList = function () {
            _.each(this.costDiamondCollection.source, function (v) {
                this.costDiamondCollection.itemUpdated(v);
            }.bind(this));
        };
        __egretProto__.setTimeText = function () {
            //var startText = moment(this.startTime).format("MM月DD日");
            //var endText = moment(this.endTime).format("MM月DD日");
            //this.timeTextLbl.text = "活动时间：" + startText + "更新完成" + " - " + endText + " 24点";
            var activityInfo = ActivityUtil.getActivityInfo(5 /* TOTAL_DIAMOND_CONSUMPTION */);
            if (!!activityInfo) {
                this.timeTextLbl.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
            }
            else {
                this.timeTextLbl.text = "";
            }
            //var begin=gm.dataManage.activityTime.activity[5].beginTime;
            //var end=gm.dataManage.activityTime.activity[5].endTime;
            //this.timeTextLbl.text=Util.formatActivityDate(begin,end);
        };
        __egretProto__.setCurrPurchaseText = function () {
            var count = gm.dataManage.costDiamondActivity.count;
            this.diamondLbl.text = _.sprintf("%d", count);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityCostDiamondGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityCostDiamondGroup = ActivityCostDiamondGroup;
    ActivityCostDiamondGroup.prototype.__class__ = "uiskins.ActivityCostDiamondGroup";
})(uiskins || (uiskins = {}));
