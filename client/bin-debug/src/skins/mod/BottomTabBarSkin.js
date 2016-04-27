var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var BottomTabBarSkin = (function (_super) {
            __extends(BottomTabBarSkin, _super);
            function BottomTabBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [47, 480]);
                this.elementsContent = [this.__3_i(), this.__5_i(), this.handImg_i(), this.heroNewTipImg_i(), this.masterNewTipImg_i(), this.shopNewTipImg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BottomTabBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BottomTabBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [9, "justify", "contentJustify"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth", "x", "y"], [100, 100, 0, 0]);
                t.layout = this.__4_i();
                t.elementsContent = [this.masterBtn_i(), this.heroesBtn_i(), this.halidomBtn_i(), this.shopBtn_i()];
                return t;
            };
            __egretProto__.halidomBtn_i = function () {
                var t = new uiskins.SelectBottomBtn();
                this.halidomBtn = t;
                this.__s(t, ["height", "label", "skinName", "visible", "width", "x", "y"], [47, "切换按钮", skins.components.SelectToggleBtnSkin, false, 113, 222, 31]);
                return t;
            };
            __egretProto__.handImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.handImg = t;
                this.__s(t, ["source", "visible", "y"], ["icon_hand", false, -39]);
                return t;
            };
            __egretProto__.heroNewTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.heroNewTipImg = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["tip_new", false, false, 123, -2]);
                return t;
            };
            __egretProto__.heroesBtn_i = function () {
                var t = new uiskins.SelectBottomBtn();
                this.heroesBtn = t;
                this.__s(t, ["height", "label", "skinName", "visible", "width", "x", "y"], [47, "切换按钮", skins.components.SelectToggleBtnSkin, false, 113, 212, 21]);
                return t;
            };
            __egretProto__.masterBtn_i = function () {
                var t = new uiskins.SelectBottomBtn();
                this.masterBtn = t;
                this.__s(t, ["height", "label", "skinName", "visible", "width", "x", "y"], [47, "切换按钮", skins.components.SelectToggleBtnSkin, false, 113, 202, 11]);
                return t;
            };
            __egretProto__.masterNewTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.masterNewTipImg = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["tip_new", false, false, 0, -4]);
                return t;
            };
            __egretProto__.shopBtn_i = function () {
                var t = new uiskins.SelectBottomBtn();
                this.shopBtn = t;
                this.__s(t, ["height", "label", "skinName", "visible", "width", "x", "y"], [47, "切换按钮", skins.components.SelectToggleBtnSkin, false, 113, 232, 41]);
                return t;
            };
            __egretProto__.shopNewTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.shopNewTipImg = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["tip_double", false, false, 366, -4]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0xFFFFFF);
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x000000, 100, 100]);
                return t;
            };
            BottomTabBarSkin._skinParts = ["masterBtn", "heroesBtn", "halidomBtn", "shopBtn", "handImg", "heroNewTipImg", "masterNewTipImg", "shopNewTipImg"];
            return BottomTabBarSkin;
        })(egret.gui.Skin);
        mod.BottomTabBarSkin = BottomTabBarSkin;
        BottomTabBarSkin.prototype.__class__ = "skins.mod.BottomTabBarSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
