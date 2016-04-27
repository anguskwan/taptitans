/**
 *
 * @author 
 *
 */
class EquipLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public infoBtn:egret.gui.Button;
	public attLbl:egret.gui.Label;
	public lvStarLbl:egret.gui.Label;
	public lvStarGroup:egret.gui.Group;
	public lvStarBtn:egret.gui.Button;
	public fragmentNeedGroup:egret.gui.Group;
	public fragmentNeedLbl:egret.gui.Label;
	public currLevelLbl:egret.gui.Label;
	public fragmentLbl:egret.gui.Label;
	public skillDescLbl:egret.gui.Label;
	public skillTitleLbl:egret.gui.Label;
	public skillLevelLbl:egret.gui.Label;
	public arrName:any;
	public arrInfoName:any;
	public toggleBtns:any;

	public weaponItem:uiskins.EquipSmallElementItem;
	public mantleItem:uiskins.EquipSmallElementItem;
	public headpieceItem:uiskins.EquipSmallElementItem;
	public wingItem:uiskins.EquipSmallElementItem;
	public armorItem:uiskins.EquipSmallElementItem;
	public swordItem:uiskins.EquipSmallElementItem;

	public weaponList:egret.gui.List;
	public mantleList:egret.gui.List;
	public headpieceList:egret.gui.List;
	public wingList:egret.gui.List;
	public armorList:egret.gui.List;
	public swordList:egret.gui.List;

	public weaponData:any;
	public mantleData:any;
	public headpieceData:any;
	public wingData:any;
	public armorData:any;
	public swordData:any;

	public weaponCollection:egret.gui.ArrayCollection;
	public mantleCollection:egret.gui.ArrayCollection;
	public headpieceCollection:egret.gui.ArrayCollection;
	public wingCollection:egret.gui.ArrayCollection;
	public armorCollection:egret.gui.ArrayCollection;
	public swordCollection:egret.gui.ArrayCollection;

	public weaponIsInit:any;
	public mantleIsInit:any;
	public headpieceIsInit:any;
	public wingIsInit:any;
	public armorIsInit:any;
	public swordIsInit:any;

	public weaponMeta:any;
	public mantleMeta:any;
	public headpieceMeta:any;
	public wingMeta:any;
	public armorMeta:any;
	public swordMeta:any;
	public currSelectItem:any;
	public masterEquips:any;

	private _equipElementItemRenderer:egret.gui.ClassFactory;

	public constructor() {
		super();
		//武器 披风 头盔 翅膀 盔甲 刀光
		//[void 0, "weapon", "cloak", "head", "wing", "body", "light"];
		this.arrName = ["weapon","mantle","headpiece","wing","armor","sword"];
		this.arrInfoName = ["所有伤害：+%.1f%%","暴击伤害：+%.1f%%","金币掉落：+%.1f%%","宝箱：+%.1f%%","致命一击：+%.1f%%","点击攻击力：+%.1f%%"];
		this.toggleBtns = [];
		this.masterEquips = [];
		this.currSelectItem = null;
		this.skinName = skins.dialog.EquipLayerSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		gm.registerMessage(consts.kMessageSelectEquip,this.selectEquipItem,this);
		this._equipElementItemRenderer = new egret.gui.ClassFactory(uiskins.EquipElementItemRenderer);
		this.masterEquips = _.clone(gm.dataManage.data.masterEquips);
		this.loadEquipData();
	}

	setFragmentText(){
		this.fragmentLbl.text = "" + gm.dataManage.data.fragment;
	}

	setAttText(name){
		var index = this.arrName.indexOf(name);
		var desc = this.arrInfoName[index];
		var equips = gm.dataManage.equips;
		var attValue:any = 0;
		_.each(this[name + "Meta"],function(v){
			var id = v.id;
			var equip = equips[id];
			if(equip){
				attValue += v.val/30*equip.level;
			}
		}.bind(this));
		this.attLbl.text = _.sprintf(desc,attValue);
	}

	loadEquipData(){
		gm.gameUI.showLoadingLayer();
		gm.dataManage.queryEquips(function(){
			this.initCurrData();
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this))
	}

	initCurrData(){
		_.each(this.arrName,function(name,i){
			var data:any;
			var index = i + 1;
			data = {
				isSelect:name == "weapon",
				name:name,
				index:this.getItemSelectIdx(index)
			};
			this[name + "Item"].dataItem = data;
			this[name + "Item"].changeDataItem();

			this[name + "IsInit"] = true;
			this[name + "Data"] = [];
			this[name + "Select"].addEventListener(egret.Event.CHANGE,this.toggleChangeHandler,this);
			this.toggleBtns.push(this[name + "Select"]);
			this.changeRankList(name,name == "weapon");
		}.bind(this));
		this.updateEquipDesc(this.masterEquips[1] || 0);
		this.setFragmentText();
		this.setAttText("weapon");
	}

	toggleChangeHandler(evt:egret.Event):void {
		for(var i:number=0;i<this.toggleBtns.length;i++) {
			this.changeRankList(this.arrName[i],(this.toggleBtns[i] == evt.target));
		}
	}

	changeRankList(name,isShow){
		this[name + "List"].visible = isShow;
		this[name + "Select"].selected = isShow;
		this[name + "Item"].dataItem.isSelect = isShow;
		this[name + "Item"].changeDataItem();
		if(isShow){
			this.initAndUpdateList(name);
			this.setAttText(name);
		}
	}

	initList(name,selectIndex,type){
		this[name + "Meta"] = _.filter(Conf.equipMeta,function(v){return v.type == type;}.bind(this));
		var max = _.size(this[name + "Meta"]) + 1;
		var maxIndex = Math.ceil(max/3);
		var arrData:any;
		var index:any = 1;
		for(var i:number = 0;i < maxIndex;i++){
			arrData = [];
			for(var j:number = 0;j < 3;j++){
				if(index <= max){
					arrData.push(this.getItemData(name,index++,selectIndex));
				}
			}
			this[name + "Data"].push(arrData);
		}
		this.addList(name);
	}

	updateEquipDesc(eid){
		var meta = Conf.equipMeta[eid];
		var equips = gm.dataManage.equips;
		var equip = equips[eid];
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var levelTextArr = {1:"Ⅰ",2:"Ⅱ",3:"Ⅲ",4:"Ⅳ",5:"Ⅴ"};
		if(meta && equip){
			var star = rareStarArr[meta.rare];
			var step = rareInitStarArr[star] + equip.step;
			var metaSkill = Conf.equipSkill[equip.skill];
			var cost = consts.kEquipCostFragmentArr[step];
			var name:any;
			var desc:any;
			this.lvStarGroup.visible = true;
			this.fragmentNeedGroup.visible = true;
			this.currLevelLbl.visible = true;
			this.fragmentNeedLbl.text = cost;
			if(equip.target != 0 && equip.skill == 9){
				name = metaSkill.name + Conf.hero[equip.target].name;
				desc = _.sprintf(metaSkill.desc,Conf.hero[equip.target].name,metaSkill["lv" + step]*100);
			}
			else {
				name = metaSkill.name;
				desc = _.sprintf(metaSkill.desc,metaSkill["lv" + step]*100);
			}
			this.skillDescLbl.text = desc;
			this.skillTitleLbl.text = name;
			this.skillTitleLbl.textColor = gm.gameUI.getEquipSkillColor(equip.skill);
			this.currLevelLbl.text = _.sprintf("Lv.%d",equip.level);
			if(gm.dataManage.data.fragment >= cost && (equip.level == equip.step * 10)){
				this.lvStarBtn.enabled = true;
			}
			else {
				this.lvStarBtn.enabled = false;
			}
			this.currSelectItem = meta;
			this.skillLevelLbl.text = levelTextArr[step];
			this.skillLevelLbl.textColor = gm.gameUI.getEquipSkillColor(equip.skill);
		}
		else {
			this.skillDescLbl.text = "";
			this.skillTitleLbl.text = "";
			this.skillLevelLbl.text = "";
			this.lvStarGroup.visible = false;
			this.fragmentNeedGroup.visible = false;
			this.currLevelLbl.visible = false;
			this.currSelectItem = null;
		}
	}

	updateList(name){
		_.each(this[name + "Collection"].source,function(v){
			this[name + "Collection"].itemUpdated(v);
		}.bind(this));
	}

	initAndUpdateList(name){
		if(this[name + "IsInit"]){
			this[name + "InitList"]();
			this[name + "IsInit"] = false;
		}
		else {
			this[name + "UpdateList"]();
		}
	}

	updateSelectItem(name,index){
		var idx:any = -1;
		for(var i:number = 0;i < this[name + "Collection"].length;i++){
			var item = this[name + "Collection"].getItemAt(i);
			for(var j:number = 0;j < 3;j++) {
				if(item[j]){
					idx = item[j].index;
					item[j].isSelect = (idx == index);
					var meta = item[j].meta;
					var eid = meta? meta.id:0;
					if(idx == index){
						this.updateEquipDesc(eid);
						var selectIdx = this.arrName.indexOf(name) + 1;
						this.masterEquips[selectIdx] = eid;
						this[name + "Item"].dataItem.index = index;
						this[name + "Item"].changeDataItem();
					}
				}
			}
			this[name + "Collection"].itemUpdated(item);
		}
	}

	selectEquipItem(data){
		if(data && data.data){
			var name = data.data.name;
			var index = data.data.index;
			this.updateSelectItem(name,index);
		}
	}

	addList(name){
		var collection:egret.gui.ArrayCollection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
		this[name + "List"].dataProvider = collection;
		this[name + "List"].itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(event){
		return this._equipElementItemRenderer;
	}

	getItemData(name,index,selectId){
		var idx = index - 1;
		var data = {
			name:name,
			index:index,
			isSelect:(index == selectId),
			meta:idx == 0 ? null:this[name + "Meta"][idx - 1]
		};
		return data;
	}

	getItemSelectIdx(idx){
		var selectIdx:any;
		var masterEquips = this.masterEquips[idx];
		if(masterEquips){
			selectIdx = Conf.equipMeta[masterEquips].num;
		}
		else {
			selectIdx = 1;
		}
		return selectIdx;
	}

	onInitListByName(name){
		var index = this.arrName.indexOf(name) + 1;
		this.initList(name,this.getItemSelectIdx(index),index);
		this.updateEquipDesc(this.masterEquips[index] || 0);
	}

	onUpdateListByName(name){
		var index = this.arrName.indexOf(name) + 1;
		this.updateList(name);
		this.updateEquipDesc(this.masterEquips[index] || 0);
	}

	weaponInitList(){
		this.onInitListByName("weapon");
	}

	weaponUpdateList(){
		this.onUpdateListByName("weapon");
	}

	mantleInitList(){
		this.onInitListByName("mantle");
	}

	mantleUpdateList(){
		this.onUpdateListByName("mantle");
	}

	headpieceInitList(){
		this.onInitListByName("headpiece");
	}

	headpieceUpdateList(){
		this.onUpdateListByName("headpiece");
	}

	wingInitList(){
		this.onInitListByName("wing");
	}

	wingUpdateList(){
		this.onUpdateListByName("wing");
	}

	armorInitList(){
		this.onInitListByName("armor");
	}

	armorUpdateList(){
		this.onUpdateListByName("armor");
	}

	swordInitList(){
		this.onInitListByName("sword");
	}

	swordUpdateList(){
		this.onUpdateListByName("sword");
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			this.onCloseLayer();
			if(_.isEqual(this.masterEquips,gm.dataManage.data.masterEquips)){
				return ;
			}
			gm.gameUI.showLoadingLayer();
			gm.dataManage.setMasterEquips(this.masterEquips,function(){
				gm.gameScene.master.refreshArmature();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		if(target == this.infoBtn){
			var infoLy = new EquipInfoPanel();
			gm.guiLayer.addElement(infoLy);
		}
		if(target == this.lvStarBtn && this.lvStarBtn.enabled){
			if(this.currSelectItem){
				var eid = this.currSelectItem.id;
				gm.gameUI.showLoadingLayer();
				this.lvStarBtn.enabled = false;
				var currEquip = _.clone(gm.dataManage.equips[eid]);
				gm.dataManage.evolutionEquip(eid,function(data){
					gm.dataManage.equips[eid] = data.equip;
					gm.dataManage.costMoney(data.cost, consts.kMoneyTypeFragment);
					var index = this.currSelectItem.type - 1;
					var name = this.arrName[index];
					//this.initAndUpdateList(name);
					this[name + "UpdateList"]();
					this.setFragmentText();
					var levelUpLy = new EquipLevelUpPanel(this.currSelectItem,currEquip,data.equip);
					gm.guiLayer.addElement(levelUpLy);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}
	}

	onCloseLayer(){
		gm.removeMessage(consts.kMessageSelectEquip,this.selectEquipItem,this);
		gm.guiLayer.removeElement(this);
	}

	getFragmentCost(eid){
		var meta = Conf.equipMeta[eid];
		var equips = gm.dataManage.equips;
		var equip = equips[eid];
		var rareStarArr = [0,3,4,5];
		var rareInitStarArr = {3:0,4:1,5:2};
		var star = rareStarArr[meta.rare];
		var step = rareInitStarArr[star] + equip.step;
		var cost = consts.kEquipCostFragmentArr[step];
		return cost;
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
