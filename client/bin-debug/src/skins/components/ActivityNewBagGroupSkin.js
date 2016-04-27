var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityNewBagGroupSkin = (function (_super) {
            __extends(ActivityNewBagGroupSkin, _super);
            function ActivityNewBagGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityNewBagGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityNewBagGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.newBagBgImg_i(), this.__3_i(), this.rewardLbl1_i(), this.rewardLbl2_i(), this.rewardLbl3_i()];
                return t;
            };
            __egretProto__.getRewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.getRewardBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["enabled", "height", "skinName", "width"], [false, 50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 150]);
                return t;
            };
            __egretProto__.getRewardLbl_i = function () {
                var t = new egret.gui.Label();
                this.getRewardLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 18, "领取礼包", false, 0]);
                return t;
            };
            __egretProto__.newBagBgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.newBagBgImg = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.rewardLbl1_i = function () {
                var t = new egret.gui.Label();
                this.rewardLbl1 = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", -151.5, 24, "0", 521]);
                return t;
            };
            __egretProto__.rewardLbl2_i = function () {
                var t = new egret.gui.Label();
                this.rewardLbl2 = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "x", "y"], ["Arial", -1.5, 24, "1", 10, 521]);
                return t;
            };
            __egretProto__.rewardLbl3_i = function () {
                var t = new egret.gui.Label();
                this.rewardLbl3 = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "x", "y"], ["Arial", 148.5, 24, "100", 20, 521]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "horizontalCenter"], [30, 0]);
                t.elementsContent = [this.getRewardBtn_i(), this.getRewardLbl_i()];
                return t;
            };
            ActivityNewBagGroupSkin._skinParts = ["newBagBgImg", "getRewardBtn", "getRewardLbl", "rewardLbl1", "rewardLbl2", "rewardLbl3"];
            return ActivityNewBagGroupSkin;
        })(egret.gui.Skin);
        components.ActivityNewBagGroupSkin = ActivityNewBagGroupSkin;
        ActivityNewBagGroupSkin.prototype.__class__ = "skins.components.ActivityNewBagGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
