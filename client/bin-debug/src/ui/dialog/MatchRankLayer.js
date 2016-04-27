/**
 *
 * @author
 *
 */
var MatchRankLayer = (function (_super) {
    __extends(MatchRankLayer, _super);
    function MatchRankLayer(isFinish) {
        _super.call(this);
        this.kRankTag = 1;
        this.kDiamondTag = 2;
        this.kWeaponTag = 3;
        this.kDiamondNumTag = 1;
        this.kWeaponNumTag = 1;
        this.isFinish = isFinish;
        this.skinName = skins.dialog.MatchRankLayerSkin;
    }
    var __egretProto__ = MatchRankLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        gm.registerMessage(consts.kMessageContestTimeFinish, this.onContestTimeFinish, this);
        gm.gameUI.showLoadingLayer();
        this.initIsFinishStatus();
        this.matchInitList();
    };
    __egretProto__.onContestTimeFinish = function () {
        this.isFinish = true;
        this.initIsFinishStatus();
    };
    __egretProto__.initIsFinishStatus = function () {
        if (this.isFinish) {
            this.timeLbl.visible = false;
            this.titleLbl1.text = "比赛结束";
            this.rightBtn.labelDisplay.text = "领取奖励";
            this.rightBtn.labelDisplay.x -= 20;
            this.titleLbl2.text = "请尽快领取你的奖励";
            this.iconImg.source = "btn_match_red";
            if (this.finishTime) {
                this.finishTime.stop();
            }
        }
        else {
            this.iconImg.source = "btn_match_on";
            this.timeLbl.visible = true;
            var time = this.finishTime = new egret.Timer(1000);
            time.addEventListener(egret.TimerEvent.TIMER, this.showRemainContestTime, this);
            time.start();
            this.showRemainContestTime();
        }
    };
    __egretProto__.showRemainContestTime = function () {
        this.timeLbl.text = _.sprintf("%s剩余时间", this.getRemainContestTime());
    };
    __egretProto__.getRemainContestTime = function () {
        var currTime = new Date();
        var contestTime = new Date(gm.dataManage.data.contestStartTime);
        var finishTime = (consts.kMatchContestFinishTime - (currTime.getTime() - contestTime.getTime())) / 1000;
        return Util.formatTime(Math.floor(finishTime), true);
    };
    __egretProto__.changeRankRewardStatus = function (rank) {
        var id = this.getCurrRankContestId(rank);
        if (id != -1) {
            if (rank == 1) {
                this.currGroup.visible = true;
                this.nextGroup.visible = false;
                this.onCurrRankReward(this.currGroup, id);
            }
            else {
                this.currGroup.visible = true;
                this.nextGroup.visible = true;
                this.onCurrRankReward(this.currGroup, id);
                this.onCurrRankReward(this.nextGroup, id - 1);
            }
        }
    };
    __egretProto__.onCurrRankReward = function (itemGroup, id) {
        var meta = Conf.contest;
        var diamondGroup = itemGroup.getElementAt(this.kDiamondTag);
        var weaponGroup = itemGroup.getElementAt(this.kWeaponTag);
        var rankLbl = itemGroup.getElementAt(this.kRankTag);
        var diamondLbl = diamondGroup.getElementAt(this.kDiamondNumTag);
        var weaponLbl = weaponGroup.getElementAt(this.kWeaponNumTag);
        rankLbl.text = this.getRangeToRank(meta[id].range);
        diamondLbl.text = _.sprintf("%d钻石", meta[id].diamond);
        weaponLbl.text = _.sprintf("%d武器升级", meta[id].weapon);
    };
    __egretProto__.getRangeToRank = function (range) {
        var min = range[0];
        var max = range[1];
        if (min == max) {
            return _.sprintf("排名%d", min);
        }
        else {
            return _.sprintf("排名%d-%d", min, max);
        }
    };
    __egretProto__.getCurrRankContestId = function (rank) {
        var meta = Conf.contest;
        for (var i = 1; i <= _.size(Conf.contest); i++) {
            var min = meta[i].range[0];
            var max = meta[i].range[1];
            if (rank >= min && rank <= max) {
                return i;
            }
        }
        return -1;
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.removeMessage(consts.kMessageContestTimeFinish, this.onContestTimeFinish, this);
            gm.guiLayer.removeElement(this);
        }
        if (target == this.rewardBtn) {
            gm.removeMessage(consts.kMessageContestTimeFinish, this.onContestTimeFinish, this);
            gm.guiLayer.removeElement(this);
            var reward = new MatchRewardLayer();
            gm.guiLayer.addElement(reward);
        }
        if (target == this.rightBtn) {
            gm.removeMessage(consts.kMessageContestTimeFinish, this.onContestTimeFinish, this);
            gm.guiLayer.removeElement(this);
            if (this.isFinish) {
                gm.dataManage.getContestReward(function (data) {
                    var weapon = data.reward.weaponItem;
                    var diamond = data.reward.diamond;
                    gm.dataManage.addMoney(diamond, "diamond");
                    if (weapon != 0) {
                        gm.dataManage.addWeaponItem(weapon);
                    }
                    //var ly = new MessageMatchRewardPanel(data.reward); // 需修改
                    //gm.guiLayer.addElement(ly);
                    var ly = new MessageGetRewardPanel("领取奖励", [
                        { type: "diamond", num: diamond },
                        { type: "weaponItem", num: weapon }
                    ]);
                    gm.guiLayer.addElement(ly);
                    gm.postMessage(consts.kMessageGetContestReward);
                }.bind(this));
            }
        }
    };
    __egretProto__.matchInitList = function () {
        var data; //
        var isAddLine = false;
        gm.network.getContestRankList(function (obj) {
            _.each(obj, function (v, i) {
                var index = i + 1;
                data = {
                    name: v.name || "测试",
                    avatar: v.avatar || "",
                    score: v.score || 0,
                    rank: v.rank + 1,
                    artifacts: v.artifacts || 0,
                    stage: v.stage || 0,
                    isSelf: v.self,
                    isHideLine: true
                };
                if (v.self) {
                    this.changeRankRewardStatus((v.rank + 1));
                }
                data.isHideLine = (_.size(obj) != index);
                if (index != v.rank + 1) {
                    if (!isAddLine) {
                        var line = new uiskins.RankLineItemList();
                        this.rankGroup.addElement(line);
                        isAddLine = true;
                    }
                    var item = new uiskins.MatchRankItemList(data);
                    this.rankGroup.addElement(item);
                }
                else {
                    var item = new uiskins.MatchRankItemList(data);
                    this.rankGroup.addElement(item);
                }
            }.bind(this));
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MatchRankLayer;
})(egret.gui.SkinnableComponent);
MatchRankLayer.prototype.__class__ = "MatchRankLayer";
var MatchHardRankLayer = (function (_super) {
    __extends(MatchHardRankLayer, _super);
    function MatchHardRankLayer(isFinish) {
        _super.call(this);
        this.kCrystalTag = 4;
        this.kCrystalNumTag = 1;
        this.isFinish = isFinish;
        this.skinName = skins.dialog.MatchHardRankLayerSkin;
    }
    var __egretProto__ = MatchHardRankLayer.prototype;
    __egretProto__.onCurrRankReward = function (itemGroup, id) {
        var meta = Conf.contestHard;
        var diamondGroup = itemGroup.getElementAt(this.kDiamondTag);
        var weaponGroup = itemGroup.getElementAt(this.kWeaponTag);
        var crystalGroup = itemGroup.getElementAt(this.kCrystalTag);
        var rankLbl = itemGroup.getElementAt(this.kRankTag);
        var diamondLbl = diamondGroup.getElementAt(this.kDiamondNumTag);
        var weaponLbl = weaponGroup.getElementAt(this.kWeaponNumTag);
        var crystalLbl = crystalGroup.getElementAt(this.kCrystalNumTag);
        rankLbl.text = this.getRangeToRank(meta[id].range);
        diamondLbl.text = _.sprintf("%d钻石", meta[id].diamond);
        weaponLbl.text = _.sprintf("%d武器升级", meta[id].weapon);
        crystalLbl.text = _.sprintf("%d水晶", meta[id].crystal);
    };
    __egretProto__.changeRankRewardStatus = function (rank) {
        var id = this.getCurrRankContestId(rank);
        if (id != -1) {
            if (rank == 1) {
                this.currGroup.visible = true;
                this.nextGroup.visible = false;
                this.onCurrRankReward(this.currGroup, id);
            }
            else {
                this.currGroup.visible = true;
                this.nextGroup.visible = true;
                this.onCurrRankReward(this.currGroup, id);
                this.onCurrRankReward(this.nextGroup, id - 1);
            }
        }
        else {
            id = _.size(Conf.contestHard);
            this.currGroup.visible = false;
            this.nextGroup.visible = true;
            this.onCurrRankReward(this.nextGroup, id);
        }
    };
    __egretProto__.getCurrRankContestId = function (rank) {
        var meta = Conf.contestHard;
        for (var i = 1; i <= _.size(Conf.contestHard); i++) {
            var min = meta[i].range[0];
            var max = meta[i].range[1];
            if (rank >= min && rank <= max) {
                return i;
            }
        }
        return -1;
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this.rewardBtn) {
            gm.guiLayer.removeElement(this);
            var reward = new MatchHardRewardLayer();
            gm.guiLayer.addElement(reward);
        }
        if (target == this.rightBtn) {
            gm.guiLayer.removeElement(this);
            if (this.isFinish) {
                gm.dataManage.getContestReward(function (data) {
                    if (data) {
                        var weapon = data.reward.weaponItem;
                        var diamond = data.reward.diamond;
                        var crystal = data.reward.crystal;
                        gm.dataManage.addMoney(diamond, "diamond");
                        gm.dataManage.addMoney(crystal, "crystal");
                        if (weapon != 0) {
                            gm.dataManage.addWeaponItem(weapon);
                        }
                        //var ly = new MessageMatchHardRewardPanel(data.reward);
                        //gm.guiLayer.addElement(ly);
                        var ly = new MessageGetRewardPanel("领取奖励", [
                            { type: "diamond", num: diamond },
                            { type: "crystal", num: crystal },
                            { type: "weaponItem", num: weapon }
                        ]);
                        gm.guiLayer.addElement(ly);
                        gm.postMessage(consts.kMessageGetContestReward);
                    }
                }.bind(this));
            }
        }
    };
    return MatchHardRankLayer;
})(MatchRankLayer);
MatchHardRankLayer.prototype.__class__ = "MatchHardRankLayer";
