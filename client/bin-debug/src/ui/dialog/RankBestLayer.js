/**
 *
 * @author
 *
 */
var RankBestLayer = (function (_super) {
    __extends(RankBestLayer, _super);
    function RankBestLayer() {
        _super.call(this);
        this.skinName = skins.dialog.RankBestLayerSkin;
    }
    var __egretProto__ = RankBestLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this._initBest = true;
        this.rankToggleBtns = [];
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.bestInitGroup();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.bestInitGroup = function () {
        var ly = new uiskins.RankBestGroup();
        this.bestGroup.addElement(ly);
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
    return RankBestLayer;
})(egret.gui.SkinnableComponent);
RankBestLayer.prototype.__class__ = "RankBestLayer";
