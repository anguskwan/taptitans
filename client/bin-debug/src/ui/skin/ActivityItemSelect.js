var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityItemSelect = (function (_super) {
        __extends(ActivityItemSelect, _super);
        function ActivityItemSelect(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.ActivityItemSelectSkin;
        }
        var __egretProto__ = ActivityItemSelect.prototype;
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
            this.nameLbl.text = this.value.name;
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.changeDataItem();
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityItemSelect = ActivityItemSelect;
    ActivityItemSelect.prototype.__class__ = "uiskins.ActivityItemSelect";
})(uiskins || (uiskins = {}));
