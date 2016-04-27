var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildBagGetItemRendererSkin = (function (_super) {
            __extends(GuildBagGetItemRendererSkin, _super);
            function GuildBagGetItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [56, 370]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagGetItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagGetItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "y"], [302, 19]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "percentWidth"], [0, 0xC82D1C, 4, 0, 100]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.iconImg_i(), this.nameLbl_i(), this.__6_i(), this.__7_i()];
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [34, "icon_default", 34, 18, 10]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "名字", 0x632B13, 65, 17]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "diamond", 212, 128]);
                return t;
            };
            GuildBagGetItemRendererSkin._skinParts = ["iconImg", "nameLbl", "diamondLbl"];
            return GuildBagGetItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildBagGetItemRendererSkin = GuildBagGetItemRendererSkin;
        GuildBagGetItemRendererSkin.prototype.__class__ = "skins.components.GuildBagGetItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
