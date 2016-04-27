var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityWorthGroup = (function (_super) {
        __extends(ActivityWorthGroup, _super);
        function ActivityWorthGroup() {
            _super.call(this);
            this.skinName = skins.components.ActivityWorthBagGroupSkin;
        }
        var __egretProto__ = ActivityWorthGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.loadData();
            this.refreshList();
            this.startTimeTick();
        };
        __egretProto__.loadData = function () {
            // init market
            var newMarket = JSON.parse(localStorage.getItem("newMarket"));
            if (null == newMarket) {
                this.addNewMarket();
            }
            else {
                gm.dataManage.newMarket = newMarket;
            }
        };
        __egretProto__.addNewMarket = function () {
            var data;
            var marketCfg = {};
            for (var i = 1; i < 5; i++) {
                //todo
                marketCfg[i] = Conf.market[i + 12];
            }
            data = {
                createTime: moment().valueOf(),
                market: _.sample(marketCfg, 4),
                times: {}
            };
            gm.dataManage.newMarket = data;
            localStorage.setItem("newMarket", JSON.stringify(data));
        };
        __egretProto__.onUpdateList = function () {
            console.log("onUpdateList");
        };
        __egretProto__.refreshList = function () {
            console.log("refreshList");
            for (var i = 1; i < 5; i++) {
                this["item" + i].removeAllElements();
            }
            //add
            var index = 1;
            this.itemViews = [];
            var data;
            var market = gm.dataManage.newMarket.market;
            _.each(market, function (value) {
                console.log("value:  " + JSON.stringify(value["id"]));
                //console.log("value.id" + value.id);
                var data = { id: value.id };
                var itemView = new uiskins.ActivityWorthBoxItem(data);
                this["item" + index].addElement(itemView);
                this.itemViews[index] = itemView;
                index = index + 1;
            }.bind(this));
        };
        __egretProto__.setTimeText = function () {
            var time = this.getSetOffTime();
            this.timeLbl.text = Util.formatTime(Math.floor(time / 1000), true);
        };
        __egretProto__.getSetOffTime = function () {
            var currTime = moment().valueOf();
            for (var i = 0; i < 9; i++) {
                var baseTime = moment();
                baseTime.set('hour', i * 3);
                baseTime.set('minute', 0);
                baseTime.set('second', 0);
                baseTime.set('millisecond', 0);
                if (currTime <= baseTime.valueOf()) {
                    return (baseTime.valueOf() - currTime);
                }
            }
        };
        __egretProto__.startTimeTick = function () {
            var _this = this;
            //倒计时，
            var activityInfo = ActivityUtil.getActivityInfo(3 /* BLACK_MARKET */);
            var curTime = gm.timeManage.getCurrentTime();
            var endTime = activityInfo.endTime;
            this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime) / 1000), true));
            var intervalEntry = egret.setInterval(function () {
                var curTime = gm.timeManage.getCurrentTime();
                this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime) / 1000), true));
            }, this, 1000);
            egret.setTimeout(function () {
                _this.updateClockCountDown("活动已结束");
                egret.clearInterval(intervalEntry);
            }, this, endTime - curTime);
        };
        __egretProto__.updateClockCountDown = function (timeStr) {
            this.timeLbl.text = timeStr;
        };
        __egretProto__.onTouchLayer = function (event) {
            console.log("onTouchLayer");
            if (event.target == this.btnReset) {
                console.log("btnReset");
                gm.gameUI.showLoadingLayer();
                gm.dataManage.refreshMarket_activity(function () {
                    localStorage.removeItem("newMarket");
                    this.refreshList();
                    this.setDiamondText();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.setDiamondText = function () {
            this.diamondLbl.text = "x50";
        };
        return ActivityWorthGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityWorthGroup = ActivityWorthGroup;
    ActivityWorthGroup.prototype.__class__ = "uiskins.ActivityWorthGroup";
})(uiskins || (uiskins = {}));
