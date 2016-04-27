var skins;
(function (skins) {
    var components;
    (function (components) {
        var MasterPlayerItemRendererSkin = (function (_super) {
            __extends(MasterPlayerItemRendererSkin, _super);
            function MasterPlayerItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__14_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MasterPlayerItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MasterPlayerItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "DMG:", "center", "middle", 81, 29]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter", "x", "y"], [82, 17, 10, 10]);
                t.layout = this.__10_i();
                t.elementsContent = [this.__11_i(), this.damageLbl_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width", "x", "y"], [100, 0, 0, 450, 20, 20]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.__6_i(), this.__9_i(), this.__12_i(), this.selectRect_i(), this.newTipImg_i(), this.buyPopGroup_i(), this.btnItem_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [82, 7]);
                t.layout = this.__5_i();
                t.elementsContent = [this.nameLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 16, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [82, -4]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.buyPopBtn0_i = function () {
                var t = new uiskins.BuyPopButton();
                this.buyPopBtn0 = t;
                this.__s(t, ["label", "skinName"], ["按钮", skins.components.BuyPopButtonSkin]);
                return t;
            };
            __egretProto__.buyPopBtn1_i = function () {
                var t = new uiskins.BuyPopButton();
                this.buyPopBtn1 = t;
                this.__s(t, ["label", "skinName"], ["按钮", skins.components.BuyPopButtonSkin]);
                return t;
            };
            __egretProto__.buyPopGroup_i = function () {
                var t = new egret.gui.Group();
                this.buyPopGroup = t;
                this.__s(t, ["visible", "x", "y"], [false, 155, 10]);
                t.layout = this.__13_i();
                t.elementsContent = [this.buyPopBtn0_i(), this.buyPopBtn1_i()];
                return t;
            };
            __egretProto__.damageLbl_i = function () {
                var t = new egret.gui.Label();
                this.damageLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "1", "center", 0xFF7F01, "middle", 91, 39]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 14, 11]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "1", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign"], [true, "Arial", 18, "名字", "left", "middle"]);
                return t;
            };
            __egretProto__.newTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.newTipImg = t;
                this.__s(t, ["source", "touchEnabled", "x", "y"], ["tip_new", false, 0, 0]);
                return t;
            };
            __egretProto__.selectRect_i = function () {
                var t = new egret.gui.Rect();
                this.selectRect = t;
                this.__s(t, ["fillAlpha", "height", "width"], [0, 80, 220]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            MasterPlayerItemRendererSkin._skinParts = ["iconImg", "nameLbl", "lvLbl", "damageLbl", "selectRect", "newTipImg", "buyPopBtn0", "buyPopBtn1", "buyPopGroup", "btnItem"];
            return MasterPlayerItemRendererSkin;
        })(egret.gui.Skin);
        components.MasterPlayerItemRendererSkin = MasterPlayerItemRendererSkin;
        MasterPlayerItemRendererSkin.prototype.__class__ = "skins.components.MasterPlayerItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
