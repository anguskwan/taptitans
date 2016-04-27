module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildLvUpProgressBar extends egret.gui.ProgressBar {
		public constructor() {
			super();
			this.skinName = skins.components.GuildLvUpProgressBarSkin;
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
