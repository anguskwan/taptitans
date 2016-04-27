var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var LeftBtnLayerSkin = (function (_super) {
            __extends(LeftBtnLayerSkin, _super);
            function LeftBtnLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [674, 480]);
                this.elementsContent = [this.challengeBtn_i(), this.matchBtn_i(), this.offonlinecoinBtn_i(), this.__3_i(), this.weaponBtn_i(), this.weaponGroup_i(), this.dailyRewardBtn_i(), this.selectGroup_i(), this.selectBtn_i(), this.pkTipImg1_i(), this.__6_i()];
                this.states = [
                    new egret.gui.State("normal", [
                        new egret.gui.SetProperty("offonlinecoinBtn", "visible", false),
                        new egret.gui.SetProperty("effectImg", "touchEnabled", false),
                        new egret.gui.SetProperty("effectImg", "touchChildren", false),
                        new egret.gui.SetProperty("effectImg", "visible", false)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LeftBtnLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LeftBtnLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.source = "tip_weapon_count_bg";
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [127, egret.gui.getScale9Grid("56,13,34,78"), "btn_select_bg", 459, -24, -22]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "width", "x", "y"], [20, 20, 98, 198]);
                return t;
            };
            __egretProto__.activityBtn_i = function () {
                var t = new egret.gui.Button();
                this.activityBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_activity", "btn_activity", "btn_activity"), 5, 21]);
                return t;
            };
            __egretProto__.activityTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.activityTipImg = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 42, 18]);
                return t;
            };
            __egretProto__.btnEquip_i = function () {
                var t = new egret.gui.Button();
                this.btnEquip = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_equip_entry", "btn_equip_entry", "btn_equip_entry"), 145, 16]);
                return t;
            };
            __egretProto__.challengeBtn_i = function () {
                var t = new egret.gui.Button();
                this.challengeBtn = t;
                this.__s(t, ["skinName", "visible", "y"], [new egret.gui.ButtonSkin("btn_challenge", "btn_challenge", "btn_challenge"), false, 70]);
                return t;
            };
            __egretProto__.dailyRewardBtn_i = function () {
                var t = new egret.gui.Button();
                this.dailyRewardBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_dailyreward", "btn_dailyreward", "btn_dailyreward"), 2, 340]);
                return t;
            };
            __egretProto__.dailyTaskEnterBtn_i = function () {
                var t = new egret.gui.Button();
                this.dailyTaskEnterBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dailyTaskEnterBtn", "dailyTaskEnterBtn", "dailyTaskEnterBtn"), 213, 24]);
                return t;
            };
            __egretProto__.dailyTaskTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.dailyTaskTipImg = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 246, 16]);
                return t;
            };
            __egretProto__.effectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.effectImg = t;
                this.__s(t, ["source", "x", "y"], ["effect_coinbtn", 29, 31]);
                return t;
            };
            __egretProto__.guildBtn_i = function () {
                var t = new uiskins.StateButton();
                this.guildBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "skinName", "upSkinName", "x", "y"], ["btn_match", "btn_match", new egret.gui.ButtonSkin("btn_guild", "btn_guild", "btn_guild_lock"), "btn_match", 76, 24]);
                return t;
            };
            __egretProto__.matchBtn_i = function () {
                var t = new uiskins.StateButton();
                this.matchBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "visible", "width", "x", "y"], ["btn_match", "btn_match", 59, skins.components.StateButtonSkin, "btn_match", false, 59, 0, 139]);
                return t;
            };
            __egretProto__.offonlinecoinBtn_i = function () {
                var t = new egret.gui.Button();
                this.offonlinecoinBtn = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_offonlinecoin", "btn_offonlinecoin", "btn_offonlinecoin"), false, 0, 207]);
                return t;
            };
            __egretProto__.pkBtn_i = function () {
                var t = new egret.gui.Button();
                this.pkBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_pk", "btn_pk", "btn_pk_close"), 282, 22]);
                return t;
            };
            __egretProto__.pkTipImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.pkTipImg1 = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 40, 5]);
                return t;
            };
            __egretProto__.pkTipImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.pkTipImg = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 321, 16]);
                return t;
            };
            __egretProto__.selectBtn_i = function () {
                var t = new uiskins.StateButton();
                this.selectBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "width", "x", "y"], ["btn_match", "btn_match", 26, new egret.gui.ButtonSkin("btn_select_open", "btn_select_open", "btn_select_open"), "btn_match", 31, 21, 17]);
                return t;
            };
            __egretProto__.selectGroup_i = function () {
                var t = new egret.gui.Group();
                this.selectGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [94, 441, 16, 71]);
                t.elementsContent = [this.__5_i(), this.pkBtn_i(), this.pkTipImg_i(), this.activityBtn_i(), this.activityTipImg_i(), this.guildBtn_i(), this.btnEquip_i(), this.dailyTaskEnterBtn_i(), this.dailyTaskTipImg_i(), this.settingBtn_i()];
                return t;
            };
            __egretProto__.settingBtn_i = function () {
                var t = new egret.gui.Button();
                this.settingBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_setting", "btn_setting", "btn_setting"), 356, 19]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "visible", "width", "x", "y"], [59, false, 59, 0, 208]);
                t.elementsContent = [this.effectImg_i()];
                return t;
            };
            __egretProto__.weaponBtn_i = function () {
                var t = new egret.gui.Button();
                this.weaponBtn = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_weapon", "btn_weapon", "btn_weapon"), false, 0, 274]);
                return t;
            };
            __egretProto__.weaponGroup_i = function () {
                var t = new egret.gui.Group();
                this.weaponGroup = t;
                this.__s(t, ["visible", "width", "x", "y"], [false, 24, 39, 274]);
                t.elementsContent = [this.__4_i(), this.weaponLbl_i()];
                return t;
            };
            __egretProto__.weaponLbl_i = function () {
                var t = new egret.gui.Label();
                this.weaponLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", -0.5, 14, "0", "center", "middle", 0]);
                return t;
            };
            LeftBtnLayerSkin._skinParts = ["challengeBtn", "matchBtn", "offonlinecoinBtn", "effectImg", "weaponBtn", "weaponLbl", "weaponGroup", "dailyRewardBtn", "pkBtn", "pkTipImg", "activityBtn", "activityTipImg", "guildBtn", "btnEquip", "dailyTaskEnterBtn", "dailyTaskTipImg", "settingBtn", "selectGroup", "selectBtn", "pkTipImg1"];
            return LeftBtnLayerSkin;
        })(egret.gui.Skin);
        mod.LeftBtnLayerSkin = LeftBtnLayerSkin;
        LeftBtnLayerSkin.prototype.__class__ = "skins.mod.LeftBtnLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
