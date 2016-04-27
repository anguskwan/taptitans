var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityBlackGroupSkin = (function (_super) {
            __extends(ActivityBlackGroupSkin, _super);
            function ActivityBlackGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [650, 480]);
                this.elementsContent = [this.__16_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityBlackGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityBlackGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [358, 543]);
                t.elementsContent = [this.resetBtn_i(), this.__10_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.7, 0.7, "diamond", 0, 374]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "x50", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "y"], [158.5, 272, 10]);
                t.layout = this.__14_i();
                t.elementsContent = [this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [650, 480]);
                t.elementsContent = [this.bgImg_i(), this.blackList_i(), this.__6_i(), this.__9_i(), this.__11_i(), this.__15_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.7, 0.7, "diamond", 0, 374]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "verticalCenter"], [42, -189]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.diamondLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "剩余时间：", "center", 0x45BFEC, "middle", 0, 15]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter", "y"], [37, -189, 10]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.timeLbl_i()];
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.blackList_i = function () {
                var t = new egret.gui.List();
                this.blackList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [466, 0, 408, 10, 151]);
                t.layout = this.__3_i();
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.resetBtn_i = function () {
                var t = new egret.gui.Button();
                this.resetBtn = t;
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 80]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "touchEnabled", "verticalAlign", "verticalCenter", "y"], [true, "Arial", 0, 18, "刷新", "center", 0xFFFFFF, false, "middle", 0, 10]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 18, "0", "center", "middle", 0, 25, 10]);
                return t;
            };
            ActivityBlackGroupSkin._skinParts = ["bgImg", "blackList", "diamondLbl", "timeLbl", "resetBtn"];
            return ActivityBlackGroupSkin;
        })(egret.gui.Skin);
        components.ActivityBlackGroupSkin = ActivityBlackGroupSkin;
        ActivityBlackGroupSkin.prototype.__class__ = "skins.components.ActivityBlackGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
