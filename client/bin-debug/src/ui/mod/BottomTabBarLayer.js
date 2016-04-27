/**
 *
 * @author
 *
 */
var BottomTabBarLayer = (function (_super) {
    __extends(BottomTabBarLayer, _super);
    function BottomTabBarLayer() {
        _super.call(this);
        this.isPlayHeroNewTip = false;
        this.isPlayMasterNewTip = false;
        this.isPlayShopNewTip = false;
        this.skinName = skins.mod.BottomTabBarSkin;
    }
    var __egretProto__ = BottomTabBarLayer.prototype;
    __egretProto__.onRegisterMessage = function () {
        gm.registerMessage(consts.kMessageUnSelectTabBarButton, this.unSelectTabBarButton, this);
        gm.registerMessage(consts.kMessageSelectShopPay, this.onSelectShopPay, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.changeBtnVisible, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.onNewTipAni, this);
        gm.registerMessage(consts.kMessageAddNewEquip, this.onNewTipAni, this);
        gm.registerMessage(consts.kMessagePrestige, this.onPrestige, this);
    };
    __egretProto__.onPrestige = function () {
        this.onNewTipAni();
    };
    __egretProto__.onSelectShopPay = function () {
        this.setSelectBtnTarget(this.shopBtn, true);
    };
    __egretProto__.isCostEnoughCoin = function (cost) {
        return gm.dataManage.data.gold >= cost;
    };
    __egretProto__.onNewTipHeroAni = function () {
        var showHeroTip;
        showHeroTip = _.find(gm.dataManage.data.heroes, function (v, i) {
            if (v && v.level == 0) {
                var cost = gm.dataManage.heroes.getHeroUpgradeCost(i, 1);
                if (this.isCostEnoughCoin(cost)) {
                    return true;
                }
            }
        }.bind(this));
        if (showHeroTip) {
            this.heroNewTipImg.visible = true;
            if (!this.isPlayHeroNewTip) {
                this.heroNewTipImg.scaleX = 1;
                this.heroNewTipImg.scaleY = 1;
                //this.heroNewTipImg.anchorX = 0.5;
                //this.heroNewTipImg.anchorY = 0.5;
                var tw = egret.Tween.get(this.heroNewTipImg, { loop: true });
                tw.to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
                this.isPlayHeroNewTip = true;
            }
        }
        else {
            this.heroNewTipImg.visible = false;
            egret.Tween.removeTweens(this.heroNewTipImg);
            this.isPlayHeroNewTip = false;
        }
    };
    __egretProto__.onNewTipMasterAni = function () {
        var showTip;
        showTip = _.find(Conf.masterSkill, function (v) {
            if (v.id != consts.kMasterSkillTypePrestige) {
                var info = gm.dataManage.master.getSkillInfo(v.id);
                if (info.level == 0 && this.isCostEnoughCoin(info.cost) && gm.dataManage.master.isUnlockSkill(v.id)) {
                    return true;
                }
            }
        }.bind(this));
        if (showTip || gm.gameUI.isAddNewEquip) {
            this.masterNewTipImg.visible = true;
            if (!this.isPlayMasterNewTip) {
                this.masterNewTipImg.scaleX = 1;
                this.masterNewTipImg.scaleY = 1;
                //this.masterNewTipImg.anchorX = 0.5;
                //this.masterNewTipImg.anchorY = 0.5;
                var tw = egret.Tween.get(this.masterNewTipImg, { loop: true });
                tw.to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
                this.isPlayMasterNewTip = true;
            }
        }
        else {
            this.masterNewTipImg.visible = false;
            egret.Tween.removeTweens(this.masterNewTipImg);
            this.isPlayMasterNewTip = false;
        }
    };
    __egretProto__.onNewTipAni = function () {
        this.onNewTipHeroAni();
        this.onNewTipMasterAni();
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onRegisterMessage();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDialog, this);
        this.selectBottomBtns = [];
        var arr = ["master", "heroes", "halidom", "shop"];
        _.each(arr, function (key) {
            //            console.log(key);
            this.initBtnSource(key);
        }.bind(this));
        this.visible = true;
        this.changeBtnVisible();
        this.onNewTipAni();
    };
    __egretProto__.runHandAni = function () {
        egret.Tween.removeTweens(this.handImg);
        egret.Tween.get(this.handImg, { loop: true }).to({ y: -50 }, 300).to({ y: -35 }, 500);
    };
    __egretProto__.hideHand = function () {
        this.handImg.visible = false;
        egret.Tween.removeTweens(this.handImg);
    };
    __egretProto__.changeBtnVisible = function () {
        var arr = ["master", "heroes", "halidom", "shop"];
        if (Math.floor(gm.dataManage.data.gold) >= 5 && !gm.dataManage.data.tutorials[consts.kTutorialClickMaster]) {
            this[arr[0] + "Btn"].visible = true;
            this[arr[1] + "Btn"].visible = true;
            this[arr[1] + "Btn"].enabled = false;
            this.handImg.visible = true;
            this.handImg.x = 70;
            this.runHandAni();
        }
        else if (Math.floor(gm.dataManage.data.gold) >= 50 && !gm.dataManage.data.tutorials[consts.kTutorialClickHero]) {
            this[arr[0] + "Btn"].visible = true;
            this[arr[1] + "Btn"].visible = true;
            this[arr[0] + "Btn"].enabled = false;
            this.handImg.visible = true;
            this.handImg.x = 160;
            this.runHandAni();
        }
        else if (Math.floor(gm.dataManage.data.gold) < 50 && gm.dataManage.data.tutorials[consts.kTutorialClickMaster] && !gm.dataManage.data.tutorials[consts.kTutorialClickHero]) {
            this[arr[0] + "Btn"].visible = true;
            this[arr[1] + "Btn"].visible = true;
            this[arr[1] + "Btn"].enabled = true;
            this[arr[0] + "Btn"].enabled = true;
            this.hideHand();
        }
        else if (!gm.dataManage.data.tutorials[consts.kTutorialClickMaster]) {
        }
        else if ((gm.dataManage.data.tutorials[consts.kTutorialClickMaster] || gm.dataManage.data.tutorials[consts.kTutorialClickHero]) && !gm.dataManage.data.tutorials[consts.kTutorialClickHeroUpgrade]) {
            this[arr[0] + "Btn"].visible = true;
            this[arr[1] + "Btn"].visible = true;
            this.hideHand();
        }
        else {
            this.hideHand();
            _.each(arr, function (key) {
                this[key + "Btn"].visible = true;
                //
                if (key == "shop") {
                    if (!gm.dataManage.data.tutorials[consts.kTutorialClickShopTabBar] || Util.isDouble11()) {
                        this.showShopDoubleTip();
                    }
                    else {
                        this.hideShopDoubleTip();
                    }
                }
            }.bind(this));
        }
    };
    __egretProto__.showShopDoubleTip = function () {
        this.shopNewTipImg.visible = true;
        if (!this.isPlayShopNewTip) {
            var tw = egret.Tween.get(this.shopNewTipImg, { loop: true });
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
            this.isPlayShopNewTip = true;
        }
    };
    __egretProto__.hideShopDoubleTip = function () {
        this.shopNewTipImg.visible = false;
        egret.Tween.removeTweens(this.shopNewTipImg);
    };
    __egretProto__.clickTutorialBtn = function (currTarget) {
        if (Math.floor(gm.dataManage.data.gold) >= 5 && this.selectBottomBtns[0] == currTarget && !gm.dataManage.data.tutorials[consts.kTutorialClickMaster]) {
            this.hideHand();
            this["heroesBtn"].enabled = true;
            gm.dataManage.setTutorialFinish(consts.kTutorialClickMaster);
        }
        else if (Math.floor(gm.dataManage.data.gold) >= 50 && this.selectBottomBtns[1] == currTarget && !gm.dataManage.data.tutorials[consts.kTutorialClickHero]) {
            this.hideHand();
            this["masterBtn"].enabled = true;
            gm.dataManage.setTutorialFinish(consts.kTutorialClickHero);
        }
    };
    __egretProto__.initBtnSource = function (name) {
        var btn = this[name + "Btn"];
        this.selectBottomBtns.push(btn);
        btn.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
        this[name + "Btn"].upSkinName = "btn_" + name;
        this[name + "Btn"].downSkinName = "btn_" + name + "_highlight";
        this[name + "Btn"].disabledSkinName = "btn_" + name;
        this[name + "Btn"].upAndSelectedSkinName = "btn_" + name + "_highlight";
        this[name + "Btn"].downAndSelectedSkinName = "btn_" + name + "_highlight";
        this[name + "Btn"].disabledAndSelectedSkinName = "btn_" + name + "_highlight";
    };
    __egretProto__.unSelectTabBarButton = function () {
        _.each(this.selectBottomBtns, function (key) {
            key.selected = false;
        }.bind(this));
    };
    __egretProto__.unTouchEnabled = function () {
        _.each(this.selectBottomBtns, function (key) {
            key.enabled = true;
        }.bind(this));
    };
    __egretProto__.onTouchDialog = function (event) {
        event.stopPropagation();
    };
    __egretProto__.toggleChangeHandler = function (evt) {
        this.setSelectBtnTarget(evt.target, false);
    };
    __egretProto__.setSelectBtnTarget = function (target, isMoveShopPay) {
        var arr = ["master", "heroes", "halidom", "shop"];
        this.clickTutorialBtn(target);
        for (var i = 0; i < this.selectBottomBtns.length; i++) {
            var btn = this.selectBottomBtns[i];
            //tutorial
            if (btn == target) {
                gm.postMessage(consts.kMessageShowPopUpDialog, { key: arr[i], isMoveShopPay: isMoveShopPay });
                if (arr[i] == "shop") {
                    if (!gm.dataManage.data.tutorials[consts.kTutorialClickShopTabBar] && !Util.isDouble11()) {
                        gm.dataManage.setTutorialFinish(consts.kTutorialClickShopTabBar);
                        this.hideShopDoubleTip();
                    }
                }
            }
            btn.selected = (btn == target);
        }
    };
    return BottomTabBarLayer;
})(egret.gui.SkinnableComponent);
BottomTabBarLayer.prototype.__class__ = "BottomTabBarLayer";
