var skins;
(function (skins) {
    var components;
    (function (components) {
        var RankBestGroupSkin = (function (_super) {
            __extends(RankBestGroupSkin, _super);
            function RankBestGroupSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [690, 480]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankBestGroupSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankBestGroupSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.HorizontalLayout();
                t.gap = 20;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "上一页", false, 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "text", "touchEnabled", "verticalCenter"], ["Arial", 0, 20, "下一页", false, 0]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.bestList_i(), this.refreshGroup_i()];
                return t;
            };
            __egretProto__.bestList_i = function () {
                var t = new egret.gui.List();
                this.bestList = t;
                this.__s(t, ["height", "horizontalCenter", "width"], [620, 0, 480]);
                t.layout = this.__3_i();
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
                t.elementsContent = [this.nextBtn_i(), this.__6_i()];
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
                t.elementsContent = [this.preBtn_i(), this.__5_i()];
                return t;
            };
            __egretProto__.refreshGroup_i = function () {
                var t = new egret.gui.Group();
                this.refreshGroup = t;
                this.__s(t, ["bottom", "height", "horizontalCenter", "width"], [11, 50, 0, 320]);
                t.layout = this.__4_i();
                t.elementsContent = [this.preGroup_i(), this.nextGroup_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            RankBestGroupSkin._skinParts = ["bestList", "preBtn", "preGroup", "nextBtn", "nextGroup", "refreshGroup"];
            return RankBestGroupSkin;
        })(egret.gui.Skin);
        components.RankBestGroupSkin = RankBestGroupSkin;
        RankBestGroupSkin.prototype.__class__ = "skins.components.RankBestGroupSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
