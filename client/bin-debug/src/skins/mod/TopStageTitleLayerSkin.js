var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var TopStageTitleLayerSkin = (function (_super) {
            __extends(TopStageTitleLayerSkin, _super);
            function TopStageTitleLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [70, 200]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TopStageTitleLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TopStageTitleLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width"], [100, 0, 0, 200]);
                t.elementsContent = [this.__3_i(), this.currGroup_i(), this.currAniGroup_i(), this.preGroup_i(), this.preAniGroup_i(), this.nextGroup_i(), this.nextAniGroup_i()];
                return t;
            };
            __egretProto__.currAniGroup_i = function () {
                var t = new egret.gui.Group();
                this.currAniGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x", "y"], [60, 3, 36, 82, 10]);
                t.elementsContent = [this.currAniImg_i(), this.currAniStage_i()];
                return t;
            };
            __egretProto__.currAniImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.currAniImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "stage_icon", 11]);
                return t;
            };
            __egretProto__.currAniStage_i = function () {
                var t = new egret.gui.Label();
                this.currAniStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 24, "0", -22]);
                return t;
            };
            __egretProto__.currGroup_i = function () {
                var t = new egret.gui.Group();
                this.currGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [60, 3, 36, 82]);
                t.elementsContent = [this.currImg_i(), this.currStage_i()];
                return t;
            };
            __egretProto__.currImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.currImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "stage_icon", 11]);
                return t;
            };
            __egretProto__.currStage_i = function () {
                var t = new egret.gui.Label();
                this.currStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 24, "0", -22]);
                return t;
            };
            __egretProto__.nextAniGroup_i = function () {
                var t = new egret.gui.Group();
                this.nextAniGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x", "y"], [60, 3, 36, 128, 10]);
                t.elementsContent = [this.nextAniImg_i(), this.nextAniStage_i()];
                return t;
            };
            __egretProto__.nextAniImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.nextAniImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [30, 0, "stage_icon", 11, 30]);
                return t;
            };
            __egretProto__.nextAniStage_i = function () {
                var t = new egret.gui.Label();
                this.nextAniStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 18, "0", -17]);
                return t;
            };
            __egretProto__.nextGroup_i = function () {
                var t = new egret.gui.Group();
                this.nextGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [60, 3, 36, 128]);
                t.elementsContent = [this.nextImg_i(), this.nextStage_i()];
                return t;
            };
            __egretProto__.nextImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.nextImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [30, 0, "stage_icon", 11, 30]);
                return t;
            };
            __egretProto__.nextStage_i = function () {
                var t = new egret.gui.Label();
                this.nextStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 18, "0", -17]);
                return t;
            };
            __egretProto__.preAniGroup_i = function () {
                var t = new egret.gui.Group();
                this.preAniGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x", "y"], [60, 3, 36, 36, 10]);
                t.elementsContent = [this.preAniImg_i(), this.preAniStage_i()];
                return t;
            };
            __egretProto__.preAniImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.preAniImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [30, 0, "stage_icon", 11, 30]);
                return t;
            };
            __egretProto__.preAniStage_i = function () {
                var t = new egret.gui.Label();
                this.preAniStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 18, "0", -17]);
                return t;
            };
            __egretProto__.preGroup_i = function () {
                var t = new egret.gui.Group();
                this.preGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [60, 3, 36, 36]);
                t.elementsContent = [this.preImg_i(), this.preStage_i()];
                return t;
            };
            __egretProto__.preImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.preImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [30, 0, "stage_icon", 11, 30]);
                return t;
            };
            __egretProto__.preStage_i = function () {
                var t = new egret.gui.Label();
                this.preStage = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "verticalCenter"], [true, "Arial", 0, 18, "0", -17]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "stage_bg", 12.5]);
                return t;
            };
            TopStageTitleLayerSkin._skinParts = ["currImg", "currStage", "currGroup", "currAniImg", "currAniStage", "currAniGroup", "preImg", "preStage", "preGroup", "preAniImg", "preAniStage", "preAniGroup", "nextImg", "nextStage", "nextGroup", "nextAniImg", "nextAniStage", "nextAniGroup"];
            return TopStageTitleLayerSkin;
        })(egret.gui.Skin);
        mod.TopStageTitleLayerSkin = TopStageTitleLayerSkin;
        TopStageTitleLayerSkin.prototype.__class__ = "skins.mod.TopStageTitleLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
