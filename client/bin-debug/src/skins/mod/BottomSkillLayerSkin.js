var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var BottomSkillLayerSkin = (function (_super) {
            __extends(BottomSkillLayerSkin, _super);
            function BottomSkillLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [60, 480]);
                this.elementsContent = [this.skillGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BottomSkillLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BottomSkillLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__._skillBtn1_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn1 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 100, 114]);
                return t;
            };
            __egretProto__._skillBtn2_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn2 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 110, 124]);
                return t;
            };
            __egretProto__._skillBtn3_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn3 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 120, 134]);
                return t;
            };
            __egretProto__._skillBtn4_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn4 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 130, 144]);
                return t;
            };
            __egretProto__._skillBtn5_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn5 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 140, 154]);
                return t;
            };
            __egretProto__._skillBtn6_i = function () {
                var t = new uiskins.SkillButton();
                this._skillBtn6 = t;
                this.__s(t, ["enabled", "label", "skinName", "x", "y"], [true, "按钮", skins.components.SkillButtonSkin, 150, 164]);
                return t;
            };
            __egretProto__.skillGroup_i = function () {
                var t = new egret.gui.Group();
                this.skillGroup = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width"], [100, 0, 0, 450]);
                t.layout = this.__3_i();
                t.elementsContent = [this._skillBtn1_i(), this._skillBtn2_i(), this._skillBtn3_i(), this._skillBtn4_i(), this._skillBtn5_i(), this._skillBtn6_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [12, "justify"]);
                return t;
            };
            BottomSkillLayerSkin._skinParts = ["_skillBtn1", "_skillBtn2", "_skillBtn3", "_skillBtn4", "_skillBtn5", "_skillBtn6", "skillGroup"];
            return BottomSkillLayerSkin;
        })(egret.gui.Skin);
        mod.BottomSkillLayerSkin = BottomSkillLayerSkin;
        BottomSkillLayerSkin.prototype.__class__ = "skins.mod.BottomSkillLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
