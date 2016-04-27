var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PKCompleteLayerSkin = (function (_super) {
            __extends(PKCompleteLayerSkin, _super);
            function PKCompleteLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKCompleteLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKCompleteLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "horizontalCenter", "scale9Grid", "source", "top", "percentWidth"], [130, 0, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [130, 100]);
                t.elementsContent = [this.__4_i(), this.scoreLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], ["Arial", 0, 24, "退出", "center", false, "middle", 0]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["touchEnabled", "x", "y"], [false, 16, 687]);
                t.elementsContent = [this.backBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth", "x", "y"], [100, 0, 0, 100, 20, 20]);
                t.elementsContent = [this.__3_i(), this.bgImg_i(), this.__5_i(), this.iconOppImg_i(), this.iconSelfImg_i(), this.pkList_i(), this.nameSelfLbl_i(), this.nameOppLbl_i(), this.__8_i(), this.searchOppGroup_i()];
                return t;
            };
            __egretProto__.backBtn_i = function () {
                var t = new egret.gui.Button();
                this.backBtn = t;
                this.__s(t, ["enabled", "skinName", "width"], [true, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 140]);
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.iconOppImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconOppImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [60, "icon_default", 60, 323, 22]);
                return t;
            };
            __egretProto__.iconSelfImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconSelfImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [60, "icon_default", 60, 97, 20]);
                return t;
            };
            __egretProto__.nameOppLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameOppLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 112, 18, "英雄", "center", "middle", 10, 89]);
                return t;
            };
            __egretProto__.nameSelfLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameSelfLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", -114, 18, "英雄", "center", "middle", 89]);
                return t;
            };
            __egretProto__.pkList_i = function () {
                var t = new egret.gui.List();
                this.pkList = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "percentWidth"], [76, 0, 130, true, 100]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.scoreLbl = t;
                this.__s(t, ["font", "horizontalCenter", "scaleX", "scaleY", "text", "y"], ["font_white_fnt", 0, 1.6, 1.6, "0:0", 41]);
                return t;
            };
            __egretProto__.searchOppBtn_i = function () {
                var t = new egret.gui.Button();
                this.searchOppBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["enabled", "skinName", "width"], [true, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 300]);
                return t;
            };
            __egretProto__.searchOppGroup_i = function () {
                var t = new egret.gui.Group();
                this.searchOppGroup = t;
                this.__s(t, ["touchEnabled", "visible", "width", "x", "y"], [false, false, 300, 166, 687]);
                t.elementsContent = [this.searchOppBtn_i(), this.searchOppLbl_i()];
                return t;
            };
            __egretProto__.searchOppLbl_i = function () {
                var t = new egret.gui.Label();
                this.searchOppLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], ["Arial", 0, 24, "匹配对手", "center", false, "middle", 0]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 20, 20]);
                return t;
            };
            PKCompleteLayerSkin._skinParts = ["bgImg", "scoreLbl", "iconOppImg", "iconSelfImg", "pkList", "nameSelfLbl", "nameOppLbl", "backBtn", "searchOppBtn", "searchOppLbl", "searchOppGroup"];
            return PKCompleteLayerSkin;
        })(egret.gui.Skin);
        dialog.PKCompleteLayerSkin = PKCompleteLayerSkin;
        PKCompleteLayerSkin.prototype.__class__ = "skins.dialog.PKCompleteLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
