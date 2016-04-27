module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EquipElementItem extends egret.gui.SkinnableComponent {
		public iconImg:egret.gui.UIAsset;
		public selectImg:egret.gui.UIAsset;
		public lockGroup:egret.gui.Group;
		public suitImg:egret.gui.UIAsset;
		public starGroup:egret.gui.Group;
		public nameLbl:egret.gui.Label;
		public lvLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public progress:uiskins.EquipExpProgressBar;
		public value:any;
		public constructor() {
			super();
			this.skinName = skins.components.EquipElementItemSkin;
		}

		public set dataItem(value:any){
			this.value = value;
		}

		public get dataItem():any{
			return this.value;
		}

		//change data item
		public changeDataItem(){
			this.setIconImg();
			this.setSelectImg();
			this.setLockGroup();
			this.setLvText();
			this.setNameText();
			this.setStarGroup();
			this.setSuitImg();
			this.setAttText();
			this.setProgressBar();
		}

		setIconImg(){
			var source:any;
			if(this.value.name == "wing" && this.value.index == 1){
				source = "equip_without";
			}
			else {
				source = _.sprintf("equip_buy_%s%d",this.value.name,this.value.index);
			}
			this.iconImg.source = source;
		}

		setSelectImg(){
			this.selectImg.visible = this.value.isSelect;
		}

		setLockGroup(){
			var equips = gm.dataManage.equips;
			var index = this.value.index;
			var meta = this.value.meta;
			var equip = !meta ? null:equips[meta.id];
			if(index == 1 || equip){
				this.lockGroup.visible = false;
			}
			else {
				this.lockGroup.visible = true;
			}
		}

		setNameText(){
			var meta = this.value.meta;
			if(meta){
				this.nameLbl.visible = true;
				this.nameLbl.text = meta.name;
			}
			else {
				this.nameLbl.visible = false;
			}
		}

		setLvText(){
			var meta = this.value.meta;
			if(meta){
				this.lvLbl.visible = true;
				var equips = gm.dataManage.equips;
				var equip = equips[meta.id];
				var lv:any;
				if(equip){
					lv = equip.level;
				}
				else {
					lv = 0;
				}
				this.lvLbl.text = _.sprintf("Lv.%d",lv);
			}
			else {
				this.lvLbl.visible = false;
			}
		}

		setStarGroup(){
			var meta = this.value.meta;
			if(meta){
				this.starGroup.visible = true;
				var rareStarArr = [0,3,4,5];
				var rareInitStarArr = {3:0,4:1,5:2};
				var equips = gm.dataManage.equips;
				var equip = equips[meta.id];
				if(equip){
					var star = rareStarArr[meta.rare];
					var step = rareInitStarArr[star] + equip.step;
					for(var i = 1;i <= 5;i++){
						if(i <= star){
							this["star"+i].visible = true;
							if(i <= step){
								this["star"+i].source = "equip_icon_star_on";
							}
							else {
								this["star"+i].source = "equip_icon_star_off";
							}
						}
						else {
							this["star"+i].visible = false;
						}
					}
				}
				else {
					this.starGroup.visible = false;
				}
			}
			else {
				this.starGroup.visible = false;
			}
		}

		setSuitImg(){
			if(this.value.index >= 2 && this.value.index <= 11){
				this.suitImg.visible = true;
				this.suitImg.source = "equip_icon_" + this.value.index;
			}
			else {
				this.suitImg.visible = false;
			}
		}

		setAttText(){
			var meta = this.value.meta;
			if(meta){
				this.attLbl.visible = true;
				var equips = gm.dataManage.equips;
				var equip = equips[meta.id];
				if(equip){
					this.attLbl.visible = true;
					this.attLbl.text = _.sprintf("%.1f%%",meta.val/30*equip.level);
				}
				else {
					this.attLbl.visible = false;
				}
			}
			else {
				this.attLbl.visible = false;
			}
		}

		setProgressBar(){
			var meta = this.value.meta;
			if(meta){
				this.lvLbl.visible = true;
				var equips = gm.dataManage.equips;
				var equip = equips[meta.id];
				if(equip){
					this.progress.visible = true;
					this.progress.maximum = formula.masterEquipExp(gm.dataManage.data,meta.id,equip.level);
					this.progress.value = equip.exp;
				}
				else {
					this.progress.visible = false;
				}
			}
			else {
				this.progress.visible = false;
			}
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
