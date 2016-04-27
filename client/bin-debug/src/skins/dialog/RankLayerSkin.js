var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var RankLayerSkin = (function (_super) {
            __extends(RankLayerSkin, _super);
            function RankLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__9_i(), this.friendList_i(), this.worldList_i(), this.attList_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RankLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RankLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillColor", "percentHeight", "horizontalCenter", "percentWidth"], [0, 0x605967, 100, 0, 100]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.VerticalLayout();
                t.gap = 0;
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["horizontalCenter", "source", "verticalCenter"], [0, "rank_title_bar", 0]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [50, 480, 182, 74]);
                t.elementsContent = [this.__5_i(), this.btnBack_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [2, "justify", "top"]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [59, 480, 192, 84]);
                t.layout = this.__7_i();
                t.elementsContent = [this.friendBtn_i(), this.worldBtn_i(), this.attBtn_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "top", "percentWidth"], [110, 0, 0, 100]);
                t.layout = this.__4_i();
                t.elementsContent = [this.__6_i(), this.__8_i()];
                return t;
            };
            __egretProto__.attBtn_i = function () {
                var t = new uiskins.RankToggleBtn();
                this.attBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [59, skins.components.RankToggleBtnSkin, 158, 152, 44]);
                return t;
            };
            __egretProto__.attList_i = function () {
                var t = new egret.gui.List();
                this.attList = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "percentWidth", "x", "y"], [0, 0, 110, true, 100, 40, 40]);
                t.layout = this.__12_i();
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 4, 10, 10]);
                return t;
            };
            __egretProto__.friendBtn_i = function () {
                var t = new uiskins.RankToggleBtn();
                this.friendBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [59, skins.components.RankToggleBtnSkin, 158, 132, 24]);
                return t;
            };
            __egretProto__.friendList_i = function () {
                var t = new egret.gui.List();
                this.friendList = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "percentWidth", "x", "y"], [0, 0, 110, true, 100, 20, 20]);
                t.layout = this.__10_i();
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [0, "center"]);
                return t;
            };
            __egretProto__.worldBtn_i = function () {
                var t = new uiskins.RankToggleBtn();
                this.worldBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [59, skins.components.RankToggleBtnSkin, 158, 142, 34]);
                return t;
            };
            __egretProto__.worldList_i = function () {
                var t = new egret.gui.List();
                this.worldList = t;
                this.__s(t, ["bottom", "horizontalCenter", "top", "useVirtualLayout", "percentWidth", "x", "y"], [0, 0, 110, true, 100, 30, 30]);
                t.layout = this.__11_i();
                return t;
            };
            RankLayerSkin._skinParts = ["btnBack", "friendBtn", "worldBtn", "attBtn", "friendList", "worldList", "attList"];
            return RankLayerSkin;
        })(egret.gui.Skin);
        dialog.RankLayerSkin = RankLayerSkin;
        RankLayerSkin.prototype.__class__ = "skins.dialog.RankLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
