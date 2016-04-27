var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildMessagePKLayerSkin = (function (_super) {
            __extends(GuildMessagePKLayerSkin, _super);
            function GuildMessagePKLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessagePKLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessagePKLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
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
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "战报信息列表", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.messagePKList_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.messagePKList_i = function () {
                var t = new egret.gui.List();
                this.messagePKList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [620, 0, 451, 65]);
                t.layout = this.__5_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            GuildMessagePKLayerSkin._skinParts = ["closeBtn", "messagePKList"];
            return GuildMessagePKLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildMessagePKLayerSkin = GuildMessagePKLayerSkin;
        GuildMessagePKLayerSkin.prototype.__class__ = "skins.dialog.GuildMessagePKLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
