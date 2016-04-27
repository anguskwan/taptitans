module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class BaseToggleBtn extends egret.gui.ToggleButton {
        private _upSkinName: any;
        private _downSkinName: any;
        private _disabledSkinName: any;
        private _upAndSelectedSkinName: any;
        private _downAndSelectedSkinName: any;
        private _disabledAndSelectedSkinName: any;


        public upSkin: egret.gui.UIAsset;
        public downSkin: egret.gui.UIAsset;
        public disabledSkin: egret.gui.UIAsset;
        public upAndSelectedSkin: egret.gui.UIAsset;
        public downAndSelectedSkin: egret.gui.UIAsset;
        public disabledAndSelelctedSkin: egret.gui.UIAsset;


        public constructor(upSkinName?: any,
            downSkinName?: any,
            disabledSkinName?: any,
            upAndSelectedSkinName?: any,
            downAndSelectedSkinName?: any,
            disabledAndSelectedSkinName?: any
            ) {
            super();
            this.skinName = skins.components.SelectToggleBtnSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
            this._upAndSelectedSkinName = upAndSelectedSkinName;
            this._downAndSelectedSkinName = downAndSelectedSkinName;
            this._disabledAndSelectedSkinName = disabledAndSelectedSkinName;
        }

        public get upSkinName(): any {
            return this._upSkinName;
        }
        public set upSkinName(value: any) {
            if(value == this._upSkinName)
                return;
            this._upSkinName = value;
            if(this.upSkin) {
                this.upSkin.source = value;
            }
        }

        public get downSkinName(): any {
            return this._downSkinName;
        }
        public set downSkinName(value: any) {
            if(value == this._downSkinName)
                return;
            this._downSkinName = value;
            if(this.downSkin) {
                this.downSkin.source = value;
            }
        }

        public get disabledSkinName(): any {
            return this._disabledSkinName;
        }
        public set disabledSkinName(value: any) {
            if(value == this._disabledSkinName)
                return;
            this._disabledSkinName = value;
            if(this.disabledSkin) {
                this.disabledSkin.source = value;
            }
        }

        public get upAndSelectedSkinName(): any {
            return this._upAndSelectedSkinName;
        }

        public set upAndSelectedSkinName(value: any) {
            if(value == this._upAndSelectedSkinName)
                return;
            this._upAndSelectedSkinName = value;
            if(this.upAndSelectedSkin) {
                this.upAndSelectedSkin.source = value;
            }
        }


        public get downAndSelectedSkinName(): any {
            return this._downAndSelectedSkinName;
        }
        public set downAndSelectedSkinName(value: any) {
            if(value == this._downAndSelectedSkinName)
                return;
            this._downAndSelectedSkinName = value;
            if(this.downAndSelectedSkin) {
                this.downAndSelectedSkin.source = value;
            }
        }

        public get disabledAndSelectedSkinName(): any {
            return this._disabledAndSelectedSkinName;
        }
        public set disabledAndSelectedSkinName(value: any) {
            if(value == this._disabledAndSelectedSkinName)
                return;
            this._disabledAndSelectedSkinName = value;
            if(this.disabledAndSelelctedSkin) {
                this.disabledAndSelelctedSkin.source = value;
            }
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
            if(instance == this.upSkin) {
                this.upSkin.source = this._upSkinName;
            }
            else if(instance == this.downSkin) {
                this.downSkin.source = this._downSkinName;
            }
            else if(instance == this.disabledSkin) {
                this.disabledSkin.source = this._disabledSkinName;
            }
            else if(instance == this.upAndSelectedSkin) {
                this.upAndSelectedSkin.source = this._upAndSelectedSkinName;
            }
            else if(instance == this.downAndSelectedSkin) {
                this.downAndSelectedSkin.source = this._downAndSelectedSkinName;
            }
            else if(instance == this.disabledAndSelelctedSkin) {
                this.disabledAndSelelctedSkin.source = this._disabledAndSelectedSkinName;
            }
        }
    }
}
