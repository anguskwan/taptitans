/**
 *
 * @author 
 *
 */
class MessageMatchRewardPanel extends egret.gui.SkinnableComponent {
    public closeBtn:egret.gui.Button;
    public numLbl1:egret.gui.Label;
    public numLbl2:egret.gui.Label;
    public value:any;
	public constructor(data?:any) {
        super();
        this.value = data;
        this.skinName = skins.dialog.MessageMatchRewardPanelSkin;
	}
    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.numLbl1.text = _.sprintf("%d钻石",this.value.diamond);
        this.numLbl2.text = _.sprintf("%d武器升级",this.value.weaponItem);
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


class MessageMatchHardRewardPanel extends MessageMatchRewardPanel {
    public numLbl3:egret.gui.Label;
    public constructor(data?:any) {
        super();
        this.value = data;
        this.skinName = skins.dialog.MessageMatchHardRewardPanelSkin;
    }

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.numLbl1.text = _.sprintf("%d钻石",this.value.diamond);
        this.numLbl2.text = _.sprintf("%d武器升级",this.value.weaponItem);
        this.numLbl3.text = _.sprintf("%d水晶",this.value.crystal);
    }

}