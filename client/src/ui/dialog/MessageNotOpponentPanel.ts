/**
 *
 * @author 
 *
 */
class MessageNotOpponentPanel extends egret.gui.SkinnableContainer {
    public closeBtn: egret.gui.Button;
    public constructor() {
        super();
        this.skinName = skins.dialog.MessageNotOpponentPanelSkin;
    }

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
    }

    onTouchLayer(event: egret.TouchEvent) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    }

    onTouchTarget(target) {
        if(target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void {
        super.partRemoved(partName,instance);
    }

}
