module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class DailyTaskItemList extends egret.gui.ItemRenderer {
        public btnItem: uiskins.CommonItemButton;
        public iconImg: egret.gui.UIAsset;
        public titleLbl: egret.gui.Label;
        public countLbl:egret.gui.Label;
        public gainedImg: egret.gui.UIAsset;

        private dailyData: {};

        private config: {};
        private rewardType: string;

        public constructor() {
            super();
            this.skinName = skins.components.DailyTaskItemListSkin;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);

            gm.registerMessage(consts.kMessageGainDailyTask, this.refreshData, this);
        }

        refreshData() {
            console.log("Refresh Daily task item list");
            this.dataChanged();
        }

        onTouchLayer(event:egret.TouchEvent){
            gm.dataManage.gainDailyTaskReward(this.data["id"]);
        }

        public dataChanged() {
            super.dataChanged();

            //console.log("daily task item data:");
            //console.log(this.data);

            this.config = Conf.dailyTask[this.data["id"]];

            //console.log("daily task item config:");
            //console.log(this.config);

            this.dailyData = gm.dataManage.data.dailyTask;

            //console.log("dailyData:");
            //console.log(this.dailyData);

            this.setTitleText();
            this.setIconImg();
            this.setCountLbl();

            this.setRewardBtn();

            this.setRewardGainedStatus();
        }

        setRewardGainedStatus() {
            if( gm.dataManage.isDailyTaskRewardGained(this.data.id) ) {
                this.gainedImg.visible = true;
                this.btnItem.visible = false;
            }
            else {
                this.gainedImg.visible = false;
                this.btnItem.visible = true;
            }
        }

        setRewardBtn() {
            this.setRewardType();
            this.setRewardBtnImg();
            this.setRewardLabel();

            this.setRewardBtnStatus();
        }

        setRewardType() {
            this.rewardType = "diamond";

            if (this.config["gold"] > 0) {
                this.rewardType = "coin";
            }
            else if (this.config["crystal"] > 0) {
                this.rewardType = "crystal";
            }
            else if (this.config["relic"] > 0) {
                console.log("current reward type: " + this.rewardType + ", config" + this.config);
                this.rewardType = "relic";
            }
            else if (this.config["fragment"] > 0) {
                this.rewardType = "fragment";
            }

            console.log("current reward type: " + this.rewardType + "," +
                this.config["diamond"] + "," + this.config["gold"] + ","  +
                this.config["crystal"] + "," + this.config["relic"] + "," +
                this.config["fragment"] + this.config);
        }

        setTitleText(){
            this.titleLbl.text = this.getTitle();
        }

        getTitle(){
            var desc = this.config["title"].replace("%d","%s");
            return _.sprintf(desc, Util.formatNumber(this.config["target"]));
        }

        setRewardBtnImg() {
            this.btnItem.iconImg.source = this.rewardType;
        }

        setRewardLabel() {
            if (this.rewardType == "coin") {
                this.btnItem.iconLbl.text = Util.formatNumber(gm.dataManage.getDailyTaskGoldReward(this.data.id));
                return;
            }

            if (this.rewardType == "relic") {
                this.btnItem.iconLbl.text = Util.formatNumber(gm.dataManage.getDailyTaskRelicReward(this.data.id));
                return;
            }

            this.btnItem.iconLbl.text = this.config[this.rewardType];
        }

        setIconImg(){
            var iconIndex = this.data.id - 1;
            iconIndex = iconIndex % constsLocal.kDailyTaskTypeCount + 1;
            this.iconImg.source = "iconItem_json.dailyTask" + iconIndex;
        }

        setCountLbl(){
           this.countLbl.text = _.sprintf("%s/%s", Util.formatNumber(this.getCurrentCount()), Util.formatNumber(this.getTargetCount()));
        }

        getCurrentCount() {
            return this.dailyData[this.config["name"]];
        }

        getTargetCount() {
            return this.config["target"];
        }

        setRewardBtnStatus(){
            if ( gm.dataManage.isDailyTaskRewardAvailable(this.data.id) ) {
                this.btnItem.enabled = true;
                this.btnItem.setBtnSkinName("btn_orange");
                this.btnItem.textLbl.text = "领取";
                return;
            }

            this.btnItem.enabled = false;
            this.btnItem.setBtnSkinName("btn_disabled");
            this.btnItem.textLbl.text = "奖励";
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void{
            super.partRemoved(partName,instance);
        }
    }
}
