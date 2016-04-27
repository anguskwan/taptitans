var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var EquipInfoPanelSkin = (function (_super) {
            __extends(EquipInfoPanelSkin, _super);
            function EquipInfoPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipInfoPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipInfoPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [520, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 360, 394, 28, 56]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["size", "text", "x", "y"], [18, "装备说明", 29, 18]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 10;
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_icon_heros", 29, 395]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.scroller_i(), this.closeBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 432]);
                return t;
            };
            __egretProto__.scroller_i = function () {
                var t = new egret.gui.Scroller();
                this.scroller = t;
                this.__s(t, ["height", "horizontalCenter", "scrollSpeed", "top", "width", "x"], [340, 0.5, 0.1, 65, 380, 10]);
                t.viewport = this.textGroup_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.textGroup_i = function () {
                var t = new egret.gui.Group();
                this.textGroup = t;
                this.__s(t, ["touchChildren", "touchEnabled"], [false, false]);
                t.layout = this.__7_i();
                return t;
            };
            EquipInfoPanelSkin._skinParts = ["textGroup", "scroller", "closeBtn"];
            return EquipInfoPanelSkin;
        })(egret.gui.Skin);
        dialog.EquipInfoPanelSkin = EquipInfoPanelSkin;
        EquipInfoPanelSkin.prototype.__class__ = "skins.dialog.EquipInfoPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
