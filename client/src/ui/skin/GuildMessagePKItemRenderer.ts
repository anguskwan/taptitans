module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMessagePKItemRenderer extends egret.gui.ItemRenderer {
		public titleLbl:egret.gui.Label;
		public timeLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMessagePKItemRendererSkin;
		}

		isGuildWin(){
			return this.data.isWin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		dataChanged() {
			super.dataChanged();
			this.setTitleText();
			this.setIconImg();
			this.setTimeText();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			//this.data["index"] = this.itemIndex;
			var ly = new GuildMessagePKInfoLayer(this.data);
			gm.guiLayer.addElement(ly);
		}

		setIconImg(){
			var source;
			if(this.isGuildWin() == 1){
				source = "guild_message_victory";
			}
			if(this.isGuildWin() == 0){
				source = "guild_message_draw";
			}
			if(this.isGuildWin() == -1){
				source = "guild_message_lose";
			}
			this.iconImg.source = source;
		}

		setTitleText(){
			var text;
			if(this.isGuildWin() == 1){
				text = "捷报！你所在的公会胜利了";
			}
			if(this.isGuildWin() == 0){
				text = "平局！本次比赛你们势均力敌";
			}
			if(this.isGuildWin() == -1){
				text = "战败！你所在的公会失败了";
			}
			this.titleLbl.text = text;
		}

		setTimeText(){
			this.timeLbl.text = _.sprintf("战争时间：%s",moment(this.data.time).format("YYYY年MM月DD日"));
		}
	}
}