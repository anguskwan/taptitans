var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityCatGroup = (function (_super) {
        __extends(ActivityCatGroup, _super);
        function ActivityCatGroup() {
            _super.call(this);
            this.times = -1;
            this.diamond = 0;
            this.intervalIndex = -1;
            this.endTime = "2016-02-12 23:59:00";
            this.skinName = skins.components.ActivityCatGroupSkin;
        }
        var __egretProto__ = ActivityCatGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setCatInfo();
            this.setCatBgImg();
            this.onInitTime();
        };
        __egretProto__.setTimeString = function () {
            var activityInfo = ActivityUtil.getActivityInfo(2 /* CAT_GO */);
            if (!!activityInfo) {
                this.currTimeLbl.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
            }
            else {
                this.currTimeLbl.text = "";
            }
            //var begin=gm.dataManage.activityTime.activity[2].beginTime;
            //var end=gm.dataManage.activityTime.activity[2].endTime;
            //this.currTimeLbl.text=Util.formatActivityDate(begin,end);
        };
        __egretProto__.onInitTime = function () {
            var currTime = new Date().getTime();
            var endTime = new Date(this.endTime).getTime();
            if (Util.isOpenCat()) {
                egret.setTimeout(function () {
                    //this.currTimeLbl.text = "活动已结束";
                    this.setTimeString();
                    this.getRewardBtn.enabled = false;
                }.bind(this), this, (endTime - currTime));
                this.setActivityTime();
            }
            else {
                //this.currTimeLbl.text = "活动已结束";
                this.setTimeString();
                this.getRewardBtn.enabled = false;
            }
        };
        __egretProto__.setActivityTime = function () {
            //this.currTimeLbl.text = moment(this.endTime).format("MM月DD日") + " 24点";
            this.setTimeString();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.getRewardBtn && this.getRewardBtn.enabled) {
                this.getRewardBtn.enabled = false;
                gm.gameUI.showLoadingLayer();
                tt.ActivityManage.catGo(function (data) {
                    this.getRewardBtn.enabled = true;
                    this.times = data.times;
                    this.diamond = data.diamond;
                    this.onUpdate(true);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.setCatBgImg = function () {
            var url = Util.getImageUrl("activity_bg_cat2");
            RES.getResByUrl(url, function (event) {
                this.catBgImg.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.setCatInfo = function () {
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.catInfo(function (data) {
                this.times = data.times;
                this.onUpdate(false);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.onUpdate = function (isUpdate) {
            this.setHighestDiamondText();
            this.setNeedDiamondText();
            this.setCurrDiamondText();
            this.setGetRewardBtn();
            if (isUpdate) {
                this.setGetDiamondText();
            }
        };
        __egretProto__.setHighestDiamondText = function () {
            var meta = Conf.activityCat;
            var id = this.times + 1;
            if (meta[id]) {
                this.highestDiamond.text = meta[id].max + "";
            }
            else {
                this.highestDiamond.text = "-";
            }
        };
        __egretProto__.setNeedDiamondText = function () {
            var meta = Conf.activityCat;
            var id = this.times + 1;
            if (meta[id]) {
                this.needDiamond.text = meta[id].cost + "";
            }
            else {
                this.needDiamond.text = "-";
            }
        };
        __egretProto__.setCurrDiamondText = function () {
            this.currDiamond.text = gm.dataManage.data.diamond + "";
        };
        __egretProto__.setGetDiamondText = function () {
            var diamond;
            var meta = Conf.activityCat;
            var id = this.times;
            if (meta[id]) {
                diamond = this.diamond + meta[id].cost;
            }
            else {
                diamond = 0;
            }
            var diamondList = _.chars(diamond.toString());
            var size = 5 - diamondList.length;
            for (var i = 0; i < size; i++) {
                diamondList.splice(0, 0, "0");
            }
            for (var j = 0; j < 5; j++) {
                var index = j + 1;
                this["itemLbl" + index].text = diamondList[j];
            }
        };
        __egretProto__.setGetRewardBtn = function () {
            var id = this.times + 1;
            var meta = Conf.activityCat;
            if (meta[id]) {
                var vip = gm.dataManage.data.vip;
                this.getRewardBtn.enabled = (vip >= meta[id].limit);
            }
            else {
                this.getRewardBtn.enabled = false;
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityCatGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityCatGroup = ActivityCatGroup;
    ActivityCatGroup.prototype.__class__ = "uiskins.ActivityCatGroup";
})(uiskins || (uiskins = {}));
