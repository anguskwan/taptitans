module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityThree extends egret.gui.SkinnableComponent {
		public buyBtnLbl:egret.gui.Label;
		public buyBtn:egret.gui.Button;
		public background:egret.gui.UIAsset;
		public validTimeLabel:egret.gui.Label;
		public btnGain:egret.gui.Button;

		public asset1:egret.gui.UIAsset;
		public asset2:egret.gui.UIAsset;
		public asset3:egret.gui.UIAsset;



		closeFunction: any;

		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;
			this.skinName = skins.components.ActivityThreeSkin;


		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setBackgroundImg();

			//var activity = gm.dataManage.activityTime.activity[9];
			//this.validTimeLabel.text = Util.formatActivityDateThree(activity.endTime);
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.FIRST_RECHARGE_GIFT);
			if (!!activityInfo){
				this.validTimeLabel.text = Util.formatActivityDateThree(activityInfo.endTime);
			} else {
				this.validTimeLabel.text  = "";
			}

			this.btnGain.visible=false;
			this.buyBtn.visible=false;


			gm.network.sendAction("getActivityFirstPurchaseGift", {}, (data) => {
				this.reloadData(data);
			});
		}

		reloadData(data:any) {
			console.log('reloadThree',data)

			this.btnGain.visible=false;
			if (!!data.firstPurchaseGiftTime)
			{
				this.buyBtn.visible=false;
			}
			else {
				this.buyBtn.visible=true;
			}

			this.reloadAsset(data,this.asset1,1);
			this.reloadAsset(data,this.asset2,2);
			this.reloadAsset(data,this.asset3,3);
		}

		reloadAsset(data:any,asset:egret.gui.UIAsset,index:number){
			if(data.firstPurchaseGainStatus[index-1]==0)//灰色1，2，3天
			{
				if (index==1)
					asset.source="activity3_1";
				else if (index==2)
					asset.source="activity3_2";
				else
					asset.source="activity3_3";
			}
			else if(data.firstPurchaseGainStatus[index-1]==1)//能够领取
			{
				this.btnGain.x=asset.x;
				this.btnGain.y=asset.y;
				this.btnGain.visible=true;
			}
			else if(data.firstPurchaseGainStatus[index-1]==2)//已领取
			{
				asset.source="activity3_already";
			}
			else										//过期
			{
				asset.source="activity3_pass";
			}
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.btnGain ){
				gm.network.sendAction("gainActivityFirstPurchaseGift", {}, (data) => {
					gm.dataManage.addItem(data.diamond,"diamond");
					this.reloadData(data);
				});
			}
			else if (event.target == this.buyBtn)
			{
				gm.gameUI.showLoadingLayer();
				gm.network.buyThreeDiamond(function(data){
					this.reloadData(data);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		setBackgroundImg(){
			var url = Util.getImageUrl("activity_bg_3");
			RES.getResByUrl(url, function (event) {
				this.background.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}


	}
}