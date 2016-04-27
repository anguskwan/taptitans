module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildManageGroup extends egret.gui.SkinnableComponent {
		public messageBtn:egret.gui.Button;
		public messagePKBtn:egret.gui.Button;
		public levelUpBtn:egret.gui.Button;
		public settingBtn:egret.gui.Button;
		public quitBtn:egret.gui.Button;
		public messageGroup:egret.gui.Group;
		public messagePKGroup:egret.gui.Group;
		public levelUpGroup:egret.gui.Group;
		public settingGroup:egret.gui.Group;
		public guitGroup:egret.gui.Group;
		public closeFunction:any;
		public constructor(closeFunction) {
			super();
			this.closeFunction = closeFunction;
			this.skinName = skins.components.GuildManageGroupSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
			this.updateMemberList();
		}

		updateMemberList(){
			this.onMessageBtn();
			this.onQuitGuildBtn();
		}

		onMessageBtn(){
			var id = gm.dataManage.guild.president;
			var myId = gm.dataManage.data.id;
			if(id == myId){
				this.settingGroup.visible = true;
				this.messageGroup.visible = true;
			}
			else {
				this.settingGroup.visible = false;
				this.messageGroup.visible = false;
			}
		}

		onQuitGuildBtn(){
			var id = gm.dataManage.guild.president;
			var myId = gm.dataManage.data.id;
			var memberCount = _.size(gm.dataManage.guild.members);
			if(memberCount == 1){
				this.guitGroup.visible = true;
			}
			else {
				if(id == myId) {
					this.guitGroup.visible = false;
				}
				else {
					this.guitGroup.visible = true;
				}
			}
		}

		onTouchLayer(event:egret.TouchEvent) {
			//GuildMessageLayer
			if(event.target == this.messageBtn){
				var ly = new GuildMessageLayer(function(){
					this.updateMemberList();
				}.bind(this));
				gm.guiLayer.addElement(ly);
			}
			if(event.target == this.quitBtn){
				var messageLy = new GuildMessagePanel(
					"退出公会",
					"您确定退出公会么？",
					function(target){
					gm.gameUI.showLoadingLayer();
					tt.GuildManage.quit(function(){
						Util.invokeCallback(this.closeFunction);
						gm.guiLayer.removeElement(target);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),null);
				gm.guiLayer.addElement(messageLy);
			}
			if(event.target == this.messagePKBtn){
				var msgPKly = new GuildMessagePKLayer(function(){
				}.bind(this));
				gm.guiLayer.addElement(msgPKly);
			}
			if(event.target == this.levelUpBtn){
				var lvUpLy = new GuildLevelUpLayer(function(){
				}.bind(this));
				gm.guiLayer.addElement(lvUpLy);
			}
			if(event.target == this.settingBtn){
				var setLy = new GuildSettingLayer(function(){
				}.bind(this));
				gm.guiLayer.addElement(setLy);
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}