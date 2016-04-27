var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EquipSmallElementItem = (function (_super) {
        __extends(EquipSmallElementItem, _super);
        function EquipSmallElementItem() {
            _super.call(this);
            this.skinName = skins.components.EquipSmallElementItemSkin;
        }
        var __egretProto__ = EquipSmallElementItem.prototype;
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
            this.setIconImg();
            this.setSelectImg();
        };
        __egretProto__.setIconImg = function () {
            var source;
            if (this.value.index == 1 && this.value.name == "wing") {
                source = "";
            }
            else {
                source = _.sprintf("equip_%s%d", this.value.name, this.value.index);
            }
            this.iconImg.source = source;
        };
        __egretProto__.setSelectImg = function () {
            this.selectImg.visible = this.value.isSelect;
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
        return EquipSmallElementItem;
    })(egret.gui.SkinnableComponent);
    uiskins.EquipSmallElementItem = EquipSmallElementItem;
    EquipSmallElementItem.prototype.__class__ = "uiskins.EquipSmallElementItem";
})(uiskins || (uiskins = {}));
