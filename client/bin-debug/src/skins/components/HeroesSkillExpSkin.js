var skins;
(function (skins) {
    var components;
    (function (components) {
        var HeroesSkillExpSkin = (function (_super) {
            __extends(HeroesSkillExpSkin, _super);
            function HeroesSkillExpSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [72, 447]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HeroesSkillExpSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HeroesSkillExpSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "bottom"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 12, "Lv.", 81, 29]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [72, 0, 0, 420]);
                t.elementsContent = [this.iconImg_i(), this.nameLbl_i(), this.descLbl_i(), this.iconDisabled_i(), this.unlockGroup_i()];
                return t;
            };
            __egretProto__.descLbl_i = function () {
                var t = new egret.gui.Label();
                this.descLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "verticalCenter"], [true, "Arial", 90, 18, "说明", 13]);
                return t;
            };
            __egretProto__.iconDisabled_i = function () {
                var t = new egret.gui.Rect();
                this.iconDisabled = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "verticalCenter", "width", "x"], [0.5, 0x000000, 64, 0, 64, 15]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["source", "verticalCenter", "x"], ["heroskill1_1", 0, 15]);
                return t;
            };
            __egretProto__.lvGroup_i = function () {
                var t = new egret.gui.Group();
                this.lvGroup = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "y"], [18, 0, 11, 10]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__5_i(), this.lvLbl_i()];
                return t;
            };
            __egretProto__.lvLbl_i = function () {
                var t = new egret.gui.Label();
                this.lvLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 12, "1000", 0x42D0FF, 91, 39]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "left", "size", "text", "verticalCenter"], [true, "Arial", 90, 18, "名字", -14]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "y"], ["Arial", 0, 12, "解锁", 14]);
                return t;
            };
            __egretProto__.unlockGroup_i = function () {
                var t = new egret.gui.Group();
                this.unlockGroup = t;
                this.__s(t, ["height", "verticalCenter", "width", "x"], [64, 0, 64, 14]);
                t.elementsContent = [this.__3_i(), this.lvGroup_i()];
                return t;
            };
            HeroesSkillExpSkin._skinParts = ["iconImg", "nameLbl", "descLbl", "iconDisabled", "lvLbl", "lvGroup", "unlockGroup"];
            return HeroesSkillExpSkin;
        })(egret.gui.Skin);
        components.HeroesSkillExpSkin = HeroesSkillExpSkin;
        HeroesSkillExpSkin.prototype.__class__ = "skins.components.HeroesSkillExpSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
