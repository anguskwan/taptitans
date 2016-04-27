/**
 *
 * @author 
 *
 */
class EquipLevelUpPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public iconImg:egret.gui.UIAsset;
	public equipLbl:egret.gui.Label;
	public currSkillDescLbl:egret.gui.Label;
	public nextSkillDescLbl:egret.gui.Label;
	public nextSkillTitleLbl:egret.gui.Label;
	public currStarGroup:egret.gui.Group;
	public nextStarGroup:egret.gui.Group;

	public currSelectItem:any;
	public currEquipValue:any;
	public nextEquipValue:any;
	public arrName:any;
	public constructor(currSelectItem,currEquipValue,nextEquipValue) {
		super();
		this.currSelectItem = currSelectItem;
		this.currEquipValue = currEquipValue;
		this.nextEquipValue = nextEquipValue;
		this.arrName = ["weapon","mantle","headpiece","wing","armor","sword"];
		this.skinName = skins.dialog.EquipLevelUpPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.onInit();
	}

	onInit(){
		this.setIconImg();
		this.setEquipText();
		this.setCurrSkillDescText();
		this.setNextSkill();
		this.setCurrStarGroup();
		this.setNextStarGroup();
	}

	setIconImg(){
		var index = this.currSelectItem.type - 1;
		var name = this.arrName[index];
		var num = this.currSelectItem.num;
		this.iconImg.source = _.sprintf("equip_%s%d",name,num);
	}

	setEquipText(){
		this.equipLbl.text = this.currSelectItem.name;
	}

	setCurrSkillDescText(){
		var name;
		var desc;
		var meta = Conf.equipSkill[this.currEquipValue.skill];
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var star = rareStarArr[this.currSelectItem.rare];
		var step = rareInitStarArr[star] + this.currEquipValue.step;
		if(this.currEquipValue.skill == 9){
			var heroMeta = Conf.hero[this.currEquipValue.target];
			name = meta.name + heroMeta.name;
			desc = _.sprintf(meta.desc,heroMeta.name,meta["lv" + step]*100);
		}
		else {
			name = meta.name;
			desc = _.sprintf(meta.desc,meta["lv" + step]*100);
		}
		Util.setStyleText(this.currSkillDescLbl,_.sprintf("<font color='%d'>%s</font>:%s",
			gm.gameUI.getEquipSkillColor(this.currEquipValue.skill),
			name,
			desc));
	}

	setNextSkill(){
		var name;
		var desc;
		var meta = Conf.equipSkill[this.nextEquipValue.skill];
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var star = rareStarArr[this.currSelectItem.rare];
		var step = rareInitStarArr[star] + this.nextEquipValue.step;
		if(this.nextEquipValue.skill == 9){
			var heroMeta = Conf.hero[this.nextEquipValue.target];
			name = meta.name + heroMeta.name;
			desc = _.sprintf(meta.desc,heroMeta.name,meta["lv" + step]*100);
		}
		else {
			name = meta.name;
			desc = _.sprintf(meta.desc,meta["lv" + step]*100);
		}
		this.nextSkillDescLbl.text = desc;
		this.nextSkillTitleLbl.text = name;
		this.nextSkillTitleLbl.textColor = gm.gameUI.getEquipSkillColor(this.nextEquipValue.skill);
	}

	setCurrStarGroup(){
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var star = rareStarArr[this.currSelectItem.rare];
		var step = rareInitStarArr[star] + this.currEquipValue.step;
		for(var i:number = 0;i < step;i++){
			var starImg:egret.gui.UIAsset = new egret.gui.UIAsset();
			starImg.source = "equip_icon_star_on";
			this.currStarGroup.addElement(starImg);
		}
	}

	setNextStarGroup(){
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var star = rareStarArr[this.currSelectItem.rare];
		var step = rareInitStarArr[star] + this.nextEquipValue.step;
		for(var i:number = 0;i < step;i++){
			var starImg:egret.gui.UIAsset = new egret.gui.UIAsset();
			starImg.source = "equip_icon_star_on";
			this.nextStarGroup.addElement(starImg);
		}
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}
}
