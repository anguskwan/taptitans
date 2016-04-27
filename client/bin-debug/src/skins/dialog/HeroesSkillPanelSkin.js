var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var HeroesSkillPanelSkin = (function (_super) {
            __extends(HeroesSkillPanelSkin, _super);
            function HeroesSkillPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 447]);
                this.elementsContent = [this.__10_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HeroesSkillPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HeroesSkillPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [700, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "DPS:", "left", "middle", 81, 29]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["left", "bottom"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "Lv.", "left", "middle", 81, 29]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [12, "center"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "percentWidth"], [0, 600, 0, 100]);
                t.layout = this.__8_i();
                t.elementsContent = [this.skillItem1_i(), this.skillItem2_i(), this.skillItem3_i(), this.skillItem4_i(), this.skillItem5_i(), this.skillItem6_i(), this.skillItem7_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20]);
                return t;
            };
            __egretProto__.dpsGroup_i = function () {
                var t = new egret.gui.Group();
                this.dpsGroup = t;
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["left", "top"], [95, 63]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.dpsLbl_i()];
                return t;
            };
            __egretProto__.dpsLbl_i = function () {
                var t = new egret.gui.Label();
                this.dpsLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "10", "left", 0xFF7F01, "middle", 34, 39]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [1.1, 1.1, "hero1", 26, 18]);
                return t;
            };
            __egretProto__.lvGroup_i = function () {
                var t = new egret.gui.Group();
                this.lvGroup = t;
                this.__s(t, ["left", "top"], [95, 42]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__7_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "1", "left", 0x42D0FF, "middle", 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "textAlign", "top", "verticalAlign"], [true, "Arial", 95, 18, "这是名字", "left", 17, "middle"]);
                return t;
            };
            __egretProto__.skillItem1_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem1 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 233, 39]);
                return t;
            };
            __egretProto__.skillItem2_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem2 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 243, 49]);
                return t;
            };
            __egretProto__.skillItem3_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem3 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 253, 59]);
                return t;
            };
            __egretProto__.skillItem4_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem4 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 263, 69]);
                return t;
            };
            __egretProto__.skillItem5_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem5 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 273, 79]);
                return t;
            };
            __egretProto__.skillItem6_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem6 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 283, 89]);
                return t;
            };
            __egretProto__.skillItem7_i = function () {
                var t = new uiskins.HeroesSkillExp();
                this.skillItem7 = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.HeroesSkillExpSkin, 293, 99]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [700, 0, 0, 447]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.iconImg_i(), this.nameLbl_i(), this.dpsGroup_i(), this.lvGroup_i(), this.__9_i()];
                return t;
            };
            HeroesSkillPanelSkin._skinParts = ["closeBtn", "iconImg", "nameLbl", "dpsLbl", "dpsGroup", "lvLbl", "lvGroup", "skillItem1", "skillItem2", "skillItem3", "skillItem4", "skillItem5", "skillItem6", "skillItem7"];
            return HeroesSkillPanelSkin;
        })(egret.gui.Skin);
        dialog.HeroesSkillPanelSkin = HeroesSkillPanelSkin;
        HeroesSkillPanelSkin.prototype.__class__ = "skins.dialog.HeroesSkillPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
