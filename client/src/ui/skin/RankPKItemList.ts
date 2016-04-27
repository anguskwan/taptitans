module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankPKItemList extends egret.gui.ItemRenderer {
        public iconImg: egret.gui.UIAsset;
        public nameLbl: egret.gui.Label;
        public numLbl: egret.gui.Label;
        public selfLbl: egret.gui.Label;
        public attLbl:egret.gui.Label;
        public btnVisit: egret.gui.Button;
        public numImg: egret.gui.UIAsset;
        public value: any;
        public constructor(data?: any) {
            super();
            this.value = data;
            this.skinName = skins.components.RankPKItemListSkin;
        }

        public set dataItem(value: any) {
            this.value = value;
        }

        public get dataItem(): any {
            return this.value;
        }

        public childrenCreated() {
            super.childrenCreated();
        }

        dataChanged() {
            super.dataChanged();
            this.setNameText();
            this.setAttText();
            this.setRankImg();
            this.setIconImg();
            this.setMySelf();
        }

        setNameText(){
            this.nameLbl.text = this.data.value.name || "英雄";
        }

        setRankImg(){
            var rank = this.data.value.rank + 1;
            if(rank <= 3){
                this.numLbl.visible = false;
                this.numImg.visible = true;
                this.numImg.source = "rank_num" + rank;
            }
            else {
                this.numLbl.visible = true;
                this.numLbl.text = rank + "";
                this.numImg.visible = false;
            }
        }

        setIconImg(){
            var avatar = this.data.value.avatar || "";
            if(avatar != "") {
                Util.setIconImg(avatar,this.iconImg,96);
            }
            else{
                this.iconImg.source = "icon_default";
            }
        }

        setAttText(){
            this.attLbl.text = Util.formatNumber(this.data.value.score || 0);
        }

        setMySelf(){
            this.selfLbl.visible = this.data.value.self;
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void {
            super.partRemoved(partName,instance);
        }

    }
}