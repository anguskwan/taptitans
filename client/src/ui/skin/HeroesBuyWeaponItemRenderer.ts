module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeroesBuyWeaponItemRenderer extends egret.gui.ItemRenderer {
		public btnBigItem:uiskins.CommonBigItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.HeroesBuyWeaponItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
			this.btnBigItem.iconGroup.visible = false;
			this.btnBigItem.textLbl.text = "武器升级";
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
		}


		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.btnBigItem){
				var ly = new WeaponPanel();
				gm.guiLayer.addElement(ly);
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
			if(this.btnBigItem == instance){
				this.btnBigItem.setBtnSkinName("btn_big_yellow");
			}
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
