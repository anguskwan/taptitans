/**
 *
 * @author 
 *
 */
class DailyRewardPanel extends egret.gui.SkinnableContainer {
    public bgRect:egret.gui.Rect;
    public closeBtn:egret.gui.Button;
    public closeCallFunction:any;
    public value:any;
	public constructor(data,close?) {
        super();
        this.value = data;
        this.closeCallFunction = close;
        this.skinName = skins.dialog.DailyRewardPanelSkin;
	}

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
        this.initUI();
    }

    public initUI(){
        for(var i:number = 1;i <= 5;i++){
            if(i == this.value.day){
                this["selectImg" + i].visible = true;
                this["selectOffImg" + i].visible = false;
            }
            else if(i < this.value.day){
                this["selectImg" + i].visible = false;
                this["selectOffImg" + i].visible = false;
            }
            else {
                this["selectImg" + i].visible = false;
                this["selectOffImg" + i].visible = true;
            }
            this.setRewardNum(i);
        }
    }

    setRewardNum(index){
        var vipInfo = gm.dataManage.vipInfo();
        var num = 0;
        if (index < 5) {
            num = index * 15 * (1+vipInfo.dailyBossDiamond);
            this["numLbl" + index].text = "X" + num;
        } else {
            num = 1 + vipInfo.dailyBossWeapon;
            this["numLbl" + index].text = num;
        }
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
        if(target == this["selectGroup" + this.value.day]){
            //console.log("selectGroup" + this.value.day);
            gm.guiLayer.removeElement(this);
            gm.dataManage.fightDailyBoss();
            if(this.closeCallFunction){
                Util.invokeCallback(this.closeCallFunction);
            }
        }
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
