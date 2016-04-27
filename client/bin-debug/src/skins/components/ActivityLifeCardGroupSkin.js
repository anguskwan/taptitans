var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityLifeCardGroupSkin = (function (_super) {
            __extends(ActivityLifeCardGroupSkin, _super);
            function ActivityLifeCardGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["currentState", "height", "width"], ["normal", 650, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("buyBtn", "enabled", true),
                        new egret.gui.SetProperty("validTimeLabel", "text", "3月8日--3月18日")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("buyBtn", "enabled", false)
                    ])
                ];
            }
            var __egretProto__ = ActivityLifeCardGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityLifeCardGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.background_i(), this.__3_i(), this.validTimeLabel_i()];
                return t;
            };
            __egretProto__.background_i = function () {
                var t = new egret.gui.UIAsset();
                this.background = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.buyBtnLbl_i = function () {
                var t = new egret.gui.Label();
                this.buyBtnLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 18, "￥188", false, 0]);
                return t;
            };
            __egretProto__.buyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["enabled", "height", "skinName", "width"], [true, 50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 150]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "horizontalCenter"], [20, 96]);
                t.elementsContent = [this.buyBtn_i(), this.buyBtnLbl_i()];
                return t;
            };
            __egretProto__.validTimeLabel_i = function () {
                var t = new egret.gui.Label();
                this.validTimeLabel = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], ["Andale Mono", -1, 24, "3月8日--3月18日", 0xFF0000, 70]);
                return t;
            };
            ActivityLifeCardGroupSkin._skinParts = ["background", "buyBtn", "buyBtnLbl", "validTimeLabel"];
            return ActivityLifeCardGroupSkin;
        })(egret.gui.Skin);
        components.ActivityLifeCardGroupSkin = ActivityLifeCardGroupSkin;
        ActivityLifeCardGroupSkin.prototype.__class__ = "skins.components.ActivityLifeCardGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
