/**
 *
 * @author
 *
 */
var LoadingLayer = (function (_super) {
    __extends(LoadingLayer, _super);
    function LoadingLayer() {
        _super.call(this);
        this.skinName = skins.dialog.LoadingLayerSkin;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }
    var __egretProto__ = LoadingLayer.prototype;
    __egretProto__.onRemoveFromStage = function () {
        clearInterval(this._interval);
    };
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.loadingImg.anchorX = 0.5;
        this.loadingImg.anchorY = 0.5;
        this._interval = setInterval(function () {
            _this.loadingImg.rotation += 36;
        }, 30);
        //		egret.Tween.get(this.loadingImg,{ loop:true}).to({rotation:360},300);
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
    return LoadingLayer;
})(egret.gui.SkinnableComponent);
LoadingLayer.prototype.__class__ = "LoadingLayer";
