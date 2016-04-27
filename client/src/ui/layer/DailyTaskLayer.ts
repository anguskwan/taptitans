/**
 *
 * @author
 *
 */
class DailyTaskLayer extends egret.gui.SkinnableComponent {
    public btnBack : egret.gui.Button;
    public list : egret.gui.List;
    public data : any;
    public collection : egret.gui.ArrayCollection;

    public refreshLbl: egret.gui.Label;
    public refreshGroup: egret.gui.Group;
    public refreshBtn: egret.gui.Button;
    public costLbl: egret.gui.Label;

    public constructor() {
        super();
        this.skinName = skins.dialog.DailyTaskLayerSkin;
    }

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.data = [];

        this.initList();
        this.updateRefreshBtnStatus();

        gm.registerMessage(consts.kMessageRefreshDailyTask, this.onRefreshDailyTask, this);
        gm.registerMessage(consts.kMessageGainDailyTask, this.onGainDailyTask, this);
    }

    onGainDailyTask() {
        console.log("Daily task layer: onGainDailyTask");
        this.updateRefreshBtnStatus();
    }

    onRefreshDailyTask() {
        console.log("Daily task layer: onRefreshDailyTask");
        this.initList();
        this.updateRefreshBtnStatus();
    }

    onRefreshDailyTaskBtnClick(){
        console.log("begin refresh daily Task");

        if (!gm.dataManage.costMoney(consts.kDailyTaskRefreshCost[gm.dataManage.data.dailyTask.dailyTask], "diamond")) {
            console.log("diamond is not enough to refresh daily task");
            return false;
        }

        gm.network.sendAction("refreshDailyTask", {}, function(data) {
            console.log("refresh daily Task success");

            gm.dataManage.data.dailyTask.dailyTask += 1;
            gm.postMessage(consts.kMessageRefreshDailyTask);
        }.bind(this));
    }

    updateRefreshBtnStatus() {
        if (!gm.dataManage.isCurrentPageDailyTaskRewardGained()) {
            this.refreshGroup.visible = false;
            return;
        }

        if (gm.dataManage.isAllDailyTaskRewardGained()) {
            console.log("All Daily Task Reward Gained")
            this.refreshGroup.visible = false;
            return;
        }

        this.costLbl.text = consts.kDailyTaskRefreshCost[gm.dataManage.data.dailyTask.dailyTask];
        this.refreshGroup.visible = true;
    }

    updateListStatus(){
        _.each(this.collection.source,function(v){
            this.collection.itemUpdated(v);
        }.bind(this))
    }

    initList(){
        console.log(gm.dataManage.data.dailyTask);

        var dailyTaskIDs = gm.dataManage.getCurrentDailyTaskIDs();
        this.data = [];

        _.forEach(dailyTaskIDs, function(id) {
            this.data.push(Conf.dailyTask[id]);
        }.bind(this));

        console.log("this.data:");
        console.log(this.data);

        var collection: egret.gui.ArrayCollection = new egret.gui.ArrayCollection(this.data);
        this.list.dataProvider = collection;
        this.list.itemRenderer = new egret.gui.ClassFactory(uiskins.DailyTaskItemList);
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();

        if(event.target == this.btnBack){
            gm.removeMessage(consts.kMessageRefreshDailyTask, this.onRefreshDailyTask, this);
            gm.removeMessage(consts.kMessageGainDailyTask, this.onGainDailyTask, this);
            gm.guiLayer.removeElement(this);
        }

        if(event.target == this.refreshGroup ||
            event.target == this.refreshBtn ||
            event.target == this.refreshLbl ||
            event.target == this.costLbl) {
            this.onRefreshDailyTaskBtnClick();
        }
    }

//    public isTouchUpgradeBtn(currBtn,touchBtn):boolean{
//        return (currBtn == touchBtn);
//    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
