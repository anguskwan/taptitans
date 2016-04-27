/**
 *
 * @author
 *
 */
var SettingPanel = (function (_super) {
    __extends(SettingPanel, _super);
    //public fpsBtn:egret.gui.Button;
    function SettingPanel() {
        _super.call(this);
        this.skinName = skins.dialog.SettingPanelSkin;
    }
    var __egretProto__ = SettingPanel.prototype;
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.heroChangeBtn.labelDisplay.text = gm.gameScene.isShowAllHeroes == null ? "隐藏英雄" : gm.gameScene.isShowAllHeroes ? "隐藏英雄" : "显示英雄";
        //this.fpsBtn.labelDisplay.text = tt.Setting.isShowFps ? "显示fps":"隐藏fps";
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            //			egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
        if (target == this.heroChangeBtn) {
            if (gm.gameScene.isShowAllHeroes == null) {
                gm.gameScene.showAllHeroes(false);
                this.heroChangeBtn.labelDisplay.text = "显示英雄";
            }
            else {
                if (gm.gameScene.isShowAllHeroes) {
                    gm.gameScene.showAllHeroes(false);
                    this.heroChangeBtn.labelDisplay.text = "显示英雄";
                }
                else {
                    gm.gameScene.showAllHeroes(true);
                    this.heroChangeBtn.labelDisplay.text = "隐藏英雄";
                }
            }
        }
        if (target == this.couponBtn) {
            gm.guiLayer.removeElement(this);
            var ly = new CouponPanel();
            gm.guiLayer.addElement(ly);
        }
        if (target == this.settingLbl) {
            // test code
            Util.isCheatingOpen = true;
            gm.gameUI.rightBtnLy.refreshShareBtnState();
        }
        if (target == this.dataBtn) {
            gm.guiLayer.removeElement(this);
            var dataLy = new DataLayer();
            gm.guiLayer.addElement(dataLy);
        }
        if (target == this.hookBtn) {
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
    };
    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
    
    
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return SettingPanel;
})(egret.gui.SkinnableContainer);
SettingPanel.prototype.__class__ = "SettingPanel";
