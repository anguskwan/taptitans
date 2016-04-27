/**
 *
 * @author 
 *
 */
class GuildMessagePKLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public messagePKList:egret.gui.List;
	public messagePKData:any;
	public messagePKCollection:egret.gui.ArrayCollection;
	private _guildMessagePKItemRenderer:egret.gui.ClassFactory;
	private _closeFunction:any;
	public constructor(closeFunction) {
		super();
		this._closeFunction = closeFunction;
		this.skinName = skins.dialog.GuildMessagePKLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._guildMessagePKItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMessagePKItemRenderer);
		this.messagePKData = [];
		this.initMessagePKList();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			Util.invokeCallback(this._closeFunction);
			gm.guiLayer.removeElement(this);
		}
	}

	initMessagePKList(){
		var msg = gm.dataManage.guild.battleMsg;
		_.each(msg,function(v){
			this.messagePKData.push(v);
		}.bind(this));
		var collection:egret.gui.ArrayCollection = this.messagePKCollection = new egret.gui.ArrayCollection(this.messagePKData);
		this.messagePKList.dataProvider = collection;
		this.messagePKList.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(event){
		return this._guildMessagePKItemRenderer;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
