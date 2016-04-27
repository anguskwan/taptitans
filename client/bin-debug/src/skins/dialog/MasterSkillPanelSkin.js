var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var MasterSkillPanelSkin = (function (_super) {
            __extends(MasterSkillPanelSkin, _super);
            function MasterSkillPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [220, 447]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MasterSkillPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MasterSkillPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 100, 394, 28, 96]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "left", "bottom"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 14, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.iconDisabled_i(), this.__4_i(), this.lvGroup_i(), this.unlockLbl_i(), this.nameLbl_i(), this.explainLbl1_i(), this.explainLbl2_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 20]);
                return t;
            };
            __egretProto__.explainLbl1_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "verticalCenter", "x", "y"], [true, "Arial", 45, 18, 10.5, 10, 10]);
                return t;
            };
            __egretProto__.explainLbl2_i = function () {
                var t = new egret.gui.Label();
                this.explainLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "verticalCenter", "x", "y"], [true, "Arial", 45, 14, 48.5, 20, 20]);
                return t;
            };
            __egretProto__.iconDisabled_i = function () {
                var t = new egret.gui.Rect();
                this.iconDisabled = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "width", "x", "y"], [0.69, 0x000000, 58, 58, 29, 20]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["source", "x", "y"], ["icon_skill1", 29, 20]);
                return t;
            };
            __egretProto__.lvGroup_i = function () {
                var t = new egret.gui.Group();
                this.lvGroup = t;
                this.__s(t, ["height", "left", "verticalCenter", "x", "y"], [18, 105, -56, 10, 10]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__6_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 14, "1", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "verticalCenter"], [true, "Arial", 105, 18, -78.5]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [220, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.unlockLbl_i = function () {
                var t = new egret.gui.Label();
                this.unlockLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 105, 14, "left", "middle", -56]);
                return t;
            };
            MasterSkillPanelSkin._skinParts = ["iconImg", "iconDisabled", "lvLbl", "lvGroup", "unlockLbl", "nameLbl", "explainLbl1", "explainLbl2", "closeBtn"];
            return MasterSkillPanelSkin;
        })(egret.gui.Skin);
        dialog.MasterSkillPanelSkin = MasterSkillPanelSkin;
        MasterSkillPanelSkin.prototype.__class__ = "skins.dialog.MasterSkillPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
