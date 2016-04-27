/**
 *
 * @author 
 *
 */
class GuildMessagePKInfoLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public titleLbl:egret.gui.Label;
	public crystalLbl:egret.gui.Label;
	public getRewardBtn:egret.gui.Button;
	public scoreLbl:egret.gui.BitmapLabel;
	public iconLeftImg:uiskins.GuildBadgeItem;
	public nameLeftLbl:egret.gui.Label;
	public warLeftLbl:egret.gui.Label;
	public aliveHeroLeftLbl:egret.gui.Label;
	public attLeftLbl:egret.gui.Label;
	public memberLeftLbl:egret.gui.Label;
	public iconRightImg:uiskins.GuildBadgeItem;
	public nameRightLbl:egret.gui.Label;
	public warRightLbl:egret.gui.Label;
	public aliveHeroRightLbl:egret.gui.Label;
	public attRightLbl:egret.gui.Label;
	public memberRightLbl:egret.gui.Label;
	private _value:any;
	private _infoArr:any;
	private _infoValue:any;
	private _leftValue:any;
	private _rightValue:any;
	private currUpgrades:any;
	public constructor(value) {
		super();
		this._value = value;
		this._infoArr = [];
		this._infoValue = {};
		this._leftValue = {};
		this._rightValue = {};
		this.skinName = skins.dialog.GuildMessagePKInfoLayerSkin;
	}

	isGuildWin(){
		return this._value.isWin;
	}

	getLeftMaxMember(){
		var members = this._leftValue.level - 1;
		return 10 + members;
	}

	getRightMaxMember(){
		var level = this._rightValue.level || 1;
		var members = level - 1;
		return 10 + members;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this.onInitData();
		this.setTitleText();
		this.loadingInfo();
	}

	onInitData(){
		var upgrades = _.clone(gm.dataManage.guild.upgrades);
		var id = consts.kGuildUpgradeTypePKCrystal;
		if (!upgrades) {upgrades = {}}
		upgrades[id] = upgrades[id] || {exp:0, level:1};
		this.currUpgrades = upgrades[id];
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.getRewardBtn){
			gm.gameUI.showLoadingLayer();
			var warId = this._value.id;
			var leftId = this._infoArr[0].gid;
			tt.GuildWarManage.getGuildWarReward(warId,leftId,function(data){
				this.getRewardBtn.enabled = false;
				var ly = new MessageGetRewardPanel("获得物品",[{num:data.crystal,type:"crystal"}]);
				gm.guiLayer.addElement(ly);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
	}

	loadingInfo(){
		gm.gameUI.showLoadingLayer();
		var warId = this._value.id;
		tt.GuildWarManage.warInfo(warId,function(infoValue){
			this._infoValue = infoValue;
			this.initInfo();
			var leftId = this._infoArr[0].gid;
			var rightId = this._infoArr[1].gid;
			tt.GuildManage.queryById(leftId,function(leftValue) {
				this._leftValue = leftValue;
				this.onLeftInit();
				var warId = this._value.id;
				var level = this.currUpgrades.level;
				tt.GuildWarManage.getWarRewardNum(warId,leftId,level,function(data){
					this.setCrystalText(data.num);
					tt.GuildManage.queryById(rightId,function(rightValue) {
						this._rightValue = rightValue;
						this.onRightInit();
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this))
	}

	initInfo(){
		this.initMineInfo();
		this.initOppInfo();
		this.setScoreText();
		this.setGetRewardBtn();
	}

	initMineInfo(){
		var myId = gm.dataManage.data.guild;
		var myValue = this._infoValue.guilds[myId];
		var data:any;
		data = {
			gid:myId,
			value:myValue
		};
		this._infoArr.push(data);
	}

	initOppInfo(){
		var myId = gm.dataManage.data.guild;
		var oppId = parseInt(this._infoValue.guilds[myId].opponent);
		var oppValue = this._infoValue.guilds[oppId];
		var data:any;
		data = {
			gid:oppId,
			value:oppValue
		};
		this._infoArr.push(data);
	}

	setTitleText(){
		var text;
		if(this.isGuildWin() == 1){
			text = "战争胜利";
		}
		if(this.isGuildWin() == 0){
			text = "平局";
		}
		if(this.isGuildWin() == -1){
			text = "战争失败";
		}
		this.titleLbl.text = text;
	}

	setScoreText() {
		this.scoreLbl.text = _.sprintf("%d:%d",this._infoArr[0].value.left,this._infoArr[1].value.left);
	}

	setCrystalText(num){
		this.crystalLbl.text = "" + num;
	}

	setGetRewardBtn(){
		var id = gm.dataManage.data.id;
		var player = this._infoArr[0].value.players[id];
		if(player){
			var getReward = this._infoArr[0].value.players[id].getReward;
			if(getReward == 0){
				this.getRewardBtn.enabled = true;
			}
			else{
				this.getRewardBtn.enabled = false;
			}
		}
		else{
			this.getRewardBtn.enabled = false;
		}
	}

	onLeftInit(){
		this.setLeftName();
		this.setLeftIconImg();
		this.setMemberLeftText();
		this.setAliveHeroLeftText();
		this.setAttLeftText();
		this.setWarLeftText();
	}

	setLeftName(){
		var value = this._leftValue;
		this.nameLeftLbl.text = value.name || "公会";
	}

	setLeftIconImg(){
		var value = this._leftValue;
		var name = value.presidentName || "英雄会长";
		var data = {
			iconSource:value.icon,
			name:name[0]
		};
		this.iconLeftImg.dataItem = data;
		this.iconLeftImg.changeDataItem();
	}

	setMemberLeftText(){
		var size = _.size(this._infoArr[0].value.players);
		this.memberLeftLbl.text = _.sprintf("%d/%d",size,this.getLeftMaxMember());
	}

	setAliveHeroLeftText(){
		this.aliveHeroLeftLbl.text = this._infoArr[0].value.left + "";
	}

	setAttLeftText(){
		var battlePoint = this._infoArr[0].value.bp;
		if (isNaN(parseInt(battlePoint))) {
			battlePoint = parseInt(battlePoint);
		}
		this.attLeftLbl.text =  Util.formatNumber(battlePoint);
	}

	setWarLeftText(){
		var text;
		var color;
		if(this.isGuildWin() == 1){
			text = "胜利";
			color = 0xFF0000;
		}
		if(this.isGuildWin() == 0){
			text = "平局";
			color = 0xB49268;
		}
		if(this.isGuildWin() == -1){
			text = "战败";
			color = 0xB49268;
		}
		this.warLeftLbl.text = text;
		this.warLeftLbl.textColor = color;
	}


	onRightInit(){
		this.setRightName();
		this.setRightIconImg();
		this.setMemberRightText();
		this.setAliveHeroRightText();
		this.setAttRightText();
		this.setWarRightText();
	}

	setRightName(){
		var value = this._rightValue;
		this.nameRightLbl.text = value.name || "公会";
	}

	setRightIconImg(){
		var value = this._rightValue;
		var name = value.presidentName || "英雄会长";
		var data = {
			iconSource:value.icon,
			name:name[0]
		};
		this.iconRightImg.dataItem = data;
		this.iconRightImg.changeDataItem();
	}

	setMemberRightText(){
		var size = _.size(this._infoArr[1].value.players);
		this.memberRightLbl.text = _.sprintf("%d/%d",size,this.getRightMaxMember());
	}

	setAliveHeroRightText(){
		this.aliveHeroRightLbl.text = this._infoArr[1].value.left + "";
	}

	setAttRightText(){
		var battlePoint = this._infoArr[1].value.bp;
		if (isNaN(parseInt(battlePoint))) {
			battlePoint = parseInt(battlePoint);
		}
		this.attRightLbl.text =  Util.formatNumber(battlePoint);
	}

	setWarRightText(){
		var text;
		var color;
		if(this.isGuildWin() == 1){
			text = "战败";
			color = 0xB49268;
		}
		if(this.isGuildWin() == 0){
			text = "平局";
			color = 0xB49268;
		}
		if(this.isGuildWin() == -1){
			text = "胜利";
			color = 0xFF0000;
		}
		this.warRightLbl.text = text;
		this.warRightLbl.textColor = color;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
