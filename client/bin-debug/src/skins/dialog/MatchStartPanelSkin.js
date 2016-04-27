var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MatchStartPanelSkin = (function (_super) {
            __extends(MatchStartPanelSkin, _super);
            function MatchStartPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.__45_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MatchStartPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MatchStartPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [10, 64]);
                t.layout = this.__13_i();
                t.elementsContent = [this.__11_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__15_i();
                t.elementsContent = [this.__16_i(), this.__17_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "排名2", 0]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [10, 64]);
                t.layout = this.__21_i();
                t.elementsContent = [this.__22_i(), this.__23_i()];
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__25_i();
                t.elementsContent = [this.__26_i(), this.__27_i()];
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "排名3", 0]);
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__33_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__34_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__35_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [10, 64]);
                t.layout = this.__34_i();
                t.elementsContent = [this.__32_i(), this.__33_i()];
                return t;
            };
            __egretProto__.__36_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__37_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__38_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__39_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__38_i();
                t.elementsContent = [this.__36_i(), this.__37_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__40_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "touchEnabled", "verticalCenter"], ["Arial", 0, 18, "查看奖励内容", 0x88868A, false, 0]);
                return t;
            };
            __egretProto__.__41_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [380, 190, 30, 156]);
                t.elementsContent = [this.__8_i(), this.__9_i(), this.group1_i(), this.group2_i(), this.group3_i(), this.touchGroup_i()];
                return t;
            };
            __egretProto__.__42_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "开始比赛", false, 0]);
                return t;
            };
            __egretProto__.__43_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [249, 505]);
                t.elementsContent = [this.matchBtn_i(), this.__42_i()];
                return t;
            };
            __egretProto__.__44_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_match_player", 223, 144]);
                return t;
            };
            __egretProto__.__45_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.closeBtn_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__41_i(), this.__43_i(), this.__44_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [580, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "btn_match", 27, 13]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "比赛", 89, 22]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "比赛开放时间：\n每周一和周四，时间为24小时。", 30, 75]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "touchEnabled", "width"], [0x2C2930, 380, false, 190]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "奖励", 3, -35]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 387, 28]);
                return t;
            };
            __egretProto__.group1_i = function () {
                var t = new egret.gui.Group();
                this.group1 = t;
                this.__s(t, ["x", "y"], [46, 28]);
                t.layout = this.__19_i();
                t.elementsContent = [this.__10_i(), this.__14_i(), this.__18_i()];
                return t;
            };
            __egretProto__.group2_i = function () {
                var t = new egret.gui.Group();
                this.group2 = t;
                this.__s(t, ["x", "y"], [46, 138]);
                t.layout = this.__29_i();
                t.elementsContent = [this.__20_i(), this.__24_i(), this.__28_i()];
                return t;
            };
            __egretProto__.group3_i = function () {
                var t = new egret.gui.Group();
                this.group3 = t;
                this.__s(t, ["x", "y"], [46, 238]);
                t.layout = this.__30_i();
                t.elementsContent = [this.__31_i(), this.__35_i(), this.__39_i()];
                return t;
            };
            __egretProto__.matchBtn_i = function () {
                var t = new egret.gui.Button();
                this.matchBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 150]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "排名1", 0]);
                return t;
            };
            __egretProto__.touchGroup_i = function () {
                var t = new egret.gui.Group();
                this.touchGroup = t;
                this.__s(t, ["bottom", "height", "touchEnabled", "width"], [0, 60, true, 190]);
                t.elementsContent = [this.__40_i()];
                return t;
            };
            MatchStartPanelSkin._skinParts = ["closeBtn", "group1", "group2", "group3", "touchGroup", "matchBtn"];
            return MatchStartPanelSkin;
        })(egret.gui.Skin);
        dialog.MatchStartPanelSkin = MatchStartPanelSkin;
        MatchStartPanelSkin.prototype.__class__ = "skins.dialog.MatchStartPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
