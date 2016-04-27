module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class PKHeroCompleteItemRenderer extends egret.gui.ItemRenderer {
		public titleImg:egret.gui.UIAsset;
		public fragmentLbl:egret.gui.Label;
		public equipExpLbl:egret.gui.Label;
		public moraleLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.PKHeroCompleteItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged(){
			super.dataChanged();
			this.setTitleImg(this.data);
			this.setMorale(this.data);
			this.setFragmentText(this.data);
			this.setEquipExpText(this.data);
		}

		setFragmentText(data){
			var fragment = data.fragment;
			this.fragmentLbl.text = "" + fragment;
		}

		setEquipExpText(data){
			var exp = data.exp;
			this.equipExpLbl.text = "" + exp;
		}

		setMorale(data){
			var moraleCost = data.moraleCost;
			this.moraleLbl.text = "-" + moraleCost;
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