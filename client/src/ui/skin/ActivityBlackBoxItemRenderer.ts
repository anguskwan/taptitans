module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityBlackBoxItemRenderer extends egret.gui.ItemRenderer {
		public btnItem:uiskins.CommonItemButton;
		public iconImg:egret.gui.UIAsset;
		public titleLbl:egret.gui.Label;
		public descLbl:egret.gui.Label;
		public numLbl:egret.gui.Label;
		public dataItem:any;
		private _showDisabledBtnTime:any;
		public constructor() {
			super();
			this.dataItem = {};
			this._showDisabledBtnTime = 0;
			this.skinName = skins.components.ActivityBlackBoxItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		initData(){
			this.dataItem = {}
		}

		getCost(){
			return Conf.market[this.data.id].cost;
		}

		isShopSkillCost(){
			var cost = this.getCost();
			if(cost == 0){
				return false;
			}
			return gm.dataManage.data.diamond >= cost;
		}

		isTouchBtn(){
			if(this.data.base.touchBtnDisabled){
				return true;
			}
			return false;
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setTitleText();
			this.setDescText();
			this.setIconImg();
			this.setNumText();
			this.setBtnText();
			this.setBtnIconImg();
			this.setBtnCost();
			this.setBtnSourceByTimeout();
			this.setBtnSource();
		}

		onTouchBtnClick(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
				this.onUseShop();
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

		onUseShop(){
			var id = this.data.id;
			var type = gm.gameUI.getActivityBlack(id).type;
			var times = Conf.market[id].time;
			var currTimes = gm.dataManage.newMarket.times[id] || 0;
			if(currTimes >= times){
				gm.postMessage(consts.kMessageShowToastLayer,"土豪，货已经被你买光了。");
				return ;
			}
			if(type == "chest"){
				this.onUseBuyEquip();
			}
			else if(type == "bigChest"){
				this.onUseBuyTenEquip();
			}
			else {
				this.onBuyMarketItem();
			}
		}

		onUseBuyEquip(){
			if(this.isTouchBtn()) {
				this.data.base.touchBtnDisabled = false;
				this.setBtnSource();
				gm.gameUI.showLoadingLayer();
				gm.dataManage.buyEquip(2,function(data){
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
						this.setBtnSource();
						this.setMarketTimes();
						Util.invokeCallback(this.data.updateFunction);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					this.data.base.touchBtnDisabled = true;
					this.setBtnSource();
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		onUseBuyTenEquip(){
			if(this.isTouchBtn()) {
				this.data.base.touchBtnDisabled = false;
				this.setBtnSource();
				gm.gameUI.showLoadingLayer();
				gm.dataManage.buyTenEquip(2,function(data){
					gm.dataManage.updateEquipValue(function(){
						var ly = new BuyTenTimesPanel(data);
						gm.guiLayer.addElement(ly);
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
						this.setMarketTimes();
						Util.invokeCallback(this.data.updateFunction);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						this.data.base.touchBtnDisabled = true;
						this.setBtnSource();
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					this.data.base.touchBtnDisabled = true;
					this.setBtnSource();
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		onBuyMarketItem(){
			if(this.isTouchBtn()){
				this.data.base.touchBtnDisabled = false;
				this.setBtnSource();
				gm.gameUI.showLoadingLayer();
				gm.dataManage.buyMarketItem(this.data.id,function(data){
					var obj:any;
					obj = [{type:data.type,num:data.num}];
					var ly = new MessageGetRewardPanel("获得物品",obj);
					gm.guiLayer.addElement(ly);
					this.data.base.touchBtnDisabled = true;
					this.setBtnSource();
					this.setMarketTimes();
					Util.invokeCallback(this.data.updateFunction);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					this.data.base.touchBtnDisabled = true;
					this.setBtnSource();
					gm.gameUI.hideLoadingLayer();
				}.bind(this));

			}
		}

		setMarketTimes(){
			if(!gm.dataManage.newMarket.times[this.data.id]){
				gm.dataManage.newMarket.times[this.data.id] = 0;
			}
			gm.dataManage.newMarket.times[this.data.id]++;
			localStorage.setItem("newMarket",JSON.stringify(gm.dataManage.newMarket))
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

		setIconImg(){
			var icon = gm.gameUI.getActivityBlack(this.data.id).icon;
			this.iconImg.source = icon;
		}

		setTitleText(){
			var text = Conf.market[this.data.id].name;
			this.titleLbl.text = text;
		}

		setDescText(){
			var meta = Conf.market[this.data.id];
			var text = meta.desc;
			var num = meta.num;
			this.descLbl.text = _.sprintf(text,num);
		}

		setNumText(){
			var id = this.data.id;
			var times = Conf.market[id].time;
			var currTimes = gm.dataManage.newMarket.times[id] || 0;
			this.numLbl.text = _.sprintf("%d",(times - currTimes));
		}

		setBtnIconImg(){
			this.btnItem.iconImg.source = "diamond";
		}

		setBtnCost() {
			var text:any;
			text = this.getCost() + "";
			this.btnItem.iconGroup.visible = true;
			this.btnItem.iconCostLbl.visible = false;
			this.btnItem.iconLbl.text = text;
		}

		setBtnText(){
			this.btnItem.textLbl.text = "使用钻石";
		}

		setBtnSource() {
			var source;
			if(this.data.base.touchBtnDisabled){
				source = "guild_btn_yellow";
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
