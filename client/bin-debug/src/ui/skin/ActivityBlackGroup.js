var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityBlackGroup = (function (_super) {
        __extends(ActivityBlackGroup, _super);
        function ActivityBlackGroup() {
            _super.call(this);
            this.intervalIdx = -1;
            this.timeOutIdx = -1;
            this.startTime = "2016-01-11 00:00:00";
            this.endTime = "2016-01-13 23:59:00";
            this.skinName = skins.components.ActivityBlackGroupSkin;
        }
        var __egretProto__ = ActivityBlackGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this._activityBlackBoxItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityBlackBoxItemRenderer);
            this.blackData = [];
            this.onAddList();
            this.loadNewList();
            this.setTitleText();
            this.setDiamondText();
            this.setBgImg();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.resetBtn) {
                gm.gameUI.showLoadingLayer();
                gm.dataManage.refreshMarket(function () {
                    localStorage.removeItem("newMarket");
                    this.loadNewList();
                    this.setDiamondText();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.onUpdateList = function () {
            var data;
            var market = gm.dataManage.newMarket.market;
            this.blackData = [];
            _.each(market, function (v) {
                data = {
                    id: parseInt(v.id),
                    updateFunction: function () {
                        this.updateList();
                        this.setDiamondText();
                    }.bind(this),
                    base: {
                        touchBtnDisabledTimeoutIndex: -1,
                        touchBtnDisabledTimeout: 0,
                        touchBtnDisabled: true
                    }
                };
                this.blackData.push(data);
            }.bind(this));
            this.blackCollection.replaceAll(this.blackData);
        };
        __egretProto__.onAddList = function () {
            var collection = this.blackCollection = new egret.gui.ArrayCollection(this.blackData);
            this.blackList.dataProvider = collection;
            this.blackList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
        };
        __egretProto__.updateList = function () {
            _.each(this.blackCollection.source, function (v) {
                this.blackCollection.itemUpdated(v);
            }.bind(this));
        };
        __egretProto__.loadNewList = function () {
            var newMarket = JSON.parse(localStorage.getItem("newMarket"));
            var data;
            if (null == newMarket) {
                this.addNewMarket();
            }
            else {
                var currTime = moment().valueOf();
                var createTime = newMarket.createTime;
                var setoffTime = 3 * 60 * 60 * 1000;
                if ((currTime - createTime) > setoffTime) {
                    this.addNewMarket();
                }
                else {
                    gm.dataManage.newMarket = newMarket;
                }
            }
            this.onUpdateList();
            this.setTimeStatus();
        };
        __egretProto__.addNewMarket = function () {
            var data;
            data = {
                createTime: moment().valueOf(),
                market: _.sample(Conf.market, 4),
                times: {}
            };
            gm.dataManage.newMarket = data;
            localStorage.setItem("newMarket", JSON.stringify(data));
        };
        __egretProto__.getItemRender = function (event) {
            return this._activityBlackBoxItemRenderer;
        };
        __egretProto__.setTimeStatus = function () {
            var time = this.getSetOffTime();
            if (this.timeOutIdx != -1) {
                egret.clearInterval(this.intervalIdx);
            }
            if (this.timeOutIdx != -1) {
                egret.clearTimeout(this.timeOutIdx);
            }
            this.intervalIdx = egret.setInterval(this.setTimeText.bind(this), this, 1000);
            this.timeOutIdx = egret.setTimeout(function () {
                egret.clearInterval(this.intervalIdx);
                localStorage.removeItem("newMarket");
                this.loadNewList();
            }.bind(this), this, time);
            this.setTimeText();
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
        __egretProto__.setTimeText = function () {
            var time = this.getSetOffTime();
            this.timeLbl.text = Util.formatTime(Math.floor(time / 1000), true);
        };
        __egretProto__.setTitleText = function () {
            //var startText = moment(this.startTime).format("MM月DD日 HH:mm:ss");
            //var endText = moment(this.endTime).format("MM月DD日 HH:mm:ss");
            //var text = _.sprintf("活动时间：<font color='#ffc61a'>%s-%s</font>",startText,endText);
            //Util.setStyleText(this.titleLbl,text);
        };
        __egretProto__.setDiamondText = function () {
            this.diamondLbl.text = "" + gm.dataManage.data.diamond;
        };
        __egretProto__.setBgImg = function () {
            var url = Util.getImageUrl("activity_bg_black");
            RES.getResByUrl(url, function (event) {
                this.bgImg.source = event;
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityBlackGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityBlackGroup = ActivityBlackGroup;
    ActivityBlackGroup.prototype.__class__ = "uiskins.ActivityBlackGroup";
})(uiskins || (uiskins = {}));
