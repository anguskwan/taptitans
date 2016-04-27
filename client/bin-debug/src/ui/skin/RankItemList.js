var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var RankItemList = (function (_super) {
        __extends(RankItemList, _super);
        function RankItemList() {
            _super.call(this);
            this.skinName = skins.components.RankItemListSkin;
        }
        var __egretProto__ = RankItemList.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setCurrText();
            this.setRankImg();
            this.setIconImg();
            this.setHighestStageText();
            this.setMySelf();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.value.name || "英雄";
        };
        __egretProto__.setCurrText = function () {
            this.currLbl.text = _.sprintf("当前关卡：%d     神器数：%d", this.data.value.stage || 0, this.data.value.artifacts || 0);
        };
        __egretProto__.setRankImg = function () {
            var typeList = this.data.typeList;
            var rank = this.data.value.rank;
            rank = typeList == "world" ? rank + 1 : rank;
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
        __egretProto__.setHighestStageText = function () {
            this.lvLbl.text = _.sprintf("历史最高关卡：%d", this.data.value.score || 0);
        };
        __egretProto__.setMySelf = function () {
            this.selfLbl.visible = this.data.value.isSelf;
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return RankItemList;
    })(egret.gui.ItemRenderer);
    uiskins.RankItemList = RankItemList;
    RankItemList.prototype.__class__ = "uiskins.RankItemList";
})(uiskins || (uiskins = {}));
