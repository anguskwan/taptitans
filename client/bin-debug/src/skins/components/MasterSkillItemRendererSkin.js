var skins;
(function (skins) {
    var components;
    (function (components) {
        var MasterSkillItemRendererSkin = (function (_super) {
            __extends(MasterSkillItemRendererSkin, _super);
            function MasterSkillItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MasterSkillItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MasterSkillItemRendererSkin._skinParts;
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
                t.elementsContent = [this.nameLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [82, -4]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.iconDisabled_i(), this.__5_i(), this.__8_i(), this.explainLbl_i(), this.btnItem_i(), this.newTipImg_i()];
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "说明", "left", 0x8F8699, "middle", 82, 49]);
                return t;
            };
            __egretProto__.iconDisabled_i = function () {
                var t = new egret.gui.Rect();
                this.iconDisabled = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "width", "x", "y"], [0.6, 0x000000, 58, 58, 14, 11]);
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "1", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign"], [true, "Arial", 18, "名字", "left", "middle"]);
                return t;
            };
            __egretProto__.newTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.newTipImg = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["tip_new", false, 297, 17]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            MasterSkillItemRendererSkin._skinParts = ["iconImg", "iconDisabled", "nameLbl", "lvLbl", "explainLbl", "btnItem", "newTipImg"];
            return MasterSkillItemRendererSkin;
        })(egret.gui.Skin);
        components.MasterSkillItemRendererSkin = MasterSkillItemRendererSkin;
        MasterSkillItemRendererSkin.prototype.__class__ = "skins.components.MasterSkillItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
