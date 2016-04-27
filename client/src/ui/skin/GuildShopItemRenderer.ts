module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildShopItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public explainLbl:egret.gui.Label;
		public btnItem:uiskins.CommonItemButton;
		public dataItem:any;
		private _showDisabledBtnTime:any;

		public constructor() {
			super();
			this.dataItem = {};
			this._showDisabledBtnTime = 0;
			this.skinName = skins.components.GuildShopItemRendererSkin;
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

		getCost(){
			return gm.gameUI.getGuildTypeSource(this.data.id).cost;
		}

		isShopSkillCost(){
			var cost = this.getCost();
			if(cost == 0
				|| gm.dataManage.data.crystal == 0){
				return false;
			}
			return gm.dataManage.data.crystal >= cost;
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
			this.setBtnText();
			this.setBtnIconImg();
			this.setBtnCost();
			this.setBtnSourceByTimeout();
			this.setBtnSource();
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
			if(this.data.id == consts.kGuildItemGoldRain){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					tt.GuildManage.buyGuildGold(function(data){
						if(data != null){
							var ly = new MessageGetRewardPanel("获得物品",[{type:"goldRain",num:data}]);
							gm.guiLayer.addElement(ly);
						}
						this.data.base.touchBtnDisabled = true;
						Util.invokeCallback(this.data.updateFunction);
						this.setBtnSource();
					}.bind(this),function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kGuildItemBox1){
				if(this.isTouchBtn()){
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					tt.GuildManage.buyGuildWeapon(function(data){
						if(data != null){
							var type:any;
							var num:any = 1;
							if(data){
								type = "weaponItem";
							} else {
								type = "refreshSkill";
							}
							var ly = new MessageGetRewardPanel("获得物品",[{type:type,num:num}]);
							gm.guiLayer.addElement(ly);
						}
						this.data.base.touchBtnDisabled = true;
						Util.invokeCallback(this.data.updateFunction);
						this.setBtnSource();
					}.bind(this),function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kGuildItemBox2){
				if(this.isTouchBtn()) {
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.gameUI.showLoadingLayer();
					gm.dataManage.buyEquip(1,function(data){
						gm.dataManage.updateEquipValue(function(){
							var obj:any;
							if(data.type != "equip"){
								obj = [{type:data.type,num:data.num}];
							}
							else {
								obj = [{type:data.type,id:data.id}];
							}
							var ly = new MessageGetRewardPanel("获得物品",obj);
							gm.guiLayer.addElement(ly);
							this.data.base.touchBtnDisabled = true;
							Util.invokeCallback(this.data.updateFunction);
							this.setBtnSource();
							gm.gameUI.hideLoadingLayer();
						}.bind(this),function(){
							gm.gameUI.hideLoadingLayer();
						}.bind(this));
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kGuildItemBox3){
				if(this.isTouchBtn()) {
					this.data.base.touchBtnDisabled = false;
					this.setBtnSource();
					gm.gameUI.showLoadingLayer();
					gm.dataManage.buyTenEquip(1,function(data){
						gm.dataManage.updateEquipValue(function(){
							var ly = new BuyTenTimesPanel(data);
							gm.guiLayer.addElement(ly);
							this.data.base.touchBtnDisabled = true;
							Util.invokeCallback(this.data.updateFunction);
							this.setBtnSource();
							gm.gameUI.hideLoadingLayer();
						}.bind(this),function(){
							gm.gameUI.hideLoadingLayer();
						}.bind(this));
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}
			}
			if(this.data.id == consts.kGuildItemResetWeapon){
				//var ly = new WeaponResetPanel();
				var ly = new WeaponPanel();


				gm.guiLayer.addElement(ly);
				ly.setTitle();


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
			this.nameLbl.text = gm.gameUI.getGuildTypeSource(this.data.id).title;
		}

		setIconImg() {
			this.iconImg.source = gm.gameUI.getGuildTypeSource(this.data.id).icon;
		}

		setExplainText(){
			var text:any;
			var mate = gm.gameUI.getGuildTypeSource(this.data.id);
			if(this.data.id == consts.kGuildItemGoldRain){
				text = _.sprintf(mate.desc,Util.formatNumber(this.getRainGold()));
			}
			else {
				var desc = mate.desc.replace("\\n","\n");
				text = desc;
			}
			this.explainLbl.text = text;
		}

		setBtnIconImg(){
			this.btnItem.iconImg.source = "crystal";
		}

		setBtnCost() {
			var text:any;
			var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
			if(isOpen){
				if(this.data.id == consts.kGuildItemResetWeapon){
					this.btnItem.iconGroup.visible = false;
					this.btnItem.iconCostLbl.visible = false;
				}
				else {
					text = this.getCost() + "";
					this.btnItem.iconGroup.visible = true;
					this.btnItem.iconCostLbl.visible = false;
					this.btnItem.iconLbl.text = text;
				}

			}
			else {
				this.btnItem.iconGroup.visible = false;
				this.btnItem.iconCostLbl.visible = false;
			}
		}

		setBtnText(){
			var text:any;
			var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
			if(!isOpen) {
				text = "尚未开启";
			}
			else {
				text = "使用水晶";
			}
			this.btnItem.textLbl.text = text;
		}

		setBtnSource() {
			var source;
			var cost = this.getCost();
			var isOpen = gm.gameUI.getGuildTypeSource(this.data.id).isOpen;
			if(this.data.id == consts.kGuildItemResetWeapon) {
				source = "guild_btn_yellow";
			}
			else {
				if(this.data.base.touchBtnDisabled
					&& cost > 0 && isOpen){
					source = "guild_btn_yellow";
				}
				else {
					source = "btn_disabled";
				}
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
