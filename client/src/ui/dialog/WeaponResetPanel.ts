/**
 *
 * @author 
 *
 */
class WeaponResetPanel extends WeaponPanel{
	public resetGroup:egret.gui.Group;
	public resetBtn:egret.gui.Button;
	public crystalLbl:egret.gui.Label;
	public priceArr:any;
	public selectIndex:any;


	public lblTotal:egret.gui.Label;
	public resetGroupTotal:egret.gui.Group;

	public constructor() {
		super();
		this.priceArr = [50, 50, 60, 60, 80, 80, 100];
		this.selectIndex = -1;
		this.skinName = skins.dialog.WeaponResetPanelSkin;
	}

	onTouchTarget(target){
		//
		if(target == this.resetBtn){
			this.onResetWeapon();
		}
		//super.onTouchTarget(target);
	}

	onResetWeapon(){
		if(this.selectIndex == -1){return ;}
		var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
		var idx = Math.min(6,resetWeapon);
		var price = this.priceArr[idx];
		if (!gm.dataManage.costMoney(price,'crystal')) {
			gm.postMessage(consts.kMessageShowToastLayer,"水晶不足");
			return false;
		}
		gm.gameUI.showLoadingLayer();
		var wid = this.selectIndex;
		gm.dataManage.resetWeapon(wid,function(){
			gm.dataManage.useWeaponItem(function(){
				this.updateResetStatus();
				gm.postMessage(consts.kMessageAddWeapon);
			}.bind(this));
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	setSelectItem(index){
		super.setSelectItem(index);
		this.setResetBtn(index);
	}

	setResetBtn(index){
		this.selectIndex = index;
		var weaponLevel:number = gm.dataManage.data.heroWeapons[index] || 0;
		this.resetGroup.visible = weaponLevel != 0;
		this.resetGroupTotal.visible = weaponLevel != 0;

		var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
		var idx = Math.min(6,resetWeapon);
		var price = this.priceArr[idx];
		this.crystalLbl.text = price + "";
	}

	updateResetStatus(){
		this.setResetBtn(this.selectIndex);
		for(var i:number = 1;i <= 33;i++){
			var weaponLevel:number = gm.dataManage.data.heroWeapons[i] || 0;
			this["selectItem" + i].dataItem.isSelect = (this.selectIndex == i);
			this["selectItem" + i].dataItem.lv = "" + weaponLevel;
			this["selectItem" + i].changeDataItem();
		}
		var minLv:any = 0;
		var newArray = _.filter(gm.dataManage.data.heroWeapons, function(num){ return num != 0;}.bind(this));
		if(_.size(newArray) == 33){
			minLv = _.min(newArray);
		}
		this.currLevelLbl.text = minLv + "";
		this.currDPSLbl.text = _.sprintf("英雄DPS x%d",minLv*10);
		this.nextLevelLbl.text = (minLv + 1) + "";
		this.nextDPSLbl.text = _.sprintf("英雄DPS x%d",(minLv + 1)*10);

		var crystal = gm.dataManage.data.crystal;
		this.lblTotal.text=_.sprintf("%d",crystal);
	}

	public childrenCreated() {
		super.childrenCreated();

		var crystal = gm.dataManage.data.crystal;
		this.lblTotal.text = _.sprintf("%d", crystal);
	}
}
