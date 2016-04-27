/**
 *
 * @author 
 *
 */
class BuyTenTimesPanel extends egret.gui.SkinnableComponent {
	public rewardBtn:egret.gui.Button;
	public kTagName:number = 0;
	public kTagIconImg:number = 1;
	public kTagReward:number = 3;
	private _value:any;
	public constructor(data) {
        super();
		this._value = data;
		this.skinName = skins.dialog.BuyTenTimesPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this.onInitRewradUI();
	}

	onInitRewradUI(){
		_.each(this._value,function(v,i){
			var elementTypeSource:any;
			if(v.type == "equip"){
				var meta = Conf.equipMeta[v.id];
				var name = gm.gameUI.getEquipTypeToName(meta.type);
				var icon = _.sprintf("equip_%s%d",name,meta.num);
				elementTypeSource = {
					icon:icon,
					name:meta.name,
					num:1
				};
			}
			else {
				elementTypeSource = gm.gameUI.getElementTypeSource(v.type);
				elementTypeSource["num"] = v.num;
			}
			this.setItemInfoUI(
				this["item" + i],
				elementTypeSource.icon,
				elementTypeSource.name,
				elementTypeSource.num);
		}.bind(this));
	}

	setItemInfoUI(itemGroup,iconSource,name,num){
		var iconImg:egret.gui.UIAsset = itemGroup.getElementAt(this.kTagIconImg);
		iconImg.source = iconSource;
		var nameLbl:egret.gui.Label = itemGroup.getElementAt(this.kTagName);
		nameLbl.text = name;
		var numLbl:egret.gui.Label = itemGroup.getElementAt(this.kTagReward);
		numLbl.text = Util.formatNumber(num);
	}

	onTouchLayer(event:egret.TouchEvent) {
		event.stopPropagation();
		if(event.target == this.rewardBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
