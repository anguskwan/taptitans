var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var BottomPopUpDialogSkin = (function (_super) {
            __extends(BottomPopUpDialogSkin, _super);
            function BottomPopUpDialogSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [337, 480]);
                this.elementsContent = [this.pic_bg_i(), this.btnClose_i(), this.btnMinMax_i(), this.tapGroup_i(), this.__5_i(), this.lvUnlockLbl_i(), this.shopList_i(), this.halidomList_i(), this.heroesList_i(), this.masterList_i(), this.handImg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BottomPopUpDialogSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BottomPopUpDialogSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "right", "top"], [28, 33, 31]);
                t.layout = this.__4_i();
                t.elementsContent = [this.coinImg_i(), this.coinLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.btnClose_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnClose = t;
                this.__s(t, ["right", "source", "top"], [0, "btn_main_close", 0]);
                return t;
            };
            __egretProto__.btnMinMax_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnMinMax = t;
                this.__s(t, ["right", "source", "top"], [54, "btn_main_max", 0]);
                return t;
            };
            __egretProto__.coinImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.coinImg = t;
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.7, 0.7, "coin", 0, 374]);
                return t;
            };
            __egretProto__.coinLbl_i = function () {
                var t = new egret.gui.Label();
                this.coinLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.explanation_i = function () {
                var t = new egret.gui.Label();
                this.explanation = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "verticalCenter"], [true, "Arial", 193.5, 14, "DPS（每秒攻击力）", 0xACA5B7, 0]);
                return t;
            };
            __egretProto__.halidomList_i = function () {
                var t = new egret.gui.List();
                this.halidomList = t;
                this.__s(t, ["bottom", "top", "useVirtualLayout", "width", "x"], [0, 60, true, 464, 8]);
                t.layout = this.__7_i();
                return t;
            };
            __egretProto__.handImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.handImg = t;
                this.__s(t, ["source", "touchEnabled", "visible", "x", "y"], ["icon_hand", false, false, 415, 23]);
                return t;
            };
            __egretProto__.heroesList_i = function () {
                var t = new egret.gui.List();
                this.heroesList = t;
                this.__s(t, ["bottom", "top", "useVirtualLayout", "width", "x"], [0, 60, true, 464, 8]);
                t.layout = this.__8_i();
                return t;
            };
            __egretProto__.lvUnlockLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvUnlockLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "top", "verticalAlign"], [true, "Arial", 0, 14, "标签", "center", 234, "middle"]);
                return t;
            };
            __egretProto__.masterList_i = function () {
                var t = new egret.gui.List();
                this.masterList = t;
                this.__s(t, ["bottom", "top", "useVirtualLayout", "width", "x"], [0, 60, true, 464, 8]);
                t.layout = this.__9_i();
                return t;
            };
            __egretProto__.pic_bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.pic_bg = t;
                this.__s(t, ["percentHeight", "scale9Grid", "source", "x", "y"], [100, egret.gui.getScale9Grid("60,66,315,229"), "scrollview_bg1", 0, 0]);
                return t;
            };
            __egretProto__.shopList_i = function () {
                var t = new egret.gui.List();
                this.shopList = t;
                this.__s(t, ["bottom", "top", "useVirtualLayout", "width", "x"], [0, 60, true, 464, 8]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "left", "middle"]);
                return t;
            };
            __egretProto__.tapDamage_i = function () {
                var t = new egret.gui.Label();
                this.tapDamage = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", "middle", 0, 15]);
                return t;
            };
            __egretProto__.tapGroup_i = function () {
                var t = new egret.gui.Group();
                this.tapGroup = t;
                this.__s(t, ["height", "top", "x"], [28, 31, 10]);
                t.layout = this.__3_i();
                t.elementsContent = [this.tapDamage_i(), this.explanation_i()];
                return t;
            };
            BottomPopUpDialogSkin._skinParts = ["pic_bg", "btnClose", "btnMinMax", "tapDamage", "explanation", "tapGroup", "coinImg", "coinLbl", "lvUnlockLbl", "shopList", "halidomList", "heroesList", "masterList", "handImg"];
            return BottomPopUpDialogSkin;
        })(egret.gui.Skin);
        mod.BottomPopUpDialogSkin = BottomPopUpDialogSkin;
        BottomPopUpDialogSkin.prototype.__class__ = "skins.mod.BottomPopUpDialogSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
