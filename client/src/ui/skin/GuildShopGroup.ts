module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class GuildShopGroup extends egret.gui.SkinnableComponent {
		public coinLbl:egret.gui.Label;
		public shopList:egret.gui.List;
		public shopData:any;
		public shopCollection:egret.gui.ArrayCollection;
		private _guildShopItemRenderer:egret.gui.ClassFactory;
		public constructor() {
			super();
			this.skinName = skins.components.GuildShopGroupSkin;
		}

		public childrenCreated() {
			super.childrenCreated();
			//gm.registerMessage(consts.kMessageMoneyUpdate, this.onMoneyUpdate, this);
			this._guildShopItemRenderer = new egret.gui.ClassFactory(uiskins.GuildShopItemRenderer);
			this.shopData = [];
			this.initShopList();
			this.onMoneyUpdate();
		}

		onMoneyUpdate(){
			this.coinLbl.text = gm.dataManage.data.crystal + "";
		}

		initShopList(){
			var data:any;
			for(var i = 1;i <= 5;i++){
				data = {
					id:i,
					base:{
						touchBtnDisabledTimeoutIndex:-1,
						touchBtnDisabledTimeout:0,
						touchBtnDisabled:true
					},
					updateFunction:function(){
						this.onMoneyUpdate();
					}.bind(this)
				};
				this.shopData.push(data);
			}
			var collection:egret.gui.ArrayCollection = this.shopCollection = new egret.gui.ArrayCollection(this.shopData);
			this.shopList.dataProvider = collection;
			this.shopList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
		}

		getItemRender(event){
			return this._guildShopItemRenderer;
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}