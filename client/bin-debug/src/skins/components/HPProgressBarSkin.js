var skins;
(function (skins) {
    var components;
    (function (components) {
        var HPProgressBarSkin = (function (_super) {
            __extends(HPProgressBarSkin, _super);
            function HPProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.height = 15;
                this.elementsContent = [this.track_i(), this.thumb_i(), this.labelDisplay_i(), this.nameLbl_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HPProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HPProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "textColor", "verticalCenter"], [true, "Arial", 0, 12, 0x000000, 0]);
                return t;
            };
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "textColor", "verticalCenter"], [true, "Arial", 10, 12, 0x000000, 0.5]);
                return t;
            };
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "horizontalCenter", "source", "verticalCenter"], [true, 0, "progress_bar", 0]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "progress_bg", 0]);
                return t;
            };
            HPProgressBarSkin._skinParts = ["track", "thumb", "labelDisplay", "nameLbl"];
            return HPProgressBarSkin;
        })(egret.gui.Skin);
        components.HPProgressBarSkin = HPProgressBarSkin;
        HPProgressBarSkin.prototype.__class__ = "skins.components.HPProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
