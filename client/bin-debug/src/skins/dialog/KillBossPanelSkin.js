var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var KillBossPanelSkin = (function (_super) {
            __extends(KillBossPanelSkin, _super);
            function KillBossPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [260, 447]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = KillBossPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return KillBossPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "无法击败魔王", 29, 18]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0.5, 14, "你未能在30秒内击败魔王。你可以点击【挑战魔王】\n再战一场。别忘记升级英雄，增强实力后重返战场", -27]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["label", "skinName", "x", "y"], ["好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 171]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            KillBossPanelSkin._skinParts = ["closeBtn"];
            return KillBossPanelSkin;
        })(egret.gui.Skin);
        dialog.KillBossPanelSkin = KillBossPanelSkin;
        KillBossPanelSkin.prototype.__class__ = "skins.dialog.KillBossPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
