var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildSettingItemSelectSkin = (function (_super) {
            __extends(GuildSettingItemSelectSkin, _super);
            function GuildSettingItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [40, 40]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildSettingItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildSettingItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [-1, "guild_select_on", -3.5]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "touchEnabled", "verticalCenter", "percentWidth"], [0x271B0B, 100, 0, false, 0, 100]);
                return t;
            };
            GuildSettingItemSelectSkin._skinParts = ["iconImg"];
            return GuildSettingItemSelectSkin;
        })(egret.gui.Skin);
        components.GuildSettingItemSelectSkin = GuildSettingItemSelectSkin;
        GuildSettingItemSelectSkin.prototype.__class__ = "skins.components.GuildSettingItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
