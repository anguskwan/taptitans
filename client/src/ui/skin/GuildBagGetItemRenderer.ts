module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildBagGetItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public diamondLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildBagGetItemRendererSkin;
		}

		dataChanged() {
			super.dataChanged();
			this.setNameText();
			this.setIconImg();
			this.setDiamondText();
		}

		setNameText(){
			var name = this.data.name || "英雄";
			this.nameLbl.text = name;
		}

		setIconImg(){
			var avatar = this.data.avatar || "";
			if(avatar != ""){
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else {
				this.iconImg.source = "icon_default";
			}
		}

		setDiamondText(){
			this.diamondLbl.text = _.sprintf("%d",this.data.num);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
