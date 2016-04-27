var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var WeaponItemSelect = (function (_super) {
        __extends(WeaponItemSelect, _super);
        function WeaponItemSelect(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.WeaponItemSelectSkin;
        }
        var __egretProto__ = WeaponItemSelect.prototype;
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
            this.selectRect.visible = this.value.isSelect;
            this.iconImg.source = this.value.iconSource;
            this.weaponLbl.text = this.value.lv;
            this.disabledRect.visible = (this.value.lv == "0");
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return WeaponItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.WeaponItemSelect = WeaponItemSelect;
    WeaponItemSelect.prototype.__class__ = "uiskins.WeaponItemSelect";
})(uiskins || (uiskins = {}));
