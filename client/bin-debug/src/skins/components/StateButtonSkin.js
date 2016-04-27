var skins;
(function (skins) {
    var components;
    (function (components) {
        var StateButtonSkin = (function (_super) {
            __extends(StateButtonSkin, _super);
            function StateButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [41, 113]);
                this.elementsContent = [this.textLabel_i()];
                this.disabledSkin_i();
                this.downSkin_i();
                this.upSkin_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("upSkin", "", "before", "textLabel")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("downSkin", "", "before", "textLabel")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.AddItems("disabledSkin", "", "before", "textLabel")
                    ])
                ];
            }
            var __egretProto__ = StateButtonSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StateButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.downSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "btn_master", 0, 100]);
                return t;
            };
            __egretProto__.disabledSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "btn_master", 0, 100]);
                return t;
            };
            __egretProto__.textLabel_i = function () {
                var t = new egret.gui.Label();
                this.textLabel = t;
                this.__s(t, ["fontFamily", "horizontalCenter", "size", "verticalCenter"], ["Arial", 0, 26, 0]);
                return t;
            };
            __egretProto__.upSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "btn_master", 0, 100]);
                return t;
            };
            StateButtonSkin._skinParts = ["disabledSkin", "downSkin", "upSkin", "textLabel"];
            return StateButtonSkin;
        })(egret.gui.Skin);
        components.StateButtonSkin = StateButtonSkin;
        StateButtonSkin.prototype.__class__ = "skins.components.StateButtonSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
