module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class GuildCreateGroup extends egret.gui.SkinnableComponent {
		public createBtn:egret.gui.Button;
		public textInput:egret.gui.TextInput;
		public diamondLbl:egret.gui.Label;
		public attLbl:egret.gui.Label;
		public iconImg:uiskins.GuildBadgeItem;
		public selectItem1:uiskins.GuildSettingItemSelect;
		public selectItem2:uiskins.GuildSettingItemSelect;
		public setRect:egret.gui.Rect;
		public index:any;
		public finishFunction:any;
		public currLimitAtt:number;
		public needReq:any;
		public constructor(finishFunction) {
            super();
			this.index = 1;
			this.currLimitAtt = 0;
			this.needReq = false;
			this.finishFunction = finishFunction;
			this.skinName = skins.components.GuildCreateGroupSkin;
		}

		public childrenCreated() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
			this.setIconImg();
			this.initAllElement();
		}

		isAddGuild(){
			return gm.dataManage.data.guild != 0;
		}

		onTouchLayer(event:egret.TouchEvent){
			if(event.target == this.createBtn && this.createBtn.enabled){
				console.log("Guild: Touch the create guild btn.");

				if(this.isAddGuild()){
					alert("你已经加入了工会。");
					return;
				}

				if(!this.isRegExpCode(this.textInput.text)) {
					alert("请输入工会名称。");
					return;
				}

				var diamond = gm.dataManage.data.diamond;
				if(diamond < Conf.config.createGuildCost){
					gm.postMessage(consts.kMessageShowToastLayer,"钻石不足");
					return ;
				}
				gm.gameUI.showLoadingLayer();
				var needReq = this.needReq;
				var bpLimit = this.currLimitAtt;
				this.createBtn.enabled = false;
				tt.GuildManage.createGuild(
					this.textInput.text,
					"guild_badge" + this.index,
					needReq,
					bpLimit,
					function(data){
						gm.dataManage.costMoney(Conf.config.createGuildCost,"diamond");
						Util.invokeCallback(this.finishFunction);
						gm.gameUI.hideLoadingLayer();
					}.bind(this),
					function(){
						this.createBtn.enabled = true;
						gm.gameUI.hideLoadingLayer();
					}.bind(this));
			}
			if(event.target == this.iconImg){
				var ly = new GuildBadgePanel(this.index,function(data){
					this.index = data;
					this.setIconImg();
				}.bind(this));
				gm.guiLayer.addElement(ly);
			}
			if(event.target == this.setRect){
				var setLy = new GuildSetAttPanel(function(data){
					this.currLimitAtt = data;
					this.setCurrLimitAtt();
				}.bind(this));
				gm.guiLayer.addElement(setLy);
			}
			this.selectItemChangeStatus(event.target);
		}

		initAllElement(){
			for(var i:number = 1;i <= 2;i++){
				var data = {
					isSelect:(i == 2)
				};
				this["selectItem" + i].dataItem = data;
				this["selectItem" + i].changeDataItem();
			}
		}

		selectItemChangeStatus(target){
			var index:number = -1;
			for(var i:number = 1;i <= 2;i++){
				if(target == this["selectItem" + i]){
					index = i;
					if(index == 1){
						this.needReq = true;
					}
					else {
						this.needReq = false;
					}
				}
			}
			if(index != -1){
				for(var i:number = 1;i <= 2;i++) {
					this["selectItem" + i].dataItem.isSelect = (index == i);
					this["selectItem" + i].changeDataItem();
				}
			}
		}

		setIconImg(){
			var name = gm.dataManage.data.name || "英雄会长";
			var data = {
				iconSource:"guild_badge" + this.index,
				name:name[0]
			};
			this.iconImg.dataItem = data;
			this.iconImg.changeDataItem();
		}

		setCurrLimitAtt(){
			this.attLbl.text = Util.formatNumber(this.currLimitAtt);
		}

		public isRegExpCode(str) {
			var re = new RegExp("^[a-zA-Z0-9\\u4e00-\\u9fa5][a-zA-Z0-9\\u4e00-\\u9fa5]{1,10}$");
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
