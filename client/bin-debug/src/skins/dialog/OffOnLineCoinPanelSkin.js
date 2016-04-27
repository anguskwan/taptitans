var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var OffOnLineCoinPanelSkin = (function (_super) {
            __extends(OffOnLineCoinPanelSkin, _super);
            function OffOnLineCoinPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [260, 447]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = OffOnLineCoinPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return OffOnLineCoinPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [1.2, 1.2, "btn_offonlinecoin", 361, 32]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "离线黄金赚取数", 29, 18]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 14, "在你下线期间，你的英雄仍然奋勇作战。下次上线时，\n记得手机英雄生产的黄金！", 32, 71]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["label", "skinName", "x", "y"], ["好", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 236, 171]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [260, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            OffOnLineCoinPanelSkin._skinParts = ["closeBtn"];
            return OffOnLineCoinPanelSkin;
        })(egret.gui.Skin);
        dialog.OffOnLineCoinPanelSkin = OffOnLineCoinPanelSkin;
        OffOnLineCoinPanelSkin.prototype.__class__ = "skins.dialog.OffOnLineCoinPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
