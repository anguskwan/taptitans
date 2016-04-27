module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildPlayerItem extends egret.gui.SkinnableComponent {
		public nameLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public aliveHeroLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public iconAttImg1:egret.gui.UIAsset;
		public iconAttImg2:egret.gui.UIAsset;
		public killHeroLbl1:egret.gui.Label;
		public killHeroLbl2:egret.gui.Label;
		private value:any;
		public constructor() {
			super();
			this.skinName = skins.components.GuildPlayerItemSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		getAliveHeroes(){
			return _.count(this.value.warInfo.heroes,"1");
		}

		isAttPlayer(aIndex){
			return this.value.warInfo["attPlayer" + aIndex];
		}

		updateItem(value:any){
			this.value = value;
			this.setNameText();
			this.setIconImg();
			this.setAttText();
			this.setAliveHeroText();
			this.setIconAttImgPlayer1();
			this.setKillHeroTextPlayer1();
			this.setIconAttImgPlayer2();
			this.setKillHeroTextPlayer2();
		}

		setNameText(){
			this.nameLbl.text = this.value.name || "英雄";
		}

		setIconImg(){
			var avatar = this.value.avatar || "";
			if(avatar != ""){
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else{
				this.iconImg.source = "icon_default";
			}
		}

		setAttText(){
			this.attLbl.text = Util.formatNumber(this.value.battlePoint);
		}

		setAliveHeroText(){
			this.aliveHeroLbl.text = this.getAliveHeroes() + "";
		}

		setIconAttImgPlayer1(){
			if(this.isAttPlayer(1)){
				var player = this.value.warInfo["attPlayer1"];
				var avatar = player.avatar || "";
				if(avatar != ""){
					Util.setIconImg(avatar,this.iconAttImg1,96);
				}
				else{
					this.iconAttImg1.source = "icon_default";
				}
			}
			else{
				this.iconAttImg1.source = "icon_default";
			}
		}

		setKillHeroTextPlayer1(){
			if(this.isAttPlayer(1)){
				var count = this.value.warInfo.attacks[0]["count"];
				this.killHeroLbl1.text = "-" + count;
			}
			else{
				this.killHeroLbl1.text = "0";
			}
		}

		setIconAttImgPlayer2(){
			if(this.isAttPlayer(2)){
				var player = this.value.warInfo["attPlayer2"];
				var avatar = player.avatar || "";
				if(avatar != ""){
					Util.setIconImg(avatar,this.iconAttImg2,96);
				}
				else{
					this.iconAttImg2.source = "icon_default";
				}
			}
			else{
				this.iconAttImg2.source = "icon_default";
			}
		}

		setKillHeroTextPlayer2(){
			if(this.isAttPlayer(2)){
				var count = this.value.warInfo.attacks[1]["count"];
				this.killHeroLbl2.text = "-" + count;
			}
			else{
				this.killHeroLbl2.text = "0";
			}
		}
	}
}
