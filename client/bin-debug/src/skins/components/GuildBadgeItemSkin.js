var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildBadgeItemSkin = (function (_super) {
            __extends(GuildBadgeItemSkin, _super);
            function GuildBadgeItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [90, 90]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBadgeItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBadgeItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [90, 0, "guild_badge1", 0, 90]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 32, "王", "center", false, "middle", 5]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.iconImg_i(), this.nameLbl_i()];
                return t;
            };
            GuildBadgeItemSkin._skinParts = ["iconImg", "nameLbl"];
            return GuildBadgeItemSkin;
        })(egret.gui.Skin);
        components.GuildBadgeItemSkin = GuildBadgeItemSkin;
        GuildBadgeItemSkin.prototype.__class__ = "skins.components.GuildBadgeItemSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
