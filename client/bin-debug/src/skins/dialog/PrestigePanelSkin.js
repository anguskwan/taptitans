var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PrestigePanelSkin = (function (_super) {
            __extends(PrestigePanelSkin, _super);
            function PrestigePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [460, 447]);
                this.elementsContent = [this.__32_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PrestigePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PrestigePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "y"], ["icon_small_prestige_artifact", 20]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "y"], ["icon_small_prestige_weapon", 42]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [195, 141]);
                t.elementsContent = [this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "英雄等级额外奖励：", "right", 0]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter"], [0, 0.7, 0.7, "relic", 0]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 10, 10]);
                t.elementsContent = [this.__14_i(), this.__15_i(), this.heroLbl_i()];
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "过关奖励：", "right", 0]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter", "x", "y"], [0, 0.7, 0.7, "relic", 0, 20, 20]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 20, 20]);
                t.elementsContent = [this.__17_i(), this.__18_i(), this.stageLbl_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "全队奖赏：", "right", 0]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 30, 30]);
                t.elementsContent = [this.__20_i(), this.bonusLbl_i()];
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", 120, 18, "总共：", "right", 0]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["right", "scaleX", "scaleY", "source", "verticalCenter", "x", "y"], [0, 0.7, 0.7, "relic", 0, 10, 10]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentWidth", "x", "y"], [100, 40, 40]);
                t.elementsContent = [this.__22_i(), this.__23_i(), this.allLbl_i()];
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "percentWidth", "y"], [0, 60, 231]);
                t.layout = this.__25_i();
                t.elementsContent = [this.__16_i(), this.__19_i(), this.__21_i(), this.__24_i()];
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [26, "center", "middle"]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 350]);
                t.layout = this.__27_i();
                t.elementsContent = [this.prestigeBtn_i(), this.prestigeSuperBtn_i()];
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "diamond";
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [100.5, 196.5]);
                t.layout = this.__30_i();
                t.elementsContent = [this.__29_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__13_i(), this.__26_i(), this.__28_i(), this.__31_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "x", "y"], [460, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", -1, 1]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.62, 0.62, "icon_skill7", 25, 22]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "蜕变", 68, 22]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_prestige", 25, 66]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "进入蜕变模式，重置游戏进度，以\n换取许多珍贵圣物，但是你的实力\n将会更加NB。", 176, 70]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "y"], ["Arial", 16, "你会继续", 0xEB780F, -4]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 14, "神器", 0xEB780F, 20, 19]);
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
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 386, 18]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 18, "0"]);
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
                this.__s(t, ["label", "skinName"], ["蜕变", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue")]);
                return t;
            };
            __egretProto__.prestigeSuperBtn_i = function () {
                var t = new egret.gui.Button();
                this.prestigeSuperBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 22);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["label", "skinName"], ["保级蜕变", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red")]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 14, "武器升级", 0xEB780F, 20, 41]);
                return t;
            };
            __egretProto__.stageLbl_i = function () {
                var t = new egret.gui.Label();
                this.stageLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "verticalCenter", "x", "y"], [true, "Arial", 33, 18, "0", "right", 0xFFFFFF, 0, 20, 30]);
                return t;
            };
            PrestigePanelSkin._skinParts = ["heroLbl", "stageLbl", "bonusLbl", "allLbl", "prestigeBtn", "prestigeSuperBtn", "diamondLbl", "closeBtn"];
            return PrestigePanelSkin;
        })(egret.gui.Skin);
        dialog.PrestigePanelSkin = PrestigePanelSkin;
        PrestigePanelSkin.prototype.__class__ = "skins.dialog.PrestigePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
