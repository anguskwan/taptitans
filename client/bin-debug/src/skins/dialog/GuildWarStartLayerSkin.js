var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildWarStartLayerSkin = (function (_super) {
            __extends(GuildWarStartLayerSkin, _super);
            function GuildWarStartLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildWarStartLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildWarStartLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "top", "width"], [0x4E361F, 540, 0.5, 140, 465]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "x", "y"], [true, "Arial", 0, 20, "存活英雄数", 0xF7DDB9, 10, 9]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "返回", false, 0]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x"], [10, 50, -180, 100, 30]);
                t.elementsContent = [this.backBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.scoreLbl_i(), this.nameMineLbl_i(), this.nameOpponentLbl_i(), this.mineImg_i(), this.opponentImg_i(), this.playersList_i(), this.__8_i()];
                return t;
            };
            __egretProto__.backBtn_i = function () {
                var t = new egret.gui.Button();
                this.backBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_yellow", "dialog_btn_yellow", "dialog_btn_yellow"), 0, 100]);
                return t;
            };
            __egretProto__.mineImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.mineImg = t;
                this.__s(t, ["left", "scaleX", "scaleY", "skinName", "width", "y"], [80, 0.67, 0.67, skins.components.GuildBadgeItemSkin, 90, 28]);
                return t;
            };
            __egretProto__.nameMineLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameMineLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", -130, 18, "公会", "center", "middle", 99]);
                return t;
            };
            __egretProto__.nameOpponentLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameOpponentLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 130, 18, "公会", "center", "middle", 20, 99]);
                return t;
            };
            __egretProto__.opponentImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.opponentImg = t;
                this.__s(t, ["right", "scaleX", "scaleY", "skinName", "width", "y"], [80, 0.67, 0.67, skins.components.GuildBadgeItemSkin, 90, 28]);
                return t;
            };
            __egretProto__.playersList_i = function () {
                var t = new egret.gui.List();
                this.playersList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [524, 0.5, 451, 10, 147]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.scoreLbl = t;
                this.__s(t, ["font", "horizontalCenter", "scaleX", "scaleY", "text", "y"], ["font_white_fnt", 0, 1.6, 1.6, "0:0", 48]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            GuildWarStartLayerSkin._skinParts = ["scoreLbl", "nameMineLbl", "nameOpponentLbl", "mineImg", "opponentImg", "playersList", "backBtn"];
            return GuildWarStartLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildWarStartLayerSkin = GuildWarStartLayerSkin;
        GuildWarStartLayerSkin.prototype.__class__ = "skins.dialog.GuildWarStartLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
