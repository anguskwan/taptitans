var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildLvUpMVPTitleItemRendererSkin = (function (_super) {
            __extends(GuildLvUpMVPTitleItemRendererSkin, _super);
            function GuildLvUpMVPTitleItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [50, 455]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLvUpMVPTitleItemRendererSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "percentWidth"], [0, 0x4E3A1F, 36, 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalCenter"], [true, "Arial", 0.5, 24, "捐献排行榜", "left", 0xDCB47B, 10.5]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i()];
                return t;
            };
            return GuildLvUpMVPTitleItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildLvUpMVPTitleItemRendererSkin = GuildLvUpMVPTitleItemRendererSkin;
        GuildLvUpMVPTitleItemRendererSkin.prototype.__class__ = "skins.components.GuildLvUpMVPTitleItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
