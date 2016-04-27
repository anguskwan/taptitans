/**
 *
 * @author 
 *
 */
class GuildBagGetPanel extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public iconImg:egret.gui.UIAsset;
	public getDiamondLbl:egret.gui.Label;
	public nameLbl:egret.gui.Label;
	public titleLbl:egret.gui.Label;
	public getList:egret.gui.List;
	public getCollection:egret.gui.ArrayCollection;
	public _getItem:egret.gui.ClassFactory;
	public getData:any;
	public idx:any;
	public constructor(idx) {
		super();
		this.idx = idx;
		this.skinName = skins.dialog.GuildBagGetPanelSkin;
	}

	isGetDiamond(){
		var id = gm.dataManage.data.id;
		var meta = this.getRedEnvelope();
		if(meta.list[id]){
			return true;
		}
		if(_.size(meta.diamond) < 1){
			return false;
		}
	}

	getRedEnvelope(){
		return gm.dataManage.guild.redEnvelope[this.idx];
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this._getItem = new egret.gui.ClassFactory(uiskins.GuildBagGetItemRenderer);
		this.getData = [];
		this.onInitData();
		this.setIconImg();
		this.setNameText();
		this.setTitleText();
		this.setDiamondText();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	onInitData(){
		var meta = this.getRedEnvelope();
		_.each(meta.list,function(v){
			this.getData.push(v);
		}.bind(this));
		this.addList("get");
	}

	addList(name){
		var collection:egret.gui.ArrayCollection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
		this[name + "List"].dataProvider = collection;
		this[name + "List"].itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(event){
		return this._getItem;
	}

	setIconImg(){
		var meta = this.getRedEnvelope();
		var avatar = meta.avatar || "";
		if(avatar != ""){
			Util.setIconImg(avatar,this.iconImg,96);
		}
		else {
			this.iconImg.source = "icon_default"
		}
	}

	setNameText(){
		var meta = this.getRedEnvelope();
		var name = meta.from || "英雄";
		this.nameLbl.text = name;
	}

	setTitleText(){
		var text:any;
		var color:any;
		if(this.isGetDiamond()){
			text = "恭喜你抢到红包";
			color = 0xFFF200;
		}
		else {
			text = "手太慢了，红包被抢光了";
			color = 0xFFFFFF;
		}
		this.titleLbl.text = text;
		this.titleLbl.textColor = color;
	}

	setDiamondText(){
		var diamond:any;
		if(this.isGetDiamond()) {
			var id = gm.dataManage.data.id;
			var meta = this.getRedEnvelope();
			diamond = meta.list[id].num;
		}
		else {
			diamond = 0;
		}
		this.getDiamondLbl.text = _.sprintf("%d",diamond);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
