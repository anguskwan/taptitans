var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityThreeSkin = (function (_super) {
            __extends(ActivityThreeSkin, _super);
            function ActivityThreeSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityThreeSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityThreeSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [650, 480, 0, 0]);
                t.elementsContent = [this.background_i(), this.__3_i(), this.validTimeLabel_i(), this.buyBtn_i(), this.asset1_i(), this.asset2_i(), this.asset3_i(), this.btnGain_i()];
                return t;
            };
            __egretProto__.asset1_i = function () {
                var t = new egret.gui.UIAsset();
                this.asset1 = t;
                this.__s(t, ["source", "x", "y"], ["activity3_1", 56, 417]);
                return t;
            };
            __egretProto__.asset2_i = function () {
                var t = new egret.gui.UIAsset();
                this.asset2 = t;
                this.__s(t, ["source", "x", "y"], ["activity3_2", 203, 378]);
                return t;
            };
            __egretProto__.asset3_i = function () {
                var t = new egret.gui.UIAsset();
                this.asset3 = t;
                this.__s(t, ["source", "x", "y"], ["activity3_3", 351, 338]);
                return t;
            };
            __egretProto__.background_i = function () {
                var t = new egret.gui.UIAsset();
                this.background = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.btnGain_i = function () {
                var t = new egret.gui.Button();
                this.btnGain = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity3_get", "activity3_get", "activity3_get"), 119, 496]);
                return t;
            };
            __egretProto__.buyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyBtn = t;
                this.__s(t, ["bottom", "right", "skinName"], [10, 10, new egret.gui.ButtonSkin("activity3_buy", "activity3_buy", "activity3_buy")]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "horizontalCenter"], [20, 96]);
                return t;
            };
            __egretProto__.validTimeLabel_i = function () {
                var t = new egret.gui.Label();
                this.validTimeLabel = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "textColor", "y"], ["Arial", 27, 24, "3月8日--3月18日", 0xFFFFFF, 10]);
                return t;
            };
            ActivityThreeSkin._skinParts = ["background", "validTimeLabel", "buyBtn", "asset1", "asset2", "asset3", "btnGain"];
            return ActivityThreeSkin;
        })(egret.gui.Skin);
        components.ActivityThreeSkin = ActivityThreeSkin;
        ActivityThreeSkin.prototype.__class__ = "skins.components.ActivityThreeSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
