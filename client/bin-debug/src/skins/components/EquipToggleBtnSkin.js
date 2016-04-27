var skins;
(function (skins) {
    var components;
    (function (components) {
        var EquipToggleBtnSkin = (function (_super) {
            __extends(EquipToggleBtnSkin, _super);
            function EquipToggleBtnSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [67, 58]);
                this.elementsContent = [];
                this.disabledAndSelectSkin_i();
                this.disabledAndSelectedEleSkin_i();
                this.downAndSelectedSkin_i();
                this.downAndSelectedEleSkin_i();
                this.upAndSelectedSkin_i();
                this.upAndSelectedEleSkin_i();
                this.disabledSkin_i();
                this.disabledEleSkin_i();
                this.downSkin_i();
                this.downEleSkin_i();
                this.upSkin_i();
                this.upEleSkin_i();
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.AddItems("upSkin", "", "last", ""),
                        new egret.gui.AddItems("upEleSkin", "", "last", "")
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.AddItems("downSkin", "", "last", ""),
                        new egret.gui.AddItems("downEleSkin", "", "last", "")
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.AddItems("disabledSkin", "", "last", ""),
                        new egret.gui.AddItems("disabledEleSkin", "", "last", "")
                    ]),
                    new egret.gui.State("upAndSelected", [
                        new egret.gui.AddItems("upAndSelectedSkin", "", "last", ""),
                        new egret.gui.AddItems("upAndSelectedEleSkin", "", "last", "")
                    ]),
                    new egret.gui.State("downAndSelected", [
                        new egret.gui.AddItems("downAndSelectedSkin", "", "last", ""),
                        new egret.gui.AddItems("downAndSelectedEleSkin", "", "last", "")
                    ]),
                    new egret.gui.State("disabledAndSelected", [
                        new egret.gui.AddItems("disabledAndSelectSkin", "", "last", ""),
                        new egret.gui.AddItems("disabledAndSelectedEleSkin", "", "last", "")
                    ])
                ];
            }
            var __egretProto__ = EquipToggleBtnSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return EquipToggleBtnSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.disabledAndSelectedEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledAndSelectedEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_on", 58]);
                return t;
            };
            __egretProto__.disabledEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_off", 58]);
                return t;
            };
            __egretProto__.disabledSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "equip_toggle_off", 0, 100]);
                return t;
            };
            __egretProto__.downAndSelectedEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downAndSelectedEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_on", 58]);
                return t;
            };
            __egretProto__.downAndSelectedSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downAndSelectedSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "equip_toggle_on", 0, 100]);
                return t;
            };
            __egretProto__.downEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_on", 58]);
                return t;
            };
            __egretProto__.downSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.downSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "equip_toggle_on", 0, 100]);
                return t;
            };
            __egretProto__.disabledAndSelectSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.disabledAndSelectSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "equip_toggle_on", 0, 100]);
                return t;
            };
            __egretProto__.upAndSelectedEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upAndSelectedEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_on", 58]);
                return t;
            };
            __egretProto__.upAndSelectedSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upAndSelectedSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth", "x", "y"], [100, 0, "equip_toggle_on", 0, 100, 10, 10]);
                return t;
            };
            __egretProto__.upEleSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upEleSkin = t;
                this.__s(t, ["height", "source", "width"], [58, "equip_weapon_off", 58]);
                return t;
            };
            __egretProto__.upSkin_i = function () {
                var t = new egret.gui.UIAsset();
                this.upSkin = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "source", "verticalCenter", "percentWidth"], [100, 0, "equip_toggle_off", 0, 100]);
                return t;
            };
            EquipToggleBtnSkin._skinParts = ["disabledAndSelectSkin", "disabledAndSelectedEleSkin", "downAndSelectedSkin", "downAndSelectedEleSkin", "upAndSelectedSkin", "upAndSelectedEleSkin", "disabledSkin", "disabledEleSkin", "downSkin", "downEleSkin", "upSkin", "upEleSkin"];
            return EquipToggleBtnSkin;
        })(egret.gui.Skin);
        components.EquipToggleBtnSkin = EquipToggleBtnSkin;
        EquipToggleBtnSkin.prototype.__class__ = "skins.components.EquipToggleBtnSkin";
    })(components = skins.components || (skins.components = {}));
})(skins || (skins = {}));
