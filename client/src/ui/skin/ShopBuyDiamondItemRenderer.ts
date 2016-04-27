module uiskins {
	/**
	 *
	 * @author
	 *
	 */
	export class ShopBuyDiamondItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public doubleTipImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public shopLbl:egret.gui.Label;
		public explainLbl:egret.gui.Label;
		public btnItem:uiskins.CommonItemButton;
		public isPlayingShopAni:any;

		public constructor() {
			super();
			this.isPlayingShopAni = false;
			this.skinName = skins.components.ShopBuyDiamondItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		getBuyDiamond(){
			var vip = gm.dataManage.data.vip;
			var index = (this.data.id - 10) + 1;
			var diamond = 0;
			if(vip <= 5){
				if(index <= vip){
					diamond = Conf.shop[this.data.id].vipNum;
				}
				else {
					diamond = Conf.shop[this.data.id].diamondNum;
				}
			}
			else {
				diamond = Conf.shop[this.data.id].vipNum;
			}
			return diamond;
		}

		getName(){
			return this.getBuyDiamond() + "钻石";
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setName();
			this.setExplainText();
			this.setIconImg();
			this.setDoubleTipImg();
			this.setDoubleText();
			this.setBtnText();
			this.setBtnIconImg();
			this.setBtnCost();
		}

		getPayId(){
			var mate = Conf.shop[this.data.id];
			var payId = mate.payId;
			return payId;
		}

		isBuyDouble(){
			var payId = this.getPayId();
		    if(!gm.dataManage.data.purchaseCount
		        || _.isUndefined(gm.dataManage.data.purchaseCount[payId])
		        || gm.dataManage.data.purchaseCount[payId] == 0
				|| Util.isDouble11()) {
		        return true;
		    }
		    return false;
		}

		onTouchBtnClick(event:egret.TouchEvent) {
			//alert("begin buy diamond, payId=" + this.getPayId());

			if (event.target == this.btnItem) {
				gm.gameUI.showLoadingLayer();
				gm.network.buyDiamond(this.getPayId(),function(data){
					gm.dataManage.addMoney(data.added,"diamond");
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

		onTouchBegin(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
			}
		}

		setDoubleTipImg(){
		    if(this.isBuyDouble()){
		        this.doubleTipImg.visible = true;
				if(!this.isPlayingShopAni){
					this.playDoubleTipAni();
					this.isPlayingShopAni = true;
				}
			}
			else {
				this.doubleTipImg.visible = false;
				this.stopDoubleTipAni();
				this.isPlayingShopAni = false;
			}
		}

		playDoubleTipAni(){
			this.doubleTipImg.scaleX = 1;
			this.doubleTipImg.scaleY = 1;
			var tw = egret.Tween.get(this.doubleTipImg,{loop:true});
			tw.to({scaleX:1.1,scaleY:1.1},300).to({scaleX:1,scaleY:1},200);
		}

		stopDoubleTipAni(){
			egret.Tween.removeTweens(this.doubleTipImg);
		}

		setDoubleText(){
			if(this.isBuyDouble()) {
				this.shopLbl.text = "+" + this.getName();
			}
			else {
				this.shopLbl.text = "";
			}
		}

		setName() {
			this.nameLbl.text = this.getName();
		}

		setIconImg(){
			this.iconImg.source = "shop" + (this.data.id - 1);
		}

		setExplainText(){
			var text;
			var vip = gm.dataManage.data.vip;
			var index = (this.data.id - 11) + 1;
			if(vip <= 5) {
				if (index <= vip) {
					text = "钻石增加44%";
				}
				else {
					text = Conf.shop[this.data.id].desc;
				}
			}
			else {
				text = "钻石增加44%";
			}
			this.explainLbl.text = text;
		}

		setBtnText(){
			this.btnItem.textLbl.size = 22;
			this.btnItem.textLbl.text = "购买";
		}

		setBtnIconImg() {
			this.btnItem.iconGroup.visible = false;
			this.btnItem.iconCostLbl.visible = true;
		}

		setBtnCost(){
			this.btnItem.iconCostLbl.text = "￥" + Conf.shop[this.data.id].cost;
		}

		public partAdded(partName:string, instance:any):void {
			super.partAdded(partName, instance);
		}

		public partRemoved(partName:string, instance:any):void {
			super.partRemoved(partName, instance);
		}
	}
}
