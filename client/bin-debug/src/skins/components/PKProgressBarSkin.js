var skins;
(function (skins) {
    var components;
    (function (components) {
        var PKProgressBarSkin = (function (_super) {
            __extends(PKProgressBarSkin, _super);
            function PKProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [16, 237]);
                this.elementsContent = [this.__3_i(), this.track_i(), this.thumb_i(), this.numLbl_i(), this.point2_i(), this.point1_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "verticalCenter"], [true, "Arial", 0, 16, "0%", 0xFFFFFF, 0]);
                return t;
            };
            __egretProto__.point1_i = function () {
                var t = new egret.gui.UIAsset();
                this.point1 = t;
                this.__s(t, ["source", "x", "y"], ["pk_morale_point", 63.1, 0]);
                return t;
            };
            __egretProto__.point2_i = function () {
                var t = new egret.gui.UIAsset();
                this.point2 = t;
                this.__s(t, ["source", "x", "y"], ["pk_morale_point", 156.9, 0]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "pk_progress_bg", 0]);
                return t;
            };
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "source", "x", "y"], [true, "pk_progress_green", 0, 0]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["height", "source", "visible", "width"], [16, "progress_bg", false, 237]);
                return t;
            };
            PKProgressBarSkin._skinParts = ["track", "thumb", "numLbl", "point2", "point1"];
            return PKProgressBarSkin;
        })(egret.gui.Skin);
        components.PKProgressBarSkin = PKProgressBarSkin;
        PKProgressBarSkin.prototype.__class__ = "skins.components.PKProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
