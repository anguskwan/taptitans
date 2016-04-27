/**
 *
 * @author 
 *
 */
class HookPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public hookLbl:egret.gui.Label;
	public prestigeLbl:egret.gui.Label;
	public hookGroup:egret.gui.Group;
	public textInput:uiskins.SettingTextInput;
	public select1:uiskins.SettingItemSelect;
	public select2:uiskins.SettingItemSelect;
	public settingArr:any;
	public constructor() {
		super();
		this.settingArr = [null,tt.Setting.isOpenAutoHook(),tt.Setting.isOpenAutoPrestige()];
		this.skinName = skins.dialog.HookPanelSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.textInput.textDisplay.addEventListener(egret.Event.CHANGE,this.onChang.bind(this),this);
		this.onInitData();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		this.selectItemChangeStatus(target);
	}

	onChang(event:egret.Event){
		this.cancelBtn();
	}

	onInitData(){
		this.initAllElement();
	}


	initAllElement(){
		var data;
		for(var i:number = 1;i <= 2;i++){
			if(this.settingArr[i]) {
				if(i == 1) {
					this.hookLbl.textColor = 0x33db33;
				}
				else {
					this.prestigeLbl.textColor = 0x33db33;
				}
			}
			else {
				if(i == 1) {
					this.hookLbl.textColor = 0xFFFFFF;
				}
				else {
					this.prestigeLbl.textColor = 0xFFFFFF;
				}
			}
			data = {
				isSelect:this.settingArr[i]
			};
			this["select" + i].dataItem = data;
			this["select" + i].changeDataItem();
		}
		this.textInput.text = "" + tt.Setting.getAutoPrestigeStage();
	}

	selectItemChangeStatus(target){
		var index:number = -1;
		for(var i:number = 1;i <= 2;i++){
			if(target == this["select" + i]){
				index = i;
				//select item
				if(this.settingArr[i]){
					if(i == 1) {
						tt.Setting.setOpenAutoHook(false);
						this.settingArr[i] = false;
						this.hookLbl.textColor = 0xFFFFFF;
					}
					else {
						tt.Setting.setOpenAutoPrestige(false);
						this.settingArr[i] = false;
						this.prestigeLbl.textColor = 0xFFFFFF;
					}
				}
				else {
					if(i == 1) {
						tt.Setting.setOpenAutoHook(true);
						this.settingArr[i] = true;
						this.hookLbl.textColor = 0x33db33;
					}
					else {
						var stage;
						if(this.isRegExpCode(this.textInput.text)) {
							stage = parseInt(this.textInput.text);
							if(stage < 600){
								stage = 600;
							}
						}
						else {
							stage = 600;
						}
						tt.Setting.setAutoPrestigeStage(stage);
						tt.Setting.setOpenAutoPrestige(true);
						this.settingArr[i] = true;
						this.prestigeLbl.textColor = 0x33db33;
						this.textInput.text = "" + tt.Setting.getAutoPrestigeStage();
					}
				}
			}
		}
		if(index != -1){
			for(var i:number = 1;i <= 2;i++) {
				this["select" + i].dataItem.isSelect = this.settingArr[i];
				this["select" + i].changeDataItem();
			}
		}
	}

	public isRegExpCode(str) {
		var re = new RegExp("^[0-9][0-9]{1,5}$");
		return (str.search(re) != -1);
	}

	cancelBtn(){
		tt.Setting.setOpenAutoPrestige(false);
		this.settingArr[2] = false;
		this.prestigeLbl.textColor = 0xFFFFFF;
		this["select2"].dataItem.isSelect = this.settingArr[2];
		this["select2"].changeDataItem();
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
