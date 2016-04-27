var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildMessageInfoPanelSkin = (function (_super) {
            __extends(GuildMessageInfoPanelSkin, _super);
            function GuildMessageInfoPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__14_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildMessageInfoPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildMessageInfoPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [53, 211]);
                t.elementsContent = [this.approveBtn_i(), this.__10_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "拒绝", false, 0]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [233, 211]);
                t.elementsContent = [this.rejectBtn_i(), this.__12_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.closeBtn_i(), this.iconImg_i(), this.nameLbl_i(), this.highestStageLbl_i(), this.__9_i(), this.currLbl_i(), this.__11_i(), this.__13_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth"], [0.5, 0x000000, 100, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [300, egret.gui.getScale9Grid("55,53,337,324"), "guild_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x4E361F, 120, -0.5, 360, 10, 67]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "玩家申请加入", 26, 25]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "fillMode", "height", "source", "verticalCenter", "width", "x"], [true, "scale", 18, "pk_icon_pk", 0, 18, 374]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [3, "center", "middle"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["x", "y"], [175, 121]);
                t.layout = this.__8_i();
                t.elementsContent = [this.__7_i(), this.attLbl_i()];
                return t;
            };
            __egretProto__.approveBtn_i = function () {
                var t = new egret.gui.Button();
                this.approveBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 120]);
                return t;
            };
            __egretProto__.attLbl_i = function () {
                var t = new egret.gui.Label();
                this.attLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "verticalCenter", "x"], [true, "Arial", 14, "0", "center", 0x30BBE8, "middle", 0, 15]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [24, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 19, 10, 10]);
                return t;
            };
            __egretProto__.currLbl_i = function () {
                var t = new egret.gui.Label();
                this.currLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "武器：0     神器：0", "center", 0x88848C, "middle", 175, 142]);
                return t;
            };
            __egretProto__.highestStageLbl_i = function () {
                var t = new egret.gui.Label();
                this.highestStageLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 14, "历史最高关卡：0", "center", 0xFFE010, "middle", 175, 101]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "verticalCenter", "width", "x", "y"], [58, "icon_default", -28, 58, 107, 10]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "verticalAlign", "x", "y"], [true, "Arial", 16, "名字", "center", 0xFFFFFF, "middle", 175, 82]);
                return t;
            };
            __egretProto__.rejectBtn_i = function () {
                var t = new egret.gui.Button();
                this.rejectBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [50, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_disabled"), 120]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "同意", false, 0]);
                return t;
            };
            GuildMessageInfoPanelSkin._skinParts = ["closeBtn", "iconImg", "nameLbl", "highestStageLbl", "attLbl", "currLbl", "approveBtn", "rejectBtn"];
            return GuildMessageInfoPanelSkin;
        })(egret.gui.Skin);
        dialog.GuildMessageInfoPanelSkin = GuildMessageInfoPanelSkin;
        GuildMessageInfoPanelSkin.prototype.__class__ = "skins.dialog.GuildMessageInfoPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
