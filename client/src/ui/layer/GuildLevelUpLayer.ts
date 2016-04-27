/**
 *
 * @author 
 *
 */
class GuildLevelUpLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public selectBtn:egret.gui.Button;
	public currLbl:egret.gui.Label;
	public multipleLbl:egret.gui.Label;
	public crystalLbl:egret.gui.Label;

	public lvUpList:egret.gui.List;
	public lvUpData:any;
	public lvUpCollection:egret.gui.ArrayCollection;
	private _guildLvUpItemRenderer:egret.gui.ClassFactory;
	private _guildMVPItemRenderer:egret.gui.ClassFactory;
	private _guildMVPTitleItemRenderer:egret.gui.ClassFactory;

	public members:any;
	private _closeFunction:any;

	public constructor(closeFunction) {
		super();
		this._closeFunction = closeFunction;
		this.members = [];
		if(!gm.dataManage.guild.contribution){
			gm.dataManage.guild.contribution = {};
		}
		if(!gm.dataManage.guild.multiple){
			gm.dataManage.guild.multiple = 1;
		}
		this.skinName = skins.dialog.GuildLevelUpLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._guildMVPItemRenderer = new egret.gui.ClassFactory(uiskins.GuildLvUpMVPItemRenderer);
		this._guildMVPTitleItemRenderer = new egret.gui.ClassFactory(uiskins.GuildLvUpMVPTitleItemRenderer);
		this._guildLvUpItemRenderer = new egret.gui.ClassFactory(uiskins.GuildLvUpItemRenderer);
		this.lvUpData = [];
		this.initLvUpList();
		this.setCurrText();
		this.setMultipleStatus();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			Util.invokeCallback(this._closeFunction);
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.selectBtn){
			if(gm.dataManage.guild.multiple >= 4){
				gm.dataManage.guild.multiple = 1;
			}
			else {
				gm.dataManage.guild.multiple *= 2;
			}
			this.setMultipleStatus();
			this.onUpdateList();
		}
	}

	addContribution(){
		var id = gm.dataManage.data.id;
		var contribution = gm.dataManage.guild.contribution;
		var multiple = gm.dataManage.guild.multiple;
		if(!contribution[id]){
			gm.dataManage.guild.contribution[id] = 50*multiple;
		}
		else {
			gm.dataManage.guild.contribution[id] += 50*multiple;
		}
	}

	initLvUpList(){
		var data:any;
		var mvpData:any = [];
		for(var i = 1;i < 5;i++){
			data = {
				id:i,
				type:consts.kItemRendererGuildLvUp,
				updateFunction:function(){
					this.addContribution();
					this.updateLvUpList();
					this.setCurrText();
				}.bind(this)
			};
			this.lvUpData.push(data);
		}
		data = {
			id:5,
			type:consts.kItemRendererGuildLvUpMVPTitle
		};
		this.lvUpData.push(data);
		gm.gameUI.showLoadingLayer();
		this.members = _.keys(gm.dataManage.guild.contribution);
		tt.GuildManage.playerList(this.members,function(data){
			_.each(data,function(v){
				v["type"] = consts.kItemRendererGuildLvUpMVP;
				v["contribution"] = gm.dataManage.guild.contribution[v.id];
				mvpData.push(v);
			}.bind(this));
			mvpData = _.sortBy(mvpData,function(v){return -v.contribution;}.bind(this));
			this.lvUpData = this.lvUpData.concat(mvpData);
			var collection:egret.gui.ArrayCollection = this.lvUpCollection = new egret.gui.ArrayCollection(this.lvUpData);
			this.lvUpList.dataProvider = collection;
			this.lvUpList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	updateLvUpList(){
		this.members = _.keys(gm.dataManage.guild.contribution);
		this.lvUpData.splice(5);
		var mvpData:any = [];
		tt.GuildManage.playerList(this.members,function(data){
			_.each(data,function(v){
				v["type"] = consts.kItemRendererGuildLvUpMVP;
				v["contribution"] = gm.dataManage.guild.contribution[v.id];
				mvpData.push(v);
			}.bind(this));
			mvpData = _.sortBy(mvpData,function(v){return -v.contribution;}.bind(this));
			this.lvUpData = this.lvUpData.concat(mvpData);
			this.lvUpCollection.replaceAll(this.lvUpData);
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	getItemRender(event){
		if(event.type == consts.kItemRendererGuildLvUp){
			return this._guildLvUpItemRenderer;
		}
		if(event.type == consts.kItemRendererGuildLvUpMVP){
			return this._guildMVPItemRenderer;
		}
		if(event.type == consts.kItemRendererGuildLvUpMVPTitle){
			return this._guildMVPTitleItemRenderer;
		}
	}

	onUpdateList(){
		_.each(this.lvUpCollection.source,function(v){
			this.lvUpCollection.itemUpdated(v);
		}.bind(this));
	}

	setCurrText(){
		var limit = 5 + gm.dataManage.vipInfo().donate;
		var donate = gm.dataManage.data.dailyEvent.donate || 0;
		this.currLbl.text = _.sprintf("今日剩余次数%d",limit - donate);
	}

	setMultipleStatus(){
		this.multipleLbl.text = _.sprintf("x%d",gm.dataManage.guild.multiple);
		this.crystalLbl.text = _.sprintf("%d",50*gm.dataManage.guild.multiple);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
