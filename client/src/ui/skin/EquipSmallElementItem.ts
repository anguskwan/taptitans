module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EquipSmallElementItem extends egret.gui.SkinnableComponent {
		public iconImg:egret.gui.UIAsset;
		public selectImg:egret.gui.UIAsset;
		public value:any;
		public constructor() {
			super();
			this.skinName = skins.components.EquipSmallElementItemSkin;
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
		}

		setIconImg(){
			var source:any;
			if(this.value.index == 1 && this.value.name == "wing"){
				source = "";
			}
			else {
				source = _.sprintf("equip_%s%d",this.value.name,this.value.index);
			}
			this.iconImg.source = source;
		}

		setSelectImg(){
			this.selectImg.visible = this.value.isSelect;
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
