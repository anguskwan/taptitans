var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankLineItemList = (function (_super) {
        __extends(RankLineItemList, _super);
        function RankLineItemList() {
            _super.call(this);
            this.skinName = skins.components.RankLineItemListSkin;
        }
        var __egretProto__ = RankLineItemList.prototype;
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
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
        return RankLineItemList;
    })(egret.gui.ItemRenderer);
    uiskins.RankLineItemList = RankLineItemList;
    RankLineItemList.prototype.__class__ = "uiskins.RankLineItemList";
})(uiskins || (uiskins = {}));
