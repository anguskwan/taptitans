var skins;
(function (skins) {
    var components;
    (function (components) {
        var PKHeroItemListSkin = (function (_super) {
            __extends(PKHeroItemListSkin, _super);
            function PKHeroItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [79, 218]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKHeroItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKHeroItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "DPS:", 81, 29]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "装备克制:", 81, 29]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "right", "bottom"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.bgImg_i(), this.iconImg_i(), this.nameLbl_i(), this.dpsGroup_i(), this.equipGroup_i(), this.victoryImg_i()];
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                t.source = "pk_banner_left";
                return t;
            };
            __egretProto__.dpsGroup_i = function () {
                var t = new egret.gui.Group();
                this.dpsGroup = t;
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["x", "y"], [76, 31]);
                t.layout = this.__3_i();
                t.elementsContent = [this.__4_i(), this.dpsLbl_i()];
                return t;
            };
            __egretProto__.dpsLbl_i = function () {
                var t = new egret.gui.Label();
                this.dpsLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 12, "0", "right", 0xFF7F01, 34, 39]);
                return t;
            };
            __egretProto__.equipGroup_i = function () {
                var t = new egret.gui.Group();
                this.equipGroup = t;
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["visible", "x", "y"], [false, 76, 52]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__5_i(), this.equipLbl_i()];
                return t;
            };
            __egretProto__.equipLbl_i = function () {
                var t = new egret.gui.Label();
                this.equipLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "stroke", "strokeColor", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 12, 1, 0xFFFFFF, "0", "right", 0xFF0000, 34, 39]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 12, 10]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 12, "名字", "left", "middle", 76, 9]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "right", "bottom"]);
                return t;
            };
            __egretProto__.victoryImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.victoryImg = t;
                this.__s(t, ["source", "x", "y"], ["pk_icon_victory", 169, 16]);
                return t;
            };
            PKHeroItemListSkin._skinParts = ["bgImg", "iconImg", "nameLbl", "dpsLbl", "dpsGroup", "equipLbl", "equipGroup", "victoryImg"];
            return PKHeroItemListSkin;
        })(egret.gui.Skin);
        components.PKHeroItemListSkin = PKHeroItemListSkin;
        PKHeroItemListSkin.prototype.__class__ = "skins.components.PKHeroItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
