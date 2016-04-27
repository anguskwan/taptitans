var skins;
(function (skins) {
    var components;
    (function (components) {
        var ShopShareItemRendererSkin = (function (_super) {
            __extends(ShopShareItemRendererSkin, _super);
            function ShopShareItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ShopShareItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ShopShareItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "item_friend", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign"], [true, "Arial", 18, "好友分享", "left", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [82, 7]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__8_i(), this.shareDesc_i(), this.btnItem_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.shareDesc_i = function () {
                var t = new egret.gui.Label();
                this.shareDesc = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "把游戏分享给好友吧！", "left", 0x8F8699, "top", 82, 29]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            ShopShareItemRendererSkin._skinParts = ["shareDesc", "btnItem"];
            return ShopShareItemRendererSkin;
        })(egret.gui.Skin);
        components.ShopShareItemRendererSkin = ShopShareItemRendererSkin;
        ShopShareItemRendererSkin.prototype.__class__ = "skins.components.ShopShareItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
