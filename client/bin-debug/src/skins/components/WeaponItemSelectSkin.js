var skins;
(function (skins) {
    var components;
    (function (components) {
        var WeaponItemSelectSkin = (function (_super) {
            __extends(WeaponItemSelectSkin, _super);
            function WeaponItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [54, 54]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WeaponItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WeaponItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.disabledRect_i = function () {
                var t = new egret.gui.Rect();
                this.disabledRect = t;
                t.setStyle("textColor", 0xFFFFFF);
                this.__s(t, ["fillAlpha", "fillColor", "height", "horizontalCenter", "verticalCenter", "width", "x", "y"], [0.8, 0x000000, 50, 0, 0, 50, 10, 10]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["horizontalCenter", "scaleX", "scaleY", "source", "verticalCenter"], [0, 0.78, 0.78, "heroskill1_1", 0]);
                return t;
            };
            __egretProto__.selectRect_i = function () {
                var t = new egret.gui.Rect();
                this.selectRect = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [54, 0, 0, 54]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "width"], [54, 0, false, false, 0, 54]);
                t.elementsContent = [this.selectRect_i(), this.iconImg_i(), this.disabledRect_i(), this.weaponLbl_i()];
                return t;
            };
            __egretProto__.weaponLbl_i = function () {
                var t = new egret.gui.Label();
                this.weaponLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "stroke", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 5, 18, 2, "0", "center", "middle", 32]);
                return t;
            };
            WeaponItemSelectSkin._skinParts = ["selectRect", "iconImg", "disabledRect", "weaponLbl"];
            return WeaponItemSelectSkin;
        })(egret.gui.Skin);
        components.WeaponItemSelectSkin = WeaponItemSelectSkin;
        WeaponItemSelectSkin.prototype.__class__ = "skins.components.WeaponItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
