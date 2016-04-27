var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityCostDiamondGroupSkin = (function (_super) {
            __extends(ActivityCostDiamondGroupSkin, _super);
            function ActivityCostDiamondGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__12_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityCostDiamondGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityCostDiamondGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "width", "y"], [158, 37, 80]);
                t.layout = this.__10_i();
                t.elementsContent = [this.__9_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.costDiamondList_i(), this.timeTextLbl_i(), this.__7_i(), this.__8_i(), this.__11_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x13395A, 100, 0, 100, 20, 20]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x0B2841, 108, 0, 470, 7]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "width", "x"], [0, 0x0B2841, 524, 0, 470, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "活动期间，累计消耗到指定额度钻石即可领取奖励", 0x857C8D, 13, 53]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "你当前已累计消耗：", 0xFDB32B, 13, 83]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.7, 0.7, "diamond", 0, 374]);
                return t;
            };
            __egretProto__.costDiamondList_i = function () {
                var t = new egret.gui.List();
                this.costDiamondList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [0, 514, 0, 455]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.timeTextLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeTextLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 16, "活动时间:", "center", "middle", 13, 23]);
                return t;
            };
            ActivityCostDiamondGroupSkin._skinParts = ["costDiamondList", "timeTextLbl", "diamondLbl"];
            return ActivityCostDiamondGroupSkin;
        })(egret.gui.Skin);
        components.ActivityCostDiamondGroupSkin = ActivityCostDiamondGroupSkin;
        ActivityCostDiamondGroupSkin.prototype.__class__ = "skins.components.ActivityCostDiamondGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
