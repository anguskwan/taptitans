var skins;
(function (skins) {
    var components;
    (function (components) {
        var EquipSmallElementItemSkin = (function (_super) {
            __extends(EquipSmallElementItemSkin, _super);
            function EquipSmallElementItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [34, 34]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipSmallElementItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipSmallElementItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "touchChildren", "touchEnabled", "percentWidth"], [100, false, false, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.selectImg_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "width"], [34, 34]);
                return t;
            };
            __egretProto__.selectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg = t;
                this.__s(t, ["source", "visible"], ["equip_icon_small_select", false]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "equip_icon_small_bg";
                return t;
            };
            EquipSmallElementItemSkin._skinParts = ["iconImg", "selectImg"];
            return EquipSmallElementItemSkin;
        })(egret.gui.Skin);
        components.EquipSmallElementItemSkin = EquipSmallElementItemSkin;
        EquipSmallElementItemSkin.prototype.__class__ = "skins.components.EquipSmallElementItemSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
