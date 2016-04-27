/**
 *
 * @author 
 *
 */
class MessagePanel extends egret.gui.SkinnableContainer {
    public titleLbl:egret.gui.Label;
    public descLbl:egret.gui.Label;
    public closeBtn:egret.gui.Button;
    public rightBtn:egret.gui.Button;
    public closeCallFunction:any;
    public rightCallFunction:any;
    public titleText:any;
    public descText:any;
    public bgRect:egret.gui.Rect;
	public constructor(title,desc,rightCb?,closeCb?) {
        super();
        this.closeCallFunction = closeCb;
        this.rightCallFunction = rightCb;
        this.titleText = title;
        this.descText = desc;
        this.skinName = skins.dialog.MessagePanelSkin;
	}

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
        this.titleLbl.text  = this.titleText;
        this.descLbl.text  = this.descText;
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
            if(this.closeCallFunction){
                Util.invokeCallback(this.closeCallFunction,this);
            }
            else {
                gm.guiLayer.removeElement(this);
            }
        }
        if(target == this.rightBtn){
            if(this.rightCallFunction){
                Util.invokeCallback(this.rightCallFunction,this);
            }
            else{
                gm.guiLayer.removeElement(this);
            }
        }
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }

}
