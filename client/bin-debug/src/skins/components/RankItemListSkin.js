var skins;
(function (skins) {
    var components;
    (function (components) {
        var RankItemListSkin = (function (_super) {
            __extends(RankItemListSkin, _super);
            function RankItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 462]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "horizontalCenter", "source"], [0, 0, "rank_line"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.nameLbl_i(), this.numLbl_i(), this.selfLbl_i(), this.lvLbl_i(), this.currLbl_i(), this.btnVisit_i(), this.__5_i(), this.numImg_i()];
                return t;
            };
            __egretProto__.btnVisit_i = function () {
                var t = new egret.gui.Button();
                this.btnVisit = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("rank_btn_visit", "rank_btn_visit", "rank_btn_visit"), false, 322, 17]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x", "y"], [true, "Arial", 14, "当前关卡：23     神器数：5", "left", 0x88848C, 23, 150, 10]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [58, "icon_default", 0, 58, 84]);
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x"], [true, "Arial", 18, "历史最高关卡：41", "left", 0xFFE010, 0, 149]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x"], [true, "Arial", 18, "名字", "left", 0x51D4F3, -24, 149]);
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
            RankItemListSkin._skinParts = ["iconImg", "nameLbl", "numLbl", "selfLbl", "lvLbl", "currLbl", "btnVisit", "numImg"];
            return RankItemListSkin;
        })(egret.gui.Skin);
        components.RankItemListSkin = RankItemListSkin;
        RankItemListSkin.prototype.__class__ = "skins.components.RankItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
