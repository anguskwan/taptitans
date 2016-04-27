var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildHeroItemRendererSkin = (function (_super) {
            __extends(GuildHeroItemRendererSkin, _super);
            function GuildHeroItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [89, 451]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildHeroItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildHeroItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.leftItem_i = function () {
                var t = new uiskins.GuildHeroItem();
                this.leftItem = t;
                this.__s(t, ["left", "skinName"], [0, skins.components.GuildHeroItemSkin]);
                return t;
            };
            __egretProto__.rightItem_i = function () {
                var t = new uiskins.GuildHeroItem();
                this.rightItem = t;
                this.__s(t, ["right", "skinName"], [0, skins.components.GuildHeroItemSkin]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.leftItem_i(), this.rightItem_i()];
                return t;
            };
            GuildHeroItemRendererSkin._skinParts = ["leftItem", "rightItem"];
            return GuildHeroItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildHeroItemRendererSkin = GuildHeroItemRendererSkin;
        GuildHeroItemRendererSkin.prototype.__class__ = "skins.components.GuildHeroItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
