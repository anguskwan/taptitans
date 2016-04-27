/**
 *
 * @author 
 *
 */
class GuildMessageLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public clearListBtn:egret.gui.Button;
	public messageList:egret.gui.List;
	public messageData:any;
	public messageCollection:egret.gui.ArrayCollection;
	private _guildMessageItemRenderer:egret.gui.ClassFactory;
	private _closeFunction:any;
	public constructor(closeFunction) {
		super();
		this._closeFunction = closeFunction;
		this.skinName = skins.dialog.GuildMessageLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._guildMessageItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMessageItemRenderer);
		this.messageData = [];
		this.initMessageList();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			Util.invokeCallback(this._closeFunction);
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.clearListBtn){
			gm.gameUI.showLoadingLayer();
			var id = gm.dataManage.data.guild;
			tt.GuildManage.clearJoinReq(id,function(){
				this.messageCollection.removeAll();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
	}

	initMessageList(){
		gm.gameUI.showLoadingLayer();
		var ids = gm.dataManage.guild.joinReq;
		tt.GuildManage.playerList(ids,function(data){
			_.each(data,function(v,i){
				v["delFunction"] = function(data){
					var index = data;
					this.messageCollection.removeItemAt(index);
				}.bind(this);
				this.messageData.push(v);
			}.bind(this));
			var collection:egret.gui.ArrayCollection = this.messageCollection = new egret.gui.ArrayCollection(this.messageData);
			this.messageList.dataProvider = collection;
			this.messageList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this))
	}

	getItemRender(event){
		return this._guildMessageItemRenderer;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
