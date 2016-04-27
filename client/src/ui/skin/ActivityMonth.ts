module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityMonth extends egret.gui.SkinnableComponent {
		public rightBtn1:egret.gui.Button;
		public rightBtn2:egret.gui.Button;
		public rightBtn3:egret.gui.Button;

		public background:egret.gui.UIAsset;
		public validTimeLabel:egret.gui.Label;

		private word1="已拥有";

		closeFunction: any;

		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;
			this.skinName = skins.components.ActivityMonthSkin;


		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setBackgroundImg();
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.MONTH_CARD);
			if (!!activityInfo){
				this.validTimeLabel.text = Util.formatActivityDateThree(activityInfo.endTime);
			} else {
				this.validTimeLabel.text  = "";
			}
			//var activity = gm.dataManage.activityTime.activity[10];
			//this.validTimeLabel.text = Util.formatActivityDate(activity.beginTime,activity.endTime);
			//this.validTimeLabel.text = Util.formatActivityDateThree(activity.endTime);

			this.reloadData();

		}

		reloadData(data?:any) {
			//console.log('reloadMonth',data)
			this.rightBtn1._setLabel(this.word1);
			this.rightBtn2._setLabel(this.word1);
			this.rightBtn3._setLabel(this.word1);
			this.rightBtn1.enabled=false;
			this.rightBtn2.enabled=false;
			this.rightBtn3.enabled=false;

			if (!gm.dataManage.data.isBoughtLifeCard)
			{
				this.rightBtn1.enabled=true;
				this.rightBtn1._setLabel("￥"+Conf.payment[314].cost);
			}
			if (gm.dataManage.remainSupMonthCardDays() < 0)
			{
				this.rightBtn2.enabled=true;
				this.rightBtn2._setLabel("￥"+Conf.payment[313].cost);
			}
			if (gm.dataManage.remainMonthCardDays() < 0)
			{
				this.rightBtn3.enabled=true;
				this.rightBtn3._setLabel("￥"+Conf.payment[311].cost);
			}

		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.rightBtn1 ){
				console.log('rightBtn1')

				gm.gameUI.showLoadingLayer();
				gm.network.buyLifeCard( function(data) {
					gm.dataManage.data.isBoughtLifeCard = data.isBoughtLifeCard;
					this.reloadData();

					gm.postMessage(consts.kMessageBuyLifeCard, {currBuy:true, index:1});

					gm.dataManage.getVipLevel( function() {
						gm.postMessage(consts.kMessageGetVipLevel);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this), function() {
				});

			}
			else if (event.target == this.rightBtn2)
			{
				console.log('rightBtn2')

				gm.gameUI.showLoadingLayer();
				gm.network.buySupMonthCard(function(data){
					gm.dataManage.data.supMonthCardTime = data.time;
					gm.postMessage(consts.kMessageBuySupMonthCard,{currBuy:true,index:1});

					this.reloadData();

					gm.dataManage.getVipLevel(function(){
						gm.postMessage(consts.kMessageGetVipLevel);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
			else if (event.target == this.rightBtn3)
			{
				console.log('rightBtn3')

				gm.gameUI.showLoadingLayer();
				gm.network.buyMonthCard(function(data){
					gm.dataManage.data.monthCardTime = data.time;
					gm.postMessage(consts.kMessageBuyMonthCard,{currBuy:true,index:1});
					this.reloadData();

					gm.dataManage.getVipLevel(function(){
						gm.postMessage(consts.kMessageGetVipLevel);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		setBackgroundImg(){
			var url = Util.getImageUrl("activity_bg_month");
			RES.getResByUrl(url, function (event) {
				this.background.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}


	}
}