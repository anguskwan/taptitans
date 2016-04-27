var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityProgressBarSkin = (function (_super) {
            __extends(ActivityProgressBarSkin, _super);
            function ActivityProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [15, 218]);
                this.elementsContent = [this.track_i(), this.thumb_i(), this.numLbl_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "verticalCenter"], [true, "Arial", 0, 16, "0", 0xFFFFFF, 0]);
                return t;
            };
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "source", "x", "y"], [true, "activity_progress", 0, 0]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["source", "x", "y"], ["activity_progress_bg", 0, 0]);
                return t;
            };
            ActivityProgressBarSkin._skinParts = ["track", "thumb", "numLbl"];
            return ActivityProgressBarSkin;
        })(egret.gui.Skin);
        components.ActivityProgressBarSkin = ActivityProgressBarSkin;
        ActivityProgressBarSkin.prototype.__class__ = "skins.components.ActivityProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
