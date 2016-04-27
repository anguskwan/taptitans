var skins;
(function (skins) {
    var components;
    (function (components) {
        var PKMoraleProgressGroupSkin = (function (_super) {
            __extends(PKMoraleProgressGroupSkin, _super);
            function PKMoraleProgressGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [79, 480]);
                this.elementsContent = [this.moraleBtn_i(), this.__3_i(), this.__4_i(), this.nameLbl_i(), this.progress_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PKMoraleProgressGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PKMoraleProgressGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["morale", 62, 9]);
                return t;
            };
            __egretProto__.moraleBtn_i = function () {
                var t = new egret.gui.Button();
                this.moraleBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("pk_explanation_btn", "pk_explanation_btn", "pk_explanation_btn"), 12, 20]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "士气值", "left", 0xFFFFFF, 91, 9]);
                return t;
            };
            __egretProto__.progress_i = function () {
                var t = new uiskins.PKProgressBar();
                this.progress = t;
                this.__s(t, ["skinName", "value", "x", "y"], [skins.components.PKProgressBarSkin, 0, 67, 37]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width", "x", "y"], [40, 127, 0.5, 80, 10, 10]);
                t.elementsContent = [this.timeBtn_i(), this.timeLbl_i()];
                return t;
            };
            __egretProto__.timeBtn_i = function () {
                var t = new egret.gui.Button();
                this.timeBtn = t;
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 80]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchChildren", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 16, "00:00:00", false, false, 0]);
                return t;
            };
            PKMoraleProgressGroupSkin._skinParts = ["moraleBtn", "timeBtn", "timeLbl", "nameLbl", "progress"];
            return PKMoraleProgressGroupSkin;
        })(egret.gui.Skin);
        components.PKMoraleProgressGroupSkin = PKMoraleProgressGroupSkin;
        PKMoraleProgressGroupSkin.prototype.__class__ = "skins.components.PKMoraleProgressGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
