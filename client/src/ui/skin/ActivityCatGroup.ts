module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityCatGroup extends egret.gui.SkinnableComponent {
		public catBgImg:egret.gui.UIAsset;
		public needDiamond:egret.gui.Label;
		public currDiamond:egret.gui.Label;
		public highestDiamond:egret.gui.Label;
		public currTimeLbl:egret.gui.Label;
		public getRewardBtn:egret.gui.Button;
		public itemLbl5:egret.gui.Label;
		public itemLbl4:egret.gui.Label;
		public itemLbl3:egret.gui.Label;
		public itemLbl2:egret.gui.Label;
		public itemLbl1:egret.gui.Label;
		private times:any;
		private diamond:any;
		private intervalIndex:any;
		private endTime:any;
		public constructor() {
			super();
			this.times = -1;
			this.diamond = 0;
			this.intervalIndex = -1;
			this.endTime = "2016-02-12 23:59:00";
			this.skinName = skins.components.ActivityCatGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setCatInfo();
			this.setCatBgImg();
			this.onInitTime();
		}

		public setTimeString(){
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.CAT_GO);
			if (!!activityInfo){
				this.currTimeLbl.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
			} else {
				this.currTimeLbl.text  = "";
			}
			//var begin=gm.dataManage.activityTime.activity[2].beginTime;
			//var end=gm.dataManage.activityTime.activity[2].endTime;
			//this.currTimeLbl.text=Util.formatActivityDate(begin,end);
		}

		onInitTime(){
			var currTime = new Date().getTime();
			var endTime = new Date(this.endTime).getTime();
			if(Util.isOpenCat()){
				egret.setTimeout(function(){
					//this.currTimeLbl.text = "活动已结束";
					this.setTimeString();
					this.getRewardBtn.enabled = false;
				}.bind(this),this,(endTime - currTime));
				this.setActivityTime();
			}
			else {
				//this.currTimeLbl.text = "活动已结束";
				this.setTimeString();
				this.getRewardBtn.enabled = false;
			}
		}

		setActivityTime(){
			//this.currTimeLbl.text = moment(this.endTime).format("MM月DD日") + " 24点";
			this.setTimeString();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.getRewardBtn && this.getRewardBtn.enabled){
				this.getRewardBtn.enabled = false;
				gm.gameUI.showLoadingLayer();
				tt.ActivityManage.catGo(function(data){
					this.getRewardBtn.enabled = true;
					this.times = data.times;
					this.diamond = data.diamond;
 					this.onUpdate(true);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		setCatBgImg(){
			var url = Util.getImageUrl("activity_bg_cat2");
			RES.getResByUrl(url, function (event) {
				this.catBgImg.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		setCatInfo(){
			gm.gameUI.showLoadingLayer();
			tt.ActivityManage.catInfo(function(data){
				this.times = data.times;
				this.onUpdate(false);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		onUpdate(isUpdate){
			this.setHighestDiamondText();
			this.setNeedDiamondText();
			this.setCurrDiamondText();
			this.setGetRewardBtn();
			if(isUpdate){
				this.setGetDiamondText();
			}
		}

		setHighestDiamondText(){
			var meta = Conf.activityCat;
			var id = this.times + 1;
			if(meta[id]){
				this.highestDiamond.text = meta[id].max + "";
			}
			else {
				this.highestDiamond.text = "-";
			}
		}

		setNeedDiamondText(){
			var meta = Conf.activityCat;
			var id = this.times + 1;
			if(meta[id]) {
				this.needDiamond.text = meta[id].cost + "";
			}
			else {
				this.needDiamond.text = "-";
			}
		}

		setCurrDiamondText(){
			this.currDiamond.text = gm.dataManage.data.diamond + "";
		}

		setGetDiamondText(){
			var diamond:any;
			var meta = Conf.activityCat;
			var id = this.times;
			if(meta[id]){
				diamond = this.diamond + meta[id].cost;
			}
			else {
				diamond = 0;
			}
			var diamondList = _.chars(diamond.toString());
			var size = 5 - diamondList.length;
			for(var i = 0;i < size;i++){
				diamondList.splice(0,0,"0");
			}
			for(var j = 0;j < 5;j++){
				var index = j + 1;
				this["itemLbl" + index].text = diamondList[j];
			}
		}

		setGetRewardBtn(){
			var id = this.times + 1;
			var meta = Conf.activityCat;
			if(meta[id]){
				var vip = gm.dataManage.data.vip;
				this.getRewardBtn.enabled = (vip >= meta[id].limit);
			}
			else {
				this.getRewardBtn.enabled = false;
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
