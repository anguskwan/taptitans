var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildBadgeItemSelectSkin = (function (_super) {
            __extends(GuildBadgeItemSelectSkin, _super);
            function GuildBadgeItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [60, 60]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBadgeItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBadgeItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [60, 0, "guild_badge1", 0, 60]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 20, "王", "center", false, "middle", 4]);
                return t;
            };
            __egretProto__.selectRect_i = function () {
                var t = new egret.gui.Rect();
                this.selectRect = t;
                this.__s(t, ["fillColor", "height", "horizontalCenter", "touchEnabled", "verticalCenter", "width"], [0x997946, 60, 0, false, 0, 60]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "width"], [60, 0, false, false, 0, 60]);
                t.elementsContent = [this.selectRect_i(), this.iconImg_i(), this.nameLbl_i()];
                return t;
            };
            GuildBadgeItemSelectSkin._skinParts = ["selectRect", "iconImg", "nameLbl"];
            return GuildBadgeItemSelectSkin;
        })(egret.gui.Skin);
        components.GuildBadgeItemSelectSkin = GuildBadgeItemSelectSkin;
        GuildBadgeItemSelectSkin.prototype.__class__ = "skins.components.GuildBadgeItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
