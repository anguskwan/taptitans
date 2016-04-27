/**
 *
 * @author
 *
 */
var DailyTaskLayer = (function (_super) {
    __extends(DailyTaskLayer, _super);
    function DailyTaskLayer() {
        _super.call(this);
        this.skinName = skins.dialog.DailyTaskLayerSkin;
    }
    var __egretProto__ = DailyTaskLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.data = [];
        this.initList();
        this.updateRefreshBtnStatus();
        gm.registerMessage(consts.kMessageRefreshDailyTask, this.onRefreshDailyTask, this);
        gm.registerMessage(consts.kMessageGainDailyTask, this.onGainDailyTask, this);
    };
    __egretProto__.onGainDailyTask = function () {
        console.log("Daily task layer: onGainDailyTask");
        this.updateRefreshBtnStatus();
    };
    __egretProto__.onRefreshDailyTask = function () {
        console.log("Daily task layer: onRefreshDailyTask");
        this.initList();
        this.updateRefreshBtnStatus();
    };
    __egretProto__.onRefreshDailyTaskBtnClick = function () {
        console.log("begin refresh daily Task");
        if (!gm.dataManage.costMoney(consts.kDailyTaskRefreshCost[gm.dataManage.data.dailyTask.dailyTask], "diamond")) {
            console.log("diamond is not enough to refresh daily task");
            return false;
        }
        gm.network.sendAction("refreshDailyTask", {}, function (data) {
            console.log("refresh daily Task success");
            gm.dataManage.data.dailyTask.dailyTask += 1;
            gm.postMessage(consts.kMessageRefreshDailyTask);
        }.bind(this));
    };
    __egretProto__.updateRefreshBtnStatus = function () {
        if (!gm.dataManage.isCurrentPageDailyTaskRewardGained()) {
            this.refreshGroup.visible = false;
            return;
        }
        if (gm.dataManage.isAllDailyTaskRewardGained()) {
            console.log("All Daily Task Reward Gained");
            this.refreshGroup.visible = false;
            return;
        }
        this.costLbl.text = consts.kDailyTaskRefreshCost[gm.dataManage.data.dailyTask.dailyTask];
        this.refreshGroup.visible = true;
    };
    __egretProto__.updateListStatus = function () {
        _.each(this.collection.source, function (v) {
            this.collection.itemUpdated(v);
        }.bind(this));
    };
    __egretProto__.initList = function () {
        console.log(gm.dataManage.data.dailyTask);
        var dailyTaskIDs = gm.dataManage.getCurrentDailyTaskIDs();
        this.data = [];
        _.forEach(dailyTaskIDs, function (id) {
            this.data.push(Conf.dailyTask[id]);
        }.bind(this));
        console.log("this.data:");
        console.log(this.data);
        var collection = new egret.gui.ArrayCollection(this.data);
        this.list.dataProvider = collection;
        this.list.itemRenderer = new egret.gui.ClassFactory(uiskins.DailyTaskItemList);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            gm.removeMessage(consts.kMessageRefreshDailyTask, this.onRefreshDailyTask, this);
            gm.removeMessage(consts.kMessageGainDailyTask, this.onGainDailyTask, this);
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.refreshGroup || event.target == this.refreshBtn || event.target == this.refreshLbl || event.target == this.costLbl) {
            this.onRefreshDailyTaskBtnClick();
        }
    };
    //    public isTouchUpgradeBtn(currBtn,touchBtn):boolean{
    //        return (currBtn == touchBtn);
    //    }
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return DailyTaskLayer;
})(egret.gui.SkinnableComponent);
DailyTaskLayer.prototype.__class__ = "DailyTaskLayer";
