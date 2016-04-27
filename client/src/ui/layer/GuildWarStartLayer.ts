/**
 *
 * @author 
 *
 */
class GuildWarStartLayer extends egret.gui.SkinnableComponent {
	public backBtn:egret.gui.Button;
	public scoreLbl:egret.gui.BitmapLabel;
	public nameMineLbl:egret.gui.Label;
	public nameOpponentLbl:egret.gui.Label;
	public mineImg:uiskins.GuildBadgeItem;
	public opponentImg:uiskins.GuildBadgeItem;
	public playersList:egret.gui.List;
	public playersData:any;
	public playersCollection:egret.gui.ArrayCollection;
	private _guildPlayerItemRenderer:egret.gui.ClassFactory;
	private _value:any;
	private _infoArr:any;
	private _playersArr:any;
	private _playersDisc:any;
	private _leftValue:any;
	private _rightValue:any;
	public constructor(value,leftValue,rightValue) {
		super();
		this._value = value;
		this._leftValue = leftValue;
		this._rightValue = rightValue;
		this._infoArr = [];
		this._playersArr = [];
		this._playersDisc = {};
		this.skinName = skins.dialog.GuildWarStartLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._guildPlayerItemRenderer = new egret.gui.ClassFactory(uiskins.GuildPlayerItemRenderer);
		this.playersData = [];
		this.initInfo();
		this.setMineName();
		this.setMineIconImg();
		this.setOpponentName();
		this.setOponentIconImg();
		this.setScoreText();
		this.onGetPlayersList();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.backBtn){
			gm.guiLayer.removeElement(this);
			if(gm.dataManage.data.guild != 0){
				gm.guiLayer.addElement(new GuildLayer());
			}
			else{
				gm.guiLayer.addElement(new GuildCreateLayer());
			}
		}
	}

	onGetPlayersList(){
		gm.gameUI.showLoadingLayer();
		// player mine
		var mineMembers = this._infoArr[0].members;
		tt.GuildManage.playerList(mineMembers,function(mineObj){
			_.each(mineObj,function(v,i){
				this.onSetPlayerArr("mine",v,i);
				this.onSetPlayerDisc("opp",v);
			}.bind(this));
			var oppMembers = this._infoArr[1].members;
			tt.GuildManage.playerList(oppMembers,function(oppObj) {
				_.each(oppObj,function(v,i){
					this.onSetPlayerArr("opp",v,i);
					this.onSetPlayerDisc("mine",v);
				}.bind(this));
				this.initPlayersList();
				this.initAttPlayer();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	onSetPlayerArr(type,v,i){
		if(!this._playersArr[i]){
			this._playersArr[i] = {};
		}
		this._playersArr[i][type] = v;
		var index:any;
		if(type == "mine"){
			index = 0;
		}
		else {
			index = 1;
		}
		this._playersArr[i][type]["warInfo"] = this._infoArr[index].value.players[v.id];
		if(v.id == gm.dataManage.data.id){
			gm.dataManage.guild["myInfo"] = this._playersArr[i][type];
		}
	}

	onSetPlayerDisc(type,v){
		if(!this._playersDisc[type]){
			this._playersDisc[type] = {};
		}
		this._playersDisc[type][v.id] = v;
	}

	initInfo(){
		this.initMineInfo();
		this.initOppInfo();
	}

	initMineInfo(){
		var myId = gm.dataManage.data.guild;
		var myValue = this._value.guilds[myId];
		var members = _.keys(myValue.players);
		var data:any;
		data = {
			gid:myId,
			value:myValue,
			members:members
		};
		this._infoArr.push(data);
	}

	initOppInfo(){
		var myId = gm.dataManage.data.guild;
		var oppId = parseInt(this._value.guilds[myId].opponent);
		var oppValue = this._value.guilds[oppId];
		var members = _.keys(oppValue.players);
		var data:any;
		data = {
			gid:oppId,
			value:oppValue,
			members:members
		};
		this._infoArr.push(data);
	}

	initPlayersList(){
		_.each(this._playersArr,function(v){
			v["delFunction"] = function(){
				gm.guiLayer.removeElement(this);
			}.bind(this);
			this.playersData.push(v);
		}.bind(this));
		var collection:egret.gui.ArrayCollection = this.playersCollection = new egret.gui.ArrayCollection(this.playersData);
		this.playersList.dataProvider = collection;
		this.playersList.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	initAttPlayer(){
		_.each(this._playersArr,function(v){
			this.onAddAttPlayer(v,"mine",0);
			this.onAddAttPlayer(v,"opp",1);
		}.bind(this));
	}

	onAddAttPlayer(v,type,index){
		if(v[type]){
			var attacks = this._infoArr[index].value.players[v[type].id]["attacks"];
			if(_.isEmpty(attacks)){return ;}
			for(var i = 0;i < 2;i++){
				if(attacks[i]){
					var playerId = attacks[i].enemy;
					var aIndex = i + 1;
					v[type]["warInfo"]["attPlayer" + aIndex] = this._playersDisc[type][playerId];
				}
			}
		}
	}

	setMineName(){
		var value = this._leftValue;
		this.nameMineLbl.text = value.name;
	}

	setMineIconImg(){
		var value = this._leftValue;
		var name = value.presidentName || "英雄会长";
		var data = {
			iconSource:value.icon,
			name:name[0]
		};
		this.mineImg.dataItem = data;
		this.mineImg.changeDataItem();
	}

	setScoreText() {
		this.scoreLbl.text = _.sprintf("%d:%d",this._infoArr[0].value.left,this._infoArr[1].value.left);
	}

	setOpponentName(){
		var value = this._rightValue;
		this.nameOpponentLbl.text = value.name;
	}

	setOponentIconImg(){
		var value = this._rightValue;
		var name = value.presidentName || "英雄会长";
		var data = {
			iconSource:value.icon,
			name:name[0]
		};
		this.opponentImg.dataItem = data;
		this.opponentImg.changeDataItem();
	}

	getItemRender(event){
		return this._guildPlayerItemRenderer;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
