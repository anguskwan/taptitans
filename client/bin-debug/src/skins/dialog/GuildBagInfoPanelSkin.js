var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildBagInfoPanelSkin = (function (_super) {
            __extends(GuildBagInfoPanelSkin, _super);
            function GuildBagInfoPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagInfoPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagInfoPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 6;
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__11_i();
                t.elementsContent = [this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["height", "scrollSpeed", "verticalScrollPolicy", "width", "x", "y"], [320, 0.1, "off", 340, 30, 81]);
                t.viewport = this.__12_i();
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.closeBtn_i(), this.__6_i(), this.__13_i()];
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "红包规则说明", 29, 26]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x3C2E29, 340, -0.5, 360, 71]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "1、玩家可以在公会内进行发红包或者抢红包，红包数量有限制。", "left", "middle", 340, 95, 48]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "2、发红包次数每日零点重置。", "left", "middle", 340, 105, 58]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "3、所有红包内的额度均为随机。", "left", "middle", 340, 115, 68]);
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
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "width", "x", "y"], ["Arial", 18, "4、发出的红包24小时未领取，将自动消失。剩余额度不返还。", "left", "middle", 340, 125, 78]);
                return t;
            };
            GuildBagInfoPanelSkin._skinParts = ["closeBtn"];
            return GuildBagInfoPanelSkin;
        })(egret.gui.Skin);
        dialog.GuildBagInfoPanelSkin = GuildBagInfoPanelSkin;
        GuildBagInfoPanelSkin.prototype.__class__ = "skins.dialog.GuildBagInfoPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
