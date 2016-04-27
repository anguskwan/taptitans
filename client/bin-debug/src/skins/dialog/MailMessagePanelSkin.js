var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MailMessagePanelSkin = (function (_super) {
            __extends(MailMessagePanelSkin, _super);
            function MailMessagePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__10_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MailMessagePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MailMessagePanelSkin._skinParts;
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
                this.__s(t, ["height", "scale9Grid", "source"], [400, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 220, 394, 28, 76]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__6_i();
                t.elementsContent = [this.contentLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["height", "scrollSpeed", "width", "x", "y"], [170, 0.1, 360, 46, 88]);
                t.viewport = this.__7_i();
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 12;
                return t;
            };
            __egretProto__.btnTextLbl_i = function () {
                var t = new egret.gui.Label();
                this.btnTextLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "领取", false, 0]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20, 10, 10]);
                return t;
            };
            __egretProto__.contentLbl_i = function () {
                var t = new egret.gui.Label();
                this.contentLbl = t;
                this.__s(t, ["fontFamily", "maxDisplayedLines", "size", "text", "width"], ["Arial", 1000, 16, "内容", 360]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter"], [true, "Arial", 46, 16, "名字一定要长", "left", 0x958D9E, 75.5]);
                return t;
            };
            __egretProto__.rewardGroup_i = function () {
                var t = new egret.gui.Group();
                this.rewardGroup = t;
                this.__s(t, ["x", "y"], [29, 312]);
                t.layout = this.__9_i();
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
            __egretProto__.rightGroup_i = function () {
                var t = new egret.gui.Group();
                this.rightGroup = t;
                this.__s(t, ["x", "y"], [296, 316]);
                t.elementsContent = [this.rightBtn_i(), this.btnTextLbl_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__8_i(), this.titleLbl_i(), this.closeBtn_i(), this.nameLbl_i(), this.rightGroup_i(), this.rewardGroup_i()];
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "标题", 29, 22]);
                return t;
            };
            MailMessagePanelSkin._skinParts = ["contentLbl", "titleLbl", "closeBtn", "nameLbl", "rightBtn", "btnTextLbl", "rightGroup", "rewardGroup"];
            return MailMessagePanelSkin;
        })(egret.gui.Skin);
        dialog.MailMessagePanelSkin = MailMessagePanelSkin;
        MailMessagePanelSkin.prototype.__class__ = "skins.dialog.MailMessagePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
