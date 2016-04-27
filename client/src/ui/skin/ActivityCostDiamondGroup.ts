module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityCostDiamondGroup extends egret.gui.SkinnableComponent {
		public diamondLbl:egret.gui.Label;
		public timeTextLbl:egret.gui.Label;


		public costDiamondList:egret.gui.List;
		public costDiamondData:any;
		public costDiamondCollection:egret.gui.ArrayCollection;
		private _activityCostDiamondItemRenderer:egret.gui.ClassFactory;

		private startTime:any;
		private endTime:any;
		public constructor() {
			super();
			this.startTime = "2016-02-13";
			this.endTime = "2016-02-22";
			this.skinName = skins.components.ActivityCostDiamondGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._activityCostDiamondItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityCostDiamondItemRenderer);
			this.costDiamondData = [];
			this.onInitList();
			this.setTimeText();
		}

		onTouchLayer(event:egret.TouchEvent){

		}

		onInitList(){
			gm.gameUI.showLoadingLayer();
			tt.ActivityManage.activityInfo("diamond",function(data){
				this.setCurrPurchaseText();
				_.each(Conf.activityDiamond,function(v){
					v["updateFunction"] = function(){
						this.updateList();
					}.bind(this);
					this.costDiamondData.push(v);
				}.bind(this));
				var collection:egret.gui.ArrayCollection = this.costDiamondCollection = new egret.gui.ArrayCollection(this.costDiamondData);
				this.costDiamondList.dataProvider = collection;
				this.costDiamondList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		getItemRender(event){
			return this._activityCostDiamondItemRenderer;
		}

		updateList(){
			_.each(this.costDiamondCollection.source,function(v){
				this.costDiamondCollection.itemUpdated(v);
			}.bind(this));
		}

		setTimeText(){
			//var startText = moment(this.startTime).format("MM月DD日");
			//var endText = moment(this.endTime).format("MM月DD日");
			//this.timeTextLbl.text = "活动时间：" + startText + "更新完成" + " - " + endText + " 24点";
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.TOTAL_DIAMOND_CONSUMPTION);
			if (!!activityInfo){
				this.timeTextLbl.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
			} else {
				this.timeTextLbl.text  = "";
			}
			//var begin=gm.dataManage.activityTime.activity[5].beginTime;
			//var end=gm.dataManage.activityTime.activity[5].endTime;
			//this.timeTextLbl.text=Util.formatActivityDate(begin,end);
		}

		setCurrPurchaseText(){
			var count = gm.dataManage.costDiamondActivity.count;
			this.diamondLbl.text = _.sprintf("%d",count);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
