module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildGoldItemRenderer extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public guildNameLbl:egret.gui.Label;
		public scoreLbl:egret.gui.Label;
		public numLbl:egret.gui.Label;
		public numImg:egret.gui.UIAsset;

		public constructor() {
			super();
			this.skinName = skins.components.GuildGoldItemRendererSkin;
		}

		public childrenCreated() {

		}

		dataChanged() {
			super.dataChanged();
			this.setNameText();
			this.setRankImg();
			this.setIconImg();
			this.setAttText();
			this.setGuildNameText();
			this.setScoreText();
		}

		setAttText(){
			var battlePoint = this.data.value.battlePoint;
			if (isNaN(parseInt(battlePoint))) {
				battlePoint = parseInt(battlePoint);
			}
			this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
		}

		setNameText(){
			var baseName = this.data.value.name || "英雄";
			var name = _.truncate(baseName,4);
			this.nameLbl.text = name;
		}

		setRankImg(){
			var rank = this.data.value.rank + 1;
			if(rank <= 3){
				this.numLbl.visible = false;
				this.numImg.visible = true;
				this.numImg.source = "rank_num" + rank;
			}
			else {
				this.numLbl.visible = true;
				this.numLbl.text = rank + "";
				this.numImg.visible = false;
			}
		}

		setIconImg(){
			var avatar = this.data.value.avatar || "";
			if(avatar != "") {
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else{
				this.iconImg.source = "icon_default";
			}
		}

		setGuildNameText(){
			var baseName = this.data.value.guildName || "公会名称";
			var name = _.truncate(baseName,4);
			var text = _.sprintf("<font color=0xa6600e>公会：</font><font color=0xffffff>%s</font>",name);
			Util.setStyleText(this.guildNameLbl,text);
		}

		setScoreText(){
			var score = this.data.value.score || 0;
			var text = _.sprintf("<font color=0xa6600e>积分：</font><font color=0xfdc812>%d</font>",parseInt(score));
			Util.setStyleText(this.scoreLbl,text);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
