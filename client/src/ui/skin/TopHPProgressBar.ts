module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopHPProgressBar extends egret.gui.ProgressBar {
        public nameLbl: egret.gui.Label;
		public constructor() {
            super();
            this.skinName = skins.components.HPProgressBarSkin;
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
