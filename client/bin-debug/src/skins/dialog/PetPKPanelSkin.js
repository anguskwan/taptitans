var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PetPKPanelSkin = (function (_super) {
            __extends(PetPKPanelSkin, _super);
            function PetPKPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [564, 390]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PetPKPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PetPKPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "source", "width", "x", "y"], [270, "pet_question_in_9img", 327, 30, 59]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["text", "x", "y"], ["附近敌人", 137, 12]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "x", "y"], ["黑体", 20, "获得奖励：", 59, 335]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["黑体", 60, 15, "系统每天刷新玩家匹配，前三次之后每10分钟刷新一位新对手", "center", 0xB1AAAA, 283, 56, 237]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "touchEnabled", "x", "y"], ["黑体", 25, "攻击！", "center", false, 163, 408]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "width", "x", "y"], [420, 390, 1, 3]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.buttonQuestion_i(), this.__5_i(), this.__6_i(), this.labelCoin_i(), this.groupPlayerIcon_i(), this.labelUserName_i(), this.labelPetInfo_i(), this.__7_i(), this.containerPet_i(), this.closeBtn_i(), this.attackBtnImg_i(), this.__8_i()];
                return t;
            };
            __egretProto__.attackBtnImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.attackBtnImg = t;
                this.__s(t, ["source", "x", "y"], ["pet_red_btn", 109, 392]);
                return t;
            };
            __egretProto__.buttonQuestion_i = function () {
                var t = new egret.gui.Button();
                this.buttonQuestion = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [32, new egret.gui.ButtonSkin("pet_question_btn"), 22, 20, 19]);
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["right", "skinName", "top", "x", "y"], [18, new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 14, 30, 30]);
                return t;
            };
            __egretProto__.containerPet_i = function () {
                var t = new egret.gui.SkinnableContainer();
                this.containerPet = t;
                this.__s(t, ["height", "width", "x", "y"], [112, 111, 136, 125]);
                return t;
            };
            __egretProto__.groupPlayerIcon_i = function () {
                var t = new egret.gui.Group();
                this.groupPlayerIcon = t;
                this.__s(t, ["height", "width", "x", "y"], [30, 33, 113, 72]);
                return t;
            };
            __egretProto__.labelCoin_i = function () {
                var t = new egret.gui.Label();
                this.labelCoin = t;
                this.__s(t, ["size", "text", "x", "y"], [20, "5.000", 179, 333]);
                return t;
            };
            __egretProto__.labelPetInfo_i = function () {
                var t = new egret.gui.Label();
                this.labelPetInfo = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["黑体", 20, "lv.25 宠物名字", "center", 0xE7C51C, 198, 98, 102]);
                return t;
            };
            __egretProto__.labelUserName_i = function () {
                var t = new egret.gui.Label();
                this.labelUserName = t;
                this.__s(t, ["fontFamily", "size", "text", "textColor", "x", "y"], ["黑体", 20, "玩家名字", 0xE7C51C, 157, 72]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [495, egret.gui.getScale9Grid("19,15,38,34"), "pet_question_out_9img", 389, 1, 2]);
                return t;
            };
            PetPKPanelSkin._skinParts = ["buttonQuestion", "labelCoin", "groupPlayerIcon", "labelUserName", "labelPetInfo", "containerPet", "closeBtn", "attackBtnImg"];
            return PetPKPanelSkin;
        })(egret.gui.Skin);
        dialog.PetPKPanelSkin = PetPKPanelSkin;
        PetPKPanelSkin.prototype.__class__ = "skins.dialog.PetPKPanelSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
