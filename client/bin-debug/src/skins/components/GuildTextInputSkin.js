var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildTextInputSkin = (function (_super) {
            __extends(GuildTextInputSkin, _super);
            function GuildTextInputSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [30, 100]);
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
            var __egretProto__ = GuildTextInputSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildTextInputSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.promptDisplay_i = function () {
                var t = new egret.gui.Label();
                this.promptDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "size", "textColor", "touchChildren", "touchEnabled", "verticalCenter"], ["Arial", 10, 1, 18, 0xa9a9a9, false, false, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x271C0B, 100, 100]);
                return t;
            };
            __egretProto__.textDisplay_i = function () {
                var t = new egret.gui.EditableText();
                this.textDisplay = t;
                this.__s(t, ["bottom", "fontFamily", "percentHeight", "left", "right", "size", "textColor", "top", "percentWidth"], [8, "Arial", 100, 10, 10, 18, 0xFFFFFF, 8, 100]);
                return t;
            };
            GuildTextInputSkin._skinParts = ["textDisplay", "promptDisplay"];
            return GuildTextInputSkin;
        })(egret.gui.Skin);
        components.GuildTextInputSkin = GuildTextInputSkin;
        GuildTextInputSkin.prototype.__class__ = "skins.components.GuildTextInputSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
