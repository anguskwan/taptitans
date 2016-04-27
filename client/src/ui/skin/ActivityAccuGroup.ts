module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityAccuGroup extends egret.gui.SkinnableComponent {
		public currPurchaseLbl:egret.gui.Label;
		public timeTextLbl:egret.gui.Label;


		public accuList:egret.gui.List;
		public accuData:any;
		public accuCollection:egret.gui.ArrayCollection;
		private _activityAccuItemRenderer:egret.gui.ClassFactory;

		private startTime:any;
		private endTime:any;
		public constructor() {
			super();
			this.startTime = "2016-01-01 00:00:00";
			this.endTime = "2016-01-03 23:59:00";
			this.skinName = skins.components.ActivityAccuGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._activityAccuItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityAccuItemRenderer);
			this.accuData = [];
			this.onInitList();
			this.setTimeText();
		}

		onTouchLayer(event:egret.TouchEvent){

		}

		onInitList(){
			gm.gameUI.showLoadingLayer();
			tt.ActivityManage.purchaseInfo(function(data){
				gm.dataManage.purchaseActivity = data;
				this.setCurrPurchaseText();
				_.each(Conf.activityPurchase,function(v){
					v["updateFunction"] = function(){
						this.updateList();
					}.bind(this);
					this.accuData.push(v);
				}.bind(this));
				var collection:egret.gui.ArrayCollection = this.accuCollection = new egret.gui.ArrayCollection(this.accuData);
				this.accuList.dataProvider = collection;
				this.accuList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		updateList(){
			_.each(this.accuCollection.source,function(v){
				this.accuCollection.itemUpdated(v);
			}.bind(this));
		}

		getItemRender(event){
			return this._activityAccuItemRenderer;
		}

		setTimeText(){
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.RECHARGE_GIFT);
			if (!!activityInfo){
				this.timeTextLbl.text = "活动时间：" + Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
			} else {
				this.timeTextLbl.text  = "";
			}
			//var beginTime = gm.dataManage.activityTime.activity[8].beginTime;
			//var endTime = gm.dataManage.activityTime.activity[8].endTime;
			//this.timeTextLbl.text = "活动时间：" + Util.formatActivityDate(beginTime, endTime);
		}

		setCurrPurchaseText(){
			var count = gm.dataManage.purchaseActivity.count;
			this.currPurchaseLbl.text = _.sprintf("你当前已累计充值：%d",count);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
