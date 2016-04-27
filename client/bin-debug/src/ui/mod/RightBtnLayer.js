/**
 *
 * @author
 *
 */
var RightBtnLayer = (function (_super) {
    __extends(RightBtnLayer, _super);
    function RightBtnLayer() {
        _super.call(this);
        this.skinName = skins.mod.RightBtnLayerSkin;
        this.isBuyMonthCardDays = false;
        this.isBuySupMonthCardDays = false;
    }
    var __egretProto__ = RightBtnLayer.prototype;
    __egretProto__.onBuyMonthCard = function (obj) {
        if (gm.dataManage.remainMonthCardDays() >= 0) {
            this.isBuyMonthCardDays = (obj && obj.data);
            this.diamondBtn.visible = this.isBuyMonthCardDays ? true : gm.dataManage.isTodayMonthCardRewardAvailable();
        }
    };
    __egretProto__.onBuySupMonthCard = function (obj) {
        if (gm.dataManage.remainSupMonthCardDays() >= 0) {
            this.isBuySupMonthCardDays = (obj && obj.data);
            this.diamondBtn0.visible = this.isBuySupMonthCardDays ? true : gm.dataManage.isTodaySupMonthCardRewardAvailable();
        }
    };
    __egretProto__.onBuyLifeCard = function (obj) {
        if (gm.dataManage.data.isBoughtLifeCard) {
            this.diamondBtn1.visible = gm.dataManage.isTodayLifeCardRewardAvailable();
        }
    };
    __egretProto__.onGetRelic = function () {
        var vip = gm.dataManage.data.vip;
        var getRelic = gm.dataManage.data.dailyEvent.getRelic || 0;
        if (vip >= 12 && !getRelic) {
            this.relicBtn.visible = true;
        }
        else {
            this.relicBtn.visible = false;
        }
    };
    __egretProto__.refreshPKImgs = function () {
        this.pkGroup.visible = false;
        gm.network.sendAction("getPetPkList", { "flush": 0 }, function (data) {
            console.log(JSON.stringify(data));
            console.log("    refreshPKImgs(){");
            //显示
            this.pkGroup.visible = true;
            //icon 通过url
            if (data.pkPets[0].avatar == null) {
            }
            else {
                Util.setIconImg(data.avatar, this.iconImg, 60);
            }
        }.bind(this));
        //event
        this.iconImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPetPkIcon, this);
        this.pkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPetPkBtn, this);
    };
    __egretProto__.onClickPetPkBtn = function () {
        console.log("    onClickPetPkBtn(){");
        //var panelPet = new PetPKPanel();
        //gm.guiLayer.addElement(panelPet);
    };
    __egretProto__.onClickPetPkIcon = function () {
        console.log("    onClickPetPkBtn(){");
        var panelPet = new PetPKPanel();
        gm.guiLayer.addElement(panelPet);
    };
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);
        gm.registerMessage(consts.kMessageBuyMonthCard, this.onBuyMonthCard, this);
        gm.registerMessage(consts.kMessageBuySupMonthCard, this.onBuySupMonthCard, this);
        gm.registerMessage(consts.kMessageBuyLifeCard, this.onBuyLifeCard, this);
        gm.registerMessage(consts.kMessageGetVipLevel, this.onGetRelic, this);
        Util.initBtnAnchor(this.diamondBtn);
        Util.initBtnAnchor(this.newPlayerBtn);
        Util.initBtnAnchor(this.shareBtn);
        Util.initBtnAnchor(this.pkBtn);
        //double img
        this.newPlayerBtn.visible = !gm.dataManage.data.isNewbiePackageBought;
        this.onBuyMonthCard();
        this.onBuySupMonthCard();
        this.onBuyLifeCard();
        this.onGetRelic();
        this.refreshPKImgs();
        this.ininSubscribed();
        this._timer = new egret.Timer(1000);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onChangeTime, this);
        this._timer.start();
        this.onChangeTime();
    };
    __egretProto__.ininSubscribed = function () {
        var _this = this;
        if (Util.isJuHe()) {
            this.refreshShareBtnState();
            return;
        }
        var isSubscribed = gm.dataManage.data.isSubscribed;
        if (!isSubscribed && gm.dataManage.data.subscribed != 2) {
            gm.network.sendAction("gainSubscribeReward", {}, function (data) {
                if (!!data.ret) {
                    gm.dataManage.data.subscribed = data.ret;
                    if (data.ret == 2) {
                        gm.dataManage.addMoney(Conf.config.subscribedReward, "diamond");
                    }
                }
                _this.refreshShareBtnState();
            }, function () {
                this.refreshShareBtnState();
            });
        }
        else {
            this.refreshShareBtnState();
        }
    };
    __egretProto__.refreshShareBtnState = function () {
        //console.warn("isJuHe:" + Util.isJuHe());
        if (Util.isJuHe()) {
            this.subscribeBtn.visible = false;
            this.shareBtn.visible = false;
            this.lblCountDown.visible = false;
            this.shareGroup.visible = false;
            return;
        }
        // temp code for publish
        var isSubscribed = gm.dataManage.data.isSubscribed;
        if (!isSubscribed && gm.dataManage.data.subscribed != 2) {
            this.subscribeBtn.visible = true;
            this.shareBtn.visible = false;
            this.lblCountDown.visible = false;
            this.shareGroup.visible = true;
            return;
        }
        if (gm.dataManage.shareTimes < 2) {
            this.subscribeBtn.visible = false;
            this.shareBtn.visible = true;
            this.lblCountDown.visible = true;
            this.shareGroup.visible = true;
            return;
        }
        this.subscribeBtn.visible = false;
        this.shareBtn.visible = false;
        this.lblCountDown.visible = false;
        this.shareGroup.visible = false;
    };
    __egretProto__.calRemain = function (time) {
        //console.log("lastShareTime:"+gm.dataManage.lastShareTime+"serverTime:"+gm.dataManage.serverTimeWX);
        //console.log("del:"+(gm.dataManage.serverTimeWX-gm.dataManage.lastShareTime));
        gm.dataManage.serverTimeWX = gm.dataManage.serverTimeWX + 1000;
        var leave1 = time % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        var h, m, s;
        h = hours + "";
        m = minutes + "";
        s = seconds + "";
        if (hours < 10)
            h = "0" + h;
        if (minutes < 10)
            m = "0" + m;
        if (seconds < 10)
            s = "0" + s;
        return h + ":" + m + ":" + s;
    };
    __egretProto__.onChangeTime = function () {
        //  console.log("-=-=-=-"+gm.dataManage.shareTimes+"-=-"+gm.dataManage.timeRemain+"-=-"+gm.dataManage.serverTimeWX+gm.dataManage.lastShareTime)
        if (gm.dataManage.shareTimes == 0) {
            this.lblCountDown.text = "分享领钻石";
        }
        else if (gm.dataManage.shareTimes == 1 && gm.dataManage.timeRemain > 0) {
            this.lblCountDown.text = this.calRemain(gm.dataManage.timeRemain);
            gm.dataManage.timeRemain -= 1000;
        }
        else if (gm.dataManage.shareTimes == 1 && gm.dataManage.timeRemain <= 0) {
            this.lblCountDown.text = "分享领水晶";
        }
        else {
            this.refreshShareBtnState();
        }
    };
    __egretProto__.onTouchDialog = function (event) {
        event.stopPropagation();
        if (event.target == this.newPlayerBtn) {
            var ly = new NewPlayerGiftBagPanel(this.newPlayerBtn, function () {
                this.labelGoUp("diamond", this.newPlayerBtn, 300);
            }.bind(this));
            gm.guiLayer.addElement(ly);
        }
        if (event.target == this.diamondBtn) {
            //this.clickBtnAni(this.diamondBtn);
            if (gm.dataManage.remainMonthCardDays() >= 0) {
                if (this.isBuyMonthCardDays || gm.dataManage.isTodayMonthCardRewardAvailable()) {
                    gm.dataManage.getDailyMonthCardDiamond(function (data) {
                        this.labelGoUp("diamond", this.diamondBtn0, data.diamond);
                        gm.dataManage.addMoney(data.diamond, "diamond");
                        this.diamondBtn.visible = false;
                        this.isBuyMonthCardDays = false;
                    }.bind(this));
                }
            }
        }
        if (event.target == this.diamondBtn0) {
            //this.clickBtnAni(this.diamondBtn);
            if (gm.dataManage.remainSupMonthCardDays() >= 0) {
                if (this.isBuySupMonthCardDays || gm.dataManage.isTodaySupMonthCardRewardAvailable()) {
                    gm.dataManage.getDailySupMonthCardDiamond(function (data) {
                        this.labelGoUp("diamond", this.diamondBtn0, data.diamond);
                        gm.dataManage.addMoney(data.diamond, "diamond");
                        this.diamondBtn0.visible = false;
                        this.isBuySupMonthCardDays = false;
                    }.bind(this));
                }
            }
        }
        if (event.target == this.diamondBtn1) {
            if (gm.dataManage.isTodayLifeCardRewardAvailable()) {
                gm.dataManage.getDailyLifeCardDiamond(function (data) {
                    this.labelGoUp("diamond", this.diamondBtn1, data.diamond);
                    gm.dataManage.addMoney(data.diamond, "diamond");
                    this.diamondBtn1.visible = false;
                }.bind(this));
            }
        }
        if (event.target == this.relicBtn) {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.getDailyRelic(function (data) {
                this.labelGoUp("relic", this.relicBtn, data.relic);
                this.relicBtn.visible = false;
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        if (event.target == this.subscribeBtn) {
            if (Util.isJuHe())
                return;
            var subscribePanel = new PrevenancePanel(this.subscribeBtn, function (status) {
                gm.dataManage.data.subscribed = status;
                this.refreshShareBtnState();
            }.bind(this));
            gm.guiLayer.addElement(subscribePanel);
        }
        if (event.target == this.shareBtn) {
            if (Util.isJuHe())
                return;
            var panel = new ShareLayer();
            gm.guiLayer.addElement(panel);
        }
    };
    __egretProto__.labelGoUp = function (type, btn, num) {
        var icon = new egret.gui.UIAsset;
        icon.source = type;
        var bitmap = new egret.gui.BitmapLabel();
        bitmap.font = RES.getRes("font_yellow_fnt");
        bitmap.text = Util.formatNumber(num);
        var group = new egret.gui.Group;
        var layout = new egret.gui.HorizontalLayout;
        group.layout = layout;
        group.horizontalCenter = 0;
        layout.gap = 0;
        layout.horizontalAlign = "center";
        layout.verticalAlign = "middle";
        group.addElement(icon);
        group.addElement(bitmap);
        btn.parent.skin.addElement(group);
        group.x = -(20 * _.size(num.toString()) + 25) / 2;
        group.y = btn.y;
        Util.labelGoUpAndRemoveGUI(group, -30, 2000, function () {
            btn.parent.skin.removeElement(group);
        }.bind(this));
        //group.includeInLayout = true;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return RightBtnLayer;
})(egret.gui.SkinnableComponent);
RightBtnLayer.prototype.__class__ = "RightBtnLayer";
