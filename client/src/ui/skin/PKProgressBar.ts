module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class PKProgressBar extends egret.gui.ProgressBar {
        public point1:egret.gui.UIAsset;
        public point2:egret.gui.UIAsset;
        public numLbl:egret.gui.Label;
        public constructor() {
            super();
            this.skinName = skins.components.PKProgressBarSkin;
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
