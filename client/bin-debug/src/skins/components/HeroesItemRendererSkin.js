var skins;
(function (skins) {
    var components;
    (function (components) {
        var HeroesItemRendererSkin = (function (_super) {
            __extends(HeroesItemRendererSkin, _super);
            function HeroesItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__20_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HeroesItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HeroesItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 14, "DPS:", 81, 29]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "right", "verticalCenter"], [18, 137, -4]);
                t.layout = this.__10_i();
                t.elementsContent = [this.__11_i(), this.dpsLbl_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.4, 0xFF0000, 100, 100]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tip_hero_dead", 0, 0]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "tip_hero_tombstone", 53, 3]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "复活时间", 81, 29]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "verticalCenter", "x", "y"], [18, 82, 17, 10, 10]);
                t.layout = this.__16_i();
                t.elementsContent = [this.__17_i(), this.__18_i(), this.revivalTimeLbl_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.iconDisabled_i(), this.__6_i(), this.__9_i(), this.__12_i(), this.buyPopGroup_i(), this.revivalGroup_i(), this.btnItem_i(), this.effectImg_i(), this.newTipImg_i()];
                return t;
            };
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "verticalCenter"], [18, 82, -4]);
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
            __egretProto__.buyPopBtn0_i = function () {
                var t = new uiskins.BuyPopButton();
                this.buyPopBtn0 = t;
                this.__s(t, ["label", "skinName"], ["按钮", skins.components.BuyPopButtonSkin]);
                return t;
            };
            __egretProto__.buyPopBtn1_i = function () {
                var t = new uiskins.BuyPopButton();
                this.buyPopBtn1 = t;
                this.__s(t, ["label", "skinName"], ["按钮", skins.components.BuyPopButtonSkin]);
                return t;
            };
            __egretProto__.buyPopGroup_i = function () {
                var t = new egret.gui.Group();
                this.buyPopGroup = t;
                this.__s(t, ["visible", "x", "y"], [false, 155, 10]);
                t.layout = this.__13_i();
                t.elementsContent = [this.buyPopBtn0_i(), this.buyPopBtn1_i()];
                return t;
            };
            __egretProto__.dpsLbl_i = function () {
                var t = new egret.gui.Label();
                this.dpsLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 14, "0", "right", 0xFF7F01, 34, 39]);
                return t;
            };
            __egretProto__.effectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.effectImg = t;
                this.__s(t, ["height", "width", "x", "y"], [59, 59, 42, 71]);
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, "middle"]);
                return t;
            };
            __egretProto__.newTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.newTipImg = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["tip_new", false, 297, 17]);
                return t;
            };
            __egretProto__.revivalGroup_i = function () {
                var t = new egret.gui.Group();
                this.revivalGroup = t;
                this.__s(t, ["percentHeight", "visible", "percentWidth"], [100, false, 100]);
                t.elementsContent = [this.__14_i(), this.__15_i(), this.__19_i()];
                return t;
            };
            __egretProto__.revivalTimeLbl_i = function () {
                var t = new egret.gui.Label();
                this.revivalTimeLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "00:00:00", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["right", "bottom"]);
                return t;
            };
            HeroesItemRendererSkin._skinParts = ["iconImg", "iconDisabled", "nameLbl", "lvLbl", "dpsLbl", "buyPopBtn0", "buyPopBtn1", "buyPopGroup", "revivalTimeLbl", "revivalGroup", "btnItem", "effectImg", "newTipImg"];
            return HeroesItemRendererSkin;
        })(egret.gui.Skin);
        components.HeroesItemRendererSkin = HeroesItemRendererSkin;
        HeroesItemRendererSkin.prototype.__class__ = "skins.components.HeroesItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
