var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var CouponPanelSkin = (function (_super) {
            __extends(CouponPanelSkin, _super);
            function CouponPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = CouponPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return CouponPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "兑换码", 29, 18]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [17, 88]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.wrongLbl_i(), this.closeBtn_i(), this.rightBtn_i(), this.textInput_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth", "x", "y"], [100, 0, 0, 100, 10, 10]);
                t.elementsContent = [this.__3_i(), this.__6_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 387, 13]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["label", "skinName", "x", "y"], ["好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 171]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillAlpha", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0.5, 0x000000, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.textInput_i = function () {
                var t = new egret.gui.TextInput();
                this.textInput = t;
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["editable", "height", "horizontalCenter", "prompt", "textColor", "verticalCenter", "width"], [true, 80, 0, "请输入兑换码", 0xFFFFFF, -26.5, 394]);
                return t;
            };
            __egretProto__.wrongLbl_i = function () {
                var t = new egret.gui.Label();
                this.wrongLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "visible", "x", "y"], [true, "Arial", 20, "兑换码输入错误", 0xFE0000, false, 151, 18]);
                return t;
            };
            CouponPanelSkin._skinParts = ["wrongLbl", "closeBtn", "rightBtn", "textInput"];
            return CouponPanelSkin;
        })(egret.gui.Skin);
        dialog.CouponPanelSkin = CouponPanelSkin;
        CouponPanelSkin.prototype.__class__ = "skins.dialog.CouponPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
