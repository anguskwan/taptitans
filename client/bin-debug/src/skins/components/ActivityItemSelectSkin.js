var skins;
(function (skins) {
    var components;
    (function (components) {
        var ActivityItemSelectSkin = (function (_super) {
            __extends(ActivityItemSelectSkin, _super);
            function ActivityItemSelectSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [90, 80]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ActivityItemSelectSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ActivityItemSelectSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconImg_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconImg = t;
                this.__s(t, ["height", "horizontalCenter", "source", "verticalCenter", "width"], [58, 0, "activity_btn_newbag", -10, 58]);
                return t;
            };
            __egretProto__.nameLbl_i = function () {
                var t = new egret.gui.Label();
                this.nameLbl = t;
                this.__s(t, ["bold", "fontFamily", "horizontalCenter", "size", "text", "textAlign", "verticalAlign", "y"], [true, "Arial", 0, 16, "名字", "center", "middle", 70]);
                return t;
            };
            __egretProto__.selectRect_i = function () {
                var t = new egret.gui.Rect();
                this.selectRect = t;
                this.__s(t, ["fillColor", "percentHeight", "horizontalCenter", "touchEnabled", "verticalCenter", "percentWidth"], [0x434F67, 100, 0, false, 0, 100]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["percentHeight", "horizontalCenter", "touchChildren", "touchEnabled", "verticalCenter", "percentWidth"], [100, 0, false, false, 0, 100]);
                t.elementsContent = [this.selectRect_i(), this.iconImg_i(), this.nameLbl_i()];
                return t;
            };
            ActivityItemSelectSkin._skinParts = ["selectRect", "iconImg", "nameLbl"];
            return ActivityItemSelectSkin;
        })(egret.gui.Skin);
        components.ActivityItemSelectSkin = ActivityItemSelectSkin;
        ActivityItemSelectSkin.prototype.__class__ = "skins.components.ActivityItemSelectSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
