var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildSettingLayerSkin = (function (_super) {
            __extends(GuildSettingLayerSkin, _super);
            function GuildSettingLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildSettingLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildSettingLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "确认修改", false, 0]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [50, 0, 150, 20, 419]);
                t.elementsContent = [this.rightBtn_i(), this.__11_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.nameLbl_i(), this.__7_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.setRect_i(), this.attLbl_i(), this.selectItem2_i(), this.selectItem1_i(), this.iconImg_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "top", "width"], [0x4E361F, 320, 0, 58, 465]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会设置", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "公会名称：", 0xFFFFFF, 97, 93]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "公会图标：", 0xFFFFFF, 97, 153]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "任何人都需要验证", 0xFFFFFF, 97, 213]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "战斗力", "center", 0xFFFFFF, "middle", 97, 283]);
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "textColor", "touchEnabled", "verticalAlign", "y"], [true, "Arial", 224, 18, "0", "center", 0xFFFFFF, false, "middle", 283]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 186, 135]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "公会", 0xFFFFFF, 197, 93]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.selectItem1_i = function () {
                var t = new uiskins.GuildSettingItemSelect();
                this.selectItem1 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildSettingItemSelectSkin, 293, 200]);
                return t;
            };
            __egretProto__.selectItem2_i = function () {
                var t = new uiskins.GuildSettingItemSelect();
                this.selectItem2 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.GuildSettingItemSelectSkin, 349, 272]);
                return t;
            };
            __egretProto__.setRect_i = function () {
                var t = new egret.gui.Rect();
                this.setRect = t;
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x271B0B, 40, 100, 160, 272]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "以上加入", "center", 0xFFFFFF, "middle", 266, 283]);
                return t;
            };
            GuildSettingLayerSkin._skinParts = ["closeBtn", "nameLbl", "setRect", "attLbl", "selectItem2", "selectItem1", "iconImg", "rightBtn"];
            return GuildSettingLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildSettingLayerSkin = GuildSettingLayerSkin;
        GuildSettingLayerSkin.prototype.__class__ = "skins.dialog.GuildSettingLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
