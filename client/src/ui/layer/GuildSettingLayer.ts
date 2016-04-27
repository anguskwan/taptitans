/**
 *
 * @author 
 *
 */
class GuildSettingLayer extends egret.gui.SkinnableComponent {
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public setRect:egret.gui.Rect;
	public selectItem1:uiskins.GuildSettingItemSelect;
	public selectItem2:uiskins.GuildSettingItemSelect;
	public iconImg:uiskins.GuildBadgeItem;
	public attLbl:egret.gui.Label;
	public nameLbl:egret.gui.Label;
	public currLimitAtt:number;
	public needReq:any;
	public index:any;
	private _closeFunction:any;
	public constructor(closeFunction) {
		super();
		this._closeFunction = closeFunction;
		this.needReq = gm.dataManage.guild.setting.needReq;
		this.currLimitAtt = gm.dataManage.guild.setting.bpLimit;
		var icon = gm.dataManage.guild.icon;
		this.index = parseInt(Util.getRelace(icon,/[^0-9]/ig,""));
		this.skinName = skins.dialog.GuildSettingLayerSkin;
	}

	public childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
		this.setCurrLimitAtt();
		this.setIconImg();
		this.setNameText();
		this.initAllElement();
	}

	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		if(event.target == this.closeBtn){
			Util.invokeCallback(this._closeFunction);
			gm.guiLayer.removeElement(this);
		}
		if(event.target == this.setRect){
			var setLy = new GuildSetAttPanel(function(data){
				this.currLimitAtt = data;
				this.setCurrLimitAtt();
			}.bind(this));
			gm.guiLayer.addElement(setLy);
		}
		if(event.target == this.iconImg){
			var ly = new GuildBadgePanel(this.index,function(data){
				this.index = data;
				this.setIconImg();
			}.bind(this));
			gm.guiLayer.addElement(ly);
		}
		if(event.target == this.rightBtn){
			gm.gameUI.showLoadingLayer();
			var gid = gm.dataManage.data.guild;
			var icon = "guild_badge" + this.index;
			var needReq = this.needReq;
			var bpLimit = this.currLimitAtt;
			tt.GuildManage.setting(gid,icon,needReq,bpLimit,function(){
				gm.dataManage.guild.setting.needReq = needReq;
				gm.dataManage.guild.setting.bpLimit = bpLimit;
				gm.dataManage.guild.icon = icon;
				Util.invokeCallback(this._closeFunction);
				gm.guiLayer.removeElement(this);
				gm.gameUI.hideLoadingLayer();
			}.bind(this),function(){
				gm.gameUI.hideLoadingLayer();
			}.bind(this));
		}
		this.selectItemChangeStatus(event.target);
	}

	initAllElement(){
		for(var i:number = 1;i <= 2;i++){
			var data = {
				isSelect: i == 1 ? this.needReq:!this.needReq
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

	setNameText() {
		this.nameLbl.text = gm.dataManage.guild.name || "公会";
	}

	setCurrLimitAtt(){
		this.attLbl.text = Util.formatNumber(this.currLimitAtt);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}