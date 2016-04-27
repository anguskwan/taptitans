var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildHeroCompleteItemRendererSkin = (function (_super) {
            __extends(GuildHeroCompleteItemRendererSkin, _super);
            function GuildHeroCompleteItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [102, 451]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildHeroCompleteItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildHeroCompleteItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.killNumLbl_i()];
                return t;
            };
            __egretProto__.killNumLbl_i = function () {
                var t = new egret.gui.Label();
                this.killNumLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 0, 50, "0", "center", 0xF67227, "middle", 12]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source"], [0, "guild_icon_kill"]);
                return t;
            };
            GuildHeroCompleteItemRendererSkin._skinParts = ["killNumLbl"];
            return GuildHeroCompleteItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildHeroCompleteItemRendererSkin = GuildHeroCompleteItemRendererSkin;
        GuildHeroCompleteItemRendererSkin.prototype.__class__ = "skins.components.GuildHeroCompleteItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
