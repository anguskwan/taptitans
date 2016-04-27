var skins;
(function (skins) {
    var components;
    (function (components) {
        var RankLineItemListSkin = (function (_super) {
            __extends(RankLineItemListSkin, _super);
            function RankLineItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [20, 462]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankLineItemListSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "rank_point", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i()];
                return t;
            };
            return RankLineItemListSkin;
        })(egret.gui.Skin);
        components.RankLineItemListSkin = RankLineItemListSkin;
        RankLineItemListSkin.prototype.__class__ = "skins.components.RankLineItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
