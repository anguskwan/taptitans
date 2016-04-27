/**
 *
 * @author 
 *
 */
class LoadingResLayer extends egret.gui.SkinnableComponent {
	public _res:any;
	public _cb:any;
	public constructor(res,cb) {
		super();
		this._res = res;
		this._cb = cb;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage() {
		gm.gameUI.showLoadingLayer();
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.loadGroup(this._res);
	}

	private onResourceLoadComplete(event) {
		if (event.groupName != this._res) {return;}
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		gm.gameUI.hideLoadingLayer();
		gm.guiLayer.removeElement(this);
		Util.invokeCallback(this._cb);
	}
}