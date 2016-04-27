module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class PKHeroItemRenderer extends egret.gui.ItemRenderer {
		public leftItem:uiskins.PKHeroItemList;
		public rightItem:uiskins.PKHeroItemList;

		public constructor() {
			super();
			this.skinName = skins.components.PKHeroItemRendererSkin;
		}

		dataChanged(){
			super.dataChanged();
			//item
			var p1Win = this.isLeftOrRightWin(this.data.value);
			var p2Win = p1Win == -1 ? -1:(p1Win == 1 ? 0:1);
			var id = this.data.value.id;
			var meta = Conf.hero[id];
			this.onChangeItem("left",id,meta,this.data.value.p1,p1Win);
			this.onChangeItem("right",id,meta,this.data.value.p2,p2Win);
		}

		isLeftOrRightWin(data){
			var p1 = data.p1;
			var p2 = data.p2;
			if(p1.dps == p2.dps){
				return -1;
			}
			if(p1.dps > p2.dps){
				return 1;
			}
			return 0;
		}

		onChangeItem(type,id,meta,data,isWin){
			var dataItem;
			dataItem = {
				isWin:isWin,
				name:meta.name,
				heroImgSource:"hero" + id,
				dps: Util.formatNumber(data.dps),
				nerf:data.nerf,
				type:type
			};
			this[type + "Item"].dataItem = dataItem;
			this[type + "Item"].changeItemStatus();
		}

	}
}
