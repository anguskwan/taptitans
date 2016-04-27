var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PKRecoveryPanelSkin = (function (_super) {
            __extends(PKRecoveryPanelSkin, _super);
            function PKRecoveryPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKRecoveryPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKRecoveryPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["touchChildren", "touchEnabled", "x", "y"], [false, false, 50, 12]);
                t.layout = this.__11_i();
                t.elementsContent = [this.__10_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [60, 300, 74, 170]);
                t.elementsContent = [this.recoveryBtn_i(), this.__9_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.timeLbl_i(), this.__7_i(), this.__8_i(), this.closeBtn_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "恢复你的士气值", 29, 18]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 14, "使用钻石，可以立即使你的士气涨满。\n减少英雄的死亡概率。", 39, 76]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["pk_icon_player", 319, 62]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "touchEnabled", "x", "y"], [true, "Arial", 24, "恢复士气", false, 160, 12]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 11, 10, 10]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 24, "X150"]);
                return t;
            };
            __egretProto__.recoveryBtn_i = function () {
                var t = new egret.gui.Button();
                this.recoveryBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.skinName = new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue");
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "diamond";
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "y"], [true, "Arial", 67, 18, "00:00:00", 18]);
                return t;
            };
            PKRecoveryPanelSkin._skinParts = ["timeLbl", "closeBtn", "recoveryBtn", "diamondLbl"];
            return PKRecoveryPanelSkin;
        })(egret.gui.Skin);
        dialog.PKRecoveryPanelSkin = PKRecoveryPanelSkin;
        PKRecoveryPanelSkin.prototype.__class__ = "skins.dialog.PKRecoveryPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
