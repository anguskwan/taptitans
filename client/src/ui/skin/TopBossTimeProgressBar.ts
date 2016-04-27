module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopBossTimeProgressBar extends egret.gui.ProgressBar {
		public nameLbl:egret.gui.Label;
		public cd:any;
		public currCd:any;
		public constructor() {
            super();
            this.skinName = skins.components.BossTimeProgressBarSkin;
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
