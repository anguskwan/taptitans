var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var BuyTenTimesPanelSkin = (function (_super) {
            __extends(BuyTenTimesPanelSkin, _super);
            function BuyTenTimesPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [760, 480]);
                this.elementsContent = [this.__3_i(), this.__46_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BuyTenTimesPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BuyTenTimesPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__33_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__34_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__35_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__36_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__37_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__38_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__39_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__40_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__41_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__42_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__43_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__44_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__45_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 0.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.__46_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter", "x", "y"], [0, 0, 10, 10]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.rewardBtn_i(), this.item0_i(), this.item1_i(), this.item2_i(), this.item3_i(), this.item4_i(), this.item5_i(), this.item6_i(), this.item7_i(), this.item8_i(), this.item9_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [560, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x2C2930, 400, 0, 400, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "width", "y"], [58, 0.5, "achievement4", 58, 23]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "bottom_red_bar", 82]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 1.5, 12, "0", "center", "middle", 10, 86]);
                return t;
            };
            __egretProto__.item0_i = function () {
                var t = new egret.gui.Group();
                this.item0 = t;
                this.__s(t, ["height", "x", "y"], [106, 50, 52]);
                t.elementsContent = [this.__6_i(), this.__7_i(), this.__8_i(), this.__9_i()];
                return t;
            };
            __egretProto__.item1_i = function () {
                var t = new egret.gui.Group();
                this.item1 = t;
                this.__s(t, ["height", "x", "y"], [106, 140, 52]);
                t.elementsContent = [this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.item2_i = function () {
                var t = new egret.gui.Group();
                this.item2 = t;
                this.__s(t, ["height", "x", "y"], [106, 230, 52]);
                t.elementsContent = [this.__14_i(), this.__15_i(), this.__16_i(), this.__17_i()];
                return t;
            };
            __egretProto__.item3_i = function () {
                var t = new egret.gui.Group();
                this.item3 = t;
                this.__s(t, ["height", "x", "y"], [106, 320, 52]);
                t.elementsContent = [this.__18_i(), this.__19_i(), this.__20_i(), this.__21_i()];
                return t;
            };
            __egretProto__.item4_i = function () {
                var t = new egret.gui.Group();
                this.item4 = t;
                this.__s(t, ["height", "x", "y"], [106, 50, 172]);
                t.elementsContent = [this.__22_i(), this.__23_i(), this.__24_i(), this.__25_i()];
                return t;
            };
            __egretProto__.item5_i = function () {
                var t = new egret.gui.Group();
                this.item5 = t;
                this.__s(t, ["height", "x", "y"], [106, 140, 172]);
                t.elementsContent = [this.__26_i(), this.__27_i(), this.__28_i(), this.__29_i()];
                return t;
            };
            __egretProto__.item6_i = function () {
                var t = new egret.gui.Group();
                this.item6 = t;
                this.__s(t, ["height", "x", "y"], [106, 230, 172]);
                t.elementsContent = [this.__30_i(), this.__31_i(), this.__32_i(), this.__33_i()];
                return t;
            };
            __egretProto__.item7_i = function () {
                var t = new egret.gui.Group();
                this.item7 = t;
                this.__s(t, ["height", "x", "y"], [106, 320, 172]);
                t.elementsContent = [this.__34_i(), this.__35_i(), this.__36_i(), this.__37_i()];
                return t;
            };
            __egretProto__.item8_i = function () {
                var t = new egret.gui.Group();
                this.item8 = t;
                this.__s(t, ["height", "x", "y"], [106, 140, 292]);
                t.elementsContent = [this.__38_i(), this.__39_i(), this.__40_i(), this.__41_i()];
                return t;
            };
            __egretProto__.item9_i = function () {
                var t = new egret.gui.Group();
                this.item9 = t;
                this.__s(t, ["height", "x", "y"], [106, 230, 292]);
                t.elementsContent = [this.__42_i(), this.__43_i(), this.__44_i(), this.__45_i()];
                return t;
            };
            __egretProto__.rewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.rewardBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0, "领取", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 460]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0.5, 14, "名字", 4]);
                return t;
            };
            BuyTenTimesPanelSkin._skinParts = ["rewardBtn", "item0", "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"];
            return BuyTenTimesPanelSkin;
        })(egret.gui.Skin);
        dialog.BuyTenTimesPanelSkin = BuyTenTimesPanelSkin;
        BuyTenTimesPanelSkin.prototype.__class__ = "skins.dialog.BuyTenTimesPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
