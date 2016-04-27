module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityWorthBoxItem extends egret.gui.SkinnableComponent {
		public iconImg      :egret.gui.UIAsset;
		public btnBuy		:egret.gui.Button;
		public descLbl		:egret.gui.Label;
		public lblRemainTimes		:egret.gui.Label;
		public lblTitle		:egret.gui.Label;
		public lblPrice 	:egret.gui.Label; 
		public lblOriPrice  :egret.gui.Label;
		public lblVip		:egret.gui.Label;
		public vipBg		:egret.gui.UIAsset;
		public groupVip		:egret.gui.Group;
		public vipIcon		:egret.gui.Group;
		private data 		:any;
		public constructor(data) {
			super();
			//this.dataItem = {};
			//this._showDisabledBtnTime = 0;
			this.data = data;
			this.skinName = skins.components.ActivityWorthBoxItemRendererSkin;
			console.log("ActivityWorthBoxItem data:  " + JSON.stringify(data));
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this, true);			
			//this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			//this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.initUI();
			
		}

		initUI(){
			console.log("initUI");
			this.setIconImg();
			this.setDescText();
			this.setLimitNumText();
			this.setTitleText();
			this.setPriceText();
			this.setVipCount();
		}

		refreshData(itemData){
			console.log("refreshData");
		}

		setIconImg(){
			//var icon = gm.gameUI.getActivityBlack(this.data.id).icon;
			var icon = Conf.market[this.data.id].iconName;
			this.iconImg.source = icon;
		}

		setTitleText(){
			var text = Conf.market[this.data.id].name;
			this.lblTitle.text = text;
		}

		setDescText(){
			var meta = Conf.market[this.data.id];
			var num = meta.num;
			
			//黄金风暴
			if(meta.type == "gold"){
				var gold = formula.goldRain(gm.dataManage.data);
	            num = num * gold;
			}
			var str = Util.formatNumber(num);
			this.descLbl.text = "x" + str;

		}

		setLimitNumText(){
			var id = this.data.id;
			var times = Conf.market[id].time;
			var currTimes = gm.dataManage.newMarket.times[id] || 0;
			var remainTimes = _.sprintf("%d",(times - currTimes));
			this.lblRemainTimes.text = remainTimes;
			if (remainTimes == (0).toString()){
				this.btnBuy.enabled = false;
			}
		}

		setMarketTimes(){
			if(!gm.dataManage.newMarket.times[this.data.id]){
				gm.dataManage.newMarket.times[this.data.id] = 0;
			}
			gm.dataManage.newMarket.times[this.data.id]++;
			localStorage.setItem("newMarket",JSON.stringify(gm.dataManage.newMarket))
			
			this.setLimitNumText();
		}

		setPriceText(){
			console.log("JSON.stringify market data", JSON.stringify(Conf.market[this.data.id]));
			this.lblPrice.text = Conf.market[this.data.id].cost;
			this.lblOriPrice.text = Conf.market[this.data.id].costOrigin;		
		}

		setBtnBuy(enable){
			this.btnBuy.enabled = enable;
		}

		setVipCount(){
			var vipLimit = Conf.market[this.data.id].vipLimitNum;
			var curVip = gm.dataManage.data.vip;
			if (curVip < vipLimit){
				//todo this.setBtnBuy(false);
			}

			if (vipLimit == 0) {
				// hide
				//this.vipBg.visible = false;
				this.vipIcon.visible = false;
				this.groupVip.visible = false;
			} else {
				this.lblVip.text = "V" + vipLimit;
			}

			//limit

		}

		onTouchBtnClick(event:egret.TouchEvent) {
			if (event.target == this.btnBuy) {
				this.onUseShop();
			}
		}

		onUseShop(){
			console.log("onUseShop");
			var id = this.data.id;
			var data = Conf.market[this.data.id];			
			var type = data.type;
			var icon = data.iconName;
			var times = Conf.market[id].time;
			var currTimes = gm.dataManage.newMarket.times[id] || 0;
			if(currTimes >= times){
				gm.postMessage(consts.kMessageShowToastLayer,"土豪，货已经被你买光了。");
				return ;
			}
			if(icon == "guild_icon_shop3"){
				this.onUseBuyEquip();
			}
			else if(icon == "guild_icon_shop4"){
				this.onUseBuyTenEquip();
			}
			else if (type == "gold"){
				this.onUseBuyGold();				
			}
			else {
				this.onBuyMarketItem();
			}
		}

		onUseBuyEquip(){
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
					this.setMarketTimes();

					Util.invokeCallback(this.data.updateFunction);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		onUseBuyTenEquip(){

			gm.gameUI.showLoadingLayer();
			gm.dataManage.buyTenEquip(2,function(data){
				gm.dataManage.updateEquipValue(function(){
					var ly = new BuyTenTimesPanel(data);
					gm.guiLayer.addElement(ly);
					this.setMarketTimes();
					Util.invokeCallback(this.data.updateFunction);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		onUseBuyGold(){
			gm.gameUI.showLoadingLayer();
			gm.dataManage.buyMarketItem(this.data.id,function(data){
				//黄金风暴
	            
				var obj:any;
				obj = [{type:data.type,num:data.num}];
				var ly = new MessageGetRewardPanel("获得物品",obj);
				gm.guiLayer.addElement(ly);
				
				this.setMarketTimes();
				Util.invokeCallback(this.data.updateFunction);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));			
		}

		onBuyMarketItem(){
			gm.gameUI.showLoadingLayer();
			gm.dataManage.buyMarketItem(this.data.id,function(data){
				var obj:any;
				obj = [{type:data.type,num:data.num}];
				var ly = new MessageGetRewardPanel("获得物品",obj);
				gm.guiLayer.addElement(ly);
				
				this.setMarketTimes();
				Util.invokeCallback(this.data.updateFunction);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

	}
}
