var skins;
(function (skins) {
    var components;
    (function (components) {
        var CommonBigItemButtonSkin = (function (_super) {
            __extends(CommonBigItemButtonSkin, _super);
            function CommonBigItemButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [58, 364]);
                this.elementsContent = [this.iconGroup_i(), this.textGroup_i()];
                this.disabledSkin_i();
                this.downSkin_i();
                this.upSkin_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("upSkin", "", "before", "iconGroup")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("downSkin", "", "before", "iconGroup")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.AddItems("disabledSkin", "", "before", "iconGroup")
                    ])
                ];
            }
            var __egretProto__ = CommonBigItemButtonSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return CommonBigItemButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [4, "center", "middle"]);
                return t;
            };
            __egretProto__.disabledSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_big_blue", 0]);
                return t;
            };
            __egretProto__.downSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_big_blue", 0]);
                return t;
            };
            __egretProto__.iconGroup_i = function () {
                var t = new egret.gui.Group();
                this.iconGroup = t;
                this.__s(t, ["horizontalCenter", "verticalCenter"], [1.5, -18]);
                t.layout = this.__4_i();
                t.elementsContent = [this.iconImg_i(), this.iconLbl_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.55, 0.55, "coin", 34, 3]);
                return t;
            };
            __egretProto__.iconLbl_i = function () {
                var t = new egret.gui.Label();
                this.iconLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 13, "center", "middle", 5, 1]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.textGroup_i = function () {
                var t = new egret.gui.Group();
                this.textGroup = t;
                this.__s(t, ["horizontalCenter", "verticalCenter"], [1.5, 10]);
                t.layout = this.__5_i();
                t.elementsContent = [this.textLbl_i(), this.upgradeLbl_i()];
                return t;
            };
            __egretProto__.textLbl_i = function () {
                var t = new egret.gui.Label();
                this.textLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "center", "middle", 5, 1]);
                return t;
            };
            __egretProto__.upSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_big_blue", 0]);
                return t;
            };
            __egretProto__.upgradeLbl_i = function () {
                var t = new egret.gui.Label();
                this.upgradeLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "center", "middle", 15, 11]);
                return t;
            };
            CommonBigItemButtonSkin._skinParts = ["disabledSkin", "downSkin", "upSkin", "iconImg", "iconLbl", "iconGroup", "textLbl", "upgradeLbl", "textGroup"];
            return CommonBigItemButtonSkin;
        })(egret.gui.Skin);
        components.CommonBigItemButtonSkin = CommonBigItemButtonSkin;
        CommonBigItemButtonSkin.prototype.__class__ = "skins.components.CommonBigItemButtonSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
