module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EquipExpProgressBar extends egret.gui.ProgressBar {
		public constructor() {
			super();
			this.skinName = skins.components.EquipExpProgressBarSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
