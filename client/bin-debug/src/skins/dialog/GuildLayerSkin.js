var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildLayerSkin = (function (_super) {
            __extends(GuildLayerSkin, _super);
            function GuildLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [7.5, "justify", "top"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [0, 50, 0, 480]);
                t.layout = this.__4_i();
                t.elementsContent = [this.mainToggleBtn_i(), this.memberToggleBtn_i(), this.shopToggleBtn_i(), this.rankToggleBtn_i(), this.manageToggleBtn_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__5_i(), this.mainGroup_i(), this.memberGroup_i(), this.shopGroup_i(), this.rankGroup_i(), this.manageGroup_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [14, new egret.gui.ButtonSkin("guild_btn_close", "guild_btn_close", "guild_btn_close"), 9, 20, 20]);
                return t;
            };
            __egretProto__.mainGroup_i = function () {
                var t = new egret.gui.Group();
                this.mainGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [700, 480, 0, 0]);
                return t;
            };
            __egretProto__.mainToggleBtn_i = function () {
                var t = new uiskins.GuildMainToggleBtn();
                this.mainToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildMainToggleBtnSkin, 90, 33, 9]);
                return t;
            };
            __egretProto__.manageGroup_i = function () {
                var t = new egret.gui.Group();
                this.manageGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [700, 480, 0, 0]);
                return t;
            };
            __egretProto__.manageToggleBtn_i = function () {
                var t = new uiskins.GuildManageToggleBtn();
                this.manageToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildManageToggleBtnSkin, 90, 434, 35]);
                return t;
            };
            __egretProto__.memberGroup_i = function () {
                var t = new egret.gui.Group();
                this.memberGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [700, 480, 0, 0]);
                return t;
            };
            __egretProto__.memberToggleBtn_i = function () {
                var t = new uiskins.GuildMemberToggleBtn();
                this.memberToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildMemberToggleBtnSkin, 90, 231, 16]);
                return t;
            };
            __egretProto__.rankGroup_i = function () {
                var t = new egret.gui.Group();
                this.rankGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [700, 480, 0, 0]);
                return t;
            };
            __egretProto__.rankToggleBtn_i = function () {
                var t = new uiskins.GuildRankToggleBtn();
                this.rankToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildRankToggleBtnSkin, 90, 440, 8]);
                return t;
            };
            __egretProto__.shopGroup_i = function () {
                var t = new egret.gui.Group();
                this.shopGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [700, 480, 0, 0]);
                return t;
            };
            __egretProto__.shopToggleBtn_i = function () {
                var t = new uiskins.GuildShopToggleBtn();
                this.shopToggleBtn = t;
                this.__s(t, ["height", "label", "skinName", "width", "x", "y"], [50, "切换按钮", skins.components.GuildShopToggleBtnSkin, 90, 372, 15]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x765F40, 100, 0, 100, 10, 10]);
                return t;
            };
            GuildLayerSkin._skinParts = ["mainToggleBtn", "memberToggleBtn", "shopToggleBtn", "rankToggleBtn", "manageToggleBtn", "mainGroup", "memberGroup", "shopGroup", "rankGroup", "manageGroup", "closeBtn"];
            return GuildLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildLayerSkin = GuildLayerSkin;
        GuildLayerSkin.prototype.__class__ = "skins.dialog.GuildLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
