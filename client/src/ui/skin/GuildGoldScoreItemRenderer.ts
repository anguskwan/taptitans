module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildGoldScoreItemRenderer extends egret.gui.ItemRenderer {
		public numLbl:egret.gui.Label;
		public numImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public iconImg:uiskins.GuildBadgeItem;
		public scoreLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildGoldScoreItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setIconImg();
			this.setScoreText();
			this.setRank();
			this.setNameText();
		}

		setNameText(){
			this.nameLbl.text = this.data.name || "公会";
		}

		setIconImg(){
			var name = this.data.presidentName || "英雄会长";
			var data = {
				iconSource:this.data.icon || "guild_badge1",
				name:name[0]
			};
			this.iconImg.dataItem = data;
			this.iconImg.changeDataItem();
		}

		setScoreText() {
			var score = this.data.score || 0;
			var text = _.sprintf("<font color=0xa6600e>积分：</font><font color=0xfdc812>%d</font>",parseInt(score));
			Util.setStyleText(this.scoreLbl,text);
		}

		setRank(){
			var rank = this.data.rank + 1;
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
	}
}
