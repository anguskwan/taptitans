var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildMessageLayerSkin = (function (_super) {
            __extends(GuildMessageLayerSkin, _super);
            function GuildMessageLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__10_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessageLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessageLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 636, 0, 465, 58]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "信息列表", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.messageList_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "清空列表", false, 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0, 701]);
                t.elementsContent = [this.clearListBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.clearListBtn_i = function () {
                var t = new egret.gui.Button();
                this.clearListBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 120]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.messageList_i = function () {
                var t = new egret.gui.List();
                this.messageList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [620, 0, 451, 65]);
                t.layout = this.__5_i();
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.__7_i(), this.__9_i()];
                return t;
            };
            GuildMessageLayerSkin._skinParts = ["closeBtn", "messageList", "clearListBtn"];
            return GuildMessageLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildMessageLayerSkin = GuildMessageLayerSkin;
        GuildMessageLayerSkin.prototype.__class__ = "skins.dialog.GuildMessageLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
