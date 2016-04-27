var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildSetAttPanelSkin = (function (_super) {
            __extends(GuildSetAttPanelSkin, _super);
            function GuildSetAttPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildSetAttPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildSetAttPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [240, egret.gui.getScale9Grid("55,53,337,324"), "guild_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "确定", false, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 171]);
                t.elementsContent = [this.rightBtn_i(), this.__5_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0.5, -140]);
                t.elementsContent = [this.__4_i(), this.titleLbl_i(), this.textInput_i(), this.closeBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [24, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 19, 10, 10]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 120]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.textInput_i = function () {
                var t = new uiskins.GuildTextInput();
                this.textInput = t;
                this.__s(t, ["height", "horizontalCenter", "prompt", "skinName", "width", "y"], [80, 0, "编辑", skins.components.GuildTextInputSkin, 360, 75]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "设置攻击力", 29, 26]);
                return t;
            };
            GuildSetAttPanelSkin._skinParts = ["titleLbl", "textInput", "closeBtn", "rightBtn"];
            return GuildSetAttPanelSkin;
        })(egret.gui.Skin);
        dialog.GuildSetAttPanelSkin = GuildSetAttPanelSkin;
        GuildSetAttPanelSkin.prototype.__class__ = "skins.dialog.GuildSetAttPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
