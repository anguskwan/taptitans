module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class GuildJoinGroup extends egret.gui.SkinnableComponent {
		public refreshGroup:egret.gui.Group;
		public nextBtn:egret.gui.Button;
		public preBtn:egret.gui.Button;
		public guildList:egret.gui.Group;
		public guildData:any;
		public guildCollection:egret.gui.ArrayCollection;
		private _guildJoinItemRenderer:egret.gui.ClassFactory;
		public pageIndex:any;
		public finishFunction:any;
		public constructor(finishFunction) {
            super();
			this.pageIndex = 0;
			this.finishFunction = finishFunction;
			this.skinName = skins.components.GuildJoinGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._guildJoinItemRenderer = new egret.gui.ClassFactory(uiskins.GuildJoinItemRenderer);
			this.guildData = [];
			this.initJoinList();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.nextBtn){
				this.nextPageList();
			}
			if(event.target == this.preBtn){
				this.prePageList();
			}
		}

		updatePageBtn(data){
			var size = _.size(data);
			if(this.pageIndex == 0){
				if(size == 0 || size < 10){
					this.refreshGroup.visible = false;
				}
				else{
					this.preBtn.visible = false;
					this.nextBtn.visible = true;
				}
			}
			else {
				this.preBtn.visible = true;
				if(size == 0 || size < 10) {
					this.nextBtn.visible = false;
				}
				else {
					this.nextBtn.visible = true;
				}
			}
		}

		initJoinList(){
			gm.gameUI.showLoadingLayer();
			tt.GuildManage.listGuilds(0,function(obj){
				_.each(obj,function(v,i){
					v["finishFunction"] = function(){
						Util.invokeCallback(this.finishFunction);
					}.bind(this);
					this.guildData.push(v);
				}.bind(this));
				this.updatePageBtn(obj);
				var collection:egret.gui.ArrayCollection = this.guildCollection = new egret.gui.ArrayCollection(this.guildData);
				this.guildList.dataProvider = collection;
				this.guildList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		getItemRender(event){
			return this._guildJoinItemRenderer;
		}

		prePageList(){
			gm.gameUI.showLoadingLayer();
			this.pageIndex--;
			tt.GuildManage.listGuilds(this.pageIndex*10,function(obj){
				this.guildData = [];
				_.each(obj,function(v){
					v["finishFunction"] = function(){
						Util.invokeCallback(this.finishFunction);
					}.bind(this);
					this.guildData.push(v);
				}.bind(this));
				this.guildCollection.replaceAll(this.guildData);
				this.updatePageBtn(obj);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		nextPageList(){
			gm.gameUI.showLoadingLayer();
			this.pageIndex++;
			tt.GuildManage.listGuilds(this.pageIndex*10,function(obj){
				this.guildData = [];
				_.each(obj,function(v){
					v["finishFunction"] = function(){
						Util.invokeCallback(this.finishFunction);
					}.bind(this);
					this.guildData.push(v);
				}.bind(this));
				this.guildCollection.replaceAll(this.guildData);
				this.updatePageBtn(obj);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}
	}
}
