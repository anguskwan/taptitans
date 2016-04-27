/**
 *
 * @author 
 *
 */
class MatchRankLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public rankGroup:egret.gui.Group;
	public timeLbl:egret.gui.Label;
	public rewardBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public iconImg:egret.gui.UIAsset;
	public titleLbl1:egret.gui.Label;
	public titleLbl2:egret.gui.Label;
	public currGroup:egret.gui.Group;
	public nextGroup:egret.gui.Group;
	public finishTime:egret.Timer;
	public isFinish:any;
	public kRankTag:number = 1;
	public kDiamondTag:number = 2;
	public kWeaponTag:number = 3;
	public kDiamondNumTag:number = 1;
	public kWeaponNumTag:number = 1;

	public constructor(isFinish?:any) {
		super();
		this.isFinish = isFinish;
		this.skinName = skins.dialog.MatchRankLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		gm.registerMessage(consts.kMessageContestTimeFinish,this.onContestTimeFinish,this);
		gm.gameUI.showLoadingLayer();
		this.initIsFinishStatus();
		this.matchInitList();
	}

	onContestTimeFinish(){
		this.isFinish = true;
		this.initIsFinishStatus();
	}

	initIsFinishStatus(){
		if(this.isFinish){
			this.timeLbl.visible = false;
			this.titleLbl1.text = "比赛结束";
			this.rightBtn.labelDisplay.text = "领取奖励";
			this.rightBtn.labelDisplay.x -= 20;
			this.titleLbl2.text = "请尽快领取你的奖励";
			this.iconImg.source = "btn_match_red";
			if(this.finishTime){
				this.finishTime.stop();
			}
		}
		else {
			this.iconImg.source = "btn_match_on";
			this.timeLbl.visible = true;
			var time = this.finishTime = new egret.Timer(1000);
			time.addEventListener(egret.TimerEvent.TIMER,this.showRemainContestTime,this);
			time.start();
			this.showRemainContestTime();
		}
	}

	showRemainContestTime(){
		this.timeLbl.text = _.sprintf("%s剩余时间",this.getRemainContestTime());
	}

	getRemainContestTime(){
		var currTime = new Date();
		var contestTime = new Date(gm.dataManage.data.contestStartTime);
		var finishTime = (consts.kMatchContestFinishTime - (currTime.getTime() - contestTime.getTime()))/1000;
		return Util.formatTime(Math.floor(finishTime),true);
	}

	changeRankRewardStatus(rank){
		var id = this.getCurrRankContestId(rank);
		if(id != -1){
			if(rank == 1){
				this.currGroup.visible = true;
				this.nextGroup.visible = false;
				this.onCurrRankReward(this.currGroup,id);
			}
			else {
				this.currGroup.visible = true;
				this.nextGroup.visible = true;
				this.onCurrRankReward(this.currGroup,id);
				this.onCurrRankReward(this.nextGroup,id - 1);
			}
		}
	}

	onCurrRankReward(itemGroup,id){
		var meta = Conf.contest;
		var diamondGroup:egret.gui.Group = itemGroup.getElementAt(this.kDiamondTag);
		var weaponGroup:egret.gui.Group = itemGroup.getElementAt(this.kWeaponTag);
		var rankLbl:egret.gui.Label = itemGroup.getElementAt(this.kRankTag);
		var diamondLbl:egret.gui.Label = <egret.gui.Label>diamondGroup.getElementAt(this.kDiamondNumTag);
		var weaponLbl:egret.gui.Label = <egret.gui.Label>weaponGroup.getElementAt(this.kWeaponNumTag);
		rankLbl.text = this.getRangeToRank(meta[id].range);
		diamondLbl.text = _.sprintf("%d钻石",meta[id].diamond);
		weaponLbl.text = _.sprintf("%d武器升级",meta[id].weapon);
	}

	getRangeToRank(range){
		var min = range[0];
		var max = range[1];
		if(min == max){
			return _.sprintf("排名%d",min);
		}
		else {
			return _.sprintf("排名%d-%d",min,max);
		}
	}

	getCurrRankContestId(rank){
		var meta = Conf.contest;
		for(var i:number = 1;i <= _.size(Conf.contest);i++){
			var min = meta[i].range[0];
			var max = meta[i].range[1];
			if(rank >= min && rank <= max){
				return i;
			}
		}
		return -1;
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.removeMessage(consts.kMessageContestTimeFinish,this.onContestTimeFinish,this);
			gm.guiLayer.removeElement(this);
		}
		if(target == this.rewardBtn){
			gm.removeMessage(consts.kMessageContestTimeFinish,this.onContestTimeFinish,this);
			gm.guiLayer.removeElement(this);
			var reward = new MatchRewardLayer();
			gm.guiLayer.addElement(reward);
		}
		if(target == this.rightBtn){
			gm.removeMessage(consts.kMessageContestTimeFinish,this.onContestTimeFinish,this);
			gm.guiLayer.removeElement(this);
			if(this.isFinish){
				gm.dataManage.getContestReward(function(data){
					var weapon = data.reward.weaponItem;
					var diamond = data.reward.diamond;
					gm.dataManage.addMoney(diamond,"diamond");
					if(weapon != 0){
						gm.dataManage.addWeaponItem(weapon);
					}
					//var ly = new MessageMatchRewardPanel(data.reward); // 需修改
					//gm.guiLayer.addElement(ly);
					var ly = new MessageGetRewardPanel("领取奖励",[
						{type:"diamond",num:diamond},
						{type:"weaponItem",num:weapon}]);
					gm.guiLayer.addElement(ly);
					gm.postMessage(consts.kMessageGetContestReward);
				}.bind(this));
			}
		}
	}

	matchInitList(){
		var data:any; //
		var isAddLine:any = false;
		gm.network.getContestRankList(function(obj){
			_.each(obj,function(v,i){
				var index = i + 1;
				data = {
					name:v.name || "测试",
					avatar:v.avatar || "",//"http://wx.qlogo.cn/mmopen/UUiahibzfr6ichbwdRYFiaKgM77jdMWqdXA0ickibct3h1WC8ySeKSxS3wAoA7oEiaLVY1ricSAVdj947F0gQwCzCibny0Wevpogs1xY7/0",
					score:v.score || 0,
					rank:v.rank + 1,
					artifacts:v.artifacts || 0,
					stage:v.stage || 0,
					isSelf:v.self,
					isHideLine:true
				};
				if(v.self){
					this.changeRankRewardStatus((v.rank + 1));
				}
				data.isHideLine = (_.size(obj) != index);
				if(index != v.rank + 1){
					if(!isAddLine){
						var line:uiskins.RankLineItemList = new uiskins.RankLineItemList();
						this.rankGroup.addElement(line);
						isAddLine = true;
					}
					var item:uiskins.MatchRankItemList = new uiskins.MatchRankItemList(data);
					this.rankGroup.addElement(item);
				}
				else {
					var item:uiskins.MatchRankItemList = new uiskins.MatchRankItemList(data);
					this.rankGroup.addElement(item);
				}
			}.bind(this));
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}

class MatchHardRankLayer extends MatchRankLayer {
	public kCrystalTag:number = 4;
	public kCrystalNumTag:number = 1;

	public constructor(isFinish?:any) {
		super();
		this.isFinish = isFinish;
		this.skinName = skins.dialog.MatchHardRankLayerSkin;
	}

	onCurrRankReward(itemGroup,id){
		var meta = Conf.contestHard;
		var diamondGroup:egret.gui.Group = itemGroup.getElementAt(this.kDiamondTag);
		var weaponGroup:egret.gui.Group = itemGroup.getElementAt(this.kWeaponTag);
		var crystalGroup:egret.gui.Group = itemGroup.getElementAt(this.kCrystalTag);
		var rankLbl:egret.gui.Label = itemGroup.getElementAt(this.kRankTag);
		var diamondLbl:egret.gui.Label = <egret.gui.Label>diamondGroup.getElementAt(this.kDiamondNumTag);
		var weaponLbl:egret.gui.Label = <egret.gui.Label>weaponGroup.getElementAt(this.kWeaponNumTag);
		var crystalLbl:egret.gui.Label = <egret.gui.Label>crystalGroup.getElementAt(this.kCrystalNumTag);
		rankLbl.text = this.getRangeToRank(meta[id].range);
		diamondLbl.text = _.sprintf("%d钻石",meta[id].diamond);
		weaponLbl.text = _.sprintf("%d武器升级",meta[id].weapon);
		crystalLbl.text = _.sprintf("%d水晶",meta[id].crystal);
	}

	changeRankRewardStatus(rank){
		var id = this.getCurrRankContestId(rank);
		if(id != -1){
			if(rank == 1){
				this.currGroup.visible = true;
				this.nextGroup.visible = false;
				this.onCurrRankReward(this.currGroup,id);
			}
			else {
				this.currGroup.visible = true;
				this.nextGroup.visible = true;
				this.onCurrRankReward(this.currGroup,id);
				this.onCurrRankReward(this.nextGroup,id - 1);
			}
		}
		else {
			id = _.size(Conf.contestHard);
			this.currGroup.visible = false;
			this.nextGroup.visible = true;
			this.onCurrRankReward(this.nextGroup,id);
		}
	}

	getCurrRankContestId(rank){
		var meta = Conf.contestHard;
		for(var i:number = 1;i <= _.size(Conf.contestHard);i++){
			var min = meta[i].range[0];
			var max = meta[i].range[1];
			if(rank >= min && rank <= max){
				return i;
			}
		}
		return -1;
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(target == this.rewardBtn){
			gm.guiLayer.removeElement(this);
			var reward = new MatchHardRewardLayer();
			gm.guiLayer.addElement(reward);
		}
		if(target == this.rightBtn){
			gm.guiLayer.removeElement(this);
			if(this.isFinish){
				gm.dataManage.getContestReward(function(data){
					if(data){
						var weapon = data.reward.weaponItem;
						var diamond = data.reward.diamond;
						var crystal = data.reward.crystal;
						gm.dataManage.addMoney(diamond,"diamond");
						gm.dataManage.addMoney(crystal,"crystal");
						if(weapon != 0){
							gm.dataManage.addWeaponItem(weapon);
						}
						//var ly = new MessageMatchHardRewardPanel(data.reward);
						//gm.guiLayer.addElement(ly);
						var ly = new MessageGetRewardPanel("领取奖励",[
							{type:"diamond",num:diamond},
							{type:"crystal",num:crystal},
							{type:"weaponItem",num:weapon}]);
						gm.guiLayer.addElement(ly);
						gm.postMessage(consts.kMessageGetContestReward);
					}
				}.bind(this));
			}
		}
	}
}

