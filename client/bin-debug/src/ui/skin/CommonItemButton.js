var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var CommonItemButton = (function (_super) {
        __extends(CommonItemButton, _super);
        function CommonItemButton(upSkinName, downSkinName, disabledSkinName, data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.CommonItemButtonSkin;
            this._upSkinName = upSkinName;
            this._downSkinName = downSkinName;
            this._disabledSkinName = disabledSkinName;
        }
        var __egretProto__ = CommonItemButton.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.x = this.x + this.width / 2;
            this.y = this.y + this.height / 2;
        };
        __egretProto__.clickHandler = function (event) {
            _super.prototype.clickHandler.call(this, event);
            this.scaleX = 1;
            this.scaleY = 1;
            egret.Tween.removeTweens(this);
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        };
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
            if (this.value.type == consts.kItemButtonTypeDefault) {
                this.iconLbl.text = this.value.cost.toString();
                this.upgradeLbl.text = this.value.upgrade;
                this.textLbl.text = this.value.text;
                this.iconImg.source = this.value.iconSource;
                if (!_.isUndefined(this.value.fontSize)) {
                    if (this.value.fontSize) {
                        this.textLbl.size = this.value.fontSize;
                    }
                }
                if (!_.isUndefined(this.value.isShowIcon)) {
                    if (this.value.isShowIcon) {
                        this.iconGroup.visible = false;
                        this.iconCostLbl.visible = true;
                        this.iconCostLbl.text = this.value.cost.toString();
                    }
                    else {
                        this.iconGroup.visible = true;
                        this.iconCostLbl.visible = false;
                    }
                }
                if (!_.isUndefined(this.value.isShowTimes)) {
                    if (this.value.isShowTimes) {
                        this.iconGroup.visible = false;
                        this.iconCostLbl.visible = true;
                        this.iconCostLbl.text = this.value.cost.toString();
                    }
                    else {
                        this.iconGroup.visible = true;
                        this.iconCostLbl.visible = false;
                    }
                }
            }
            if (this.value.type == consts.kItemButtonTypePrestige) {
                this.iconGroup.visible = false;
                this.textLbl.text = this.value.text;
            }
            if (this.value.type == consts.kItemButtonTypeWeapon) {
                this.iconGroup.visible = false;
                this.textLbl.text = this.value.text;
                this.textLbl.size = 18;
            }
            this.upSkinName = this.value.btnSource;
            this.downSkinName = this.value.btnSource;
            this.disabledSkinName = this.value.btnSource;
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
        return CommonItemButton;
    })(egret.gui.Button);
    uiskins.CommonItemButton = CommonItemButton;
    CommonItemButton.prototype.__class__ = "uiskins.CommonItemButton";
})(uiskins || (uiskins = {}));
