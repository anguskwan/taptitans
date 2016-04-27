var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HeroesBuyWeaponItemRenderer = (function (_super) {
        __extends(HeroesBuyWeaponItemRenderer, _super);
        function HeroesBuyWeaponItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.HeroesBuyWeaponItemRendererSkin;
        }
        var __egretProto__ = HeroesBuyWeaponItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.btnBigItem.iconGroup.visible = false;
            this.btnBigItem.textLbl.text = "武器升级";
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnBigItem) {
                var ly = new WeaponPanel();
                gm.guiLayer.addElement(ly);
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (this.btnBigItem == instance) {
                this.btnBigItem.setBtnSkinName("btn_big_yellow");
            }
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HeroesBuyWeaponItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HeroesBuyWeaponItemRenderer = HeroesBuyWeaponItemRenderer;
    HeroesBuyWeaponItemRenderer.prototype.__class__ = "uiskins.HeroesBuyWeaponItemRenderer";
})(uiskins || (uiskins = {}));
