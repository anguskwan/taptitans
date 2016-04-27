var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var ToastLayerSkin = (function (_super) {
            __extends(ToastLayerSkin, _super);
            function ToastLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [240, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ToastLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ToastLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [0, 22, 0, 480]);
                t.elementsContent = [this.__3_i(), this.descLbl_i()];
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "textColor", "verticalCenter"], [true, "Arial", 0, 18, 0xFF0000, 0]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            ToastLayerSkin._skinParts = ["descLbl"];
            return ToastLayerSkin;
        })(egret.gui.Skin);
        dialog.ToastLayerSkin = ToastLayerSkin;
        ToastLayerSkin.prototype.__class__ = "skins.dialog.ToastLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
