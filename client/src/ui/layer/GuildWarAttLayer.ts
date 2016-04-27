/**
 *
 * @author 
 *
 */
class GuildWarAttLayer extends egret.gui.SkinnableComponent {
	public backBtn:egret.gui.Button;
	public attGroup:egret.gui.Group;
	public attBtn:egret.gui.Button;
	public attLbl:egret.gui.Label;
	public titleLbl:egret.gui.Label;
	public scoreLbl:egret.gui.BitmapLabel;
	public nameMineLbl:egret.gui.Label;
	public nameOpponentLbl:egret.gui.Label;
	public mineImg:egret.gui.UIAsset;
	public opponentImg:egret.gui.UIAsset;
	public attList:egret.gui.List;
	public attData:any;
	public attCollection:egret.gui.ArrayCollection;
	private _guildAttItemRenderer:egret.gui.ClassFactory;
	private _guildAttCompleteItemRenderer:egret.gui.ClassFactory;
	private _mineValue:any;
	private _oppValue:any;
	private _heroesArr:any;
	private _deadHero:any;
	private _preData:any;
	public isAddAttCompleteItem:any;
	public mineHeroesDead:any;
	public oppHeroesDead:any;
	public constructor(mineValue,oppValue) {
		super();
		this._oppValue = oppValue;
		this._mineValue = mineValue;
		this._heroesArr = [];
		this._deadHero = 0;
		this.isAddAttCompleteItem = true;
		this.skinName = skins.dialog.GuildWarAttLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._guildAttItemRenderer = new egret.gui.ClassFactory(uiskins.GuildHeroItemRenderer);
		this._guildAttCompleteItemRenderer = new egret.gui.ClassFactory(uiskins.GuildHeroCompleteItemRenderer);
		this.attData = [];
		this.setMineNameText();
		this.setMineIconImg();
		this.setOpponentNameText();
		this.setOpponentIconImg();
		this.setAttBtnText();
		this.setAttBtn();
		this.onSetHeroesDead("mine");
		this.onSetHeroesDead("opp");
		this.loadWarHeroesInfo();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.backBtn){
			var warId = gm.dataManage.guild.war;
			if(warId == 0){
				gm.postMessage(consts.kMessageShowToastLayer,"未匹配到对手");
				gm.guiLayer.removeElement(this);
				return ;
			}
			gm.gameUI.showLoadingLayer();
			tt.GuildWarManage.warInfo(warId,function(obj){
				var myId = gm.dataManage.data.guild;
				var oppId = parseInt(obj.guilds[myId].opponent);
				tt.GuildManage.queryById(myId,function(leftValue){
					tt.GuildManage.queryById(oppId,function(rightValue) {
						var ly = new GuildWarStartLayer(obj,leftValue,rightValue);
						gm.guiLayer.addElement(ly);
						gm.guiLayer.removeElement(this);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.guiLayer.removeElement(this);
						gm.gameUI.hideLoadingLayer();
					}.bind(this))
				}.bind(this),function(){
					gm.guiLayer.removeElement(this);
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		if(event.target == this.attBtn && this.attBtn.enabled){
			// att
			gm.gameUI.showLoadingLayer();
			var gid = gm.dataManage.data.guild;
			var eid = this._oppValue.id;
			if(this._preData){
				this.onSetAttOppComplete(this._preData);
				this.updateHeroList();
			}
			tt.GuildWarManage.fightEnemy(gid,eid,function(data){
				this._preData = data;
				this.onSetAllIsAtt();
				this.setDeadHero(data);
				this.setMineValue();
				this.setAttBtnText();
				this.setAttBtn();
				this.setScoreText();
				this.setShowTitleAndScore();
				this.onAddAttCompleteItem();
				this.updateHeroList();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}
	}

	initPlayersList(){
		_.each(this._heroesArr,function(v){
			v["type"] = consts.kItemRendererGuildWarAtt;
			this.attData.push(v);
		}.bind(this));
		var collection:egret.gui.ArrayCollection = this.attCollection = new egret.gui.ArrayCollection(this.attData);
		this.attList.dataProvider = collection;
		this.attList.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(event){
		if(event.type == consts.kItemRendererGuildWarAtt){
			return this._guildAttItemRenderer;
		}
		if(event.type == consts.kItemRendererGuildWarAttComplete){
			return this._guildAttCompleteItemRenderer;
		}
	}

	loadWarHeroesInfo(){
		gm.gameUI.showLoadingLayer();
		var mineId = this._mineValue.id;
		tt.GuildWarManage.warPlayerInfo(mineId,function(mineObj){
			_.each(mineObj,function(v,i){
				this.onSetHeroesArr("mine",v,i);
			}.bind(this));
			var oppId = this._oppValue.id;
			tt.GuildWarManage.warPlayerInfo(oppId,function(oppObj) {
				_.each(oppObj,function(v,i){
					this.onSetHeroesArr("opp",v,i);
				}.bind(this));
				this.initPlayersList();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this))
	}

	onSetHeroesArr(type,v,i){
		if(!this._heroesArr[i]){
			this._heroesArr[i] = {};
		}
		this._heroesArr[i][type] = v;
		this._heroesArr[i][type]["isDead"] = type == "opp" ? !parseInt(this[type + "HeroesDead"][i]):false;
		this._heroesArr[i][type]["isAtt"] = false;
	}

	onSetHeroesDead(type){
		var heroesDead = _.toArray(this["_" + type + "Value"]["warInfo"]["heroes"]);
		var size:number = 33 - _.size(heroesDead);
		for(var j:number = 0;j < size;j++){
			heroesDead.splice(0,0,"0");
		}
		this[type + "HeroesDead"] = heroesDead;
	}

	getOppHeroesAliveValue(data){
		var alive = _.toArray(data.result.alive);
		var size:number = 33 - _.size(alive);
		for(var j:number = 0;j < size;j++){
			alive.splice(0,0,"0");
		}
		return alive;
	}

	onSetOppHeroesDeadValue(data){
		var alive = this.getOppHeroesAliveValue(data);
		var heroesDead = [];
		for(var i = 0;i < _.size(alive);i++){
			var base = this.oppHeroesDead[i];
			var curr = alive[i];
			if(base == "1" && curr == "1"){
				heroesDead.push("1");
			}
			if(base == "0" && curr == "1"){
				heroesDead.push("0");
			}
			if(base == "1" && curr == "0"){
				heroesDead.push("0");
			}
			if(base == "0" && curr == "0"){
				heroesDead.push("0");
			}
		}
		this.oppHeroesDead = heroesDead;
	}

	onSetAllIsAtt(){
		_.each(this.attData,function(v,i){
			if(v.type == consts.kItemRendererGuildWarAttComplete){return ;}
			this.onSetIsAtt(v,true);
		}.bind(this));
	}

	onSetAttOppComplete(data){
		this.onSetOppHeroesDeadValue(data);
		_.each(this.attData,function(v,i){
			if(v.type == consts.kItemRendererGuildWarAttComplete){return ;}
			this.onSetOppHeroDead(v,i);
		}.bind(this));
	}

	onSetIsAtt(v,isAtt){
		v["mine"]["isAtt"] = isAtt;
		v["opp"]["isAtt"] = isAtt;
	}

	onSetOppHeroDead(v,i){
		v["opp"]["isDead"] = !parseInt(this.oppHeroesDead[i]);
	}

	onAddAttCompleteItem(){
		if(this.isAddAttCompleteItem){
			var data:any;
			data = {
				type:consts.kItemRendererGuildWarAttComplete,
				killNum:this._deadHero
			};
			this.attCollection.addItem(data);
			this.isAddAttCompleteItem = false;
		}
		else{
			var len = _.size(this.attData);
			this.attData[len - 1].killNum = this._deadHero;
		}
	}

	updateHeroList(){
		_.each(this.attCollection.source,function(v,i){
			if(v.type == consts.kItemRendererGuildWarAtt){
				v["detail"] = this._preData.result.detail[i];
			}
			this.attCollection.itemUpdated(v);
		}.bind(this))
	}

	setMineNameText(){
		this.nameMineLbl.text = this._mineValue.name || "英雄";
	}

	setMineIconImg(){
		var avatar = this._mineValue.avatar || "";
		if(avatar != ""){
			Util.setIconImg(avatar,this.mineImg,96);
		}
		else {
			this.mineImg.source = "icon_default";
		}
	}

	setScoreText(){
		this.scoreLbl.text = this._deadHero + "";
	}

	setOpponentNameText(){
		this.nameOpponentLbl.text = this._oppValue.name || "英雄";
	}

	setOpponentIconImg(){
		var avatar = this._oppValue.avatar || "";
		if(avatar != ""){
			Util.setIconImg(avatar,this.opponentImg,96);
		}
		else {
			this.mineImg.source = "icon_default";
		}
	}

	setAttBtnText(){
		var len = _.size(this._mineValue.warInfo.attacks);
		len = len >= 2 ? 2:len;
		this.attLbl.text = _.sprintf("攻击 %d/2",len);
	}

	setAttBtn(){
		var len = _.size(this._mineValue.warInfo.attacks);
		len = len >= 2 ? 2:len;
		if(len < 2 && Util.isTimePast(12,24)){
			this.attBtn.enabled = true;
		}
		else {
			this.attBtn.enabled = false;
		}
	}

	setShowTitleAndScore(){
		this.scoreLbl.visible = true;
		this.titleLbl.visible = true;
	}

	setMineValue(){
		this._mineValue.warInfo.attacks.push({count:this._deadHero,enemy:this._oppValue.id});
	}

	setDeadHero(data){
		var alive = this.getOppHeroesAliveValue(data);
		var heroesDead = [];
		for(var i = 0;i < _.size(alive);i++){
			var base = this.oppHeroesDead[i];
			var curr = alive[i];
			if(base == "1" && curr == "1"){
				heroesDead.push("1");
			}
			if(base == "0" && curr == "1"){
				heroesDead.push("0");
			}
			if(base == "1" && curr == "0"){
				heroesDead.push("0");
			}
			if(base == "0" && curr == "0"){
				heroesDead.push("0");
			}
		}
		var diff1 = _.difference(heroesDead,["0"]);
		var diff2 = _.difference(this.oppHeroesDead,["0"]);
		this._deadHero = _.size(diff2) - _.size(diff1);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}