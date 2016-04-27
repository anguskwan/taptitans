/**
 *
 * @author 
 *
 */
class RankBestLayer extends egret.gui.SkinnableComponent {
	public btnBack:egret.gui.Button;
	public bestGroup:egret.gui.Group;
	private rankToggleBtns:uiskins.RankToggleBtn[];
	private _initBest:any;

	public constructor(){
		super();
		this.skinName = skins.dialog.RankBestLayerSkin;
	}
	public childrenCreated() {
		this._initBest = true;
		this.rankToggleBtns = [];
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.bestInitGroup();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.btnBack){
			gm.guiLayer.removeElement(this);
		}
	}

	bestInitGroup(){
		var ly = new uiskins.RankBestGroup();
		this.bestGroup.addElement(ly);
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
