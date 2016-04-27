var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankInviteItemList = (function (_super) {
        __extends(RankInviteItemList, _super);
        function RankInviteItemList() {
            _super.call(this);
            this.skinName = skins.components.RankInviteItemListSkin;
        }
        var __egretProto__ = RankInviteItemList.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.btnFriend.clickHandler = this.touchBtnFriend;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
        };
        __egretProto__.touchBtnFriend = function (event) {
            var ly = new ShareLayer();
            gm.guiLayer.addElement(ly);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return RankInviteItemList;
    })(egret.gui.ItemRenderer);
    uiskins.RankInviteItemList = RankInviteItemList;
    RankInviteItemList.prototype.__class__ = "uiskins.RankInviteItemList";
})(uiskins || (uiskins = {}));
