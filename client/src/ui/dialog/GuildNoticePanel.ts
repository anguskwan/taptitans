/**
 *
 * @author 
 *
 */
class GuildNoticePanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public textInput:uiskins.GuildTextInput;
	public _text:any;
	public _cb:any;
	public constructor(text,cb) {
		super();
		this._text = text;
		this._cb = cb;
		this.skinName = skins.dialog.GuildNoticePanelSkin;
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
		this.textInput.text = this._text;
	}

	setWriteTextInput(){
		if(this.textInput.text != this._text){
			gm.gameUI.showLoadingLayer();
			var id = gm.dataManage.data.guild;
			var text = this.textInput.text;
			tt.GuildManage.modifyNotice(id,text,function(){
				Util.invokeCallback(this._cb,text);
				gm.guiLayer.removeElement(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		else {
			gm.guiLayer.removeElement(this);
		}
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
