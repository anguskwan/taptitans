module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMainGoldItemRenderer extends egret.gui.ItemRenderer {
		public infoBtn:egret.gui.Button;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMainGoldItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		dataChanged() {
			super.dataChanged();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.infoBtn){
				var ly = new GuildGoldRewardLayer();
				gm.guiLayer.addElement(ly);
			}
			else {
				this.showMainGoldLayer();
			}
		}

		showMainGoldLayer(){
			gm.guiLayer.addElement(new LoadingResLayer("guildgoldres",function(){
				var ly = new GuildGoldSelectLayer();
				gm.guiLayer.addElement(ly);
			}));
		}
	}
}
