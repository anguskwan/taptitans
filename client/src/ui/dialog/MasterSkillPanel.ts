/**
 *
 * @author 
 *
 */
class MasterSkillPanel extends egret.gui.SkinnableContainer {
    public iconImg:egret.gui.UIAsset;
    public iconDisabled:egret.gui.Rect;
    public lvGroup:egret.gui.Group;
    public unlockLbl:egret.gui.Label;
    public nameLbl:egret.gui.Label;
    public explainLbl1:egret.gui.Label;
    public explainLbl2:egret.gui.Label;
    public closeBtn:egret.gui.Button;
    public lvLbl:egret.gui.Label;
    public bgRect:egret.gui.Rect;
    public value:any;

	public constructor(data?:any) {
        super();
        this.value = data;
        this.skinName = skins.dialog.MasterSkillPanelSkin;
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

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.nameLbl.text = this.value.name;
        this.iconImg.source = this.value.iconSource;
        this.iconDisabled.visible = this.value.isUnlock ? ((this.value.lv == 0) ? true:false):true;
        this.lvGroup.visible = this.value.isUnlock;
        this.unlockLbl.visible = !this.value.isUnlock;
        this.unlockLbl.text = this.value.unlockDesc;
        this.lvLbl.text = this.value.lv;
        this.explainLbl1.text = this.value.explainDesc1;
        this.explainLbl2.text = this.value.explainDesc2;
        this.addBgRectColorAndCenter();
    }

    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        this.onTouchTarget(event.target);
    }

    onTouchTarget(target){
        if(target == this.closeBtn){
//            egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
