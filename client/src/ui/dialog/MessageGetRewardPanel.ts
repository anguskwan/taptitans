/**
 *
 * @author 
 *
 */
class MessageGetRewardPanel extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public titleLbl:egret.gui.Label;
	public getGroup:egret.gui.Group;
	public _title:any;
	public _value:any;
	public constructor(title,value) {
		super();
		this._title = title;
		this._value = value;
		this.skinName = skins.dialog.MessageGetRewardPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setTitleText();
		this.initItemReward();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	setTitleText(){
		this.titleLbl.text = this._title;
	}

	addItem(type,numCount){
		var icon:any;
		var name:any;
		var currNum:any;
		if(type == "equip"){
			var meta = Conf.equipMeta[numCount];
			var typeName = gm.gameUI.getEquipTypeToName(meta.type);
			name = meta.name;
			icon = _.sprintf("equip_%s%d",typeName,meta.num);
			currNum = 1;
		}
		else {
			icon = gm.gameUI.getElementTypeSource(type).icon;
			name = gm.gameUI.getElementTypeSource(type).name;
			currNum = numCount;
		}
		var iconImg = new egret.gui.UIAsset();
		iconImg.width = 58;
		iconImg.height = 58;
		iconImg.source = icon;
		var group = new egret.gui.Group();
		group.width = 58;
		group.height = 58;

		var title = new egret.gui.Label();
		title.size = 18;
		title.fontFamily = "Arial";
		title.horizontalCenter = 0;
		title.verticalCenter = -42;
		title.text = name;

		var num = new egret.gui.Label();
		num.size = 18;
		num.fontFamily = "Arial";
		num.horizontalCenter = 0;
		num.verticalCenter = 42;
		num.text = Util.formatNumber(currNum);
		group.addElement(title);
		group.addElement(iconImg);
		group.addElement(num);
		this.getGroup.addElement(group);
	}

	initItemReward(){
		_.each(this._value,function(v){
			if(v.type == "equip"){
				this.addItem(v.type,v.id);
			}
			else {
				this.addItem(v.type,v.num);
			}
		}.bind(this))
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
