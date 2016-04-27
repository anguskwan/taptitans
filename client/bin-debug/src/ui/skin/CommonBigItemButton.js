var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var CommonBigItemButton = (function (_super) {
        __extends(CommonBigItemButton, _super);
        function CommonBigItemButton() {
            _super.apply(this, arguments);
            this.skinName = skins.components.CommonBigItemButtonSkin;
        }
        var __egretProto__ = CommonBigItemButton.prototype;
        return CommonBigItemButton;
    })(uiskins.CommonItemButton);
    uiskins.CommonBigItemButton = CommonBigItemButton;
    CommonBigItemButton.prototype.__class__ = "uiskins.CommonBigItemButton";
})(uiskins || (uiskins = {}));
