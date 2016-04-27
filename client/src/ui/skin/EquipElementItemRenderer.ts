module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class EquipElementItemRenderer extends egret.gui.ItemRenderer {
		public selectItem1:uiskins.EquipElementItem;
		public selectItem2:uiskins.EquipElementItem;
		public selectItem3:uiskins.EquipElementItem;
		public constructor() {
			super();
			this.skinName = skins.components.EquipElementItemRendererSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		}

		onTouchLayer(event:egret.TouchEvent){
			event.stopPropagation();
			var value:any;

			for(var i:number = 1;i <= _.size(this.data);i++){
				if(event.target == this["selectItem" + i]){
					var idx = i - 1;
					value = this.data[idx];
					var eid;
					if(this.data[idx].meta){
						eid = this.data[idx].meta.id;
					}
					else {
						eid = -1;
					}
					var equips = gm.dataManage.equips;
					if(equips[eid] || eid == -1){
						gm.postMessage(consts.kMessageSelectEquip,{name:value.name,index:value.index,eid:eid})
					}
					else
						gm.postMessage(consts.kMessageShowToastLayer, "公会商店获得");

				}
			}
		}

		dataChanged() {
			super.dataChanged();
			this.setSelectItems();
		}

		setSelectItems(){
			for(var i:number = 0;i < 3;i++){
				var index = i + 1;
				if (this.data[i]) {
					this.setSelectItem(this.data[i],index);
					this["selectItem" + index].visible = true;
				}
				else {
					this["selectItem" + index].visible = false;
				}
			}
		}

		setSelectItem(value,index){
			this["selectItem"+index].dataItem = value;
			this["selectItem"+index].changeDataItem();
		}
	}
}
