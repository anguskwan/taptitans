var skins;
(function (skins) {
    var components;
    (function (components) {
        var MailRewardElementSkin = (function (_super) {
            __extends(MailRewardElementSkin, _super);
            function MailRewardElementSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [58, 58]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MailRewardElementSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MailRewardElementSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [58, 0, "icon_default", 0, 58]);
                return t;
            };
            __egretProto__.numLbl_i = function () {
                var t = new egret.gui.Label();
                this.numLbl = t;
                this.__s(t, ["bold", "fontFamily", "right", "size", "stroke", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 0, 18, 2, "0", "center", "middle", 10, 37]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.iconImg_i(), this.numLbl_i()];
                return t;
            };
            MailRewardElementSkin._skinParts = ["iconImg", "numLbl"];
            return MailRewardElementSkin;
        })(egret.gui.Skin);
        components.MailRewardElementSkin = MailRewardElementSkin;
        MailRewardElementSkin.prototype.__class__ = "skins.components.MailRewardElementSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
