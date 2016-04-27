/**
 *
 * @author 
 *
 */
class GuildBadgePanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public selectGroup:egret.gui.Group;
	public _cb:any;
	public _index:any;
	public constructor(index,cb) {
		super();
		this._index = index;
		this._cb = cb;
		this.skinName = skins.dialog.GuildBadgePanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.initAllElement();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.rightBtn){
			Util.invokeCallback(this._cb,this._index);
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		this.selectItemChangeStatus(event.target);
	}

	selectItemChangeStatus(target){
		var index:number = -1;
		for(var i:number = 0;i < 10;i++){
			var item:uiskins.GuildBadgeItemSelect = <uiskins.GuildBadgeItemSelect>this.selectGroup.getElementAt(i);
			if(target == item){
				//select target
				index = i;
				this._index = index + 1;
			}
		}
		if(index != -1){
			for(var i:number = 0;i < 10;i++) {
				var item:uiskins.GuildBadgeItemSelect = <uiskins.GuildBadgeItemSelect>this.selectGroup.getElementAt(i);
				item.dataItem.isSelect = (index == i);
				item.changeDataItem();
			}
		}
	}

	initAllElement(){
		var data:any;
		for(var i:number = 0;i < 10;i++){
			var index = i + 1;
			var name = gm.dataManage.data.name || "英雄";
			data = {
				isSelect: (index == this._index),
				iconSource:"guild_badge" + index,
				name:name[0]
			};
			var item:uiskins.GuildBadgeItemSelect = <uiskins.GuildBadgeItemSelect>this.selectGroup.getElementAt(i);
			item.dataItem = data;
			item.changeDataItem();
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
