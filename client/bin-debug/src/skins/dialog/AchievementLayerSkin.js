var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var AchievementLayerSkin = (function (_super) {
            __extends(AchievementLayerSkin, _super);
            function AchievementLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__13_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = AchievementLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return AchievementLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.btnBack_i(), this.__6_i(), this.__7_i(), this.__10_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.__11_i(), this.achievementList_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0x4B4253, 100, 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("verticalAlign", "middle");
                this.__s(t, ["height", "horizontalCenter", "scale9Grid", "source", "top", "percentWidth"], [100, 0, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 0, 100]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["achievement_crown", 20, 30]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "奖牌", 89, 14]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "完成目标就能获得奖励！", 89, 49]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source"], [0.8, 0.8, "diamond"]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                return t;
            };
            __egretProto__.achievementList_i = function () {
                var t = new egret.gui.List();
                this.achievementList = t;
                this.__s(t, ["height", "top", "percentWidth"], [656, 100, 100]);
                t.layout = this.__12_i();
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 11]);
                return t;
            };
            __egretProto__.diamondLbl_i = function () {
                var t = new egret.gui.Label();
                this.diamondLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text"], [true, "Arial", 18, "0"]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["right", "verticalCenter"], [32, 17.5]);
                t.layout = this.__9_i();
                t.elementsContent = [this.diamondLbl_i(), this.__8_i()];
                return t;
            };
            AchievementLayerSkin._skinParts = ["btnBack", "diamondLbl", "achievementList"];
            return AchievementLayerSkin;
        })(egret.gui.Skin);
        dialog.AchievementLayerSkin = AchievementLayerSkin;
        AchievementLayerSkin.prototype.__class__ = "skins.dialog.AchievementLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
