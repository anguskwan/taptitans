module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HalidomBuyArtifactItemRenderer extends egret.gui.ItemRenderer {
		public btnBigItem:uiskins.CommonBigItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.HalidomBuyArtifactItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
			this.btnBigItem.iconImg.source = "relic";
			this.btnBigItem.textLbl.text = "购买下一件神器";
		}

		getArtifactCost(){
			return gm.dataManage.artifact.getArtifactCost();
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setBtnCost();
		}

		setBtnCost(){
			this.btnBigItem.iconLbl.text = Util.formatNumber(this.getArtifactCost());
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.btnBigItem){
				gm.dataManage.artifact.buyNewArtifact(function(obj){
					gm.postMessage(consts.kMessageBuyNewArtifact,obj.id);
				}.bind(this));
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}