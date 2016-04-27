var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildBadgeItemSelect = (function (_super) {
        __extends(GuildBadgeItemSelect, _super);
        function GuildBadgeItemSelect(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.GuildBadgeItemSelectSkin;
        }
        var __egretProto__ = GuildBadgeItemSelect.prototype;
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
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildBadgeItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildBadgeItemSelect = GuildBadgeItemSelect;
    GuildBadgeItemSelect.prototype.__class__ = "uiskins.GuildBadgeItemSelect";
})(uiskins || (uiskins = {}));
