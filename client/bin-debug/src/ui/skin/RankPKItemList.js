var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankPKItemList = (function (_super) {
        __extends(RankPKItemList, _super);
        function RankPKItemList(data) {
            _super.call(this);
            this.value = data;
            this.skinName = skins.components.RankPKItemListSkin;
        }
        var __egretProto__ = RankPKItemList.prototype;
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
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setAttText();
            this.setRankImg();
            this.setIconImg();
            this.setMySelf();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.value.name || "英雄";
        };
        __egretProto__.setRankImg = function () {
            var rank = this.data.value.rank + 1;
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
            var avatar = this.data.value.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setAttText = function () {
            this.attLbl.text = Util.formatNumber(this.data.value.score || 0);
        };
        __egretProto__.setMySelf = function () {
            this.selfLbl.visible = this.data.value.self;
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return RankPKItemList;
    })(egret.gui.ItemRenderer);
    uiskins.RankPKItemList = RankPKItemList;
    RankPKItemList.prototype.__class__ = "uiskins.RankPKItemList";
})(uiskins || (uiskins = {}));
