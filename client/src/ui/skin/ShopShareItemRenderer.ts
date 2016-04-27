module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ShopShareItemRenderer extends egret.gui.ItemRenderer {
		public btnItem:uiskins.CommonItemButton;

		public constructor() {
			super();
			this.skinName = skins.components.ShopShareItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.btnItem.textLbl.size = 22;
			this.btnItem.textLbl.text = "分享";
			this.btnItem.iconGroup.visible = false;
			this.btnItem.iconCostLbl.visible = false;
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
		}

		onTouchBtnClick(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
				var ly = new ShareLayer();
				gm.guiLayer.addElement(ly);
			}
		}

		onTouchBegin(event:egret.TouchEvent) {
			if (event.target == this.btnItem) {
			}
		}

		public partAdded(partName:string, instance:any):void {
			super.partAdded(partName, instance);
		}

		public partRemoved(partName:string, instance:any):void {
			super.partRemoved(partName, instance);
		}
	}
}
