module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankInviteItemList extends egret.gui.ItemRenderer {
		public btnFriend:egret.gui.Button;
		public constructor() {
			super();
			this.skinName = skins.components.RankInviteItemListSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.btnFriend.clickHandler = this.touchBtnFriend;
		}

		dataChanged() {
			super.dataChanged();
		}

		public touchBtnFriend(event:egret.TouchEvent){
			var ly = new ShareLayer();
			gm.guiLayer.addElement(ly);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
