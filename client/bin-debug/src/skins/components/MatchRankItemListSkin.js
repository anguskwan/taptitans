var skins;
(function (skins) {
    var components;
    (function (components) {
        var MatchRankItemListSkin = (function (_super) {
            __extends(MatchRankItemListSkin, _super);
            function MatchRankItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [44, 462]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MatchRankItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MatchRankItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["right", "y"], [38, 10]);
                t.layout = this.__4_i();
                t.elementsContent = [this.lvLbl_i(), this.stageImg_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.nameLbl_i(), this.numLbl_i(), this.numImg_i(), this.__5_i(), this.lineImg_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [30, "icon_default", 0, 30, 84]);
                return t;
            };
            __egretProto__.lineImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.lineImg = t;
                this.__s(t, ["bottom", "horizontalCenter", "source"], [0, 0.5, "rank_line"]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter"], [true, "Arial", 18, "0关", "left", 0xFFFFFF, 0]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, 0, 122]);
                return t;
            };
            __egretProto__.numImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.numImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "visible", "x", "y"], [0.5, 0.5, "rank_num1", false, 34, 9]);
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalCenter", "visible"], [true, "Arial", -186, 18, "100", "center", 0, false]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x39363F, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.stageImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.stageImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "submap1_1", 6, 5]);
                return t;
            };
            MatchRankItemListSkin._skinParts = ["iconImg", "nameLbl", "numLbl", "numImg", "lvLbl", "stageImg", "lineImg"];
            return MatchRankItemListSkin;
        })(egret.gui.Skin);
        components.MatchRankItemListSkin = MatchRankItemListSkin;
        MatchRankItemListSkin.prototype.__class__ = "skins.components.MatchRankItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
