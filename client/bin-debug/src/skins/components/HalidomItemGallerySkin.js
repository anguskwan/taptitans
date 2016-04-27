var skins;
(function (skins) {
    var components;
    (function (components) {
        var HalidomItemGallerySkin = (function (_super) {
            __extends(HalidomItemGallerySkin, _super);
            function HalidomItemGallerySkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 400]);
                this.elementsContent = [this.__6_i(), this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HalidomItemGallerySkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HalidomItemGallerySkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "visible", "width", "x", "y"], ["list_element_bg", false, 450, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [65, 69, 77, 8]);
                t.elementsContent = [this.nameLbl_i(), this.explainLbl1_i(), this.explainLbl2_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth", "x", "y"], [100, 100, 0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.iconImg_i(), this.__5_i(), this.isHave_i(), this.topMask_i()];
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
                this.__s(t, ["height", "right", "verticalCenter", "width", "x", "y"], [18, 172, -24, 39, 10, 20]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.explainLbl1_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl1 = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], ["Arial", 16, "说明", "left", 0xFFFFFF, "top", 2, 22]);
                return t;
            };
            __egretProto__.explainLbl2_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl2 = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], ["Arial", 16, "说明", "left", 0xFFFFFF, "middle", 2, 42]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 14, 11]);
                return t;
            };
            __egretProto__.isHave_i = function () {
                var t = new egret.gui.UIAsset();
                this.isHave = t;
                this.__s(t, ["source", "x", "y"], ["halidom_gallery_1", 286, 22]);
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, "middle", 1]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("47,10,283,60"), "back_item_violet", 390, 5, 0]);
                return t;
            };
            __egretProto__.topMask_i = function () {
                var t = new egret.gui.Rect();
                this.topMask = t;
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth", "x", "y"], [0.5, 0x000000, 100, 100, 0, 0]);
                return t;
            };
            HalidomItemGallerySkin._skinParts = ["iconImg", "nameLbl", "explainLbl1", "explainLbl2", "isHave", "topMask", "lvLbl"];
            return HalidomItemGallerySkin;
        })(egret.gui.Skin);
        components.HalidomItemGallerySkin = HalidomItemGallerySkin;
        HalidomItemGallerySkin.prototype.__class__ = "skins.components.HalidomItemGallerySkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
