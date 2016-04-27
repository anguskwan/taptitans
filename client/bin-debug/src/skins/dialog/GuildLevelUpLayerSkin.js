var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildLevelUpLayerSkin = (function (_super) {
            __extends(GuildLevelUpLayerSkin, _super);
            function GuildLevelUpLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLevelUpLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildLevelUpLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "y"], [13, 63]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__8_i(), this.__9_i(), this.__10_i(), this.crystalLbl_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [6, "center"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.currLbl_i(), this.__11_i(), this.lvUpList_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.closeBtn_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "top", "width"], [0x4E361F, 200, 0, 58, 465]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "top", "width"], [0x3C2E29, 700, 0, 56, 480]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会升级", 0xF7DDB9, 16]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [270, 61]);
                t.elementsContent = [this.selectBtn_i(), this.multipleLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "返", 0xAB8A61, 316, 196]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.crystalLbl_i = function () {
                var t = new egret.gui.Label();
                this.crystalLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "50", "center", 0xAB8A61, "middle", 0, 15]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "捐献次数", 0xAB8A61, 6, 71]);
                return t;
            };
            __egretProto__.lvUpList_i = function () {
                var t = new egret.gui.List();
                this.lvUpList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [650, 0, 480, 10, 106]);
                t.layout = this.__12_i();
                return t;
            };
            __egretProto__.multipleLbl_i = function () {
                var t = new egret.gui.Label();
                this.multipleLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "touchEnabled", "verticalAlign", "verticalCenter"], [true, "Arial", 0, 20, "x1", "center", false, "middle", 0]);
                return t;
            };
            __egretProto__.selectBtn_i = function () {
                var t = new egret.gui.Button();
                this.selectBtn = t;
                this.__s(t, ["horizontalCenter", "skinName", "verticalCenter"], [0, new egret.gui.ButtonSkin("guild_btn_push_green", "guild_btn_push_green", "guild_btn_push_green"), 0]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "scaleX", "scaleY", "source", "verticalCenter", "x"], [true, "scale", 0.8, 0.8, "crystal", 0, 374]);
                return t;
            };
            GuildLevelUpLayerSkin._skinParts = ["closeBtn", "currLbl", "selectBtn", "multipleLbl", "crystalLbl", "lvUpList"];
            return GuildLevelUpLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildLevelUpLayerSkin = GuildLevelUpLayerSkin;
        GuildLevelUpLayerSkin.prototype.__class__ = "skins.dialog.GuildLevelUpLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
