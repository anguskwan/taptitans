/**
 *
 * @author 
 *
 */
class MessageDailyPanel extends egret.gui.SkinnableContainer {
    public closeBtn:egret.gui.Button;
    public iconImg:egret.gui.UIAsset;
    public numLbl:egret.gui.Label;
    public bgRect:egret.gui.Rect;
    public iconSource:any;
    public num:any;
	public constructor(iconSource,num) {
        super();
        this.iconSource = iconSource;
        this.num = num;
        this.skinName = skins.dialog.MessageDailyPanelSkin;
	}
    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
        this.iconImg.source  = this.iconSource;
        this.numLbl.text  = "x" + this.num;
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


    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        this.onTouchTarget(event.target);
    }

    onTouchTarget(target){
        if(target == this.closeBtn){
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
