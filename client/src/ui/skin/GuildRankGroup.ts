module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildRankGroup extends egret.gui.SkinnableComponent {
		public refreshGroup:egret.gui.Group;
		public nextGroup:egret.gui.Group;
		public preGroup:egret.gui.Group;
		public nextBtn:egret.gui.Button;
		public preBtn:egret.gui.Button;
		public rankList:egret.gui.List;
		public rankData:any;
		public rankCollection:egret.gui.ArrayCollection;
		private _guildRankItemRenderer:egret.gui.ClassFactory;
		public pageIndex:any;
		public constructor() {
			super();
			this.pageIndex = 0;
			this.skinName = skins.components.GuildRankGroupSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._guildRankItemRenderer = new egret.gui.ClassFactory(uiskins.GuildRankItemRenderer);
			this.rankData = [];
			this.initRankList();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.nextBtn){
				this.nextPageList();
			}
			if(event.target == this.preBtn){
				this.prePageList();
			}
		}

		initRankList(){
			gm.gameUI.showLoadingLayer();
			tt.GuildManage.listGuilds(0,function(obj){
				_.each(obj,function(v,i){
					this.rankData.push(v);
				}.bind(this));
				this.updatePageBtn(obj);
				var collection:egret.gui.ArrayCollection = this.rankCollection = new egret.gui.ArrayCollection(this.rankData);
				this.rankList.dataProvider = collection;
				this.rankList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		getItemRender(event){
			return this._guildRankItemRenderer;
		}

		updatePageBtn(data){
			var size = _.size(data);
			if(this.pageIndex == 0){
				if(size == 0 || size < 10){
					this.refreshGroup.visible = false;
				}
				else{
					this.preGroup.visible = false;
					this.nextGroup.visible = true;
				}
			}
			else {
				this.preGroup.visible = true;
				if(size == 0 || size < 10) {
					this.nextGroup.visible = false;
				}
				else {
					this.nextGroup.visible = true;
				}
			}
		}

		prePageList(){
			gm.gameUI.showLoadingLayer();
			this.pageIndex--;
			tt.GuildManage.listGuilds(this.pageIndex*10,function(obj){
				this.rankData = [];
				_.each(obj,function(v){
					this.rankData.push(v);
				}.bind(this));
				this.rankCollection.replaceAll(this.rankData);
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
				this.rankData = [];
				_.each(obj,function(v){
					this.rankData.push(v);
				}.bind(this));
				this.rankCollection.replaceAll(this.rankData);
				this.updatePageBtn(obj);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}