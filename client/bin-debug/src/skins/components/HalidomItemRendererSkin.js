var skins;
(function (skins) {
    var components;
    (function (components) {
        var HalidomItemRendererSkin = (function (_super) {
            __extends(HalidomItemRendererSkin, _super);
            function HalidomItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__10_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HalidomItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HalidomItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
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
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 14, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "right", "verticalCenter", "width", "y"], [18, 172, -24, 39, 10]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.explainLbl1_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "说明", "left", 0x8F8699, "top", 82, 29]);
                return t;
            };
            __egretProto__.explainLbl2_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "说明", "left", 0x8F8699, "middle", 82, 49]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_default", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 14, "1", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, "middle"]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.__6_i(), this.__9_i(), this.explainLbl1_i(), this.explainLbl2_i(), this.btnItem_i()];
                return t;
            };
            HalidomItemRendererSkin._skinParts = ["iconImg", "nameLbl", "lvLbl", "explainLbl1", "explainLbl2", "btnItem"];
            return HalidomItemRendererSkin;
        })(egret.gui.Skin);
        components.HalidomItemRendererSkin = HalidomItemRendererSkin;
        HalidomItemRendererSkin.prototype.__class__ = "skins.components.HalidomItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
