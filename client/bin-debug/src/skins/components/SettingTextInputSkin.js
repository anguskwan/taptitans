var skins;
(function (skins) {
    var components;
    (function (components) {
        var SettingTextInputSkin = (function (_super) {
            __extends(SettingTextInputSkin, _super);
            function SettingTextInputSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "minHeight", "minWidth", "width"], [40, 30, 100, 120]);
                this.elementsContent = [this.__5_i(), this.textDisplay_i()];
                this.promptDisplay_i();
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("textDisplay", "textColor", 0xAAAAAA)
                    ]),
                    new egret.gui.State("normalWithPrompt", [
                        new egret.gui.AddItems("promptDisplay", "", "last", "")
                    ]),
                    new egret.gui.State("disabledWithPrompt", [
                        new egret.gui.AddItems("promptDisplay", "", "last", "")
                    ])
                ];
            }
            var __egretProto__ = SettingTextInputSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SettingTextInputSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.promptDisplay_i = function () {
                var t = new egret.gui.Label();
                this.promptDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "size", "textColor", "touchChildren", "touchEnabled", "verticalCenter"], ["Arial", 10, 1, 18, 0x615D64, false, false, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x2C2931, 100, 100]);
                return t;
            };
            __egretProto__.textDisplay_i = function () {
                var t = new egret.gui.EditableText();
                this.textDisplay = t;
                this.__s(t, ["bottom", "fontFamily", "percentHeight", "left", "right", "size", "textColor", "top", "percentWidth"], [8, "Arial", 100, 10, 10, 18, 0xFFFFFF, 8, 100]);
                return t;
            };
            SettingTextInputSkin._skinParts = ["textDisplay", "promptDisplay"];
            return SettingTextInputSkin;
        })(egret.gui.Skin);
        components.SettingTextInputSkin = SettingTextInputSkin;
        SettingTextInputSkin.prototype.__class__ = "skins.components.SettingTextInputSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
