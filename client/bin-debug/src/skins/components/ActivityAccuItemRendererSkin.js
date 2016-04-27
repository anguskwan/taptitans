var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityAccuItemRendererSkin = (function (_super) {
            __extends(ActivityAccuItemRendererSkin, _super);
            function ActivityAccuItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [140, 455]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityAccuItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityAccuItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activity_icon_accu", 10, 9]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.getRewardGroup_i(), this.rewardGroup_i(), this.titleLbl_i()];
                return t;
            };
            __egretProto__.getRewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.getRewardBtn = t;
                this.__s(t, ["height", "skinName", "width"], [43, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 79]);
                return t;
            };
            __egretProto__.getRewardGroup_i = function () {
                var t = new egret.gui.Group();
                this.getRewardGroup = t;
                this.__s(t, ["x", "y"], [361, 49]);
                t.elementsContent = [this.getRewardBtn_i(), this.getRewardLbl_i()];
                return t;
            };
            __egretProto__.getRewardLbl_i = function () {
                var t = new egret.gui.Label();
                this.getRewardLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter", "y"], [true, "Arial", 0, 20, "领取", false, 0, 10]);
                return t;
            };
            __egretProto__.rewardGroup_i = function () {
                var t = new egret.gui.Group();
                this.rewardGroup = t;
                this.__s(t, ["left", "x", "y"], [12, 10, 52]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x193146, 100, 100]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 14, 18, "center", 0xFDB32B, "middle", 14]);
                return t;
            };
            ActivityAccuItemRendererSkin._skinParts = ["getRewardBtn", "getRewardLbl", "getRewardGroup", "rewardGroup", "titleLbl"];
            return ActivityAccuItemRendererSkin;
        })(egret.gui.Skin);
        components.ActivityAccuItemRendererSkin = ActivityAccuItemRendererSkin;
        ActivityAccuItemRendererSkin.prototype.__class__ = "skins.components.ActivityAccuItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
