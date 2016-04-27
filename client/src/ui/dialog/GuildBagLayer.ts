/**
 *
 * @author 
 *
 */
class GuildBagLayer extends egret.gui.SkinnableComponent {
	public btnBack:egret.gui.Button;
	public redNumLbl:egret.gui.Label;
	public currLbl:egret.gui.Label;
	public crystalLbl:egret.gui.Label;
	public diamondLbl:egret.gui.Label;
	public sendToggleBtn:uiskins.GuildBagSendToggleBtn;
	public getToggleBtn:uiskins.GuildBagGetToggleBtn;
	public sendList:egret.gui.List;
	public getList:egret.gui.List;
	public sendData:any;
	public getData:any;
	public sendCollection:egret.gui.ArrayCollection;
	public getCollection:egret.gui.ArrayCollection;
	public _sendGeneralItem:egret.gui.ClassFactory;
	public _sendHighItem:egret.gui.ClassFactory;
	public _getGeneralItem:egret.gui.ClassFactory;
	public _getHighItem:egret.gui.ClassFactory;
	private toggleBtns:uiskins.RankToggleBtn[];
	private _sendIsInit:any;
	private _getIsInit:any;
	private arrName:any;
	public constructor() {
		super();
		this.arrName = ["send","get"];
		this.toggleBtns = [];
		this.skinName = skins.dialog.GuildBagLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this._sendGeneralItem = new egret.gui.ClassFactory(uiskins.GuildBagSendGeneralItemRenderer);
		this._sendHighItem = new egret.gui.ClassFactory(uiskins.GuildBagSendHighItemRenderer);
		this._getGeneralItem = new egret.gui.ClassFactory(uiskins.GuildBagGetGeneralItemRenderer);
		this._getHighItem = new egret.gui.ClassFactory(uiskins.GuildBagGetHighItemRenderer);
		this.initCurrData();
		this.updateAllText();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.btnBack){
			gm.guiLayer.removeElement(this);
		}
	}

	initCurrData(){
		_.each(this.arrName,function(name){
			this[name + "IsInit"] = true;
			this[name + "Data"] = [];
			this[name + "ToggleBtn"].addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
			this.toggleBtns.push(this[name + "ToggleBtn"]);
			this.changeList(name,name == "send");
		}.bind(this));
	}

	updateAllText(){
		var redNum = 3 - gm.dataManage.data.dailyEvent.envelope;
		var crystal = gm.dataManage.data.crystal;
		var diamond = gm.dataManage.data.diamond;
		this.redNumLbl.text = _.sprintf("%d",redNum);
		this.crystalLbl.text = _.sprintf("%d",crystal);
		this.diamondLbl.text = _.sprintf("%d",diamond);
	}

	toggleChangeHandler(evt:egret.Event):void {
		for(var i:number=0;i<this.toggleBtns.length;i++) {
			this.changeList(this.arrName[i],(this.toggleBtns[i] == evt.target));
		}
	}

	changeList(name,isShow){
		this[name + "List"].visible = isShow;
		this[name + "ToggleBtn"].selected = isShow;
		if(isShow){
			if(name != "get"){
				this.currLbl.visible = false;
			}
			this.initAndUpdateList(name);
		}
	}

	addList(name){
		var collection:egret.gui.ArrayCollection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
		this[name + "List"].dataProvider = collection;
		this[name + "List"].itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(event){
		if(event.type == consts.kItemRendererGuildBagSendGeneral){
			return this._sendGeneralItem;
		}
		if(event.type == consts.kItemRendererGuildBagSendHigh){
			return this._sendHighItem;
		}
		if(event.type == consts.kItemRendererGuildBagGetGeneral){
			return this._getGeneralItem;
		}
		if(event.type == consts.kItemRendererGuildBagGetHigh){
			return this._getHighItem;
		}
	}

	initAndUpdateList(name){
		if(this[name + "IsInit"]){
			this[name + "InitList"]();
			this[name + "IsInit"] = false;
		}
		else {
			this[name + "UpdateList"]();
		}
	}

	sendInitList(){
		var data:any;
		data = {
			type:consts.kItemRendererGuildBagSendGeneral,
			updateFunction:function(){
				this.updateAllText();
				this.updateListData("send");
			}.bind(this)
		};
		this.sendData.push(data);
		data = {
			type:consts.kItemRendererGuildBagSendHigh,
			updateFunction:function(){
				this.updateAllText();
				this.updateListData("send");
			}.bind(this)
		};
		this.sendData.push(data);
		this.addList("send");
	}

	sendUpdateList(){

	}

	getInitList(){
		gm.gameUI.showLoadingLayer();
		var gid = gm.dataManage.data.guild;
		tt.GuildManage.envelopeList(gid,function(obj){
			_.each(obj,function(v,i){
				var data = {
					type:v.type == 1 ? consts.kItemRendererGuildBagGetGeneral:consts.kItemRendererGuildBagGetHigh,
					updateFunction:function(){
						this.updateAllText();
						this.updateListData("get");
					}.bind(this)
				};
				this.getData.push(data);
			}.bind(this));
			this.addList("get");
			this.setCurrLblStatus();
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	getUpdateList(){
		gm.gameUI.showLoadingLayer();
		var gid = gm.dataManage.data.guild;
		tt.GuildManage.envelopeList(gid,function(obj){
			this.getData = [];
			_.each(obj,function(v,i){
				var data = {
					type:v.type == 1 ? consts.kItemRendererGuildBagGetGeneral:consts.kItemRendererGuildBagGetHigh,
					updateFunction:function(){
						this.updateAllText();
						this.updateListData("get");
					}.bind(this)
				};
				this.getData.push(data);
			}.bind(this));
			this.getCollection.replaceAll(this.getData);
			this.setCurrLblStatus();
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	setCurrLblStatus(){
		if(_.size(this.getData) == 0){
			this.currLbl.visible = true;
		}
		else {
			this.currLbl.visible = false;
		}
	}

	updateListData(name){
		_.each(this[name + "Collection"].source,function(v){
			this[name + "Collection"].itemUpdated(v);
		}.bind(this));
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
