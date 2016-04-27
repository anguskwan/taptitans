module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildMainGroup extends egret.gui.SkinnableComponent {
		public nameLbl:egret.gui.Label;
		public managerLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public memberLbl:egret.gui.Label;
		public editorBtn:egret.gui.Button;
		public contentLbl:egret.gui.Label;
		public iconImg:uiskins.GuildBadgeItem;
		public warList:egret.gui.List;
		public warData:any;
		public warCollection:egret.gui.ArrayCollection;
		private _guildWarItemRenderer:egret.gui.ClassFactory;
		private _guildRedEnevlopeItemRenderer:egret.gui.ClassFactory;
		private _guildGoldItemRenderer:egret.gui.ClassFactory;
		public isAddWarItem:any;
		public isAddRedEnvelopeItem:any;
		public _value:any;
		private _delFunction:any;

		public constructor(delFunction) {
			super();
			this._value = null;
			this._delFunction = delFunction;
			this.isAddWarItem = true;
			this.isAddRedEnvelopeItem = true;
			this.skinName = skins.components.GuildMainGroupSkin;
		}

		getMaxMember(){
			var members = this._value.level - 1;
			return 10 + members;
		}

		isFull(){
			return _.size(this._value.members) >= this.getMaxMember();
		}

		isPresident(){
			return gm.dataManage.data.id == this._value.president;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._guildWarItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainItemRenderer);
			this._guildRedEnevlopeItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainRedEnvelopeItemRenderer);
			this._guildGoldItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMainGoldItemRenderer);
			this.warData = [];
			this.initWarList();
			this.loadingQueryById();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.editorBtn){
				var ly = new GuildNoticePanel(this._value.notice,function(text){
					this._value.notice = text;
					this.setContentText();
				}.bind(this));
				gm.guiLayer.addElement(ly);
			}
		}

		initWarList(){
			var collection:egret.gui.ArrayCollection = this.warCollection = new egret.gui.ArrayCollection(this.warData);
			this.warList.dataProvider = collection;
			this.warList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
		}

		getItemRender(event){
			if(event.type == consts.kItemRendererGuildMainWar){
				return this._guildWarItemRenderer;
			}
			if(event.type == consts.kItemRendererGuildMainRedEnvelope){
				return this._guildRedEnevlopeItemRenderer;
			}
			if(event.type == consts.kItemRendererGuildMainGold){
				return this._guildGoldItemRenderer;
			}
		}

		loadingQueryById(){
			gm.gameUI.showLoadingLayer();
			var id = gm.dataManage.data.guild;
			tt.GuildManage.queryById(id,function(data){
				this._value = data;
				gm.dataManage.guild = data;
				this.updateWarList();
				this.initGuild();
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}

		updateWarList(){
			if(this.isAddWarItem){
				var data;
				data = {
					type:consts.kItemRendererGuildMainWar
				};
				data["delFunction"] = function(){
					Util.invokeCallback(this._delFunction);
				}.bind(this);
				this.warCollection.addItem(data);
				data = {
					type:consts.kItemRendererGuildMainGold
				};
				data["delFunction"] = function(){
					Util.invokeCallback(this._delFunction);
				}.bind(this);
				this.warCollection.addItem(data);
				data = {
					type:consts.kItemRendererGuildMainRedEnvelope
				};
				data["delFunction"] = function(){
					Util.invokeCallback(this._delFunction);
				}.bind(this);
				this.warCollection.addItem(data);
				this.isAddWarItem = false;
			}
			else {
				_.each(this.warCollection.source,function(v){
					this.warCollection.itemUpdated(v);
				}.bind(this))
			}
		}

		initGuild(){
			this.setNameText();
			this.setManagerText();
			this.setAttText();
			this.setMemberText();
			this.setEditorBtn();
			this.setContentText();
			this.setIconImg();
			this.setWarList();
		}

		updateMain(){
			this.loadingQueryById();
		}

		setNameText() {
			this.nameLbl.text = this._value.name;
		}

		setManagerText(){
			var presidentName = this._value.presidentName || "英雄会长";
			this.managerLbl.text = "会长：" + presidentName;
		}

		setAttText(){
			var battlePoint = this._value.battlePoint;
			if (isNaN(parseInt(battlePoint))) {
				battlePoint = parseInt(battlePoint);
			}
			this.attLbl.text =  Util.formatNumber(battlePoint);
		}

		setMemberText(){
			this.memberLbl.text = _.sprintf("%d/%d",_.size(this._value.members),this.getMaxMember());
			if(this.isFull()){
				this.memberLbl.textColor = 0xF34627;
			}
			else {
				this.memberLbl.textColor = 0x25ff3a;
			}
		}

		setEditorBtn(){
			if(this.isPresident()){
				this.editorBtn.visible = true;
			}
			else {
				this.editorBtn.visible = false;
			}
		}

		setContentText(){
			this.contentLbl.text = this._value.notice;
		}

		setIconImg(){
			var name = this._value.presidentName || "英雄会长";
			var data = {
				iconSource:this._value.icon,
				name:name[0]
			};
			this.iconImg.dataItem = data;
			this.iconImg.changeDataItem();
		}

		setWarList(){

		}
	}
}

