var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var HookPanelSkin = (function (_super) {
            __extends(HookPanelSkin, _super);
            function HookPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.hookGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HookPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HookPanelSkin._skinParts;
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
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "dialog_icon_line2", 63]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "dialog_icon_line2", 343]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "width", "y"], [0, "rank_line", 346, 198]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "挂机设置", 39, 29]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "width", "x", "y"], [true, "Arial", 16, "开启本功能后，可以自动给英雄升级，自动雇佣新的英雄，省去诸多操作，真是棒棒哒~", 0xB8B3BE, 320, 59, 129]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20, 20, 20]);
                return t;
            };
            __egretProto__.hookGroup_i = function () {
                var t = new egret.gui.Group();
                this.hookGroup = t;
                this.__s(t, ["x", "y"], [17, 28]);
                t.elementsContent = [this.__4_i(), this.closeBtn_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.hookLbl_i(), this.prestigeLbl_i(), this.select1_i(), this.select2_i(), this.textInput_i()];
                return t;
            };
            __egretProto__.hookLbl_i = function () {
                var t = new egret.gui.Label();
                this.hookLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "开始挂机", 59, 91]);
                return t;
            };
            __egretProto__.prestigeLbl_i = function () {
                var t = new egret.gui.Label();
                this.prestigeLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "自动蜕变", 59, 221]);
                return t;
            };
            __egretProto__.select1_i = function () {
                var t = new uiskins.SettingItemSelect();
                this.select1 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.SettingItemSelectSkin, 346, 83]);
                return t;
            };
            __egretProto__.select2_i = function () {
                var t = new uiskins.SettingItemSelect();
                this.select2 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.SettingItemSelectSkin, 346, 213]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "输入要蜕变的关卡数", 0xB8B3BE, 189, 290]);
                return t;
            };
            __egretProto__.textInput_i = function () {
                var t = new uiskins.SettingTextInput();
                this.textInput = t;
                this.__s(t, ["prompt", "skinName", "x", "y"], ["点此输入", skins.components.SettingTextInputSkin, 60, 278]);
                return t;
            };
            HookPanelSkin._skinParts = ["closeBtn", "hookLbl", "prestigeLbl", "select1", "select2", "textInput", "hookGroup"];
            return HookPanelSkin;
        })(egret.gui.Skin);
        dialog.HookPanelSkin = HookPanelSkin;
        HookPanelSkin.prototype.__class__ = "skins.dialog.HookPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
