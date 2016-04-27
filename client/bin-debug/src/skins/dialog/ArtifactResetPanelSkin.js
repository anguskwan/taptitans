var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var ArtifactResetPanelSkin = (function (_super) {
            __extends(ArtifactResetPanelSkin, _super);
            function ArtifactResetPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [360, 447]);
                this.elementsContent = [this.__17_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ArtifactResetPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ArtifactResetPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.6, 0.6, "relic"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "touchChildren", "touchEnabled", "y"], [0, false, false, 28]);
                t.layout = this.__10_i();
                t.elementsContent = [this.relicLbl_i(), this.__11_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [57, 0.5, 300, 259]);
                t.elementsContent = [this.rightBtn_i(), this.__8_i(), this.__9_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign"], [true, "Arial", 18, "Lv:", "center", "middle"]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [123, 53]);
                t.layout = this.__15_i();
                t.elementsContent = [this.__14_i(), this.lvLbl_i(), this.maxLvLbl_i()];
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.nameLbl_i(), this.currExpLbl1_i(), this.currExpLbl2_i(), this.nextExpLbl1_i(), this.nextExpLbl2_i(), this.__5_i(), this.closeBtn_i(), this.__13_i(), this.iconImg_i(), this.__16_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [360, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 100, 300, 115, 134]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "下个等级：", "center", 0x42D0FF, "middle", 123, 140]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.6, 0.6, "diamond"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "touchChildren", "touchEnabled", "y"], [7, false, false, 5]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__6_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "x", "y"], ["Arial", 18, "重新使用", "center", false, "middle", 111, 6]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20, 10, 10]);
                return t;
            };
            __egretProto__.currExpLbl1_i = function () {
                var t = new egret.gui.Label();
                this.currExpLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "说明", 123, 80]);
                return t;
            };
            __egretProto__.currExpLbl2_i = function () {
                var t = new egret.gui.Label();
                this.currExpLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "说明", 123, 106]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 14, "0"]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "scaleX", "scaleY", "source", "width", "x", "y"], [57, 1.5, 1.5, "artifact1", 55, 21, 26]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign"], [true, "Arial", 18, "1", "center", 0x42D0FF, "middle"]);
                return t;
            };
            __egretProto__.maxLvLbl_i = function () {
                var t = new egret.gui.Label();
                this.maxLvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 18, "（最高等级10）", "center", "middle", 10, 10]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "名字", 123, 22]);
                return t;
            };
            __egretProto__.nextExpLbl1_i = function () {
                var t = new egret.gui.Label();
                this.nextExpLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "说明", 123, 171]);
                return t;
            };
            __egretProto__.nextExpLbl2_i = function () {
                var t = new egret.gui.Label();
                this.nextExpLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "说明", 123, 197]);
                return t;
            };
            __egretProto__.relicLbl_i = function () {
                var t = new egret.gui.Label();
                this.relicLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 14, "打破神器以获得0个"]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["skinName", "width", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red"), 300, 0, 0]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            ArtifactResetPanelSkin._skinParts = ["nameLbl", "currExpLbl1", "currExpLbl2", "nextExpLbl1", "nextExpLbl2", "closeBtn", "rightBtn", "diamondLbl", "relicLbl", "iconImg", "lvLbl", "maxLvLbl"];
            return ArtifactResetPanelSkin;
        })(egret.gui.Skin);
        dialog.ArtifactResetPanelSkin = ArtifactResetPanelSkin;
        ArtifactResetPanelSkin.prototype.__class__ = "skins.dialog.ArtifactResetPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
