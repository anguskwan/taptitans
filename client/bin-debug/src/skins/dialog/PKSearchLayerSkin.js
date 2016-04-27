var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PKSearchLayerSkin = (function (_super) {
            __extends(PKSearchLayerSkin, _super);
            function PKSearchLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__31_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKSearchLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKSearchLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "pk_icon_pk", 0, 374]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 101, 9]);
                t.layout = this.__12_i();
                t.elementsContent = [this.__11_i(), this.attSelfLbl_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "height", "source", "verticalCenter", "width", "x"], [true, "scale", 24, "icon_lvup_weapon", 0, 24, 374]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 101, 37]);
                t.layout = this.__14_i();
                t.elementsContent = [this.__15_i(), this.weaponSelfLbl_i()];
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [100, 200, 26, 318]);
                t.elementsContent = [this.__9_i(), this.__10_i(), this.__13_i(), this.__16_i()];
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 18, "攻击力：", "center", "middle", 24, 11]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 18, "武器：", "center", "middle", 42, 40]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "pk_icon_pk", 0, 374]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 101, 9]);
                t.layout = this.__21_i();
                t.elementsContent = [this.__20_i(), this.attOppLbl_i()];
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "height", "source", "verticalCenter", "width", "x"], [true, "scale", 24, "icon_lvup_weapon", 0, 24, 374]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "left", "y"], [28, 101, 37]);
                t.layout = this.__23_i();
                t.elementsContent = [this.__24_i(), this.weaponOppLbl_i()];
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [100, 200, 253, 318]);
                t.elementsContent = [this.__18_i(), this.__19_i(), this.__22_i(), this.__25_i()];
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter", "x"], ["Arial", 24, "重新匹配 -1", "center", false, "middle", 0, 32]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "touchEnabled", "verticalCenter", "x"], ["morale", false, 0, 164]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], ["Arial", 0, 24, "开始对战", "center", false, "middle", 0]);
                return t;
            };
            __egretProto__.__30_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 18, "Tips:PK可获得装备经验和装备碎片", "center", "middle", 694]);
                return t;
            };
            __egretProto__.__31_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.bgImg_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.iconOppImg_i(), this.iconSelfImg_i(), this.glassImg_i(), this.__17_i(), this.__26_i(), this.resetGroup_i(), this.startGroup_i(), this.nameSelfLbl_i(), this.nameOppLbl_i(), this.__30_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 20, 20]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "horizontalCenter", "scale9Grid", "source", "top", "percentWidth"], [100, 0, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.btnBack_i(), this.progressGroup_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 114, 114, 70, 157]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 114, 114, 296, 157]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["pk_vs", 190, 188]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 18, "攻击力：", "center", "middle", 24, 11]);
                return t;
            };
            __egretProto__.attOppLbl_i = function () {
                var t = new egret.gui.Label();
                this.attOppLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.attSelfLbl_i = function () {
                var t = new egret.gui.Label();
                this.attSelfLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.bgImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bgImg = t;
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 11]);
                return t;
            };
            __egretProto__.glassImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.glassImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["pk_glass", false, 357, 114]);
                return t;
            };
            __egretProto__.iconOppImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconOppImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [100, "icon_default", 100, 303, 163]);
                return t;
            };
            __egretProto__.iconSelfImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconSelfImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [100, "icon_default", 100, 77, 163]);
                return t;
            };
            __egretProto__.nameOppLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameOppLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 112, 18, "英雄", "center", "middle", 10, 284]);
                return t;
            };
            __egretProto__.nameSelfLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameSelfLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", -114, 18, "英雄", "center", "middle", 284]);
                return t;
            };
            __egretProto__.progressGroup_i = function () {
                var t = new uiskins.PKMoraleProgressGroup();
                this.progressGroup = t;
                this.__s(t, ["skinName", "y"], [skins.components.PKMoraleProgressGroupSkin, 8]);
                return t;
            };
            __egretProto__.resetBtn_i = function () {
                var t = new egret.gui.Button();
                this.resetBtn = t;
                this.__s(t, ["enabled", "skinName", "width"], [false, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 220]);
                return t;
            };
            __egretProto__.resetGroup_i = function () {
                var t = new egret.gui.Group();
                this.resetGroup = t;
                this.__s(t, ["touchEnabled", "visible", "x", "y"], [false, false, 16, 617]);
                t.elementsContent = [this.resetBtn_i(), this.__27_i(), this.__28_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], ["Arial", 18, "武器：", "center", "middle", 42, 40]);
                return t;
            };
            __egretProto__.startBtn_i = function () {
                var t = new egret.gui.Button();
                this.startBtn = t;
                t.setStyle("fontFamily", "Arial");
                t.setStyle("size", 24);
                t.setStyle("textAlign", "center");
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["enabled", "skinName", "width"], [false, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 220]);
                return t;
            };
            __egretProto__.startGroup_i = function () {
                var t = new egret.gui.Group();
                this.startGroup = t;
                this.__s(t, ["touchEnabled", "visible", "x", "y"], [false, false, 244, 617]);
                t.elementsContent = [this.startBtn_i(), this.__29_i()];
                return t;
            };
            __egretProto__.weaponOppLbl_i = function () {
                var t = new egret.gui.Label();
                this.weaponOppLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.weaponSelfLbl_i = function () {
                var t = new egret.gui.Label();
                this.weaponSelfLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            PKSearchLayerSkin._skinParts = ["bgImg", "btnBack", "progressGroup", "iconOppImg", "iconSelfImg", "glassImg", "attSelfLbl", "weaponSelfLbl", "attOppLbl", "weaponOppLbl", "resetBtn", "resetGroup", "startBtn", "startGroup", "nameSelfLbl", "nameOppLbl"];
            return PKSearchLayerSkin;
        })(egret.gui.Skin);
        dialog.PKSearchLayerSkin = PKSearchLayerSkin;
        PKSearchLayerSkin.prototype.__class__ = "skins.dialog.PKSearchLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
