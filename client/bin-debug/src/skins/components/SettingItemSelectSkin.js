var skins;
(function (skins) {
    var components;
    (function (components) {
        var SettingItemSelectSkin = (function (_super) {
            __extends(SettingItemSelectSkin, _super);
            function SettingItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [40, 40]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = SettingItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SettingItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "dialog_select_on", -1]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "touchEnabled", "verticalCenter", "width"], [0x2C2931, 32, 0, false, 0, 32]);
                return t;
            };
            SettingItemSelectSkin._skinParts = ["iconImg"];
            return SettingItemSelectSkin;
        })(egret.gui.Skin);
        components.SettingItemSelectSkin = SettingItemSelectSkin;
        SettingItemSelectSkin.prototype.__class__ = "skins.components.SettingItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
