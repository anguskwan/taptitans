/**
 *
 * @author 
 *
 */
class GuildGoldPKCompleteLayer extends egret.gui.SkinnableComponent {
	public backBtn: egret.gui.Button;
	public searchOppBtn:egret.gui.Button;
	public pkList:egret.gui.List;
	public nameSelfLbl:egret.gui.Label;
	public nameOppLbl:egret.gui.Label;
	public scoreLbl:egret.gui.BitmapLabel;
	public iconSelfImg:egret.gui.UIAsset;
	public iconOppImg:egret.gui.UIAsset;
	public searchOppLbl:egret.gui.Label;
	public searchOppGroup:egret.gui.Group;
	private _heroItemRenderer:egret.gui.ClassFactory;
	private _heroCompleteItemRenderer:egret.gui.ClassFactory;
	private _dataProvider:egret.gui.ArrayCollection;
	private _dataArr:any;
	public _oppValue:any;

	public constructor(data:any) {
		super();
		this._oppValue = data;
		this.skinName = skins.dialog.PKCompleteLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.setBgImage();
		this.onSetNameAndIcon();
		this.onSetCompleteData(this._oppValue);
	}


	getIsWin(){
		var win = _.count(this._oppValue.alive,"0");
		var lose = _.size(this._oppValue.alive) - win;
		return win > lose;
	}

	onAddMoney(data){
		//gm.dataManage.addItem(data.fragment,"fragment");
	}

	onSetCompleteData(data){
		this.onSetTitle(data);
		this.setPKListData(data);
		this.setPKList();
		//add money
		this.onAddMoney(data);
		this.onCompleteAni();
	}

	onCompleteAni(){
		egret.callLater(function():void{
			var scroller:egret.gui.Scroller = <egret.gui.Scroller>this.pkList.getChildAt(0);
			scroller.throwVertically(33*79+300-550,5000);
		},this);
	}

	onSetTitle(data){
	}

	onSetNameAndIcon(){
		this.setIcon("Self",gm.dataManage.data.avatar || "");
		this.setName("Self",gm.dataManage.data.name || "我");
		this.setIcon("Opp",this._oppValue.oppAvatar || "");
		this.setName("Opp",this._oppValue.oppName || "对手");
	}

	setIcon(type,avatar){
		if(avatar != ""){
			var url = Util.getWechatUrlBySize(avatar,96);
			RES.getResByUrl(url, function(event:any) {
				this["icon" + type + "Img"].source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	setName(type,name){
		if(name != ""){
			this["name" + type + "Lbl"].text = name;
		}
	}

	private _aniWin:number = 0;
	private _aniLose:number = 0;
	setTitleScoreTimeOut(win,lose,index){
		egret.setTimeout(function(cw,cl){
			this._aniWin += cw;
			this._aniLose += cl;
			this.scoreLbl.text = _.sprintf("%d : %d",this._aniWin,this._aniLose);
		}.bind(this),this,3000*(index/33),win,lose)
	}

	setLeftOrRightWin(data,i){
		var index = i + 1;
		var p1 = data.p1;
		var p2 = data.p2;
		if(p1.dps == p2.dps){
			this.setTitleScoreTimeOut(0,0,index);
			return -1;
		}
		if(p1.dps > p2.dps){
			this.setTitleScoreTimeOut(1,0,index);
			return 1;
		}
		this.setTitleScoreTimeOut(0,1,index);
		return 0;
	}

	setPKListData(data){
		this._dataArr = [];
		var item;
		_.each(data.detail,function(v,i){
			item = {
				type:consts.kItemRendererPKHero,
				value:v
			};
			this._dataArr.push(item);
			this.setLeftOrRightWin(v,i);
		}.bind(this));
		item = {
			type:consts.kItemRendererPKHeroComplete,
			isWin:this.getIsWin(),
			exp:data.exp
		};
		this._dataArr.push(item);
	}

	setPKList(){
		this._heroItemRenderer = new egret.gui.ClassFactory(uiskins.PKHeroItemRenderer);
		this._heroCompleteItemRenderer = new egret.gui.ClassFactory(uiskins.GuildGoldPKCompleteItemRenderer);
		var dataProvider:egret.gui.ArrayCollection = this._dataProvider = new egret.gui.ArrayCollection(this._dataArr);
		this.pkList.dataProvider = dataProvider;
		this.pkList.itemRendererFunction = function(item){
			return this.getItemRender(item);
		}.bind(this);
	}

	getItemRender(item):egret.gui.ClassFactory{
		if(item.type == consts.kItemRendererPKHero){
			return this._heroItemRenderer;
		}
		if(item.type == consts.kItemRendererPKHeroComplete){
			return this._heroCompleteItemRenderer;
		}
	}

	setBgImage(){
		var url = Util.getImageUrl("pk_bg");
		RES.getResByUrl(url, function (event) {
			this.bgImg.source = event;
		}, this, RES.ResourceItem.TYPE_IMAGE);
	}

	onTouchLayer(event: egret.TouchEvent) {
		event.stopPropagation();
		if(event.target == this.backBtn) {
			gm.guiLayer.removeElement(this);
			this.onShowGuildGoldLayer();
		}
	}

	onShowGuildGoldLayer(){
		gm.gameUI.showLoadingLayer();
		var id = this._oppValue.goldId;
		tt.BattleManage.zodiacPlayerRankingList(id,0,function(list){
			var data = {
				list:list,
				id:id
			};
			var ly = new GuildGoldLayer(data);
			gm.guiLayer.addElement(ly);
			gm.gameUI.hideLoadingLayer();
		}.bind(this),function(){
			gm.gameUI.hideLoadingLayer();
		}.bind(this));
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void {
		super.partRemoved(partName,instance);
	}
}
