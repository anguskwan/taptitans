var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildGoldRewardItemRendererSkin = (function (_super) {
            __extends(GuildGoldRewardItemRendererSkin, _super);
            function GuildGoldRewardItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [50, 436]);
                this.elementsContent = [this.__4_i(), this.rankLbl_i(), this.__7_i(), this.__10_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldRewardItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldRewardItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x49382C, 100, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.7, 0.7, "fragment"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [188, 17]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__6_i(), this.fragmentLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "center", "middle"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.7, 0.7, "crystal"]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 14, "0", 0xFFFFFF, 16, 83]);
                return t;
            };
            __egretProto__.fragmentLbl_i = function () {
                var t = new egret.gui.Label();
                this.fragmentLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 14, "0", 0xFFFFFF, 16, 83]);
                return t;
            };
            __egretProto__.rankLbl_i = function () {
                var t = new egret.gui.Label();
                this.rankLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 16, "排名", 0xFFFFFF, 26, 16.5]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [308, 17]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__9_i(), this.crystalLbl_i()];
                return t;
            };
            GuildGoldRewardItemRendererSkin._skinParts = ["rankLbl", "fragmentLbl", "crystalLbl"];
            return GuildGoldRewardItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildGoldRewardItemRendererSkin = GuildGoldRewardItemRendererSkin;
        GuildGoldRewardItemRendererSkin.prototype.__class__ = "skins.components.GuildGoldRewardItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
