var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildBadgePanelSkin = (function (_super) {
            __extends(GuildBadgePanelSkin, _super);
            function GuildBadgePanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__19_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBadgePanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBadgePanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 290, 10]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 10, 80]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 80, 80]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 150, 80]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 220, 80]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 290, 80]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "确定", false, 0]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0.5, 241]);
                t.elementsContent = [this.rightBtn_i(), this.__17_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.closeBtn_i(), this.__6_i(), this.selectGroup_i(), this.__18_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "x", "y"], [310, egret.gui.getScale9Grid("55,53,337,324"), "guild_popup", 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "选择公会徽章", 29, 26]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 150, -0.5, 360, 71]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 10, 10]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 80, 10]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 150, 10]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [24, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 19, 10, 10]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 120]);
                return t;
            };
            __egretProto__.selectGroup_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [150, 360, 23, 69]);
                t.elementsContent = [this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.__15_i(), this.__16_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new uiskins.GuildBadgeItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildBadgeItemSelectSkin, 220, 10]);
                return t;
            };
            GuildBadgePanelSkin._skinParts = ["closeBtn", "selectGroup", "rightBtn"];
            return GuildBadgePanelSkin;
        })(egret.gui.Skin);
        dialog.GuildBadgePanelSkin = GuildBadgePanelSkin;
        GuildBadgePanelSkin.prototype.__class__ = "skins.dialog.GuildBadgePanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
