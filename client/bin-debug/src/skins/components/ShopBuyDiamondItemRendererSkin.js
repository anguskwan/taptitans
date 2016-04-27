var skins;
(function (skins) {
    var components;
    (function (components) {
        var ShopBuyDiamondItemRendererSkin = (function (_super) {
            __extends(ShopBuyDiamondItemRendererSkin, _super);
            function ShopBuyDiamondItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__6_i()];
                this.doubleTipImg_i();
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.AddItems("doubleTipImg", "__6", "last", "")
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ShopBuyDiamondItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ShopBuyDiamondItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [82, 7]);
                t.layout = this.__4_i();
                t.elementsContent = [this.nameLbl_i(), this.shopLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__6 = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.__5_i(), this.explainLbl_i(), this.btnItem_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.doubleTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.doubleTipImg = t;
                this.__s(t, ["source", "x", "y"], ["tip_double", 297, 17]);
                return t;
            };
            __egretProto__.explainLbl_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "说明", "left", 0x8F8699, "top", 82, 29]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_default", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign"], [true, "Arial", 18, "名字", "left", "middle"]);
                return t;
            };
            __egretProto__.shopLbl_i = function () {
                var t = new egret.gui.Label();
                this.shopLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "textColor", "verticalAlign"], [true, "Arial", 18, "left", 0xF7D653, "middle"]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            ShopBuyDiamondItemRendererSkin._skinParts = ["iconImg", "nameLbl", "shopLbl", "explainLbl", "btnItem", "doubleTipImg"];
            return ShopBuyDiamondItemRendererSkin;
        })(egret.gui.Skin);
        components.ShopBuyDiamondItemRendererSkin = ShopBuyDiamondItemRendererSkin;
        ShopBuyDiamondItemRendererSkin.prototype.__class__ = "skins.components.ShopBuyDiamondItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
