var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var LoadingLayerSkin = (function (_super) {
            __extends(LoadingLayerSkin, _super);
            function LoadingLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.loadingImg_i()];
                return t;
            };
            __egretProto__.loadingImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.loadingImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "icon_loading", 0]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0.5, 0x000000, 100, 0, 0, 100]);
                return t;
            };
            LoadingLayerSkin._skinParts = ["loadingImg"];
            return LoadingLayerSkin;
        })(egret.gui.Skin);
        dialog.LoadingLayerSkin = LoadingLayerSkin;
        LoadingLayerSkin.prototype.__class__ = "skins.dialog.LoadingLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
