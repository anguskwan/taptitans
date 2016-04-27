var skins;
(function (skins) {
    var components;
    (function (components) {
        var EquipElementItemRendererSkin = (function (_super) {
            __extends(EquipElementItemRendererSkin, _super);
            function EquipElementItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [135, 466]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipElementItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipElementItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "percentWidth"], [100, 0, 100]);
                t.layout = this.__4_i();
                t.elementsContent = [this.selectItem1_i(), this.selectItem2_i(), this.selectItem3_i()];
                return t;
            };
            __egretProto__.selectItem1_i = function () {
                var t = new uiskins.EquipElementItem();
                this.selectItem1 = t;
                this.__s(t, ["height", "skinName", "width"], [135, skins.components.EquipElementItemSkin, 138]);
                return t;
            };
            __egretProto__.selectItem2_i = function () {
                var t = new uiskins.EquipElementItem();
                this.selectItem2 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [135, skins.components.EquipElementItemSkin, 138, 10, 10]);
                return t;
            };
            __egretProto__.selectItem3_i = function () {
                var t = new uiskins.EquipElementItem();
                this.selectItem3 = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [135, skins.components.EquipElementItemSkin, 138, 20, 20]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [26, "left", "middle"]);
                return t;
            };
            EquipElementItemRendererSkin._skinParts = ["selectItem1", "selectItem2", "selectItem3"];
            return EquipElementItemRendererSkin;
        })(egret.gui.Skin);
        components.EquipElementItemRendererSkin = EquipElementItemRendererSkin;
        EquipElementItemRendererSkin.prototype.__class__ = "skins.components.EquipElementItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
