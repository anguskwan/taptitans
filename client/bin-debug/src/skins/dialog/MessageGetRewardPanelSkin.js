var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MessageGetRewardPanelSkin = (function (_super) {
            __extends(MessageGetRewardPanelSkin, _super);
            function MessageGetRewardPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MessageGetRewardPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MessageGetRewardPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [300, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 130, 0.5, 394, 66]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [15, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.titleLbl_i(), this.__5_i(), this.closeBtn_i(), this.getGroup_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0.5, "好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 211]);
                return t;
            };
            __egretProto__.getGroup_i = function () {
                var t = new egret.gui.Group();
                this.getGroup = t;
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0.5, -18]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "标题", 29, 26]);
                return t;
            };
            MessageGetRewardPanelSkin._skinParts = ["titleLbl", "closeBtn", "getGroup"];
            return MessageGetRewardPanelSkin;
        })(egret.gui.Skin);
        dialog.MessageGetRewardPanelSkin = MessageGetRewardPanelSkin;
        MessageGetRewardPanelSkin.prototype.__class__ = "skins.dialog.MessageGetRewardPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
