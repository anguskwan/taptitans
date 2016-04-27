var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var RightBtnLayerSkin = (function (_super) {
            __extends(RightBtnLayerSkin, _super);
            function RightBtnLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [408, 62]);
                this.elementsContent = [this.diamondBtn_i(), this.diamondBtn0_i(), this.diamondBtn1_i(), this.relicBtn_i(), this.newPlayerBtn_i(), this.shareGroup_i(), this.doubleImg_i(), this.pkGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = RightBtnLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return RightBtnLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.diamondBtn0_i = function () {
                var t = new egret.gui.Button();
                this.diamondBtn0 = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_get_supdiamond", "btn_get_supdiamond", "btn_get_supdiamond"), false, 0, 2]);
                return t;
            };
            __egretProto__.diamondBtn1_i = function () {
                var t = new egret.gui.Button();
                this.diamondBtn1 = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_get_supdiamond", "btn_get_supdiamond", "btn_get_supdiamond"), false, 0, 2]);
                return t;
            };
            __egretProto__.diamondBtn_i = function () {
                var t = new egret.gui.Button();
                this.diamondBtn = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_get_diamond", "btn_get_diamond", "btn_get_diamond"), false, 0, 2]);
                return t;
            };
            __egretProto__.doubleImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.doubleImg = t;
                this.__s(t, ["source", "visible", "x", "y"], ["tip_double", false, -2, 36]);
                return t;
            };
            __egretProto__.groupPlayerIcon_i = function () {
                var t = new egret.gui.Group();
                this.groupPlayerIcon = t;
                this.__s(t, ["height", "width", "x", "y"], [67, 61, 0, 79]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [51, "pet_question_btn", 47, 9, 89]);
                return t;
            };
            __egretProto__.lblCountDown_i = function () {
                var t = new egret.gui.Label();
                this.lblCountDown = t;
                this.__s(t, ["bold", "fontFamily", "height", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "verticalCenter", "width"], [true, "Arial", 19, 0, 12, "分享领钻石", "center", "middle", 26.5, 69]);
                return t;
            };
            __egretProto__.newPlayerBtn_i = function () {
                var t = new egret.gui.Button();
                this.newPlayerBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_new_player", "btn_new_player", "btn_new_player"), 0, 34]);
                return t;
            };
            __egretProto__.pkBtn_i = function () {
                var t = new egret.gui.Button();
                this.pkBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [55, new egret.gui.ButtonSkin("pet_entry_btn"), 54, 5, 7]);
                return t;
            };
            __egretProto__.pkGroup_i = function () {
                var t = new egret.gui.Group();
                this.pkGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [174, 72, 0, 227]);
                t.elementsContent = [this.pkBtn_i(), this.pkTip_i(), this.cooldownBtn_i(), this.iconImg_i(), this.groupPlayerIcon_i()];
                return t;
            };
            __egretProto__.pkTip_i = function () {
                var t = new egret.gui.UIAsset();
                this.pkTip = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 51, 5]);
                return t;
            };
            __egretProto__.relicBtn_i = function () {
                var t = new egret.gui.Button();
                this.relicBtn = t;
                this.__s(t, ["skinName", "visible", "x", "y"], [new egret.gui.ButtonSkin("btn_daliy_relic", "btn_daliy_relic", "btn_daliy_relic"), false, -135, 2]);
                return t;
            };
            __egretProto__.shareBtn_i = function () {
                var t = new egret.gui.Button();
                this.shareBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [74, new egret.gui.ButtonSkin("sharewx", "sharewx", "sharewx"), 71, 0, 0]);
                return t;
            };
            __egretProto__.shareGroup_i = function () {
                var t = new egret.gui.Group();
                this.shareGroup = t;
                this.__s(t, ["height", "width", "x", "y"], [74, 71, -1, 120]);
                t.elementsContent = [this.shareBtn_i(), this.lblCountDown_i(), this.subscribeBtn_i(), this.shareTip_i()];
                return t;
            };
            __egretProto__.shareTip_i = function () {
                var t = new egret.gui.UIAsset();
                this.shareTip = t;
                this.__s(t, ["source", "x", "y"], ["tip_big_task", 49, -4]);
                return t;
            };
            __egretProto__.cooldownBtn_i = function () {
                var t = new egret.gui.UIAsset();
                this.cooldownBtn = t;
                this.__s(t, ["source", "x", "y"], ["pet_cooldown_img", 5, 85]);
                return t;
            };
            __egretProto__.subscribeBtn_i = function () {
                var t = new egret.gui.Button();
                this.subscribeBtn = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [74, new egret.gui.ButtonSkin("btn_share", "btn_share", "btn_share"), 71, -7, -1]);
                return t;
            };
            RightBtnLayerSkin._skinParts = ["diamondBtn", "diamondBtn0", "diamondBtn1", "relicBtn", "newPlayerBtn", "shareBtn", "lblCountDown", "subscribeBtn", "shareTip", "shareGroup", "doubleImg", "pkBtn", "pkTip", "cooldownBtn", "iconImg", "groupPlayerIcon", "pkGroup"];
            return RightBtnLayerSkin;
        })(egret.gui.Skin);
        mod.RightBtnLayerSkin = RightBtnLayerSkin;
        RightBtnLayerSkin.prototype.__class__ = "skins.mod.RightBtnLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
