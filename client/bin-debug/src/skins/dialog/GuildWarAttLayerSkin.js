var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildWarAttLayerSkin = (function (_super) {
            __extends(GuildWarAttLayerSkin, _super);
            function GuildWarAttLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildWarAttLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildWarAttLayerSkin._skinParts;
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
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "返回", false, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x"], [10, 50, -180, 100, 30]);
                t.elementsContent = [this.backBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.titleLbl_i(), this.scoreLbl_i(), this.mineImg_i(), this.opponentImg_i(), this.nameMineLbl_i(), this.nameOpponentLbl_i(), this.attList_i(), this.__7_i(), this.attGroup_i()];
                return t;
            };
            __egretProto__.attBtn_i = function () {
                var t = new egret.gui.Button();
                this.attBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["enabled", "height", "skinName", "width"], [false, 50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 220]);
                return t;
            };
            __egretProto__.attGroup_i = function () {
                var t = new egret.gui.Group();
                this.attGroup = t;
                this.__s(t, ["x", "y"], [163, 695]);
                t.elementsContent = [this.attBtn_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "攻击 0/2", false, 0]);
                return t;
            };
            __egretProto__.attList_i = function () {
                var t = new egret.gui.List();
                this.attList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [524, 0.5, 451, 10, 147]);
                t.layout = this.__5_i();
                return t;
            };
            __egretProto__.backBtn_i = function () {
                var t = new egret.gui.Button();
                this.backBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_yellow", "dialog_btn_yellow", "dialog_btn_yellow"), 0, 100]);
                return t;
            };
            __egretProto__.mineImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.mineImg = t;
                this.__s(t, ["height", "left", "source", "width", "y"], [58, 101, "icon_default", 58, 31]);
                return t;
            };
            __egretProto__.nameMineLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameMineLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", -110, 18, "英雄", "center", "middle", 99]);
                return t;
            };
            __egretProto__.nameOpponentLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameOpponentLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, 18, "英雄", "center", "middle", 20, 99]);
                return t;
            };
            __egretProto__.opponentImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.opponentImg = t;
                this.__s(t, ["height", "right", "source", "width", "y"], [58, 101, "icon_default", 58, 32]);
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.scoreLbl = t;
                this.__s(t, ["font", "horizontalCenter", "scaleX", "scaleY", "text", "visible", "y"], ["font_white_fnt", 0, 1.6, 1.6, "0", false, 48]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "visible", "x", "y"], [true, "Arial", 0, 20, "杀死英雄数", 0xF7DDB9, false, 10, 9]);
                return t;
            };
            GuildWarAttLayerSkin._skinParts = ["titleLbl", "scoreLbl", "mineImg", "opponentImg", "nameMineLbl", "nameOpponentLbl", "attList", "backBtn", "attBtn", "attLbl", "attGroup"];
            return GuildWarAttLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildWarAttLayerSkin = GuildWarAttLayerSkin;
        GuildWarAttLayerSkin.prototype.__class__ = "skins.dialog.GuildWarAttLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
