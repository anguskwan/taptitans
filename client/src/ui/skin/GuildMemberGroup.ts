module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMemberGroup extends egret.gui.SkinnableComponent {
		public memberList:egret.gui.List;
		public memberData:any;
		public memberCollection:egret.gui.ArrayCollection;
		private _guildMemberItemRenderer:egret.gui.ClassFactory;
		public constructor() {
			super();
			this.skinName = skins.components.GuildMemberGroupSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this._guildMemberItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMemberItemRenderer);
			this.memberData = [];
			this.initMemberList();
		}

		initMemberList(){
			gm.gameUI.showLoadingLayer();
			var ids = gm.dataManage.guild.members;
			tt.GuildManage.playerList(ids,function(data){
				_.each(data,function(v,i){
					v["delFunction"] = function(data){
						var index = data;
						this.memberCollection.removeItemAt(index);
					}.bind(this);
					v["updateFunction"] = function(){
						this.updateList();
					}.bind(this);
					this.memberData.push(v);
				}.bind(this));
				var collection:egret.gui.ArrayCollection = this.memberCollection = new egret.gui.ArrayCollection(this.memberData);
				this.memberList.dataProvider = collection;
				this.memberList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		getItemRender(event){
			return this._guildMemberItemRenderer;
		}

		updateMemberList(){
			gm.gameUI.showLoadingLayer();
			var ids = gm.dataManage.guild.members;
			tt.GuildManage.playerList(ids,function(data){
				this.memberData = [];
				_.each(data,function(v,i){
					v["delFunction"] = function(data){
						var index = data;
						this.memberCollection.removeItemAt(index);
					}.bind(this);
					v["updateFunction"] = function(){
						this.updateList();
					}.bind(this);
					this.memberData.push(v);
				}.bind(this));
				this.memberCollection.replaceAll(this.memberData);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		updateList(){
			_.each(this.memberCollection.source,function(v){
				this.memberCollection.itemUpdated(v);
			}.bind(this));
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
