/**
 *
 * @author 
 *
 */
class DataLayer extends egret.gui.SkinnableComponent {
	public currGroup:egret.gui.Group;
	public addGroup:egret.gui.Group;
	public closeBtn:egret.gui.Button;
	public constructor() {
		super();
		this.skinName = skins.dialog.DataLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.onInitCurrGroup();
		this.onInitAddGroup();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	getCurrNumByIndex(index){
		var num = "";
		switch (index) {
			case 0:
				num = gm.dataManage.data.diamond + "";
				break;
			case 1:
				num = Util.formatNumber(gm.dataManage.data.relic);
				break;
			case 2:
				num = Util.formatNumber(gm.dataManage.data.gold);
				break;
			case 3:
				num = Util.formatNumber(gm.dataManage.data.crystal);
				break;
			case 4:
				num = Math.floor(gm.dataManage.getRelicsByHeroes() * 1000) + "";
				break;
			case 5:
				num = Util.formatNumber(formula.criticalChance(gm.dataManage.data)*100) + "%";
				break;
			case 6:
				num = Util.formatNumber(formula.heroDPSRatio(gm.dataManage.data));
				break;
			case 7:
				num = Util.formatNumber(formula.criticalMultiplier(gm.dataManage.data));
				break;
			case 8:
				num = gm.network.areaId + "";
				break;
			case 9:
				num = gm.dataManage.data.serverId + "";
				break;
			case 10:
				num = gm.network.playerId + "";
				break;
			case 11:
				num = Util.getQueryString('channel') + ""; 
				break;
			case 12:
				var version = gm.network.ver;
				num = !!version ? version : '';
				break;
		}
		return num;
	}

	getAddNumByIndex(index){
		var num = "";
		switch (index) {
			case 0:
				num = Util.formatNumber(gm.dataManage.data.achievements[2].value);
				break;
			case 1:
				num = Util.formatNumber(gm.dataManage.data.achievements[8].value);
				break;
			case 2:
				num = Util.formatNumber(gm.dataManage.data.achievements[1].value);
				break;
			case 3:
				num = Util.formatNumber(gm.dataManage.data.achievements[7].value);
				break;
			case 4:
				num = Math.max(gm.dataManage.data.highestStage, gm.dataManage.data.stage) + "";
				break;
			case 5:
				num = Util.formatNumber(gm.dataManage.data.achievements[9].value);
				break;
			case 6:
				num = this.getCreatTimeToCurrTime() + "";
				break;
		}
		return num;
	}

	getCreatTimeToCurrTime(){
		var createTime = new Date(gm.dataManage.data.createTime).getTime();
		var currTime = new Date().getTime();
		var time = currTime - createTime;
		return Math.floor(time/(1000*60*60*24));
	}


	onInitCurrGroup(){
		for(var i:number = 0;i < this.currGroup.numElements;i++){
			var numLbl = <egret.gui.Label>this.currGroup.getElementAt(i);
			numLbl.text = this.getCurrNumByIndex(i);
		}
	}

	onInitAddGroup(){
		for(var i:number = 0;i < this.addGroup.numElements;i++){
			var numLbl = <egret.gui.Label>this.addGroup.getElementAt(i);
			numLbl.text = this.getAddNumByIndex(i);
		}
	}
}
