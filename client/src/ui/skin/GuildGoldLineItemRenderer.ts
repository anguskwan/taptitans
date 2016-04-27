module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildGoldLineItemRenderer extends egret.gui.ItemRenderer {
		public constructor() {
			super();
			this.skinName = skins.components.GuildGoldLineItemRendererSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		}

		onTouchLayer(event:egret.TouchEvent){

		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
