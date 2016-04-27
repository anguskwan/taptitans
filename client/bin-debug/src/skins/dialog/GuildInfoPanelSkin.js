var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildInfoPanelSkin = (function (_super) {
            __extends(GuildInfoPanelSkin, _super);
            function GuildInfoPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__18_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildInfoPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildInfoPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "4、最终由胜利英雄数量多的一方取胜", "left", "middle", 340, 10, 10]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["Arial", 18, "5、24:00以后请到管理—战报信息里领取奖励", "left", 0xF3F015, "middle", 340, 115, 68]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__13_i();
                t.elementsContent = [this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["height", "scrollSpeed", "verticalScrollPolicy", "width", "x", "y"], [320, 0.1, "off", 340, 30, 81]);
                t.viewport = this.__14_i();
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [320, 340, 33, 80]);
                t.layout = this.__16_i();
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.closeBtn_i(), this.__6_i(), this.__15_i(), this.__17_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "x", "y"], [440, egret.gui.getScale9Grid("55,53,337,324"), "guild_popup", 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "公会战争规则", 29, 26]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x3C2E29, 340, -0.5, 360, 71]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "欢迎参加公会战争，战争每天固定时间开启，不要错过呦。\n\n", "left", "middle", 340, 95, 48]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "width", "x", "y"], ["Arial", 18, "1、战争开启时间为：9:00—24:00", "left", 0xF3F015, "middle", 340, 105, 58]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "2、9:00—12:00为准备阶段   你可以提前查看对手情况，安排兵力。", "left", "middle", 340, 105, 58]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [24, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 19, 10, 10]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width"], ["Arial", 18, "3、12:00—24:00为战斗阶段   每人可以攻击2次", "left", "middle", 340]);
                return t;
            };
            GuildInfoPanelSkin._skinParts = ["closeBtn"];
            return GuildInfoPanelSkin;
        })(egret.gui.Skin);
        dialog.GuildInfoPanelSkin = GuildInfoPanelSkin;
        GuildInfoPanelSkin.prototype.__class__ = "skins.dialog.GuildInfoPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
