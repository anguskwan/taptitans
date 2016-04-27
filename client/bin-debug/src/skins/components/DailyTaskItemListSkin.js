var skins;
(function (skins) {
    var components;
    (function (components) {
        var DailyTaskItemListSkin = (function (_super) {
            __extends(DailyTaskItemListSkin, _super);
            function DailyTaskItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DailyTaskItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DailyTaskItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width"], [100, 0, 0, 450]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.titleLbl_i(), this.countLbl_i(), this.btnItem_i(), this.gainedImg_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.countLbl_i = function () {
                var t = new egret.gui.Label();
                this.countLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "100/100", "left", "middle", 82, 43]);
                return t;
            };
            __egretProto__.gainedImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.gainedImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["common_json.dailyTaskGained", false, 331, 18]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "iconItem_json.dailyTask1", 58, 13, 11]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 18, "名字", "left", "middle", 82, 14]);
                return t;
            };
            DailyTaskItemListSkin._skinParts = ["iconImg", "titleLbl", "countLbl", "btnItem", "gainedImg"];
            return DailyTaskItemListSkin;
        })(egret.gui.Skin);
        components.DailyTaskItemListSkin = DailyTaskItemListSkin;
        DailyTaskItemListSkin.prototype.__class__ = "skins.components.DailyTaskItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
