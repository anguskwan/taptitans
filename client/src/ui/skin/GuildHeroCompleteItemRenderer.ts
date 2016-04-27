module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildHeroCompleteItemRenderer extends egret.gui.ItemRenderer {
		public killNumLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildHeroCompleteItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.killNumLbl.text = this.data.killNum + "";
		}
	}
}