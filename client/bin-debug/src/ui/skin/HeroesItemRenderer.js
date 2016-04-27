var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HeroesItemRenderer = (function (_super) {
        __extends(HeroesItemRenderer, _super);
        function HeroesItemRenderer() {
            _super.call(this);
            this._clickBtnTime = 0;
            this._showPopBtnTime = 0;
            this.isPlayingAni = false;
            this.dataItem = {};
            this.skinName = skins.components.HeroesItemRendererSkin;
        }
        var __egretProto__ = HeroesItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            //this.buyPopBtn1.numLbl.text = "+10";
            //this.buyPopBtn0.numLbl.text = "+100";
        };
        __egretProto__.initData = function () {
            this.dataItem = {
                dps: this.getDps(),
                cost: this.getCost(),
                skill: this.getSkill(),
                skills: this.getSkills(),
                skillCost: this.getHeroSkillUnlockCost(),
                nextLevelAddDps: this.getNextLevelAddDps(),
                cost10: this.getCost10(),
                cost100: this.getCost100(),
                isHeroDead: this.isHeroDead()
            };
        };
        __egretProto__.getName = function () {
            return Conf.hero[this.data.id].name;
        };
        __egretProto__.getLevel = function () {
            return gm.dataManage.data.heroes[this.data.id].level;
        };
        __egretProto__.getDps = function () {
            return formula.heroDPS(gm.dataManage.data, this.data.id, this.getLevel());
        };
        __egretProto__.getNextLevelAddDps = function () {
            return formula.heroDPS(gm.dataManage.data, this.data.id, this.getLevel() + 1) - this.getDps();
        };
        __egretProto__.getCost = function () {
            return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id, 1);
        };
        __egretProto__.getCostLevel10 = function () {
            var cost;
            if (this.getLevel() > 1000) {
                cost = 100;
            }
            else {
                cost = 10;
            }
            return cost;
        };
        __egretProto__.getCostLevel100 = function () {
            var cost;
            if (this.getLevel() > 1000) {
                cost = 1000;
            }
            else {
                cost = 100;
            }
            return cost;
        };
        __egretProto__.getCost10 = function () {
            var cost = this.getCostLevel10();
            return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id, cost);
        };
        __egretProto__.getCost100 = function () {
            var cost = this.getCostLevel100();
            return gm.dataManage.heroes.getHeroUpgradeCost(this.data.id, cost);
        };
        __egretProto__.getSkill = function () {
            return gm.dataManage.data.heroes[this.data.id].skill;
        };
        __egretProto__.getSkills = function () {
            return gm.dataManage.heroes.getHeroSkillInfo(this.data.id);
        };
        __egretProto__.getHeroSkillUnlockCost = function () {
            return gm.dataManage.heroes.getHeroSkillUnlockCost(this.data.id);
        };
        __egretProto__.getHeroRevivalCostDiamond = function () {
            var id = this.data.id;
            return gm.dataManage.heroes.getRevivalCost(id);
        };
        __egretProto__.getHeroRevivalTime = function () {
            var id = this.data.id;
            var currTime = new Date().getTime();
            var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
            return (revivalTime - currTime);
        };
        __egretProto__.isUnLockHeroSkill = function () {
            return gm.dataManage.heroes.isUnlockHeroSkill(this.data.id);
        };
        __egretProto__.isCostGold = function (cost) {
            return gm.dataManage.data.gold >= cost;
        };
        __egretProto__.isHeroDead = function () {
            var id = this.data.id;
            var currTime = new Date().getTime();
            var revivalTime = new Date(gm.dataManage.data.heroes[id].revivalTime).getTime();
            if (currTime > revivalTime) {
                return false;
            }
            return true;
        };
        __egretProto__.onHeroesSkillPanel = function () {
            var data;
            data = {
                id: this.data.id,
                name: this.getName(),
                lv: this.getLevel() + "",
                dps: Util.formatNumber(this.getDps()),
                iconSource: "hero" + this.data.id,
                skills: this.dataItem.skills
            };
            gm.guiLayer.addElement(new HeroesSkillPanel(data));
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setLevel();
            this.setDps();
            this.setNewTipImg();
            this.setIconDisabled();
            this.setHeroRevival();
            this.setBuyPopGroup();
            this.setBtnIconImg();
            this.setBtnText();
            this.setBtnAddDps();
            this.setBtnCost();
            this.setBtnCost10();
            this.setBtnCost100();
            this.setBtnSource();
            this.setBtn10Source();
            this.setBtn100Source();
            this.setBtnCostText10();
            this.setBtnCostText100();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (this.isCostGold(this.dataItem.cost)) {
                    this.setTutorial();
                }
                if (this.isHeroDead()) {
                    gm.dataManage.heroes.revivalHero(this.data.id, function () {
                    }.bind(this));
                    return;
                }
                this.setTouchTapPopUpDialog(function () {
                    if (this.isUnLockHeroSkill()) {
                        gm.dataManage.heroes.unlockHeroSkill(this.data.id);
                    }
                    else {
                        if (this.isCostGold(this.dataItem.cost)) {
                            if (gm.dataManage.heroes.heroUpgrade(this.data.id, 1)) {
                                this.playHeroLevelAni();
                            }
                        }
                    }
                }.bind(this));
                return;
            }
            if (event.target == this.buyPopBtn0) {
                this.setTouchBeginBuyPopUpDialog();
                var cost100 = this.getCostLevel100();
                if (gm.dataManage.heroes.heroUpgrade(this.data.id, cost100)) {
                    this.playHeroLevelAni();
                }
                return;
            }
            if (event.target == this.buyPopBtn1) {
                this.setTouchBeginBuyPopUpDialog();
                var cost10 = this.getCostLevel10();
                if (gm.dataManage.heroes.heroUpgrade(this.data.id, cost10)) {
                    this.playHeroLevelAni();
                }
                return;
            }
            this.onHeroesSkillPanel();
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
                this._clickBtnTime = new Date().getTime();
                this.setTouchBeginPopUpDialog();
            }
        };
        __egretProto__.setTouchBeginPopUpDialog = function () {
            //if(this.getLevel() < 1 || this.getLevel() >= 1000){return ;}
            if (this.getLevel() < 1) {
                return;
            }
            if (this.data.base.touchBeginTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
            }
            this.data.base.touchBeginTimeoutIndex = egret.setTimeout(function () {
                this.setTouchBeginBuyPopUpDialog();
            }.bind(this), this, 500);
        };
        __egretProto__.setTouchBeginBuyPopUpDialog = function () {
            //if(this.getLevel() < 1 || this.getLevel() >= 1000){return ;}
            if (this.getLevel() < 1) {
                return;
            }
            this.buyPopGroup.visible = true;
            if (this.data.base.touchTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
            }
            this._showPopBtnTime = 3000;
            this.data.base.touchTimeoutTime = new Date().getTime();
            this.data.base.touchTimeoutIndex = egret.setTimeout(function () {
                this.buyPopGroup.visible = false;
            }.bind(this), this, this._showPopBtnTime);
        };
        __egretProto__.setTouchTapPopUpDialog = function (cb) {
            var currTime = new Date().getTime();
            var offsetTime = currTime - this._clickBtnTime;
            if (offsetTime <= 300 || this.getLevel() < 1) {
                this._clickBtnTime = 0;
                this.setHideClickBtnPopUp();
                Util.invokeCallback(cb);
            }
            this.setTouchDoubleTapPopUpDialog();
        };
        __egretProto__.setTouchDoubleTapPopUpDialog = function () {
            var currTime = new Date().getTime();
            var offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
            if (offsetDoubleTime > 400) {
                this.data.base.touchDoubleTimes = 0;
                this.data.base.clickDoubleBtnTime = new Date().getTime();
            }
            offsetDoubleTime = currTime - this.data.base.clickDoubleBtnTime;
            if (offsetDoubleTime <= 400) {
                this.data.base.touchDoubleTimes++;
                if (this.data.base.touchDoubleTimes >= 2) {
                    this.setTouchBeginBuyPopUpDialog();
                    this.data.base.touchDoubleTimes = 0;
                    this.data.base.clickDoubleBtnTime = 0;
                }
            }
        };
        __egretProto__.setNewTipImg = function () {
            if (this.getLevel() == 0 && this.isCostGold(this.dataItem.cost)) {
                this.newTipImg.visible = true;
                if (!this.isPlayingAni) {
                    this.playNewTipAni();
                    this.isPlayingAni = true;
                }
            }
            else {
                this.newTipImg.visible = false;
                this.stopNewTipAni();
                this.isPlayingAni = false;
            }
        };
        __egretProto__.playNewTipAni = function () {
            this.newTipImg.scaleX = 1;
            this.newTipImg.scaleY = 1;
            var tw = egret.Tween.get(this.newTipImg, { loop: true });
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
        };
        __egretProto__.stopNewTipAni = function () {
            egret.Tween.removeTweens(this.newTipImg);
        };
        __egretProto__.playHeroLevelAni = function () {
            this.effectImg.visible = true;
            var mc = pool.createMovieClip("heroLevelUp");
            mc.autoRemove = false;
            mc.play(false, function () {
                this.effectImg.visible = false;
            }.bind(this), 1);
            this.effectImg.source = mc;
        };
        __egretProto__.setBuyPopGroup = function () {
            var currTime = new Date().getTime();
            var popTime = this.data.base.touchTimeoutTime;
            var offsetTime = currTime - popTime;
            if (offsetTime < 3000) {
                this._showPopBtnTime = 3000 - offsetTime;
                this.setShowPopGroup();
            }
            else {
                if (this.data.base.touchBeginTimeoutIndex == -1) {
                    this.setHidePopGroup();
                }
            }
        };
        __egretProto__.setShowPopGroup = function () {
            this.buyPopGroup.visible = true;
            if (this.data.base.touchTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
            }
            if (this.data.base.touchBeginTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
                this.data.base.touchBeginTimeoutIndex = -1;
            }
            this.data.base.touchTimeoutIndex = egret.setTimeout(function () {
                this.buyPopGroup.visible = false;
            }.bind(this), this, this._showPopBtnTime);
        };
        __egretProto__.setHidePopGroup = function () {
            this.buyPopGroup.visible = false;
            if (this.data.base.touchTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchTimeoutIndex);
                this.data.base.touchTimeoutIndex = -1;
                this.data.base.touchTimeoutTime = 0;
            }
            if (this.data.base.touchBeginTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.touchBeginTimeoutIndex);
                this.data.base.touchBeginTimeoutIndex = -1;
            }
        };
        __egretProto__.setHideClickBtnPopUp = function () {
            if (!this.buyPopGroup.visible) {
                this.setHidePopGroup();
            }
        };
        __egretProto__.setHeroRevival = function () {
            if (this.dataItem.isHeroDead) {
                this.revivalGroup.visible = true;
                this.setShowHeroRevivalTime();
            }
            else {
                this.revivalGroup.visible = false;
                this.setHideHeroRevivalTime();
            }
        };
        __egretProto__.setShowHeroRevivalTime = function () {
            if (this.data.base.revivalIntervalIndex != -1) {
                egret.clearInterval(this.data.base.revivalIntervalIndex);
            }
            if (this.data.base.revivalTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.revivalTimeoutIndex);
            }
            var revivalTime = this.getHeroRevivalTime();
            egret.setInterval(this.showRevivalTime, this, 1000);
            egret.setTimeout(function () {
                egret.clearInterval(this.data.base.revivalIntervalIndex);
                this.data.base.revivalIntervalIndex = -1;
                gm.postMessage(consts.kMessageHeroRevival, this.data.id);
            }.bind(this), this, revivalTime);
            this.showRevivalTime();
        };
        __egretProto__.setHideHeroRevivalTime = function () {
            if (this.data.base.revivalIntervalIndex != -1) {
                egret.clearInterval(this.data.base.revivalIntervalIndex);
                this.data.base.revivalIntervalIndex = -1;
            }
            if (this.data.base.revivalTimeoutIndex != -1) {
                egret.clearTimeout(this.data.base.revivalTimeoutIndex);
                this.data.base.revivalTimeoutIndex = -1;
            }
        };
        __egretProto__.showRevivalTime = function () {
            this.setRevivalTime();
            this.setBtnCost();
        };
        __egretProto__.setRevivalTime = function () {
            var revivalTime = this.getHeroRevivalTime();
            this.revivalTimeLbl.text = Util.formatTime(Math.floor(revivalTime / 1000), true);
        };
        __egretProto__.setTutorial = function () {
            if (!gm.dataManage.data.tutorials[consts.kTutorialClickHeroUpgrade]) {
                gm.dataManage.setTutorialFinish(consts.kTutorialClickHero);
                gm.dataManage.setTutorialFinish(consts.kTutorialClickHeroUpgrade);
                gm.postMessage(consts.kMessageTutorialUpdate);
            }
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = this.getName();
        };
        __egretProto__.setIconDisabled = function () {
            if (this.getLevel() == 0) {
                this.iconDisabled.visible = true;
            }
            else {
                this.iconDisabled.visible = false;
            }
        };
        __egretProto__.setLevel = function () {
            this.lvLbl.text = this.getLevel() + "";
        };
        __egretProto__.setDps = function () {
            this.dpsLbl.text = Util.formatNumber(this.dataItem.dps);
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "hero" + this.data.id;
        };
        __egretProto__.setBtnIconImg = function () {
            var source;
            if (this.dataItem.isHeroDead) {
                source = "diamond";
            }
            else {
                source = "coin";
            }
            this.btnItem.iconImg.source = source;
        };
        __egretProto__.setBtnText = function () {
            var text;
            if (this.dataItem.isHeroDead) {
                text = "复活";
                this.btnItem.textLbl.size = 22;
            }
            else {
                if (this.isUnLockHeroSkill()) {
                    text = "技能解锁";
                }
                else {
                    //if(this.getLevel() == 1000){
                    //	text = "最高等级";
                    //}
                    //else {
                    text = this.getLevel() == 0 ? "征召：" : "等级提升";
                }
                this.btnItem.textLbl.size = 14;
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnAddDps = function () {
            var text;
            //if(this.getLevel() == 1000 || this.isUnLockHeroSkill() || this.dataItem.isHeroDead){
            if (this.isUnLockHeroSkill() || this.dataItem.isHeroDead) {
                text = "";
            }
            else {
                text = _.sprintf("+ %s DPS", Util.formatNumber(this.dataItem.nextLevelAddDps));
            }
            this.btnItem.upgradeLbl.text = text;
        };
        __egretProto__.setBtnCost = function () {
            var cost;
            if (this.dataItem.isHeroDead) {
                cost = this.getHeroRevivalCostDiamond();
            }
            else {
                if (this.isUnLockHeroSkill()) {
                    cost = this.dataItem.skillCost;
                }
                else {
                    //if(this.getLevel() == 1000){
                    //	cost = 0;
                    //}
                    //else {
                    cost = this.dataItem.cost;
                }
            }
            this.btnItem.iconLbl.text = Util.formatNumber(cost);
        };
        __egretProto__.setBtnCostText10 = function () {
            this.buyPopBtn1.numLbl.text = _.sprintf("+%d", this.getCostLevel10());
        };
        __egretProto__.setBtnCostText100 = function () {
            this.buyPopBtn0.numLbl.text = _.sprintf("+%d", this.getCostLevel100());
        };
        __egretProto__.setBtnCost10 = function () {
            this.buyPopBtn1.costLbl.text = Util.formatNumber(this.dataItem.cost10);
        };
        __egretProto__.setBtnCost100 = function () {
            this.buyPopBtn0.costLbl.text = Util.formatNumber(this.dataItem.cost100);
        };
        __egretProto__.setBtnSource = function () {
            var source;
            var isCost = this.isCostGold(this.dataItem.cost);
            if (this.dataItem.isHeroDead) {
                source = "btn_blue";
            }
            else {
                if (this.isUnLockHeroSkill()) {
                    isCost = this.isCostGold(this.dataItem.skillCost);
                    source = isCost ? "btn_yellow" : "btn_disabled";
                }
                else {
                    //if(this.getLevel() == 1000){
                    //	source = "btn_disabled";
                    //}
                    //else {
                    source = isCost ? "btn_blue" : "btn_disabled";
                }
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.setBtn10Source = function () {
            var source = this.isCostGold(this.dataItem.cost10) ? "btn_pop_blue" : "btn_pop_disabled";
            this.buyPopBtn1.setBtnSkinName(source);
        };
        __egretProto__.setBtn100Source = function () {
            var source = this.isCostGold(this.dataItem.cost100) ? "btn_pop_blue" : "btn_pop_disabled";
            this.buyPopBtn0.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HeroesItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HeroesItemRenderer = HeroesItemRenderer;
    HeroesItemRenderer.prototype.__class__ = "uiskins.HeroesItemRenderer";
})(uiskins || (uiskins = {}));
