var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityWorthBoxSkin = (function (_super) {
            __extends(ActivityWorthBoxSkin, _super);
            function ActivityWorthBoxSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityWorthBoxSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityWorthBoxSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [650, 480, 0, 0]);
                t.elementsContent = [this.__3_i(), this.lblLEndTime_i(), this.btn_buy_i(), this.lbl_remainTimes_i()];
                return t;
            };
            __egretProto__.btn_buy_i = function () {
                var t = new egret.gui.Button();
                this.btn_buy = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity_worthBox_buy_btn", "activity_worthBox_buy_btn", "activity_worthBox_buy_btn"), 158, 565]);
                return t;
            };
            __egretProto__.lblLEndTime_i = function () {
                var t = new egret.gui.Label();
                this.lblLEndTime = t;
                this.__s(t, ["fontFamily", "height", "left", "size", "text", "verticalAlign", "verticalCenter", "width"], ["Arial", 25, 154, 16, "截止日期：4月25日。。。", "middle", -189.5, 197]);
                return t;
            };
            __egretProto__.lbl_remainTimes_i = function () {
                var t = new egret.gui.Label();
                this.lbl_remainTimes = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "verticalCenter"], ["Arial", 440, 18, "10", 275]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [650, "activity_worthBox_bg", 480, 0, 0]);
                return t;
            };
            ActivityWorthBoxSkin._skinParts = ["lblLEndTime", "btn_buy", "lbl_remainTimes"];
            return ActivityWorthBoxSkin;
        })(egret.gui.Skin);
        components.ActivityWorthBoxSkin = ActivityWorthBoxSkin;
        ActivityWorthBoxSkin.prototype.__class__ = "skins.components.ActivityWorthBoxSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
