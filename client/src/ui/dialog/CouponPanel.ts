/**
 *
 * @author 
 *
 */
class CouponPanel extends egret.gui.SkinnableContainer {
	public closeBtn:egret.gui.Button;
	public rightBtn:egret.gui.Button;
	public textInput:egret.gui.TextInput;
	public bgRect:egret.gui.Rect;
	public wrongLbl:egret.gui.Label;
	public constructor() {
		super();
		this.skinName = skins.dialog.CouponPanelSkin;
	}

	public childrenCreated() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
		this.addBgRectColorAndCenter();
	}

	public addBgRectColorAndCenter(){
		var width = gm.guiLayer.width;
		var height = gm.guiLayer.height;
		this.bgRect = new egret.gui.Rect();
		this.bgRect.width = width;
		this.bgRect.height = height;
		this.bgRect.fillColor = 0x000000;
		this.bgRect.fillAlpha = 0.5;
		this.skin.addElementAt(this.bgRect,0);
		this.width = width;
		this.height = height;
	}


	onTouchLayer(event:egret.TouchEvent){
		event.stopPropagation();
		this.onTouchTarget(event.target);
	}

	onTouchTarget(target){
		if(target == this.closeBtn){
			gm.guiLayer.removeElement(this);
		}
		if(target == this.rightBtn){
			if(this.isRegExpCode(this.textInput.text)){
				var codeText = this.textInput.text.toLocaleLowerCase();
				gm.guiLayer.removeElement(this);
				gm.gameUI.showLoadingLayer();
				gm.network.sendAction("useCoupon", {code:codeText}, (obj) => {
					var data = JSON.parse(obj);
					if(data && data["data"] && data["errcode"] == 0){
						var couponValue = JSON.parse(data["data"]["couponValue"]);
						var value = [];
						var item:any;
						if(couponValue["gold"]){
							item = {
								type:"gold",
								num:couponValue["gold"]
							};
							value.push(item);
							gm.dataManage.addMoney(couponValue["gold"],"gold");
						}
						if(couponValue["diamond"]){
							item = {
								type:"diamond",
								num:couponValue["diamond"]
							};
							value.push(item);
							gm.dataManage.addMoney(couponValue["diamond"],"diamond");
						}
						if(couponValue["relic"]){
							item = {
								type:"relic",
								num:couponValue["relic"]
							};
							value.push(item);
							gm.dataManage.addMoney(couponValue["relic"],"relic");
						}
						if(couponValue["crystal"]){
							item = {
								type:"crystal",
								num:couponValue["crystal"]
							};
							value.push(item);
							gm.dataManage.addMoney(couponValue["crystal"],"crystal");
						}
						this.textInput.text = "";
						//gm.guiLayer.removeElement(this);
						gm.gameUI.hideLoadingLayer();
						var ly = new MessageGetRewardPanel("获得物品",value);
						gm.guiLayer.addElement(ly);
					}
					else {
						gm.postMessage(consts.kMessageShowToastLayer,data["errmsg"]);
						gm.gameUI.hideLoadingLayer();
					}
				}, ()=>{
					this.wrongAni();
				}, true);
			}
			else {
				this.wrongAni();
			}
		}
	}

	//
	wrongAni(){
		this.wrongLbl.visible = true;
		egret.Tween.removeTweens(this.wrongLbl);
		egret.Tween.get(this.wrongLbl).wait(3000).call(function(){this.wrongLbl.visible = false;},this);
	}

	public isRegExpCode(str) {
		var re = new RegExp("^[A-Za-z0-9]{8,8}$");
		return (str.search(re) != -1);
	}

	public partAdded(partName: string,instance: any): void {
		super.partAdded(partName,instance);
	}

	public partRemoved(partName: string,instance: any): void{
		super.partRemoved(partName,instance);
	}
}
