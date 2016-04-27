var skins;
(function (skins) {
    var dialog;
    (function (dialog) {
        var ShareLayerSkin = (function (_super) {
            __extends(ShareLayerSkin, _super);
            function ShareLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [756, 480]);
                this.elementsContent = [this.__9_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ShareLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ShareLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source"], [180, egret.gui.getScale9Grid("55,53,337,324"), "dialog_popup"]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "height", "width", "x", "y"], [0x2C2930, 80, 394, 28, 66]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scaleX", "scaleY", "source", "x", "y"], [2, 2, "diamond", 370, 10]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["size", "text", "x", "y"], [18, "分享好友", 29, 18]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["height", "horizontalCenter", "verticalCenter"], [180, 0, 0]);
                t.elementsContent = [this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.lblDesc_i(), this.groupTest_i()];
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__3_i(), this.handImg_i(), this.__8_i()];
                return t;
            };
            __egretProto__.groupTest_i = function () {
                var t = new egret.gui.Group();
                this.groupTest = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [0, 0.5, 10, 0]);
                return t;
            };
            __egretProto__.handImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.handImg = t;
                this.__s(t, ["rotation", "source", "x", "y"], [135, "icon_hand", 490, 40]);
                return t;
            };
            __egretProto__.lblDesc_i = function () {
                var t = new egret.gui.Label();
                this.lblDesc = t;
                this.__s(t, ["fontFamily", "size", "text", "width", "x", "y"], ["Arial", 14, "每天分享朋友圈奖励100钻石，点击右上角的按钮，召唤你的小伙伴吧。", 360, 35, 78]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["bottom", "fillAlpha", "fillColor", "percentHeight", "horizontalCenter", "percentWidth", "x", "y"], [0, 0.5, 0x000000, 100, 0, 100, 10, 10]);
                return t;
            };
            ShareLayerSkin._skinParts = ["handImg", "lblDesc", "groupTest"];
            return ShareLayerSkin;
        })(egret.gui.Skin);
        dialog.ShareLayerSkin = ShareLayerSkin;
        ShareLayerSkin.prototype.__class__ = "skins.dialog.ShareLayerSkin";
    })(dialog = skins.dialog || (skins.dialog = {}));
})(skins || (skins = {}));
