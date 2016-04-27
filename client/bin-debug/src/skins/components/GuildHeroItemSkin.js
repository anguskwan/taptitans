var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildHeroItemSkin = (function (_super) {
            __extends(GuildHeroItemSkin, _super);
            function GuildHeroItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [89, 211]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildHeroItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildHeroItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "right", "bottom"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "DPS:", 81, 29]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["x", "y"], [76, 33]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__5_i(), this.dpsLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "装备克制:", 91, 39]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.nameLbl_i(), this.__6_i(), this.equipGroup_i(), this.deadRect_i(), this.victoryImg_i(), this.tombstoneImg_i()];
                return t;
            };
            __egretProto__.deadRect_i = function () {
                var t = new egret.gui.Rect();
                this.deadRect = t;
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "visible", "percentWidth"], [0.4, 0xFF0000, 100, false, 100]);
                return t;
            };
            __egretProto__.dpsLbl_i = function () {
                var t = new egret.gui.Label();
                this.dpsLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 12, "0", "right", 0xFF7F01, 34, 39]);
                return t;
            };
            __egretProto__.equipGroup_i = function () {
                var t = new egret.gui.Group();
                this.equipGroup = t;
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["visible", "x", "y"], [false, 76, 55]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.equipLbl_i()];
                return t;
            };
            __egretProto__.equipLbl_i = function () {
                var t = new egret.gui.Label();
                this.equipLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "stroke", "strokeColor", "text", "textColor", "x", "y"], [true, "Arial", 12, 1, 0xFFFFFF, "0", 0xFF0000, 81, 29]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 12, 15]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 12, "名字", "left", "middle", 76, 12]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_war_item";
                return t;
            };
            __egretProto__.tombstoneImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.tombstoneImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["tip_hero_tombstone", false, 159, 27]);
                return t;
            };
            __egretProto__.victoryImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.victoryImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["guild_icon_victory", false, 152, 21]);
                return t;
            };
            GuildHeroItemSkin._skinParts = ["iconImg", "nameLbl", "dpsLbl", "equipLbl", "equipGroup", "deadRect", "victoryImg", "tombstoneImg"];
            return GuildHeroItemSkin;
        })(egret.gui.Skin);
        components.GuildHeroItemSkin = GuildHeroItemSkin;
        GuildHeroItemSkin.prototype.__class__ = "skins.components.GuildHeroItemSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
