module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeroesItemRenderer extends egret.gui.ItemRenderer {
		public iconImg: egret.gui.UIAsset;
		public nameLbl: egret.gui.Label;
		public lvLbl: egret.gui.Label;
		public dpsLbl: egret.gui.Label;
		public iconDisabled:egret.gui.Rect;
		public newTipImg:egret.gui.UIAsset;
		public effectImg:egret.gui.UIAsset;
		public revivalTimeLbl:egret.gui.Label;
		public revivalGroup: egret.gui.Group;
		public buyPopGroup: egret.gui.Group;
		public buyPopBtn0: uiskins.BuyPopButton;
		public buyPopBtn1: uiskins.BuyPopButton;
		public btnItem:uiskins.CommonItemButton;
		public dataItem:any;
		private _clickBtnTime:any;
		private _showPopBtnTime:any;
		private isPlayingAni:any;

		public constructor() {
			super();
			this._clickBtnTime = 0;
			this._showPopBtnTime = 0;
			this.isPlayingAni = false;
			this.dataItem = {};
			this.skinName = skins.components.HeroesItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
			//this.buyPopBtn1.numLbl.text = "+10";
			//this.buyPopBtn0.numLbl.text = "+100";
		}

		initData(){
			this.dataItem = {
				dps:this.getDps(),
				cost:this.getCost(),
				skill:this.getSkill(),
				skills:this.getSkills(),
				skillCost:this.getHeroSkillUnlockCost(),
				nextLevelAddDps:this.getNextLevelAddDps(),
				cost10:this.getCost10(),
				cost100:this.getCost100(),
				isHeroDead:this.isHeroDead()
			}
		}

		getName(){
			return Conf.hero[this.data.id].name;
		}

		getLevel(){
			return gm.dataManage.data.heroes[this.data.id].level;
		}

		getDps(){
			return formula.heroDPS(gm.dataManage.data, this.data.id, this.getLevel());
		}

		getNextLevelAddDps(){
			return formula.heroDPS(gm.dataManage.data, this.data.id, this.getLevel()+1) - this.getDps();
		}

		getCost(){
			return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id, 1);
		}

		getCostLevel10(){
			var cost:any;
			if(this.getLevel() > 1000){
				cost = 100;
			}
			else {
				cost = 10;
			}
			return cost;
		}

		getCostLevel100(){
			var cost:any;
			if(this.getLevel() > 1000){
				cost = 1000;
			}
			else {
				cost = 100;
			}
			return cost;
		}

		getCost10(){
			var cost = this.getCostLevel10();
			return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id,cost);
		}

		getCost100(){
			var cost = this.getCostLevel100();
			return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id,cost);
		}

		getSkill(){
			return gm.dataManage.data.heroes[this.data.id].skill;
		}

		getSkills(){
			return gm.dataManage.heroes.getHeroSkillInfo(this.data.id);
		}

		getHeroSkillUnlockCost(){
			return gm.dataManage.heroes.getHeroSkillUnlockCost(this.data.id);
		}

		getHeroRevivalCostDiamond(){
			var id = this.data.id;
			return gm.dataManage.heroes.getRevivalCost(id);
		}

		getHeroRevivalTime(){
			var id = this.data.id;
			var currTime = new Date().getTime();
			var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
			return (revivalTime - currTime);
		}

		isUnLockHeroSkill(){
			return gm.dataManage.heroes.isUnlockHeroSkill(this.data.id);
		}

		isCostGold(cost){
			return gm.dataManage.data.gold >= cost;
		}

		isHeroDead(){
			var id = this.data.id;
			var currTime = new Date().getTime();
			var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
			if(currTime > revivalTime){
				return false;
			}
			return true;
		}

		onHeroesSkillPanel(){
			var data;
			data = {
				id:this.data.id,
				name:this.getName(),
				lv:this.getLevel() + "",
				dps:Util.formatNumber(this.getDps()),
				iconSource:"hero" + this.data.id,
				skills:this.dataItem.skills
			};
			gm.guiLayer.addElement(new HeroesSkillPanel(data));
		}

		dataChanged() {
			super.dataChanged();
			this.initData();
			//直接更改资源
			this.setIconImg();
			this.setName();
			this.setLevel();
			this.setDps();
			this.setNewTipImg();
			this.setIconDisabled();
			this.setHeroRevival();
			this.setBuyPopGroup();
			this.setBtnIconImg();
			this.setBtnText();
			this.setBtnAddDps();
			this.setBtnCost();
			this.setBtnCost10();
			this.setBtnCost100();
			this.setBtnSource();
			this.setBtn10Source();
			this.setBtn100Source();
			this.setBtnCostText10();
			this.setBtnCostText100();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.btnItem) {
				if(this.isCostGold(this.dataItem.cost)){
					this.setTutorial();
				}
				if(this.isHeroDead()){
					gm.dataManage.heroes.revivalHero(this.data.id,function(){}.bind(this));
					return ;
				}
				this.setTouchTapPopUpDialog(function(){
					if (this.isUnLockHeroSkill()) {
						gm.dataManage.heroes.unlockHeroSkill(this.data.id);
					}
					else {
						if(this.isCostGold(this.dataItem.cost)){
							if(gm.dataManage.heroes.heroUpgrade(this.data.id,1)){
								this.playHeroLevelAni();
							}
						}
					}
				}.bind(this));
				return ;
			}
			if(event.target == this.buyPopBtn0){
				this.setTouchBeginBuyPopUpDialog();
				var cost100 = this.getCostLevel100();
				if(gm.dataManage.heroes.heroUpgrade(this.data.id,cost100)){
					this.playHeroLevelAni();
				}
				return ;
			}
			if(event.target == this.buyPopBtn1){
				this.setTouchBeginBuyPopUpDialog();
				var cost10 = this.getCostLevel10();
				if(gm.dataManage.heroes.heroUpgrade(this.data.id,cost10)){
					this.playHeroLevelAni();
				}
				return ;
			}
			this.onHeroesSkillPanel();
		}

		onTouchBegin(event:egret.TouchEvent){
			if(event.target == this.btnItem){
				this._clickBtnTime = new Date().getTime();
				this.setTouchBeginPopUpDialog();
			}
		}

		setTouchBeginPopUpDialog(){
			//if(this.getLevel() < 1 || this.getLevel() >= 1000){return ;}
			if(this.getLevel() < 1){return ;}
			if(this.data.base.touchBeginTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
			}
			this.data.base.touchBeginTimeoutIndex = egret.setTimeout(function(){
				this.setTouchBeginBuyPopUpDialog();
			}.bind(this),this,500);
		}

		setTouchBeginBuyPopUpDialog(){
			//if(this.getLevel() < 1 || this.getLevel() >= 1000){return ;}
			if(this.getLevel() < 1){return ;}
			this.buyPopGroup.visible = true;
			if(this.data.base.touchTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchTimeoutIndex);
			}
			this._showPopBtnTime = 3000;
			this.data.base.touchTimeoutTime = new Date().getTime();
			this.data.base.touchTimeoutIndex = egret.setTimeout(function(){
				this.buyPopGroup.visible = false;
			}.bind(this),this,this._showPopBtnTime);
		}

		setTouchTapPopUpDialog(cb){
			var currTime = new Date().getTime();
			var offsetTime = currTime - this._clickBtnTime;
			if(offsetTime <= 300
				|| this.getLevel() < 1){
				this._clickBtnTime = 0;
				this.setHideClickBtnPopUp();
				Util.invokeCallback(cb);
			}
			this.setTouchDoubleTapPopUpDialog();
		}

		setTouchDoubleTapPopUpDialog(){
			var currTime = new Date().getTime();
			var offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
			if(offsetDoubleTime > 400){
				this.data.base.touchDoubleTimes = 0;
				this.data.base.clickDoubleBtnTime = new Date().getTime();
			}
			offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
			if(offsetDoubleTime <= 400){
				this.data.base.touchDoubleTimes++;
				if(this.data.base.touchDoubleTimes >= 2){
					this.setTouchBeginBuyPopUpDialog();
					this.data.base.touchDoubleTimes = 0;
					this.data.base.clickDoubleBtnTime = 0;
				}
			}
		}

		setNewTipImg(){
			if(this.getLevel() == 0
				&& this.isCostGold(this.dataItem.cost)){
				this.newTipImg.visible = true;
				if(!this.isPlayingAni){
					this.playNewTipAni();
					this.isPlayingAni = true;
				}
			}
			else {
				this.newTipImg.visible = false;
				this.stopNewTipAni();
				this.isPlayingAni = false;
			}
		}

		playNewTipAni(){
			this.newTipImg.scaleX = 1;
			this.newTipImg.scaleY = 1;
			var tw = egret.Tween.get(this.newTipImg,{loop:true});
			tw.to({scaleX:1.1,scaleY:1.1},300).to({scaleX:1,scaleY:1},200);
		}

		stopNewTipAni(){
			egret.Tween.removeTweens(this.newTipImg);
		}

		playHeroLevelAni(){
			this.effectImg.visible = true;
			var mc = pool.createMovieClip("heroLevelUp");
			mc.autoRemove = false;
			mc.play(false, function(){
			    this.effectImg.visible = false;
			}.bind(this), 1);
			this.effectImg.source = mc;
		}

		setBuyPopGroup(){
			var currTime = new Date().getTime();
			var popTime = this.data.base.touchTimeoutTime;
			var offsetTime = currTime - popTime;
			if(offsetTime < 3000){
				this._showPopBtnTime = 3000 - offsetTime;
				this.setShowPopGroup();
			}
			else {
				if(this.data.base.touchBeginTimeoutIndex == -1){
					this.setHidePopGroup();
				}
			}
		}

		setShowPopGroup(){
			this.buyPopGroup.visible = true;
			if(this.data.base.touchTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchTimeoutIndex);
			}
			if(this.data.base.touchBeginTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
				this.data.base.touchBeginTimeoutIndex = -1;
			}
			this.data.base.touchTimeoutIndex = egret.setTimeout(function(){
				this.buyPopGroup.visible = false;
			}.bind(this),this,this._showPopBtnTime);
		}

		setHidePopGroup(){
			this.buyPopGroup.visible = false;
			if(this.data.base.touchTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchTimeoutIndex);
				this.data.base.touchTimeoutIndex = -1;
				this.data.base.touchTimeoutTime = 0;
			}
			if(this.data.base.touchBeginTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
				this.data.base.touchBeginTimeoutIndex = -1;
			}
		}

		setHideClickBtnPopUp(){
			if(!this.buyPopGroup.visible){
				this.setHidePopGroup();
			}
		}

		setHeroRevival(){
			if(this.dataItem.isHeroDead){
				this.revivalGroup.visible = true;
				this.setShowHeroRevivalTime();
			}
			else {
				this.revivalGroup.visible = false;
				this.setHideHeroRevivalTime();
			}
		}

		setShowHeroRevivalTime(){
			if(this.data.base.revivalIntervalIndex != -1){
				egret.clearInterval(this.data.base.revivalIntervalIndex);
			}
			if(this.data.base.revivalTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.revivalTimeoutIndex);
			}
			var revivalTime = this.getHeroRevivalTime();
			egret.setInterval(this.showRevivalTime,this,1000);
			egret.setTimeout(function(){
				egret.clearInterval(this.data.base.revivalIntervalIndex);
				this.data.base.revivalIntervalIndex = -1;
				gm.postMessage(consts.kMessageHeroRevival,this.data.id);
			}.bind(this),this,revivalTime);
			this.showRevivalTime();
		}

		setHideHeroRevivalTime(){
			if(this.data.base.revivalIntervalIndex != -1){
				egret.clearInterval(this.data.base.revivalIntervalIndex);
				this.data.base.revivalIntervalIndex = -1;
			}
			if(this.data.base.revivalTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.revivalTimeoutIndex);
				this.data.base.revivalTimeoutIndex = -1;
			}
		}

		showRevivalTime(){
			this.setRevivalTime();
			this.setBtnCost();
		}

		setRevivalTime(){
			var revivalTime = this.getHeroRevivalTime();
			this.revivalTimeLbl.text = Util.formatTime(Math.floor(revivalTime/1000),true);
		}

		setTutorial(){
			if(!gm.dataManage.data.tutorials[consts.kTutorialClickHeroUpgrade]){
				gm.dataManage.setTutorialFinish(consts.kTutorialClickHero);
				gm.dataManage.setTutorialFinish(consts.kTutorialClickHeroUpgrade);
				gm.postMessage(consts.kMessageTutorialUpdate);
			}
		}

		setName(){
			this.nameLbl.text = this.getName();
		}

		setIconDisabled(){
			if(this.getLevel() == 0){
				this.iconDisabled.visible = true;
			}
			else {
				this.iconDisabled.visible = false;
			}
		}

		setLevel(){
			this.lvLbl.text = this.getLevel() + "";
		}

		setDps(){
			this.dpsLbl.text = Util.formatNumber(this.dataItem.dps);
		}

		setIconImg(){
			this.iconImg.source = "hero" + this.data.id;
		}

		setBtnIconImg(){
			var source;
			if(this.dataItem.isHeroDead){
				source = "diamond";
			}
			else {
				source = "coin";
			}
			this.btnItem.iconImg.source = source;
		}

		setBtnText(){
			var text:any;
			if(this.dataItem.isHeroDead){
				text = "复活";
				this.btnItem.textLbl.size = 22;
			}
			else{
				if(this.isUnLockHeroSkill()){
					text = "技能解锁";
				}
				else{
					//if(this.getLevel() == 1000){
					//	text = "最高等级";
					//}
					//else {
						text = this.getLevel() == 0? "征召：":"等级提升";
					//}
				}
				this.btnItem.textLbl.size = 14;
			}
			this.btnItem.textLbl.text = text;
		}

		setBtnAddDps(){
			var text:any;
			//if(this.getLevel() == 1000 || this.isUnLockHeroSkill() || this.dataItem.isHeroDead){
			if(this.isUnLockHeroSkill() || this.dataItem.isHeroDead){
				text = "";
			}
			else {
				text = _.sprintf("+ %s DPS",Util.formatNumber(this.dataItem.nextLevelAddDps));
			}
			this.btnItem.upgradeLbl.text = text;
		}

		setBtnCost(){
			var cost:any;
			if(this.dataItem.isHeroDead){
				cost = this.getHeroRevivalCostDiamond();
			}
			else {
				if(this.isUnLockHeroSkill()){
					cost = this.dataItem.skillCost;
				}
				else {
					//if(this.getLevel() == 1000){
					//	cost = 0;
					//}
					//else {
						cost = this.dataItem.cost;
					//}
				}
			}
			this.btnItem.iconLbl.text = Util.formatNumber(cost);
		}

		setBtnCostText10(){
			this.buyPopBtn1.numLbl.text = _.sprintf("+%d",this.getCostLevel10());
		}

		setBtnCostText100(){
			this.buyPopBtn0.numLbl.text = _.sprintf("+%d",this.getCostLevel100());
		}

		setBtnCost10(){
			this.buyPopBtn1.costLbl.text = Util.formatNumber(this.dataItem.cost10);
		}

		setBtnCost100(){
			this.buyPopBtn0.costLbl.text = Util.formatNumber(this.dataItem.cost100);
		}

		setBtnSource(){
			var source;
			var isCost = this.isCostGold(this.dataItem.cost);
			if(this.dataItem.isHeroDead) {
				source = "btn_blue";
			}
			else {
				if(this.isUnLockHeroSkill()){
					isCost = this.isCostGold(this.dataItem.skillCost);
					source = isCost ? "btn_yellow":"btn_disabled";
				}
				else {
					//if(this.getLevel() == 1000){
					//	source = "btn_disabled";
					//}
					//else {
						source = isCost ? "btn_blue":"btn_disabled";
					//}
				}
			}
			this.btnItem.setBtnSkinName(source);
		}

		setBtn10Source(){
			var source = this.isCostGold(this.dataItem.cost10) ? "btn_pop_blue":"btn_pop_disabled";
			this.buyPopBtn1.setBtnSkinName(source);
		}

		setBtn100Source(){
			var source = this.isCostGold(this.dataItem.cost100) ? "btn_pop_blue":"btn_pop_disabled";
			this.buyPopBtn0.setBtnSkinName(source);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
