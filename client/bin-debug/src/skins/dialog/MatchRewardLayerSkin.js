var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MatchRewardLayerSkin = (function (_super) {
            __extends(MatchRewardLayerSkin, _super);
            function MatchRewardLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__141_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MatchRewardLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MatchRewardLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__101_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__102_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__101_i();
                t.elementsContent = [this.__99_i(), this.__100_i()];
                return t;
            };
            __egretProto__.__103_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__104_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__103_i();
                t.elementsContent = [this.__94_i(), this.__98_i(), this.__102_i()];
                return t;
            };
            __egretProto__.__105_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__106_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__107_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__108_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__109_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__110_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__109_i();
                t.elementsContent = [this.__107_i(), this.__108_i()];
                return t;
            };
            __egretProto__.__111_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__112_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__113_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__114_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__113_i();
                t.elementsContent = [this.__111_i(), this.__112_i()];
                return t;
            };
            __egretProto__.__115_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__116_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__115_i();
                t.elementsContent = [this.__106_i(), this.__110_i(), this.__114_i()];
                return t;
            };
            __egretProto__.__117_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__118_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__119_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__120_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__121_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__122_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__121_i();
                t.elementsContent = [this.__119_i(), this.__120_i()];
                return t;
            };
            __egretProto__.__123_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__124_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__125_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__126_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__125_i();
                t.elementsContent = [this.__123_i(), this.__124_i()];
                return t;
            };
            __egretProto__.__127_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__128_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__127_i();
                t.elementsContent = [this.__118_i(), this.__122_i(), this.__126_i()];
                return t;
            };
            __egretProto__.__129_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__130_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__131_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__132_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__133_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__134_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__133_i();
                t.elementsContent = [this.__131_i(), this.__132_i()];
                return t;
            };
            __egretProto__.__135_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__136_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__137_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__138_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__137_i();
                t.elementsContent = [this.__135_i(), this.__136_i()];
                return t;
            };
            __egretProto__.__139_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__140_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__139_i();
                t.elementsContent = [this.__130_i(), this.__134_i(), this.__138_i()];
                return t;
            };
            __egretProto__.__141_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__7_i(), this.__8_i(), this.group1_i(), this.group2_i(), this.group3_i(), this.group4_i(), this.group5_i(), this.group6_i(), this.group7_i(), this.group8_i(), this.group9_i(), this.group10_i(), this.group11_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__13_i();
                t.elementsContent = [this.__11_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__17_i();
                t.elementsContent = [this.__15_i(), this.__16_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__19_i();
                t.elementsContent = [this.__10_i(), this.__14_i(), this.__18_i()];
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__25_i();
                t.elementsContent = [this.__23_i(), this.__24_i()];
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__29_i();
                t.elementsContent = [this.__27_i(), this.__28_i()];
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__31_i();
                t.elementsContent = [this.__22_i(), this.__26_i(), this.__30_i()];
                return t;
            };
            __egretProto__.__33_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__34_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__35_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__36_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__37_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__38_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__37_i();
                t.elementsContent = [this.__35_i(), this.__36_i()];
                return t;
            };
            __egretProto__.__39_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__40_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__41_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__42_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__41_i();
                t.elementsContent = [this.__39_i(), this.__40_i()];
                return t;
            };
            __egretProto__.__43_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__44_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__43_i();
                t.elementsContent = [this.__34_i(), this.__38_i(), this.__42_i()];
                return t;
            };
            __egretProto__.__45_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__46_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__47_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__48_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__49_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "horizontalCenter", "scale9Grid", "source", "top", "percentWidth"], [80, 0, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 0, 100]);
                return t;
            };
            __egretProto__.__50_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__49_i();
                t.elementsContent = [this.__47_i(), this.__48_i()];
                return t;
            };
            __egretProto__.__51_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__52_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__53_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__54_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__53_i();
                t.elementsContent = [this.__51_i(), this.__52_i()];
                return t;
            };
            __egretProto__.__55_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__56_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__55_i();
                t.elementsContent = [this.__46_i(), this.__50_i(), this.__54_i()];
                return t;
            };
            __egretProto__.__57_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__58_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__59_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.9, 0.9, "btn_match", 20, 11]);
                return t;
            };
            __egretProto__.__60_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__61_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__62_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__61_i();
                t.elementsContent = [this.__59_i(), this.__60_i()];
                return t;
            };
            __egretProto__.__63_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__64_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__65_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__66_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__65_i();
                t.elementsContent = [this.__63_i(), this.__64_i()];
                return t;
            };
            __egretProto__.__67_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__68_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__67_i();
                t.elementsContent = [this.__58_i(), this.__62_i(), this.__66_i()];
                return t;
            };
            __egretProto__.__69_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "奖励", 89, 25]);
                return t;
            };
            __egretProto__.__70_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__71_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__72_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__73_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__74_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__73_i();
                t.elementsContent = [this.__71_i(), this.__72_i()];
                return t;
            };
            __egretProto__.__75_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__76_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__77_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__78_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__77_i();
                t.elementsContent = [this.__75_i(), this.__76_i()];
                return t;
            };
            __egretProto__.__79_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [80, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.closeBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__80_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__79_i();
                t.elementsContent = [this.__70_i(), this.__74_i(), this.__78_i()];
                return t;
            };
            __egretProto__.__81_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__82_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__83_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__84_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__85_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__86_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__85_i();
                t.elementsContent = [this.__83_i(), this.__84_i()];
                return t;
            };
            __egretProto__.__87_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__88_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__89_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "排名越高获得\n奖励越丰富\n比赛时间24小时", 29, 106]);
                return t;
            };
            __egretProto__.__90_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__89_i();
                t.elementsContent = [this.__87_i(), this.__88_i()];
                return t;
            };
            __egretProto__.__91_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 2;
                return t;
            };
            __egretProto__.__92_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "verticalCenter"], [30, 0]);
                t.layout = this.__91_i();
                t.elementsContent = [this.__82_i(), this.__86_i(), this.__90_i()];
                return t;
            };
            __egretProto__.__93_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.__94_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "第1名", 0]);
                return t;
            };
            __egretProto__.__95_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "diamond", 43, 596]);
                return t;
            };
            __egretProto__.__96_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__97_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__98_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__97_i();
                t.elementsContent = [this.__95_i(), this.__96_i()];
                return t;
            };
            __egretProto__.__99_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.3, 0.3, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width"], [0x2C2930, 104, 226]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 18]);
                return t;
            };
            __egretProto__.group10_i = function () {
                var t = new egret.gui.Group();
                this.group10 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 7, 638]);
                t.elementsContent = [this.__117_i(), this.__128_i()];
                return t;
            };
            __egretProto__.group11_i = function () {
                var t = new egret.gui.Group();
                this.group11 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 638]);
                t.elementsContent = [this.__129_i(), this.__140_i()];
                return t;
            };
            __egretProto__.group1_i = function () {
                var t = new egret.gui.Group();
                this.group1 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 88]);
                t.elementsContent = [this.__9_i(), this.__20_i()];
                return t;
            };
            __egretProto__.group2_i = function () {
                var t = new egret.gui.Group();
                this.group2 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 7, 198]);
                t.elementsContent = [this.__21_i(), this.__32_i()];
                return t;
            };
            __egretProto__.group3_i = function () {
                var t = new egret.gui.Group();
                this.group3 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 198]);
                t.elementsContent = [this.__33_i(), this.__44_i()];
                return t;
            };
            __egretProto__.group4_i = function () {
                var t = new egret.gui.Group();
                this.group4 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 7, 308]);
                t.elementsContent = [this.__45_i(), this.__56_i()];
                return t;
            };
            __egretProto__.group5_i = function () {
                var t = new egret.gui.Group();
                this.group5 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 308]);
                t.elementsContent = [this.__57_i(), this.__68_i()];
                return t;
            };
            __egretProto__.group6_i = function () {
                var t = new egret.gui.Group();
                this.group6 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 7, 418]);
                t.elementsContent = [this.__69_i(), this.__80_i()];
                return t;
            };
            __egretProto__.group7_i = function () {
                var t = new egret.gui.Group();
                this.group7 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 418]);
                t.elementsContent = [this.__81_i(), this.__92_i()];
                return t;
            };
            __egretProto__.group8_i = function () {
                var t = new egret.gui.Group();
                this.group8 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 7, 528]);
                t.elementsContent = [this.__93_i(), this.__104_i()];
                return t;
            };
            __egretProto__.group9_i = function () {
                var t = new egret.gui.Group();
                this.group9 = t;
                this.__s(t, ["height", "width", "x", "y"], [104, 226, 247, 528]);
                t.elementsContent = [this.__105_i(), this.__116_i()];
                return t;
            };
            __egretProto__.__100_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            MatchRewardLayerSkin._skinParts = ["closeBtn", "group1", "group2", "group3", "group4", "group5", "group6", "group7", "group8", "group9", "group10", "group11"];
            return MatchRewardLayerSkin;
        })(egret.gui.Skin);
        dialog.MatchRewardLayerSkin = MatchRewardLayerSkin;
        MatchRewardLayerSkin.prototype.__class__ = "skins.dialog.MatchRewardLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
