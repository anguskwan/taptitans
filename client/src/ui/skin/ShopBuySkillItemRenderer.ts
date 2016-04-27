module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ShopBuySkillItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public explainLbl:egret.gui.Label;
		public shopSkillTimeLbl:egret.gui.Label;
		public btnItem:uiskins.CommonItemButton;
		public dataItem:any;
		private _showDisabledBtnTime:any;

		public constructor() {
			super();
			this.dataItem = {};
			this._showDisabledBtnTime = 0;
			this.skinName = skins.components.ShopBuySkillItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		initData(){
			this.dataItem = {}
		}

		getRainGold(){
			return gm.dataManage.getGoldRain();
		}

		getRefreshCost(){
			return formula.skillRefreshCost(gm.dataManage.data);
		}

		getCost(){
			if(this.data.id == consts.kShopItemRefreshSkill){
				return this.getRefreshCost();
			}
			else {
				return Conf.shop[this.data.id].cost;
			}
		}

		getShopItem(){
			return gm.dataManage.data.shopItems[this.data.id];
		}

		getAutoTapTime(){
			return Math.floor(gm.dataManage.data.autoTapRemainTime) || 0;
		}

		isShopSkillCost(){
			var shopItem = this.getShopItem();
			var cost = this.getCost();
			if(cost == 0){
				return false;
			}
			if(shopItem > 0){
				return true;
			}
			if(gm.dataManage.data.diamond == 0){
				return false;
			}
			return gm.dataManage.data.diamond >= cost;
		}

		isTouchBtn(){
			if(this.isShopSkillCost()
				&& this.data.base.touchBtnDisabled){
				return true;
			}
			return false;
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setIconImg();
			this.setName();
			this.setExplainText();
			this.setShopSkillTimeText();
			this.setBtnText();
			this.setBtnIconImg();
			this.setBtnCost();
			this.setBtnSourceByTimeout();
		}

		onTouchBtnClick(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
				this.onUseShopSkill();
			}
		}

		onTouchBegin(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
			}
		}

		setTouchBtnTimeout(cb){
			if(this.data.base.touchBtnDisabledTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex)
			}
			this._showDisabledBtnTime = 5000;
			this.data.base.touchBtnDisabledTimeout = new Date().getTime();
			this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function(){
				Util.invokeCallback(cb);
			}.bind(this),this,this._showDisabledBtnTime);
		}

		onUseShopSkill(){
			if(this.data.id == consts.kShopItemGoldRain){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.dataManage.goldRain(function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kShopItemAutoTap){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.dataManage.buyAutoTap(function(){
						this.data.base.touchBtnDisabled = true;
						this.setShopSkillTimeText();
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kShopItemDoom){
				if(this.isTouchBtn()){
					gm.dataManage.doom();
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					this.setTouchBtnTimeout(function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kShopItemPowerOfHolding){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.dataManage.powerOfHolding();
					this.setTouchBtnTimeout(function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kShopItemRefreshSkill){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = true;
					gm.dataManage.refreshSkill();
				}
			}
			if(this.data.id == consts.kShopItemTenTimes){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.dataManage.buyTenTimes(function(data){
						var ly = new BuyTenTimesPanel(data);
						gm.guiLayer.addElement(ly);
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
		}

		setBtnSourceByTimeout(){
			var currTime = new Date().getTime();
			var disabledTime = this.data.base.touchBtnDisabledTimeout;
			var offsetTime = currTime - disabledTime;
			if(disabledTime == 0){
				this.setBtnSource();
			}
			else {
				if(offsetTime < 5000){
					this._showDisabledBtnTime = 5000 - offsetTime;
					this.setShowBtnSource();
				}
				else {
					this.setBtnSource();
				}
			}
		}

		setShowBtnSource(){
			this.btnItem.setBtnSkinName("btn_disabled");
			this.data.base.touchBtnDisabled = false;
			if(this.data.base.touchBtnDisabledTimeoutIndex != -1){
				egret.clearTimeout(this.data.base.touchBtnDisabledTimeoutIndex)
			}
			this.data.base.touchBtnDisabledTimeoutIndex = egret.setTimeout(function(){
				this.data.base.touchBtnDisabled = true;
				this.setBtnSource();
			}.bind(this),this,this._showDisabledBtnTime);
		}

		setName() {
			this.nameLbl.text = Conf.shop[this.data.id].name;
		}

		setIconImg() {
			this.iconImg.source = "shop" + this.data.id;
		}

		setShopSkillTimeText(){
			var autoTime = this.getAutoTapTime();
			if(this.data.id == consts.kShopItemAutoTap && autoTime > 0) {
				this.shopSkillTimeLbl.visible = true;
				this.playAutoTapTime();
			}
			else {
				this.shopSkillTimeLbl.visible = false;
				this.stopAutoTapTime();
			}
		}

		showShopSkillTime(){
			var autoTime = this.getAutoTapTime();
			this.shopSkillTimeLbl.text = Util.formatTime(autoTime,false);
			if(autoTime < 0){
				this.shopSkillTimeLbl.visible = false;
				this.stopAutoTapTime();
			}
		}

		playAutoTapTime(){
			if(this.data.base.autoTapInterval != -1){
				egret.clearInterval(this.data.base.autoTapInterval);
			}
			this.data.base.autoTapInterval = egret.setInterval(function(){
				this.showShopSkillTime();
			}.bind(this),this,1000);
			this.showShopSkillTime();
		}

		stopAutoTapTime(){
			if(this.data.base.autoTapInterval != -1) {
				egret.clearInterval(this.data.base.autoTapInterval);
			}
		}

		setExplainText(){
			var text:any;
			var mate = Conf.shop;
			if(this.data.id == consts.kShopItemGoldRain){
				text = _.sprintf(mate[this.data.id].desc,Util.formatNumber(this.getRainGold()));
			}
			else {
				var desc = mate[this.data.id].desc.replace("\\n","\n");
				text = desc;
			}
			this.explainLbl.text = text;
		}

		setBtnIconImg(){
			this.btnItem.iconImg.source = "diamond";
		}

		setBtnCost() {
			var text:any;
			var shopItem = this.getShopItem();
			if(shopItem > 0){
				text = shopItem + "个";
				this.btnItem.iconGroup.visible = false;
				this.btnItem.iconCostLbl.visible = true;
				this.btnItem.iconCostLbl.text = text;
			}
			else {
				text = this.getCost() + "";
				this.btnItem.iconGroup.visible = true;
				this.btnItem.iconCostLbl.visible = false;
				this.btnItem.iconLbl.text = text;
			}
		}

		setBtnText(){
			var text:any;
			if(this.data.id == consts.kShopItemRefreshSkill) {
				text = "刷新技能";
			}
			else {
				text = "使用增强道具";
			}
			this.btnItem.textLbl.text = text;
		}

		setBtnSource() {
			var source;
			var shopItem = this.getShopItem();
			var cost = this.getCost();
			if(this.data.base.touchBtnDisabled
				&& (cost > 0 || shopItem > 0)){
				source = "btn_green";
			}
			else {
				source = "btn_disabled";
			}
			this.btnItem.setBtnSkinName(source);
		}

		public partAdded(partName:string, instance:any):void {
			super.partAdded(partName, instance);
		}

		public partRemoved(partName:string, instance:any):void {
			super.partRemoved(partName, instance);
		}
	}
}
