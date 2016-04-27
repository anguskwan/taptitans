var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MailLayerSkin = (function (_super) {
            __extends(MailLayerSkin, _super);
            function MailLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__11_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MailLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MailLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__9_i(), this.mailList_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter"], [86, 0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 24, "邮箱", 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "btn_mail_off", 13, 6]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [10, 43]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__6_i(), this.mailNumLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                t.horizontalCenter = 0;
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__8_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "verticalCenter", "x"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 0, 422]);
                return t;
            };
            __egretProto__.mailList_i = function () {
                var t = new egret.gui.List();
                this.mailList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "useVirtualLayout", "percentWidth"], [0, 670, 0, true, 100]);
                t.layout = this.__10_i();
                return t;
            };
            __egretProto__.mailNumLbl_i = function () {
                var t = new egret.gui.Label();
                this.mailNumLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 18, "0/50"]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            MailLayerSkin._skinParts = ["mailNumLbl", "closeBtn", "mailList"];
            return MailLayerSkin;
        })(egret.gui.Skin);
        dialog.MailLayerSkin = MailLayerSkin;
        MailLayerSkin.prototype.__class__ = "skins.dialog.MailLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
