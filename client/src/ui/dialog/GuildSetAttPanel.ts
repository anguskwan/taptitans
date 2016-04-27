/**
 *
 * @author 
 *
 */
class GuildSetAttPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public textInput:uiskins.GuildTextInput;
	public _text:number;
	public _cb:any;
	public constructor(cb) {
		super();
		this._text = 0;
		this._cb = cb;
		this.skinName = skins.dialog.GuildSetAttPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setTextInput();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.rightBtn){
			this.setWriteTextInput();
		}
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	setTextInput(){
		this.textInput.text = "0";
	}

	setWriteTextInput(){
		var text = this._text + "";
		if(this.textInput.text != text){
			if(this.isRegExpCode(this.textInput.text)){
				Util.invokeCallback(this._cb,parseInt(this.textInput.text));
				gm.guiLayer.removeElement(this);
			}
		}
		else {
			Util.invokeCallback(this._cb,parseInt(this.textInput.text));
			gm.guiLayer.removeElement(this);
		}
	}

	public isRegExpCode(str) {
		var re = new RegExp("[0-9]*[1-9][0-9]*");
		return (str.search(re) != -1);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
