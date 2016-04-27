module uiskins {
	/**
	 *
	 * @author
	 *
	 */
	export class ActivityEggGroup extends egret.gui.SkinnableComponent {
		public validTimeLabel: egret.gui.Label;
		public canGetHammerCountLbl: egret.gui.Label;
		public todayGainCrystalLbl: egret.gui.Label;
		public hammerCountLbl: egret.gui.Label;

		public buyBtn:egret.gui.Button;
		public background:egret.gui.UIAsset;

		public egg1: egret.gui.Button;
		public egg2: egret.gui.Button;
		public egg3: egret.gui.Button;
		public egg4: egret.gui.Button;

		private eggImageArray: egret.gui.Button[];
		private EGG_SUM = 4;
		private HAMMER_SUM_ONE_DAY = 10;
		private HAMMER_GET_PER_PURCHASE = 12;
		private SMASH_DIAMOND_PRICE = 30;

		closeFunction: any;

		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;

			this.eggImageArray = [];
			this.skinName = skins.components.ActivityEggGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setBackgroundImg();
			this.refreshDisplayDate();

			this.eggImageArray.push(this.egg1);
			this.eggImageArray.push(this.egg2);
			this.eggImageArray.push(this.egg3);
			this.eggImageArray.push(this.egg4);

			gm.network.sendAction("getGoldenEggsInfo", {}, (data) => {
				console.log(`EggActivity: getGoldEggsInfo, goldEggsHammersNum=${data.goldEggsHammersNum}, goldEggsTotalReward=${data.goldEggsTotalReward}, goldEggsPurchaseNum=${data.goldEggsPurchaseNum}`)
				gm.dataManage.data.goldEggsHammersNum = data.goldEggsHammersNum;
				gm.dataManage.data.goldEggsPurchaseNum = data.goldEggsPurchaseNum;
				gm.dataManage.data.dailyEvent.goldEggsTotalReward = data.goldEggsTotalReward;
				gm.dataManage.data.goldEggs = data.goldEggs;

				this.refreshCountLabel();
				this.refreshEggDisplay();
			});
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.buyBtn && this.buyBtn.enabled) {
				gm.postMessage(consts.kMessageSelectShopPay);
				Util.invokeCallback(this.closeFunction);
				return;
			}

			for(var i = 0; i < this.EGG_SUM; ++i) {
				if(event.target == this.eggImageArray[i]) {
					if (gm.dataManage.data.goldEggsHammersNum <= 0) {
						gm.postMessage(consts.kMessageShowToastLayer, "锤子不足");
						return;
					}

					if (gm.dataManage.data.diamond < this.SMASH_DIAMOND_PRICE) {
						gm.postMessage(consts.kMessageShowToastLayer, "钻石不足");
						return;
					}
					console.log("EggActivity: goldEggsHammersNum=" + gm.dataManage.data.goldEggsHammersNum);
					gm.dataManage.data.goldEggsHammersNum -= 1;
					console.log("EggActivity: goldEggsHammersNum=" + gm.dataManage.data.goldEggsHammersNum);
					console.log("EggActivity: Try to smash the egg, index=" + i);
					gm.network.sendAction("smashingGoldenEggs", {pos: i + 1}, (data) => {
						console.log(`EggActivity: getGoldEggsInfo, goldEggsHammersNum=${data.goldEggsHammersNum}, goldEggsTotalReward=${data.goldEggsTotalReward}`)

						gm.dataManage.data.goldEggsHammersNum = data.goldEggsHammersNum;
						gm.dataManage.data.dailyEvent.goldEggsTotalReward = data.goldEggsTotalReward;
						gm.dataManage.data.goldEggs = data.goldEggs;

						gm.dataManage.costMoney(this.SMASH_DIAMOND_PRICE, "diamond");
						gm.dataManage.addMoney(data.goldEggsCrystal, "crystal");

						this.refreshCountLabel();
						this.refreshEggDisplay();

						var ly = new MessageGetRewardPanel("领取奖励",[{type:"crystal", num:data.goldEggsCrystal}]);
						gm.guiLayer.addElement(ly);
					});
				}
			}
		}

		setBackgroundImg(){
			var url = Util.getImageUrl("activity_bg_egg");
			RES.getResByUrl(url, function (event) {
				this.background.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		resetEggDisplay() {
			for (var i = 0; i < this.eggImageArray.length; ++i) {
				this.eggImageArray[i].enabled = true;
			}
		}

		refreshDisplayDate(){
			var activityInfo = ActivityUtil.getActivityInfo(ActivityType.SMASHING_GOLDEN_EGGS);
			if (!!activityInfo){
				this.validTimeLabel.text = Util.formatActivityDate(activityInfo.beginTime, activityInfo.endTime);
			} else {
				this.validTimeLabel.text  = "";
			}
			//var activity = gm.dataManage.activityTime.activity[4];
			//this.validTimeLabel.text = Util.formatActivityDate(activity.beginTime, activity.endTime);
			//console.warn("~~~~~validTimeLabel " + this.validTimeLabel.text);
		}

		refreshEggDisplay() {
			this.resetEggDisplay();

			var goldEggs = gm.dataManage.data.goldEggs;
			console.log("EggActivity: Gold Eggs = " + JSON.stringify(goldEggs));

			for (var i = 0; i < goldEggs.length; ++i) {
				this.eggImageArray[goldEggs[i].pos - 1].enabled = false;
			}
		}

		refreshCountLabel() {
			if (gm.dataManage.data.goldEggsHammersNum < 0) gm.dataManage.data.goldEggsHammersNum = 0;
			this.hammerCountLbl.text = gm.dataManage.data.goldEggsHammersNum;
			this.todayGainCrystalLbl.text = gm.dataManage.data.dailyEvent.goldEggsTotalReward;
			this.canGetHammerCountLbl.text = (this.HAMMER_SUM_ONE_DAY - Math.floor(gm.dataManage.data.goldEggsPurchaseNum / this.HAMMER_GET_PER_PURCHASE)).toString();

			console.log(`EggActivity: goldEggsHammersNum=${gm.dataManage.data.goldEggsHammersNum}, goldEggsTotalReward=${gm.dataManage.data.dailyEvent.goldEggsTotalReward}`)
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}