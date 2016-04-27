var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildSearchGroupSkin = (function (_super) {
            __extends(GuildSearchGroupSkin, _super);
            function GuildSearchGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [620, 465]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildSearchGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildSearchGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["guild_tip_search", 10, 9]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [40, 330, 30, 4]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.textInput_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 18, "搜索", false, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [40, 173.5, 60, 20, 4]);
                t.elementsContent = [this.searchBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__5_i(), this.__7_i(), this.guildList_i()];
                return t;
            };
            __egretProto__.guildList_i = function () {
                var t = new egret.gui.List();
                this.guildList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [570, 0, 455, 10, 48]);
                t.layout = this.__8_i();
                return t;
            };
            __egretProto__.searchBtn_i = function () {
                var t = new egret.gui.Button();
                this.searchBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [40, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 60]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth"], [0x271C0B, 100, 100]);
                return t;
            };
            __egretProto__.textInput_i = function () {
                var t = new uiskins.GuildTextInput();
                this.textInput = t;
                this.__s(t, ["height", "left", "skinName", "width"], [40, 39, skins.components.GuildTextInputSkin, 280]);
                return t;
            };
            GuildSearchGroupSkin._skinParts = ["textInput", "searchBtn", "guildList"];
            return GuildSearchGroupSkin;
        })(egret.gui.Skin);
        components.GuildSearchGroupSkin = GuildSearchGroupSkin;
        GuildSearchGroupSkin.prototype.__class__ = "skins.components.GuildSearchGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
