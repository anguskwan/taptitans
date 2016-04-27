module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class HeroesSkillExp extends egret.gui.SkinnableComponent {
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public descLbl:egret.gui.Label;
		public iconDisabled:egret.gui.Rect;
		public unlockGroup:egret.gui.Group;
		public lvGroup:egret.gui.Group;
		public lvLbl:egret.gui.Label;
		public value:any;

		public constructor(data?:any) {
            super();
			this.value = data;
			this.skinName = skins.components.HeroesSkillExpSkin;
		}

		public set dataItem(value:any){
			this.value = value;
		}

		public get dataItem():any{
			return this.value;
		}

		public childrenCreated() {
			super.childrenCreated();
		}

		changeItemStatus(){
			this.lvLbl.text = this.value.unlockLv;
			this.nameLbl.text = this.value.name;
			this.descLbl.text = this.value.desc;
			this.iconImg.source = this.value.iconSource;
			this.unlockGroup.visible = !this.value.isUnlock;
			this.iconDisabled.visible = !this.value.isUnlock;
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
