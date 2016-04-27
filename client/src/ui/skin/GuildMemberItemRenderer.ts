module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMemberItemRenderer extends egret.gui.ItemRenderer {
		public delGroup:egret.gui.Group;
		public delBtn:egret.gui.Button;
		public currLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public highestStageLbl:egret.gui.Label;
		public nameLbl:egret.gui.Label;
		public selfLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;

		public constructor() {
			super();
			this.skinName = skins.components.GuildMemberItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		dataChanged() {
			super.dataChanged();
			this.setNameText();
			this.setIconImg();
			this.setAttText();
			this.setPresidentText();
			this.setCurrText();
			this.setHighestStageText();
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.delBtn){
				//kick
				//gm.gameUI.showLoadingLayer();
				//var guildId = gm.dataManage.data.guild;
				//var memberId = this.data.id;
				//tt.GuildManage.kick(guildId,memberId,function(){
				//	Util.invokeCallback(this.data.delFunction,this.itemIndex);
				//	gm.gameUI.hideLoadingLayer();
				//}.bind(this),function(){
				//	gm.gameUI.hideLoadingLayer();
				//}.bind(this));
				this.data.index = this.itemIndex;
				var ly = new GuildMemberOperationPanel(this.data);
				gm.guiLayer.addElement(ly);
			}
		}

		setNameText(){
			var name = this.data.name || "英雄";
			this.nameLbl.text = name;
		}

		setIconImg(){
			var avatar = this.data.avatar || "";
			if(avatar != ""){
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else {
				this.iconImg.source = "icon_default";
			}
		}

		setAttText(){
			var battlePoint = this.data.battlePoint;
			if (isNaN(parseInt(battlePoint))) {
				battlePoint = parseInt(battlePoint);
			}
			this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
		}

		setCurrText(){
			this.currLbl.text = _.sprintf("武器：%d    神器：%d",this.data.heroWeapons,this.data.artifacts);
		}

		setHighestStageText(){
			this.highestStageLbl.text = _.sprintf("历史最高关卡：%d",this.data.highestStage);
		}

		setPresidentText(){
			var id = gm.dataManage.data.id;
			var presidentId = gm.dataManage.guild.president;
			if(this.data.id == presidentId){
				this.selfLbl.text = "会长";
				this.selfLbl.visible = true;
				this.delGroup.visible = false;
			}
			else {
				if(id == this.data.id){
					this.selfLbl.text = "我";
					this.selfLbl.visible = true;
					this.delGroup.visible = false;
				}
				else {
					if(id == presidentId){
						this.selfLbl.visible = false;
						this.delGroup.visible = true;
					}
					else {
						this.selfLbl.visible = false;
						this.delGroup.visible = false;
					}
				}
			}
		}
	}
}
