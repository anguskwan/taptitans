var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var StateButton = (function (_super) {
        __extends(StateButton, _super);
        function StateButton(upSkinName, downSkinName, disabledSkinName) {
            _super.call(this);
            this.skinName = skins.components.StateButtonSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
        }
        var __egretProto__ = StateButton.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //this.anchorOffsetX = this.width/2;
            //this.anchorOffsetY = this.height/2;
            //this.x = this.x + this.width/2;
            //this.y = this.y + this.height/2;
            Util.initBtnAnchor(this);
        };
        __egretProto__.setBtnSkinName = function (source) {
            this.upSkinName = source;
            this.downSkinName = source;
            this.disabledSkinName = source;
        };
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
        };
        return StateButton;
    })(egret.gui.Button);
    uiskins.StateButton = StateButton;
    StateButton.prototype.__class__ = "uiskins.StateButton";
})(uiskins || (uiskins = {}));
