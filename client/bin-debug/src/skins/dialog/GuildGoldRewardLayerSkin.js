var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildGoldRewardLayerSkin = (function (_super) {
            __extends(GuildGoldRewardLayerSkin, _super);
            function GuildGoldRewardLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i(), this.__10_i(), this.list_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldRewardLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldRewardLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth"], [0, 0x6D543E, 100, 0, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "dialog_title_bar_brown", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width"], [50, 480]);
                t.elementsContent = [this.__4_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "规则说明：", 0xFFFFFF, 18, 58]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["Arial", 18, "奖励说明：", 0xFFFFFF, 18, 216]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x49382C, 126, 0, 452, 80]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close_white", "dialog_btn_cha_close_white", "dialog_btn_cha_close_white"), 4, 10, 10]);
                return t;
            };
            __egretProto__.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["height", "horizontalCenter", "top", "useVirtualLayout", "width", "x", "y"], [514, 0, 241, true, 452, 40, 40]);
                t.layout = this.__11_i();
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Scroller();
                this.__s(t, ["height", "scrollSpeed", "width", "x", "y"], [110, 0.1, 440, 21, 87]);
                t.viewport = this.textGroup_i();
                return t;
            };
            __egretProto__.textGroup_i = function () {
                var t = new egret.gui.Group();
                this.textGroup = t;
                t.layout = this.__9_i();
                return t;
            };
            GuildGoldRewardLayerSkin._skinParts = ["closeBtn", "textGroup", "list"];
            return GuildGoldRewardLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildGoldRewardLayerSkin = GuildGoldRewardLayerSkin;
        GuildGoldRewardLayerSkin.prototype.__class__ = "skins.dialog.GuildGoldRewardLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
