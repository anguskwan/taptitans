var skins;
(function (skins) {
    var components;
    (function (components) {
        var EveryDayItemSelectSkin = (function (_super) {
            __extends(EveryDayItemSelectSkin, _super);
            function EveryDayItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [122, 122]);
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = EveryDayItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EveryDayItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.__3_i(), this.dayRect_i(), this.dayLbl_i(), this.iconImg_i(), this.nameLbl_i(), this.getImg_i(), this.selectImg_i(), this.disabledRect_i()];
                return t;
            };
            __egretProto__.dayLbl_i = function () {
                var t = new egret.gui.Label();
                this.dayLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "x", "y"], [true, "Arial", 0, 14, "第天", "center", "middle", 10, 6]);
                return t;
            };
            __egretProto__.dayRect_i = function () {
                var t = new egret.gui.Rect();
                this.dayRect = t;
                this.__s(t, ["fillColor", "height", "width"], [0x45659C, 25, 122]);
                return t;
            };
            __egretProto__.disabledRect_i = function () {
                var t = new egret.gui.Rect();
                this.disabledRect = t;
                this.__s(t, ["fillAlpha", "fillColor", "height", "width"], [0.7, 0x000000, 122, 122]);
                return t;
            };
            __egretProto__.getImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.getImg = t;
                this.__s(t, ["source", "x", "y"], ["dialog_everyday_get", 94, 32]);
                return t;
            };
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "verticalCenter", "width"], [58, 0, 0, 58]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "textColor", "verticalAlign", "y"], [true, "Arial", 0, 14, "名称", "center", 0x858D8F, "middle", 101]);
                return t;
            };
            __egretProto__.selectImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.selectImg = t;
                t.source = "dialog_everyday_select";
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "touchEnabled", "verticalCenter", "percentWidth"], [0x3A353F, 100, 0, false, 0, 100]);
                return t;
            };
            EveryDayItemSelectSkin._skinParts = ["dayRect", "dayLbl", "iconImg", "nameLbl", "getImg", "selectImg", "disabledRect"];
            return EveryDayItemSelectSkin;
        })(egret.gui.Skin);
        components.EveryDayItemSelectSkin = EveryDayItemSelectSkin;
        EveryDayItemSelectSkin.prototype.__class__ = "skins.components.EveryDayItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
