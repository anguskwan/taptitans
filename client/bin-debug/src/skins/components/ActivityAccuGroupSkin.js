var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityAccuGroupSkin = (function (_super) {
            __extends(ActivityAccuGroupSkin, _super);
            function ActivityAccuGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityAccuGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityAccuGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
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
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "累计充值到指定额度即可领取奖励", 0x857C8D, 13, 53]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.accuList_i(), this.timeTextLbl_i(), this.__7_i(), this.currPurchaseLbl_i()];
                return t;
            };
            __egretProto__.accuList_i = function () {
                var t = new egret.gui.List();
                this.accuList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [0, 514, 0, 455]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.currPurchaseLbl_i = function () {
                var t = new egret.gui.Label();
                this.currPurchaseLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "你当前已累计充值：", 0xFDB32B, 13, 83]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x13395A, 100, 0, 100, 20, 20]);
                return t;
            };
            __egretProto__.timeTextLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeTextLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 16, "活动时间:", "center", "middle", 13, 23]);
                return t;
            };
            ActivityAccuGroupSkin._skinParts = ["accuList", "timeTextLbl", "currPurchaseLbl"];
            return ActivityAccuGroupSkin;
        })(egret.gui.Skin);
        components.ActivityAccuGroupSkin = ActivityAccuGroupSkin;
        ActivityAccuGroupSkin.prototype.__class__ = "skins.components.ActivityAccuGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
