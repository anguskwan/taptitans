/**
 *
 * @author 
 *
 */
class MatchPrestigePanel extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public prestigeBtn:egret.gui.Button;
	public bonusLbl:egret.gui.Label;
	public stageLbl:egret.gui.Label;
	public heroLbl:egret.gui.Label;
	public allLbl:egret.gui.Label;
	public diamondLbl:egret.gui.Label;
	public bgRect:egret.gui.Rect;
	private isHard:any;
	public constructor(isHard) {
		super();
		this.isHard = isHard;
		this.skinName = skins.dialog.MatchPrestigePanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.initPrestige();
	}

	initPrestige(){
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
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(target == this.prestigeBtn){
			var ly = new MessagePanel("你确定蜕变么？"
				,"蜕变将会重置游戏，主角及英雄的个数和等级\n都不保留，金币也会清空。\n\n仅保留：\n钻石、圣物、神器及武器",function(target){
					gm.guiLayer.removeElement(this);
					gm.guiLayer.removeElement(target);
					if(this.isHard){
						gm.dataManage.joinHardContest(function(){
							gm.postMessage(consts.kMessageMatchBtnStatus);
						}.bind(this));
					}
					else{
						gm.dataManage.joinContest(function(){
							gm.postMessage(consts.kMessageMatchBtnStatus);
						}.bind(this));
					}
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
