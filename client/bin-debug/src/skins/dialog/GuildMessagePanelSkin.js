var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildMessagePanelSkin = (function (_super) {
            __extends(GuildMessagePanelSkin, _super);
            function GuildMessagePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__10_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessagePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessagePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [300, egret.gui.getScale9Grid("55,53,337,324"), "guild_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x4E361F, 120, -0.5, 360, 10, 67]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "确定", false, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [53, 211]);
                t.elementsContent = [this.rightBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "取消", false, 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [233, 211]);
                t.elementsContent = [this.cancelBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.cancelBtn_i = function () {
                var t = new egret.gui.Button();
                this.cancelBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red"), 120]);
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "top", "width"], [true, "Arial", 29, 18, "内容", 72, 344]);
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
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.titleLbl_i(), this.descLbl_i(), this.__7_i(), this.__9_i()];
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "标题", 26, 25]);
                return t;
            };
            GuildMessagePanelSkin._skinParts = ["titleLbl", "descLbl", "rightBtn", "cancelBtn"];
            return GuildMessagePanelSkin;
        })(egret.gui.Skin);
        dialog.GuildMessagePanelSkin = GuildMessagePanelSkin;
        GuildMessagePanelSkin.prototype.__class__ = "skins.dialog.GuildMessagePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
