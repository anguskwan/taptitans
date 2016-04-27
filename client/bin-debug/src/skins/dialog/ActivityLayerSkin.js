var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var ActivityLayerSkin = (function (_super) {
            __extends(ActivityLayerSkin, _super);
            function ActivityLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 10;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 3;
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.selectGroup_i(), this.selectGroup1_i(), this.tipImg1_i(), this.tipImg2_i(), this.newbagGroup_i(), this.vipGroup_i(), this.lifecardGroup_i(), this.monthGroup_i(), this.threeGroup_i(), this.eggGroup_i(), this.catGroup_i(), this.accuGroup_i(), this.blackGroup_i(), this.costdiamondGroup_i(), this.growth_fundGroup_i(), this.worthBoxGroup_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.accuGroup_i = function () {
                var t = new egret.gui.Group();
                this.accuGroup = t;
                this.__s(t, ["height", "percentWidth"], [650, 100]);
                return t;
            };
            __egretProto__.blackGroup_i = function () {
                var t = new egret.gui.Group();
                this.blackGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.catGroup_i = function () {
                var t = new egret.gui.Group();
                this.catGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [12, new egret.gui.ButtonSkin("activity_btn_close", "activity_btn_close", "activity_btn_close"), 11, 20, 20]);
                return t;
            };
            __egretProto__.costdiamondGroup_i = function () {
                var t = new egret.gui.Group();
                this.costdiamondGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.eggGroup_i = function () {
                var t = new egret.gui.Group();
                this.eggGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.growth_fundGroup_i = function () {
                var t = new egret.gui.Group();
                this.growth_fundGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.lifecardGroup_i = function () {
                var t = new egret.gui.Group();
                this.lifecardGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.monthGroup_i = function () {
                var t = new egret.gui.Group();
                this.monthGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.newbagGroup_i = function () {
                var t = new egret.gui.Group();
                this.newbagGroup = t;
                this.__s(t, ["height", "percentWidth"], [650, 100]);
                return t;
            };
            __egretProto__.selectGroup1_i = function () {
                var t = new egret.gui.Scroller();
                this.selectGroup1 = t;
                this.__s(t, ["height", "width", "x", "y"], [90, 447, 16, 660]);
                t.viewport = this.selectGroup2_i();
                return t;
            };
            __egretProto__.selectGroup2_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup2 = t;
                this.__s(t, ["height", "width"], [90, 419]);
                t.layout = this.__5_i();
                return t;
            };
            __egretProto__.selectGroup_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup = t;
                this.__s(t, ["x", "y"], [16, 661]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x1D1E22, 100, 100]);
                return t;
            };
            __egretProto__.threeGroup_i = function () {
                var t = new egret.gui.Group();
                this.threeGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.tipImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.tipImg1 = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["tip_big_task", false, false, 73, 663]);
                return t;
            };
            __egretProto__.tipImg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.tipImg2 = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["tip_big_task", false, false, 165, 664]);
                return t;
            };
            __egretProto__.vipGroup_i = function () {
                var t = new egret.gui.Group();
                this.vipGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            __egretProto__.worthBoxGroup_i = function () {
                var t = new egret.gui.Group();
                this.worthBoxGroup = t;
                this.__s(t, ["height", "percentWidth", "x", "y"], [650, 100, 0, 0]);
                return t;
            };
            ActivityLayerSkin._skinParts = ["selectGroup", "selectGroup2", "selectGroup1", "tipImg1", "tipImg2", "newbagGroup", "vipGroup", "lifecardGroup", "monthGroup", "threeGroup", "eggGroup", "catGroup", "accuGroup", "blackGroup", "costdiamondGroup", "growth_fundGroup", "worthBoxGroup", "closeBtn"];
            return ActivityLayerSkin;
        })(egret.gui.Skin);
        dialog.ActivityLayerSkin = ActivityLayerSkin;
        ActivityLayerSkin.prototype.__class__ = "skins.dialog.ActivityLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
