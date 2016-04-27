var skins;
(function (skins) {
    var components;
    (function (components) {
        var GuildRankGroupSkin = (function (_super) {
            __extends(GuildRankGroupSkin, _super);
            function GuildRankGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [700, 480]);
                this.elementsContent = [this.__12_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = GuildRankGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return GuildRankGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 20;
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.rankList_i(), this.__8_i(), this.refreshGroup_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "y"], [0x4E361F, 636, 0, 465, 58]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "horizontalCenter", "width", "x", "y"], [0x352611, 26, 0.5, 455, 10, 64]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "公会名称", "center", 0xB49268, 67, 67]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "textAlign", "textColor", "x", "y"], [true, "Arial", 18, "总战斗力", "center", 0xB49268, 282, 67]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textColor", "y"], [true, "Arial", 0, 24, "公会排行", 0xF7DDB9, 24]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "上一页", false, 0]);
                return t;
            };
            __egretProto__.nextBtn_i = function () {
                var t = new egret.gui.Button();
                this.nextBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.nextGroup_i = function () {
                var t = new egret.gui.Group();
                this.nextGroup = t;
                this.__s(t, ["height", "horizontalCenter", "visible", "width"], [50, 0, false, 150]);
                t.elementsContent = [this.nextBtn_i(), this.__10_i()];
                return t;
            };
            __egretProto__.preBtn_i = function () {
                var t = new egret.gui.Button();
                this.preBtn = t;
                this.__s(t, ["height", "horizontalCenter", "skinName", "verticalCenter", "width"], [50, 0, new egret.gui.ButtonSkin("dialog_btn_big_blue", "dialog_btn_big_blue", "dialog_btn_big_blue"), 0, 150]);
                return t;
            };
            __egretProto__.preGroup_i = function () {
                var t = new egret.gui.Group();
                this.preGroup = t;
                this.__s(t, ["height", "horizontalCenter", "visible", "width", "x", "y"], [50, -70, false, 150, 10, 0]);
                t.elementsContent = [this.preBtn_i(), this.__9_i()];
                return t;
            };
            __egretProto__.rankList_i = function () {
                var t = new egret.gui.List();
                this.rankList = t;
                this.__s(t, ["height", "horizontalCenter", "width", "y"], [530, 0.5, 455, 95]);
                t.layout = this.__7_i();
                return t;
            };
            __egretProto__.refreshGroup_i = function () {
                var t = new egret.gui.Group();
                this.refreshGroup = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width", "y"], [12, 50, 0, 320, 10]);
                t.layout = this.__11_i();
                t.elementsContent = [this.preGroup_i(), this.nextGroup_i()];
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "下一页", false, 0]);
                return t;
            };
            GuildRankGroupSkin._skinParts = ["rankList", "preBtn", "preGroup", "nextBtn", "nextGroup", "refreshGroup"];
            return GuildRankGroupSkin;
        })(egret.gui.Skin);
        components.GuildRankGroupSkin = GuildRankGroupSkin;
        GuildRankGroupSkin.prototype.__class__ = "skins.components.GuildRankGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
