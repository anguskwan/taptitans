var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldPKCompleteItemRendererSkin = (function (_super) {
            __extends(GuildGoldPKCompleteItemRendererSkin, _super);
            function GuildGoldPKCompleteItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldPKCompleteItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldPKCompleteItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "verticalCenter", "width", "x", "y"], [0x2E2536, 30, 0, 12, 200, 10, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [1, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 18, "获得积分：", "center", 0xFFFFFF, "middle", 0, 25, 10]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 53, 151]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.expLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "width"], [100, 0, 300]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.titleImg_i(), this.__8_i()];
                return t;
            };
            __egretProto__.expLbl_i = function () {
                var t = new egret.gui.Label();
                this.expLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0xFFFFFF, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "verticalCenter", "width"], [0x3B3045, 100, 0, -6, 220]);
                return t;
            };
            __egretProto__.titleImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.titleImg = t;
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "pk_complete_victory", 11]);
                return t;
            };
            GuildGoldPKCompleteItemRendererSkin._skinParts = ["titleImg", "expLbl"];
            return GuildGoldPKCompleteItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildGoldPKCompleteItemRendererSkin = GuildGoldPKCompleteItemRendererSkin;
        GuildGoldPKCompleteItemRendererSkin.prototype.__class__ = "skins.components.GuildGoldPKCompleteItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
