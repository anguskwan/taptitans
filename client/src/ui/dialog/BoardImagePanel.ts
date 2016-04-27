/**
 *
 * @author 
 *
 */
class BoardImagePanel extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public constructor() {
		super();
		this.skinName = skins.dialog.BoardImagePanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
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
