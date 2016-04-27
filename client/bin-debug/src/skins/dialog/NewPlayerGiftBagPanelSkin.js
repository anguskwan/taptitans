var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var NewPlayerGiftBagPanelSkin = (function (_super) {
            __extends(NewPlayerGiftBagPanelSkin, _super);
            function NewPlayerGiftBagPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [260, 447]);
                this.elementsContent = [this.__16_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = NewPlayerGiftBagPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return NewPlayerGiftBagPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("size", 30);
                this.__s(t, ["x", "y"], [123, 182]);
                t.layout = this.__10_i();
                t.elementsContent = [this.__8_i(), this.__9_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [26, "shop1", 26, 10, 7]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 24, "x2"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.HorizontalLayout();
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("size", 30);
                this.__s(t, ["x", "y"], [44, 182]);
                t.layout = this.__14_i();
                t.elementsContent = [this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.closeBtn_i(), this.buyBtn_i(), this.__7_i(), this.__11_i(), this.__15_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "绝对超值的新手礼包", 29, 18]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "只需6元就可以获得比平时要多出3倍的钻石，\n每人只能购买一次", "left", "top", 34, 71]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_giftbag", 347, 63]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["diamond", 10, 7]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 24, "x300"]);
                return t;
            };
            __egretProto__.buyBtn_i = function () {
                var t = new egret.gui.Button();
                this.buyBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["label", "skinName", "x", "y"], ["￥6", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 171]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20, 10, 10]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.HorizontalLayout();
                return t;
            };
            NewPlayerGiftBagPanelSkin._skinParts = ["closeBtn", "buyBtn"];
            return NewPlayerGiftBagPanelSkin;
        })(egret.gui.Skin);
        dialog.NewPlayerGiftBagPanelSkin = NewPlayerGiftBagPanelSkin;
        NewPlayerGiftBagPanelSkin.prototype.__class__ = "skins.dialog.NewPlayerGiftBagPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
