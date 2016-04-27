/**
 *
 * @author
 *
 */
var ShareLayer = (function (_super) {
    __extends(ShareLayer, _super);
    function ShareLayer() {
        _super.call(this);
        this.skinName = skins.dialog.ShareLayerSkin;
    }
    var __egretProto__ = ShareLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.runHandAni();
        if (gm.dataManage.shareTimes == 0 && !gm.dataManage.isNotFirstShared)
            this.lblDesc.text = Conf.shareReward[1].content;
        else if (gm.dataManage.shareTimes == 0 && gm.dataManage.isNotFirstShared)
            this.lblDesc.text = Conf.shareReward[2].content;
        else if (gm.dataManage.shareTimes == 1)
            this.lblDesc.text = Conf.shareReward[3].content;
        else
            this.lblDesc.text = "把游戏分享给好友吧！";
        //Util.testSkeleton(this.groupTest);
    };
    __egretProto__.runHandAni = function () {
        egret.Tween.removeTweens(this.handImg);
        egret.Tween.get(this.handImg, { loop: true }).to({ y: 30 }, 300).to({ y: 40 }, 200);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        gm.guiLayer.removeElement(this);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return ShareLayer;
})(egret.gui.SkinnableComponent);
ShareLayer.prototype.__class__ = "ShareLayer";
