/**
 *
 * @author 
 *
 */
class PrestigeSkillPanel extends egret.gui.SkinnableContainer{
    public unlockLbl:egret.gui.Label;
    public iconDisabled:egret.gui.Label;
    public closeBtn:egret.gui.Button;
    public bgRect:egret.gui.Rect;
    public value:any;

    public constructor(data?:any) {
        super();
        this.value = data;
        this.skinName = skins.dialog.PrestigeSkillPanelSkin;
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
        this.iconDisabled.visible = !this.value.isUnlock;
        this.unlockLbl.visible = !this.value.isUnlock;
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
