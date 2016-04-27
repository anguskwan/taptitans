module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildHeroItemRenderer extends egret.gui.ItemRenderer {
		public leftItem:uiskins.GuildHeroItem;
		public rightItem:uiskins.GuildHeroItem;
		public constructor() {
			super();
			this.skinName = skins.components.GuildHeroItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		dataChanged() {
			super.dataChanged();
			this.setItem();
		}

		setItem(){
			this.setLeftItem();
			this.setRightItem();
		}

		setLeftItem(){
			if(this.data["mine"]){
				this.leftItem.visible = true;
				this.data["mine"]["index"] = this.itemIndex;
				this.data["mine"]["oppDead"] = this.data["opp"]["isDead"];
				this.data["mine"]["attDead"] = this.getMineAttDead();
				this.data["mine"]["playerType"] = "mine";
				var dpsValue = null;
				if(this.data.detail){
					dpsValue = this.data.detail.p1;
				}
				this.leftItem.updateItem(this.data["mine"],dpsValue);
			}
			else{
				this.leftItem.visible = false;
			}
		}

		setRightItem(){
			if(this.data["opp"]){
				this.rightItem.visible = true;
				this.data["opp"]["index"] = this.itemIndex;
				this.data["opp"]["oppDead"] = this.data["mine"]["isDead"];
				this.data["opp"]["attDead"] = this.getOppAttDead();
				this.data["opp"]["playerType"] = "opp";
				var dpsValue = null;
				if(this.data.detail){
					dpsValue = this.data.detail.p2;
				}
				this.rightItem.updateItem(this.data["opp"],dpsValue);
			}
			else{
				this.rightItem.visible = false;
			}
		}

		attDead(att1,att2){
			var attBp1 = att1;
			if (isNaN(parseInt(attBp1))) {
				attBp1 = parseInt(attBp1);
			}
			var attBp2 = att2;
			if (isNaN(parseInt(attBp2))) {
				attBp2 = parseInt(attBp2);
			}
			if(attBp1 == attBp2) {
				return 0;
			}
			if(attBp1 > attBp2){
				return 1;
			}
			else {
				return -1;
			}
		}

		getMineAttDead(){
			if(this.data.detail){
				return this.attDead(this.data.detail.p1.dps,this.data.detail.p2.dps);
			}
			else {
				return this.attDead(this.data["mine"].bp,this.data["opp"].bp);
			}
		}

		getOppAttDead(){
			if(this.data.detail){
				return this.attDead(this.data.detail.p2.dps,this.data.detail.p1.dps);
			}
			else {
				return this.attDead(this.data["opp"].bp,this.data["mine"].bp);
			}
		}
	}
}
