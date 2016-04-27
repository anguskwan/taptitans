var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var DailyTaskItemList = (function (_super) {
        __extends(DailyTaskItemList, _super);
        function DailyTaskItemList() {
            _super.call(this);
            this.skinName = skins.components.DailyTaskItemListSkin;
        }
        var __egretProto__ = DailyTaskItemList.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            gm.registerMessage(consts.kMessageGainDailyTask, this.refreshData, this);
        };
        __egretProto__.refreshData = function () {
            console.log("Refresh Daily task item list");
            this.dataChanged();
        };
        __egretProto__.onTouchLayer = function (event) {
            gm.dataManage.gainDailyTaskReward(this.data["id"]);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //console.log("daily task item data:");
            //console.log(this.data);
            this.config = Conf.dailyTask[this.data["id"]];
            //console.log("daily task item config:");
            //console.log(this.config);
            this.dailyData = gm.dataManage.data.dailyTask;
            //console.log("dailyData:");
            //console.log(this.dailyData);
            this.setTitleText();
            this.setIconImg();
            this.setCountLbl();
            this.setRewardBtn();
            this.setRewardGainedStatus();
        };
        __egretProto__.setRewardGainedStatus = function () {
            if (gm.dataManage.isDailyTaskRewardGained(this.data.id)) {
                this.gainedImg.visible = true;
                this.btnItem.visible = false;
            }
            else {
                this.gainedImg.visible = false;
                this.btnItem.visible = true;
            }
        };
        __egretProto__.setRewardBtn = function () {
            this.setRewardType();
            this.setRewardBtnImg();
            this.setRewardLabel();
            this.setRewardBtnStatus();
        };
        __egretProto__.setRewardType = function () {
            this.rewardType = "diamond";
            if (this.config["gold"] > 0) {
                this.rewardType = "coin";
            }
            else if (this.config["crystal"] > 0) {
                this.rewardType = "crystal";
            }
            else if (this.config["relic"] > 0) {
                console.log("current reward type: " + this.rewardType + ", config" + this.config);
                this.rewardType = "relic";
            }
            else if (this.config["fragment"] > 0) {
                this.rewardType = "fragment";
            }
            console.log("current reward type: " + this.rewardType + "," + this.config["diamond"] + "," + this.config["gold"] + "," + this.config["crystal"] + "," + this.config["relic"] + "," + this.config["fragment"] + this.config);
        };
        __egretProto__.setTitleText = function () {
            this.titleLbl.text = this.getTitle();
        };
        __egretProto__.getTitle = function () {
            var desc = this.config["title"].replace("%d", "%s");
            return _.sprintf(desc, Util.formatNumber(this.config["target"]));
        };
        __egretProto__.setRewardBtnImg = function () {
            this.btnItem.iconImg.source = this.rewardType;
        };
        __egretProto__.setRewardLabel = function () {
            if (this.rewardType == "coin") {
                this.btnItem.iconLbl.text = Util.formatNumber(gm.dataManage.getDailyTaskGoldReward(this.data.id));
                return;
            }
            if (this.rewardType == "relic") {
                this.btnItem.iconLbl.text = Util.formatNumber(gm.dataManage.getDailyTaskRelicReward(this.data.id));
                return;
            }
            this.btnItem.iconLbl.text = this.config[this.rewardType];
        };
        __egretProto__.setIconImg = function () {
            var iconIndex = this.data.id - 1;
            iconIndex = iconIndex % constsLocal.kDailyTaskTypeCount + 1;
            this.iconImg.source = "iconItem_json.dailyTask" + iconIndex;
        };
        __egretProto__.setCountLbl = function () {
            this.countLbl.text = _.sprintf("%s/%s", Util.formatNumber(this.getCurrentCount()), Util.formatNumber(this.getTargetCount()));
        };
        __egretProto__.getCurrentCount = function () {
            return this.dailyData[this.config["name"]];
        };
        __egretProto__.getTargetCount = function () {
            return this.config["target"];
        };
        __egretProto__.setRewardBtnStatus = function () {
            if (gm.dataManage.isDailyTaskRewardAvailable(this.data.id)) {
                this.btnItem.enabled = true;
                this.btnItem.setBtnSkinName("btn_orange");
                this.btnItem.textLbl.text = "领取";
                return;
            }
            this.btnItem.enabled = false;
            this.btnItem.setBtnSkinName("btn_disabled");
            this.btnItem.textLbl.text = "奖励";
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return DailyTaskItemList;
    })(egret.gui.ItemRenderer);
    uiskins.DailyTaskItemList = DailyTaskItemList;
    DailyTaskItemList.prototype.__class__ = "uiskins.DailyTaskItemList";
})(uiskins || (uiskins = {}));
