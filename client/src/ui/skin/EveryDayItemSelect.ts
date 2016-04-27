module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EveryDayItemSelect extends egret.gui.SkinnableComponent {
		public dayRect:egret.gui.Rect;
		public dayLbl:egret.gui.Label;
		public iconImg:egret.gui.UIAsset;
		public nameLbl:egret.gui.Label;
		public getImg:egret.gui.UIAsset;
		public selectImg:egret.gui.UIAsset;
		public disabledRect:egret.gui.Rect;
		public value:any;
		public constructor() {
			super();
			this.skinName = skins.components.EveryDayItemSelectSkin;
		}

		getElementType(){
			return Conf.everyDayReward[this.value.day].type;
		}

		getElementNum(){
			var num = Conf.everyDayReward[this.value.day].num;
			if(Util.isEveryDayDouble()){
				num = num *2;
			}
			return num;
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
			this.setNameAndNumText();
			this.setDayText();
			this.setDisabledRect();
			this.setSelectImg();
			this.setGetImg();
			this.setDayRect();
		}

		setIconImg(){
			var type = this.getElementType();
			var icon = gm.gameUI.getElementTypeSource(type).icon;
			this.iconImg.source = icon;
		}

		setNameAndNumText(){
			var type = this.getElementType();
			var num = this.getElementNum();
			var name = gm.gameUI.getElementTypeSource(type).name;
			this.nameLbl.text = _.sprintf("%sx%d",name,num)
		}

		setDayText(){
			this.dayLbl.text = _.sprintf("第%d天",this.value.day);
		}

		setDisabledRect(){
			if(this.value.day < this.value.currDay){
				this.disabledRect.visible = true;
			}
			else {
				this.disabledRect.visible = false;
			}
		}

		setSelectImg(){
			if(this.value.day == this.value.currDay) {
				this.selectImg.visible = true;
			}
			else {
				this.selectImg.visible = false;
			}
		}

		setGetImg(){
			if(this.value.info == 1){
				this.getImg.visible = true;
			}
			else {
				this.getImg.visible = false;
			}
		}

		setDayRect(){
			if(this.value.day == this.value.currDay){
				this.dayRect.fillColor = 0x9B1F20;
			}
			else {
				this.dayRect.fillColor = 0x45659C;
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
