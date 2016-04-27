var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityVipGroup = (function (_super) {
        __extends(ActivityVipGroup, _super);
        function ActivityVipGroup(closeFunction) {
            _super.call(this);
            this.closeFunction = closeFunction;
            this.pageIndex = -1;
            this.currVip = -1;
            this.rewardArr = [];
            this.skinName = skins.components.ActivityVipGroupSkin;
            gm.registerMessage(consts.kMessageGetVipLevel, this.setPageIndex, this);
        }
        var __egretProto__ = ActivityVipGroup.prototype;
        __egretProto__.getExplanationByIndex = function (index) {
            var meta = Conf.vip[index];
            var expDict = {
                1: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        "<font color='#00ff00'>12</font>元充值档增益<font color='#00ff00'>44%</font>",
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                    ]
                },
                2: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        "<font color='#00ff00'>30</font>元充值档增益<font color='#00ff00'>44%</font>",
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero)
                    ]
                },
                3: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        "<font color='#00ff00'>68</font>元充值档增益<font color='#00ff00'>44%</font>",
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero)
                    ]
                },
                4: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        "<font color='#00ff00'>168</font>元充值档增益<font color='#00ff00'>44%</font>",
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100)
                    ]
                },
                5: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        "<font color='#00ff00'>328</font>元充值档增益<font color='#00ff00'>44%</font>",
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon)
                    ]
                },
                6: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon)
                    ]
                },
                7: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100)
                    ]
                },
                8: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100)
                    ]
                },
                9: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100)
                    ]
                },
                10: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100)
                    ]
                },
                11: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100)
                    ]
                },
                12: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100),
                        _.sprintf("每天可领取蜕变圣物的<font color='#00ff00'>+%d%%</font>", meta.dailyRelic * 100)
                    ]
                },
                13: {
                    desc: [
                        _.sprintf("充值满<font color='#00ff00'>%d</font>元即可享受V%d特权", meta.purchase, index),
                        _.sprintf("80关后每10关掉落圣物<font color='#00ff00'>+%d</font>", meta.relicPerTen),
                        _.sprintf("蜕变英雄获得奖励<font color='#00ff00'>+%d</font>倍", meta.relicByHero),
                        _.sprintf("保级蜕变花费<font color='#00ff00'>%d%%</font>", meta.prestigeCost * 100),
                        _.sprintf("每日挑战钻石奖励<font color='#00ff00'>+%d%%</font>", meta.dailyBossDiamond * 100),
                        _.sprintf("每日挑战武器奖励<font color='#00ff00'>+%d</font>", meta.dailyBossWeapon),
                        _.sprintf("公会捐献次数<font color='#00ff00'>+%d</font>", meta.donate),
                        _.sprintf("离线圣物<font color='#00ff00'>+%d%%</font>", meta.offlineRelic * 100),
                        _.sprintf("每天可领取蜕变圣物的<font color='#00ff00'>+%d%%</font>", meta.dailyRelic * 100)
                    ]
                }
            };
            return expDict[index];
        };
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setPageIndex();
        };
        __egretProto__.setPageIndex = function () {
            gm.gameUI.showLoadingLayer();
            gm.dataManage.getVipLevel(function (data) {
                this.pageIndex = data.vip || 1;
                this.currVip = data.vip;
                this.setTitleStatus();
                this.setRewardBtnAndText();
                this.setRightAndLeftBtn();
                this.setExplanationList();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.setTitleStatus = function () {
            this.setPayTitle();
            this.setVipTitleText();
        };
        __egretProto__.setPayTitle = function () {
            var vip = Math.min(13, this.currVip + 1);
            var meta = Conf.vip[vip];
            var purchase = gm.dataManage.data.purchaseNum || 0;
            var willPay = meta.purchase - purchase;
            var costPay = willPay < 0 ? 0 : willPay;
            var text = _.sprintf("在充值<font color='#00ff00'>%d</font>元即可成为", costPay);
            Util.setStyleText(this.payTitleLbl, text);
            this.payVipLbl.text = _.sprintf("V%d", vip);
            this.setPayProgress(purchase, meta.purchase);
        };
        __egretProto__.setPayProgress = function (curr, max) {
            this.progress.maximum = max;
            this.progress.value = curr;
            this.progress.numLbl.text = _.sprintf("%d/%d", curr, max);
        };
        __egretProto__.setVipTitleText = function () {
            var vip = Math.min(13, this.currVip);
            this.vipLbl.text = _.sprintf("V%d", vip);
        };
        __egretProto__.setRewardBtnAndText = function () {
            var vipGift = gm.dataManage.data.vipGift || [];
            var isGetReward = vipGift[this.pageIndex] || 0;
            var isGetVipLv = this.currVip < this.pageIndex;
            this.getRewardGroup.visible = true;
            if (isGetVipLv) {
                this.getRewardBtn.enabled = false;
                this.getRewardLbl.text = "领取";
            }
            else {
                if (isGetReward) {
                    this.getRewardBtn.enabled = false;
                    this.getRewardLbl.text = "已领取";
                }
                else {
                    this.getRewardBtn.enabled = true;
                    this.getRewardLbl.text = "领取";
                }
            }
        };
        __egretProto__.setRightAndLeftBtn = function () {
            if (this.pageIndex == 1) {
                this.leftBtn.visible = false;
                this.rightBtn.visible = true;
            }
            else if (this.pageIndex == 13) {
                this.leftBtn.visible = true;
                this.rightBtn.visible = false;
            }
            else {
                this.rightBtn.visible = true;
                this.leftBtn.visible = true;
            }
        };
        __egretProto__.setExplanationList = function () {
            this.vipTitleLbl.text = _.sprintf("V%d", this.pageIndex);
            this.rewardTitleLbl.text = _.sprintf("V%d超值礼包", this.pageIndex);
            this.setRewardGroup();
            this.setListExpGroup();
        };
        __egretProto__.setListExpGroup = function () {
            this.listGroup.removeAllElements();
            var info = this.getExplanationByIndex(this.pageIndex);
            _.each(info.desc, function (v) {
                this.addExp(v);
            }.bind(this));
        };
        __egretProto__.setRewardGroup = function () {
            this.rewardGroup.removeAllElements();
            this.rewardArr = [];
            var info = gm.dataManage.vipInfo(this.pageIndex);
            _.each(info, function (v, k) {
                this.setAddItem(v, k);
            }.bind(this));
        };
        __egretProto__.setAddItem = function (num, type) {
            switch (type) {
                case 'gold':
                case 'diamond':
                case 'relic':
                case 'crystal':
                case 'weaponItem':
                case 'goldRain':
                case 'autoTap':
                case 'doom':
                case 'refreshSkill':
                case 'powerOfHolding':
                case 'set':
                    this.addItem(num, type);
                    break;
                default:
                    break;
            }
        };
        __egretProto__.addItem = function (numCount, type) {
            if (numCount == 0) {
                return;
            }
            this.rewardArr.push({ type: type, num: numCount });
            var icon = gm.gameUI.getElementTypeSource(type).icon;
            var iconImg = new egret.gui.UIAsset();
            iconImg.width = 58;
            iconImg.height = 58;
            iconImg.source = icon;
            var group = new egret.gui.Group();
            group.width = 58;
            group.height = 58;
            var num = new egret.gui.Label();
            num.size = 18;
            num.fontFamily = "Arial";
            num.horizontalCenter = 0;
            num.verticalCenter = 42;
            if (type == "set") {
                num.text = _.sprintf("%d套武器", numCount);
            }
            else {
                num.text = Util.formatNumber(numCount);
            }
            group.addElement(iconImg);
            group.addElement(num);
            this.rewardGroup.addElement(group);
        };
        __egretProto__.addExp = function (desc) {
            var group = new egret.gui.Group();
            var layout = new egret.gui.HorizontalLayout();
            layout.gap = 0;
            layout.horizontalAlign = "center";
            layout.verticalAlign = "middle";
            group.layout = layout;
            var star = new egret.gui.UIAsset();
            star.source = "activity_icon_star";
            var text = new egret.gui.Label();
            text.fontFamily = "Arial";
            text.verticalAlign = "middle";
            text.textAlign = "center";
            text.size = 18;
            Util.setStyleText(text, desc);
            group.addElement(star);
            group.addElement(text);
            this.listGroup.addElement(group);
        };
        __egretProto__.prePage = function () {
            this.pageIndex--;
            this.pageIndex = Math.max(0, this.pageIndex);
            this.setRightAndLeftBtn();
            this.setRewardBtnAndText();
            this.setExplanationList();
        };
        __egretProto__.nextPage = function () {
            this.pageIndex++;
            this.pageIndex = Math.min(13, this.pageIndex);
            this.setRightAndLeftBtn();
            this.setRewardBtnAndText();
            this.setExplanationList();
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.payBtn) {
                gm.postMessage(consts.kMessageSelectShopPay);
                Util.invokeCallback(this.closeFunction);
            }
            if (event.target == this.getRewardBtn && this.getRewardBtn.enabled) {
                gm.gameUI.showLoadingLayer();
                gm.dataManage.getVipGift(this.pageIndex, function () {
                    var ly = new MessageGetRewardPanel("领取奖励", this.rewardArr);
                    gm.guiLayer.addElement(ly);
                    this.getRewardBtn.enabled = false;
                    this.getRewardLbl.text = "已领取";
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
            if (event.target == this.rightBtn) {
                this.nextPage();
            }
            if (event.target == this.leftBtn) {
                this.prePage();
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityVipGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.ActivityVipGroup = ActivityVipGroup;
    ActivityVipGroup.prototype.__class__ = "uiskins.ActivityVipGroup";
})(uiskins || (uiskins = {}));
