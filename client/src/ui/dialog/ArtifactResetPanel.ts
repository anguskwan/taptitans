/**
 *
 * @author 
 *
 */
class ArtifactResetPanel extends egret.gui.SkinnableContainer {
	public nameLbl:egret.gui.Label;
	public iconImg:egret.gui.UIAsset;
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public diamondLbl:egret.gui.Label;
	public relicLbl:egret.gui.Label;
	public lvLbl:egret.gui.Label;
	public maxLvLbl:egret.gui.Label;
	public currExpLbl1:egret.gui.Label;
	public currExpLbl2:egret.gui.Label;
	public nextExpLbl1:egret.gui.Label;
	public nextExpLbl2:egret.gui.Label;
	public bgRect:egret.gui.Rect;
	public value:any;
	public constructor(data:any) {
        super();
		this.value = data;
		this.skinName = skins.dialog.ArtifactResetPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.addBgRectColorAndCenter();
		this.initUI();
	}

	public initUI(){
		var id = this.value.id;
		var meta = Conf.artifacts[id];
		var artifact = _.find(gm.dataManage.data.artifacts, function(v) {return v["id"] == id});
		var value = gm.dataManage.artifact.getArtifactValue(id);
		var nextLevel = artifact["level"] + 1;
		var maxLevel = meta["maxLevel"] != -1 ? (nextLevel > meta["maxLevel"] ? meta["maxLevel"]:nextLevel):nextLevel;
		var nextValue = gm.dataManage.artifact.getArtifactValue(id,maxLevel);
		this.iconImg.source = "artifact" + id;
		this.nameLbl.text = meta["name"];
		this.lvLbl.text = artifact["level"] + "";
		if(meta["maxLevel"] != -1){
			this.maxLvLbl.text = _.sprintf("（最高等级%d）",meta["maxLevel"]);
		}
		else {
			this.maxLvLbl.text = "";
		}
		this.currExpLbl1.text = _.sprintf(meta["desc"],value["effect"]*100);
		this.currExpLbl2.text = _.sprintf("+%d%%总攻击力",value["damage"]*100);
		if(meta["maxLevel"] != -1 && artifact["level"] + 1 > meta["maxLevel"]){
			this.nextExpLbl1.text = "最高等级";
			this.nextExpLbl2.text = "最高等级";
		}
		else {
			this.nextExpLbl1.text = _.sprintf(meta["desc"],nextValue["effect"]*100);
			this.nextExpLbl2.text = _.sprintf("+%d%%总攻击力",nextValue["damage"]*100);
		}
		this.diamondLbl.text = gm.dataManage.artifact.getResetCost(id) + "";
		this.relicLbl.text = _.sprintf("打破神器以获得%d个",gm.dataManage.artifact.getResetRelic(id));
	}

	public addBgRectColorAndCenter(){
		var width = gm.guiLayer.width;
		var height = gm.guiLayer.height;
		this.bgRect = new egret.gui.Rect();
		this.bgRect.width = width;
		this.bgRect.height = height;
		this.bgRect.fillColor = 0x000000;
		this.bgRect.fillAlpha = 0.5;
		this.skin.addElementAt(this.bgRect,0);
		this.width = width;
		this.height = height;
	}


	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(target == this.rightBtn){
			gm.guiLayer.removeElement(this);
			var ly = new MessagePanel("打破神器"
				,"返还你的圣物，你可以重新抽取新的神器?"
				,function(target){
					gm.dataManage.artifact.resetArtifact(this.value.index,function(){
						gm.postMessage(consts.kMessageDelArtifact,this.value.itemIndex);
						gm.guiLayer.removeElement(target);
					}.bind(this));
				}.bind(this));
			gm.guiLayer.addElement(ly);
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
