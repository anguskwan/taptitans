var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildBadgeItem = (function (_super) {
        __extends(GuildBadgeItem, _super);
        function GuildBadgeItem(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.GuildBadgeItemSkin;
        }
        var __egretProto__ = GuildBadgeItem.prototype;
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
        return GuildBadgeItem;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildBadgeItem = GuildBadgeItem;
    GuildBadgeItem.prototype.__class__ = "uiskins.GuildBadgeItem";
})(uiskins || (uiskins = {}));
