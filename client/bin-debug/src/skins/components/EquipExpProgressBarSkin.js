var skins;
(function (skins) {
    var components;
    (function (components) {
        var EquipExpProgressBarSkin = (function (_super) {
            __extends(EquipExpProgressBarSkin, _super);
            function EquipExpProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [5, 138]);
                this.elementsContent = [this.track_i(), this.thumb_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipExpProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipExpProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["autoScale", "horizontalCenter", "source", "verticalCenter", "x", "y"], [true, 0, "equip_exp_progress", 0, 10, 10]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter", "x", "y"], [0, "equip_exp_progress_bg", 0, 10, 10]);
                return t;
            };
            EquipExpProgressBarSkin._skinParts = ["track", "thumb"];
            return EquipExpProgressBarSkin;
        })(egret.gui.Skin);
        components.EquipExpProgressBarSkin = EquipExpProgressBarSkin;
        EquipExpProgressBarSkin.prototype.__class__ = "skins.components.EquipExpProgressBarSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
