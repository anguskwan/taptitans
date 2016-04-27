/**
 *
 * @author 
 *
 */
class OffOnLineCoinPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public bgRect:egret.gui.Rect;
	public constructor() {
		super();
		this.skinName = skins.dialog.OffOnLineCoinPanelSkin;
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
//			egret.gui.PopUpManager.removePopUp(this);
			gm.guiLayer.removeElement(this);
		}
	}
	/**
	 partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
	 必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
	 可以避免写在 childrenCreated 中修改造成的多次测量。


	 The method "partAdded" will be called just after the
	 skin parts is assigned to the property. You can make
	 changes will effect to the layout or other components.
	 */
	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
