var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildCreateLayerSkin = (function (_super) {
            __extends(GuildCreateLayerSkin, _super);
            function GuildCreateLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildCreateLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildCreateLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [5, "justify", "top"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [50, 0, 465, 10]);
                t.layout = this.__4_i();
                t.elementsContent = [this.joinToggleBtn_i(), this.createToggleBtn_i(), this.searchToggleBtn_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 620, 0.5, 465, 67]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "返回", false, 0]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "x"], [10, 50, -180, 100, 30]);
                t.elementsContent = [this.backBtn_i(), this.__7_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__5_i(), this.__6_i(), this.joinGroup_i(), this.createGroup_i(), this.searchGroup_i(), this.autoEnterBtn_i(), this.__8_i()];
                return t;
            };
            __egretProto__.autoEnterBtn_i = function () {
                var t = new egret.gui.Button();
                this.autoEnterBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [51, new egret.gui.ButtonSkin("guild_auto_enter", "guild_auto_enter", "guild_auto_enter"), 101, 139, 695]);
                return t;
            };
            __egretProto__.backBtn_i = function () {
                var t = new egret.gui.Button();
                this.backBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_yellow", "dialog_btn_yellow", "dialog_btn_yellow"), 0, 100]);
                return t;
            };
            __egretProto__.createGroup_i = function () {
                var t = new egret.gui.Group();
                this.createGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [620, 465, 7, 67]);
                return t;
            };
            __egretProto__.createToggleBtn_i = function () {
                var t = new uiskins.GuildCreateToggleBtn();
                this.createToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildCreateToggleBtnSkin, 150, 137, 15]);
                return t;
            };
            __egretProto__.joinGroup_i = function () {
                var t = new egret.gui.Group();
                this.joinGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [690, 465, 7, 67]);
                return t;
            };
            __egretProto__.joinToggleBtn_i = function () {
                var t = new uiskins.GuildJoinToggleBtn();
                this.joinToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildJoinToggleBtnSkin, 150, 72, 21]);
                return t;
            };
            __egretProto__.searchGroup_i = function () {
                var t = new egret.gui.Group();
                this.searchGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [620, 465, 7, 67]);
                return t;
            };
            __egretProto__.searchToggleBtn_i = function () {
                var t = new uiskins.GuildSearchToggleBtn();
                this.searchToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildSearchToggleBtnSkin, 150, 228, 10]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            GuildCreateLayerSkin._skinParts = ["joinToggleBtn", "createToggleBtn", "searchToggleBtn", "joinGroup", "createGroup", "searchGroup", "autoEnterBtn", "backBtn"];
            return GuildCreateLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildCreateLayerSkin = GuildCreateLayerSkin;
        GuildCreateLayerSkin.prototype.__class__ = "skins.dialog.GuildCreateLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
