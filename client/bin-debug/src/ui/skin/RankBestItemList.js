var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankBestItemList = (function (_super) {
        __extends(RankBestItemList, _super);
        function RankBestItemList() {
            _super.call(this);
            this.skinName = skins.components.RankBestItemListSkin;
        }
        var __egretProto__ = RankBestItemList.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setCurrText();
            this.setAttText();
            this.setRankImg();
            this.setIconImg();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.name || "英雄";
        };
        __egretProto__.setCurrText = function () {
            this.currLbl.text = _.sprintf("历史最高关卡：%d   武器：%d", this.data.highestStage || 0, this.data.heroWeapons || 0);
        };
        __egretProto__.setAttText = function () {
            this.attLbl.text = Util.formatNumber(this.data.score);
        };
        __egretProto__.setRankImg = function () {
            var rank = this.data.rank + 1;
            if (rank <= 3) {
                this.numLbl.visible = false;
                this.numImg.visible = true;
                this.numImg.source = "rank_num" + rank;
            }
            else {
                this.numLbl.visible = true;
                this.numLbl.text = rank + "";
                this.numImg.visible = false;
            }
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.data.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return RankBestItemList;
    })(egret.gui.ItemRenderer);
    uiskins.RankBestItemList = RankBestItemList;
    RankBestItemList.prototype.__class__ = "uiskins.RankBestItemList";
})(uiskins || (uiskins = {}));
