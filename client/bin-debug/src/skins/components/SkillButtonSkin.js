var skins;
(function (skins) {
    var components;
    (function (components) {
        var SkillButtonSkin = (function (_super) {
            __extends(SkillButtonSkin, _super);
            function SkillButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [64, 64]);
                this.elementsContent = [this.cdGroup_i()];
                this.disabledSkin_i();
                this.downSkin_i();
                this.upSkin_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("upSkin", "", "before", "cdGroup")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("downSkin", "", "before", "cdGroup")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.AddItems("disabledSkin", "", "before", "cdGroup"),
                        new egret.gui.SetProperty("upSkin", "source", "btn_skill_disabled"),
                        new egret.gui.SetProperty("upSkin", "width", 61),
                        new egret.gui.SetProperty("upSkin", "height", 61)
                    ])
                ];
            }
            var __egretProto__ = SkillButtonSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return SkillButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.cdImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.cdImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width", "x", "y"], [61, 0, "btn_skill_disabled", 0, 61, 10, 10]);
                return t;
            };
            __egretProto__.cdLbl_i = function () {
                var t = new egret.gui.Label();
                this.cdLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 16, "20:00", "center", "middle", 0]);
                return t;
            };
            __egretProto__.disabledSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_skill_disabled", 0]);
                return t;
            };
            __egretProto__.downSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_skill_disabled", 0]);
                return t;
            };
            __egretProto__.cdGroup_i = function () {
                var t = new egret.gui.Group();
                this.cdGroup = t;
                this.__s(t, ["percentHeight", "visible", "percentWidth"], [100, false, 100]);
                t.elementsContent = [this.cdImg_i(), this.cdLbl_i()];
                return t;
            };
            __egretProto__.upSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upSkin = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "btn_skill_disabled", 0]);
                return t;
            };
            SkillButtonSkin._skinParts = ["disabledSkin", "downSkin", "upSkin", "cdImg", "cdLbl", "cdGroup"];
            return SkillButtonSkin;
        })(egret.gui.Skin);
        components.SkillButtonSkin = SkillButtonSkin;
        SkillButtonSkin.prototype.__class__ = "skins.components.SkillButtonSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
