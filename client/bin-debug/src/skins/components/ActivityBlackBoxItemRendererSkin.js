var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityBlackBoxItemRendererSkin = (function (_super) {
            __extends(ActivityBlackBoxItemRendererSkin, _super);
            function ActivityBlackBoxItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [90, 408]);
                this.elementsContent = [this.__9_i(), this.btnItem_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityBlackBoxItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityBlackBoxItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["activity_black_item_text_bg", 83, 15]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor"], ["Arial", 14, "购买次数：", 0x7E7E8C]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [108, 67]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__6_i(), this.numLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.__5_i(), this.titleLbl_i(), this.descLbl_i(), this.__8_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 264, 5]);
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 14, "内容", 0xD2B48A, 126, 83, 42]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "width", "x", "y"], [58, 58, 15, 14]);
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["fontFamily", "size", "text"], ["Arial", 14, "0"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "activity_black_item_bar";
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 18, "标题", 83, 15]);
                return t;
            };
            ActivityBlackBoxItemRendererSkin._skinParts = ["iconImg", "titleLbl", "descLbl", "numLbl", "btnItem"];
            return ActivityBlackBoxItemRendererSkin;
        })(egret.gui.Skin);
        components.ActivityBlackBoxItemRendererSkin = ActivityBlackBoxItemRendererSkin;
        ActivityBlackBoxItemRendererSkin.prototype.__class__ = "skins.components.ActivityBlackBoxItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
