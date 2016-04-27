var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var RankBestLayerSkin = (function (_super) {
            __extends(RankBestLayerSkin, _super);
            function RankBestLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__8_i(), this.bestGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankBestLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankBestLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter"], [60, 0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "dialog_best_rank_title", 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [60, 480, 182, 74]);
                t.elementsContent = [this.__5_i(), this.btnBack_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "top", "percentWidth"], [50, 0, 0, 100]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__7_i()];
                return t;
            };
            __egretProto__.bestGroup_i = function () {
                var t = new egret.gui.Group();
                this.bestGroup = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "percentWidth"], [0, 0, 66, 100]);
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 4, 10, 10]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth"], [0, 0x605967, 100, 0, 100]);
                return t;
            };
            RankBestLayerSkin._skinParts = ["btnBack", "bestGroup"];
            return RankBestLayerSkin;
        })(egret.gui.Skin);
        dialog.RankBestLayerSkin = RankBestLayerSkin;
        RankBestLayerSkin.prototype.__class__ = "skins.dialog.RankBestLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
