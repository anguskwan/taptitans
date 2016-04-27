var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MatchPrestigePanelSkin = (function (_super) {
            __extends(MatchPrestigePanelSkin, _super);
            function MatchPrestigePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.__24_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MatchPrestigePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MatchPrestigePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter"], [0, 0.7, 0.7, "relic", 0]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 10, 10]);
                t.elementsContent = [this.__10_i(), this.__11_i(), this.heroLbl_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "过关奖励：", "right", 0]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter", "x", "y"], [0, 0.7, 0.7, "relic", 0, 20, 20]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 20, 20]);
                t.elementsContent = [this.__13_i(), this.__14_i(), this.stageLbl_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "全队奖赏：", "right", 0]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 30, 30]);
                t.elementsContent = [this.__16_i(), this.bonusLbl_i()];
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "总共：", "right", 0]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter", "x", "y"], [0, 0.7, 0.7, "relic", 0, 10, 10]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 40, 40]);
                t.elementsContent = [this.__18_i(), this.__19_i(), this.allLbl_i()];
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "percentWidth", "y"], [0, 60, 151]);
                t.layout = this.__9_i();
                t.elementsContent = [this.__12_i(), this.__15_i(), this.__17_i(), this.__20_i()];
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [26, "center", "middle"]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "x", "y"], [0.5, 10, 310]);
                t.layout = this.__22_i();
                t.elementsContent = [this.closeBtn_i(), this.prestigeBtn_i()];
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__21_i(), this.__23_i()];
                return t;
            };
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
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "btn_match", 27, 13]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "比赛：蜕变", 89, 22]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "参加比赛必须蜕变，从第一关开始。\n看看你在24小时之内能打到多少关!\n比赛排名获得丰厚奖励！", 30, 72]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 160, 0, 380, 136]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 8;
                return t;
            };
            __egretProto__.allLbl_i = function () {
                var t = new egret.gui.Label();
                this.allLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter", "x", "y"], [true, "Arial", 33, 18, "0", "right", 0xFFFFFF, 0, 10, 20]);
                return t;
            };
            __egretProto__.bonusLbl_i = function () {
                var t = new egret.gui.Label();
                this.bonusLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter", "y"], [true, "Arial", 0, 18, "0", "right", 0xEB780F, 0, 10]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 22);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["label", "skinName"], ["不用了，谢谢", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red")]);
                return t;
            };
            __egretProto__.heroLbl_i = function () {
                var t = new egret.gui.Label();
                this.heroLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter", "x", "y"], [true, "Arial", 33, 18, "0", "right", 0xFFFFFF, 0, 30, 40]);
                return t;
            };
            __egretProto__.prestigeBtn_i = function () {
                var t = new egret.gui.Button();
                this.prestigeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 22);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["label", "skinName"], ["开始蜕变", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue")]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "英雄等级额外奖励：", "right", 0]);
                return t;
            };
            __egretProto__.stageLbl_i = function () {
                var t = new egret.gui.Label();
                this.stageLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter", "x", "y"], [true, "Arial", 33, 18, "0", "right", 0xFFFFFF, 0, 20, 30]);
                return t;
            };
            MatchPrestigePanelSkin._skinParts = ["heroLbl", "stageLbl", "bonusLbl", "allLbl", "closeBtn", "prestigeBtn"];
            return MatchPrestigePanelSkin;
        })(egret.gui.Skin);
        dialog.MatchPrestigePanelSkin = MatchPrestigePanelSkin;
        MatchPrestigePanelSkin.prototype.__class__ = "skins.dialog.MatchPrestigePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
