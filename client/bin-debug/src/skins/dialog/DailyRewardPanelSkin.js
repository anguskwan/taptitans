var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var DailyRewardPanelSkin = (function (_super) {
            __extends(DailyRewardPanelSkin, _super);
            function DailyRewardPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 447]);
                this.elementsContent = [this.__20_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DailyRewardPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DailyRewardPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_daily_diamond", 17, 43]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "dialog_daily_btn1_bg";
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "3", 0xC68D12, 6, 7]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_daily_diamond", 17, 43]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "dialog_daily_btn1_bg";
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "4", 0xC68D12, 6, 7]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_daily_diamond", 17, 43]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x"], ["dialog_daily_btn2_bg", 1]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "5", 0xC68D12, 6, 7]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.closeBtn_i(), this.__5_i(), this.selectGroup1_i(), this.selectGroup2_i(), this.selectGroup3_i(), this.selectGroup4_i(), this.selectGroup5_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [650, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "dialog_daily_title_bg", 17]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_daily_title", 151, 29]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "dialog_daily_btn1_bg";
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "1", 0xC68D12, 6, 7]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_daily_diamond", 17, 43]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "dialog_daily_btn1_bg";
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 387, 28]);
                return t;
            };
            __egretProto__.numLbl1_i = function () {
                var t = new egret.gui.Label();
                this.numLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "x15", 78, 46]);
                return t;
            };
            __egretProto__.numLbl2_i = function () {
                var t = new egret.gui.Label();
                this.numLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "x30", 78, 46]);
                return t;
            };
            __egretProto__.numLbl3_i = function () {
                var t = new egret.gui.Label();
                this.numLbl3 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "x45", 78, 46]);
                return t;
            };
            __egretProto__.numLbl4_i = function () {
                var t = new egret.gui.Label();
                this.numLbl4 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "x60", 78, 46]);
                return t;
            };
            __egretProto__.numLbl5_i = function () {
                var t = new egret.gui.Label();
                this.numLbl5 = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", -1.5, 24, "0", "center", 0x0D0A10, "middle", 14]);
                return t;
            };
            __egretProto__.selectGroup1_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup1 = t;
                this.__s(t, ["height", "touchChildren", "touchEnabled", "width", "x", "y"], [145, false, true, 160, 40, 107]);
                t.elementsContent = [this.__6_i(), this.__7_i(), this.__8_i(), this.numLbl1_i(), this.selectImg1_i(), this.selectOffImg1_i()];
                return t;
            };
            __egretProto__.selectGroup2_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup2 = t;
                this.__s(t, ["height", "right", "touchChildren", "touchEnabled", "width", "y"], [145, 40, false, true, 160, 107]);
                t.elementsContent = [this.__9_i(), this.__10_i(), this.__11_i(), this.numLbl2_i(), this.selectImg2_i(), this.selectOffImg2_i()];
                return t;
            };
            __egretProto__.selectGroup3_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup3 = t;
                this.__s(t, ["height", "touchChildren", "touchEnabled", "width", "x", "y"], [145, false, true, 160, 40, 287]);
                t.elementsContent = [this.__12_i(), this.__13_i(), this.__14_i(), this.numLbl3_i(), this.selectImg3_i(), this.selectOffImg3_i()];
                return t;
            };
            __egretProto__.selectGroup4_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup4 = t;
                this.__s(t, ["height", "right", "touchChildren", "touchEnabled", "width", "y"], [145, 40, false, true, 160, 287]);
                t.elementsContent = [this.__15_i(), this.__16_i(), this.__17_i(), this.numLbl4_i(), this.selectImg4_i(), this.selectOffImg4_i()];
                return t;
            };
            __egretProto__.selectGroup5_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup5 = t;
                this.__s(t, ["horizontalCenter", "touchChildren", "touchEnabled", "y"], [0, false, true, 467]);
                t.elementsContent = [this.__18_i(), this.__19_i(), this.numLbl5_i(), this.selectImg5_i(), this.selectOffImg5_i()];
                return t;
            };
            __egretProto__.selectImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg1 = t;
                this.__s(t, ["source", "x", "y"], ["dialog_daily_select", 43, 100]);
                return t;
            };
            __egretProto__.selectImg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg2 = t;
                this.__s(t, ["source", "x", "y"], ["dialog_daily_select", 43, 100]);
                return t;
            };
            __egretProto__.selectImg3_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg3 = t;
                this.__s(t, ["source", "x", "y"], ["dialog_daily_select", 43, 100]);
                return t;
            };
            __egretProto__.selectImg4_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg4 = t;
                this.__s(t, ["source", "x", "y"], ["dialog_daily_select", 43, 100]);
                return t;
            };
            __egretProto__.selectImg5_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg5 = t;
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "dialog_daily_select", 100]);
                return t;
            };
            __egretProto__.selectOffImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectOffImg1 = t;
                t.source = "dialog_daily_btn1_off";
                return t;
            };
            __egretProto__.selectOffImg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectOffImg2 = t;
                t.source = "dialog_daily_btn1_off";
                return t;
            };
            __egretProto__.selectOffImg3_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectOffImg3 = t;
                t.source = "dialog_daily_btn1_off";
                return t;
            };
            __egretProto__.selectOffImg4_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectOffImg4 = t;
                t.source = "dialog_daily_btn1_off";
                return t;
            };
            __egretProto__.selectOffImg5_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectOffImg5 = t;
                this.__s(t, ["source", "x"], ["dialog_daily_btn2_off", 0]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "2", 0xC68D12, 6, 7]);
                return t;
            };
            DailyRewardPanelSkin._skinParts = ["closeBtn", "numLbl1", "selectImg1", "selectOffImg1", "selectGroup1", "numLbl2", "selectImg2", "selectOffImg2", "selectGroup2", "numLbl3", "selectImg3", "selectOffImg3", "selectGroup3", "numLbl4", "selectImg4", "selectOffImg4", "selectGroup4", "numLbl5", "selectImg5", "selectOffImg5", "selectGroup5"];
            return DailyRewardPanelSkin;
        })(egret.gui.Skin);
        dialog.DailyRewardPanelSkin = DailyRewardPanelSkin;
        DailyRewardPanelSkin.prototype.__class__ = "skins.dialog.DailyRewardPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
