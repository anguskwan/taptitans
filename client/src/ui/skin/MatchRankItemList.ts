module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class MatchRankItemList extends egret.gui.SkinnableComponent {
        public iconImg: egret.gui.UIAsset;
        public nameLbl: egret.gui.Label;
        public numLbl: egret.gui.Label;
        public lvLbl: egret.gui.Label;
        public numImg: egret.gui.UIAsset;
        public stageImg: egret.gui.UIAsset;
        public lineImg:egret.gui.UIAsset;
        public value: any;
        public constructor(data?: any) {
            super();
            this.value = data;
            this.skinName = skins.components.MatchRankItemListSkin;
        }

        public set dataItem(value: any) {
            this.value = value;
        }

        public get dataItem(): any {
            return this.value;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.changeItemStatus();
        }

        getStageSetId() {
            var stage = this.value.score;
            var setId = Math.ceil(stage / 5);
            setId = Util.modByLimit(setId, 10);
            return setId;
        }

        getStageMission(){
            var stage = this.value.score;
            var setId = Util.modByLimit(stage, 5);
            //console.log("stage" + stage + "setId" + setId);
            return setId;
        }

        changeItemStatus() {
            if(this.value.rank <= 3) {
                this.numLbl.visible = false;
                this.numImg.visible = true;
                this.numImg.source = "rank_num" + this.value.rank;
            }
            else {
                this.numLbl.visible = true;
                this.numImg.visible = false;
            }
            this.nameLbl.text = this.value.name;
            this.numLbl.text = "" + this.value.rank;
            this.lvLbl.text = _.sprintf("%d关",this.value.score);
            this.stageImg.source = "submap" + this.getStageSetId() + "_" + this.getStageMission();
            this.lineImg.visible = this.value.isHideLine;
            if(this.value.avatar != "") {
                var url = this.getWechatUrlBySize(this.value.avatar,96);
                //var url = "resource/image/scene_bg1.png";
                //var url = "http://wx.qlogo.cn/mmopen/UUiahibzfr6ichbwdRYFiaKgM77jdMWqdXA0ickibct3h1WC8ySeKSxS3wAoA7oEiaLVY1ricSAVdj947F0gQwCzCibny0Wevpogs1xY7/96"
                //var newUrl = this.getWechatUrlBySize(url,96);
                RES.getResByUrl(url,function(event: any) {
                    this.iconImg.source = event;
                    //var scaleX = this.iconImg.width / event.textureWidth;
                    //var scaleY = this.iconImg.height / event.textureHeight;
                    //this.iconImg.scaleX = scaleX;
                    //this.iconImg.scaleY = scaleY;
                },this,RES.ResourceItem.TYPE_IMAGE);
            }
            if(this.value.isSelf){
                this.lvLbl.textColor = 0xEB780F;
                this.numLbl.textColor = 0xEB780F;
                this.nameLbl.textColor = 0xEB780F;
            }
            else {
                this.lvLbl.textColor = 0xFFFFFF;
                this.numLbl.textColor = 0xFFFFFF;
                this.nameLbl.textColor = 0xFFFFFF;
            }
        }

        getWechatUrlBySize(url,size) {
            return url.replace(/\/[0-9]+$/,"/" + size);
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void {
            super.partRemoved(partName,instance);
        }
    }
}