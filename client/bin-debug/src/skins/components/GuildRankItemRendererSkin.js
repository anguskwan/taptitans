var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildRankItemRendererSkin = (function (_super) {
            __extends(GuildRankItemRendererSkin, _super);
            function GuildRankItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 455]);
                this.elementsContent = [this.__10_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildRankItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildRankItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_icon_att", 0, 374]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 279, 37]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_tip_member", 0, 374]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 153, 37]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.memberLbl_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 77, 4]);
                return t;
            };
            __egretProto__.itemRact_i = function () {
                var t = new egret.gui.Rect();
                this.itemRact = t;
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x352611, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "Lv.0", "center", 0xB96B2C, "middle", 281, 7]);
                return t;
            };
            __egretProto__.memberLbl_i = function () {
                var t = new egret.gui.Label();
                this.memberLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0/10", "center", 0x25FF3A, "middle", 0, 15]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, 150, 7]);
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
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.itemRact_i(), this.iconImg_i(), this.nameLbl_i(), this.lvLbl_i(), this.__6_i(), this.__9_i(), this.numLbl_i(), this.numImg_i()];
                return t;
            };
            GuildRankItemRendererSkin._skinParts = ["itemRact", "iconImg", "nameLbl", "lvLbl", "attLbl", "memberLbl", "numLbl", "numImg"];
            return GuildRankItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildRankItemRendererSkin = GuildRankItemRendererSkin;
        GuildRankItemRendererSkin.prototype.__class__ = "skins.components.GuildRankItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
