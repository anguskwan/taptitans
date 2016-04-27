module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityBlackGroup extends egret.gui.SkinnableComponent {
		public titleLbl:egret.gui.Label;
		public timeLbl:egret.gui.Label;
		public diamondLbl:egret.gui.Label;
		public bgImg:egret.gui.UIAsset;
		public resetBtn:egret.gui.Button;

		public blackList:egret.gui.List;
		public blackData:any;
		public blackCollection:egret.gui.ArrayCollection;
		private _activityBlackBoxItemRenderer:egret.gui.ClassFactory;

		private startTime:any;
		private endTime:any;
		public constructor() {
			super();
			this.startTime = "2016-01-11 00:00:00";
			this.endTime = "2016-01-13 23:59:00";
			this.skinName = skins.components.ActivityBlackGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this._activityBlackBoxItemRenderer = new egret.gui.ClassFactory(uiskins.ActivityBlackBoxItemRenderer);
			this.blackData = [];
			this.onAddList();
			this.loadNewList();
			this.setTitleText();
			this.setDiamondText();
			this.setBgImg();
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.resetBtn){
				gm.gameUI.showLoadingLayer();
				gm.dataManage.refreshMarket(function(){
					localStorage.removeItem("newMarket");
					this.loadNewList();
					this.setDiamondText();
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}

		onUpdateList(){
			var data:any;
			var market = gm.dataManage.newMarket.market;
			this.blackData = [];
			_.each(market,function(v){
				data = {
					id:parseInt(v.id),
					updateFunction:function(){
						this.updateList();
						this.setDiamondText();
					}.bind(this),
					base:{
						touchBtnDisabledTimeoutIndex:-1,
						touchBtnDisabledTimeout:0,
						touchBtnDisabled:true
					}
				};
				this.blackData.push(data);
			}.bind(this));
			this.blackCollection.replaceAll(this.blackData);
		}

		onAddList(){
			var collection:egret.gui.ArrayCollection = this.blackCollection = new egret.gui.ArrayCollection(this.blackData);
			this.blackList.dataProvider = collection;
			this.blackList.itemRendererFunction = function(item){
				return this.getItemRender(item);
			}.bind(this);
		}

		updateList(){
			_.each(this.blackCollection.source,function(v){
				this.blackCollection.itemUpdated(v)
			}.bind(this));
		}

		loadNewList(){
			var newMarket = JSON.parse(localStorage.getItem("newMarket"));
			var data;
			if(null == newMarket){
				this.addNewMarket();
			}
			else {
				var currTime = moment().valueOf();
				var createTime = newMarket.createTime;
				var setoffTime = 3*60*60*1000;
				if((currTime - createTime) > setoffTime){
					this.addNewMarket();
				}
				else {
					gm.dataManage.newMarket = newMarket;
				}
			}
			this.onUpdateList();
			this.setTimeStatus();
		}

		addNewMarket(){
			var data;
			data = {
				createTime:moment().valueOf(),
				market:_.sample(Conf.market,4),
				times:{}
			};
			gm.dataManage.newMarket = data;
			localStorage.setItem("newMarket",JSON.stringify(data))
		}

		getItemRender(event){
			return this._activityBlackBoxItemRenderer;
		}

		private intervalIdx = -1;
		private timeOutIdx = -1;
		setTimeStatus(){
			var time = this.getSetOffTime();
			if(this.timeOutIdx != -1){
				egret.clearInterval(this.intervalIdx);
			}
			if(this.timeOutIdx != -1){
				egret.clearTimeout(this.timeOutIdx);
			}
			this.intervalIdx = egret.setInterval(this.setTimeText.bind(this),this,1000);
			this.timeOutIdx = egret.setTimeout(function(){
				egret.clearInterval(this.intervalIdx);
				localStorage.removeItem("newMarket");
				this.loadNewList();
			}.bind(this),this,time);
			this.setTimeText();
		}

		getSetOffTime(){
			var currTime = moment().valueOf();
			for(var i = 0;i < 9;i++){
				var baseTime = moment();
				baseTime.set('hour',i*3);
				baseTime.set('minute',0);
				baseTime.set('second',0);
				baseTime.set('millisecond',0);
				if(currTime <= baseTime.valueOf()){
					return (baseTime.valueOf() - currTime);
				}
			}
		}

		setTimeText(){
			var time = this.getSetOffTime();
			this.timeLbl.text = Util.formatTime(Math.floor(time/1000),true);
		}

		setTitleText(){
			//var startText = moment(this.startTime).format("MM月DD日 HH:mm:ss");
			//var endText = moment(this.endTime).format("MM月DD日 HH:mm:ss");
			//var text = _.sprintf("活动时间：<font color='#ffc61a'>%s-%s</font>",startText,endText);
			//Util.setStyleText(this.titleLbl,text);
		}

		setDiamondText(){
			this.diamondLbl.text = "" + gm.dataManage.data.diamond;
		}

		setBgImg(){
			var url = Util.getImageUrl("activity_bg_black");
			RES.getResByUrl(url, function (event) {
				this.bgImg.source = event;
			}, this, RES.ResourceItem.TYPE_IMAGE);
		}

		public partAdded(partName: string,instance: any): void {
			super.partAdded(partName,instance);
		}

		public partRemoved(partName: string,instance: any): void{
			super.partRemoved(partName,instance);
		}
	}
}
