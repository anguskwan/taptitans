var skins;
(function (skins) {
    var components;
    (function (components) {
        var AchievementItemListSkin = (function (_super) {
            __extends(AchievementItemListSkin, _super);
            function AchievementItemListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [80, 450]);
                this.elementsContent = [this.__16_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = AchievementItemListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return AchievementItemListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [22, 22, 138, 23]);
                t.elementsContent = [this.__10_i(), this.starImg3_i()];
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_off", 0]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [22, 22, 148, 33]);
                t.elementsContent = [this.__12_i(), this.starImg4_i()];
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_off", 0]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [22, 22, 158, 43]);
                t.elementsContent = [this.__14_i(), this.starImg5_i()];
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "width"], [100, 0, 0, 450]);
                t.elementsContent = [this.__4_i(), this.iconImg_i(), this.nameLbl_i(), this.achieveLbl_i(), this.starGroup_i(), this.btnItem_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["list_element_bg", 450, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_off", 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [22, 22, 118, 3]);
                t.elementsContent = [this.__6_i(), this.starImg1_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_off", 0]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [22, 22, 128, 13]);
                t.elementsContent = [this.__8_i(), this.starImg2_i()];
                return t;
            };
            __egretProto__.achieveLbl_i = function () {
                var t = new egret.gui.Label();
                this.achieveLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 14, "100/100", "left", "middle", 198, 45]);
                return t;
            };
            __egretProto__.btnItem_i = function () {
                var t = new uiskins.CommonItemButton();
                this.btnItem = t;
                this.__s(t, ["label", "skinName", "x", "y"], ["按钮", skins.components.CommonItemButtonSkin, 318, 10]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [58, "achievement1", 58, 13, 11]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 18, "名字", "left", "middle", 82, 14]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_off", 0]);
                return t;
            };
            __egretProto__.starGroup_i = function () {
                var t = new egret.gui.Group();
                this.starGroup = t;
                this.__s(t, ["x", "y"], [83, 43]);
                t.layout = this.__5_i();
                t.elementsContent = [this.__7_i(), this.__9_i(), this.__11_i(), this.__13_i(), this.__15_i()];
                return t;
            };
            __egretProto__.starImg1_i = function () {
                var t = new egret.gui.UIAsset();
                this.starImg1 = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_on", 0]);
                return t;
            };
            __egretProto__.starImg2_i = function () {
                var t = new egret.gui.UIAsset();
                this.starImg2 = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_on", 0]);
                return t;
            };
            __egretProto__.starImg3_i = function () {
                var t = new egret.gui.UIAsset();
                this.starImg3 = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_on", 0]);
                return t;
            };
            __egretProto__.starImg4_i = function () {
                var t = new egret.gui.UIAsset();
                this.starImg4 = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_on", 0]);
                return t;
            };
            __egretProto__.starImg5_i = function () {
                var t = new egret.gui.UIAsset();
                this.starImg5 = t;
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "achievement_star_on", 0]);
                return t;
            };
            AchievementItemListSkin._skinParts = ["iconImg", "nameLbl", "achieveLbl", "starImg1", "starImg2", "starImg3", "starImg4", "starImg5", "starGroup", "btnItem"];
            return AchievementItemListSkin;
        })(egret.gui.Skin);
        components.AchievementItemListSkin = AchievementItemListSkin;
        AchievementItemListSkin.prototype.__class__ = "skins.components.AchievementItemListSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
