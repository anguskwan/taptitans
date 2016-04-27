module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityVipGroup extends egret.gui.SkinnableComponent {
		public payBtn:egret.gui.Button;
		public rightBtn:egret.gui.Button;
		public leftBtn:egret.gui.Button;
		public getRewardBtn:egret.gui.Button;
		public getRewardLbl:egret.gui.Label;
		public getRewardGroup:egret.gui.Group;
		public listGroup:egret.gui.Group;
		public vipLbl:egret.gui.BitmapLabel;
		public progress:uiskins.ActivityProgressBar;
		public payGroup:egret.gui.Group;
		public rewardGroup:egret.gui.Group;
		public payTitleLbl:egret.gui.Label;
		public payVipLbl:egret.gui.BitmapLabel;
		public vipTitleLbl:egret.gui.Label;
		public rewardTitleLbl:egret.gui.Label;
		public pageIndex:any;
		public currVip:any;
		public rewardArr:any;
		public closeFunction:any;
		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;
			this.pageIndex = -1;
			this.currVip = -1;
			this.rewardArr = [];
			this.skinName = skins.components.ActivityVipGroupSkin;

			gm.registerMessage(consts.kMessageGetVipLevel, this.setPageIndex, this);
		}

		getExplanationByIndex(index){
			var meta = Conf.vip[index];
			var expDict = {
				1:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						"<font color='#00ff00'>12</font>元充值档增益<font color='#00ff00'>44%</font>",
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
					]
				},
				2:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						"<font color='#00ff00'>30</font>元充值档增益<font color='#00ff00'>44%</font>",
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero)
					]
				},
				3:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						"<font color='#00ff00'>68</font>元充值档增益<font color='#00ff00'>44%</font>",
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero)
					]
				},
				4:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						"<font color='#00ff00'>168</font>元充值档增益<font color='#00ff00'>44%</font>",
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100)
					]
				},
				5:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						"<font color='#00ff00'>328</font>元充值档增益<font color='#00ff00'>44%</font>",
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon)
					]
				},
				6:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon)
					]
				},
				7:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100)
					]
				},
				8:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100)
					]
				},
				9:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100)
					]
				},
				10:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100)
					]
				},
				11:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100)
					]
				},
				12:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100),
						_.sprintf("每天可领取蜕变圣物的<font color='#00ff00'>+%d%%</font>",meta.dailyRelic*100)
					]
				},
				13:{
					desc:[
						_.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权",meta.purchase,index),
						_.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>",meta.relicPerTen),
						_.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍",meta.relicByHero),
						_.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>",meta.prestigeCost*100),
						_.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>",meta.dailyBossDiamond*100),
						_.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>",meta.dailyBossWeapon),
						_.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>",meta.donate),
						_.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>",meta.offlineRelic*100),
						_.sprintf("每天可领取蜕变圣物的<font color='#00ff00'>+%d%%</font>",meta.dailyRelic*100)
					]
				}
			};
			return expDict[index];
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setPageIndex();
		}

		setPageIndex(){
			gm.gameUI.showLoadingLayer();
			gm.dataManage.getVipLevel(function(data){
				this.pageIndex = data.vip || 1;
				this.currVip = data.vip;
				this.setTitleStatus();
				this.setRewardBtnAndText();
				this.setRightAndLeftBtn();
				this.setExplanationList();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		setTitleStatus(){
			this.setPayTitle();
			this.setVipTitleText();
		}

		setPayTitle(){
			var vip = Math.min(13,this.currVip + 1);
			var meta = Conf.vip[vip];
			var purchase = gm.dataManage.data.purchaseNum || 0;
			var willPay = meta.purchase - purchase;
			var costPay = willPay < 0 ? 0:willPay;
			var text = _.sprintf("在充值<font color='#00ff00'>%d</font>元即可成为",costPay);
			Util.setStyleText(this.payTitleLbl,text);
			this.payVipLbl.text = _.sprintf("V%d",vip);
			this.setPayProgress(purchase,meta.purchase);
		}

		setPayProgress(curr,max){
			this.progress.maximum = max;
			this.progress.value = curr;
			this.progress.numLbl.text = _.sprintf("%d/%d",curr,max);
		}

		setVipTitleText(){
			var vip = Math.min(13,this.currVip);
			this.vipLbl.text = _.sprintf("V%d",vip);
		}

		setRewardBtnAndText(){
			var vipGift = gm.dataManage.data.vipGift || [];
			var isGetReward = vipGift[this.pageIndex] || 0;
			var isGetVipLv =  this.currVip < this.pageIndex;
			this.getRewardGroup.visible = true;
			if(isGetVipLv){
				this.getRewardBtn.enabled = false;
				this.getRewardLbl.text = "领取";
			}
			else{
				if(isGetReward){
					this.getRewardBtn.enabled = false;
					this.getRewardLbl.text = "已领取";
				}
				else {
					this.getRewardBtn.enabled = true;
					this.getRewardLbl.text = "领取";
				}
			}
		}

		setRightAndLeftBtn(){
			if(this.pageIndex == 1){
				this.leftBtn.visible = false;
				this.rightBtn.visible = true;
			}
			else if(this.pageIndex == 13){
				this.leftBtn.visible = true;
				this.rightBtn.visible = false;
			}
			else {
				this.rightBtn.visible = true;
				this.leftBtn.visible = true;
			}
		}

		setExplanationList(){
			this.vipTitleLbl.text = _.sprintf("V%d",this.pageIndex);
			this.rewardTitleLbl.text = _.sprintf("V%d超值礼包",this.pageIndex);
			this.setRewardGroup();
			this.setListExpGroup();
		}

		setListExpGroup(){
			this.listGroup.removeAllElements();
			var info = this.getExplanationByIndex(this.pageIndex);
			_.each(info.desc,function(v){
				this.addExp(v);
			}.bind(this))
		}

		setRewardGroup(){
			this.rewardGroup.removeAllElements();
			this.rewardArr = [];
			var info = gm.dataManage.vipInfo(this.pageIndex);
			_.each(info, function(v, k) {
				this.setAddItem(v,k);
			}.bind(this))
		}

		setAddItem(num,type){
			switch (type) {
				case 'gold':
				case 'diamond':
				case 'relic':
				case 'crystal':
				case 'weaponItem':
				case 'goldRain':
				case 'autoTap':
				case 'doom':
				case 'refreshSkill':
				case 'powerOfHolding':
				case 'set':
					this.addItem(num,type);
					break;
				default:
					break;
			}
		}

		addItem(numCount,type){
			if(numCount == 0){return;}
			this.rewardArr.push({type:type,num:numCount});
			var icon = gm.gameUI.getElementTypeSource(type).icon;
			var iconImg = new egret.gui.UIAsset();
			iconImg.width = 58;
			iconImg.height = 58;
			iconImg.source = icon;
			var group = new egret.gui.Group();
			group.width = 58;
			group.height = 58;

			var num = new egret.gui.Label();
			num.size = 18;
			num.fontFamily = "Arial";
			num.horizontalCenter = 0;
			num.verticalCenter = 42;
			if(type == "set"){
				num.text = _.sprintf("%d套武器",numCount);
			}
			else {
				num.text = Util.formatNumber(numCount);
			}
			group.addElement(iconImg);
			group.addElement(num);
			this.rewardGroup.addElement(group);
		}

		addExp(desc){
			var group = new egret.gui.Group();
			var layout = new egret.gui.HorizontalLayout();
			layout.gap = 0;
			layout.horizontalAlign="center";
			layout.verticalAlign="middle";
			group.layout = layout;
			var star = new egret.gui.UIAsset();
			star.source = "activity_icon_star";
			var text = new egret.gui.Label();
			text.fontFamily="Arial";
			text.verticalAlign="middle";
			text.textAlign="center";
			text.size= 18;
			Util.setStyleText(text,desc);
			group.addElement(star);
			group.addElement(text);
			this.listGroup.addElement(group);
		}

		prePage(){
			this.pageIndex--;
			this.pageIndex = Math.max(0,this.pageIndex);
			this.setRightAndLeftBtn();
			this.setRewardBtnAndText();
			this.setExplanationList();
		}

		nextPage(){
			this.pageIndex++;
			this.pageIndex = Math.min(13,this.pageIndex);
			this.setRightAndLeftBtn();
			this.setRewardBtnAndText();
			this.setExplanationList();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.payBtn){
				gm.postMessage(consts.kMessageSelectShopPay);
				Util.invokeCallback(this.closeFunction);
			}
			if(event.target == this.getRewardBtn
				&& this.getRewardBtn.enabled){
				gm.gameUI.showLoadingLayer();
				gm.dataManage.getVipGift(this.pageIndex,function(){
					var ly = new MessageGetRewardPanel("领取奖励",this.rewardArr);
					gm.guiLayer.addElement(ly);
					this.getRewardBtn.enabled = false;
					this.getRewardLbl.text = "已领取";
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this))

			}
			if(event.target == this.rightBtn){
				this.nextPage();
			}
			if(event.target == this.leftBtn){
				this.prePage();
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
