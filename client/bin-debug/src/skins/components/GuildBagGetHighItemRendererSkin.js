var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildBagGetHighItemRendererSkin = (function (_super) {
            __extends(GuildBagGetHighItemRendererSkin, _super);
            function GuildBagGetHighItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [140, 466]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildBagGetHighItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildBagGetHighItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "touchEnabled", "x", "y"], ["Arial", 20, "高级钻石红包", 0xFFC30B, false, 221, 34]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.selectImg_i(), this.redNumLbl_i(), this.__5_i(), this.timeLbl_i(), this.getedImg_i()];
                return t;
            };
            __egretProto__.getedImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.getedImg = t;
                this.__s(t, ["source", "x", "y"], ["guildbag_icon_geted", 351, 53]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "icon_default", 58, 50, 13]);
                return t;
            };
            __egretProto__.redNumLbl_i = function () {
                var t = new egret.gui.Label();
                this.redNumLbl = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "touchEnabled", "x", "y"], ["Arial", 20, "标签", 0x868686, false, 155, 90]);
                return t;
            };
            __egretProto__.selectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg = t;
                this.__s(t, ["source", "x", "y"], ["guildbag_item_high", 125, 11]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "horizontalCenter", "source"], [0, 0, "rank_line"]);
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "textColor", "touchEnabled", "x", "y"], ["Arial", 27, 16, 0x868686, false, 10, 119]);
                return t;
            };
            GuildBagGetHighItemRendererSkin._skinParts = ["iconImg", "selectImg", "redNumLbl", "timeLbl", "getedImg"];
            return GuildBagGetHighItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildBagGetHighItemRendererSkin = GuildBagGetHighItemRendererSkin;
        GuildBagGetHighItemRendererSkin.prototype.__class__ = "skins.components.GuildBagGetHighItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
