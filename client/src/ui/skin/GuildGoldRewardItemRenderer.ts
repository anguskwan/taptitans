module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildGoldRewardItemRenderer extends egret.gui.ItemRenderer {
		public rankLbl:egret.gui.Label;
		public fragmentLbl:egret.gui.Label;
		public crystalLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildGoldRewardItemRendererSkin;
		}

		getGuildGoldMeta(){
			return Conf.guildGoldScore[this.data.id];
		}

		getRankNumText(){
			var meta = this.getGuildGoldMeta();
			var text1:any = "";
			var text2:any = "";
			var rank1 = meta["rank"][0];
			var rank2 = meta["rank"][1];
			if(rank1){
				text1 = "" + rank1;
			}
			if(rank2){
				text2 = "-" + rank2;
			}
			return (text1 + text2);
		}

		dataChanged(){
			super.dataChanged();
			this.setRankText();
			this.setFragmentText();
			this.setCrystalText();
		}

		setRankText(){
			this.rankLbl.text = _.sprintf("第%s名",this.getRankNumText())
		}

		setFragmentText(){
			var num = this.getGuildGoldMeta()["fragment"];
			this.fragmentLbl.text = "" + num;
		}

		setCrystalText(){
			var num = this.getGuildGoldMeta()["crystal"];
			this.crystalLbl.text = "" + num;
		}
	}
}
