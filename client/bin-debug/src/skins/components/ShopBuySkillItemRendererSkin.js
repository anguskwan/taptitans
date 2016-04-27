var skins;
(function (skins) {
    var components;
    (function (components) {
        var ShopBuySkillItemRendererSkin = (function (_super) {
            __extends(ShopBuySkillItemRendererSkin, _super);
            function ShopBuySkillItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ShopBuySkillItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ShopBuySkillItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [82, 7]);
                t.layout = this.__5_i();
                t.elementsContent = [this.nameLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.__6_i(), this.explainLbl_i(), this.shopSkillTimeLbl_i(), this.btnItem_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
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
            __egretProto__.shopSkillTimeLbl_i = function () {
                var t = new egret.gui.Label();
                this.shopSkillTimeLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 135, 16, "0", "left", "top", -23.5]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            ShopBuySkillItemRendererSkin._skinParts = ["iconImg", "nameLbl", "explainLbl", "shopSkillTimeLbl", "btnItem"];
            return ShopBuySkillItemRendererSkin;
        })(egret.gui.Skin);
        components.ShopBuySkillItemRendererSkin = ShopBuySkillItemRendererSkin;
        ShopBuySkillItemRendererSkin.prototype.__class__ = "skins.components.ShopBuySkillItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
