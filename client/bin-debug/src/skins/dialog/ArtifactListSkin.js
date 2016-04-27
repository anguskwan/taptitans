var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var ArtifactListSkin = (function (_super) {
            __extends(ArtifactListSkin, _super);
            function ArtifactListSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__3_i(), this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ArtifactListSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ArtifactListSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "scale9Grid", "source", "percentWidth", "x", "y"], [100, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup", 100, 0, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 500, 400, 24, 99]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.VerticalLayout();
                this.__s(t, ["gap", "horizontalAlign"], [4, "center"]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter"], [630, 0, 0]);
                t.elementsContent = [this.__4_i(), this.titleLbl2_i(), this.titleLbl1_i(), this.__5_i(), this.halidomList_i(), this.closeBtn_i()];
                return t;
            };
            __egretProto__.closeBtn_i = function () {
                var t = new egret.gui.Button();
                this.closeBtn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("dialog_btn_cha_close", "dialog_btn_cha_close", "dialog_btn_cha_close"), 387, 28]);
                return t;
            };
            __egretProto__.halidomList_i = function () {
                var t = new egret.gui.List();
                this.halidomList = t;
                this.__s(t, ["height", "width", "x", "y"], [500, 400, 24, 99]);
                t.layout = this.__6_i();
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillAlpha", "fillColor", "percentHeight", "percentWidth", "x", "y"], [0.5, 0x000000, 100, 100, 0, 0]);
                return t;
            };
            __egretProto__.titleLbl1_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl1 = t;
                this.__s(t, ["bold", "fontFamily", "size", "text", "x", "y"], [true, "Arial", 22, "神器图鉴", 39, 24]);
                return t;
            };
            __egretProto__.titleLbl2_i = function () {
                var t = new egret.gui.Label();
                this.titleLbl2 = t;
                this.__s(t, ["bold", "fontFamily", "height", "size", "text", "width", "x", "y"], [true, "Arial", 40, 12, "查看所有神器，开启所有神器来获得最强战斗力。", 180, 39, 54]);
                return t;
            };
            ArtifactListSkin._skinParts = ["titleLbl2", "titleLbl1", "halidomList", "closeBtn"];
            return ArtifactListSkin;
        })(egret.gui.Skin);
        dialog.ArtifactListSkin = ArtifactListSkin;
        ArtifactListSkin.prototype.__class__ = "skins.dialog.ArtifactListSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
