/**
 *
 * @author 
 *
 */
class MessagePayFailPanel extends egret.gui.SkinnableContainer {
    public closeBtn:egret.gui.Button;
    public rightBtn:egret.gui.Button;
    public closeCallFunction:any;
    public rightCallFunction:any;
    public bgRect:egret.gui.Rect;
	public constructor(rightCb?,closeCb?) {
        super();
        this.closeCallFunction = closeCb;
        this.rightCallFunction = rightCb;
        this.skinName = skins.dialog.MessagePayFailPanelSkin;
	}

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
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
