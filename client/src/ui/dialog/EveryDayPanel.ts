/**
 *
 * @author 
 *
 */
class EveryDayPanel extends egret.gui.SkinnableComponent {
	public titleImg:egret.gui.UIAsset;
	public rewardBtn:egret.gui.Button;
	public rewardLbl:egret.gui.Label;
	public value:any;
	public constructor(data) {
		super();
		this.value = data;
		this.skinName = skins.dialog.EveryDayPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.onEveryDayList();
		this.setRewardBtn();
		this.setTitleImg();
	}

	onEveryDayList(){
		var data:any;
		for(var i:number = 1;i <= 7;i++){
			var index = i - 1;
			data = {
				day:i,
				info:this.value.info[index],
				currDay:this.value.day
			};
			this["selectItem"+i].dataItem = data;
			this["selectItem"+i].changeDataItem();
		}
	}

	onTouchLayer(event:egret.TouchEvent){
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target) {
		if (target == this.rewardBtn) {
			gm.guiLayer.removeElement(this);
			if(!this.value.dailyLoginReward){
				var ly = new MessageGetRewardPanel("领取奖励",[{type:this.value.type,num:this.value.num}]);
				gm.guiLayer.addElement(ly);
			}
		}
	}

	setRewardBtn(){
		if(this.value.dailyLoginReward){
			this.rewardLbl.text = "确定";
		}
		else {
			this.rewardLbl.text = "领取";
		}
	}

	setTitleImg(){
		var source;
		if(Util.isEveryDayDouble()){
			source = "dialog_everyday_double_title";
		}
		else {
			source = "dialog_everyday_title";
		}
		this.titleImg.source = source;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
