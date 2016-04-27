var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildPlayerItemRendererSkin = (function (_super) {
            __extends(GuildPlayerItemRendererSkin, _super);
            function GuildPlayerItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [125, 451]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildPlayerItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildPlayerItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.leftItem_i = function () {
                var t = new uiskins.GuildPlayerItem();
                this.leftItem = t;
                this.__s(t, ["left", "skinName", "touchChildren", "touchEnabled"], [0, skins.components.GuildPlayerItemSkin, false, true]);
                return t;
            };
            __egretProto__.rightItem_i = function () {
                var t = new uiskins.GuildPlayerItem();
                this.rightItem = t;
                this.__s(t, ["right", "skinName", "touchChildren", "touchEnabled"], [0, skins.components.GuildPlayerItemSkin, false, true]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.leftItem_i(), this.rightItem_i()];
                return t;
            };
            GuildPlayerItemRendererSkin._skinParts = ["leftItem", "rightItem"];
            return GuildPlayerItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildPlayerItemRendererSkin = GuildPlayerItemRendererSkin;
        GuildPlayerItemRendererSkin.prototype.__class__ = "skins.components.GuildPlayerItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
