var skins;
(function (skins) {
    var GameUISkin = (function (_super) {
        __extends(GameUISkin, _super);
        function GameUISkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [756, 480]);
            this.elementsContent = [this.topLy_i(), this.leftBtnLy_i(), this.rightBtnLy_i(), this.bottomLy_i(), this.handImg_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = GameUISkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return GameUISkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.handImg_i = function () {
            var t = new egret.gui.UIAsset();
            this.handImg = t;
            this.__s(t, ["source", "x", "y"], ["icon_hand", 244, 253]);
            return t;
        };
        __egretProto__.leftBtnLy_i = function () {
            var t = new LeftBtnLayer();
            this.leftBtnLy = t;
            this.__s(t, ["height", "left", "skinName", "verticalCenter"], [622, 1, skins.mod.LeftBtnLayerSkin, -51]);
            return t;
        };
        __egretProto__.rightBtnLy_i = function () {
            var t = new RightBtnLayer();
            this.rightBtnLy = t;
            this.__s(t, ["right", "skinName", "top"], [8, skins.mod.RightBtnLayerSkin, 144]);
            return t;
        };
        __egretProto__.bottomLy_i = function () {
            var t = new BottomLayer();
            this.bottomLy = t;
            this.__s(t, ["bottom", "horizontalCenter", "skinName"], [0, 0, skins.mod.BottomLayerSkin]);
            return t;
        };
        __egretProto__.topLy_i = function () {
            var t = new TopLayer();
            this.topLy = t;
            this.__s(t, ["horizontalCenter", "skinName", "top"], [0, skins.mod.TopLayerSkin, 0]);
            return t;
        };
        GameUISkin._skinParts = ["topLy", "leftBtnLy", "rightBtnLy", "bottomLy", "handImg"];
        return GameUISkin;
    })(egret.gui.Skin);
    skins.GameUISkin = GameUISkin;
    GameUISkin.prototype.__class__ = "skins.GameUISkin";
})(skins || (skins = {}));
