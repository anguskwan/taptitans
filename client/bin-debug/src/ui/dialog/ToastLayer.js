/**
 *
 * @author
 *
 */
var ToastLayer = (function (_super) {
    __extends(ToastLayer, _super);
    function ToastLayer(desc) {
        _super.call(this);
        this._desc = desc;
        this.skinName = skins.dialog.ToastLayerSkin;
    }
    var __egretProto__ = ToastLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.descLbl.text = this._desc;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return ToastLayer;
})(egret.gui.SkinnableComponent);
ToastLayer.prototype.__class__ = "ToastLayer";
