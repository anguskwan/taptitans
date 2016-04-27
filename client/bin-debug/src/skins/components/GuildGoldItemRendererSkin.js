var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldItemRendererSkin = (function (_super) {
            __extends(GuildGoldItemRendererSkin, _super);
            function GuildGoldItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 436]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "pk_icon_pk", 0, 374]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 169, 37]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__5_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.itemRact_i(), this.nameLbl_i(), this.iconImg_i(), this.guildNameLbl_i(), this.scoreLbl_i(), this.__6_i(), this.numLbl_i(), this.numImg_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.guildNameLbl_i = function () {
                var t = new egret.gui.Label();
                this.guildNameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "0", "center", 0xB96B2C, "middle", 285, 8]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 92, 7]);
                return t;
            };
            __egretProto__.itemRact_i = function () {
                var t = new egret.gui.Rect();
                this.itemRact = t;
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x28221B, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "名字", "left", 0xFFFFFF, 169, 5]);
                return t;
            };
            __egretProto__.numImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.numImg = t;
                this.__s(t, ["source", "x", "y"], ["rank_num1", 20, 15]);
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "x", "y"], [true, "Arial", 24, "100", "center", 22, 23.5]);
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.Label();
                this.scoreLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "0", "center", 0xB96B2C, "middle", 285, 40]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            GuildGoldItemRendererSkin._skinParts = ["itemRact", "nameLbl", "iconImg", "guildNameLbl", "scoreLbl", "attLbl", "numLbl", "numImg"];
            return GuildGoldItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildGoldItemRendererSkin = GuildGoldItemRendererSkin;
        GuildGoldItemRendererSkin.prototype.__class__ = "skins.components.GuildGoldItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
