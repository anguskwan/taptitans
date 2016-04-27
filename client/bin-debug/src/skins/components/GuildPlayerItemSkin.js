var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildPlayerItemSkin = (function (_super) {
            __extends(GuildPlayerItemSkin, _super);
            function GuildPlayerItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [125, 208]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildPlayerItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildPlayerItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "height", "source", "verticalCenter", "width", "x"], [true, "scale", 14, "guild_icon_att", 0, 14, 374]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [76, 24]);
                t.layout = this.__3_i();
                t.elementsContent = [this.__4_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [1, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 12, "剩余英雄：", "center", 0xFFFFFF, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [76, 44]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.aliveHeroLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.bgImg_i(), this.iconImg_i(), this.iconAttImg1_i(), this.killHeroLbl1_i(), this.iconAttImg2_i(), this.killHeroLbl2_i(), this.nameLbl_i(), this.__5_i(), this.__8_i()];
                return t;
            };
            __egretProto__.aliveHeroLbl_i = function () {
                var t = new egret.gui.Label();
                this.aliveHeroLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 12, "0", "center", 0xFF0000, "middle", 0, 35, 20]);
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 14, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                t.source = "guild_war_item2";
                return t;
            };
            __egretProto__.iconAttImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconAttImg1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [50, "icon_default", 50, 74, 66]);
                return t;
            };
            __egretProto__.iconAttImg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconAttImg2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [50, "icon_default", 50, 134, 66]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 12, 15]);
                return t;
            };
            __egretProto__.killHeroLbl1_i = function () {
                var t = new egret.gui.Label();
                this.killHeroLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "stroke", "strokeColor", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 84, 18, 2, 0xFFFFFF, "0", "center", 0xFF0000, "middle", 97]);
                return t;
            };
            __egretProto__.killHeroLbl2_i = function () {
                var t = new egret.gui.Label();
                this.killHeroLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "stroke", "strokeColor", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 25, 18, 2, 0xFFFFFF, "0", "center", 0xFF0000, "middle", 97]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 12, "名字", "left", "middle", 76, 6]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            GuildPlayerItemSkin._skinParts = ["bgImg", "iconImg", "iconAttImg1", "killHeroLbl1", "iconAttImg2", "killHeroLbl2", "nameLbl", "attLbl", "aliveHeroLbl"];
            return GuildPlayerItemSkin;
        })(egret.gui.Skin);
        components.GuildPlayerItemSkin = GuildPlayerItemSkin;
        GuildPlayerItemSkin.prototype.__class__ = "skins.components.GuildPlayerItemSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
