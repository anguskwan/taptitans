var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var BaseToggleBtn = (function (_super) {
        __extends(BaseToggleBtn, _super);
        function BaseToggleBtn(upSkinName, downSkinName, disabledSkinName, upAndSelectedSkinName, downAndSelectedSkinName, disabledAndSelectedSkinName) {
            _super.call(this);
            this.skinName = skins.components.SelectToggleBtnSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
            this._upAndSelectedSkinName = upAndSelectedSkinName;
            this._downAndSelectedSkinName = downAndSelectedSkinName;
            this._disabledAndSelectedSkinName = disabledAndSelectedSkinName;
        }
        var __egretProto__ = BaseToggleBtn.prototype;
        Object.defineProperty(__egretProto__, "upSkinName", {
            get: function () {
                return this._upSkinName;
            },
            set: function (value) {
                if (value == this._upSkinName)
                    return;
                this._upSkinName = value;
                if (this.upSkin) {
                    this.upSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downSkinName", {
            get: function () {
                return this._downSkinName;
            },
            set: function (value) {
                if (value == this._downSkinName)
                    return;
                this._downSkinName = value;
                if (this.downSkin) {
                    this.downSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledSkinName", {
            get: function () {
                return this._disabledSkinName;
            },
            set: function (value) {
                if (value == this._disabledSkinName)
                    return;
                this._disabledSkinName = value;
                if (this.disabledSkin) {
                    this.disabledSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "upAndSelectedSkinName", {
            get: function () {
                return this._upAndSelectedSkinName;
            },
            set: function (value) {
                if (value == this._upAndSelectedSkinName)
                    return;
                this._upAndSelectedSkinName = value;
                if (this.upAndSelectedSkin) {
                    this.upAndSelectedSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "downAndSelectedSkinName", {
            get: function () {
                return this._downAndSelectedSkinName;
            },
            set: function (value) {
                if (value == this._downAndSelectedSkinName)
                    return;
                this._downAndSelectedSkinName = value;
                if (this.downAndSelectedSkin) {
                    this.downAndSelectedSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "disabledAndSelectedSkinName", {
            get: function () {
                return this._disabledAndSelectedSkinName;
            },
            set: function (value) {
                if (value == this._disabledAndSelectedSkinName)
                    return;
                this._disabledAndSelectedSkinName = value;
                if (this.disabledAndSelelctedSkin) {
                    this.disabledAndSelelctedSkin.source = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
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
        return BaseToggleBtn;
    })(egret.gui.ToggleButton);
    uiskins.BaseToggleBtn = BaseToggleBtn;
    BaseToggleBtn.prototype.__class__ = "uiskins.BaseToggleBtn";
})(uiskins || (uiskins = {}));
