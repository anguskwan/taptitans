module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EquipToggleBtn extends egret.gui.ToggleButton {
		private _upSkinName: any;
		private _downSkinName: any;
		private _disabledSkinName: any;
		private _upAndSelectedSkinName: any;
		private _downAndSelectedSkinName: any;
		private _disabledAndSelectedSkinName: any;

		public upSkin: egret.gui.UIAsset;
		public downSkin: egret.gui.UIAsset;
		public disabledSkin: egret.gui.UIAsset;
		public upAndSelectedSkin: egret.gui.UIAsset;
		public downAndSelectedSkin: egret.gui.UIAsset;
		public disabledAndSelelctedSkin: egret.gui.UIAsset;

		private _upEleSkinName: any;
		private _downEleSkinName: any;
		private _disabledEleSkinName: any;
		private _upAndSelectedEleSkinName: any;
		private _downAndSelectedEleSkinName: any;
		private _disabledAndSelectedEleSkinName: any;

		public upEleSkin: egret.gui.UIAsset;
		public downEleSkin: egret.gui.UIAsset;
		public disabledEleSkin: egret.gui.UIAsset;
		public upAndSelectedEleSkin: egret.gui.UIAsset;
		public downAndSelectedEleSkin: egret.gui.UIAsset;
		public disabledAndSelelctedEleSkin: egret.gui.UIAsset;


		public constructor() {
			super();
			this.skinName = skins.components.EquipToggleBtnSkin;
		}

		private getName(name){
			return this["_" + name + "SkinName"];
		}

		private setValue(value,name){
			if(value == this["_" + name + "SkinName"])
				return;
			this["_" + name + "SkinName"] = value;
			if(this[name + "Skin"]) {
				this[name + "Skin"].source = value;
			}
		}

		//element up
		public get upEleSkinName(): any {
			return this.getName("upEle");
		}
		public set upEleSkinName(value: any) {
			this.setValue(value,"upEle");
		}

		public get downEleSkinName(): any {
			return this.getName("downEle");
		}
		public set downEleSkinName(value: any) {
			this.setValue(value,"downEle");
		}

		public get disabledEleSkinName(): any {
			return this.getName("disabledEle");
		}
		public set disabledEleSkinName(value: any) {
			this.setValue(value,"disabledEle");
		}

		public get upAndSelectedEleSkinName(): any {
			return this.getName("upAndSelectedEle");
		}
		public set upAndSelectedEleSkinName(value: any) {
			this.setValue(value,"upAndSelectedEle");
		}

		public get downAndSelectedEleSkinName(): any {
			return this.getName("downAndSelectedEle");
		}
		public set downAndSelectedEleSkinName(value: any) {
			this.setValue(value,"downAndSelectedEle");
		}

		public get disabledAndSelectedEleSkinName(): any {
			return this.getName("disabledAndSelectedEle");
		}
		public set disabledAndSelectedEleSkinName(value: any) {
			this.setValue(value,"disabledAndSelectedEle");
		}

		//skin
		public get upSkinName(): any {
			return this.getName("up");
		}
		public set upSkinName(value: any) {
			this.setValue(value,"up");
		}

		public get downSkinName(): any {
			return this.getName("down");
		}
		public set downSkinName(value: any) {
			this.setValue(value,"down");
		}

		public get disabledSkinName(): any {
			return this.getName("disabled");
		}
		public set disabledSkinName(value: any) {
			this.setValue(value,"disabled");
		}

		public get upAndSelectedSkinName(): any {
			return this.getName("upAndSelected");
		}
		public set upAndSelectedSkinName(value: any) {
			this.setValue(value,"upAndSelected");
		}

		public get downAndSelectedSkinName(): any {
			return this.getName("downAndSelected");
		}
		public set downAndSelectedSkinName(value: any) {
			this.setValue(value,"downAndSelected");
		}

		public get disabledAndSelectedSkinName(): any {
			return this.getName("disabledAndSelected");
		}
		public set disabledAndSelectedSkinName(value: any) {
			this.setValue(value,"disabledAndSelected");
		}

		onSkinParAdded(instance){
			if(instance == this.upSkin) {
				this.upSkin.source = this._upSkinName;
			}
			else if(instance == this.downSkin) {
				this.downSkin.source = this._downSkinName;
			}
			else if(instance == this.disabledSkin) {
				this.disabledSkin.source = this._disabledSkinName;
			}
			else if(instance == this.upAndSelectedSkin) {
				this.upAndSelectedSkin.source = this._upAndSelectedSkinName;
			}
			else if(instance == this.downAndSelectedSkin) {
				this.downAndSelectedSkin.source = this._downAndSelectedSkinName;
			}
			else if(instance == this.disabledAndSelelctedSkin) {
				this.disabledAndSelelctedSkin.source = this._disabledAndSelectedSkinName;
			}
		}

		onEleSkinParAdded(instance){
			if(instance == this.upEleSkin) {
				this.upEleSkin.source = this._upEleSkinName;
			}
			else if(instance == this.downEleSkin) {
				this.downEleSkin.source = this._downEleSkinName;
			}
			else if(instance == this.disabledEleSkin) {
				this.disabledEleSkin.source = this._disabledEleSkinName;
			}
			else if(instance == this.upAndSelectedEleSkin) {
				this.upAndSelectedEleSkin.source = this._upAndSelectedEleSkinName;
			}
			else if(instance == this.downAndSelectedEleSkin) {
				this.downAndSelectedEleSkin.source = this._downAndSelectedEleSkinName;
			}
			else if(instance == this.disabledAndSelelctedEleSkin) {
				this.disabledAndSelelctedEleSkin.source = this._disabledAndSelectedEleSkinName;
			}
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
			this.onSkinParAdded(instance);
			this.onEleSkinParAdded(instance);
		}
	}
}
