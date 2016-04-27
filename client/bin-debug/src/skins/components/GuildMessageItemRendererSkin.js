var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMessageItemRendererSkin = (function (_super) {
            __extends(GuildMessageItemRendererSkin, _super);
            function GuildMessageItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 455]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessageItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessageItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Button();
                this.__s(t, ["enabled", "height", "skinName", "width"], [true, 40, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 80]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], ["Arial", 0, 18, "查看", "center", false, "middle", 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["touchEnabled", "verticalCenter", "x"], [false, 0, 350]);
                t.elementsContent = [this.__5_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.titleLbl_i(), this.__7_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [58, "icon_default", 0, 58, 34]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x352611, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x"], [true, "Arial", 16, "主题：", "left", 0xFFFFFF, 0, 103]);
                return t;
            };
            GuildMessageItemRendererSkin._skinParts = ["iconImg", "titleLbl"];
            return GuildMessageItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildMessageItemRendererSkin = GuildMessageItemRendererSkin;
        GuildMessageItemRendererSkin.prototype.__class__ = "skins.components.GuildMessageItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
