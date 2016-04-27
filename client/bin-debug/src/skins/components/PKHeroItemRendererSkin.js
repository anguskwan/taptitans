var skins;
(function (skins) {
    var components;
    (function (components) {
        var PKHeroItemRendererSkin = (function (_super) {
            __extends(PKHeroItemRendererSkin, _super);
            function PKHeroItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [79, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKHeroItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKHeroItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.leftItem_i = function () {
                var t = new uiskins.PKHeroItemList();
                this.leftItem = t;
                t.skinName = skins.components.PKHeroItemListSkin;
                return t;
            };
            __egretProto__.rightItem_i = function () {
                var t = new uiskins.PKHeroItemList();
                this.rightItem = t;
                this.__s(t, ["skinName", "x"], [skins.components.PKHeroItemListSkin, 262]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.leftItem_i(), this.rightItem_i()];
                return t;
            };
            PKHeroItemRendererSkin._skinParts = ["leftItem", "rightItem"];
            return PKHeroItemRendererSkin;
        })(egret.gui.Skin);
        components.PKHeroItemRendererSkin = PKHeroItemRendererSkin;
        PKHeroItemRendererSkin.prototype.__class__ = "skins.components.PKHeroItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
