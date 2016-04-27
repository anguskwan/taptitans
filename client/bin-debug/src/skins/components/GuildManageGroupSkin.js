var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildManageGroupSkin = (function (_super) {
            __extends(GuildManageGroupSkin, _super);
            function GuildManageGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 480]);
                this.elementsContent = [this.__5_i(), this.messagePKGroup_i(), this.levelUpGroup_i(), this.messageGroup_i(), this.settingGroup_i(), this.guitGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildManageGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildManageGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 636, 0, 465, 58]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会管理", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "战报信息", false, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "公会升级", false, 0]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "信息", false, 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "会长设置", false, 0]);
                return t;
            };
            __egretProto__.guitGroup_i = function () {
                var t = new egret.gui.Group();
                this.guitGroup = t;
                this.__s(t, ["height", "horizontalCenter", "visible", "width", "x", "y"], [50, 0, false, 150, 30, 610]);
                t.elementsContent = [this.quitBtn_i(), this.__10_i()];
                return t;
            };
            __egretProto__.levelUpBtn_i = function () {
                var t = new egret.gui.Button();
                this.levelUpBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.levelUpGroup_i = function () {
                var t = new egret.gui.Group();
                this.levelUpGroup = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [50, 0, 150, 20, 160]);
                t.elementsContent = [this.levelUpBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.messageBtn_i = function () {
                var t = new egret.gui.Button();
                this.messageBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.messageGroup_i = function () {
                var t = new egret.gui.Group();
                this.messageGroup = t;
                this.__s(t, ["height", "horizontalCenter", "visible", "width", "x", "y"], [50, 0, false, 150, 40, 220]);
                t.elementsContent = [this.messageBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.messagePKBtn_i = function () {
                var t = new egret.gui.Button();
                this.messagePKBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.messagePKGroup_i = function () {
                var t = new egret.gui.Group();
                this.messagePKGroup = t;
                this.__s(t, ["height", "horizontalCenter", "width", "x", "y"], [50, 0, 150, 30, 100]);
                t.elementsContent = [this.messagePKBtn_i(), this.__6_i()];
                return t;
            };
            __egretProto__.quitBtn_i = function () {
                var t = new egret.gui.Button();
                this.quitBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_red", "dialog_btn_red", "dialog_btn_red"), 0, 150]);
                return t;
            };
            __egretProto__.settingBtn_i = function () {
                var t = new egret.gui.Button();
                this.settingBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.settingGroup_i = function () {
                var t = new egret.gui.Group();
                this.settingGroup = t;
                this.__s(t, ["height", "horizontalCenter", "visible", "width", "x", "y"], [50, 0, false, 150, 30, 280]);
                t.elementsContent = [this.settingBtn_i(), this.__9_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "退出公会", false, 0]);
                return t;
            };
            GuildManageGroupSkin._skinParts = ["messagePKBtn", "messagePKGroup", "levelUpBtn", "levelUpGroup", "messageBtn", "messageGroup", "settingBtn", "settingGroup", "quitBtn", "guitGroup"];
            return GuildManageGroupSkin;
        })(egret.gui.Skin);
        components.GuildManageGroupSkin = GuildManageGroupSkin;
        GuildManageGroupSkin.prototype.__class__ = "skins.components.GuildManageGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
