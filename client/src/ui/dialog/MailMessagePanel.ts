/**
 *
 * @author 
 *
 */
class MailMessagePanel extends egret.gui.SkinnableContainer {
	public titleLbl:egret.gui.Label;
	public contentLbl:egret.gui.Label;
	public nameLbl:egret.gui.Label;
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public btnTextLbl:egret.gui.Label;
	public rightGroup:egret.gui.Group;
	public rewardGroup:egret.gui.Group;
	private _value:any;
	private _getRewardFunction:any;
	public constructor(data,cb) {
		super();
		this._value = data;
		this._getRewardFunction = cb;
		this.skinName = skins.dialog.MailMessagePanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setNameText();
		this.setReward();
		this.setGetRewardBtn();
		this.setContentText();
		this.setTitleText();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.rightBtn){
			if(this._value.value.getGoods == 0){
				gm.gameUI.showLoadingLayer();
				gm.network.getMailAttachments(this._value.index,function(){
					this._value.value.getGoods = 1;
					_.each(this._value.value.attachments,function(v){
						gm.dataManage.addItem(v.num,v.type);
					}.bind(this));
					this.setGetRewardBtn();
					Util.invokeCallback(this._getRewardFunction);
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	setTitleText(){
		this.titleLbl.text = this._value.value.title;
	}

	setContentText(){
		this.contentLbl.text = this._value.value.message;
	}

	setGetRewardBtn(){
		if(this._value.value.getGoods == 0){
			if(_.isEmpty(this._value.value.attachments)){
				this.rightGroup.visible = false;
			}
			else {
				this.rightGroup.visible = true;
			}
		}
		else {
			this.rightGroup.visible = false;
		}
	}

	onAddRewardItem(v){
		var item = new uiskins.MailRewardElement(v);
		this.rewardGroup.addElement(item);
	}

	setReward(){
		_.each(this._value.value.attachments,function(v){
			this.onAddRewardItem(v);
		}.bind(this));
	}

	setNameText(){
		this.nameLbl.text = this._value.value.from || "疯狂管理员";
	}
}
