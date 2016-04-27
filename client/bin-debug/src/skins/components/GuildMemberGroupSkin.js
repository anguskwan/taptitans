var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMemberGroupSkin = (function (_super) {
            __extends(GuildMemberGroupSkin, _super);
            function GuildMemberGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 480]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMemberGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMemberGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会成员", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.memberList_i(), this.__5_i()];
                return t;
            };
            __egretProto__.memberList_i = function () {
                var t = new egret.gui.List();
                this.memberList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [620, 0, 451, 65]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 636, 0, 465, 58]);
                return t;
            };
            GuildMemberGroupSkin._skinParts = ["memberList"];
            return GuildMemberGroupSkin;
        })(egret.gui.Skin);
        components.GuildMemberGroupSkin = GuildMemberGroupSkin;
        GuildMemberGroupSkin.prototype.__class__ = "skins.components.GuildMemberGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
