module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildBagGetGeneralItemRenderer extends egret.gui.ItemRenderer {
		public redNumLbl:egret.gui.Label;
		public selectImg:egret.gui.UIAsset;
		public iconImg:egret.gui.UIAsset;
		public getedImg:egret.gui.UIAsset;
		public timeLbl:egret.gui.Label;
		public constructor() {
			super();
			this.skinName = skins.components.GuildBagGetGeneralItemRendererSkin;
		}

		isGetedRedEnvelope(){
			var idx = this.itemIndex;
			var id = gm.dataManage.data.id;
			var envelope = gm.dataManage.guild.redEnvelope[idx];
			if (envelope.list[id]) {
				return true;
			}
			return false;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.selectImg){
				var idx = this.itemIndex;
				var id = gm.dataManage.data.id;
				var gid = gm.dataManage.data.guild;
				var envelope = gm.dataManage.guild.redEnvelope[idx];
				if (envelope.list[id]) {
					//红包已领过
					this.showGuildBagGetPanel();
					return ;
				}
				if (_.size(envelope.diamond) < 1) {
					//红包已领完
					this.showGuildBagGetPanel();
					return;
				}
				//
				gm.gameUI.showLoadingLayer();
				tt.GuildManage.getEnvelope(idx,function(){
					tt.GuildManage.envelopeList(gid,function(){
						this.showGuildBagGetPanel();
						Util.invokeCallback(this.data.updateFunction);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this))
			}
		}

		showGuildBagGetPanel(){
			var idx = this.itemIndex;
			var ly = new GuildBagGetPanel(idx);
			gm.guiLayer.addElement(ly);
		}

		dataChanged() {
			super.dataChanged();
			this.setRedNumText();
			this.setIconImg();
			this.setGetedImg();
			this.setTimeText();
		}

		setRedNumText(){
			var meta = gm.dataManage.guild.redEnvelope[this.itemIndex];
			this.redNumLbl.text = _.sprintf("剩余红包：%d",_.size(meta.diamond));
		}

		setIconImg(){
			var meta = gm.dataManage.guild.redEnvelope[this.itemIndex];
			var avatar = meta.avatar || "";
			if(avatar != ""){
				Util.setIconImg(avatar,this.iconImg,96);
			}
			else {
				this.iconImg.source = "icon_default";
			}
		}

		setGetedImg(){
			if(this.isGetedRedEnvelope()){
				this.getedImg.visible = true;
			}
			else {
				this.getedImg.visible = false;
			}
		}

		setTimeText(){
			var idx = this.itemIndex;
			var envelope = gm.dataManage.guild.redEnvelope[idx];
			this.timeLbl.text = moment(envelope.time).format("HH:MM");
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void {
			super.partRemoved(partName,instance);
		}
	}
}
