/**
 *
 * @author 
 *
 */
class PetInfoLayer extends egret.gui.SkinnableComponent {


	public constructor() {
		super();

		this.skinName = skins.dialog.ActivityLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);

	}

	public onTouchLayer(event:egret.TouchEvent) {

	}
}
