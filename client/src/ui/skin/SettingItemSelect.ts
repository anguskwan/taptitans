module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class SettingItemSelect extends egret.gui.SkinnableComponent {
		public iconImg:egret.gui.UIAsset;
		public value:any;
		public constructor(data?:any) {
			super();
			this.value = data;
			this.skinName = skins.components.SettingItemSelectSkin;
		}

		public set dataItem(value:any){
			this.value = value;
		}

		public get dataItem():any{
			return this.value;
		}

		//change data item
		public changeDataItem(){
			this.iconImg.visible = this.value.isSelect;
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