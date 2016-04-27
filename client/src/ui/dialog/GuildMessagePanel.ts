/**
 *
 * @author 
 *
 */
class GuildMessagePanel extends egret.gui.SkinnableContainer {
	public rightBtn:egret.gui.Button;
	public cancelBtn:egret.gui.Button;
	public titleLbl:egret.gui.Label;
	public descLbl:egret.gui.Label;
	public rightFunction:any;
	public cancelFunction:any;
	public titleText:any;
	public descText:any;
	public constructor(title,desc,rightFunction,cancelFunction) {
		super();
		this.titleText = title;
		this.descText = desc;
		this.rightFunction = rightFunction;
		this.cancelFunction = cancelFunction;
		this.skinName = skins.dialog.GuildMessagePanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setTitleText();
		this.setDescText();
	}

	setTitleText(){
		this.titleLbl.text = this.titleText;
	}

	setDescText(){
		this.descLbl.text = this.descText;
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.rightBtn){
			if(this.rightFunction){
				Util.invokeCallback(this.rightFunction,this);
			}
			else {
				gm.guiLayer.removeElement(this);
			}
		}
		if(event.target == this.cancelBtn){
			if(this.cancelFunction) {
				Util.invokeCallback(this.cancelFunction,this);
			}
			else {
				gm.guiLayer.removeElement(this);
			}
		}
	}
}
