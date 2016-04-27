/**
 *
 * @author
 *
 */
var AchievementLayer = (function (_super) {
    __extends(AchievementLayer, _super);
    function AchievementLayer() {
        _super.call(this);
        this.skinName = skins.dialog.AchievementLayerSkin;
    }
    var __egretProto__ = AchievementLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.refreshDiamondLabel, this);
        gm.registerMessage(consts.kMessageGetAchievement, this.updateListStatus, this);
        this.achievementData = [];
        this._achievementItemList = new egret.gui.ClassFactory(uiskins.AchievementItemList);
        this.initAchievementList();
        this.refreshDiamondLabel();
    };
    __egretProto__.refreshDiamondLabel = function () {
        this.diamondLbl.text = Util.formatNumber(gm.dataManage.data.diamond);
    };
    __egretProto__.updateListStatus = function () {
        _.each(this.achievementCollection.source, function (v) {
            this.achievementCollection.itemUpdated(v);
        }.bind(this));
    };
    __egretProto__.initAchievementList = function () {
        _.each(Conf.achievements, function (v) {
            this.achievementData.push(v);
        }.bind(this));
        var collection = this.achievementCollection = new egret.gui.ArrayCollection(this.achievementData);
        this.achievementList.dataProvider = collection;
        this.achievementList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        return this._achievementItemList;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            gm.removeMessage(consts.kMessageMoneyUpdate, this.refreshDiamondLabel, this);
            gm.removeMessage(consts.kMessageGetAchievement, this.updateListStatus, this);
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.isTouchUpgradeBtn = function (currBtn, touchBtn) {
        return (currBtn == touchBtn);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return AchievementLayer;
})(egret.gui.SkinnableComponent);
AchievementLayer.prototype.__class__ = "AchievementLayer";
