var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var EveryDayPanelSkin = (function (_super) {
            __extends(EveryDayPanelSkin, _super);
            function EveryDayPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EveryDayPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EveryDayPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [560, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 400, 0.5, 400, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "x", "y"], [0.5, 10, 463]);
                t.elementsContent = [this.rewardBtn_i(), this.rewardLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["dialog_everyday_icon", 228, 292]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.selectItem1_i(), this.selectItem2_i(), this.selectItem3_i(), this.selectItem4_i(), this.selectItem5_i(), this.selectItem6_i(), this.selectItem7_i(), this.titleImg_i(), this.__7_i()];
                return t;
            };
            __egretProto__.rewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.rewardBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 160]);
                return t;
            };
            __egretProto__.rewardLbl_i = function () {
                var t = new egret.gui.Label();
                this.rewardLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 24, "领取", false, 0]);
                return t;
            };
            __egretProto__.selectItem1_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem1 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 33, 32]);
                return t;
            };
            __egretProto__.selectItem2_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem2 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 163, 32]);
                return t;
            };
            __egretProto__.selectItem3_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem3 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 293, 32]);
                return t;
            };
            __egretProto__.selectItem4_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem4 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 33, 162]);
                return t;
            };
            __egretProto__.selectItem5_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem5 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 163, 162]);
                return t;
            };
            __egretProto__.selectItem6_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem6 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 293, 162]);
                return t;
            };
            __egretProto__.selectItem7_i = function () {
                var t = new uiskins.EveryDayItemSelect();
                this.selectItem7 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EveryDayItemSelectSkin, 33, 292]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.titleImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.titleImg = t;
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "dialog_everyday_title", -26]);
                return t;
            };
            EveryDayPanelSkin._skinParts = ["rewardBtn", "rewardLbl", "selectItem1", "selectItem2", "selectItem3", "selectItem4", "selectItem5", "selectItem6", "selectItem7", "titleImg"];
            return EveryDayPanelSkin;
        })(egret.gui.Skin);
        dialog.EveryDayPanelSkin = EveryDayPanelSkin;
        EveryDayPanelSkin.prototype.__class__ = "skins.dialog.EveryDayPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
