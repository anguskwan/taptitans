/**
 *
 * @author 
 *
 */
class GuildMemberOperationPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public approveBtn:egret.gui.Button;
	public rejectBtn:egret.gui.Button;
	public nameLbl:egret.gui.Label;
	public highestStageLbl:egret.gui.Label;
	public currLbl:egret.gui.Label;
	public attLbl:egret.gui.Label;
	public iconImg:egret.gui.UIAsset;
	public _value:any;
	public constructor(value) {
		super();
		this._value = value;
		this.skinName = skins.dialog.GuildMemberOperationPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.initData();
	}

	initData(){
		this.setNameText();
		this.setIconImg();
		this.setAttText();
		this.setCurrText();
		this.setHighestStageText();
	}

	setNameText(){
		var name = this._value.name || "英雄";
		this.nameLbl.text = name;
	}

	setIconImg(){
		var avatar = this._value.avatar || "";
		if(avatar != ""){
			Util.setIconImg(avatar,this.iconImg,96);
		}
	}

	setAttText(){
		var battlePoint = this._value.battlePoint;
		if (isNaN(parseInt(battlePoint))) {
			battlePoint = parseInt(battlePoint);
		}
		this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
	}

	setCurrText(){
		this.currLbl.text = _.sprintf("武器：%d    神器：%d",this._value.heroWeapons,this._value.artifacts);
	}

	setHighestStageText(){
		this.highestStageLbl.text = _.sprintf("历史最高关卡：%d",this._value.highestStage);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.rejectBtn && this.rejectBtn.enabled){
			gm.gameUI.showLoadingLayer();
			var guildId = gm.dataManage.data.guild;
			var repId = this._value.id;
			this.approveBtn.enabled = false;
			this.rejectBtn.enabled = false;
			tt.GuildManage.kick(guildId,repId,function(){
				Util.invokeCallback(this._value.delFunction,this._value.index);
				gm.guiLayer.removeElement(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				this.approveBtn.enabled = true;
				this.rejectBtn.enabled = true;
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		if(event.target == this.approveBtn && this.approveBtn.enabled){
			gm.gameUI.showLoadingLayer();
			var guildId = gm.dataManage.data.guild;
			var repId = this._value.id;
			var name = this._value.name || "英雄";
			this.approveBtn.enabled = false;
			this.rejectBtn.enabled = false;
			tt.GuildManage.setPresident(guildId,repId,name,function(){
				Util.invokeCallback(this._value.updateFunction);
				gm.guiLayer.removeElement(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				this.approveBtn.enabled = true;
				this.rejectBtn.enabled = true;
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}
}
