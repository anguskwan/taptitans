/**
 *
 * @author 
 *
 */
class NewPlayerGiftBagPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public buyBtn:egret.gui.Button;
	public bgRect:egret.gui.Rect;
	public btn:any;
	public _cb:any;
	public constructor(btn?:any,cb?:any) {
		super();
		this._cb = cb;
		this.btn = btn;
		this.skinName = skins.dialog.NewPlayerGiftBagPanelSkin;
	}
	public childrenCreated() {
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
		if(target == this.closeBtn){
//			egret.gui.PopUpManager.removePopUp(this);
			gm.guiLayer.removeElement(this);
		}
		if(target == this.buyBtn){
			//add diamond
			gm.gameUI.showLoadingLayer();
			var diamond = 300;
			gm.network.buyDiamond(312,function(data){
				Util.invokeCallback(this._cb);
				gm.dataManage.addMoney(data.added,"diamond");
				gm.dataManage.addShopSkill(2,"goldRain");
				gm.network.sendAction("gainNewPlayerGiftBag", {}, function(){});
				gm.guiLayer.removeElement(this);
				this.btn.visible = false;
				gm.dataManage.getVipLevel(function(){
					gm.postMessage(consts.kMessageGetVipLevel);
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}.bind(this),function(){
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
