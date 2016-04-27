module uiskins {
    /**
     *
     * @author
     *
     */
    export class CommonItemButton extends egret.gui.Button {
        private _upSkinName:any;
        private _downSkinName:any;
        private _disabledSkinName:any;

        public upSkin:egret.gui.UIAsset;
        public downSkin:egret.gui.UIAsset;
        public disabledSkin:egret.gui.UIAsset;

        //item
        public iconGroup:egret.gui.Group;
        public textGroup:egret.gui.Group;
        public iconImg:egret.gui.UIAsset;
        public iconLbl:egret.gui.Label;
        public textLbl:egret.gui.Label;
        public upgradeLbl:egret.gui.Label;
        public iconCostLbl:egret.gui.Label;
        public value:any;


        public constructor(upSkinName?:any,
                           downSkinName?:any,
                           disabledSkinName?:any,data?:any) {
            super();
            this.value = data;
            this.skinName = skins.components.CommonItemButtonSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.anchorOffsetX = this.width/2;
            this.anchorOffsetY = this.height/2;
            this.x = this.x + this.width/2;
            this.y = this.y + this.height/2;
        }

        clickHandler(event:egret.TouchEvent){
            super.clickHandler(event);
            this.scaleX = 1;
            this.scaleY = 1;
            egret.Tween.removeTweens(this);
            var tw = egret.Tween.get(this);
            tw.to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},100);
        }

        public set dataItem(value:any){
            this.value = value;
        }

        public get dataItem():any{
            return this.value;
        }

        //change data item
        public changeDataItem(){
            if(this.value.type == consts.kItemButtonTypeDefault){
                this.iconLbl.text = this.value.cost.toString();
                this.upgradeLbl.text = this.value.upgrade;
                this.textLbl.text = this.value.text;
                this.iconImg.source = this.value.iconSource;
                if(!_.isUndefined(this.value.fontSize)){
                    if(this.value.fontSize){
                        this.textLbl.size = this.value.fontSize;
                    }
                }
                if(!_.isUndefined(this.value.isShowIcon)){
                    if(this.value.isShowIcon){
                        this.iconGroup.visible = false;
                        this.iconCostLbl.visible = true;
                        this.iconCostLbl.text = this.value.cost.toString();
                    }
                    else {
                        this.iconGroup.visible = true;
                        this.iconCostLbl.visible = false;
                    }
                }
                if(!_.isUndefined(this.value.isShowTimes)){
                    if(this.value.isShowTimes){
                        this.iconGroup.visible = false;
                        this.iconCostLbl.visible = true;
                        this.iconCostLbl.text = this.value.cost.toString();
                    }
                    else{
                        this.iconGroup.visible = true;
                        this.iconCostLbl.visible = false;
                    }
                }
            }
            if(this.value.type == consts.kItemButtonTypePrestige){
                this.iconGroup.visible = false;
                this.textLbl.text = this.value.text;
            }
            if(this.value.type == consts.kItemButtonTypeWeapon){
                this.iconGroup.visible = false;
                this.textLbl.text = this.value.text;
                this.textLbl.size = 18;
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

        public get upSkinName():any {
            return this._upSkinName;
        }

        public set upSkinName(value:any) {
            if (value == this._upSkinName)
                return;
            this._upSkinName = value;
            if (this.upSkin) {
                this.upSkin.source = value;
            }
        }

        public get downSkinName():any {
            return this._downSkinName;
        }

        public set downSkinName(value:any) {
            if (value == this._downSkinName)
                return;
            this._downSkinName = value;
            if (this.downSkin) {
                this.downSkin.source = value;
            }
        }

        public get disabledSkinName():any {
            return this._disabledSkinName;
        }

        public set disabledSkinName(value:any) {
            if (value == this._disabledSkinName)
                return;
            this._disabledSkinName = value;
            if (this.disabledSkin) {
                this.disabledSkin.source = value;
            }
        }


        public partAdded(partName:string, instance:any):void {
            super.partAdded(partName, instance);
            if (instance == this.upSkin) {
                this.upSkin.source = this._upSkinName;
            }
            else if (instance == this.downSkin) {
                this.downSkin.source = this._downSkinName;
            }
            else if (instance == this.disabledSkin) {
                this.disabledSkin.source = this._disabledSkinName;
            }
        }
    }
}
