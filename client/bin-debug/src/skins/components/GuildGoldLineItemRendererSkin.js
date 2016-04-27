var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldLineItemRendererSkin = (function (_super) {
            __extends(GuildGoldLineItemRendererSkin, _super);
            function GuildGoldLineItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [26, 412]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldLineItemRendererSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0xF9BD1B, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalCenter"], [true, "Arial", 0, 30, ". . .", "left", 0xA6600E, -6.5]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i()];
                return t;
            };
            return GuildGoldLineItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildGoldLineItemRendererSkin = GuildGoldLineItemRendererSkin;
        GuildGoldLineItemRendererSkin.prototype.__class__ = "skins.components.GuildGoldLineItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
