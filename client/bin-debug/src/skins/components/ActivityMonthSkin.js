var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityMonthSkin = (function (_super) {
            __extends(ActivityMonthSkin, _super);
            function ActivityMonthSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityMonthSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityMonthSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [316, 100, 311, 226]);
                t.layout = this.__3_i();
                t.elementsContent = [this.rightBtn1_i(), this.rightBtn2_i(), this.rightBtn3_i()];
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [650, 480, 0, 0]);
                t.elementsContent = [this.background_i(), this.validTimeLabel_i(), this.__4_i()];
                return t;
            };
            __egretProto__.background_i = function () {
                var t = new egret.gui.UIAsset();
                this.background = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.rightBtn1_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn1 = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 20);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["percentHeight", "label", "skinName", "percentWidth", "x", "y"], [13, "已拥有", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 100, 30, 30]);
                return t;
            };
            __egretProto__.rightBtn2_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn2 = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 20);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["percentHeight", "label", "skinName", "percentWidth", "x", "y"], [13, "已拥有", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 100, 11, 146]);
                return t;
            };
            __egretProto__.rightBtn3_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn3 = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 20);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["percentHeight", "label", "skinName", "percentWidth", "x", "y"], [13, "已拥有", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 100, 40, 40]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 85;
                return t;
            };
            __egretProto__.validTimeLabel_i = function () {
                var t = new egret.gui.Label();
                this.validTimeLabel = t;
                this.__s(t, ["bottom", "fontFamily", "size", "text", "textColor", "x"], [60, "Arial", 24, "3月8日--3月18日", 0xFFFFFF, 148]);
                return t;
            };
            ActivityMonthSkin._skinParts = ["background", "validTimeLabel", "rightBtn1", "rightBtn2", "rightBtn3"];
            return ActivityMonthSkin;
        })(egret.gui.Skin);
        components.ActivityMonthSkin = ActivityMonthSkin;
        ActivityMonthSkin.prototype.__class__ = "skins.components.ActivityMonthSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
