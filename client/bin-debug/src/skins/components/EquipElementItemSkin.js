var skins;
(function (skins) {
    var components;
    (function (components) {
        var EquipElementItemSkin = (function (_super) {
            __extends(EquipElementItemSkin, _super);
            function EquipElementItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [135, 138]);
                this.elementsContent = [this.progress_i(), this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipElementItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipElementItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [1, "center"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.8, 0x2E2C31, 100, 100]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "equip_lock", 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "touchChildren", "touchEnabled", "percentWidth"], [-1, 130, false, false, 100]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.selectImg_i(), this.suitImg_i(), this.nameLbl_i(), this.lvLbl_i(), this.attLbl_i(), this.starGroup_i(), this.lockGroup_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["fontFamily", "right", "size", "text", "textColor", "y"], ["Arial", 0, 16, "0%", 0xFFFFFF, 107]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [90, 1, -0.5, 90]);
                return t;
            };
            __egretProto__.lockGroup_i = function () {
                var t = new egret.gui.Group();
                this.lockGroup = t;
                this.__s(t, ["percentHeight", "percentWidth", "y"], [100, 100, -1]);
                t.elementsContent = [this.__5_i(), this.__6_i()];
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "Lv.0", 0x24B2E6, 2, 25]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "名字", 0x605A68, 2, 4]);
                return t;
            };
            __egretProto__.progress_i = function () {
                var t = new uiskins.EquipExpProgressBar();
                this.progress = t;
                this.__s(t, ["horizontalCenter", "skinName"], [0, skins.components.EquipExpProgressBarSkin]);
                return t;
            };
            __egretProto__.selectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg = t;
                this.__s(t, ["height", "source", "width", "y"], [130, "equip_element_select", 138, -1]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth", "y"], [0x2E2C31, 100, 100, -1]);
                return t;
            };
            __egretProto__.star1_i = function () {
                var t = new egret.gui.UIAsset();
                this.star1 = t;
                this.__s(t, ["height", "source", "width"], [14, "equip_icon_star_off", 16]);
                return t;
            };
            __egretProto__.star2_i = function () {
                var t = new egret.gui.UIAsset();
                this.star2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [14, "equip_icon_star_off", 16, 10, 10]);
                return t;
            };
            __egretProto__.star3_i = function () {
                var t = new egret.gui.UIAsset();
                this.star3 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [14, "equip_icon_star_off", 16, 20, 20]);
                return t;
            };
            __egretProto__.star4_i = function () {
                var t = new egret.gui.UIAsset();
                this.star4 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [14, "equip_icon_star_off", 16, 30, 30]);
                return t;
            };
            __egretProto__.star5_i = function () {
                var t = new egret.gui.UIAsset();
                this.star5 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [14, "equip_icon_star_off", 16, 40, 40]);
                return t;
            };
            __egretProto__.starGroup_i = function () {
                var t = new egret.gui.Group();
                this.starGroup = t;
                this.__s(t, ["x", "y"], [5, 108]);
                t.layout = this.__4_i();
                t.elementsContent = [this.star1_i(), this.star2_i(), this.star3_i(), this.star4_i(), this.star5_i()];
                return t;
            };
            __egretProto__.suitImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.suitImg = t;
                this.__s(t, ["height", "width", "x", "y"], [18, 18, 114, 5]);
                return t;
            };
            EquipElementItemSkin._skinParts = ["progress", "iconImg", "selectImg", "suitImg", "nameLbl", "lvLbl", "attLbl", "star1", "star2", "star3", "star4", "star5", "starGroup", "lockGroup"];
            return EquipElementItemSkin;
        })(egret.gui.Skin);
        components.EquipElementItemSkin = EquipElementItemSkin;
        EquipElementItemSkin.prototype.__class__ = "skins.components.EquipElementItemSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
