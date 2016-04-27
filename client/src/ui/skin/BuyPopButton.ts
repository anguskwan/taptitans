module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class BuyPopButton extends egret.gui.Button {
        private _upSkinName: any;
        private _downSkinName: any;
        private _disabledSkinName: any;

        public upSkin: egret.gui.UIAsset;
        public downSkin: egret.gui.UIAsset;
        public disabledSkin: egret.gui.UIAsset;
        public value: any;
        public numLbl:egret.gui.Label;
        public costLbl:egret.gui.Label;
        
        public constructor(upSkinName?: any,
            downSkinName?: any,
            disabledSkinName?: any,data?: any) {
            super();
            this.value = data;
            this.skinName = skins.components.BuyPopButtonSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
        }

        //change data item
        public changeDataItem(){
            if(this.value.type == consts.kItemButtonTypeDefault){
                this.costLbl.text = this.value.cost;
                this.numLbl.text = this.value.text;
            }
            this.upSkinName = this.value.btnSource;
            this.downSkinName = this.value.btnSource;
            this.disabledSkinName = this.value.btnSource;
        }

        setBtnSkinName(source){
            this.upSkinName = source;
            this.downSkinName = source;
            this.disabledSkinName = source;
        }

        public set dataItem(value: any) {
            this.value = value;
        }

        public get dataItem(): any {
            return this.value;
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
        }
    }
}
