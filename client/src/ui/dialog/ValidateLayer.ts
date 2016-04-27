/**
 *
 * @author 
 *
 */
class ValidateLayer extends egret.gui.SkinnableComponent {
	public selectGroup:egret.gui.Group;
	public selectBtn:egret.gui.Button;
	public handImg:egret.gui.UIAsset;
	public isTouchEnabled:any;
	public constructor() {
		super();
		this.isTouchEnabled = false;
		this.skinName = skins.dialog.ValidateLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchDialog,this);
		egret.setTimeout(this.initTouchBtn,this,2000);
	}

	onTouchDialog(event:egret.TouchEvent){
		event.stopPropagation();
		if(this.isTouchEnabled){
			if(event.target == this.selectBtn){
				this.hideHandImgAni();
				gm.guiLayer.removeElement(this);
				gm.gameUI.showValidateLayer();
			}
			else {
				egret.Ticker.getInstance().pause();
			}
		}
	}

	initTouchBtn(){
		this.selectGroup.visible = true;
		var x = Util.randomInt(0,480 - 110);
		var y = Util.randomInt(0,756 - 120);
		this.selectGroup.x = x;
		this.selectGroup.y = y;
		this.showHandImgAni();
		this.isTouchEnabled = true;
	}

	showHandImgAni(){
		var tw = egret.Tween.get(this.handImg,{loop:true});
		tw.to({y:71},300).to({y:61},200);
	}

	hideHandImgAni(){
		egret.Tween.removeTweens(this.handImg);
	}
}
