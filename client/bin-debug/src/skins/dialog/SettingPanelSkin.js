var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var SettingPanelSkin = (function (_super) {
            __extends(SettingPanelSkin, _super);
            function SettingPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [420, 447]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SettingPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SettingPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "y"], [true, "Arial", 0.5, 14, "隐藏英雄，游戏更流畅", 284]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.settingLbl_i(), this.__4_i(), this.hookBtn_i(), this.couponBtn_i(), this.heroChangeBtn_i(), this.dataBtn_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 14, 20, 20]);
                return t;
            };
            __egretProto__.couponBtn_i = function () {
                var t = new egret.gui.Button();
                this.couponBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "x", "y"], [0.5, "兑换码", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 10, 139]);
                return t;
            };
            __egretProto__.dataBtn_i = function () {
                var t = new egret.gui.Button();
                this.dataBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "x", "y"], [0.5, "统计数据", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 20, 309]);
                return t;
            };
            __egretProto__.heroChangeBtn_i = function () {
                var t = new egret.gui.Button();
                this.heroChangeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "x", "y"], [0.5, "显示英雄", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 10, 219]);
                return t;
            };
            __egretProto__.hookBtn_i = function () {
                var t = new egret.gui.Button();
                this.hookBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0.5, "自动挂机", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 59]);
                return t;
            };
            __egretProto__.settingLbl_i = function () {
                var t = new egret.gui.Label();
                this.settingLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "设置", 29, 18]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [420, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            SettingPanelSkin._skinParts = ["settingLbl", "hookBtn", "couponBtn", "heroChangeBtn", "dataBtn", "closeBtn"];
            return SettingPanelSkin;
        })(egret.gui.Skin);
        dialog.SettingPanelSkin = SettingPanelSkin;
        SettingPanelSkin.prototype.__class__ = "skins.dialog.SettingPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
