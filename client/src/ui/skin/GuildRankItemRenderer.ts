module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildRankItemRenderer extends egret.gui.ItemRenderer {
		public numLbl:egret.gui.Label;
		public numImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public iconImg:uiskins.GuildBadgeItem;
		public memberLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public lvLbl:egret.gui.Label;

		public constructor() {
			super();
			this.skinName = skins.components.GuildRankItemRendererSkin;
		}

		getMaxMember(){
			var members = this.data.level - 1;
			return 10 + members;
		}

		isFull(){
			return this.data.memberCount >= this.getMaxMember();
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setIconImg();
			this.setMemberText();
			this.setAttText();
			this.setRank();
			this.setNameText();
			this.setLevelText();
		}

		setNameText(){
			this.nameLbl.text = this.data.name;
		}

		setIconImg(){
			var name = this.data.presidentName || "英雄会长";
			var data = {
				iconSource:this.data.icon,
				name:name[0]
			};
			this.iconImg.dataItem = data;
			this.iconImg.changeDataItem();
		}

		setMemberText(){
			this.memberLbl.text = _.sprintf("%d/%d",this.data.memberCount,this.getMaxMember());
			if(this.isFull()){
				this.memberLbl.textColor = 0xF34627;
			}
			else {
				this.memberLbl.textColor = 0x25ff3a;
			}
		}

		setAttText() {
			this.attLbl.text = Util.formatNumber(this.data.score);
		}

		setLevelText(){
			var level = this.data.level || 1;
			this.lvLbl.text = _.sprintf("Lv.%d",level);
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
