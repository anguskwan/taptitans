/**
 *
 * @author 
 *
 */
class HeroesSkillPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public bgRect:egret.gui.Rect;
	public nameLbl:egret.gui.Label;
	public lvLbl:egret.gui.Label;
	public dpsLbl:egret.gui.Label;
	public iconImg:egret.gui.UIAsset;
	public value:any;
	public constructor(data?:any) {
        super();
		this.value = data;
		this.skinName = skins.dialog.HeroesSkillPanelSkin;
	}

	public addBgRectColorAndCenter(){
		var width = gm.guiLayer.width;
		var height = gm.guiLayer.height;
		this.bgRect = new egret.gui.Rect();
		this.bgRect.width = width;
		this.bgRect.height = height;
		this.bgRect.fillColor = 0x000000;
		this.bgRect.fillAlpha = 0.5;
		this.skin.addElementAt(this.bgRect,0);
		this.width = width;
		this.height = height;
	}

	public set dataItem(value:any){
		this.value = value;
	}

	public get dataItem():any{
		return this.value;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.addBgRectColorAndCenter();
		this.changeItemStatus();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	changeItemStatus(){
		this.nameLbl.text = this.value.name;
		this.lvLbl.text = this.value.lv;
		this.dpsLbl.text = this.value.dps;
		this.iconImg.source = this.value.iconSource;
		//skills
		//changeItemStatus(){
		//	this.lvLbl.text = this.value.unlockLv;
		//	this.nameLbl.text = this.value.name;
		//	this.descLbl.text = this.value.desc;
		//	this.iconImg.source = this.value.iconSource;
		//	this.unlockGroup.visible = !this.value.isUnlock;
		//	this.iconDisabled.visible = !this.value.isUnlock;
		//}
		//name : v["name"],
		//	skillType : v["skill"],
		//	value : v["value"],
		//	enabled : hero.skill >= id

		var data:any;
		_.each(this.value.skills,function(v,i){
			var index = i + 1;
			data = {
				unlockLv:consts.kHeroSkillUnlockLevelArr[index].toString(),
				name:v.name,
				desc:this.getSkillDesc(v.skillType,v.value),
				iconSource:"heroskill" + this.value.id + "_" + index,
				isUnlock:v.enabled
			};
			this["skillItem" + index].dataItem = data;
			this["skillItem" + index].changeItemStatus();
		}.bind(this));

		//data = {
		//	unlockLv:"1000",
		//	name:"进化",
		//	desc:"重置这个英雄，并大幅度增加攻击力。",
		//	iconSource:"heroskill_evolution",
		//	isUnlock:false
		//};
		//this["skillItem8"].dataItem = data;
		//this["skillItem8"].changeItemStatus();
	}

	getSkillDesc(skillType?:any,value?:any){
		if(skillType == 5){
			return _.sprintf(Conf.heroSkillDesc[skillType].desc,value*100);
		}
		return _.sprintf(Conf.heroSkillDesc[skillType].desc,Math.floor(value*100));
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
