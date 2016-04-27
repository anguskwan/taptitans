var skins;
(function (skins) {
    var components;
    (function (components) {
        var MasterPrestigeItemRendererSkin = (function (_super) {
            __extends(MasterPrestigeItemRendererSkin, _super);
            function MasterPrestigeItemRendererSkin() {
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
            var __egretProto__ = MasterPrestigeItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MasterPrestigeItemRendererSkin._skinParts;
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
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_skill7", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign"], [true, "Arial", 18, "蜕变", "left", 0xFFFFFF, "middle"]);
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
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "使用蜕变从新开始游戏,即可\n获得能用来换取神器的圣物", "left", 0x8F8699, "top", 82, 29]);
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.iconDisabled_i = function () {
                var t = new egret.gui.Rect();
                this.iconDisabled = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "width", "x", "y"], [0.6, 0x000000, 58, 58, 14, 11]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.iconDisabled_i(), this.__8_i(), this.__9_i(), this.btnItem_i()];
                return t;
            };
            MasterPrestigeItemRendererSkin._skinParts = ["iconDisabled", "btnItem"];
            return MasterPrestigeItemRendererSkin;
        })(egret.gui.Skin);
        components.MasterPrestigeItemRendererSkin = MasterPrestigeItemRendererSkin;
        MasterPrestigeItemRendererSkin.prototype.__class__ = "skins.components.MasterPrestigeItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
