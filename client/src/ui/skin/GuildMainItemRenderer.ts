module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMainItemRenderer extends egret.gui.ItemRenderer {
		public timeRect:egret.gui.Rect;
		public infoBtn:egret.gui.Button;
		public bgImg:egret.gui.UIAsset;
		public timeLbl:egret.gui.Label;
		public warGroup:egret.gui.Group;
		public winLbl:egret.gui.Label;
		public loseLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMainItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		dataChanged() {
			super.dataChanged();
			this.setWinAndLoseText();
			this.setTimeAndWarGroup();
		}

		setWinAndLoseText(){
			var win = gm.dataManage.guild.win;
			var lose = gm.dataManage.guild.lose;
			this.winLbl.text = _.sprintf("胜 %d",win);
			this.loseLbl.text = _.sprintf("败 %d",lose);
		}

		setTimeAndWarGroup(){
			if(Util.isTimePast(0,9)){
				this.timeRect.visible = true;
				this.timeLbl.visible = true;
				this.warGroup.visible = false;
				this.bgImg.source = "guild_main_item_close";
			}
			if(Util.isTimePast(9,24)){
				this.timeRect.visible = false;
				this.timeLbl.visible = false;
				this.warGroup.visible = true;
				this.bgImg.source = "guild_main_item_open";
			}
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.infoBtn){
				//
				var ly = new GuildInfoPanel();
				gm.guiLayer.addElement(ly);
			}
			else {
				if(Util.isTimePast(9,24)){
					this.onShowWarStartLayer();
				}
			}
		}

		onShowWarStartLayer(){
			var warId = gm.dataManage.guild.war;
			if(warId == 0){
				gm.postMessage(consts.kMessageShowToastLayer,"未匹配到对手");
				return ;
			}
			gm.gameUI.showLoadingLayer();
			tt.GuildWarManage.warInfo(warId,function(obj){
				var myId = gm.dataManage.data.guild;
				var oppId = parseInt(obj.guilds[myId].opponent);
				tt.GuildManage.queryById(myId,function(leftValue){
					tt.GuildManage.queryById(oppId,function(rightValue) {
						Util.invokeCallback(this.data.delFunction);
						var ly = new GuildWarStartLayer(obj,leftValue,rightValue);
						gm.guiLayer.addElement(ly);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this))
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
	}
}
