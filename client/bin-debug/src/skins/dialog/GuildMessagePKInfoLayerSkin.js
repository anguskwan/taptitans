var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildMessagePKInfoLayerSkin = (function (_super) {
            __extends(GuildMessagePKInfoLayerSkin, _super);
            function GuildMessagePKInfoLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__30_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessagePKInfoLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessagePKInfoLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 110, 268]);
                t.layout = this.__9_i();
                t.elementsContent = [this.__10_i(), this.attLeftLbl_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_tip_member", 0, 374]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 110, 300]);
                t.layout = this.__12_i();
                t.elementsContent = [this.__13_i(), this.memberLeftLbl_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [1, "center", "middle"]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "剩余英雄：", "center", 0xFFFFFF, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [331, 334]);
                t.layout = this.__15_i();
                t.elementsContent = [this.__16_i(), this.aliveHeroRightLbl_i()];
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_icon_att", 0, 374]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 331, 268]);
                t.layout = this.__18_i();
                t.elementsContent = [this.__19_i(), this.attRightLbl_i()];
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_tip_member", 0, 374]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 331, 300]);
                t.layout = this.__21_i();
                t.elementsContent = [this.__22_i(), this.memberRightLbl_i()];
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "x", "y"], [true, "Arial", -169.5, 20, "战争红利:", 0xB49268, 10, 484]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 18, "小提示：公会人数越多，越容易取得胜利！", "center", "middle", 708]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "icon_crystal", 526]);
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "领取", false, 0]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [40, 0, 100, 40, 622]);
                t.elementsContent = [this.getRewardBtn_i(), this.__27_i()];
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.titleLbl_i(), this.scoreLbl_i(), this.iconLeftImg_i(), this.nameLeftLbl_i(), this.warLeftLbl_i(), this.__8_i(), this.__11_i(), this.__14_i(), this.iconRightImg_i(), this.nameRightLbl_i(), this.warRightLbl_i(), this.__17_i(), this.__20_i(), this.__23_i(), this.__24_i(), this.__25_i(), this.crystalLbl_i(), this.__26_i(), this.__28_i()];
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.__29_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 400, 0, 465, 58]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x4E361F, 220, 0.5, 465, 10, 468]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [1, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "剩余英雄：", "center", 0xFFFFFF, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [110, 334]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.aliveHeroLeftLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.aliveHeroLeftLbl_i = function () {
                var t = new egret.gui.Label();
                this.aliveHeroLeftLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 18, "0", "center", 0xFF0000, "middle", 0, 35, 20]);
                return t;
            };
            __egretProto__.aliveHeroRightLbl_i = function () {
                var t = new egret.gui.Label();
                this.aliveHeroRightLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 18, "0", "center", 0xFF0000, "middle", 0, 35, 20]);
                return t;
            };
            __egretProto__.attLeftLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLeftLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.attRightLbl_i = function () {
                var t = new egret.gui.Label();
                this.attRightLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 0, 18, "0", "center", "middle", 10, 590]);
                return t;
            };
            __egretProto__.getRewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.getRewardBtn = t;
                this.__s(t, ["enabled", "height", "horizontalCenter", "skinName", "verticalCenter", "width"], [false, 40, 0, new egret.gui.ButtonSkin("dialog_btn_yellow", "dialog_btn_yellow", "dialog_btn_disabled"), 0, 100]);
                return t;
            };
            __egretProto__.iconLeftImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconLeftImg = t;
                this.__s(t, ["left", "scaleX", "scaleY", "skinName", "y"], [100, 0.67, 0.67, skins.components.GuildBadgeItemSkin, 158]);
                return t;
            };
            __egretProto__.iconRightImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconRightImg = t;
                this.__s(t, ["right", "scaleX", "scaleY", "skinName", "y"], [100, 0.67, 0.67, skins.components.GuildBadgeItemSkin, 158]);
                return t;
            };
            __egretProto__.memberLeftLbl_i = function () {
                var t = new egret.gui.Label();
                this.memberLeftLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0/10", "center", 0x25FF3A, "middle", 0, 15]);
                return t;
            };
            __egretProto__.memberRightLbl_i = function () {
                var t = new egret.gui.Label();
                this.memberRightLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0/10", "center", 0x25FF3A, "middle", 0, 15]);
                return t;
            };
            __egretProto__.nameLeftLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLeftLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", -109, 18, "公会", "center", "middle", 232]);
                return t;
            };
            __egretProto__.nameRightLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameRightLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 112, 18, "公会", "center", "middle", 232]);
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.scoreLbl = t;
                this.__s(t, ["font", "horizontalCenter", "scaleX", "scaleY", "text", "y"], ["font_white_fnt", -0.19999999999998863, 1.6, 1.6, "0:0", 73]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_icon_att", 0, 374]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "textColor", "y"], [true, "Arial", 0, 24, 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.warLeftLbl_i = function () {
                var t = new egret.gui.Label();
                this.warLeftLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "textColor", "x", "y"], [true, "Arial", -109, 20, 0xB49268, 20, 124]);
                return t;
            };
            __egretProto__.warRightLbl_i = function () {
                var t = new egret.gui.Label();
                this.warRightLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "textColor", "x", "y"], [true, "Arial", 110, 20, 0xB49268, 30, 124]);
                return t;
            };
            GuildMessagePKInfoLayerSkin._skinParts = ["closeBtn", "titleLbl", "scoreLbl", "iconLeftImg", "nameLeftLbl", "warLeftLbl", "aliveHeroLeftLbl", "attLeftLbl", "memberLeftLbl", "iconRightImg", "nameRightLbl", "warRightLbl", "aliveHeroRightLbl", "attRightLbl", "memberRightLbl", "crystalLbl", "getRewardBtn"];
            return GuildMessagePKInfoLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildMessagePKInfoLayerSkin = GuildMessagePKInfoLayerSkin;
        GuildMessagePKInfoLayerSkin.prototype.__class__ = "skins.dialog.GuildMessagePKInfoLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
