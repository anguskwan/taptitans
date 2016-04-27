/**
 *
 * @author
 *
 */
var BottomLayer = (function (_super) {
    __extends(BottomLayer, _super);
    function BottomLayer() {
        _super.call(this);
        this.bottomPopUp = null;
        this.skinName = skins.mod.BottomLayerSkin;
    }
    var __egretProto__ = BottomLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        gm.registerMessage(consts.kMessageShowPopUpDialog, this.showBottomPopUpDialog, this);
        gm.registerMessage(consts.kMessageHidePopUpDialog, this.hideBottomPopUpDialog, this);
        gm.registerMessage(consts.kMessageChangeToMin, this.changeToMin, this);
        gm.registerMessage(consts.kMessageChangeToMax, this.changeToMax, this);
    };
    __egretProto__.changeToMin = function () {
        this.bottomPopUpGroup._setHeight(DIALOG_MAIN_MIN);
        this.bottomPopUpDialog._setHeight(DIALOG_MAIN_MIN);
    };
    __egretProto__.changeToMax = function () {
        this.bottomPopUpGroup._setHeight(DIALOG_MAIN_MAX);
        this.bottomPopUpDialog._setHeight(DIALOG_MAIN_MAX);
    };
    __egretProto__.showBottomPopUpDialog = function (obj) {
        if (!this.bottomPopUpDialog) {
            if (!this.bottomPopUp) {
                this.bottomPopUp = new BottomPopUpDialog(obj);
            }
            else {
                this.bottomPopUp.selectTabBarShowList(obj);
            }
            var ly = this.bottomPopUpDialog = this.bottomPopUp;
            this.bottomPopUpGroup.addElement(ly);
        }
        else {
            this.bottomPopUpDialog.selectTabBarShowList(obj);
        }
    };
    __egretProto__.hideBottomPopUpDialog = function () {
        if (this.bottomPopUpDialog) {
            this.bottomPopUpGroup.removeElement(this.bottomPopUpDialog);
            this.bottomPopUpDialog = null;
        }
        //if(this.bottomPopUpDialog){
        //    this.bottomPopUpDialog.visible = false;
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
    return BottomLayer;
})(egret.gui.SkinnableComponent);
BottomLayer.prototype.__class__ = "BottomLayer";
