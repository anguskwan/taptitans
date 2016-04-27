module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankLineItemList extends egret.gui.ItemRenderer {
		public constructor() {
			super();
			this.skinName = skins.components.RankLineItemListSkin;
		}

		dataChanged() {
			super.dataChanged();
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
