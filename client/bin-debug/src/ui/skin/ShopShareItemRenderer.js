var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ShopShareItemRenderer = (function (_super) {
        __extends(ShopShareItemRenderer, _super);
        function ShopShareItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.ShopShareItemRendererSkin;
        }
        var __egretProto__ = ShopShareItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.btnItem.textLbl.size = 22;
            this.btnItem.textLbl.text = "分享";
            this.btnItem.iconGroup.visible = false;
            this.btnItem.iconCostLbl.visible = false;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                var ly = new ShareLayer();
                gm.guiLayer.addElement(ly);
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ShopShareItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ShopShareItemRenderer = ShopShareItemRenderer;
    ShopShareItemRenderer.prototype.__class__ = "uiskins.ShopShareItemRenderer";
})(uiskins || (uiskins = {}));
