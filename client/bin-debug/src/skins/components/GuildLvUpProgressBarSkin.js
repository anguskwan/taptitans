var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildLvUpProgressBarSkin = (function (_super) {
            __extends(GuildLvUpProgressBarSkin, _super);
            function GuildLvUpProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [7, 286]);
                this.elementsContent = [this.track_i(), this.thumb_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLvUpProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildLvUpProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "source", "x", "y"], [true, "guild_lvup_progress", 0, 0]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["source", "x", "y"], ["guild_lvup_progress_bg", 0, 0]);
                return t;
            };
            GuildLvUpProgressBarSkin._skinParts = ["track", "thumb"];
            return GuildLvUpProgressBarSkin;
        })(egret.gui.Skin);
        components.GuildLvUpProgressBarSkin = GuildLvUpProgressBarSkin;
        GuildLvUpProgressBarSkin.prototype.__class__ = "skins.components.GuildLvUpProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
