/**
 *
 * @author
 *
 */
var GuildGoldScoreLayer = (function (_super) {
    __extends(GuildGoldScoreLayer, _super);
    function GuildGoldScoreLayer(value) {
        _super.call(this);
        this.value = value;
        this.skinName = skins.dialog.GuildGoldScoreLayerSkin;
    }
    var __egretProto__ = GuildGoldScoreLayer.prototype;
    __egretProto__.isNewBie = function () {
        var id = gm.dataManage.data.id;
        var find = _.find(gm.dataManage.guild.newbie, function (v) {
            return v == id;
        }.bind(this));
        if (!_.isUndefined(find)) {
            return true;
        }
        return false;
    };
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._item = new egret.gui.ClassFactory(uiskins.GuildGoldScoreItemRenderer);
        this.listData = [];
        this.onInitData();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.rewardBtn && this.rewardBtn.enabled) {
            this.rewardBtn.enabled = false;
            gm.gameUI.showLoadingLayer();
            gm.dataManage.getZodiacReward(function (data) {
                if (_.size(data.reward) != 0) {
                    var reward = [];
                    _.each(data.reward, function (v, k) {
                        reward.push({ type: k, num: v });
                    }.bind(this));
                    var ly = new MessageGetRewardPanel("领取奖励", reward);
                    gm.guiLayer.addElement(ly);
                }
                else {
                    this.showMessageDialog();
                }
                this.rewardText.text = "已领取";
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.showMessageDialog = function () {
        var ly = new MessagePanel("很遗憾！", "你所在的公会排名靠后，没有获得奖励。");
        gm.guiLayer.addElement(ly);
    };
    __egretProto__.onInitData = function () {
        this.setGuildGroup();
        this.setTimeText();
        this.setIconImg();
        this.setScoreText();
        this.setRankStatus();
        this.addList();
        this.setRewardBtn();
        this.setRewardBtnText();
    };
    __egretProto__.setRewardBtn = function () {
        var currTime = moment().valueOf();
        var time0 = Util.getHourTime(21).valueOf();
        var time1 = Util.getHourTime(24).valueOf();
        if (currTime >= time0 && currTime <= time1) {
            this.rewardGroup.visible = true;
        }
        else {
            this.rewardGroup.visible = false;
        }
    };
    __egretProto__.setRewardBtnText = function () {
        var zodiacReward = gm.dataManage.data.dailyEvent.zodiacReward;
        if (zodiacReward) {
            this.rewardBtn.enabled = false;
            this.rewardText.text = "已领取";
        }
        else {
            this.rewardBtn.enabled = true;
            this.rewardText.text = "领取";
        }
    };
    __egretProto__.setGuildGroup = function () {
        if (this.value.data.rank == null || this.isNewBie()) {
            this.guildGroup.visible = false;
            this.guildRect.visible = false;
            this.list.bottom = 0;
        }
        else {
            this.guildGroup.visible = true;
            this.guildRect.visible = true;
            this.list.bottom = 80;
        }
    };
    __egretProto__.setTimeText = function () {
        this.timeLbl.text = moment().format("MM月DD日");
    };
    __egretProto__.setIconImg = function () {
        var name = gm.dataManage.guild.presidentName || "英雄会长";
        var data = {
            iconSource: gm.dataManage.guild.icon,
            name: name[0]
        };
        this.iconImg.dataItem = data;
        this.iconImg.changeDataItem();
    };
    __egretProto__.setScoreText = function () {
        var score = this.value.data.score || 0;
        var text = _.sprintf("<font color=0x71430d>积分：</font><font color=0xffffff>%d</font>", parseInt(score));
        Util.setStyleText(this.scoreLbl, text);
    };
    __egretProto__.setRankStatus = function () {
        var baseRank = this.value.data.rank || 0;
        var rank = baseRank + 1;
        var text = _.sprintf("<font color=0x71430d>排名：</font><font color=0xffffff>%d</font>", parseInt(rank));
        Util.setStyleText(this.rankLbl, text);
    };
    __egretProto__.addList = function () {
        _.each(this.value.list, function (v) {
            if (!v) {
                return;
            }
            this.listData.push(v);
        }.bind(this));
        var collection = this.collection = new egret.gui.ArrayCollection(this.listData);
        this.list.dataProvider = collection;
        this.list.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (item) {
        return this._item;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildGoldScoreLayer;
})(egret.gui.SkinnableComponent);
GuildGoldScoreLayer.prototype.__class__ = "GuildGoldScoreLayer";
