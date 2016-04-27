var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var SkillButton = (function (_super) {
        __extends(SkillButton, _super);
        function SkillButton(upSkinName, downSkinName, disabledSkinName, data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.SkillButtonSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
        }
        var __egretProto__ = SkillButton.prototype;
        Object.defineProperty(__egretProto__, "dataItem", {
            get: function () {
                return this.value;
            },
            set: function (value) {
                this.value = value;
            },
            enumerable: true,
            configurable: true
        });
        //change data item
        __egretProto__.changeDataItem = function () {
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
        return SkillButton;
    })(egret.gui.Button);
    uiskins.SkillButton = SkillButton;
    SkillButton.prototype.__class__ = "uiskins.SkillButton";
})(uiskins || (uiskins = {}));
