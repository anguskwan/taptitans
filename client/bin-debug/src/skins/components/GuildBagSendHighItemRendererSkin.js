var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildBagSendHighItemRendererSkin = (function (_super) {
            __extends(GuildBagSendHighItemRendererSkin, _super);
            function GuildBagSendHighItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [120, 466]);
                this.elementsContent = [this.__21_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagSendHighItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagSendHighItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "红包总额：", 0xF7343E, 30, 30]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "diamond", 212, 128]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [163, 77]);
                t.layout = this.__13_i();
                t.elementsContent = [this.__11_i(), this.__12_i(), this.sendLbl_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["diamond", 212, 128]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [147, 21]);
                t.layout = this.__16_i();
                t.elementsContent = [this.__15_i(), this.costLbl_i()];
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "发红包", false, 0]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "x", "y"], [151, 20, 64]);
                t.elementsContent = [this.sendBtn_i(), this.__18_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["guildbag_icon_vip5", 12, 0]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.titleLbl_i(), this.__10_i(), this.__14_i(), this.__17_i(), this.__19_i(), this.__20_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "width"], [0x2C2932, 100, 0, 0, 440]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["guildbag_icon_high", 31, 15]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["guildbag_text_bg", 127, 16]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "发红包可获得：", 0xF7343E, 20, 20]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "crystal", 212, 128]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.costLbl_i = function () {
                var t = new egret.gui.Label();
                this.costLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 24, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.sendBtn_i = function () {
                var t = new egret.gui.Button();
                this.sendBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_orange", "dialog_btn_orange", "dialog_btn_disabled"), 90]);
                return t;
            };
            __egretProto__.sendLbl_i = function () {
                var t = new egret.gui.Label();
                this.sendLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [127, 53]);
                t.layout = this.__9_i();
                t.elementsContent = [this.__7_i(), this.__8_i(), this.crystalLbl_i()];
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "标签", 0xFFC30B, 131, 20]);
                return t;
            };
            GuildBagSendHighItemRendererSkin._skinParts = ["titleLbl", "crystalLbl", "sendLbl", "costLbl", "sendBtn"];
            return GuildBagSendHighItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildBagSendHighItemRendererSkin = GuildBagSendHighItemRendererSkin;
        GuildBagSendHighItemRendererSkin.prototype.__class__ = "skins.components.GuildBagSendHighItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
