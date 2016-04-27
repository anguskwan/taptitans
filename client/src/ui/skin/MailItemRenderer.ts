module uiskins {
	/**
	 *
	 * @author
	 *
	 */
	export class MailItemRenderer extends egret.gui.ItemRenderer {
		public newTipImg:egret.gui.UIAsset;
		public iconImg:egret.gui.UIAsset;
		public titleLbl:egret.gui.Label;
		public openBtn:uiskins.StateButton;
		public isPlayingAni:any;

		public constructor() {
			super();
			this.isPlayingAni = false;
			this.skinName = skins.components.MailItemRendererSkin;
		}

		isDelMail() {
			if (this.data.value.read == 1) {
				if(_.isEmpty(this.data.value.attachments)) {
					return true;
				}
				else {
					if(this.data.value.getGoods == 1){
						return true;
					}
					else {
						return false;
					}
				}

			}
			else {
				return false;
			}
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
		}

		onTouchBtnClick(event:egret.TouchEvent){
			if(event.target == this.openBtn) {
				if (this.isDelMail()) {
					var id = this.data.value.id;
					var read = this.data.value.read;
					var getGoods = this.data.value.getGoods;
					gm.gameUI.showLoadingLayer();
					gm.network.delMail(id,getGoods,read,function(){
						Util.invokeCallback(this.data.delFunction,this.itemIndex);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this))
				}
				else {
					this.showMailMessagePanel();
				}
			}
			else {
				this.showMailMessagePanel();
			}
		}

		showMailMessagePanel(){
			if(this.data.value.read == 0){
				gm.gameUI.showLoadingLayer();
				gm.network.readMail(this.itemIndex,function(){
					gm.dataManage.mails[this.itemIndex].read = 1;
					this.data.value.read = 1;
					this.setNewTipImg();
					gm.postMessage(consts.kMessageIsUnReadMail);
					this.showMailMessage();
					this.setBtnStatus();
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
			else{
				this.showMailMessage();
			}
		}

		showMailMessage(){
			var dialog = new MailMessagePanel(
				{value:this.data.value,index:this.itemIndex}
				,function(){
					gm.dataManage.mails[this.itemIndex].getGoods = 1;
					this.data.value.getGoods = 1;
					this.setBtnStatus();
				}.bind(this));
			gm.guiLayer.addElement(dialog);
		}

		dataChanged() {
			super.dataChanged();
			this.setNewTipImg();
			this.setIconImg();
			this.setTitleText();
			this.setBtnStatus();
		}

		setNewTipImg(){
			if(this.data.value.read == 0){
				this.newTipImg.visible = true;
				if(!this.isPlayingAni){
					this.playNewTipAni();
					this.isPlayingAni = true;
				}
			}
			else {
				this.newTipImg.visible = false;
				this.stopNewTipAni();
				this.isPlayingAni = false;
			}
		}

		playNewTipAni(){
			this.newTipImg.scaleX = 0.8;
			this.newTipImg.scaleY = 0.8;
			var tw = egret.Tween.get(this.newTipImg,{loop:true});
			tw.to({scaleX:0.9,scaleY:0.9},300).to({scaleX:0.8,scaleY:0.8},200);
		}

		stopNewTipAni(){
			egret.Tween.removeTweens(this.newTipImg);
		}

		setIconImg(){
			var source;
			if(_.isEmpty(this.data.value.attachments)){
				source = "icon_mail_default";
			}
			else {
				var elementTypeSource = gm.gameUI.getElementTypeSource(this.data.value.attachments[0].type);
				source = elementTypeSource.icon;
			}
			this.iconImg.source = source;
		}

		setTitleText(){
			this.titleLbl.text = this.data.value.title;
		}

		setBtnStatus(){
			this.openBtn.textLabel.size = 18;
			if(this.isDelMail()){
				this.openBtn.textLabel.text = "删除";
				this.openBtn.setBtnSkinName("dialog_btn_red");
			}
			else {
				this.openBtn.textLabel.text = "查看";
				this.openBtn.setBtnSkinName("dialog_btn_blue");
			}

		}
	}
}
