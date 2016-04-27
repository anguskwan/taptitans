var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildGoldSelectLayerSkin = (function (_super) {
            __extends(GuildGoldSelectLayerSkin, _super);
            function GuildGoldSelectLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.closeBtn_i(), this.selectGroup_i(), this.__16_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldSelectLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldSelectLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 140, 320]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 280, 320]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 0, 480]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 140, 480]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 280, 480]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0, 55]);
                t.elementsContent = [this.titleBtn_i(), this.titleLbl_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_gold_show_bg_png";
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                t.skinName = skins.components.GuildGoldItemSelectSkin;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 140, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 280, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 0, 160]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 140, 160]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 280, 160]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [1, new egret.gui.ButtonSkin("dialog_btn_cha_close_white", "dialog_btn_cha_close_white", "dialog_btn_cha_close_white"), 0, 10, 10]);
                return t;
            };
            __egretProto__.selectGroup_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [640, 0, 390, 109]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.__14_i(), this.__15_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new uiskins.GuildGoldItemSelect();
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildGoldItemSelectSkin, 0, 320]);
                return t;
            };
            __egretProto__.titleBtn_i = function () {
                var t = new egret.gui.Button();
                this.titleBtn = t;
                this.__s(t, ["enabled", "horizontalCenter", "skinName", "verticalCenter"], [false, 0, new egret.gui.ButtonSkin("guild_gold_btn_rank_on", "guild_gold_btn_rank_on", "guild_gold_btn_rank_off"), 0]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "touchEnabled", "verticalCenter"], ["Arial", 0, 24, "公会排行榜", 0xFFFFFF, false, 0]);
                return t;
            };
            GuildGoldSelectLayerSkin._skinParts = ["closeBtn", "selectGroup", "titleBtn", "titleLbl"];
            return GuildGoldSelectLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildGoldSelectLayerSkin = GuildGoldSelectLayerSkin;
        GuildGoldSelectLayerSkin.prototype.__class__ = "skins.dialog.GuildGoldSelectLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
