/**
 *
 * @author 
 *
 */
class GuildGoldSelectLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public titleBtn:egret.gui.Button;
	public selectGroup:egret.gui.Group;
	public constructor() {
		super();
		this.skinName = skins.dialog.GuildGoldSelectLayerSkin;
	}
	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this.onInitSelectGroup();
		this.loadGroup();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			this.onCloseLayer();
		}
		if(event.target == this.titleBtn && this.titleBtn.enabled){
			gm.gameUI.showLoadingLayer();
			tt.BattleManage.zodiacGuildsRankingList(0,function(list){
				tt.BattleManage.zodiacMyGuildRanking(function(rank){
					var data = {
						list:list,
						data:rank
					};
					var ly = new GuildGoldScoreLayer(data);
					gm.guiLayer.addElement(ly);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
	}

	onInitSelectGroup(){
		var len = this.selectGroup.numElements;
		var data:any;
		for(var i = 0;i < len;i++){
			data = {
				id:i + 1
			};
			var item:uiskins.GuildGoldItemSelect = <uiskins.GuildGoldItemSelect>this.selectGroup.getElementAt(i);
			item.changeData(data);
		}
	}

	loadGroup(){
		this.updateSelectGroup();
		this.updateTime();
		this.setTitleBtn();
	}

	updateSelectGroup(){
		var len = this.selectGroup.numElements;
		for(var i = 0;i < len;i++){
			var item:uiskins.GuildGoldItemSelect = <uiskins.GuildGoldItemSelect>this.selectGroup.getElementAt(i);
			item.changeData(item.value);
		}
	}

	private timeoutIndex = -1;
	updateTime(){
		var time = this.getSetOffTime();
		this.timeoutIndex = egret.setTimeout(function(){
			this.updateTime();
			this.setTitleBtn();
			this.updateSelectGroup();
		}.bind(this),this,time)
	}

	getSetOffTime(){
		var curTime = gm.timeManage.getCurrentTime();
		var currTime = moment(curTime).valueOf();
		var currHour = moment(curTime).hour();

		console.log(`[GuildGold], getSetOffTime: curr local time=${moment().valueOf()}, curr local hour=${moment().hour()}, currTime=${currTime}, currHour=${currHour}`);
		var nextHour = currHour + 1;
		var baseTime1 = this.getHourAndMinTime(currHour,0).valueOf();
		var baseTime2 = this.getHourAndMinTime(currHour,30).valueOf();
		var baseTime3 = this.getHourAndMinTime(nextHour,0).valueOf();
		if(currTime >= baseTime1 && currTime < baseTime2){
			return baseTime2 - currTime;
		}
		if(currTime >= baseTime2 && currTime < baseTime3){
			return baseTime3 - currTime;
		}
		//for(var i = 0;i <= 24;i++){
		//	var baseTime = Util.getHourTime(i);
		//	if(currTime <= baseTime.valueOf()){
		//		return (baseTime.valueOf() - currTime);
		//	}
		//}
	}

	getHourAndMinTime(hour,minute){
		var curTime = gm.timeManage.getCurrentTime();
		var baseTime = moment(curTime);

		console.log(`[GuildGold], getHourAndMinTime: baseTime=${baseTime}`);

		baseTime.set('hour',hour);
		baseTime.set('minute',minute);
		baseTime.set('second',0);
		baseTime.set('millisecond',0);
		return baseTime;
	}

	setTitleBtn(){
		//var currTime = moment().valueOf();
		var curTime = gm.timeManage.getCurrentTime();
		var currTime = moment(curTime).valueOf();
		var time0 = Util.getHourTime(0).valueOf();
		var time10 = Util.getHourTime(10).valueOf();

		console.log(`[GuildGold], setTitleBtn: currTime=${currTime}, time0=${time0}, time10=${time10}`);

		if(currTime >= time0 && currTime <= time10){
			this.titleBtn.enabled = false;
		}
		else {
			this.titleBtn.enabled = true;
		}
	}

	onCloseLayer(){
		var len = this.selectGroup.numElements;
		for(var i = 0;i < len;i++){
			var item:uiskins.GuildGoldItemSelect = <uiskins.GuildGoldItemSelect>this.selectGroup.getElementAt(i);
			item.closeLayer();
		}
		if(this.timeoutIndex != -1){
			egret.clearTimeout(this.timeoutIndex);
		}
		gm.guiLayer.removeElement(this);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
