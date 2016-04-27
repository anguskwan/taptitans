var skins;
(function (skins) {
    var components;
    (function (components) {
        var HalidomAllSkin = (function (_super) {
            __extends(HalidomAllSkin, _super);
            function HalidomAllSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HalidomAllSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_buy_artifact_all", 0, 58, 14, 11]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["btn_big_yellow", 76, 12]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "height", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], ["Arial", 25, 20, 14, "神器图鉴", "left", "bottom", 0.5]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i()];
                return t;
            };
            return HalidomAllSkin;
        })(egret.gui.Skin);
        components.HalidomAllSkin = HalidomAllSkin;
        HalidomAllSkin.prototype.__class__ = "skins.components.HalidomAllSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
