module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankItemList extends egret.gui.ItemRenderer {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public numLbl:egret.gui.Label;
		public lvLbl:egret.gui.Label;
		public selfLbl:egret.gui.Label;
		public currLbl:egret.gui.Label;
		public btnVisit:egret.gui.Button;
		public numImg:egret.gui.UIAsset;
		public constructor() {
			super();
			this.skinName = skins.components.RankItemListSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setNameText();
			this.setCurrText();
			this.setRankImg();
			this.setIconImg();
			this.setHighestStageText();
			this.setMySelf();
		}

		setNameText(){
			this.nameLbl.text = this.data.value.name || "英雄";
		}

		setCurrText(){
			this.currLbl.text = _.sprintf("当前关卡：%d     神器数：%d",this.data.value.stage || 0,this.data.value.artifacts || 0);
		}

		setRankImg(){
			var typeList = this.data.typeList;
			var rank = this.data.value.rank;
			rank = typeList == "world" ? rank + 1:rank;
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

		setHighestStageText(){
			this.lvLbl.text = _.sprintf("历史最高关卡：%d",this.data.value.score || 0);
		}

		setMySelf(){
			this.selfLbl.visible = this.data.value.isSelf;
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}

	}
}
