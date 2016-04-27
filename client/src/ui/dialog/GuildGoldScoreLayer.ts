/**
 *
 * @author 
 *
 */
class GuildGoldScoreLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public guildRect:egret.gui.Rect;
	public timeLbl:egret.gui.Label;
	public guildGroup:egret.gui.Group;
	public rewardGroup:egret.gui.Group;
	public rewardBtn:egret.gui.Button;
	public iconImg:uiskins.GuildBadgeItem;
	public scoreLbl:egret.gui.Label;
	public rankLbl:egret.gui.Label;
	public rewardText:egret.gui.Label;
	public numLbl:egret.gui.Label;
	public numImg:egret.gui.UIAsset;
	public list:egret.gui.List;
	public listData:any;
	public collection:egret.gui.ArrayCollection;
	public _item:egret.gui.ClassFactory;

	private value:any;
	public constructor(value) {
		super();
		this.value = value;
		this.skinName = skins.dialog.GuildGoldScoreLayerSkin;
	}

	isNewBie(){
		var id = gm.dataManage.data.id;
		var find = _.find(gm.dataManage.guild.newbie,function(v){return v == id;}.bind(this));
		if(!_.isUndefined(find)){
			return true;
		}
		return false;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this._item = new egret.gui.ClassFactory(uiskins.GuildGoldScoreItemRenderer);
		this.listData = [];
		this.onInitData();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.rewardBtn && this.rewardBtn.enabled){
			this.rewardBtn.enabled = false;
			gm.gameUI.showLoadingLayer();
			gm.dataManage.getZodiacReward(function(data){
				if(_.size(data.reward) != 0){
					var reward = [];
					_.each(data.reward,function(v,k){
						reward.push({type:k,num:v});
					}.bind(this));
					var ly = new MessageGetRewardPanel("领取奖励",reward);
					gm.guiLayer.addElement(ly);
				}
				else {
					this.showMessageDialog();
				}
				this.rewardText.text = "已领取";
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
	}

	showMessageDialog(){
		var ly = new MessagePanel("很遗憾！","你所在的公会排名靠后，没有获得奖励。");
		gm.guiLayer.addElement(ly);
	}

	onInitData(){
		this.setGuildGroup();
		this.setTimeText();
		this.setIconImg();
		this.setScoreText();
		this.setRankStatus();
		this.addList();
		this.setRewardBtn();
		this.setRewardBtnText();
	}

	setRewardBtn(){
		var currTime = moment().valueOf();
		var time0 = Util.getHourTime(21).valueOf();
		var time1 = Util.getHourTime(24).valueOf();
		if(currTime >= time0 && currTime <= time1){
			this.rewardGroup.visible = true;
		}
		else {
			this.rewardGroup.visible = false;
		}
	}

	setRewardBtnText(){
		var zodiacReward = gm.dataManage.data.dailyEvent.zodiacReward;
		if(zodiacReward){
			this.rewardBtn.enabled = false;
			this.rewardText.text = "已领取";
		}
		else {
			this.rewardBtn.enabled = true;
			this.rewardText.text = "领取";
		}
	}

	setGuildGroup(){
		if(this.value.data.rank == null || this.isNewBie()){
			this.guildGroup.visible = false;
			this.guildRect.visible = false;
			this.list.bottom = 0;
		}
		else {
			this.guildGroup.visible = true;
			this.guildRect.visible = true;
			this.list.bottom = 80;
		}
	}

	setTimeText() {
		this.timeLbl.text = moment().format("MM月DD日");
	}

	setIconImg(){
		var name = gm.dataManage.guild.presidentName || "英雄会长";
		var data = {
			iconSource:gm.dataManage.guild.icon,
			name:name[0]
		};
		this.iconImg.dataItem = data;
		this.iconImg.changeDataItem();
	}

	setScoreText(){
		var score = this.value.data.score || 0;
		var text = _.sprintf("<font color=0x71430d>积分：</font><font color=0xffffff>%d</font>",parseInt(score));
		Util.setStyleText(this.scoreLbl,text);
	}

	setRankStatus(){
		var baseRank = this.value.data.rank || 0;
		var rank = baseRank + 1;
		var text = _.sprintf("<font color=0x71430d>排名：</font><font color=0xffffff>%d</font>",parseInt(rank));
		Util.setStyleText(this.rankLbl,text);
	}

	addList(){
		_.each(this.value.list,function(v){
			if(!v){return ;}
			this.listData.push(v);
		}.bind(this));
		var collection:egret.gui.ArrayCollection = this.collection = new egret.gui.ArrayCollection(this.listData);
		this.list.dataProvider = collection;
		this.list.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(item){
		return this._item;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
