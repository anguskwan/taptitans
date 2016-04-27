module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ShopBuyLifeCardItemRenderer extends egret.gui.ItemRenderer {
		public btnItem:uiskins.CommonItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.ShopBuyLifeCardItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
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
			if (event.target == this.btnItem && !gm.dataManage.data.isBoughtLifeCard) {
				gm.gameUI.showLoadingLayer();

				gm.network.buyLifeCard( function(data) {
					gm.dataManage.data.isBoughtLifeCard = data.isBoughtLifeCard;
					gm.postMessage(consts.kMessageBuyLifeCard, {currBuy:true, index:this.itemIndex});

					gm.dataManage.getVipLevel( function() {
						gm.postMessage(consts.kMessageGetVipLevel);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this), function() {
					gm.gameUI.hideLoadingLayer();
				});
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
			//this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
			this.btnItem.iconCostLbl.text = "￥188";
		}

		setBtnText(){
			var text:any;
			var size:any;
			if( gm.dataManage.data.isBoughtLifeCard ) {
				text = "已购终身月卡";
				size = 16;
			}
			else {
				text = "购买";
				size = 22;
			}
			this.btnItem.textLbl.text = text;
			this.btnItem.textLbl.size = size;
		}

		setBtnSource() {
			var source:any;
			if( gm.dataManage.data.isBoughtLifeCard ) {
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
