module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class WeaponItemSelect extends egret.gui.SkinnableComponent {
		public selectRect:egret.gui.Rect;
		public iconImg:egret.gui.UIAsset;
		public weaponLbl:egret.gui.Label;
		public disabledRect:egret.gui.Rect;
		public value:any;
		public constructor(data?:any) {
			super();
			this.value = data;
			this.skinName = skins.components.WeaponItemSelectSkin;
		}

		public set dataItem(value:any){
			this.value = value;
		}

		public get dataItem():any{
			return this.value;
		}

		//change data item
		public changeDataItem(){
			this.selectRect.visible = this.value.isSelect;
			this.iconImg.source = this.value.iconSource;
			this.weaponLbl.text = this.value.lv;
			this.disabledRect.visible = (this.value.lv == "0");
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
