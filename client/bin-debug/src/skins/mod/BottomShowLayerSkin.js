var skins;
(function (skins) {
    var mod;
    (function (mod) {
        var BottomShowLayerSkin = (function (_super) {
            __extends(BottomShowLayerSkin, _super);
            function BottomShowLayerSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [198, 480]);
                this.elementsContent = [this.__7_i(), this.groupTipsLabel_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BottomShowLayerSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BottomShowLayerSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "italic", "size", "text", "verticalCenter"], [true, "Arial", -169, true, 14, "目前 DPS", 62]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "italic", "right", "size", "text", "verticalCenter", "y"], [true, "Arial", true, 24, 14, "点击攻击力", 31, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["bold", "fontFamily", "italic", "right", "size", "text", "verticalCenter", "y"], [true, "Arial", true, 30, 14, "英雄DPS", 64, 20]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                t.setStyle("size", 30);
                this.__s(t, ["height", "horizontalCenter", "verticalCenter"], [84, 0, -25]);
                t.elementsContent = [this.__3_i(), this.currDps_i(), this.tapDamage_i(), this.heroDps_i(), this.curRelic_i(), this.curCrystal_i(), this.curDiamond_i(), this.__4_i(), this.__5_i(), this.__6_i()];
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [29, egret.gui.getScale9Grid("7,2,17,12"), "attack_buff_label", 250, -9, 5]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Label();
                this.__s(t, ["fontFamily", "left", "size", "text", "verticalCenter"], ["Arial", 16, 10, "攻击力提升100%剩余时间:", 1]);
                return t;
            };
            __egretProto__.curCrystal_i = function () {
                var t = new egret.gui.Label();
                this.curCrystal = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 213, 17, "1111", "left", "middle", 96.5]);
                return t;
            };
            __egretProto__.curDiamond_i = function () {
                var t = new egret.gui.Label();
                this.curDiamond = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 333, 17, "1111111", "center", "middle", 96.5]);
                return t;
            };
            __egretProto__.curRelic_i = function () {
                var t = new egret.gui.Label();
                this.curRelic = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 44, 17, "1111", "left", "middle", 96.5]);
                return t;
            };
            __egretProto__.currDps_i = function () {
                var t = new egret.gui.Label();
                this.currDps = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 25, 24, "1111", "left", "middle", 37.5]);
                return t;
            };
            __egretProto__.groupTipsLabel_i = function () {
                var t = new egret.gui.Group();
                this.groupTipsLabel = t;
                this.__s(t, ["height", "width", "x", "y"], [38, 253, 112, 6]);
                t.elementsContent = [this.__8_i(), this.__9_i(), this.lbl_remainTime_i()];
                return t;
            };
            __egretProto__.heroDps_i = function () {
                var t = new egret.gui.Label();
                this.heroDps = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 238, 24, "1111", "left", "middle", 62.5]);
                return t;
            };
            __egretProto__.lbl_remainTime_i = function () {
                var t = new egret.gui.Label();
                this.lbl_remainTime = t;
                this.__s(t, ["fontFamily", "left", "size", "text", "verticalCenter", "x", "y"], ["Arial", 173, 10, "22:22:22", 1, 10, 10]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["fillMode", "height", "horizontalCenter", "scaleX", "source", "verticalCenter", "width"], ["scale", 93, -5, 1, "dps_info_bg", 66.5, 436]);
                return t;
            };
            __egretProto__.tapDamage_i = function () {
                var t = new egret.gui.Label();
                this.tapDamage = t;
                this.__s(t, ["bold", "fontFamily", "italic", "left", "size", "text", "textAlign", "verticalAlign", "verticalCenter"], [true, "Arial", true, 244, 24, "1111", "left", "middle", 30.5]);
                return t;
            };
            BottomShowLayerSkin._skinParts = ["currDps", "tapDamage", "heroDps", "curRelic", "curCrystal", "curDiamond", "lbl_remainTime", "groupTipsLabel"];
            return BottomShowLayerSkin;
        })(egret.gui.Skin);
        mod.BottomShowLayerSkin = BottomShowLayerSkin;
        BottomShowLayerSkin.prototype.__class__ = "skins.mod.BottomShowLayerSkin";
    })(mod = skins.mod || (skins.mod = {}));
})(skins || (skins = {}));
