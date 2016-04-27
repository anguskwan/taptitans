module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankBestItemList extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public currLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public numLbl:egret.gui.Label;
		public numImg:egret.gui.UIAsset;

		public constructor() {
			super();
			this.skinName = skins.components.RankBestItemListSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setNameText();
			this.setCurrText();
			this.setAttText();
			this.setRankImg();
			this.setIconImg();
		}

		setNameText(){
			this.nameLbl.text = this.data.name || "英雄";
		}

		setCurrText(){
			this.currLbl.text = _.sprintf("历史最高关卡：%d   武器：%d",this.data.highestStage || 0,this.data.heroWeapons || 0);
		}

		setAttText() {
			this.attLbl.text = Util.formatNumber(this.data.score);
		}

		setRankImg(){
			var rank = this.data.rank + 1;
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
			var avatar = this.data.avatar || "";
			if(avatar != "") {
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else{
				this.iconImg.source = "icon_default";
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
