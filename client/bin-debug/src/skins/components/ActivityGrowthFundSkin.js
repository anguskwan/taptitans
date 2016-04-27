var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityGrowthFundSkin = (function (_super) {
            __extends(ActivityGrowthFundSkin, _super);
            function ActivityGrowthFundSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityGrowthFundSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityGrowthFundSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [384, 388, 45, 214]);
                t.layout = this.__4_i();
                t.elementsContent = [this.gf_item_1_i(), this.gf_item_2_i(), this.gf_item_3_i(), this.gf_item_4_i(), this.gf_item_5_i(), this.gf_item_6_i(), this.gf_item_7_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["黑体", 18, "参与条件：活动期间充值满68元", 98, 617]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [650, 480, 0, 0]);
                t.elementsContent = [this.__3_i(), this.clock_label_i(), this.__5_i(), this.__6_i()];
                return t;
            };
            __egretProto__.clock_label_i = function () {
                var t = new egret.gui.Label();
                this.clock_label = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "verticalAlign", "width", "x", "y"], ["Arial", 25, 16, "24:00:00", "middle", 110, 290, 124]);
                return t;
            };
            __egretProto__.gf_bt_obtain_1_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_1 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_2_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_2 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_3_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_3 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_4_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_4 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_5_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_5 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_6_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_6 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_bt_obtain_7_i = function () {
                var t = new egret.gui.Button();
                this.gf_bt_obtain_7 = t;
                this.__s(t, ["height", "skinName", "verticalCenter", "visible", "width", "x"], [37, new egret.gui.ButtonSkin("activity_btn_obtain"), 0, false, 90, 288]);
                return t;
            };
            __egretProto__.gf_has_obtained_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_1 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_2_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_2 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_3_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_3 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_4_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_4 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_5_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_5 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_6_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_6 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_has_obtained_7_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_has_obtained_7 = t;
                this.__s(t, ["fillMode", "height", "source", "verticalCenter", "visible", "width", "x"], ["scale", 23, "activity_has_obtained", 0, false, 63, 304]);
                return t;
            };
            __egretProto__.gf_item_1_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_1 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 46, 216]);
                t.elementsContent = [this.gf_label_level_1_i(), this.gf_has_obtained_1_i(), this.gf_bt_obtain_1_i(), this.gf_not_pass_1_i()];
                return t;
            };
            __egretProto__.gf_item_2_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_2 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 48, 270]);
                t.elementsContent = [this.gf_label_level_2_i(), this.gf_has_obtained_2_i(), this.gf_bt_obtain_2_i(), this.gf_not_pass_2_i()];
                return t;
            };
            __egretProto__.gf_item_3_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_3 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 56, 226]);
                t.elementsContent = [this.gf_label_level_3_i(), this.gf_has_obtained_3_i(), this.gf_bt_obtain_3_i(), this.gf_not_pass_3_i()];
                return t;
            };
            __egretProto__.gf_item_4_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_4 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 58, 280]);
                t.elementsContent = [this.gf_label_level_4_i(), this.gf_has_obtained_4_i(), this.gf_bt_obtain_4_i(), this.gf_not_pass_4_i()];
                return t;
            };
            __egretProto__.gf_item_5_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_5 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 66, 236]);
                t.elementsContent = [this.gf_label_level_5_i(), this.gf_has_obtained_5_i(), this.gf_bt_obtain_5_i(), this.gf_not_pass_5_i()];
                return t;
            };
            __egretProto__.gf_item_6_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_6 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 68, 290]);
                t.elementsContent = [this.gf_label_level_6_i(), this.gf_has_obtained_6_i(), this.gf_bt_obtain_6_i(), this.gf_not_pass_6_i()];
                return t;
            };
            __egretProto__.gf_item_7_i = function () {
                var t = new egret.gui.Group();
                this.gf_item_7 = t;
                this.__s(t, ["height", "width", "x", "y"], [53, 387, 78, 300]);
                t.elementsContent = [this.gf_label_level_7_i(), this.gf_has_obtained_7_i(), this.gf_bt_obtain_7_i(), this.gf_not_pass_7_i()];
                return t;
            };
            __egretProto__.gf_label_level_1_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_1 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", "justify", 4, 42, 72]);
                return t;
            };
            __egretProto__.gf_label_level_2_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_2 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 42, 72]);
                return t;
            };
            __egretProto__.gf_label_level_3_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_3 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 41, 72]);
                return t;
            };
            __egretProto__.gf_label_level_4_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_4 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 41, 72]);
                return t;
            };
            __egretProto__.gf_label_level_5_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_5 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 41, 72]);
                return t;
            };
            __egretProto__.gf_label_level_6_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_6 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 41, 72]);
                return t;
            };
            __egretProto__.gf_label_level_7_i = function () {
                var t = new egret.gui.Label();
                this.gf_label_level_7 = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "verticalCenter", "width", "x"], ["Arial", 23, 18, "111", "center", 4, 41, 72]);
                return t;
            };
            __egretProto__.gf_not_pass_1_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_1 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_2_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_2 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_3_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_3 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_4_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_4 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_5_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_5 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_6_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_6 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.gf_not_pass_7_i = function () {
                var t = new egret.gui.UIAsset();
                this.gf_not_pass_7 = t;
                this.__s(t, ["height", "source", "verticalCenter", "visible", "width", "x"], [24, "activity_not_pass", 0, false, 64, 304]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [650, "activity_bg_growth_fund_jpg", 480, 0, 0]);
                return t;
            };
            ActivityGrowthFundSkin._skinParts = ["clock_label", "gf_label_level_1", "gf_has_obtained_1", "gf_bt_obtain_1", "gf_not_pass_1", "gf_item_1", "gf_label_level_2", "gf_has_obtained_2", "gf_bt_obtain_2", "gf_not_pass_2", "gf_item_2", "gf_label_level_3", "gf_has_obtained_3", "gf_bt_obtain_3", "gf_not_pass_3", "gf_item_3", "gf_label_level_4", "gf_has_obtained_4", "gf_bt_obtain_4", "gf_not_pass_4", "gf_item_4", "gf_label_level_5", "gf_has_obtained_5", "gf_bt_obtain_5", "gf_not_pass_5", "gf_item_5", "gf_label_level_6", "gf_has_obtained_6", "gf_bt_obtain_6", "gf_not_pass_6", "gf_item_6", "gf_label_level_7", "gf_has_obtained_7", "gf_bt_obtain_7", "gf_not_pass_7", "gf_item_7"];
            return ActivityGrowthFundSkin;
        })(egret.gui.Skin);
        components.ActivityGrowthFundSkin = ActivityGrowthFundSkin;
        ActivityGrowthFundSkin.prototype.__class__ = "skins.components.ActivityGrowthFundSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
