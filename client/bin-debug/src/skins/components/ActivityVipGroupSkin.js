var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityVipGroupSkin = (function (_super) {
            __extends(ActivityVipGroupSkin, _super);
            function ActivityVipGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__20_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityVipGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityVipGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x2C2931, 100, 100]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x39363F, 28, 0, 420, 30, 321]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign"], ["Arial", 24, "特权", "center", 0xB96B2C, "middle"]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "bottom"]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "top"], [0.5, 14]);
                t.layout = this.__15_i();
                t.elementsContent = [this.vipTitleLbl_i(), this.__14_i()];
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [2, "left"]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width"], [310, 0, 350]);
                t.elementsContent = [this.__16_i(), this.listGroup_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [450, 0, 460, 183]);
                t.elementsContent = [this.__11_i(), this.getRewardGroup_i(), this.__12_i(), this.rewardGroup_i(), this.rewardTitleLbl_i(), this.rightBtn_i(), this.leftBtn_i(), this.__18_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.__3_i(), this.__6_i(), this.__10_i(), this.__19_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x39363F, 100, 0, 100, 20, 20]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter"], [80, 0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "verticalCenter"], [true, "Arial", 10, 24, "VIP特权", 0.5]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                t.horizontalCenter = 0;
                t.elementsContent = [this.__4_i(), this.__5_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "bottom"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter", "y"], [true, "Arial", 0, 20, "充值", false, 0, 10]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [381, 28]);
                t.elementsContent = [this.payBtn_i(), this.__8_i()];
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
                this.__s(t, ["x", "y"], [361, 388]);
                t.elementsContent = [this.getRewardBtn_i(), this.getRewardLbl_i()];
                return t;
            };
            __egretProto__.getRewardLbl_i = function () {
                var t = new egret.gui.Label();
                this.getRewardLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter", "y"], [true, "Arial", 0, 20, "领取", false, 0, 10]);
                return t;
            };
            __egretProto__.leftBtn_i = function () {
                var t = new egret.gui.Button();
                this.leftBtn = t;
                this.__s(t, ["left", "skinName", "visible", "width", "y"], [0, new egret.gui.ButtonSkin("activity_btn_left", "activity_btn_left", "activity_btn_left"), false, 27, 0]);
                return t;
            };
            __egretProto__.listGroup_i = function () {
                var t = new egret.gui.Group();
                this.listGroup = t;
                this.__s(t, ["horizontalCenter", "y"], [0, 61]);
                t.layout = this.__17_i();
                return t;
            };
            __egretProto__.payBtn_i = function () {
                var t = new egret.gui.Button();
                this.payBtn = t;
                t.skinName = new egret.gui.ButtonSkin("activity_btn_yellow", "activity_btn_yellow", "activity_btn_yellow");
                return t;
            };
            __egretProto__.payGroup_i = function () {
                var t = new egret.gui.Group();
                this.payGroup = t;
                this.__s(t, ["x", "y"], [131, 31]);
                t.layout = this.__7_i();
                t.elementsContent = [this.payTitleLbl_i(), this.payVipLbl_i()];
                return t;
            };
            __egretProto__.payTitleLbl_i = function () {
                var t = new egret.gui.Label();
                this.payTitleLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign"], ["Arial", 16, "标签", "center", "middle"]);
                return t;
            };
            __egretProto__.payVipLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.payVipLbl = t;
                this.__s(t, ["font", "left", "scaleX", "scaleY", "text", "verticalCenter"], ["font_vip_fnt", 56, 0.4, 0.4, "V0", 0.3000000000000007]);
                return t;
            };
            __egretProto__.progress_i = function () {
                var t = new uiskins.ActivityProgressBar();
                this.progress = t;
                this.__s(t, ["horizontalCenter", "skinName", "y"], [0, skins.components.ActivityProgressBarSkin, 56]);
                return t;
            };
            __egretProto__.rewardGroup_i = function () {
                var t = new egret.gui.Group();
                this.rewardGroup = t;
                this.__s(t, ["left", "y"], [22, 361]);
                t.layout = this.__13_i();
                return t;
            };
            __egretProto__.rewardTitleLbl_i = function () {
                var t = new egret.gui.Label();
                this.rewardTitleLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], ["Arial", 18, "标签", "center", 0xB96B2C, "bottom", 24, 326]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                this.__s(t, ["right", "skinName", "visible", "width"], [0, new egret.gui.ButtonSkin("activity_btn_right", "activity_btn_right", "activity_btn_right"), false, 27]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth", "y"], [100, 100, 81]);
                t.elementsContent = [this.vipLbl_i(), this.progress_i(), this.payGroup_i(), this.__9_i()];
                return t;
            };
            __egretProto__.vipLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.vipLbl = t;
                this.__s(t, ["font", "left", "text", "verticalCenter"], ["font_vip_fnt", 16, "V0", -1.5]);
                return t;
            };
            __egretProto__.vipTitleLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.vipTitleLbl = t;
                this.__s(t, ["font", "scaleX", "scaleY", "text"], ["font_vip_fnt", 0.7, 0.7, "V0"]);
                return t;
            };
            ActivityVipGroupSkin._skinParts = ["vipLbl", "progress", "payTitleLbl", "payVipLbl", "payGroup", "payBtn", "getRewardBtn", "getRewardLbl", "getRewardGroup", "rewardGroup", "rewardTitleLbl", "rightBtn", "leftBtn", "vipTitleLbl", "listGroup"];
            return ActivityVipGroupSkin;
        })(egret.gui.Skin);
        components.ActivityVipGroupSkin = ActivityVipGroupSkin;
        ActivityVipGroupSkin.prototype.__class__ = "skins.components.ActivityVipGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
