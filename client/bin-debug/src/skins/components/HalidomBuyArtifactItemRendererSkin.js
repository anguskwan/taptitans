var skins;
(function (skins) {
    var components;
    (function (components) {
        var HalidomBuyArtifactItemRendererSkin = (function (_super) {
            __extends(HalidomBuyArtifactItemRendererSkin, _super);
            function HalidomBuyArtifactItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HalidomBuyArtifactItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HalidomBuyArtifactItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_buy_artifact", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.btnBigItem_i()];
                return t;
            };
            __egretProto__.btnBigItem_i = function () {
                var t = new uiskins.CommonBigItemButton();
                this.btnBigItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonBigItemButtonSkin, 76, 11]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            HalidomBuyArtifactItemRendererSkin._skinParts = ["btnBigItem"];
            return HalidomBuyArtifactItemRendererSkin;
        })(egret.gui.Skin);
        components.HalidomBuyArtifactItemRendererSkin = HalidomBuyArtifactItemRendererSkin;
        HalidomBuyArtifactItemRendererSkin.prototype.__class__ = "skins.components.HalidomBuyArtifactItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
