var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildBagLayerSkin = (function (_super) {
            __extends(GuildBagLayerSkin, _super);
            function GuildBagLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__4_i(), this.__10_i(), this.currLbl_i(), this.sendList_i(), this.getList_i(), this.__15_i(), this.__18_i(), this.__21_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text"], ["Arial", 18, "发红包次数："]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [25, 129]);
                t.layout = this.__14_i();
                t.elementsContent = [this.__13_i(), this.redNumLbl_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "crystal", 212, 128]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 3;
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 129]);
                t.layout = this.__17_i();
                t.elementsContent = [this.__16_i(), this.crystalLbl_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "diamond", 212, 128]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 3;
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "y"], [43, 129]);
                t.layout = this.__20_i();
                t.elementsContent = [this.__19_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth"], [0, 0x605967, 100, 0, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x39363F, 626, 0, 466, 10, 117]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [50, 480, 182, 74]);
                t.elementsContent = [this.__6_i(), this.btnBack_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "left", "top"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [59, 480, 192, 84]);
                t.layout = this.__8_i();
                t.elementsContent = [this.sendToggleBtn_i(), this.getToggleBtn_i()];
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 4, 10, 10]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "touchEnabled", "y"], ["Arial", 0, 24, "当前没红包", 0x868686, false, 214]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFFFFFF, 10, 10]);
                return t;
            };
            __egretProto__.getList_i = function () {
                var t = new egret.gui.List();
                this.getList = t;
                this.__s(t, ["height", "horizontalCenter", "top", "useVirtualLayout", "width", "x"], [580, 0, 161, true, 466, 30]);
                t.layout = this.__12_i();
                return t;
            };
            __egretProto__.getToggleBtn_i = function () {
                var t = new uiskins.GuildBagGetToggleBtn();
                this.getToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [59, "切换按钮", skins.components.GuildBagGetToggleBtnSkin, 239, 370, 6]);
                return t;
            };
            __egretProto__.redNumLbl_i = function () {
                var t = new egret.gui.Label();
                this.redNumLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xF7343E, 10, 10]);
                return t;
            };
            __egretProto__.sendList_i = function () {
                var t = new egret.gui.List();
                this.sendList = t;
                this.__s(t, ["height", "horizontalCenter", "top", "useVirtualLayout", "width", "x", "y"], [580, 0, 161, true, 466, 20, 20]);
                t.layout = this.__11_i();
                return t;
            };
            __egretProto__.sendToggleBtn_i = function () {
                var t = new uiskins.GuildBagSendToggleBtn();
                this.sendToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [59, "切换按钮", skins.components.GuildBagSendToggleBtnSkin, 239, 22, 17]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "top", "percentWidth"], [110, 0, 0, 100]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__7_i(), this.__9_i()];
                return t;
            };
            GuildBagLayerSkin._skinParts = ["btnBack", "sendToggleBtn", "getToggleBtn", "currLbl", "sendList", "getList", "redNumLbl", "crystalLbl", "diamondLbl"];
            return GuildBagLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildBagLayerSkin = GuildBagLayerSkin;
        GuildBagLayerSkin.prototype.__class__ = "skins.dialog.GuildBagLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
