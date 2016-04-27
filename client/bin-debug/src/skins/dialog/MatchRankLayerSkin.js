var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MatchRankLayerSkin = (function (_super) {
            __extends(MatchRankLayerSkin, _super);
            function MatchRankLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__32_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MatchRankLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MatchRankLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "排名190", 0x88868A, 0, 27]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["diamond", 43, 596]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "5钻石", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 54]);
                t.layout = this.__14_i();
                t.elementsContent = [this.__12_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.4, 0.4, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 26, 2]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__16_i();
                t.elementsContent = [this.__17_i(), this.__18_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "下个阶段奖励", 0]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "排名190", 0x88868A, 0, 27]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["diamond", 43, 596]);
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
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.4, 0.4, "btn_weapon", 43, 596]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 16, "0武器升级", 0x88868A, 10, 36]);
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [0, 82]);
                t.layout = this.__27_i();
                t.elementsContent = [this.__28_i(), this.__29_i()];
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__32_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__5_i(), this.__6_i(), this.timeLbl_i(), this.rankGroup_i(), this.__8_i(), this.__9_i(), this.rightBtn_i(), this.currGroup_i(), this.nextGroup_i(), this.rewardBtn_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "horizontalCenter", "scale9Grid", "source", "top", "percentWidth"], [80, 0, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [80, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.titleLbl1_i(), this.titleLbl2_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 18, "排行榜", "center", "middle", 19, 83]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "奖励", 19, 480]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 170, 464, 8, 508]);
                return t;
            };
            __egretProto__.currGroup_i = function () {
                var t = new egret.gui.Group();
                this.currGroup = t;
                this.__s(t, ["visible", "x", "y"], [false, 39, 521]);
                t.layout = this.__20_i();
                t.elementsContent = [this.__10_i(), this.__11_i(), this.__15_i(), this.__19_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.9, 0.9, "btn_match", 20, 11]);
                return t;
            };
            __egretProto__.nextGroup_i = function () {
                var t = new egret.gui.Group();
                this.nextGroup = t;
                this.__s(t, ["visible", "x", "y"], [false, 269, 521]);
                t.layout = this.__31_i();
                t.elementsContent = [this.__21_i(), this.__22_i(), this.__26_i(), this.__30_i()];
                return t;
            };
            __egretProto__.rankGroup_i = function () {
                var t = new egret.gui.Group();
                this.rankGroup = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [372, 0, 464, 105]);
                t.layout = this.__7_i();
                return t;
            };
            __egretProto__.rewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.rewardBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 16);
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [30, "奖励内容", new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red"), 80, 349, 636]);
                return t;
            };
            __egretProto__.rightBtn_i = function () {
                var t = new egret.gui.Button();
                this.rightBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["label", "skinName", "x", "y"], ["继续", new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 90, 688]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x"], [true, "Arial", 18, "目前奖励", 0]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "text", "textAlign", "verticalAlign", "visible", "y"], [true, "Arial", 21, 18, "00:00:00剩余时间", "center", "middle", false, 82]);
                return t;
            };
            __egretProto__.titleLbl1_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "比赛", 89, 14]);
                return t;
            };
            __egretProto__.titleLbl2_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "你正在参加一场比赛", 89, 46]);
                return t;
            };
            MatchRankLayerSkin._skinParts = ["iconImg", "titleLbl1", "titleLbl2", "timeLbl", "rankGroup", "rightBtn", "currGroup", "nextGroup", "rewardBtn"];
            return MatchRankLayerSkin;
        })(egret.gui.Skin);
        dialog.MatchRankLayerSkin = MatchRankLayerSkin;
        MatchRankLayerSkin.prototype.__class__ = "skins.dialog.MatchRankLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
