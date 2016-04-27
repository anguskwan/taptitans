module uiskins {
	/**
	 *
	 * @author
	 *
	 */
	export class MailRewardElement extends egret.gui.SkinnableComponent {
		public iconImg:egret.gui.UIAsset;
		public numLbl:egret.gui.Label;
		private _value:any;
		public constructor(data) {
			super();
			this._value = data;
			this.skinName = skins.components.MailRewardElementSkin;
		}

		childrenCreated(){
			super.childrenCreated();
			this.setIconImg();
			this.setNumText();
		}

		setIconImg(){
			var elementTypeSource = gm.gameUI.getElementTypeSource(this._value.type);
			this.iconImg.source = elementTypeSource.icon;
		}

		setNumText(){
			this.numLbl.text = Util.formatNumber(this._value.num);
		}
	}
}
