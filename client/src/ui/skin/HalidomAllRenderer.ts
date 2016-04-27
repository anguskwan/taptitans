module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HalidomAllRenderer extends egret.gui.ItemRenderer {

		public constructor() {
			super();
			this.skinName = skins.components.HalidomAllSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		getArtifactCost(){
			return gm.dataManage.artifact.getArtifactCost();
		}

		dataChanged() {
			super.dataChanged();
			//直接更改资源
			this.setBtnCost();
		}

		setBtnCost(){

		}

		onTouchBtnClick(event:egret.TouchEvent){
			var layer = new ArtifactList();
			gm.guiLayer.addElement(layer);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}