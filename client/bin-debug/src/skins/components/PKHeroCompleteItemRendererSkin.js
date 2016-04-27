var skins;
(function (skins) {
    var components;
    (function (components) {
        var PKHeroCompleteItemRendererSkin = (function (_super) {
            __extends(PKHeroCompleteItemRendererSkin, _super);
            function PKHeroCompleteItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 480]);
                this.elementsContent = [this.__14_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKHeroCompleteItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKHeroCompleteItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.8, 0.8, "morale", 0, 374]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "y"], [28, 0.5, 193]);
                t.layout = this.__11_i();
                t.elementsContent = [this.__12_i(), this.moraleLbl_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "width"], [100, 0, 300]);
                t.elementsContent = [this.__4_i(), this.titleImg_i(), this.__7_i(), this.__10_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "verticalCenter", "width"], [0x39363F, 150, 0, 21, 220]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.8, 0.8, "fragment", 0, 374]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "y"], [28, 0.5, 163]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__6_i(), this.fragmentLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [1, "center", "middle"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 18, "装备经验：", "center", 0xFFFFFF, "middle", 0, 25, 10]);
                return t;
            };
            __egretProto__.equipExpLbl_i = function () {
                var t = new egret.gui.Label();
                this.equipExpLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0xFFFFFF, "middle", 0, 15]);
                return t;
            };
            __egretProto__.fragmentLbl_i = function () {
                var t = new egret.gui.Label();
                this.fragmentLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0xFEA72C, "middle", 0, 15]);
                return t;
            };
            __egretProto__.moraleLbl_i = function () {
                var t = new egret.gui.Label();
                this.moraleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x3CA4DB, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "y"], [28, 0.5, 133]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__9_i(), this.equipExpLbl_i()];
                return t;
            };
            __egretProto__.titleImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.titleImg = t;
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "pk_complete_victory", 11]);
                return t;
            };
            PKHeroCompleteItemRendererSkin._skinParts = ["titleImg", "fragmentLbl", "equipExpLbl", "moraleLbl"];
            return PKHeroCompleteItemRendererSkin;
        })(egret.gui.Skin);
        components.PKHeroCompleteItemRendererSkin = PKHeroCompleteItemRendererSkin;
        PKHeroCompleteItemRendererSkin.prototype.__class__ = "skins.components.PKHeroCompleteItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
