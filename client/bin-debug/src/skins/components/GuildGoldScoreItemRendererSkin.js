var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldScoreItemRendererSkin = (function (_super) {
            __extends(GuildGoldScoreItemRendererSkin, _super);
            function GuildGoldScoreItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 400]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldScoreItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldScoreItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 86, 5]);
                return t;
            };
            __egretProto__.itemRact_i = function () {
                var t = new egret.gui.Rect();
                this.itemRact = t;
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x3B363D, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "名字", "left", 0xFFFFFF, 163, 10]);
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 20, "0", "center", 0xB96B2C, "middle", 163, 43]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.itemRact_i(), this.nameLbl_i(), this.iconImg_i(), this.scoreLbl_i(), this.numLbl_i(), this.numImg_i()];
                return t;
            };
            GuildGoldScoreItemRendererSkin._skinParts = ["itemRact", "nameLbl", "iconImg", "scoreLbl", "numLbl", "numImg"];
            return GuildGoldScoreItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildGoldScoreItemRendererSkin = GuildGoldScoreItemRendererSkin;
        GuildGoldScoreItemRendererSkin.prototype.__class__ = "skins.components.GuildGoldScoreItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
