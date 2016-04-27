/**
 *
 * @author 
 *
 */
class MailLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public mailNumLbl:egret.gui.Label;
	public mailList:egret.gui.List;
	private _mailCollection:egret.gui.ArrayCollection;
	private _mailItemRenderer:egret.gui.ClassFactory;
	private _mailLastItemRenderer:egret.gui.ClassFactory;
	private _mailData:any;

	skinName = skins.dialog.MailLayerSkin;
	public childrenCreated() {
		this._mailItemRenderer = new egret.gui.ClassFactory(uiskins.MailItemRenderer);
		this._mailLastItemRenderer = new egret.gui.ClassFactory(uiskins.MailLastItemRenderer);
		this._mailData = [];
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setMailNumText();
		gm.gameUI.showLoadingLayer();
		gm.network.getMails(function(data) {
			gm.dataManage.mails = data;
			this.onMailList();
			gm.postMessage(consts.kMessageIsUnReadMail);
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
	}

	setMailNumText(){
		this.mailNumLbl.text = _.sprintf("%d/20",_.size(gm.dataManage.mails));
	}

	onMailList(){
		var data:any;
		_.each(gm.dataManage.mails,function(v){
			data = {
				type:consts.kItemRendererMail,
				value:v,
				delFunction:function(index){
					gm.dataManage.mails.splice(index,1);
					this._mailCollection.removeItemAt(index);
					this.setMailNumText();
				}.bind(this)
			};
			this._mailData.push(data);
		}.bind(this));
		if(!_.isEmpty(gm.dataManage.mails)){
			data = {
				type:consts.kItemRendererMailLast
			};
			this._mailData.push(data);
		}
		var collection:egret.gui.ArrayCollection = this._mailCollection = new egret.gui.ArrayCollection(this._mailData);
		this.mailList.dataProvider = collection;
		this.mailList.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(item):egret.gui.ClassFactory {
		if(item.type == consts.kItemRendererMail){
			return this._mailItemRenderer;
		}
		if(item.type == consts.kItemRendererMailLast){
			return this._mailLastItemRenderer;
		}
	}
}
