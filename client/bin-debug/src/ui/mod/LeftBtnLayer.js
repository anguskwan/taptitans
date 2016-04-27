/**
 * *
 * * @author
 * *
 * */
var LeftBtnLayer = (function (_super) {
    __extends(LeftBtnLayer, _super);
    function LeftBtnLayer() {
        _super.call(this);
        this.timeoutHide = -1;
        this.matchFinishTimeOut = -2;
        this.isAvailable = false;
        this.isGetLevelUp = false;
        this.isOpenSelectBtn = false;
        //tt.Setting.isShowPKButton = true; // 删除
        this.skinName = skins.mod.LeftBtnLayerSkin;
    }
    var __egretProto__ = LeftBtnLayer.prototype;
    __egretProto__.onRegister = function () {
        gm.registerMessage(consts.kMessageKillDailyBoss, this.onSkillDailyBoss, this);
        gm.registerMessage(consts.kMessageOnBossEnter, this.changeChallengeBtnStatus, this);
        gm.registerMessage(consts.kMessageWeaponItemUpdate, this.changeWeaponBtnStatus, this);
        gm.registerMessage(consts.kMessageMatchBtnStatus, this.onMatchBtnStatus, this);
        gm.registerMessage(consts.kMessageGetContestReward, this.initMatchBtnStatus, this);
        gm.registerMessage(consts.kMessageMissionComplete, this.onMissionComplete, this);
        gm.registerMessage(consts.kMessageOpponentAtt, this.onPKTipBtnStatus, this);
        gm.registerMessage(consts.kMessagePrestige, this.onPrestige, this);
        gm.registerMessage(consts.kMessageIsShowPKBtn, this.onRefreshPkBtn, this);
        gm.registerMessage(consts.kMessageIsGetActivityGiftBag, this.onActivityBtnStatus, this);
        gm.registerMessage(consts.kMessageGainDailyTask, this.refreshDailyTaskBtnStatus, this);
        gm.registerMessage(consts.kMessageRefreshDailyTip, this.refreshDailyTaskTip, this);
        gm.registerMessage(consts.kMessageDailyNewDay, this.refreshDailyTaskBtnStatus, this);
    };
    __egretProto__.refreshDailyTaskBtnStatus = function () {
        if (gm.dataManage.isAllDailyTaskRewardGained()) {
            this.dailyTaskEnterBtn.visible = false;
            this.dailyTaskTipImg.visible = false;
            return;
        }
        this.refreshDailyTaskTip();
        this.dailyTaskEnterBtn.visible = true;
    };
    __egretProto__.refreshDailyTaskTip = function () {
        if (gm.dataManage.isAnyDailyTaskAvailable()) {
            //console.log("daily task tip is visible");
            this.dailyTaskTipImg.visible = true;
            return;
        }
        //console.log("daily task tip is not visible");
        this.dailyTaskTipImg.visible = false;
    };
    __egretProto__.onRefreshPkBtn = function () {
        this.onPKBtnStatus();
        this.onPKTipBtnStatus();
    };
    __egretProto__.onPrestige = function () {
        this.onPKBtnStatus();
        this.onPKTipBtnStatus();
    };
    __egretProto__.onPKTipBtnStatus = function () {
        if (gm.dataManage.data.stage >= 200 && tt.Setting.isShowPKButton) {
            this.pkTipImg.visible = true;
        }
        else {
            this.pkTipImg.visible = false;
        }
        this.onOutTipImg();
    };
    __egretProto__.onPKBtnStatus = function () {
        if (gm.dataManage.data.stage >= 200 && tt.Setting.isShowPKButton) {
            this.pkBtn.enabled = true;
        }
        else {
            this.pkBtn.enabled = false;
        }
    };
    __egretProto__.onActivityBtnStatus = function () {
        var purchaseGiftBag = gm.dataManage.data.dailyEvent.purchaseGiftBag;
        var purchase = gm.dataManage.data.dailyEvent.purchase;
        if (!purchaseGiftBag && purchase) {
            this.activityTipImg.visible = true;
        }
        else {
            this.activityTipImg.visible = false;
        }
        this.onOutTipImg();
    };
    __egretProto__.onOutTipImg = function () {
        if (this.activityTipImg.visible || this.pkTipImg.visible) {
            this.pkTipImg1.visible = true;
        }
        else {
            this.pkTipImg1.visible = false;
        }
    };
    __egretProto__.onGuildStatus = function () {
        var maxStage = Math.max(gm.dataManage.data.highestStage, gm.dataManage.data.stage);
        if (maxStage >= 100) {
            this.setBtnSkinName(this.guildBtn, "btn_guild");
        }
        else {
            this.setBtnSkinName(this.guildBtn, "btn_guild_lock");
        }
    };
    __egretProto__.onMissionComplete = function () {
        this.onPKBtnStatus();
        this.onGuildStatus();
    };
    __egretProto__.changeWeaponBtnStatus = function () {
        if (gm.dataManage.data.weaponItem > 0) {
            this.weaponBtn.visible = true;
            this.weaponGroup.visible = true;
            this.weaponLbl.text = gm.dataManage.data.weaponItem + "";
        }
        else {
            this.weaponBtn.visible = false;
            this.weaponGroup.visible = false;
        }
    };
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);
        this.onRegister();
        this.onMissionComplete();
        gm.dataManage.getDailyBossInfo(function (data) {
            this.dataChallenge = data;
            this.challengeBtn.visible = data;
            this.changeChallengeBtnStatus();
        }.bind(this));
        //this.changeChallengeBtnStatus();
        this.changeWeaponBtnStatus();
        Util.initBtnAnchor(this.challengeBtn);
        Util.initBtnAnchor(this.offonlinecoinBtn);
        Util.initBtnAnchor(this.weaponBtn);
        Util.initBtnAnchor(this.dailyTaskEnterBtn);
        this.refreshDailyTaskBtnStatus();
        if (gm.dataManage.data.offlineGold >= 1) {
            this.effectImg.anchorX = 0.5;
            this.effectImg.anchorY = 0.5;
            this.offonlinecoinBtn.visible = true;
            this.effectImg.visible = true;
            egret.Tween.get(this.effectImg, { loop: true }).to({ rotation: 360 }, 2000);
        }
        this.initMatchBtnStatus();
        this.onSetTimeOutMatchStart();
        this.initSelectBtn();
        this.onActivityBtnStatus();
        this.onTouchSelect();
        this.onRefreshPkBtn();
        //selectGroup
        this.selectGroup.visible = true;
        this.timeoutHide = egret.setTimeout(function () {
            this.selectGroup.visible = false;
        }.bind(this), this, 6000.0);
        //refresh dailyRewardBtn
        this.onRefreshDailyRewardBtn();
    };
    __egretProto__.initPurchaseGiftBag = function () {
        var currTime = new Date();
        var nextTime = new Date();
        nextTime.setHours(24, 0, 0, 0);
        var offsetTime = nextTime.getTime() - currTime.getTime();
        egret.setTimeout(function () {
            gm.dataManage.data.dailyEvent = {
                donate: 0,
                resetWeapon: 0,
                envelope: 0,
                zodiacTimes: 0,
                zodiacReward: false
            };
            this.onActivityBtnStatus();
        }.bind(this), this, offsetTime);
    };
    __egretProto__.initSelectBtn = function () {
        this.setBtnSkinName(this.selectBtn, "btn_select_open");
    };
    __egretProto__.initMatchBtnStatus = function () {
        gm.dataManage.isContestAvailable(function (data) {
            this.matchBtn.visible = data.available;
            this.isAvailable = data.available;
            this.onMatchBtnStatus();
        }.bind(this));
    };
    __egretProto__.onSetTimeOutMatchStart = function () {
        var currTime = new Date();
        var nextTime = new Date();
        nextTime.setDate(currTime.getDate() + 1);
        nextTime.setHours(0, 0, 0, 0);
        var setTime = nextTime.getTime() - currTime.getTime();
        if (setTime != 0) {
            egret.setTimeout(function () {
                this.initMatchBtnStatus();
            }.bind(this), this, setTime);
        }
    };
    __egretProto__.setMatchFinishTime = function () {
        var currTime = new Date();
        var contestTime = new Date(gm.dataManage.data.contestStartTime);
        var finishTime = consts.kMatchContestFinishTime - (currTime.getTime() - contestTime.getTime());
        if (finishTime > 0) {
            if (this.matchFinishTimeOut != -2) {
                egret.clearTimeout(this.matchFinishTimeOut);
            }
            this.matchFinishTimeOut = egret.setTimeout(function () {
                gm.postMessage(consts.kMessageContestTimeFinish);
                this.onMatchBtnStatus();
            }.bind(this), this, finishTime);
        }
    };
    __egretProto__.onMatchBtnStatus = function () {
        if (gm.dataManage.isInContest()) {
            this.matchBtn.visible = true;
            this.setMatchFinishTime();
            if (gm.dataManage.isContestFinish()) {
                this.setBtnSkinName(this.matchBtn, "btn_match_red");
            }
            else {
                this.setBtnSkinName(this.matchBtn, "btn_match_on");
            }
        }
        else if (this.isAvailable) {
            this.matchBtn.visible = true;
            this.setBtnSkinName(this.matchBtn, "btn_match");
        }
        else {
            this.matchBtn.visible = false;
        }
    };
    __egretProto__.setBtnSkinName = function (btn, skinName) {
        btn.disabledSkinName = skinName;
        btn.downSkinName = skinName;
        btn.upSkinName = skinName;
    };
    __egretProto__.onSkillDailyBoss = function () {
        this.dataChallenge = undefined;
        this.challengeBtn.visible = false;
    };
    __egretProto__.changeChallengeBtnStatus = function () {
        if (gm.dataManage.isDailyBoss) {
            this.challengeBtn.visible = false;
        }
        else {
            this.challengeBtn.visible = this.dataChallenge;
        }
    };
    __egretProto__.onTouchSelect = function () {
        if (this.timeoutHide != -1) {
            egret.clearTimeout(this.timeoutHide);
        }
        egret.Tween.removeTweens(this.selectGroup);
        if (!this.isOpenSelectBtn) {
            //this.setBtnSkinName(this.selectBtn,"btn_select_close");
            this.selectGroup.visible = true;
            this.isOpenSelectBtn = true;
            egret.Tween.get(this.selectGroup).to({ scaleX: 1, scaleY: 1, opacity: 1 }, 150);
        }
        else {
            //this.setBtnSkinName(this.selectBtn,"btn_select_open");
            //this.selectGroup.visible = false;
            this.isOpenSelectBtn = false;
            egret.Tween.get(this.selectGroup).to({ scaleX: 0, scaleY: 0, opacity: 0 }, 150);
        }
    };
    __egretProto__.onTouchDialog = function (event) {
        event.stopPropagation();
        if (event.target == this.dailyTaskEnterBtn) {
            console.log("begin to open daily task layer");
            var layer = new DailyTaskLayer();
            gm.guiLayer.addElement(layer);
        }
        if (event.target == this.offonlinecoinBtn) {
            var btn = this.offonlinecoinBtn;
            btn.visible = false;
            egret.Tween.removeTweens(this.effectImg);
            this.effectImg.visible = false;
            gm.dataManage.collectOfflineGold(function (data) {
                var bitmap = new egret.gui.BitmapLabel();
                bitmap.font = RES.getRes("font_yellow_fnt");
                bitmap.text = Util.formatNumber(data.gold);
                this.skin.addElement(bitmap);
                bitmap.x = btn.x;
                bitmap.y = btn.y;
                Util.labelGoUpAndRemoveGUI(bitmap, -30, 2000, function () {
                    this.skin.removeElement(bitmap);
                }.bind(this));
                gm.dataManage.addMoney(data.gold, 'gold');
                gm.dataManage.addMoney(data.relic, 'relic');
                if (!gm.dataManage.data.tutorials[consts.kTutorialOffOnLineCoin]) {
                    var ly = new OffOnLineCoinPanel();
                    gm.guiLayer.addElement(ly);
                    gm.dataManage.setTutorialFinish(consts.kTutorialOffOnLineCoin);
                }
            }.bind(this));
        }
        if (event.target == this.settingBtn) {
            var panelSet = new SettingPanel();
            gm.guiLayer.addElement(panelSet);
        }
        if (event.target == this.challengeBtn) {
            if (this.dataChallenge) {
                var ly = new DailyRewardPanel(this.dataChallenge, function () {
                    this.challengeBtn.visible = false;
                }.bind(this));
                gm.guiLayer.addElement(ly);
            }
        }
        if (event.target == this.weaponBtn) {
            gm.dataManage.useWeaponItem(function () {
                gm.postMessage(consts.kMessageAddWeapon);
            }.bind(this));
        }
        if (event.target == this.activityBtn) {
            gm.guiLayer.addElement(new LoadingResLayer("activityres", function () {
                gm.dataManage.checkIfHasPurchaseGiftBag(function (data) {
                    gm.dataManage.activityTime = data;
                    gm.dataManage.serverTime = data.sysTime;
                    gm.dataManage.serverTimeWX = data.sysTime;
                    console.log("Activity: activityTime=" + JSON.stringify(data));
                    gm.network.sendAction("personalThreeFinish", {}, function (data) {
                        gm.dataManage.threeFinish = data.result;
                        gm.dataManage.firstPurchaseGiftTime = data.firstPurchaseGiftTime;
                        console.log("three finish" + gm.dataManage.threeFinish);
                        var activityLy = new ActivityLayer();
                        gm.guiLayer.addElement(activityLy);
                    });
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }));
        }
        if (event.target == this.matchBtn) {
            var panel;
            var rankpanel;
            if (gm.dataManage.isInContest()) {
                if (gm.dataManage.isContestFinish()) {
                    rankpanel = new MatchRankLayer(true);
                    gm.guiLayer.addElement(rankpanel);
                }
                else {
                    rankpanel = new MatchRankLayer(false);
                    gm.guiLayer.addElement(rankpanel);
                }
            }
            else if (this.isAvailable) {
                panel = new MatchStartPanel();
                gm.guiLayer.addElement(panel);
            }
        }
        if (event.target == this.pkBtn) {
            this.pkTipImg.visible = false;
            this.onOutTipImg();
            gm.guiLayer.addElement(new LoadingResLayer("pkres", function () {
                //gm.guiLayer.addElement(new PKStartLayer({isShowOpp:false}));
                gm.gameUI.showLoadingLayer();
                tt.BattleManage.findOpponent(function (data) {
                    if (data) {
                        var ly = new PKSearchLayer(data);
                        gm.guiLayer.addElement(ly);
                    }
                    else {
                        var message = new MessageNotOpponentPanel();
                        gm.guiLayer.addElement(message);
                    }
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this)));
        }
        if (event.target == this.guildBtn) {
            var maxStage = Math.max(gm.dataManage.data.highestStage, gm.dataManage.data.stage);
            if (maxStage < 100) {
                gm.postMessage(consts.kMessageShowToastLayer, "100关开启");
                return;
            }
            gm.guiLayer.addElement(new LoadingResLayer("guildres", function () {
                if (gm.dataManage.data.guild != 0) {
                    gm.guiLayer.addElement(new GuildLayer());
                }
                else {
                    gm.guiLayer.addElement(new GuildCreateLayer());
                }
            }));
        }
        if (event.target == this.selectBtn) {
            this.onTouchSelect();
        }
        if (event.target == this.dailyRewardBtn) {
            this.showEveryDayRewardPanel();
        }
        if (event.target == this.btnEquip) {
            var skin = new EquipLayer();
            gm.guiLayer.addElement(skin);
        }
    };
    __egretProto__.onRefreshDailyRewardBtn = function () {
        var isCanReward = !gm.dataManage.data.dailyEvent.dailyLoginReward; //true:可领取
        this.dailyRewardBtn.visible = isCanReward;
        ;
    };
    __egretProto__.showEveryDayRewardPanel = function () {
        var ly;
        gm.gameUI.showLoadingLayer();
        gm.dataManage.getDailyReward(function (data) {
            if (data.result) {
                data["dailyLoginReward"] = false;
                ly = new EveryDayPanel(data);
                gm.guiLayer.addElement(ly);
            }
            else {
                var day = moment().diff(moment(gm.dataManage.data.createTime).startOf('day'), 'day');
                day = day % 7 + 1;
                var meta = Conf.everyDayReward[day];
                var obj = { dailyLoginReward: true, info: gm.dataManage.data.dailyReward.got, day: day, type: meta.type, num: meta.num };
                ly = new EveryDayPanel(obj);
                gm.guiLayer.addElement(ly);
            }
            this.onRefreshDailyRewardBtn();
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return LeftBtnLayer;
})(egret.gui.SkinnableComponent);
LeftBtnLayer.prototype.__class__ = "LeftBtnLayer";
