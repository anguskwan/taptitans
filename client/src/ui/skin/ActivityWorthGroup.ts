module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
	export class ActivityWorthGroup extends egret.gui.SkinnableComponent {
		public timeLbl:egret.gui.Label;
		public diamondLbl:egret.gui.Label;
		public bgImg:egret.gui.UIAsset;
		public btnReset:egret.gui.Button;
		public item1:egret.gui.Group;
		public item2:egret.gui.Group;
		public item3:egret.gui.Group;
		public item4:egret.gui.Group;
		public itemViews:any;
		private startTime:any;
		private endTime:any;
		public constructor() {
			super();
			this.skinName = skins.components.ActivityWorthBagGroupSkin;
		}

		public childrenCreated() {

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.loadData();
			this.refreshList();
			this.startTimeTick();
		}


		loadData(){
			// init market
			var newMarket = JSON.parse(localStorage.getItem("newMarket"));
			if(null == newMarket){
				this.addNewMarket();
			}
			else {
				gm.dataManage.newMarket = newMarket;
			}
		}

		addNewMarket(){
			var data;
			var marketCfg = {};
			for(var i = 1; i < 5; i++){
				//todo
				marketCfg[i] = Conf.market[i + 12];				
			}

			data = {
				createTime:moment().valueOf(),
				market:_.sample(marketCfg,4),
				times:{}
			};

			gm.dataManage.newMarket = data;
			localStorage.setItem("newMarket",JSON.stringify(data))
		}

		onUpdateList(){
			console.log("onUpdateList");
		}

		refreshList(){
			console.log("refreshList");
			//clear 
			for(var i = 1; i < 5; i++){
				this["item" + i].removeAllElements();				
			}

			//add
			var index = 1;
			this.itemViews = [];
			var data:any;
			var market = gm.dataManage.newMarket.market;
			
			_.each(market, function(value: any){
				console.log("value:  " + JSON.stringify(value["id"]));
        		//console.log("value.id" + value.id);
        		var data = {id:value.id};
        		var itemView = new uiskins.ActivityWorthBoxItem(data);
        		this["item" + index].addElement(itemView);
        		this.itemViews[index] = itemView;				
				index = index + 1;
			}.bind(this));
		}

		setTimeText(){
			var time = this.getSetOffTime();
			this.timeLbl.text = Util.formatTime(Math.floor(time/1000),true);
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

		startTimeTick(){
            //倒计时，
            var activityInfo = ActivityUtil.getActivityInfo(ActivityType.BLACK_MARKET);
            var curTime = gm.timeManage.getCurrentTime();
            var endTime = activityInfo.endTime;

            this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime ) / 1000), true));

            var intervalEntry = egret.setInterval(function () {
                var curTime = gm.timeManage.getCurrentTime();
                this.updateClockCountDown(Util.formatTime(Math.floor((endTime - curTime ) / 1000), true));
            }, this, 1000);

            egret.setTimeout(()=>{
                this.updateClockCountDown("活动已结束");
                egret.clearInterval(intervalEntry);
            }, this, endTime - curTime);
		}

        updateClockCountDown(timeStr:string){
            this.timeLbl.text = timeStr;
        }

		onTouchLayer(event:egret.TouchEvent){
			console.log("onTouchLayer");
			if(event.target == this.btnReset){
				console.log("btnReset");
				gm.gameUI.showLoadingLayer();
				gm.dataManage.refreshMarket_activity(function(){
					localStorage.removeItem("newMarket");
					this.refreshList();
					this.setDiamondText();
					gm.gameUI.hideLoadingLayer();
				}.bind(this),function(){
					gm.gameUI.hideLoadingLayer();
				}.bind(this));
			}
		}		
		setDiamondText(){
			this.diamondLbl.text = "x50";
		}

	}
}
