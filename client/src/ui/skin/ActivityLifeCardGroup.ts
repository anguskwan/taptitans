module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityLifeCardGroup extends egret.gui.SkinnableComponent {
		public buyBtnLbl:egret.gui.Label;
		public buyBtn:egret.gui.Button;
		public background:egret.gui.UIAsset;
		public validTimeLabel:egret.gui.Label;

		closeFunction: any;

		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;
			this.skinName = skins.components.ActivityLifeCardGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setBackgroundImg();

			this.loadCheckIfHasPurchaseLifeCard();

			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.LIFE_CARD);
			if (!!activityInfo){
				this.validTimeLabel.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
			} else {
				this.validTimeLabel.text  = "";
			}
			//var begin=gm.dataManage.activityTime.activity[1].beginTime;
			//var end=gm.dataManage.activityTime.activity[1].endTime;
			//this.validTimeLabel.text=Util.formatActivityDate(begin,end);
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.buyBtn && this.buyBtn.enabled){
				gm.gameUI.showLoadingLayer();

				gm.network.buyLifeCard( function(data) {
					gm.dataManage.data.isBoughtLifeCard = data.isBoughtLifeCard;
                    this.loadCheckIfHasPurchaseLifeCard();

					gm.postMessage(consts.kMessageBuyLifeCard);

					gm.dataManage.getVipLevel( function() {
						gm.postMessage(consts.kMessageGetVipLevel);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this), function() {
				});
			}
		}

		setBackgroundImg(){
			var url = Util.getImageUrl("activity_bg_lifecard");
			RES.getResByUrl(url, function (event) {
				this.background.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		loadCheckIfHasPurchaseLifeCard() {
			if (!gm.dataManage.data.isBoughtLifeCard) {
				this.buyBtnLbl.text = "￥188"
				this.buyBtn.enabled = true;
			}
			else {
				this.buyBtnLbl.text = "已购买"
				this.buyBtn.enabled = false;

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