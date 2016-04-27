module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class PKHeroItemList extends egret.gui.SkinnableComponent {
		public bgImg:egret.gui.UIAsset;
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public dpsLbl:egret.gui.Label;
		public victoryImg:egret.gui.UIAsset;
		public equipGroup:egret.gui.Group;
		public equipLbl:egret.gui.Label;
		public value:any;

		public constructor() {
			super();
			this.skinName = skins.components.PKHeroItemListSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		public changeItemStatus() {
			this.setBgImg();
			this.nameLbl.text = this.value.name;
			this.dpsLbl.text = this.value.dps;
			this.iconImg.source = this.value.heroImgSource;
			this.setVictory();
			this.setEquip();
		}

		setVictory(){
			var isWin = this.value.isWin;
			this.victoryImg.visible = isWin == -1 ? false:(isWin == 1);
		}

		setBgImg(){
			this.bgImg.source = "pk_banner_" + this.value.type;
		}

		setEquip(){
			if(this.value.nerf != 0){
				this.equipGroup.visible = true;
				this.equipLbl.text = _.sprintf("-%.1f%%",this.value.nerf*100);
			}
			else{
				this.equipGroup.visible = false;
			}
		}

		public set dataItem(value:any){
			this.value = value;
		}

		public get dataItem():any{
			return this.value;
		}

	}
}
