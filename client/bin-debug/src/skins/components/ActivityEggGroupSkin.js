var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityEggGroupSkin = (function (_super) {
            __extends(ActivityEggGroupSkin, _super);
            function ActivityEggGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["currentState", "height", "width"], ["normal", 650, 480]);
                this.elementsContent = [this.resGroup_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("validTimeLabel", "text", "3月8日--3月18日"),
                        new egret.gui.SetProperty("buyBtn", "enabled", true)
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("buyBtn", "enabled", false)
                    ])
                ];
            }
            var __egretProto__ = ActivityEggGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityEggGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 14, "30", "left", 52, 213, 507]);
                return t;
            };
            __egretProto__.background_i = function () {
                var t = new egret.gui.UIAsset();
                this.background = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.buyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                this.__s(t, ["enabled", "height", "label", "skinName", "width", "x", "y"], [true, 50, "充  值", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 150, 311, 564]);
                return t;
            };
            __egretProto__.canGetHammerCountLbl_i = function () {
                var t = new egret.gui.Label();
                this.canGetHammerCountLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 14, "10", "left", 45, 433, 526]);
                return t;
            };
            __egretProto__.egg1_i = function () {
                var t = new egret.gui.Button();
                this.egg1 = t;
                this.__s(t, ["enabled", "skinName", "x", "y"], [true, new egret.gui.ButtonSkin("activity_egg", "activity_egg", "activity_broken_egg"), 34, 86]);
                return t;
            };
            __egretProto__.egg2_i = function () {
                var t = new egret.gui.Button();
                this.egg2 = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity_egg", "activity_egg", "activity_broken_egg"), 258, 86]);
                return t;
            };
            __egretProto__.egg3_i = function () {
                var t = new egret.gui.Button();
                this.egg3 = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity_egg", "activity_egg", "activity_broken_egg"), 34, 287]);
                return t;
            };
            __egretProto__.egg4_i = function () {
                var t = new egret.gui.Button();
                this.egg4 = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("activity_egg", "activity_egg", "activity_broken_egg"), 262, 287]);
                return t;
            };
            __egretProto__.hammerCountLbl_i = function () {
                var t = new egret.gui.Label();
                this.hammerCountLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 14, "0", "left", 35, 258, 620]);
                return t;
            };
            __egretProto__.resGroup_i = function () {
                var t = new egret.gui.Group();
                this.resGroup = t;
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.background_i(), this.validTimeLabel_i(), this.buyBtn_i(), this.canGetHammerCountLbl_i(), this.__3_i(), this.__4_i(), this.todayGainCrystalLbl_i(), this.hammerCountLbl_i(), this.egg1_i(), this.egg2_i(), this.egg3_i(), this.egg4_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 14, "1", "left", 43, 119, 507]);
                return t;
            };
            __egretProto__.todayGainCrystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.todayGainCrystalLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "width", "x", "y"], ["Arial", 14, "0", "left", 45, 116, 620]);
                return t;
            };
            __egretProto__.validTimeLabel_i = function () {
                var t = new egret.gui.Label();
                this.validTimeLabel = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], ["Arial", -22, 14, "3月8日--3月18日", 0xEDA424, 65]);
                return t;
            };
            ActivityEggGroupSkin._skinParts = ["background", "validTimeLabel", "buyBtn", "canGetHammerCountLbl", "todayGainCrystalLbl", "hammerCountLbl", "egg1", "egg2", "egg3", "egg4", "resGroup"];
            return ActivityEggGroupSkin;
        })(egret.gui.Skin);
        components.ActivityEggGroupSkin = ActivityEggGroupSkin;
        ActivityEggGroupSkin.prototype.__class__ = "skins.components.ActivityEggGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
