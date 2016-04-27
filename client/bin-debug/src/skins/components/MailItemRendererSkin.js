var skins;
(function (skins) {
    var components;
    (function (components) {
        var MailItemRendererSkin = (function (_super) {
            __extends(MailItemRendererSkin, _super);
            function MailItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [84, 462]);
                this.elementsContent = [this.__6_i(), this.openBtn_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MailItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MailItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "horizontalCenter", "source"], [0, 0, "rank_line"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.titleLbl_i(), this.__5_i(), this.newTipImg_i()];
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [58, "icon_default", 0, 58, 34]);
                return t;
            };
            __egretProto__.newTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.newTipImg = t;
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [0.8, 0.8, "tip_new", 18, 8]);
                return t;
            };
            __egretProto__.openBtn_i = function () {
                var t = new uiskins.StateButton();
                this.openBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "width", "x", "y"], ["dialog_btn_blue", "dialog_btn_blue", 40, skins.components.StateButtonSkin, "dialog_btn_blue", 80, 350, 22]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [0x39363F, 100, 0, 0, 100]);
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalCenter", "x"], [true, "Arial", 16, "主题：", "left", 0xFFFFFF, 0, 103]);
                return t;
            };
            MailItemRendererSkin._skinParts = ["iconImg", "titleLbl", "newTipImg", "openBtn"];
            return MailItemRendererSkin;
        })(egret.gui.Skin);
        components.MailItemRendererSkin = MailItemRendererSkin;
        MailItemRendererSkin.prototype.__class__ = "skins.components.MailItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
