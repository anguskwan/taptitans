var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PrestigeSkillPanelSkin = (function (_super) {
            __extends(PrestigeSkillPanelSkin, _super);
            function PrestigeSkillPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [220, 447]);
                this.elementsContent = [this.__5_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PrestigeSkillPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PrestigeSkillPanelSkin._skinParts;
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
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__3_i(), this.iconImg_i(), this.iconDisabled_i(), this.__4_i(), this.unlockLbl_i(), this.nameLbl_i(), this.explainLbl1_i(), this.closeBtn_i()];
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
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 18, "使用蜕变从新开始游戏，即可获得能用来换取\n神器的圣物。", "left", "middle", 32.5]);
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
                this.__s(t, ["source", "x", "y"], ["icon_skill7", 29, 20]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "verticalCenter"], [true, "Arial", 105, 18, "蜕变", -78.5]);
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
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 105, 14, "600级解锁", "left", "middle", -56]);
                return t;
            };
            PrestigeSkillPanelSkin._skinParts = ["iconImg", "iconDisabled", "unlockLbl", "nameLbl", "explainLbl1", "closeBtn"];
            return PrestigeSkillPanelSkin;
        })(egret.gui.Skin);
        dialog.PrestigeSkillPanelSkin = PrestigeSkillPanelSkin;
        PrestigeSkillPanelSkin.prototype.__class__ = "skins.dialog.PrestigeSkillPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
