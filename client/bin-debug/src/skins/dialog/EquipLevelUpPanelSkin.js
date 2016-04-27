var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var EquipLevelUpPanelSkin = (function (_super) {
            __extends(EquipLevelUpPanelSkin, _super);
            function EquipLevelUpPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EquipLevelUpPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipLevelUpPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [6, "center"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [10, "center"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "y"], [20, 121]);
                t.layout = this.__12_i();
                t.elementsContent = [this.currStarGroup_i(), this.__10_i(), this.nextStarGroup_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.closeBtn_i(), this.iconImg_i(), this.equipLbl_i(), this.__7_i(), this.__8_i(), this.currSkillDescLbl_i(), this.nextSkillDescLbl_i(), this.nextSkillTitleLbl_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [360, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 50, 394, 28, 101]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 110, 394, 28, 157]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["size", "text", "x", "y"], [18, "技能进化：", 48, 174]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["size", "text", "x", "y"], [18, "进化", 38, 119]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [6, "center"]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["horizontalCenter", "label", "skinName", "y"], [0.5, "确定", new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 278]);
                return t;
            };
            __egretProto__.currSkillDescLbl_i = function () {
                var t = new egret.gui.Label();
                this.currSkillDescLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 16, "-", 0x858D8F, 280, 98, 50]);
                return t;
            };
            __egretProto__.currStarGroup_i = function () {
                var t = new egret.gui.Group();
                this.currStarGroup = t;
                this.__s(t, ["horizontalCenter", "x", "y"], [0.5, 10, 134]);
                t.layout = this.__9_i();
                return t;
            };
            __egretProto__.equipLbl_i = function () {
                var t = new egret.gui.Label();
                this.equipLbl = t;
                this.__s(t, ["size", "text", "x", "y"], [18, "装备名称", 98, 25]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "width", "x", "y"], [58, 58, 29, 26]);
                return t;
            };
            __egretProto__.nextSkillDescLbl_i = function () {
                var t = new egret.gui.Label();
                this.nextSkillDescLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "width", "x", "y"], ["Arial", 16, "-", 0x858D8F, 280, 48, 201]);
                return t;
            };
            __egretProto__.nextSkillTitleLbl_i = function () {
                var t = new egret.gui.Label();
                this.nextSkillTitleLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "-", 0x858D8F, 134, 173]);
                return t;
            };
            __egretProto__.nextStarGroup_i = function () {
                var t = new egret.gui.Group();
                this.nextStarGroup = t;
                this.__s(t, ["horizontalCenter", "x", "y"], [0.5, 20, 144]);
                t.layout = this.__11_i();
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["equip_icon_lvstar", 222, 121]);
                return t;
            };
            EquipLevelUpPanelSkin._skinParts = ["closeBtn", "iconImg", "equipLbl", "currSkillDescLbl", "nextSkillDescLbl", "nextSkillTitleLbl", "currStarGroup", "nextStarGroup"];
            return EquipLevelUpPanelSkin;
        })(egret.gui.Skin);
        dialog.EquipLevelUpPanelSkin = EquipLevelUpPanelSkin;
        EquipLevelUpPanelSkin.prototype.__class__ = "skins.dialog.EquipLevelUpPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
