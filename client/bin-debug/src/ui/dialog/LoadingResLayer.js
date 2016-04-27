/**
 *
 * @author
 *
 */
var LoadingResLayer = (function (_super) {
    __extends(LoadingResLayer, _super);
    function LoadingResLayer(res, cb) {
        _super.call(this);
        this._res = res;
        this._cb = cb;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = LoadingResLayer.prototype;
    __egretProto__.onAddToStage = function () {
        gm.gameUI.showLoadingLayer();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup(this._res);
    };
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName != this._res) {
            return;
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        gm.gameUI.hideLoadingLayer();
        gm.guiLayer.removeElement(this);
        Util.invokeCallback(this._cb);
    };
    return LoadingResLayer;
})(egret.gui.SkinnableComponent);
LoadingResLayer.prototype.__class__ = "LoadingResLayer";
