var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var SettingItemSelect = (function (_super) {
        __extends(SettingItemSelect, _super);
        function SettingItemSelect(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.SettingItemSelectSkin;
        }
        var __egretProto__ = SettingItemSelect.prototype;
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
            this.iconImg.visible = this.value.isSelect;
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
        return SettingItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.SettingItemSelect = SettingItemSelect;
    SettingItemSelect.prototype.__class__ = "uiskins.SettingItemSelect";
})(uiskins || (uiskins = {}));
