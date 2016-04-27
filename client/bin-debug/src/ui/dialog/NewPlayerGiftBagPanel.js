/**
 *
 * @author
 *
 */
var NewPlayerGiftBagPanel = (function (_super) {
    __extends(NewPlayerGiftBagPanel, _super);
    function NewPlayerGiftBagPanel(btn, cb) {
        _super.call(this);
        this._cb = cb;
        this.btn = btn;
        this.skinName = skins.dialog.NewPlayerGiftBagPanelSkin;
    }
    var __egretProto__ = NewPlayerGiftBagPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
    };
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
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            //			egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
        if (target == this.buyBtn) {
            //add diamond
            gm.gameUI.showLoadingLayer();
            var diamond = 300;
            gm.network.buyDiamond(312, function (data) {
                Util.invokeCallback(this._cb);
                gm.dataManage.addMoney(data.added, "diamond");
                gm.dataManage.addShopSkill(2, "goldRain");
                gm.network.sendAction("gainNewPlayerGiftBag", {}, function () {
                });
                gm.guiLayer.removeElement(this);
                this.btn.visible = false;
                gm.dataManage.getVipLevel(function () {
                    gm.postMessage(consts.kMessageGetVipLevel);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
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
    return NewPlayerGiftBagPanel;
})(egret.gui.SkinnableContainer);
NewPlayerGiftBagPanel.prototype.__class__ = "NewPlayerGiftBagPanel";
