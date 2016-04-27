/**
 * Created by tmp on 16/4/15.
 */
var uiskins;
(function (uiskins) {
    var ActivityWorthBox = (function (_super) {
        __extends(ActivityWorthBox, _super);
        function ActivityWorthBox() {
            _super.call(this);
            this.skinName = skins.components.ActivityWorthBoxSkin;
        }
        var __egretProto__ = ActivityWorthBox.prototype;
        __egretProto__.childrenCreated = function () {
            /*
            gm.gameUI.showLoadingLayer();
            tt.ActivityManage.activityInfo("growth_fund",
                (data:any)=>{
                    console.log("数据拉取成功");
                    this.activityData = data;
                    this.initView();
                    gm.gameUI.hideLoadingLayer();
                },

                ()=>{
                    gm.gameUI.hideLoadingLayer();
                }
            );
            */
            this.initView();
            //攻击力翻倍
            //gm.dataManage.data.remainAttMulTime
        };
        __egretProto__.initView = function () {
            //btn
            this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBuyBtn, this);
            this.refreshLimitTime();
            this.initEndTime();
        };
        __egretProto__.refreshLimitTime = function () {
            //limitTimes
            var configLimitTimes = Conf.config.treasureChestTimes;
            var curBuyTimes = gm.dataManage.data.dailyEvent.treasureChestTimes;
            var remainTimes = configLimitTimes - curBuyTimes;
            this.lbl_remainTimes.text = "" + remainTimes;
        };
        __egretProto__.initEndTime = function () {
            //activity times
            var activityInfo = ActivityUtil.getActivityInfo(12 /* WORTHBOX */);
            var endTime = activityInfo.endTime;
            var endTimeStr = Util.formatActivityDateThree(endTime);
            this.lblLEndTime.text = endTimeStr;
        };
        __egretProto__.onClickBuyBtn = function (event) {
            console.log("onClickBuyBtn");
            var id = event.target.id;
            if (!gm.dataManage.costMoney(ActivityWorthBox.COSTMONEY, "diamond")) {
            }
            else {
                gm.network.sendAction("buyTreasureChest", {}, function (data) {
                    //add items
                    var meta = Conf.treasureChest;
                    console.log("meta:  " + JSON.stringify(meta));
                    console.log("data:  " + JSON.stringify(data));
                    for (var index in meta) {
                        var dataItem = meta[index];
                        console.log("dataItem:  " + JSON.stringify(dataItem));
                        gm.dataManage.addItem(dataItem.num, dataItem.name);
                    }
                    gm.dataManage.data.dailyEvent.treasureChestTimes = data.treasureChestTimes;
                    gm.dataManage.data.remainAttMulTime = data.remainAttMulTime;
                    this.refreshLimitTime();
                    //add attack double time
                    gm.postMessage(consts.kMessageRefreshFightLabelTIps);
                    gm.postMessage(consts.kMessageShowToastLayer, "领取成功！");
                }.bind(this), function () {
                    console.log("buyTreasureChest fail");
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
            //gm.network.sendAction("buyTreasureChest", {}, (data:any) => {
            // var meta = Conf.activityWorthBox;
            //var itemInfo = meta[id];
            //gm.dataManage.addItem(itemInfo.diamond, "diamond");
            //this.updateFundBtnStatus(id, Status_Fund.OBTAINED);
            //});
        };
        ActivityWorthBox.COSTMONEY = 685;
        return ActivityWorthBox;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityWorthBox = ActivityWorthBox;
    ActivityWorthBox.prototype.__class__ = "uiskins.ActivityWorthBox";
})(uiskins || (uiskins = {}));
