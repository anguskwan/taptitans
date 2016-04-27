/**
 *
 * @author 
 *
 */
class ToastLayer extends egret.gui.SkinnableComponent {
    public descLbl:egret.gui.Label;
    public _desc:any;
    public constructor(desc) {
        super();
        this._desc = desc;
        this.skinName = skins.dialog.ToastLayerSkin;        
    }
    
    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.descLbl.text = this._desc;
    }
    
    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
    }
    
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }
    
    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
