module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class MasterPlayerItemRenderer extends egret.gui.ItemRenderer {
        public iconImg: egret.gui.UIAsset;
        public newTipImg: egret.gui.UIAsset;
        public nameLbl: egret.gui.Label;
        public lvLbl: egret.gui.Label;
        public damageLbl: egret.gui.Label;
        public selectRect:egret.gui.Rect;
        public buyPopGroup: egret.gui.Group;
        public buyPopBtn0: uiskins.BuyPopButton;
        public buyPopBtn1: uiskins.BuyPopButton;
        public btnItem:uiskins.CommonItemButton;
        public dataItem:any;
        private _clickBtnTime:any;
        private _showPopBtnTime:any;
        private isPlayingAni:any;

        public constructor() {
            super();
            this._clickBtnTime = 0;
            this._showPopBtnTime = 0;
            this.dataItem = {};
            this.isPlayingAni = false;
            this.skinName = skins.components.MasterPlayerItemRendererSkin;
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            this.btnItem.textLbl.text = "等级提升";
            this.buyPopBtn0.numLbl.text = "+100";
            this.buyPopBtn1.numLbl.text = "+10";
        }

        initData(){
            this.dataItem = {
                damage:this.getDmg(),
                cost:this.getCost(),
                addDmg:this.getAddDmg(),
                cost10:this.getCost10(),
                cost100:this.getCost100()
            }
        }

        getName(){
            return gm.dataManage.data.name || "英雄";
        }

        getLevel(){
            return gm.dataManage.data.masterLevel;
        }

        getCost(){
            return gm.dataManage.master.getUpgradePrice();
        }

        getCost10(){
            return gm.dataManage.master.getUpgradePrice(10);
        }

        getCost100(){
            return gm.dataManage.master.getUpgradePrice(100);
        }

        getDmg(){
            return gm.dataManage.master.getTapDamage();
        }

        getAddDmg(){
            return gm.dataManage.master.getNextLevelDMG();
        }

        isCostGold(cost){
            return gm.dataManage.data.gold >= cost;
        }

        dataChanged() {
            super.dataChanged();
            this.initData();
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setLevel();
            this.setDamage();
            this.setBuyPopGroup();
            this.setBtnAddDamage();
            this.setBtnCost();
            this.setBtnCost10();
            this.setBtnCost100();
            this.setBtnSource();
            this.setBtn10Source();
            this.setBtn100Source();
            this.setNewTipImg();
        }

        onTouchBtnClick(event:egret.TouchEvent){
            if(event.target == this.btnItem){
                if(this.isCostGold(this.dataItem.cost)){
                    this.setTutorial();
                }
                this.setTouchTapPopUpDialog(function(){
                    gm.dataManage.master.levelUp(1);
                }.bind(this));
            }
            if(event.target == this.buyPopBtn0){
                this.setTouchBeginBuyPopUpDialog();
                gm.dataManage.master.levelUp(100);
            }
            if(event.target == this.buyPopBtn1){
                this.setTouchBeginBuyPopUpDialog();
                gm.dataManage.master.levelUp(10);
            }
            if(event.target == this.selectRect){
                gm.gameUI.isAddNewEquip = false;
                this.setNewTipImg();
                gm.postMessage(consts.kMessageAddNewEquip);
                gm.guiLayer.addElement(new LoadingResLayer("equipres",function(){
                    var ly = new EquipLayer();
                    gm.guiLayer.addElement(ly);
                }.bind(this)));
            }
        }

        onTouchBegin(event:egret.TouchEvent) {
            if (event.target == this.btnItem) {
                this._clickBtnTime = new Date().getTime();
                this.setTouchBeginPopUpDialog();
            }
        }

        setTouchBeginPopUpDialog(){
            if(this.getLevel() <= 22){return ;}
            if(this.data.base.touchBeginTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
            }
            this.data.base.touchBeginTimeoutIndex = egret.setTimeout(function(){
                this.setTouchBeginBuyPopUpDialog();
            }.bind(this),this,500);
        }

        setTouchBeginBuyPopUpDialog(){
            if(this.getLevel() <= 22){return ;}
            this.buyPopGroup.visible = true;
            if(this.data.base.touchTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
            }
            this._showPopBtnTime = 3000;
            this.data.base.touchTimeoutTime = new Date().getTime();
            this.data.base.touchTimeoutIndex = egret.setTimeout(function(){
                this.buyPopGroup.visible = false;
            }.bind(this),this,this._showPopBtnTime);
        }

        setTouchTapPopUpDialog(cb){
            var currTime = new Date().getTime();
            var offsetTime = currTime - this._clickBtnTime;
            if(offsetTime <= 300){
                this._clickBtnTime = 0;
                this.setHideClickBtnPopUp();
                Util.invokeCallback(cb);
            }
            this.setTouchDoubleTapPopUpDialog();
        }

        setTouchDoubleTapPopUpDialog(){
            var currTime = new Date().getTime();
            var offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
            if(offsetDoubleTime > 400){
                this.data.base.touchDoubleTimes = 0;
                this.data.base.clickDoubleBtnTime = new Date().getTime();
            }
            offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
            if(offsetDoubleTime <= 400){
                this.data.base.touchDoubleTimes++;
                if(this.data.base.touchDoubleTimes >= 2){
                    this.setTouchBeginBuyPopUpDialog();
                    this.data.base.touchDoubleTimes = 0;
                    this.data.base.clickDoubleBtnTime = 0;
                }
            }
        }

        setBuyPopGroup(){
            var currTime = new Date().getTime();
            var popTime = this.data.base.touchTimeoutTime;
            var offsetTime = currTime - popTime;
            if(offsetTime < 3000){
                this._showPopBtnTime = 3000 - offsetTime;
                this.setShowPopGroup();
            }
            else {
                if(this.data.base.touchBeginTimeoutIndex == -1) {
                    this.setHidePopGroup();
                }
            }
        }

        setShowPopGroup(){
            this.buyPopGroup.visible = true;
            if(this.data.base.touchTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
            }
            if(this.data.base.touchBeginTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
                this.data.base.touchBeginTimeoutIndex = -1;
            }
            this.data.base.touchTimeoutIndex = egret.setTimeout(function(){
                this.buyPopGroup.visible = false;
            }.bind(this),this,this._showPopBtnTime);
        }

        setHidePopGroup(){
            this.buyPopGroup.visible = false;
            if(this.data.base.touchTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
                this.data.base.touchTimeoutIndex = -1;
                this.data.base.touchTimeoutTime = 0;
            }
            if(this.data.base.touchBeginTimeoutIndex != -1){
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
                this.data.base.touchBeginTimeoutIndex = -1;
            }
        }

        setHideClickBtnPopUp(){
            if(!this.buyPopGroup.visible){
                this.setHidePopGroup();
            }
        }

        setNewTipImg(){
            if(gm.gameUI.isAddNewEquip){
                this.newTipImg.visible = true;
                if(!this.isPlayingAni){
                    this.playNewTipAni();
                    this.isPlayingAni = true;
                }
            }
            else {
                this.newTipImg.visible = false;
                this.stopNewTipAni();
                this.isPlayingAni = false;
            }
        }

        playNewTipAni(){
            this.newTipImg.scaleX = 1;
            this.newTipImg.scaleY = 1;
            var tw = egret.Tween.get(this.newTipImg,{loop:true});
            tw.to({scaleX:1.1,scaleY:1.1},300).to({scaleX:1,scaleY:1},200);
        }

        stopNewTipAni(){
            egret.Tween.removeTweens(this.newTipImg);
        }

        setTutorial(){
            if(!gm.dataManage.data.tutorials[consts.kTutorialClickMasterUpgrade]){
                gm.dataManage.setTutorialFinish(consts.kTutorialClickMaster);
                gm.dataManage.setTutorialFinish(consts.kTutorialClickMasterUpgrade);
                gm.postMessage(consts.kMessageTutorialUpdate);
            }
        }


        setName(){
            this.nameLbl.text = this.getName();
        }

        setLevel(){
            this.lvLbl.text = this.getLevel() + "";
        }

        setDamage(){
            this.damageLbl.text = Util.formatNumber(this.dataItem.damage);
        }

        setIconImg(){
            var avatar = gm.dataManage.data.avatar || "";
            if(avatar != ""){
                Util.setIconImg(avatar,this.iconImg,96);
            }
        }

        setBtnAddDamage(){
            this.btnItem.upgradeLbl.text = _.sprintf("+ %s DMG",Util.formatNumber(this.dataItem.addDmg));
        }

        setBtnCost(){
            this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
        }

        setBtnCost10(){
            this.buyPopBtn1.costLbl.text = Util.formatNumber(this.dataItem.cost10);
        }

        setBtnCost100(){
            this.buyPopBtn0.costLbl.text = Util.formatNumber(this.dataItem.cost100);
        }

        setBtnSource(){
            var source = this.isCostGold(this.dataItem.cost) ? "btn_orange":"btn_disabled";
            this.btnItem.setBtnSkinName(source);
        }

        setBtn10Source(){
            var source = this.isCostGold(this.dataItem.cost10) ? "btn_pop_orange":"btn_pop_disabled";
            this.buyPopBtn1.setBtnSkinName(source);
        }

        setBtn100Source(){
            var source = this.isCostGold(this.dataItem.cost100) ? "btn_pop_orange":"btn_pop_disabled";
            this.buyPopBtn0.setBtnSkinName(source);
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void {
            super.partRemoved(partName,instance);
        }
    }
}
