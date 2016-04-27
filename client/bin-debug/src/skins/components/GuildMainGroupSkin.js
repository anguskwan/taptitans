var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMainGroupSkin = (function (_super) {
            __extends(GuildMainGroupSkin, _super);
            function GuildMainGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 480]);
                this.elementsContent = [this.__16_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMainGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMainGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x4E361F, 75, 30, 400, 10, 90]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                t.layout = this.__12_i();
                t.elementsContent = [this.contentLbl_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["height", "scrollSpeed", "width", "x", "y"], [60, 0.1, 380, 80, 97]);
                t.viewport = this.__13_i();
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.nameLbl_i(), this.managerLbl_i(), this.__5_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__14_i(), this.iconImg_i(), this.editorBtn_i(), this.warList_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_icon_att", 0, 374]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 76, 62]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__3_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "source", "verticalCenter", "x"], [true, "scale", "guild_tip_member", 0, 374]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "x", "y"], [28, 186, 64]);
                t.layout = this.__7_i();
                t.elementsContent = [this.__6_i(), this.memberLbl_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "创建费用：", 0xB96B2C, 87, 213]);
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.contentLbl_i = function () {
                var t = new egret.gui.Label();
                this.contentLbl = t;
                this.__s(t, ["fontFamily", "maxDisplayedLines", "size", "text", "width"], ["Arial", 1000, 16, "内容", 380]);
                return t;
            };
            __egretProto__.editorBtn_i = function () {
                var t = new egret.gui.Button();
                this.editorBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [29, new egret.gui.ButtonSkin("guild_editor", "guild_editor", "guild_editor"), 29, 24, 112]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 8, 8]);
                return t;
            };
            __egretProto__.managerLbl_i = function () {
                var t = new egret.gui.Label();
                this.managerLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 18, "会长", 0xF9DFBB, 76, 39]);
                return t;
            };
            __egretProto__.memberLbl_i = function () {
                var t = new egret.gui.Label();
                this.memberLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 18, "0/10", "center", 0x25FF3A, "middle", 0, 15]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textColor", "x", "y"], [true, "Arial", 24, "公会名称", 0xFFFFFF, 76, 6]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "width"], [10, 0x4E361F, 520, 0, 460]);
                return t;
            };
            __egretProto__.warList_i = function () {
                var t = new egret.gui.List();
                this.warList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [494, 0.5, 447, 176]);
                t.layout = this.__15_i();
                return t;
            };
            GuildMainGroupSkin._skinParts = ["nameLbl", "managerLbl", "attLbl", "memberLbl", "contentLbl", "iconImg", "editorBtn", "warList"];
            return GuildMainGroupSkin;
        })(egret.gui.Skin);
        components.GuildMainGroupSkin = GuildMainGroupSkin;
        GuildMainGroupSkin.prototype.__class__ = "skins.components.GuildMainGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
