var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildMemberItemRendererSkin = (function (_super) {
            __extends(GuildMemberItemRendererSkin, _super);
            function GuildMemberItemRendererSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [89, 451]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMemberItemRendererSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMemberItemRendererSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "height", "source", "verticalCenter", "width", "x"], [true, "scale", 18, "guild_icon_att", 0, 18, 374]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [84, 45]);
                t.layout = this.__6_i();
                t.elementsContent = [this.__5_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 18, "操作", false, 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.nameLbl_i(), this.highestStageLbl_i(), this.__7_i(), this.currLbl_i(), this.selfLbl_i(), this.delGroup_i()];
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 14, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "武器：0     神器：0", "center", 0x88848C, "middle", 84, 66]);
                return t;
            };
            __egretProto__.delBtn_i = function () {
                var t = new egret.gui.Button();
                this.delBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [40, 0, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 0, 60]);
                return t;
            };
            __egretProto__.delGroup_i = function () {
                var t = new egret.gui.Group();
                this.delGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [40, 60, 348, 25]);
                t.elementsContent = [this.delBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.highestStageLbl_i = function () {
                var t = new egret.gui.Label();
                this.highestStageLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "历史最高关卡：0", "center", 0xFFE010, "middle", 84, 25]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [58, "icon_default", 0.5, 58, 16]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "名字", "center", 0xFFFFFF, "middle", 84, 6]);
                return t;
            };
            __egretProto__.selfLbl_i = function () {
                var t = new egret.gui.Label();
                this.selfLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 20, "会长", "center", "middle", 355, 32]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_item_bar";
                return t;
            };
            GuildMemberItemRendererSkin._skinParts = ["iconImg", "nameLbl", "highestStageLbl", "attLbl", "currLbl", "selfLbl", "delBtn", "delGroup"];
            return GuildMemberItemRendererSkin;
        })(egret.gui.Skin);
        components.GuildMemberItemRendererSkin = GuildMemberItemRendererSkin;
        GuildMemberItemRendererSkin.prototype.__class__ = "skins.components.GuildMemberItemRendererSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
