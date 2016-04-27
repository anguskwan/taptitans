var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var AchievementItemList = (function (_super) {
        __extends(AchievementItemList, _super);
        function AchievementItemList() {
            _super.call(this);
            this.skinName = skins.components.AchievementItemListSkin;
        }
        var __egretProto__ = AchievementItemList.prototype;
        __egretProto__.getName = function () {
            var mate = Conf.achievements[this.data.id];
            var desc = mate.name.replace("%d", "%s");
            return _.sprintf(desc, Util.formatNumber(mate["star" + this.getCurrStars()]));
        };
        __egretProto__.getCurrAchieveNum = function () {
            return gm.dataManage.data.achievements[this.data.id].value;
        };
        __egretProto__.getMaxAchieveNum = function () {
            var mate = Conf.achievements[this.data.id];
            return mate["star" + this.getCurrStars()];
        };
        __egretProto__.getCurrStars = function () {
            var stars = gm.dataManage.data.achievements[this.data.id].stars;
            var currStars = stars + 1;
            currStars = currStars > 5 ? 5 : currStars;
            return currStars;
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            gm.dataManage.gainAchievementReward(this.data.id);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setIconImg();
            this.setStartImg();
            this.setAchieveText();
            this.setBtnIconImg();
            this.setBtnText();
            this.setBtnCost();
            this.getBtnSource();
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.getName();
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "achievement" + this.data.id;
        };
        __egretProto__.setStartImg = function () {
            var starNum = gm.dataManage.data.achievements[this.data.id].stars;
            for (var i = 1; i <= 5; i++) {
                this["starImg" + i].visible = (i <= starNum);
            }
        };
        __egretProto__.setAchieveText = function () {
            this.achieveLbl.text = _.sprintf("%s/%s", Util.formatNumber(this.getCurrAchieveNum()), Util.formatNumber(this.getMaxAchieveNum()));
        };
        __egretProto__.setBtnIconImg = function () {
            this.btnItem.iconImg.source = "diamond";
        };
        __egretProto__.setBtnText = function () {
            this.btnItem.textLbl.text = "奖励";
        };
        __egretProto__.setBtnCost = function () {
            var cost = consts.kAchievementsRewards[this.getCurrStars()];
            this.btnItem.iconLbl.text = Util.formatNumber(cost);
        };
        __egretProto__.getBtnSource = function () {
            var isReward = gm.dataManage.isAchievementRewardAvailable(this.data.id);
            var source;
            if (isReward) {
                source = "btn_orange";
            }
            else {
                source = "btn_disabled";
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return AchievementItemList;
    })(egret.gui.ItemRenderer);
    uiskins.AchievementItemList = AchievementItemList;
    AchievementItemList.prototype.__class__ = "uiskins.AchievementItemList";
})(uiskins || (uiskins = {}));
