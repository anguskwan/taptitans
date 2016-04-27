var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var TopLayerSkin = (function (_super) {
            __extends(TopLayerSkin, _super);
            function TopLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [200, 480]);
                this.elementsContent = [this.topStageLy_i(), this.rankBtn_i(), this.rankBestBtn_i(), this.achievementBtn_i(), this.tipAchieveImg_i(), this.mailBtn_i(), this.tipMailImg_i(), this.progressBar_i(), this.coinGroup_i(), this.stageGroup_i(), this.challengeBossBtn_i(), this.bossTimeProgressBar_i(), this.bossTimeLbl_i(), this.handImg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = TopLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TopLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [-17.5, "icon_monster", 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                return t;
            };
            __egretProto__.achievementBtn_i = function () {
                var t = new uiskins.StateButton();
                this.achievementBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "width", "x", "y"], ["btn_task_hava", "btn_task_hava", 32, skins.components.StateButtonSkin, "btn_task_hava", 32, 389, 20]);
                return t;
            };
            __egretProto__.bossTimeLbl_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.bossTimeLbl = t;
                this.__s(t, ["font", "right", "scaleX", "scaleY", "text", "verticalCenter", "visible"], ["font_white_fnt", 341, 0.9, 0.9, "0", 1, false]);
                return t;
            };
            __egretProto__.bossTimeProgressBar_i = function () {
                var t = new uiskins.TopBossTimeProgressBar();
                this.bossTimeProgressBar = t;
                this.__s(t, ["skinName", "x", "y"], [skins.components.BossTimeProgressBarSkin, 144, 111]);
                return t;
            };
            __egretProto__.challengeBossBtn_i = function () {
                var t = new uiskins.StateButton();
                this.challengeBossBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "visible", "width", "x", "y"], ["btn_leave_war", "btn_leave_war", 47, skins.components.StateButtonSkin, "btn_leave_war", false, 104, 358, 82]);
                return t;
            };
            __egretProto__.coinGroup_i = function () {
                var t = new egret.gui.Group();
                this.coinGroup = t;
                this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 44]);
                t.layout = this.__3_i();
                t.elementsContent = [this.coinImg_i(), this.labelCoin_i()];
                return t;
            };
            __egretProto__.coinImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.coinImg = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [-17.5, "coin", 0]);
                return t;
            };
            __egretProto__.handImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.handImg = t;
                this.__s(t, ["rotation", "source", "touchEnabled", "visible", "x", "y"], [130, "icon_hand", false, false, 458, 134]);
                return t;
            };
            __egretProto__.labelBoss_i = function () {
                var t = new egret.gui.Label();
                this.labelBoss = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "verticalCenter"], [true, "Arial", 34, 24, "0/10", 0xFFFFFF, 0]);
                return t;
            };
            __egretProto__.labelCoin_i = function () {
                var t = new egret.gui.BitmapLabel();
                this.labelCoin = t;
                this.__s(t, ["font", "text", "x", "y"], ["font_white_fnt", "0", 52, 8]);
                return t;
            };
            __egretProto__.mailBtn_i = function () {
                var t = new uiskins.StateButton();
                this.mailBtn = t;
                this.__s(t, ["disabledSkinName", "downSkinName", "height", "skinName", "upSkinName", "width", "x", "y"], ["btn_mail_off", "btn_mail_off", 28, skins.components.StateButtonSkin, "btn_mail_off", 34, 81, 30]);
                return t;
            };
            __egretProto__.progressBar_i = function () {
                var t = new uiskins.TopHPProgressBar();
                this.progressBar = t;
                this.__s(t, ["horizontalCenter", "skinName", "slideDuration", "top"], [0, skins.components.HPProgressBarSkin, 0, 96]);
                return t;
            };
            __egretProto__.rankBestBtn_i = function () {
                var t = new egret.gui.Button();
                this.rankBestBtn = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_rank_best", "btn_rank_best", "btn_rank_best"), false, 335, 20]);
                return t;
            };
            __egretProto__.rankBtn_i = function () {
                var t = new egret.gui.Button();
                this.rankBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_rank", "btn_rank", "btn_rank"), 436, 20]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.horizontalAlign = "center";
                return t;
            };
            __egretProto__.stageGroup_i = function () {
                var t = new egret.gui.Group();
                this.stageGroup = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width", "x", "y"], [30, 170, 4, 100, 10, 10]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__4_i(), this.labelBoss_i()];
                return t;
            };
            __egretProto__.tipAchieveImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.tipAchieveImg = t;
                this.__s(t, ["source", "x", "y"], ["tip_task", 413, 16]);
                return t;
            };
            __egretProto__.tipMailImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.tipMailImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["tip_task", false, 109, 26]);
                return t;
            };
            __egretProto__.topStageLy_i = function () {
                var t = new TopStageTitleLayer();
                this.topStageLy = t;
                this.__s(t, ["horizontalCenter", "skinName", "top"], [0, skins.mod.TopStageTitleLayerSkin, 10]);
                return t;
            };
            TopLayerSkin._skinParts = ["topStageLy", "rankBtn", "rankBestBtn", "achievementBtn", "tipAchieveImg", "mailBtn", "tipMailImg", "progressBar", "coinImg", "labelCoin", "coinGroup", "labelBoss", "stageGroup", "challengeBossBtn", "bossTimeProgressBar", "bossTimeLbl", "handImg"];
            return TopLayerSkin;
        })(egret.gui.Skin);
        mod.TopLayerSkin = TopLayerSkin;
        TopLayerSkin.prototype.__class__ = "skins.mod.TopLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
