var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var WeaponPanelSkin = (function (_super) {
            __extends(WeaponPanelSkin, _super);
            function WeaponPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 447]);
                this.elementsContent = [this.__24_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WeaponPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return WeaponPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "middle"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["touchChildren", "touchEnabled", "verticalCenter", "width", "x"], [false, false, 0, 80, 40]);
                t.layout = this.__11_i();
                t.elementsContent = [this.__10_i(), this.lblTotal_i()];
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [90, 0.5, 360, 104]);
                t.elementsContent = [this.unSelectLbl_i(), this.selectGroup_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 436, 322, 61, 192]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [426, 0.5, 312, 198]);
                t.elementsContent = [this.selectItem1_i(), this.selectItem2_i(), this.selectItem3_i(), this.selectItem4_i(), this.selectItem5_i(), this.selectItem6_i(), this.selectItem7_i(), this.selectItem8_i(), this.selectItem9_i(), this.selectItem10_i(), this.selectItem11_i(), this.selectItem12_i(), this.selectItem13_i(), this.selectItem14_i(), this.selectItem15_i(), this.selectItem16_i(), this.selectItem17_i(), this.selectItem18_i(), this.selectItem19_i(), this.selectItem20_i(), this.selectItem21_i(), this.selectItem22_i(), this.selectItem23_i(), this.selectItem24_i(), this.selectItem25_i(), this.selectItem26_i(), this.selectItem27_i(), this.selectItem28_i(), this.selectItem29_i(), this.selectItem30_i(), this.selectItem31_i(), this.selectItem32_i(), this.selectItem33_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 20, "你有", "left", "middle", 0]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 20, "全套:", "left", "middle", 0, 20, 20]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0, 632]);
                t.layout = this.__18_i();
                t.elementsContent = [this.__16_i(), this.currLevelLbl_i(), this.__17_i(), this.currDPSLbl_i()];
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 14, "升级所有武器级", "left", "middle", 0]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 14, "为", "left", "middle", 0, 20, 20]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__23_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [0, 660]);
                t.layout = this.__22_i();
                t.elementsContent = [this.__20_i(), this.nextLevelLbl_i(), this.__21_i(), this.nextDPSLbl_i()];
                return t;
            };
            __egretProto__.__24_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [700, 0, 0, 447]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.lblTitle1_i(), this.lblTitle2_i(), this.__13_i(), this.__14_i(), this.__15_i(), this.__19_i(), this.__23_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [700, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.6, 0.6, "crystal"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "touchChildren", "touchEnabled", "y"], [0, false, false, 25]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.crystalLbl_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "y"], ["Arial", 0, 18, "洗1个武器", "center", false, "middle", 4]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth", "x", "y"], [0.21, 0x000000, 100, 100, 0, 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "bottom", "fontFamily", "size", "text", "textAlign", "top", "verticalAlign", "x"], [true, 0, "Arial", 14, "现有:", "left", 0, "middle", 2]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 14]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 14, "0"]);
                return t;
            };
            __egretProto__.currDPSLbl_i = function () {
                var t = new egret.gui.Label();
                this.currDPSLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 20, "英雄DPS x0", "left", 0x00A1FE, "middle", 0, 30, 30]);
                return t;
            };
            __egretProto__.currLevelLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLevelLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 20, "0", "left", 0x00A1FE, "middle", 0, 10, 10]);
                return t;
            };
            __egretProto__.dpsLbl_i = function () {
                var t = new egret.gui.Label();
                this.dpsLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 143, 16, "+5000%攻击力", "left", "middle", 68]);
                return t;
            };
            __egretProto__.heroImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.heroImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.7, 0.7, "hero1", 95, 44]);
                return t;
            };
            __egretProto__.lblTitle1_i = function () {
                var t = new egret.gui.Label();
                this.lblTitle1 = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "textAlign", "top", "verticalAlign"], [true, "Arial", 39, 26, "武器升级", "left", 17, "middle"]);
                return t;
            };
            __egretProto__.lblTitle2_i = function () {
                var t = new egret.gui.Label();
                this.lblTitle2 = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 16, "每日任务和比赛可收集武器。它们提供额外的伤害，\n若收集全部武器组合将获得更多的攻击力！武器为永\n久获得。", "left", "middle", 55]);
                return t;
            };
            __egretProto__.lblTotal_i = function () {
                var t = new egret.gui.Label();
                this.lblTotal = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 14, "333333"]);
                return t;
            };
            __egretProto__.levelLbl_i = function () {
                var t = new egret.gui.Label();
                this.levelLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 16, "武器升级：100", "left", "middle", 93, 19]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 143, 16, "名字", "left", "middle", 44]);
                return t;
            };
            __egretProto__.nextDPSLbl_i = function () {
                var t = new egret.gui.Label();
                this.nextDPSLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 14, "英雄DPS x0", "left", 0x00A1FE, "middle", 0, 30, 30]);
                return t;
            };
            __egretProto__.nextLevelLbl_i = function () {
                var t = new egret.gui.Label();
                this.nextLevelLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x", "y"], [true, "Arial", 14, "0", "left", 0x00A1FE, "middle", 0, 10, 10]);
                return t;
            };
            __egretProto__.resetBtn_i = function () {
                var t = new egret.gui.Button();
                this.resetBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red"), 120]);
                return t;
            };
            __egretProto__.resetGroupTotal_i = function () {
                var t = new egret.gui.Group();
                this.resetGroupTotal = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [26, 122, 120, 60]);
                t.elementsContent = [this.__8_i(), this.__9_i(), this.__12_i()];
                return t;
            };
            __egretProto__.resetGroup_i = function () {
                var t = new egret.gui.Group();
                this.resetGroup = t;
                this.__s(t, ["horizontalCenter", "x", "y"], [121, 10, 8]);
                t.elementsContent = [this.resetBtn_i(), this.__6_i(), this.__7_i()];
                return t;
            };
            __egretProto__.selectGroup_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "visible", "width"], [100, 0, 0, false, 360]);
                t.elementsContent = [this.levelLbl_i(), this.nameLbl_i(), this.dpsLbl_i(), this.weaponImg_i(), this.heroImg_i(), this.resetGroup_i(), this.resetGroupTotal_i()];
                return t;
            };
            __egretProto__.selectItem10_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem10 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 256, 62]);
                return t;
            };
            __egretProto__.selectItem11_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem11 = t;
                this.__s(t, ["skinName", "y"], [skins.components.WeaponItemSelectSkin, 124]);
                return t;
            };
            __egretProto__.selectItem12_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem12 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 124]);
                return t;
            };
            __egretProto__.selectItem13_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem13 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 124]);
                return t;
            };
            __egretProto__.selectItem14_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem14 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 124]);
                return t;
            };
            __egretProto__.selectItem15_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem15 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 256, 124]);
                return t;
            };
            __egretProto__.selectItem16_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem16 = t;
                this.__s(t, ["skinName", "y"], [skins.components.WeaponItemSelectSkin, 186]);
                return t;
            };
            __egretProto__.selectItem17_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem17 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 186]);
                return t;
            };
            __egretProto__.selectItem18_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem18 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 186]);
                return t;
            };
            __egretProto__.selectItem19_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem19 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 186]);
                return t;
            };
            __egretProto__.selectItem1_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem1 = t;
                t.skinName = skins.components.WeaponItemSelectSkin;
                return t;
            };
            __egretProto__.selectItem20_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem20 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 256, 186]);
                return t;
            };
            __egretProto__.selectItem21_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem21 = t;
                this.__s(t, ["skinName", "y"], [skins.components.WeaponItemSelectSkin, 248]);
                return t;
            };
            __egretProto__.selectItem22_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem22 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 248]);
                return t;
            };
            __egretProto__.selectItem23_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem23 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 248]);
                return t;
            };
            __egretProto__.selectItem24_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem24 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 248]);
                return t;
            };
            __egretProto__.selectItem25_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem25 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 256, 248]);
                return t;
            };
            __egretProto__.selectItem26_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem26 = t;
                this.__s(t, ["skinName", "y"], [skins.components.WeaponItemSelectSkin, 310]);
                return t;
            };
            __egretProto__.selectItem27_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem27 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 310]);
                return t;
            };
            __egretProto__.selectItem28_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem28 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 310]);
                return t;
            };
            __egretProto__.selectItem29_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem29 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 310]);
                return t;
            };
            __egretProto__.selectItem2_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem2 = t;
                this.__s(t, ["skinName", "x"], [skins.components.WeaponItemSelectSkin, 64]);
                return t;
            };
            __egretProto__.selectItem30_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem30 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 256, 310]);
                return t;
            };
            __egretProto__.selectItem31_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem31 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 372]);
                return t;
            };
            __egretProto__.selectItem32_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem32 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 372]);
                return t;
            };
            __egretProto__.selectItem33_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem33 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 372]);
                return t;
            };
            __egretProto__.selectItem3_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem3 = t;
                this.__s(t, ["skinName", "x"], [skins.components.WeaponItemSelectSkin, 128]);
                return t;
            };
            __egretProto__.selectItem4_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem4 = t;
                this.__s(t, ["skinName", "x"], [skins.components.WeaponItemSelectSkin, 192]);
                return t;
            };
            __egretProto__.selectItem5_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem5 = t;
                this.__s(t, ["skinName", "x"], [skins.components.WeaponItemSelectSkin, 256]);
                return t;
            };
            __egretProto__.selectItem6_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem6 = t;
                this.__s(t, ["skinName", "y"], [skins.components.WeaponItemSelectSkin, 62]);
                return t;
            };
            __egretProto__.selectItem7_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem7 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 64, 62]);
                return t;
            };
            __egretProto__.selectItem8_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem8 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 128, 62]);
                return t;
            };
            __egretProto__.selectItem9_i = function () {
                var t = new uiskins.WeaponItemSelect();
                this.selectItem9 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.WeaponItemSelectSkin, 192, 62]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.6, 0.6, "crystal"]);
                return t;
            };
            __egretProto__.unSelectLbl_i = function () {
                var t = new egret.gui.Label();
                this.unSelectLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 16, "选择武器以查看更多信息", "left", "middle", 0]);
                return t;
            };
            __egretProto__.weaponImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.weaponImg = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["heroskill1_1", 7, 23]);
                return t;
            };
            WeaponPanelSkin._skinParts = ["closeBtn", "lblTitle1", "lblTitle2", "unSelectLbl", "levelLbl", "nameLbl", "dpsLbl", "weaponImg", "heroImg", "resetBtn", "crystalLbl", "resetGroup", "lblTotal", "resetGroupTotal", "selectGroup", "selectItem1", "selectItem2", "selectItem3", "selectItem4", "selectItem5", "selectItem6", "selectItem7", "selectItem8", "selectItem9", "selectItem10", "selectItem11", "selectItem12", "selectItem13", "selectItem14", "selectItem15", "selectItem16", "selectItem17", "selectItem18", "selectItem19", "selectItem20", "selectItem21", "selectItem22", "selectItem23", "selectItem24", "selectItem25", "selectItem26", "selectItem27", "selectItem28", "selectItem29", "selectItem30", "selectItem31", "selectItem32", "selectItem33", "currLevelLbl", "currDPSLbl", "nextLevelLbl", "nextDPSLbl"];
            return WeaponPanelSkin;
        })(egret.gui.Skin);
        dialog.WeaponPanelSkin = WeaponPanelSkin;
        WeaponPanelSkin.prototype.__class__ = "skins.dialog.WeaponPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
