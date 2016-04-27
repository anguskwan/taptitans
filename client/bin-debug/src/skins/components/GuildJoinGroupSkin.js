var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildJoinGroupSkin = (function (_super) {
            __extends(GuildJoinGroupSkin, _super);
            function GuildJoinGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [690, 465]);
                this.elementsContent = [this.__8_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildJoinGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildJoinGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "公会名称", "center", 0xB49268, 57, 6.5]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "总战斗力", "center", 0xB49268, 247, 7]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [6, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [20, "right"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.guildList_i(), this.refreshGroup_i()];
                return t;
            };
            __egretProto__.guildList_i = function () {
                var t = new egret.gui.List();
                this.guildList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [580, 0, 455, 38]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.nextBtn_i = function () {
                var t = new egret.gui.Button();
                this.nextBtn = t;
                t.setStyle("textAlign", "right");
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 127, new egret.gui.ButtonSkin("guild_next_page_btn", "guild_next_page_btn", "guild_next_page_btn"), 0, 60]);
                return t;
            };
            __egretProto__.preBtn_i = function () {
                var t = new egret.gui.Button();
                this.preBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, -130, new egret.gui.ButtonSkin("guild_pre_page_btn", "guild_pre_page_btn", "guild_pre_page_btn"), 1, 60]);
                return t;
            };
            __egretProto__.refreshGroup_i = function () {
                var t = new egret.gui.Group();
                this.refreshGroup = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x"], [12, 50, 60.5, 320, 10]);
                t.layout = this.__7_i();
                t.elementsContent = [this.preBtn_i(), this.nextBtn_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x352611, 26, 0, 455, 4]);
                return t;
            };
            GuildJoinGroupSkin._skinParts = ["guildList", "preBtn", "nextBtn", "refreshGroup"];
            return GuildJoinGroupSkin;
        })(egret.gui.Skin);
        components.GuildJoinGroupSkin = GuildJoinGroupSkin;
        GuildJoinGroupSkin.prototype.__class__ = "skins.components.GuildJoinGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
