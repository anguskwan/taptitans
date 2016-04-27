module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankBestGroup extends egret.gui.SkinnableComponent {
		public refreshGroup:egret.gui.Group;
		public nextGroup:egret.gui.Group;
		public preGroup:egret.gui.Group;
		public nextBtn:egret.gui.Button;
		public preBtn:egret.gui.Button;

		public bestList:egret.gui.List;
		public bestData:any;
		public bestCollection:egret.gui.ArrayCollection;
		private _rankBestItemList:egret.gui.ClassFactory;

		public pageIndex:any;

		public constructor() {
			super();
			this.pageIndex = 0;
			this.skinName = skins.components.RankBestGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._rankBestItemList = new egret.gui.ClassFactory(uiskins.RankBestItemList);
			this.bestData = [];
			this.initBestList();
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

		initBestList(){
			gm.gameUI.showLoadingLayer();
			gm.network.getGlobalBPList(0,function(obj){
				_.each(obj,function(v,i){
					this.bestData.push(v);
				}.bind(this));
				this.updatePageBtn(obj);
				var collection:egret.gui.ArrayCollection = this.bestCollection = new egret.gui.ArrayCollection(this.bestData);
				this.bestList.dataProvider = collection;
				this.bestList.itemRendererFunction = function(item){
					return this.getItemRender(item);
				}.bind(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		getItemRender(event){
			return this._rankBestItemList;
		}

		prePageList(){
			gm.gameUI.showLoadingLayer();
			this.pageIndex--;
			gm.network.getGlobalBPList(this.pageIndex*10,function(obj){
				this.bestData = [];
				_.each(obj,function(v){
					this.bestData.push(v);
				}.bind(this));
				this.bestCollection.replaceAll(this.bestData);
				this.updatePageBtn(obj);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}

		nextPageList(){
			gm.gameUI.showLoadingLayer();
			this.pageIndex++;
			gm.network.getGlobalBPList(this.pageIndex*10,function(obj){
				this.bestData = [];
				_.each(obj,function(v){
					this.bestData.push(v);
				}.bind(this));
				this.bestCollection.replaceAll(this.bestData);
				this.updatePageBtn(obj);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this))
		}
	}
}