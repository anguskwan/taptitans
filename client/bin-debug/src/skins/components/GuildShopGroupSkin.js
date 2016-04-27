var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildShopGroupSkin = (function (_super) {
            __extends(GuildShopGroupSkin, _super);
            function GuildShopGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildShopGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildShopGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会商店", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "crystal", 0, 374]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter", "y"], [9, -310, 10]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.coinLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.shopList_i(), this.__5_i(), this.__8_i()];
                return t;
            };
            __egretProto__.coinLbl_i = function () {
                var t = new egret.gui.Label();
                this.coinLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 24, "0", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.shopList_i = function () {
                var t = new egret.gui.List();
                this.shopList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [620, 0, 451, 65]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 636, 0, 465, 58]);
                return t;
            };
            GuildShopGroupSkin._skinParts = ["shopList", "coinLbl"];
            return GuildShopGroupSkin;
        })(egret.gui.Skin);
        components.GuildShopGroupSkin = GuildShopGroupSkin;
        GuildShopGroupSkin.prototype.__class__ = "skins.components.GuildShopGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
