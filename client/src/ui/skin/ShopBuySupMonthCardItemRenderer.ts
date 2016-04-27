module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ShopBuySupMonthCardItemRenderer extends egret.gui.ItemRenderer {
		public btnItem:uiskins.CommonItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.ShopBuySupMonthCardItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		isRemainMonthCardDays(){
			if(gm.dataManage.remainSupMonthCardDays() >= 0){
				return true;
			}
			return false;
		}

		getRemainMonthCardDays(){
			return gm.dataManage.remainSupMonthCardDays();
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setBtnIconImg();
			this.setBtnCost();
			this.setBtnText();
			this.setBtnSource();
		}

		onTouchBtnClick(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
				if(gm.dataManage.remainSupMonthCardDays() < 0){
					gm.gameUI.showLoadingLayer();
					gm.network.buySupMonthCard(function(data){
						gm.dataManage.data.supMonthCardTime = data.time;
						gm.postMessage(consts.kMessageBuySupMonthCard,{currBuy:true,index:this.itemIndex});
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
		}

		onTouchBegin(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {

			}
		}

		setBtnIconImg(){
			this.btnItem.iconGroup.visible = false;
			this.btnItem.iconCostLbl.visible = true;
		}

		setBtnCost(){
			this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
		}

		setBtnText(){
			var text:any;
			var size:any;
			if(this.isRemainMonthCardDays()){
				text = "月卡剩余" + Math.ceil(this.getRemainMonthCardDays()) + "天";
				size = 16;
			}
			else{
				text = "购买";
				size = 22;
			}
			this.btnItem.textLbl.text = text;
			this.btnItem.textLbl.size = size;
		}

		setBtnSource() {
			var source:any;
			if(this.isRemainMonthCardDays()){
				source = "btn_disabled";
			}
			else{
				source = "btn_blue";
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
