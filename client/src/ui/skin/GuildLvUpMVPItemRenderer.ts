module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildLvUpMVPItemRenderer extends egret.gui.ItemRenderer {
		public nameLbl:egret.gui.Label;
		public contributionLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public numLbl:egret.gui.Label;
		public numImg:egret.gui.UIAsset;
		public constructor() {
			super();
			this.skinName = skins.components.GuildLvUpMVPItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setContributionText();
			this.setNameText();
			this.setRank();
			this.setIconImg();
		}

		setNameText(){
			this.nameLbl.text = this.data.name || "英雄";
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

		setRank(){
			var rank = (this.itemIndex - 5) + 1;
			if(rank <= 3){
				this.numImg.visible = true;
				this.numLbl.visible = false;
				this.numImg.source = "rank_num" + rank;
			}
			else {
				this.numImg.visible = false;
				this.numLbl.visible = true;
				this.numLbl.text = rank + "";
			}
		}

		setContributionText(){
			this.contributionLbl.text = this.data.contribution + "";
		}
	}
}