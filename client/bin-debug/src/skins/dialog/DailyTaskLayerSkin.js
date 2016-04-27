var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var DailyTaskLayerSkin = (function (_super) {
            __extends(DailyTaskLayerSkin, _super);
            function DailyTaskLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__11_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = DailyTaskLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return DailyTaskLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 1, 100]);
                t.elementsContent = [this.__3_i(), this.__9_i(), this.list_i()];
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
                this.__s(t, ["source", "x", "y"], ["common_json.dailyTaskTitleIcon", 20, 16]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 24, "每日任务", 89, 14]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 18, "每天24:00刷新任务，请及时领取。", 89, 49]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "verticalCenter", "width", "x"], [15, "diamond", 0, 15, 58]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.btnBack_i(), this.__6_i(), this.__7_i(), this.refreshGroup_i()];
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["right", "skinName", "top"], [20, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 11]);
                return t;
            };
            __egretProto__.costLbl_i = function () {
                var t = new egret.gui.Label();
                this.costLbl = t;
                this.__s(t, ["size", "text", "verticalCenter", "x"], [16, "200", 0, 74]);
                return t;
            };
            __egretProto__.list_i = function () {
                var t = new egret.gui.List();
                this.list = t;
                this.__s(t, ["height", "top", "percentWidth"], [656, 100, 100]);
                t.layout = this.__10_i();
                return t;
            };
            __egretProto__.refreshBtn_i = function () {
                var t = new egret.gui.Button();
                this.refreshBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [35, new egret.gui.ButtonSkin("dialog_btn_blue", "dialog_btn_blue", "dialog_btn_blue"), 120, 0, 0]);
                return t;
            };
            __egretProto__.refreshGroup_i = function () {
                var t = new egret.gui.Group();
                this.refreshGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [33, 120, 194, 14]);
                t.elementsContent = [this.refreshBtn_i(), this.refreshLbl_i(), this.__8_i(), this.costLbl_i()];
                return t;
            };
            __egretProto__.refreshLbl_i = function () {
                var t = new egret.gui.Label();
                this.refreshLbl = t;
                this.__s(t, ["size", "text", "verticalAlign", "verticalCenter", "x"], [18, "刷新", "middle", 0, 7]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            DailyTaskLayerSkin._skinParts = ["btnBack", "refreshBtn", "refreshLbl", "costLbl", "refreshGroup", "list"];
            return DailyTaskLayerSkin;
        })(egret.gui.Skin);
        dialog.DailyTaskLayerSkin = DailyTaskLayerSkin;
        DailyTaskLayerSkin.prototype.__class__ = "skins.dialog.DailyTaskLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
