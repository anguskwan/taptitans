var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityCatGroupSkin = (function (_super) {
            __extends(ActivityCatGroupSkin, _super);
            function ActivityCatGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityCatGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityCatGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.catBgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.catBgImg = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.currDiamond_i = function () {
                var t = new egret.gui.Label();
                this.currDiamond = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], ["Arial", 344, 20, "0", "center", 0xFFFFFF, "middle", 10, 564]);
                return t;
            };
            __egretProto__.currTimeLbl_i = function () {
                var t = new egret.gui.Label();
                this.currTimeLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], ["Arial", 85.5, 20, "00:00:00", "center", 0xFFFFFF, "middle", 56]);
                return t;
            };
            __egretProto__.getRewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.getRewardBtn = t;
                this.__s(t, ["enabled", "skinName", "x", "y"], [true, new egret.gui.ButtonSkin("activity_cat_btn_up", "activity_cat_btn_down", "activity_cat_btn_disabled"), 194, 413]);
                return t;
            };
            __egretProto__.highestDiamond_i = function () {
                var t = new egret.gui.Label();
                this.highestDiamond = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], ["Arial", 357, 20, "0", "center", 0xFFFFFF, "middle", 20, 470]);
                return t;
            };
            __egretProto__.itemLbl1_i = function () {
                var t = new egret.gui.Label();
                this.itemLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, "0", "center", "middle", 51, 232]);
                return t;
            };
            __egretProto__.itemLbl2_i = function () {
                var t = new egret.gui.Label();
                this.itemLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, "0", "center", "middle", 131, 232]);
                return t;
            };
            __egretProto__.itemLbl3_i = function () {
                var t = new egret.gui.Label();
                this.itemLbl3 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, "0", "center", "middle", 210, 231]);
                return t;
            };
            __egretProto__.itemLbl4_i = function () {
                var t = new egret.gui.Label();
                this.itemLbl4 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, "0", "center", "middle", 289, 232]);
                return t;
            };
            __egretProto__.itemLbl5_i = function () {
                var t = new egret.gui.Label();
                this.itemLbl5 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 110, "0", "center", "middle", 367, 231]);
                return t;
            };
            __egretProto__.needDiamond_i = function () {
                var t = new egret.gui.Label();
                this.needDiamond = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], ["Arial", 135, 20, "0", "center", 0xFFFFFF, "middle", 564]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.catBgImg_i(), this.itemLbl5_i(), this.itemLbl4_i(), this.itemLbl3_i(), this.itemLbl2_i(), this.itemLbl1_i(), this.needDiamond_i(), this.currDiamond_i(), this.highestDiamond_i(), this.currTimeLbl_i(), this.getRewardBtn_i()];
                return t;
            };
            ActivityCatGroupSkin._skinParts = ["catBgImg", "itemLbl5", "itemLbl4", "itemLbl3", "itemLbl2", "itemLbl1", "needDiamond", "currDiamond", "highestDiamond", "currTimeLbl", "getRewardBtn"];
            return ActivityCatGroupSkin;
        })(egret.gui.Skin);
        components.ActivityCatGroupSkin = ActivityCatGroupSkin;
        ActivityCatGroupSkin.prototype.__class__ = "skins.components.ActivityCatGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
