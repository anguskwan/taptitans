module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class GuildSearchGroup extends egret.gui.SkinnableComponent {
		public searchBtn:egret.gui.Button;
		public textInput:egret.gui.TextInput;
		public guildList:egret.gui.List;
		public guildData:any;
		public guildCollection:egret.gui.ArrayCollection;
		private _guildSearchItemRenderer:egret.gui.ClassFactory;
		public finishFunction:any;
		public constructor(finishFunction) {
            super();
			this.finishFunction = finishFunction;
			this.skinName = skins.components.GuildSearchGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
			this._guildSearchItemRenderer = new egret.gui.ClassFactory(uiskins.GuildSearchItemRenderer);
			this.guildData = [];
			this.initSearchList();
		}

		initSearchList(){
			var collection:egret.gui.ArrayCollection = this.guildCollection = new egret.gui.ArrayCollection(this.guildData);
			this.guildList.dataProvider = collection;
			this.guildList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
		}

		getItemRender(event){
			return this._guildSearchItemRenderer;
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.searchBtn){
				var name = this.textInput.text;
				if(name == ""){
					gm.gameUI.showLoadingLayer();
					tt.GuildManage.randomTenGuild(function(data){
						this.guildData = [];
						_.each(data,function(v){
							v["finishFunction"] = function(){
								Util.invokeCallback(this.finishFunction);
							}.bind(this);
							this.guildData.push(v);
						}.bind(this));
						this.updateSearchList();
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));

				}
				else if(this.isRegExpCode(name)) {
					gm.gameUI.showLoadingLayer();
					tt.GuildManage.findGuild(name,function(data){
						this.guildData = [];
						data["finishFunction"] = function(){
							Util.invokeCallback(this.finishFunction);
						}.bind(this);
						this.guildData.push(data);
						this.updateSearchList();
						gm.gameUI.hideLoadingLayer();
					}.bind(this),function(){
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
				}
			}
		}

		updateSearchList(){
			this.guildCollection.replaceAll(this.guildData);
		}

		public isRegExpCode(str) {
			var re = new RegExp("^[a-zA-Z0-9\\u4e00-\\u9fa5][a-zA-Z0-9\\u4e00-\\u9fa5]{0,10}$");
			return (str.search(re) != -1);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}

	}
}
