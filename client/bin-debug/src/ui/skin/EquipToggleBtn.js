var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EquipToggleBtn = (function (_super) {
        __extends(EquipToggleBtn, _super);
        function EquipToggleBtn() {
            _super.call(this);
            this.skinName = skins.components.EquipToggleBtnSkin;
        }
        var __egretProto__ = EquipToggleBtn.prototype;
        __egretProto__.getName = function (name) {
            return this["_" + name + "SkinName"];
        };
        __egretProto__.setValue = function (value, name) {
            if (value == this["_" + name + "SkinName"])
                return;
            this["_" + name + "SkinName"] = value;
            if (this[name + "Skin"]) {
                this[name + "Skin"].source = value;
            }
        };
        Object.defineProperty(__egretProto__, "upEleSkinName", {
            //element up
            get: function () {
                return this.getName("upEle");
            },
            set: function (value) {
                this.setValue(value, "upEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downEleSkinName", {
            get: function () {
                return this.getName("downEle");
            },
            set: function (value) {
                this.setValue(value, "downEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledEleSkinName", {
            get: function () {
                return this.getName("disabledEle");
            },
            set: function (value) {
                this.setValue(value, "disabledEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "upAndSelectedEleSkinName", {
            get: function () {
                return this.getName("upAndSelectedEle");
            },
            set: function (value) {
                this.setValue(value, "upAndSelectedEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downAndSelectedEleSkinName", {
            get: function () {
                return this.getName("downAndSelectedEle");
            },
            set: function (value) {
                this.setValue(value, "downAndSelectedEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledAndSelectedEleSkinName", {
            get: function () {
                return this.getName("disabledAndSelectedEle");
            },
            set: function (value) {
                this.setValue(value, "disabledAndSelectedEle");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "upSkinName", {
            //skin
            get: function () {
                return this.getName("up");
            },
            set: function (value) {
                this.setValue(value, "up");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downSkinName", {
            get: function () {
                return this.getName("down");
            },
            set: function (value) {
                this.setValue(value, "down");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledSkinName", {
            get: function () {
                return this.getName("disabled");
            },
            set: function (value) {
                this.setValue(value, "disabled");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "upAndSelectedSkinName", {
            get: function () {
                return this.getName("upAndSelected");
            },
            set: function (value) {
                this.setValue(value, "upAndSelected");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downAndSelectedSkinName", {
            get: function () {
                return this.getName("downAndSelected");
            },
            set: function (value) {
                this.setValue(value, "downAndSelected");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledAndSelectedSkinName", {
            get: function () {
                return this.getName("disabledAndSelected");
            },
            set: function (value) {
                this.setValue(value, "disabledAndSelected");
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onSkinParAdded = function (instance) {
            if (instance == this.upSkin) {
                this.upSkin.source = this._upSkinName;
            }
            else if (instance == this.downSkin) {
                this.downSkin.source = this._downSkinName;
            }
            else if (instance == this.disabledSkin) {
                this.disabledSkin.source = this._disabledSkinName;
            }
            else if (instance == this.upAndSelectedSkin) {
                this.upAndSelectedSkin.source = this._upAndSelectedSkinName;
            }
            else if (instance == this.downAndSelectedSkin) {
                this.downAndSelectedSkin.source = this._downAndSelectedSkinName;
            }
            else if (instance == this.disabledAndSelelctedSkin) {
                this.disabledAndSelelctedSkin.source = this._disabledAndSelectedSkinName;
            }
        };
        __egretProto__.onEleSkinParAdded = function (instance) {
            if (instance == this.upEleSkin) {
                this.upEleSkin.source = this._upEleSkinName;
            }
            else if (instance == this.downEleSkin) {
                this.downEleSkin.source = this._downEleSkinName;
            }
            else if (instance == this.disabledEleSkin) {
                this.disabledEleSkin.source = this._disabledEleSkinName;
            }
            else if (instance == this.upAndSelectedEleSkin) {
                this.upAndSelectedEleSkin.source = this._upAndSelectedEleSkinName;
            }
            else if (instance == this.downAndSelectedEleSkin) {
                this.downAndSelectedEleSkin.source = this._downAndSelectedEleSkinName;
            }
            else if (instance == this.disabledAndSelelctedEleSkin) {
                this.disabledAndSelelctedEleSkin.source = this._disabledAndSelectedEleSkinName;
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            this.onSkinParAdded(instance);
            this.onEleSkinParAdded(instance);
        };
        return EquipToggleBtn;
    })(egret.gui.ToggleButton);
    uiskins.EquipToggleBtn = EquipToggleBtn;
    EquipToggleBtn.prototype.__class__ = "uiskins.EquipToggleBtn";
})(uiskins || (uiskins = {}));
