var skins;
(function (skins) {
    var components;
    (function (components) {
        var MailLastItemRendererSkin = (function (_super) {
            __extends(MailLastItemRendererSkin, _super);
            function MailLastItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [84, 462]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MailLastItemRendererSkin.prototype;
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x39363F, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalCenter"], [true, "Arial", 0, 16, "邮件最多保存7天", "left", 0x958D9E, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i()];
                return t;
            };
            return MailLastItemRendererSkin;
        })(egret.gui.Skin);
        components.MailLastItemRendererSkin = MailLastItemRendererSkin;
        MailLastItemRendererSkin.prototype.__class__ = "skins.components.MailLastItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
