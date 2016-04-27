var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildLvUpMVPItemRendererSkin = (function (_super) {
            __extends(GuildLvUpMVPItemRendererSkin, _super);
            function GuildLvUpMVPItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 455]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLvUpMVPItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildLvUpMVPItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.contributionLbl_i = function () {
                var t = new egret.gui.Label();
                this.contributionLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 20, "0", "center", 0xB96B2C, "middle", 385, 23]);
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
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "名字", "left", 0xFFFFFF, 163, 23]);
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
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalCenter"], [true, "Arial", -186, 24, "100", "center", 0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.itemRact_i(), this.nameLbl_i(), this.iconImg_i(), this.contributionLbl_i(), this.numLbl_i(), this.numImg_i()];
                return t;
            };
            GuildLvUpMVPItemRendererSkin._skinParts = ["itemRact", "nameLbl", "iconImg", "contributionLbl", "numLbl", "numImg"];
            return GuildLvUpMVPItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildLvUpMVPItemRendererSkin = GuildLvUpMVPItemRendererSkin;
        GuildLvUpMVPItemRendererSkin.prototype.__class__ = "skins.components.GuildLvUpMVPItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
