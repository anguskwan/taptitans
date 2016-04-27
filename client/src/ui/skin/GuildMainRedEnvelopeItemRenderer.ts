module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMainRedEnvelopeItemRenderer extends egret.gui.ItemRenderer {
		public infoBtn:egret.gui.Button;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMainRedEnvelopeItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		onTouchBtnClick(event:egret.TouchEvent){
			//Util.invokeCallback(this.data.delFunction);
			if(event.target == this.infoBtn){
				var ly = new GuildBagInfoPanel();
				gm.guiLayer.addElement(ly);
			}
			else {
				this.addGuildBagLayer();
			}
		}

		addGuildBagLayer(){
			gm.guiLayer.addElement(new LoadingResLayer("guildbagres",function(){
				gm.guiLayer.addElement(new GuildBagLayer());
			}));
		}
	}
}
