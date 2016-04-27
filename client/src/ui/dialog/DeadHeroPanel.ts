/**
 *
 * @author 
 *
 */
class DeadHeroPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public revivalBtn:egret.gui.Button;
	public heroLbl:egret.gui.Label;
	public dpsLbl:egret.gui.Label;
	public timeLbl:egret.gui.Label;
	public diamondLbl:egret.gui.Label;
	public iconImg:egret.gui.UIAsset;
	public _timer:egret.Timer;
	private _value:any;
	public constructor(data) {
		super();
		this._value = data;
		this.skinName = skins.dialog.DeadHeroPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.onInitUI();
		this._timer = new egret.Timer(1000);
		this._timer.addEventListener(egret.TimerEvent.TIMER,this.onChangeTime,this);
		this._timer.start();
		this.onChangeTime();
	}

	public getHeroRevivalTime(id){
		var currTime = new Date().getTime();
		var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
		return Util.formatTime(Math.floor((revivalTime - currTime)/1000),true);
	}

	public getHeroRevivalCostDiamond(id){
		return gm.dataManage.heroes.getRevivalCost(id) + "";
	}

	onChangeTime(){
		this.timeLbl.text = this.getHeroRevivalTime(this._value.heroId);
		this.diamondLbl.text = this.getHeroRevivalCostDiamond(this._value.heroId);
	}

	onInitUI(){
		var meta = Conf.hero[this._value.heroId];
		this.heroLbl.text = meta.name;
		this.iconImg.source = "hero" + this._value.heroId;
	}

	onTouchLayer(event:egret.TouchEvent){
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			this._timer.stop();
			gm.guiLayer.removeElement(this);
		}
		if(target == this.revivalBtn){
			gm.dataManage.heroes.revivalHero(this._value.heroId,function(){
				this._timer.stop();
				gm.guiLayer.removeElement(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
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
