var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildGoldLayerSkin = (function (_super) {
            __extends(GuildGoldLayerSkin, _super);
            function GuildGoldLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.closeBtn_i(), this.goldList_i(), this.titleLbl_i(), this.attRect_i(), this.attGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.attBtn_i = function () {
                var t = new egret.gui.Button();
                this.attBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["enabled", "height", "skinName", "width"], [true, 60, new egret.gui.ButtonSkin("dialog_btn_green", "dialog_btn_green", "dialog_btn_disabled"), 160]);
                return t;
            };
            __egretProto__.attGroup_i = function () {
                var t = new egret.gui.Group();
                this.attGroup = t;
                t.setStyle("bold", true);
                this.__s(t, ["horizontalCenter", "y"], [0, 690]);
                t.elementsContent = [this.attBtn_i(), this.attText_i()];
                return t;
            };
            __egretProto__.attRect_i = function () {
                var t = new egret.gui.Rect();
                this.attRect = t;
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0xF9BD1B, 80, 0, 446, 10, 680]);
                return t;
            };
            __egretProto__.attText_i = function () {
                var t = new egret.gui.Label();
                this.attText = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "匹配对手（0）", false, 0]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [1, new egret.gui.ButtonSkin("dialog_btn_cha_close_white", "dialog_btn_cha_close_white", "dialog_btn_cha_close_white"), 0, 10, 10]);
                return t;
            };
            __egretProto__.goldList_i = function () {
                var t = new egret.gui.List();
                this.goldList = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "width"], [80, 1, 148, true, 444]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_gold_rank_bg_png";
                return t;
            };
            __egretProto__.titleLbl_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], ["Arial", 0, 24, "标签", 0xFEE49C, 105]);
                return t;
            };
            GuildGoldLayerSkin._skinParts = ["closeBtn", "goldList", "titleLbl", "attRect", "attBtn", "attText", "attGroup"];
            return GuildGoldLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildGoldLayerSkin = GuildGoldLayerSkin;
        GuildGoldLayerSkin.prototype.__class__ = "skins.dialog.GuildGoldLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
