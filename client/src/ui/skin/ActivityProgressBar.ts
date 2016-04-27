module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityProgressBar extends egret.gui.ProgressBar {
		public numLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.ActivityProgressBarSkin;
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