var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var PetPKLayerSkin = (function (_super) {
            __extends(PetPKLayerSkin, _super);
            function PetPKLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PetPKLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PetPKLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["pet_blood_right_progressImg", 320, 66]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["pet_pk_green_btn", 176, 604]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                t.setStyle("textColor", 0x0A0101);
                this.__s(t, ["height", "source", "width", "x", "y"], [20, "pet_question_in_9img", 84, 195, 661]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                t.elementsContent = [this.__3_i(), this.groupUser_i(), this.groupPet1_i(), this.groupPet2_i(), this.__5_i(), this.label_player2_name0_i(), this.__6_i(), this.label_player2_pet0_i()];
                return t;
            };
            __egretProto__.groupPet1_i = function () {
                var t = new egret.gui.Group();
                this.groupPet1 = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [200, -117, 40, 200]);
                return t;
            };
            __egretProto__.groupPet2_i = function () {
                var t = new egret.gui.Group();
                this.groupPet2 = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [200, 117, 39, 200]);
                return t;
            };
            __egretProto__.groupUser_i = function () {
                var t = new egret.gui.Group();
                this.groupUser = t;
                this.__s(t, ["height", "horizontalCenter", "top", "width", "x"], [132, 1, -2, 480, 10]);
                t.elementsContent = [this.icon_player1_i(), this.icon_player2_i(), this.label_player1_name_i(), this.label_player1_pet_i(), this.label_player2_pet_i(), this.label_player2_name_i(), this.progr_i(), this.__4_i()];
                return t;
            };
            __egretProto__.icon_player1_i = function () {
                var t = new egret.gui.UIAsset();
                this.icon_player1 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [52, "pet_question_out_9img", 50, 6, 6]);
                return t;
            };
            __egretProto__.icon_player2_i = function () {
                var t = new egret.gui.UIAsset();
                this.icon_player2 = t;
                this.__s(t, ["height", "source", "width", "x", "y"], [52, "pet_question_out_9img", 50, 422, 6]);
                return t;
            };
            __egretProto__.label_player1_name_i = function () {
                var t = new egret.gui.Label();
                this.label_player1_name = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "x", "y"], ["黑体", 20, "玩家名字1", "left", 68, 4]);
                return t;
            };
            __egretProto__.label_player1_pet_i = function () {
                var t = new egret.gui.Label();
                this.label_player1_pet = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "x", "y"], ["黑体", 15, "Lv.34 皮卡丘", "left", 69, 39]);
                return t;
            };
            __egretProto__.label_player2_name0_i = function () {
                var t = new egret.gui.Label();
                this.label_player2_name0 = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "touchEnabled", "x", "y"], ["黑体", 21, "快速战斗", "right", false, 192, 618]);
                return t;
            };
            __egretProto__.label_player2_name_i = function () {
                var t = new egret.gui.Label();
                this.label_player2_name = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "x", "y"], ["黑体", 20, "玩家名字1", "right", 312, 4]);
                return t;
            };
            __egretProto__.label_player2_pet0_i = function () {
                var t = new egret.gui.Label();
                this.label_player2_pet0 = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "x", "y"], ["黑体", 15, "V3可用", "left", 216, 662]);
                return t;
            };
            __egretProto__.label_player2_pet_i = function () {
                var t = new egret.gui.Label();
                this.label_player2_pet = t;
                this.__s(t, ["fontFamily", "size", "text", "textAlign", "x", "y"], ["黑体", 15, "Lv.34 皮卡丘", "left", 316, 39]);
                return t;
            };
            __egretProto__.progr_i = function () {
                var t = new egret.gui.UIAsset();
                this.progr = t;
                this.__s(t, ["source", "x", "y"], ["pet_blood_left_progressImg", 3, 65]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["pet_pk_top_img", 0, 0]);
                return t;
            };
            PetPKLayerSkin._skinParts = ["icon_player1", "icon_player2", "label_player1_name", "label_player1_pet", "label_player2_pet", "label_player2_name", "progr", "groupUser", "groupPet1", "groupPet2", "label_player2_name0", "label_player2_pet0"];
            return PetPKLayerSkin;
        })(egret.gui.Skin);
        dialog.PetPKLayerSkin = PetPKLayerSkin;
        PetPKLayerSkin.prototype.__class__ = "skins.dialog.PetPKLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
