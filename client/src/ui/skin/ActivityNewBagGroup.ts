module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityNewBagGroup extends egret.gui.SkinnableComponent {
		public getRewardLbl:egret.gui.Label;
		public rewardLbl1:egret.gui.Label;
		public getRewardBtn:egret.gui.Button;
		public newBagBgImg:egret.gui.UIAsset;

		public constructor() {
			super();
			this.skinName = skins.components.ActivityNewBagGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setNewBagBgImg();
			this.loadCheckIfHasPurchaseGiftBag();
			this.setReward();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.getRewardBtn && this.getRewardBtn.enabled){
				gm.gameUI.showLoadingLayer();
				gm.dataManage.getDailyPurchaseGiftBag(function(data){
					var arrItem = [];
					_.each(data,function(v,k){
						var item = {
							type:k,
							num:v
						};
						arrItem.push(item);
						gm.dataManage.addItem(v,k);
					}.bind(this));
					var ly = new MessageGetRewardPanel("获得物品",arrItem);
					gm.guiLayer.addElement(ly);
					this.getRewardBtn.enabled = false;
					this.getRewardLbl.text = "已领取";
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this))
			}
		}

		setNewBagBgImg(){
			var url = Util.getImageUrl("activity_bg_newbag");
			RES.getResByUrl(url, function (event) {
				this.newBagBgImg.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		loadCheckIfHasPurchaseGiftBag(){
			gm.gameUI.showLoadingLayer();
			gm.dataManage.checkIfHasPurchaseGiftBag(function(data){
				this.getRewardBtn.enabled = data.result;
				if(data.dailyEvent.purchaseGiftBag){
					this.getRewardLbl.text = "已领取";
				}
				else{
					this.getRewardLbl.text = "领取礼包";
				}
				//this.getRewardLbl.text = gm.network.areaId;
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		setReward(){
			var relic = Math.max(30, gm.dataManage.getRelicsByPrestige() * 0.1);
			this.rewardLbl1.text = Util.formatNumber(relic);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}