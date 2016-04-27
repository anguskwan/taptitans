var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildCreateGroupSkin = (function (_super) {
            __extends(GuildCreateGroupSkin, _super);
            function GuildCreateGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [620, 465]);
                this.elementsContent = [this.__15_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildCreateGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildCreateGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "战斗力", "center", 0xFFFFFF, "middle", 88, 263]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "以上加入", "center", 0xFFFFFF, "middle", 257, 263]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "创建公会", false, 0]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [50, 0.5, 150, 10, 430]);
                t.elementsContent = [this.createBtn_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__9_i(), this.iconImg_i(), this.textInput_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.setRect_i(), this.attLbl_i(), this.selectItem2_i(), this.selectItem1_i(), this.__14_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x352611, 380, 0, 455, 4]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "公会名称：", 0xFFFFFF, 87, 54]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "公会图标：", 0xFFFFFF, 87, 134]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "创建费用：", 0xB96B2C, 87, 323]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.7, 0.7, "diamond", 0, 374]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 177, 321]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__7_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "touchEnabled", "verticalAlign", "x", "y"], [true, "Arial", 217, 18, "0", "center", 0xFFFFFF, false, "middle", 10, 263]);
                return t;
            };
            __egretProto__.createBtn_i = function () {
                var t = new egret.gui.Button();
                this.createBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_disabled"), 0, 150]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "300", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 176, 116]);
                return t;
            };
            __egretProto__.selectItem1_i = function () {
                var t = new uiskins.GuildSettingItemSelect();
                this.selectItem1 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildSettingItemSelectSkin, 284, 180]);
                return t;
            };
            __egretProto__.selectItem2_i = function () {
                var t = new uiskins.GuildSettingItemSelect();
                this.selectItem2 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildSettingItemSelectSkin, 340, 252]);
                return t;
            };
            __egretProto__.setRect_i = function () {
                var t = new egret.gui.Rect();
                this.setRect = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x271B0B, 40, 100, 151, 252]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "任何人都需要验证", 0xFFFFFF, 88, 193]);
                return t;
            };
            __egretProto__.textInput_i = function () {
                var t = new uiskins.GuildTextInput();
                this.textInput = t;
                this.__s(t, ["height", "skinName", "x", "y"], [40, skins.components.GuildTextInputSkin, 176, 45]);
                return t;
            };
            GuildCreateGroupSkin._skinParts = ["diamondLbl", "iconImg", "textInput", "setRect", "attLbl", "selectItem2", "selectItem1", "createBtn"];
            return GuildCreateGroupSkin;
        })(egret.gui.Skin);
        components.GuildCreateGroupSkin = GuildCreateGroupSkin;
        GuildCreateGroupSkin.prototype.__class__ = "skins.components.GuildCreateGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
