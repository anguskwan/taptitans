var skins;
(function (skins) {
    var components;
    (function (components) {
        var RankBestItemListSkin = (function (_super) {
            __extends(RankBestItemListSkin, _super);
            function RankBestItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 462]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankBestItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankBestItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "pk_icon_pk", 0, 374]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 149, 26]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__6_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "horizontalCenter", "source"], [0, 0, "rank_line"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.nameLbl_i(), this.numLbl_i(), this.selfLbl_i(), this.currLbl_i(), this.__7_i(), this.__8_i(), this.numImg_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "历史最高关卡：0   武器：0", "left", 0xFFE010, 149, 51]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [58, "icon_default", 0, 58, 84]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "名字", "left", 0xFFFFFF, 149, 4]);
                return t;
            };
            __egretProto__.numImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.numImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["rank_num1", false, 20, 15]);
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalCenter", "visible"], [true, "Arial", -186, 24, "100", "center", 0, false]);
                return t;
            };
            __egretProto__.selfLbl_i = function () {
                var t = new egret.gui.Label();
                this.selfLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalCenter", "visible", "x", "y"], [true, "Arial", 144, 20, "我", "center", 0.5, false, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x39363F, 100, 0, 0, 100]);
                return t;
            };
            RankBestItemListSkin._skinParts = ["iconImg", "nameLbl", "numLbl", "selfLbl", "currLbl", "attLbl", "numImg"];
            return RankBestItemListSkin;
        })(egret.gui.Skin);
        components.RankBestItemListSkin = RankBestItemListSkin;
        RankBestItemListSkin.prototype.__class__ = "skins.components.RankBestItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
