/**
 *
 * @author 
 *
 */
class PrestigePanel extends egret.gui.SkinnableContainer{
	public prestigeBtn:egret.gui.Button;
	public prestigeSuperBtn:egret.gui.Button;
	public closeBtn:egret.gui.Button;
	public bonusLbl:egret.gui.Label;
	public stageLbl:egret.gui.Label;
	public heroLbl:egret.gui.Label;
	public allLbl:egret.gui.Label;
	public diamondLbl:egret.gui.Label;
	public bgRect:egret.gui.Rect;

	public constructor() {
		super();
		this.skinName = skins.dialog.PrestigePanelSkin;
	}

	public childrenCreated() {
		var prestige = Math.floor(gm.dataManage.getRelicsByPrestige());
		var stage = gm.dataManage.getRelicsByStage();
		var heroes = gm.dataManage.getRelicsByHeroes();
		if(formula.isAllHeroesAlive(gm.dataManage.data)){
			this.bonusLbl.text = Util.formatNumber(heroes+stage);
		}
		else {
			this.bonusLbl.text = "0";
		}
		this.stageLbl.text = Util.formatNumber(stage);
		this.heroLbl.text = Util.formatNumber(heroes);
		this.allLbl.text = Util.formatNumber(prestige);
		this.diamondLbl.text = gm.dataManage.getPrestigeDiamondCost() + "";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.addBgRectColorAndCenter();
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
		var ly;
		if(target == this.closeBtn){
//			egret.gui.PopUpManager.removePopUp(this);
			gm.guiLayer.removeElement(this);
		}
		if(target == this.prestigeBtn){
			ly = new MessagePanel("你确定蜕变么？"
				,"蜕变将会重置游戏，主角及英雄的个数和等级\n都不保留，金币也会清空。\n\n仅保留：\n钻石、圣物、神器及武器",function(target){
					gm.guiLayer.removeElement(this);
					gm.guiLayer.removeElement(target);
					gm.dataManage.prestige();
				}.bind(this));
			gm.guiLayer.addElement(ly);
		}
		if(target == this.prestigeSuperBtn){
			if (gm.dataManage.data.diamond >= gm.dataManage.getPrestigeDiamondCost()) {
				ly = new MessagePanel("你确定保级蜕变么？", "保级蜕变将不会重置游戏，所有游戏配置都会保留。\n\n保留：关卡、金币、钻石、圣物、神器及武器等。\n获得：圣物。", function (target) {
					gm.guiLayer.removeElement(this);
					gm.guiLayer.removeElement(target);
					gm.dataManage.prestigeByDiamond();
				}.bind(this));
				gm.guiLayer.addElement(ly);
			}
		}
	}
	/**
	 partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
	 必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
	 可以避免写在 childrenCreated 中修改造成的多次测量。


	 The method "partAdded" will be called just after the
	 skin parts is assigned to the property. You can make
	 changes will effect to the layout or other components.
	 */
	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}


}
