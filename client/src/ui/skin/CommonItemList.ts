module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class CommonItemList extends egret.gui.SkinnableComponent {
        public iconImg: egret.gui.UIAsset;
        public iconDisabled: egret.gui.Rect;
        public nameLbl: egret.gui.Label;
        public lvLbl: egret.gui.Label;
        public damageLbl:egret.gui.Label;
        public dpsLbl: egret.gui.Label;
        public shopSkillTimeLbl:egret.gui.Label;
        public lvArtifactsLbl:egret.gui.Label;
        public explainLbl: egret.gui.Label;
        public skillsGroup: egret.gui.Group;
        public lvGroup:egret.gui.Group;
        public dpsGroup:egret.gui.Group;
        public damageGroup:egret.gui.Group;
        public lvArtifactsGroup:egret.gui.Group;
        public btnItem: uiskins.CommonItemButton;
        public btnBigItem: uiskins.CommonBigItemButton;
        public prestigeLbl:egret.gui.Label;
        public iconBigDisabled:egret.gui.Rect;
        public buyPopGroup:egret.gui.Group;
        public buyPopBtn100:uiskins.BuyPopButton;
        public buyPopBtn10:uiskins.BuyPopButton;
        public showBuyPopTime:any;
        public showTimer:egret.Timer;
        public hideTimer:egret.Timer;
        public revivalTimer:egret.Timer;
        public effectImg:egret.gui.UIAsset;
        public isNotBuyPop:any;
        public value:any;
        public isGetIcon:boolean;
        public isPlayingAni:boolean;
        public newTipImg:egret.gui.UIAsset;
        public doubleTipImg:egret.gui.UIAsset;
        public nameLineImg:egret.gui.UIAsset;
        public shopLbl:egret.gui.Label;
        public isPlayingShopAni:boolean;
        public revivalTimeLbl:egret.gui.Label;
        public revivalGroup:egret.gui.Group;
        
		public constructor(data?:any) {
            super();
            this.value = data;
            this.isGetIcon = false;
            this.isPlayingAni = false;
            this.isPlayingShopAni = false;
            this.revivalTimer = null;
            this.skinName = skins.components.CommonItemListSkin;
		}
		
        public childrenCreated() {
            super.childrenCreated();
            //this.btnItem;egret.gui.Button
            this.changeItemStatus();
        }

        public resetItemStatus(){
            this.nameLbl.visible = true;
            this.lvGroup.visible = true;
            this.dpsGroup.visible = true;
            this.damageGroup.visible = true;
            this.explainLbl.visible = true;
            this.prestigeLbl.visible = true;
            this.skillsGroup.visible = true;
            this.lvArtifactsGroup.visible = true;
            this.btnItem.visible = true;
            //this.iconDisabled.visible = true;
            this.btnBigItem.visible = true;
            //this.iconBigDisabled.visible = true;
            //this.effectImg.visible = true;
        }

        getWechatUrlBySize(url,size){
            return url.replace(/\/[0-9]+$/, "/" + size);
        }

        public changeItemStatus(){
            this.resetItemStatus();
            var btnItem:any;
            if(this.value.type == consts.kItemListTypeByPlayer){
                this.lvLbl.text = this.value.lv;
                this.damageLbl.text = this.value.damage;
                this.nameLbl.text = this.value.name;
                var avatar = this.value.avatar || "";//"http://wx.qlogo.cn/mmopen/UUiahibzfr6ichbwdRYFiaKgM77jdMWqdXA0ickibct3h1WC8ySeKSxS3wAoA7oEiaLVY1ricSAVdj947F0gQwCzCibny0Wevpogs1xY7/0";
                if(avatar != ""){
                    //if(!this.isGetIcon){
                        var url = this.getWechatUrlBySize(avatar,96);
                        RES.getResByUrl(url, function(event:any) {
                            this.iconImg.source = event;
                            //var scaleX = this.iconImg.width/event.textureWidth;
                            //var scaleY = this.iconImg.height/event.textureHeight;
                            //this.iconImg.scaleX = scaleX;
                            //this.iconImg.scaleY = scaleY;
                            //this.isGetIcon = true;
                        }, this, RES.ResourceItem.TYPE_IMAGE);
                    //}
                }
                this.explainLbl.visible = false;
                this.skillsGroup.visible = false;
                this.dpsGroup.visible = false;
                this.prestigeLbl.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconBigDisabled.visible = false;
                this.effectImg.visible = false;
                btnItem = this.btnItem;
            }
            if(this.value.type == consts.kItemListTypeByMaster){
                this.nameLbl.text = this.value.name;
                this.lvLbl.text = this.value.lv;
                this.explainLbl.text = this.value.desc;
                this.damageGroup.visible = false;
                this.dpsGroup.visible = false;
                this.skillsGroup.visible = false;
                this.prestigeLbl.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconBigDisabled.visible = false;
                this.explainLbl.textColor = 0x8F8699;
                this.effectImg.visible = false;
                btnItem = this.btnItem;
            }
            if(this.value.type == consts.kItemListTypeByHeroes){
                this.nameLbl.text = this.value.name;
                this.lvLbl.text = this.value.lv;
                this.dpsLbl.text = this.value.dps;
                this.damageGroup.visible = false;
                this.explainLbl.visible = false;
                this.prestigeLbl.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconBigDisabled.visible = false;
                btnItem = this.btnItem;
            }
            if(this.value.type == consts.kItemListTypeByHalidom){
                this.prestigeLbl.text = this.value.effectDesc;
                this.explainLbl.text = this.value.dmgDesc;
                this.nameLbl.text = this.value.name;
                this.lvArtifactsLbl.text = this.value.lv;
                this.lvGroup.visible = false;
                this.skillsGroup.visible = false;
                this.dpsGroup.visible = false;
                this.damageGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconDisabled.visible = false;
                this.iconBigDisabled.visible = false;
                this.effectImg.visible = false;
                //set text color
                this.prestigeLbl.textColor = 0x8F8699;
                this.explainLbl.textColor = 0x8F8699;
                btnItem = this.btnItem;
            }
            if(this.value.type == consts.kItemListTypeByHalidomBuyArtifacts){
                this.nameLbl.visible = false;
                this.lvGroup.visible = false;
                this.dpsGroup.visible = false;
                this.damageGroup.visible = false;
                this.explainLbl.visible = false;
                this.prestigeLbl.visible = false;
                this.skillsGroup.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnItem.visible = false;
                this.iconDisabled.visible = false;
                this.effectImg.visible = false;
                //this.iconBigDisabled.visible = false;
                btnItem = this.btnBigItem;
            }
            if(this.value.type == consts.kItemListTypeByMasterPrestige){
                this.nameLbl.text = this.value.name;
                this.prestigeLbl.text = this.value.desc;
                this.lvGroup.visible = false;
                this.dpsGroup.visible = false;
                this.skillsGroup.visible = false;
                this.explainLbl.visible = false;
                this.damageGroup.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconBigDisabled.visible = false;
                this.effectImg.visible = false;
                this.prestigeLbl.textColor = 0x8F8699;
                btnItem = this.btnItem;
            }
            if(this.value.type == consts.kItemListTypeByWeaponUpgrade){
                this.nameLbl.visible = false;
                this.lvGroup.visible = false;
                this.dpsGroup.visible = false;
                this.damageGroup.visible = false;
                this.explainLbl.visible = false;
                this.prestigeLbl.visible = false;
                this.skillsGroup.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnItem.visible = false;
                this.iconDisabled.visible = false;
                this.iconBigDisabled.visible = false;
                this.effectImg.visible = false;
                btnItem = this.btnBigItem;
            }
            if(this.value.type == consts.kItemListTypeByShop){
                this.nameLbl.text = this.value.name;
                this.prestigeLbl.text = this.value.desc;
                this.lvGroup.visible = false;
                this.dpsGroup.visible = false;
                this.skillsGroup.visible = false;
                this.explainLbl.visible = false;
                this.damageGroup.visible = false;
                this.lvArtifactsGroup.visible = false;
                this.btnBigItem.visible = false;
                this.iconDisabled.visible = false;
                this.iconBigDisabled.visible = false;
                this.effectImg.visible = false;
                this.prestigeLbl.textColor = 0x8F8699;
                btnItem = this.btnItem;
            }
            this.iconImg.source = this.value.iconImg == ""? "icon_skill1":this.value.iconImg;
            btnItem.dataItem = this.value.btn;
            btnItem.changeDataItem();
            if(this.value.btn10){
                this.buyPopBtn10.dataItem = this.value.btn10;
                this.buyPopBtn10.changeDataItem();
            }
            if(this.value.btn100){
                this.buyPopBtn100.dataItem = this.value.btn100;
                this.buyPopBtn100.changeDataItem();
            }
        }
        public set dataItem(value:any){
            this.value = value;
        }

        public get dataItem():any{
            return this.value;
        }

        private _revivalInterval = -1;
        private _revivalTimeout = -1;
        setRevivalTimer(time,cb,finishCb){
            this.stopRevialTimer();
            // btn size 14
            this.btnItem.textLbl.size = 30;
            this.revivalGroup.visible = true;
            this._revivalInterval = egret.setInterval(function() {
                Util.invokeCallback(cb);
            }, this,1000);
            this._revivalTimeout = egret.setTimeout(function() {
                Util.invokeCallback(finishCb);
                egret.clearInterval(this._revivalInterval);
            }.bind(this),this,time);
        }

        stopRevialTimer(){
            if(this._revivalInterval != -1){
                egret.clearInterval(this._revivalInterval);
            }
            if( this._revivalTimeout != -1){
                egret.clearInterval(this._revivalTimeout);
            }
            // btn size 14
            this.btnItem.textLbl.size = 14;
            this.revivalGroup.visible = false;
        }
		
        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }
        
        public partRemoved(partName: string,instance: any): void{
            super.partRemoved(partName,instance);
        }
        
	}
}
