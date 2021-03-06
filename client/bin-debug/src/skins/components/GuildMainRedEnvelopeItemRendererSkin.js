var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMainRedEnvelopeItemRendererSkin = (function (_super) {
            __extends(GuildMainRedEnvelopeItemRendererSkin, _super);
            function GuildMainRedEnvelopeItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [148, 447]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMainRedEnvelopeItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMainRedEnvelopeItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.infoBtn_i()];
                return t;
            };
            __egretProto__.infoBtn_i = function () {
                var t = new egret.gui.Button();
                this.infoBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [34, new egret.gui.ButtonSkin("guild_btn_info", "guild_btn_info", "guild_btn_info"), 34, 402, 3]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_main_item_redenvelope";
                return t;
            };
            GuildMainRedEnvelopeItemRendererSkin._skinParts = ["infoBtn"];
            return GuildMainRedEnvelopeItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildMainRedEnvelopeItemRendererSkin = GuildMainRedEnvelopeItemRendererSkin;
        GuildMainRedEnvelopeItemRendererSkin.prototype.__class__ = "skins.components.GuildMainRedEnvelopeItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
