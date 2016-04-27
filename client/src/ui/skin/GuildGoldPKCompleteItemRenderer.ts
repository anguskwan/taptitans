module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildGoldPKCompleteItemRenderer extends egret.gui.ItemRenderer {
		public titleImg:egret.gui.UIAsset;
		public expLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildGoldPKCompleteItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged(){
			super.dataChanged();
			this.setTitleImg(this.data);
			this.setExpText(this.data);
		}

		setExpText(data){
			var exp = data.exp;
			this.expLbl.text = "" + exp;
		}

		setTitleImg(data){
			this.titleImg.source = data.isWin ? "pk_complete_victory":"pk_complete_lose";
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
