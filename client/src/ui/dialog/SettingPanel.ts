/**
 *
 * @author 
 *
 */
class SettingPanel extends egret.gui.SkinnableContainer {
    public closeBtn:egret.gui.Button;
    public heroChangeBtn:egret.gui.Button;
    public couponBtn:egret.gui.Button;
    public settingLbl:egret.gui.Label;
    public bgRect:egret.gui.Rect;
    public dataBtn:egret.gui.Button;
    public hookBtn:egret.gui.Button;
    //public fpsBtn:egret.gui.Button;

	public constructor() {
        super();
        this.skinName = skins.dialog.SettingPanelSkin;
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
	
    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.addBgRectColorAndCenter();
        this.heroChangeBtn.labelDisplay.text = gm.gameScene.isShowAllHeroes == null ? "隐藏英雄":gm.gameScene.isShowAllHeroes? "隐藏英雄":"显示英雄";
        //this.fpsBtn.labelDisplay.text = tt.Setting.isShowFps ? "显示fps":"隐藏fps";
    }
    
    onTouchLayer(event:egret.TouchEvent){
        event.stopPropagation();
        this.onTouchTarget(event.target);
    }
    
    onTouchTarget(target){
        if(target == this.closeBtn){
            //			egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
        if(target == this.heroChangeBtn){
            if(gm.gameScene.isShowAllHeroes == null){
                gm.gameScene.showAllHeroes(false);
                this.heroChangeBtn.labelDisplay.text = "显示英雄";
            }
            else {
                if(gm.gameScene.isShowAllHeroes){
                    gm.gameScene.showAllHeroes(false);
                    this.heroChangeBtn.labelDisplay.text = "显示英雄";
                }
                else {
                    gm.gameScene.showAllHeroes(true);
                    this.heroChangeBtn.labelDisplay.text = "隐藏英雄";
                }
            }
        }
        if(target == this.couponBtn){
            gm.guiLayer.removeElement(this);
            var ly = new CouponPanel();
            gm.guiLayer.addElement(ly);
        }
        if(target == this.settingLbl){
            // test code
            Util.isCheatingOpen = true;
            gm.gameUI.rightBtnLy.refreshShareBtnState();
        }
        if(target == this.dataBtn){
            gm.guiLayer.removeElement(this);
            var dataLy = new DataLayer();
            gm.guiLayer.addElement(dataLy);
        }
        if(target == this.hookBtn){
            gm.guiLayer.removeElement(this);
            var hookLy = new HookPanel();
            gm.guiLayer.addElement(hookLy);
        }
        //if(target == this.fpsBtn){
        //    if(!tt.Setting.isShowFps){
        //        egret.Profiler.getInstance().run();
        //        this.fpsBtn.labelDisplay.text = "隐藏fps";
        //        tt.Setting.isShowFps = true;
        //    }
        //    else {
        //        egret.Profiler.getInstance().stop();
        //        this.fpsBtn.labelDisplay.text = "显示fps";
        //        tt.Setting.isShowFps = false;
        //    }
        //}

    }
    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
    
    
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }
    
    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
}
