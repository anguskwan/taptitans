module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityItemSelect extends egret.gui.SkinnableComponent {
		public selectRect:egret.gui.Rect;
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public value:any;
		public constructor(data?:any) {
			super();
			this.value = data;
			this.skinName = skins.components.ActivityItemSelectSkin;
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
			this.nameLbl.text = this.value.name;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.changeDataItem();
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
