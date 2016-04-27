/**
 *
 * @author 
 *
 */
class LoadingLayer extends egret.gui.SkinnableComponent {
    private _interval : number;
	public loadingImg:egret.gui.UIAsset;
	public constructor() {
		super();
		this.skinName = skins.dialog.LoadingLayerSkin;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

    private onRemoveFromStage() {
        clearInterval(this._interval);
    }

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.loadingImg.anchorX = 0.5;
		this.loadingImg.anchorY = 0.5;

        this._interval = setInterval(() => {
            this.loadingImg.rotation += 36;
        }, 30);
//		egret.Tween.get(this.loadingImg,{ loop:true}).to({rotation:360},300);
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
