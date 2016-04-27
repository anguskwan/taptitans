/**
 *
 * @author 
 *
 */
class GuildInfoPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public constructor() {
		super();
		this.skinName = skins.dialog.GuildInfoPanelSkin;
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
}
