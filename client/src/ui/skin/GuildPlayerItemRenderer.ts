module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildPlayerItemRenderer extends egret.gui.ItemRenderer {
		public leftItem:uiskins.GuildPlayerItem;
		public rightItem:uiskins.GuildPlayerItem;
		public constructor() {
			super();
			this.skinName = skins.components.GuildPlayerItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchItem,this);
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
				this.leftItem.updateItem(this.data["mine"]);
			}
			else{
				this.leftItem.visible = false;
			}
		}

		setRightItem(){
			if(this.data["opp"]){
				this.rightItem.visible = true;
				this.rightItem.updateItem(this.data["opp"]);
			}
			else{
				this.rightItem.visible = false;
			}
		}

		onTouchItem(event:egret.TouchEvent){
			if(event.target == this.rightItem){
				this.onShowWarAttLayer();
			}
		}

		onShowWarAttLayer(){
			var myInfo = gm.dataManage.guild["myInfo"];
			if(this.data["opp"] && myInfo){
				Util.invokeCallback(this.data.delFunction);
				var ly = new GuildWarAttLayer(myInfo,this.data["opp"]);
				gm.guiLayer.addElement(ly);
			}
		}
	}
}
