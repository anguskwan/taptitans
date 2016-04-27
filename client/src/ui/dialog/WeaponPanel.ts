/**
 *
 * @author 
 *
 */
class WeaponPanel extends egret.gui.SkinnableContainer{
    public bgRect:egret.gui.Rect;
    public closeBtn:egret.gui.Button;
    public unSelectLbl:egret.gui.Label;
    public selectGroup:egret.gui.Label;
    public levelLbl:egret.gui.Label;
    public nameLbl:egret.gui.Label;
    public dpsLbl:egret.gui.Label;
    public weaponImg:egret.gui.UIAsset;
    public heroImg:egret.gui.UIAsset;
    public currLevelLbl:egret.gui.Label;
    public currDPSLbl:egret.gui.Label;
    public nextLevelLbl:egret.gui.Label;
    public nextDPSLbl:egret.gui.Label;
    public value:any;

    public resetGroup:egret.gui.Group;
    public resetBtn:egret.gui.Button;
    public crystalLbl:egret.gui.Label;
    public selectIndex:any;
    public priceArr:any;

    public lblTotal:egret.gui.Label;
    public resetGroupTotal:egret.gui.Group;


    public lblTitle1:egret.gui.Label;
    public lblTitle2:egret.gui.Label;

    setResetBtn(index){
        this.selectIndex = index;
        var weaponLevel:number = gm.dataManage.data.heroWeapons[index] || 0;
        this.resetGroup.visible = weaponLevel != 0;
        this.resetGroupTotal.visible = weaponLevel != 0;

        var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
        var idx = Math.min(6,resetWeapon);
        var price = this.priceArr[idx];
        this.crystalLbl.text = price + "";
    }

    updateResetStatus(){
        this.setResetBtn(this.selectIndex);
        for(var i:number = 1;i <= 33;i++){
            var weaponLevel:number = gm.dataManage.data.heroWeapons[i] || 0;
            this["selectItem" + i].dataItem.isSelect = (this.selectIndex == i);
            this["selectItem" + i].dataItem.lv = "" + weaponLevel;
            this["selectItem" + i].changeDataItem();
        }
        var minLv:any = 0;
        var newArray = _.filter(gm.dataManage.data.heroWeapons, function(num){ return num != 0;}.bind(this));
        if(_.size(newArray) == 33){
            minLv = _.min(newArray);
        }
        this.currLevelLbl.text = minLv + "";
        this.currDPSLbl.text = _.sprintf("英雄DPS x%d",minLv*10);
        this.nextLevelLbl.text = (minLv + 1) + "";
        this.nextDPSLbl.text = _.sprintf("英雄DPS x%d",(minLv + 1)*10);

        var crystal = gm.dataManage.data.crystal;
        this.lblTotal.text=_.sprintf("%d",crystal);
    }

    onResetWeapon(){
        if(this.selectIndex == -1){return ;}
        var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
        var idx = Math.min(6,resetWeapon);
        var price = this.priceArr[idx];
        if (!gm.dataManage.costMoney(price,'crystal')) {
            gm.postMessage(consts.kMessageShowToastLayer,"水晶不足");
            return false;
        }
        gm.gameUI.showLoadingLayer();
        var wid = this.selectIndex;
        gm.dataManage.resetWeapon(wid,function(){
            gm.dataManage.useWeaponItem(function(){
                this.updateResetStatus();
                gm.postMessage(consts.kMessageAddWeapon);
            }.bind(this));
        }.bind(this),function(){
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    }

    public constructor() {
        super();
        this.skinName = skins.dialog.WeaponPanelSkin;
        this.selectIndex = -1;
        this.priceArr = [50, 50, 60, 60, 80, 80, 100];
    }

    public setTitle(){

        //this.lblTitle1.text="请选择要洗的武器";
        //this.lblTitle1.text="牺牲1个现有的武器，你可以重新获得1次抽取\n武器的机会。";
    }


    public addBgRectColorAndCenter(){
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect,0);
        this.width = width;
        this.height = height;
    }

    public set dataItem(value:any){
        this.value = value;
    }

    public get dataItem():any{
        return this.value;
    }

    public childrenCreated() {
        super.childrenCreated();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
        this.initAllElement();
        //this.cacheAsBitmap = true;

        var crystal = gm.dataManage.data.crystal;
        this.lblTotal.text = _.sprintf("%d", crystal);
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        this.onTouchTarget(event.target);
    }

    onTouchTarget(target){
        if(target == this.closeBtn){
            gm.guiLayer.removeElement(this);
        }
        else if(target == this.resetBtn)
        {
            this.onResetWeapon();
        }
        this.selectItemChangeStatus(target);
    }

    setSelectItem(index){
        this.selectGroup.visible = true;
        this.unSelectLbl.visible = false;
        //hero skill level
        var weaponLevel:number = gm.dataManage.data.heroWeapons[index] || 0;
        this.levelLbl.text = _.sprintf("武器升级：%d",weaponLevel);
        this.nameLbl.text = Conf.hero[index].name;
        this.dpsLbl.text = _.sprintf("+%d%%攻击力",weaponLevel*50);
        this.weaponImg.source = "heroskill" + index + "_1";
        this.heroImg.source = "hero" + index;

        this.setResetBtn(index);
    }

    selectItemChangeStatus(target){
        var index:number = -1;
        for(var i:number = 1;i <= 33;i++){
            if(target == this["selectItem" + i]){
                //select target
                index = i;
                this.setSelectItem(index);
            }
        }
        if(index != -1){
            for(var i:number = 1;i <= 33;i++){
                this["selectItem" + i].dataItem.isSelect = (index == i);
                this["selectItem" + i].changeDataItem();
            }
        }
    }

    initAllElement(){
        var data:any;
        for(var i:number = 1;i <= 33;i++){
            var weaponLevel:number = gm.dataManage.data.heroWeapons[i] || 0;
            data = {
                isSelect:false,
                iconSource:"heroskill" + i + "_1",
                lv:"" + weaponLevel
            };
            this["selectItem" + i].dataItem = data;
            this["selectItem" + i].changeDataItem();
        }
        var minLv:any = 0;
        var newArray = _.filter(gm.dataManage.data.heroWeapons, function(num){ return num != 0;}.bind(this));
        if(_.size(newArray) == 33){
            minLv = _.min(newArray);
        }
        this.currLevelLbl.text = minLv + "";
        this.currDPSLbl.text = _.sprintf("英雄DPS x%d",minLv*10);
        this.nextLevelLbl.text = (minLv + 1) + "";
        this.nextDPSLbl.text = _.sprintf("英雄DPS x%d",(minLv + 1)*10);
    }

    changeItemStatus(){

    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
