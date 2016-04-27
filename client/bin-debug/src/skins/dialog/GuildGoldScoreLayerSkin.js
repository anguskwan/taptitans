var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var GuildGoldScoreLayerSkin = (function (_super) {
            __extends(GuildGoldScoreLayerSkin, _super);
            function GuildGoldScoreLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.closeBtn_i(), this.list_i(), this.guildRect_i(), this.timeLbl_i(), this.guildGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildGoldScoreLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildGoldScoreLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["guild_gold_icon_myguild", 6, -23]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [1, new egret.gui.ButtonSkin("dialog_btn_cha_close_white", "dialog_btn_cha_close_white", "dialog_btn_cha_close_white"), 0, 10, 10]);
                return t;
            };
            __egretProto__.guildGroup_i = function () {
                var t = new egret.gui.Group();
                this.guildGroup = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width", "x", "y"], [70, 0, 338, 400, 10, 10]);
                t.elementsContent = [this.iconImg_i(), this.rankLbl_i(), this.scoreLbl_i(), this.__5_i(), this.rewardGroup_i()];
                return t;
            };
            __egretProto__.guildRect_i = function () {
                var t = new egret.gui.Rect();
                this.guildRect = t;
                this.__s(t, ["bottom", "fillColor", "height", "horizontalCenter", "width"], [0, 0xF8B128, 80, 0, 424]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new uiskins.GuildBadgeItem();
                this.iconImg = t;
                this.__s(t, ["scaleX", "scaleY", "skinName", "x", "y"], [0.67, 0.67, skins.components.GuildBadgeItemSkin, 3, 4]);
                return t;
            };
            __egretProto__.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "width"], [80, 1, 132, true, 414]);
                t.layout = this.__4_i();
                return t;
            };
            __egretProto__.rankLbl_i = function () {
                var t = new egret.gui.Label();
                this.rankLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "left", 0xFFFFFF, 83, 10]);
                return t;
            };
            __egretProto__.rewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.rewardBtn = t;
                t.setStyle("bold", true);
                t.setStyle("fontFamily", "Arial");
                this.__s(t, ["height", "skinName", "width"], [40, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_disabled"), 110]);
                return t;
            };
            __egretProto__.rewardGroup_i = function () {
                var t = new egret.gui.Group();
                this.rewardGroup = t;
                this.__s(t, ["x", "y"], [289, 15]);
                t.elementsContent = [this.rewardBtn_i(), this.rewardText_i()];
                return t;
            };
            __egretProto__.rewardText_i = function () {
                var t = new egret.gui.Label();
                this.rewardText = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], [true, "Arial", 0, 20, "领取奖励", false, 0]);
                return t;
            };
            __egretProto__.scoreLbl_i = function () {
                var t = new egret.gui.Label();
                this.scoreLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "textAlign", "textColor", "x", "y"], [true, "Arial", 20, "left", 0xFFFFFF, 83, 37]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "guild_gold_score_bg_png";
                return t;
            };
            __egretProto__.timeLbl_i = function () {
                var t = new egret.gui.Label();
                this.timeLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 18, "0月0日", 0xFFFFFF, 92]);
                return t;
            };
            GuildGoldScoreLayerSkin._skinParts = ["closeBtn", "list", "guildRect", "timeLbl", "iconImg", "rankLbl", "scoreLbl", "rewardBtn", "rewardText", "rewardGroup", "guildGroup"];
            return GuildGoldScoreLayerSkin;
        })(egret.gui.Skin);
        dialog.GuildGoldScoreLayerSkin = GuildGoldScoreLayerSkin;
        GuildGoldScoreLayerSkin.prototype.__class__ = "skins.dialog.GuildGoldScoreLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
