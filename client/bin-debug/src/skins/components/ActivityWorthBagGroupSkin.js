var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityWorthBagGroupSkin = (function (_super) {
            __extends(ActivityWorthBagGroupSkin, _super);
            function ActivityWorthBagGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__13_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityWorthBagGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityWorthBagGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "y"], [41.5, 301, 10]);
                t.layout = this.__10_i();
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 18, "活动时间：", "center", 0xF7F9FA, "middle", 158, 119]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.__3_i(), this.__5_i(), this.btnReset_i(), this.__9_i(), this.__11_i(), this.__12_i(), this.timeLbl_i(), this.item1_i(), this.item2_i(), this.item3_i(), this.item4_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activity_bg_worth_png", 0, 5]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter", "y"], [37, -189, 10]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "touchEnabled", "x", "y"], [true, "scale", 0.7, 0.7, "diamond", false, 53, 3]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "touchEnabled", "verticalAlign", "x", "y"], [true, "Arial", 18, "刷新", "center", 0xFFFFFF, false, "middle", 66, 10]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["visible", "width", "x", "y"], [false, 118, 176, 620]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__6_i(), this.diamondLbl_i(), this.__7_i()];
                return t;
            };
            __egretProto__.btnReset_i = function () {
                var t = new egret.gui.Button();
                this.btnReset = t;
                this.__s(t, ["height", "skinName", "visible", "width", "x", "y"], [28, new egret.gui.ButtonSkin("activity_worth_btn_refresh"), false, 109, 181, 618]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "x"], [true, "Arial", 18, "x50", "center", false, "middle", 71]);
                return t;
            };
            __egretProto__.item1_i = function () {
                var t = new egret.gui.Group();
                this.item1 = t;
                this.__s(t, ["height", "width", "x", "y"], [150, 150, 69, 157]);
                return t;
            };
            __egretProto__.item2_i = function () {
                var t = new egret.gui.Group();
                this.item2 = t;
                this.__s(t, ["height", "width", "x", "y"], [150, 150, 240, 157]);
                return t;
            };
            __egretProto__.item3_i = function () {
                var t = new egret.gui.Group();
                this.item3 = t;
                this.__s(t, ["height", "width", "x", "y"], [150, 150, 67, 379]);
                return t;
            };
            __egretProto__.item4_i = function () {
                var t = new egret.gui.Group();
                this.item4 = t;
                this.__s(t, ["height", "width", "x", "y"], [150, 150, 239, 379]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 18, "22:22:22", "center", "middle", 246, 120]);
                return t;
            };
            ActivityWorthBagGroupSkin._skinParts = ["btnReset", "diamondLbl", "timeLbl", "item1", "item2", "item3", "item4"];
            return ActivityWorthBagGroupSkin;
        })(egret.gui.Skin);
        components.ActivityWorthBagGroupSkin = ActivityWorthBagGroupSkin;
        ActivityWorthBagGroupSkin.prototype.__class__ = "skins.components.ActivityWorthBagGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
