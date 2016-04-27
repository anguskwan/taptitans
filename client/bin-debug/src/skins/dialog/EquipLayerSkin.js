var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var EquipLayerSkin = (function (_super) {
            __extends(EquipLayerSkin, _super);
            function EquipLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__29_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Rect();
                t.setStyle("textColor", 0x2E2C31);
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2E2C31, 64, 244, 229, 64]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2E2C31, 58, 244, 229, 133]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [10, "left", "top"]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [8, 6]);
                t.layout = this.__13_i();
                t.elementsContent = [this.skillTitleLbl_i(), this.skillLevelLbl_i()];
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 18, "升星要求：", 6, 73]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width"], [20, "fragment", 20]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [2, "center"]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [126, 244, 228, 64]);
                t.elementsContent = [this.skillDescLbl_i(), this.__14_i(), this.__15_i(), this.lvStarGroup_i(), this.fragmentNeedGroup_i(), this.currLevelLbl_i()];
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "fragment";
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [2, "center"]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "y"], [23, 206]);
                t.layout = this.__20_i();
                t.elementsContent = [this.__19_i(), this.fragmentLbl_i()];
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__25_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__26_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__27_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                return t;
            };
            __egretProto__.__28_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [20, "left", "middle"]);
                return t;
            };
            __egretProto__.__29_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__5_i(), this.__6_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.attLbl_i(), this.infoBtn_i(), this.__18_i(), this.__21_i(), this.weaponList_i(), this.mantleList_i(), this.headpieceList_i(), this.wingList_i(), this.armorList_i(), this.swordList_i(), this.toggleGroup_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x605A64, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter"], [60, 0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                t.horizontalCenter = 0;
                t.elementsContent = [this.__4_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "equip_title_bg", 59]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "y"], [0, "equip_icon_player", 64]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [136, 220, 0, 59]);
                t.elementsContent = [this.__7_i(), this.weaponItem_i(), this.mantleItem_i(), this.headpieceItem_i(), this.wingItem_i(), this.armorItem_i(), this.swordItem_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4B4553, 80, 0, 480, 238]);
                return t;
            };
            __egretProto__.armorItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.armorItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 182, 49]);
                return t;
            };
            __egretProto__.armorList_i = function () {
                var t = new egret.gui.List();
                this.armorList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x", "y"], [0, 420, 0, 466, 60, 40]);
                t.layout = this.__26_i();
                return t;
            };
            __egretProto__.armorSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.armorSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName", "x", "y"], ["equip_armor_on", "equip_armor_off", "equip_armor_on", "equip_armor_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_armor_on", "equip_armor_off", 40, 40]);
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["Arial", 18, "0%", 15, 207]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "verticalCenter", "x"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 0, 422]);
                return t;
            };
            __egretProto__.currLevelLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLevelLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "visible", "x", "y"], ["Arial", 16, "Lv.0", 0x24B2E6, false, 97, 100]);
                return t;
            };
            __egretProto__.fragmentLbl_i = function () {
                var t = new egret.gui.Label();
                this.fragmentLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 24, "0", 0xFDB32B, 16, 83]);
                return t;
            };
            __egretProto__.fragmentNeedGroup_i = function () {
                var t = new egret.gui.Group();
                this.fragmentNeedGroup = t;
                this.__s(t, ["visible", "x", "y"], [false, 8, 99]);
                t.layout = this.__17_i();
                t.elementsContent = [this.__16_i(), this.fragmentNeedLbl_i()];
                return t;
            };
            __egretProto__.fragmentNeedLbl_i = function () {
                var t = new egret.gui.Label();
                this.fragmentNeedLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "0", 0xFDB32B, 16, 83]);
                return t;
            };
            __egretProto__.headpieceItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.headpieceItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 4, 93]);
                return t;
            };
            __egretProto__.headpieceList_i = function () {
                var t = new egret.gui.List();
                this.headpieceList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x", "y"], [0, 420, 0, 466, 40, 20]);
                t.layout = this.__24_i();
                return t;
            };
            __egretProto__.headpieceSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.headpieceSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName", "x", "y"], ["equip_headpiece_on", "equip_headpiece_off", "equip_headpiece_on", "equip_headpiece_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_headpiece_on", "equip_headpiece_off", 20, 20]);
                return t;
            };
            __egretProto__.infoBtn_i = function () {
                var t = new egret.gui.Button();
                this.infoBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [24, new egret.gui.ButtonSkin("dialog_btn_info", "dialog_btn_info", "dialog_btn_info"), 24, 446, 101]);
                return t;
            };
            __egretProto__.lvStarBtn_i = function () {
                var t = new egret.gui.Button();
                this.lvStarBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 70]);
                return t;
            };
            __egretProto__.lvStarGroup_i = function () {
                var t = new egret.gui.Group();
                this.lvStarGroup = t;
                this.__s(t, ["horizontalCenter", "visible", "x", "y"], [77, false, 10, 77]);
                t.elementsContent = [this.lvStarBtn_i(), this.lvStarLbl_i()];
                return t;
            };
            __egretProto__.lvStarLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvStarLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "进化", false, 0]);
                return t;
            };
            __egretProto__.mantleItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.mantleItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 4, 49]);
                return t;
            };
            __egretProto__.mantleList_i = function () {
                var t = new egret.gui.List();
                this.mantleList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x", "y"], [0, 420, 0, 466, 30, 10]);
                t.layout = this.__23_i();
                return t;
            };
            __egretProto__.mantleSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.mantleSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName", "x", "y"], ["equip_mantle_on", "equip_mantle_off", "equip_mantle_on", "equip_mantle_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_mantle_on", "equip_mantle_off", 10, 10]);
                return t;
            };
            __egretProto__.skillDescLbl_i = function () {
                var t = new egret.gui.Label();
                this.skillDescLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 16, "-", 0x858D8F, 204, 8, 27]);
                return t;
            };
            __egretProto__.skillLevelLbl_i = function () {
                var t = new egret.gui.Label();
                this.skillLevelLbl = t;
                this.__s(t, ["fontFamily", "size", "textColor", "x", "y"], ["Arial", 18, 0x00FF00, 10, 10]);
                return t;
            };
            __egretProto__.skillTitleLbl_i = function () {
                var t = new egret.gui.Label();
                this.skillTitleLbl = t;
                this.__s(t, ["fontFamily", "size", "textColor"], ["Arial", 18, 0xFFFFFF]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "width", "x"], [0, 0x4B4553, 430, 0, 480, 10]);
                return t;
            };
            __egretProto__.swordItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.swordItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 182, 93]);
                return t;
            };
            __egretProto__.swordList_i = function () {
                var t = new egret.gui.List();
                this.swordList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x", "y"], [0, 420, 0, 466, 70, 50]);
                t.layout = this.__27_i();
                return t;
            };
            __egretProto__.swordSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.swordSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName", "x", "y"], ["equip_sword_on", "equip_sword_off", "equip_sword_on", "equip_sword_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_sword_on", "equip_sword_off", 50, 50]);
                return t;
            };
            __egretProto__.toggleGroup_i = function () {
                var t = new egret.gui.Group();
                this.toggleGroup = t;
                this.__s(t, ["horizontalCenter", "y"], [0, 244]);
                t.layout = this.__28_i();
                t.elementsContent = [this.weaponSelect_i(), this.mantleSelect_i(), this.headpieceSelect_i(), this.wingSelect_i(), this.armorSelect_i(), this.swordSelect_i()];
                return t;
            };
            __egretProto__.weaponItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.weaponItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 4, 5]);
                return t;
            };
            __egretProto__.weaponList_i = function () {
                var t = new egret.gui.List();
                this.weaponList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x"], [0, 420, 0, 466, 20]);
                t.layout = this.__22_i();
                return t;
            };
            __egretProto__.weaponSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.weaponSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName"], ["equip_weapon_on", "equip_weapon_off", "equip_weapon_on", "equip_weapon_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_weapon_on", "equip_weapon_off"]);
                return t;
            };
            __egretProto__.wingItem_i = function () {
                var t = new uiskins.EquipSmallElementItem();
                this.wingItem = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.EquipSmallElementItemSkin, 182, 5]);
                return t;
            };
            __egretProto__.wingList_i = function () {
                var t = new egret.gui.List();
                this.wingList = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x", "y"], [0, 420, 0, 466, 50, 30]);
                t.layout = this.__25_i();
                return t;
            };
            __egretProto__.wingSelect_i = function () {
                var t = new uiskins.EquipToggleBtn();
                this.wingSelect = t;
                this.__s(t, ["disabledAndSelectedEleSkinName", "disabledEleSkinName", "downAndSelectedEleSkinName", "downEleSkinName", "label", "skinName", "upAndSelectedEleSkinName", "upEleSkinName", "x", "y"], ["equip_wing_on", "equip_wing_off", "equip_wing_on", "equip_wing_on", "切换按钮", skins.components.EquipToggleBtnSkin, "equip_wing_on", "equip_wing_off", 30, 30]);
                return t;
            };
            EquipLayerSkin._skinParts = ["closeBtn", "weaponItem", "mantleItem", "headpieceItem", "wingItem", "armorItem", "swordItem", "attLbl", "infoBtn", "skillDescLbl", "skillTitleLbl", "skillLevelLbl", "lvStarBtn", "lvStarLbl", "lvStarGroup", "fragmentNeedLbl", "fragmentNeedGroup", "currLevelLbl", "fragmentLbl", "weaponList", "mantleList", "headpieceList", "wingList", "armorList", "swordList", "weaponSelect", "mantleSelect", "headpieceSelect", "wingSelect", "armorSelect", "swordSelect", "toggleGroup"];
            return EquipLayerSkin;
        })(egret.gui.Skin);
        dialog.EquipLayerSkin = EquipLayerSkin;
        EquipLayerSkin.prototype.__class__ = "skins.dialog.EquipLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
