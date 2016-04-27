module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMessageItemRenderer extends egret.gui.ItemRenderer {
		public titleLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMessageItemRendererSkin;
		}
		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		dataChanged() {
			super.dataChanged();
			this.setTitleText();
			this.setIconImg();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			this.data["index"] = this.itemIndex;
			var ly = new GuildMessageInfoPanel(this.data);
			gm.guiLayer.addElement(ly);
		}

		setIconImg(){
			var avatar = this.data.avatar || "";
			if(avatar != ""){
				Util.setIconImg(avatar,this.iconImg,96);
			}
		}

		setTitleText(){
			var name = this.data.name || "英雄";
			this.titleLbl.text = name + " 加入申请";
		}
	}
}
