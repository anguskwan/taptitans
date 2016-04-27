module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildHeroItem extends egret.gui.SkinnableComponent {
		public nameLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public dpsLbl:egret.gui.Label;
		public equipGroup:egret.gui.Group;
		public equipLbl:egret.gui.Label;
		public deadRect:egret.gui.Rect;
		public victoryImg:egret.gui.UIAsset;
		public tombstoneImg:egret.gui.UIAsset;
		private value:any;
		private dpsValue:any;
		public constructor() {
			super();
			this.skinName = skins.components.GuildHeroItemSkin;
		}

		getHeroId(){
			return this.value.index + 1;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		updateItem(value:any,dpsValue:any){
			this.value = value;
			this.dpsValue = dpsValue;
			this.setNameText();
			this.setIconImg();
			this.setDpsText();
			this.setDeadRect();
			this.setVictoryImg();
			this.setEquip();
		}

		setNameText(){
			this.nameLbl.text = Conf.hero[this.getHeroId()].name;
		}

		setIconImg(){
			this.iconImg.source = "hero" + this.getHeroId();
		}

		setDpsText(){
			if(this.dpsValue){
				this.dpsLbl.text = Util.formatNumber(this.dpsValue.dps);
			}
			else {
				this.dpsLbl.text = Util.formatNumber(this.value.bp);
			}
		}

		setEquip(){
			if(this.dpsValue){
				if(this.dpsValue.nerf != 0){
					this.equipGroup.visible = true;
					this.equipLbl.text = _.sprintf("-%.1f%%",this.dpsValue.nerf*100);
				}
				else {
					this.equipGroup.visible = false;
				}
			}
			else {
				this.equipGroup.visible = false;
			}
		}

		setDeadRect(){
			this.deadRect.visible = this.value.isDead;
		}

		setVictoryImg(){
			if(this.value.oppDead || this.value.isDead){
				this.victoryImg.visible = false;
				this.tombstoneImg.visible = false;
			}else{
				if(this.value.isAtt){
					if(this.value.attDead == 0){
						this.victoryImg.visible = false;
						this.tombstoneImg.visible = false;
					}
					if(this.value.attDead == 1){
						this.victoryImg.visible = true;
						this.tombstoneImg.visible = false;
					}
					if(this.value.attDead == -1){
						this.victoryImg.visible = false;
						this.tombstoneImg.visible = true;
					}
				}
				else {
					this.victoryImg.visible = false;
					this.tombstoneImg.visible = false;
				}
			}
		}
	}
}