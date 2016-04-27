var skins;
(function (skins) {
    var components;
    (function (components) {
        var BuyPopButtonSkin = (function (_super) {
            __extends(BuyPopButtonSkin, _super);
            function BuyPopButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [58, 81]);
                this.elementsContent = [this.__7_i(), this.numLbl_i()];
                this.upSkin_i();
                this.downSkin_i();
                this.disabledSkin_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("upSkin", "", "before", "__7")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("downSkin", "", "before", "__7")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.AddItems("disabledSkin", "", "before", "__7")
                    ])
                ];
            }
            var __egretProto__ = BuyPopButtonSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BuyPopButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 10]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.costLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__7 = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__6_i()];
                return t;
            };
            __egretProto__.costLbl_i = function () {
                var t = new egret.gui.Label();
                this.costLbl = t;
                this.__s(t, ["bold", "fontFamily", "size"], [true, "Arial", 12]);
                return t;
            };
            __egretProto__.disabledSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledSkin = t;
                t.source = "btn_pop_blue";
                return t;
            };
            __egretProto__.downSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downSkin = t;
                t.source = "btn_pop_blue";
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 1, 14, "+100", "center", "middle", 27]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.55, 0.55, "coin"]);
                return t;
            };
            __egretProto__.upSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upSkin = t;
                t.source = "btn_pop_blue";
                return t;
            };
            BuyPopButtonSkin._skinParts = ["upSkin", "downSkin", "disabledSkin", "costLbl", "numLbl"];
            return BuyPopButtonSkin;
        })(egret.gui.Skin);
        components.BuyPopButtonSkin = BuyPopButtonSkin;
        BuyPopButtonSkin.prototype.__class__ = "skins.components.BuyPopButtonSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
