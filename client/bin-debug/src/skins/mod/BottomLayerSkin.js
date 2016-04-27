var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var BottomLayerSkin = (function (_super) {
            __extends(BottomLayerSkin, _super);
            function BottomLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [340, 480]);
                this.elementsContent = [this.bottomShowLy_i(), this.bottomSkillLy_i(), this.bottomPopUpGroup_i(), this.bottomTabBarLy_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BottomLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BottomLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bottomShowLy_i = function () {
                var t = new BottomShowLayer();
                this.bottomShowLy = t;
                this.__s(t, ["horizontalCenter", "skinName", "verticalCenter"], [0, skins.mod.BottomShowLayerSkin, -70]);
                return t;
            };
            __egretProto__.bottomSkillLy_i = function () {
                var t = new BottomSkillLayer();
                this.bottomSkillLy = t;
                this.__s(t, ["horizontalCenter", "skinName", "verticalCenter"], [0, skins.mod.BottomSkillLayerSkin, 60]);
                return t;
            };
            __egretProto__.bottomTabBarLy_i = function () {
                var t = new BottomTabBarLayer();
                this.bottomTabBarLy = t;
                this.__s(t, ["bottom", "horizontalCenter", "left", "right", "skinName"], [0, 0, 0, 0, skins.mod.BottomTabBarSkin]);
                return t;
            };
            __egretProto__.bottomPopUpGroup_i = function () {
                var t = new egret.gui.Group();
                this.bottomPopUpGroup = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [47, 337, 0, 480]);
                return t;
            };
            BottomLayerSkin._skinParts = ["bottomShowLy", "bottomSkillLy", "bottomPopUpGroup", "bottomTabBarLy"];
            return BottomLayerSkin;
        })(egret.gui.Skin);
        mod.BottomLayerSkin = BottomLayerSkin;
        BottomLayerSkin.prototype.__class__ = "skins.mod.BottomLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
