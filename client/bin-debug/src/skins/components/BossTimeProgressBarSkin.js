var skins;
(function (skins) {
    var components;
    (function (components) {
        var BossTimeProgressBarSkin = (function (_super) {
            __extends(BossTimeProgressBarSkin, _super);
            function BossTimeProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [4, 193]);
                this.elementsContent = [this.track_i(), this.thumb_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BossTimeProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BossTimeProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "horizontalCenter", "source", "verticalCenter", "x", "y"], [true, 0, "common_bosstime", 0, 10, 10]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter", "visible", "x", "y"], [0, "common_bosstime", 0, false, 10, 10]);
                return t;
            };
            BossTimeProgressBarSkin._skinParts = ["track", "thumb"];
            return BossTimeProgressBarSkin;
        })(egret.gui.Skin);
        components.BossTimeProgressBarSkin = BossTimeProgressBarSkin;
        BossTimeProgressBarSkin.prototype.__class__ = "skins.components.BossTimeProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
