var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MasterPlayerItemRenderer = (function (_super) {
        __extends(MasterPlayerItemRenderer, _super);
        function MasterPlayerItemRenderer() {
            _super.call(this);
            this._clickBtnTime = 0;
            this._showPopBtnTime = 0;
            this.dataItem = {};
            this.isPlayingAni = false;
            this.skinName = skins.components.MasterPlayerItemRendererSkin;
        }
        var __egretProto__ = MasterPlayerItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.btnItem.textLbl.text = "等级提升";
            this.buyPopBtn0.numLbl.text = "+100";
            this.buyPopBtn1.numLbl.text = "+10";
        };
        __egretProto__.initData = function () {
            this.dataItem = {
                damage: this.getDmg(),
                cost: this.getCost(),
                addDmg: this.getAddDmg(),
                cost10: this.getCost10(),
                cost100: this.getCost100()
            };
        };
        __egretProto__.getName = function () {
            return gm.dataManage.data.name || "英雄";
        };
        __egretProto__.getLevel = function () {
            return gm.dataManage.data.masterLevel;
        };
        __egretProto__.getCost = function () {
            return gm.dataManage.master.getUpgradePrice();
        };
        __egretProto__.getCost10 = function () {
            return gm.dataManage.master.getUpgradePrice(10);
        };
        __egretProto__.getCost100 = function () {
            return gm.dataManage.master.getUpgradePrice(100);
        };
        __egretProto__.getDmg = function () {
            return gm.dataManage.master.getTapDamage();
        };
        __egretProto__.getAddDmg = function () {
            return gm.dataManage.master.getNextLevelDMG();
        };
        __egretProto__.isCostGold = function (cost) {
            return gm.dataManage.data.gold >= cost;
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setLevel();
            this.setDamage();
            this.setBuyPopGroup();
            this.setBtnAddDamage();
            this.setBtnCost();
            this.setBtnCost10();
            this.setBtnCost100();
            this.setBtnSource();
            this.setBtn10Source();
            this.setBtn100Source();
            this.setNewTipImg();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (this.isCostGold(this.dataItem.cost)) {
                    this.setTutorial();
                }
                this.setTouchTapPopUpDialog(function () {
                    gm.dataManage.master.levelUp(1);
                }.bind(this));
            }
            if (event.target == this.buyPopBtn0) {
                this.setTouchBeginBuyPopUpDialog();
                gm.dataManage.master.levelUp(100);
            }
            if (event.target == this.buyPopBtn1) {
                this.setTouchBeginBuyPopUpDialog();
                gm.dataManage.master.levelUp(10);
            }
            if (event.target == this.selectRect) {
                gm.gameUI.isAddNewEquip = false;
                this.setNewTipImg();
                gm.postMessage(consts.kMessageAddNewEquip);
                gm.guiLayer.addElement(new LoadingResLayer("equipres", function () {
                    var ly = new EquipLayer();
                    gm.guiLayer.addElement(ly);
                }.bind(this)));
            }
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
                this._clickBtnTime = new Date().getTime();
                this.setTouchBeginPopUpDialog();
            }
        };
        __egretProto__.setTouchBeginPopUpDialog = function () {
            if (this.getLevel() <= 22) {
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
            if (this.getLevel() <= 22) {
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
            if (offsetTime <= 300) {
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
        __egretProto__.setNewTipImg = function () {
            if (gm.gameUI.isAddNewEquip) {
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
        __egretProto__.setTutorial = function () {
            if (!gm.dataManage.data.tutorials[consts.kTutorialClickMasterUpgrade]) {
                gm.dataManage.setTutorialFinish(consts.kTutorialClickMaster);
                gm.dataManage.setTutorialFinish(consts.kTutorialClickMasterUpgrade);
                gm.postMessage(consts.kMessageTutorialUpdate);
            }
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = this.getName();
        };
        __egretProto__.setLevel = function () {
            this.lvLbl.text = this.getLevel() + "";
        };
        __egretProto__.setDamage = function () {
            this.damageLbl.text = Util.formatNumber(this.dataItem.damage);
        };
        __egretProto__.setIconImg = function () {
            var avatar = gm.dataManage.data.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
        };
        __egretProto__.setBtnAddDamage = function () {
            this.btnItem.upgradeLbl.text = _.sprintf("+ %s DMG", Util.formatNumber(this.dataItem.addDmg));
        };
        __egretProto__.setBtnCost = function () {
            this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
        };
        __egretProto__.setBtnCost10 = function () {
            this.buyPopBtn1.costLbl.text = Util.formatNumber(this.dataItem.cost10);
        };
        __egretProto__.setBtnCost100 = function () {
            this.buyPopBtn0.costLbl.text = Util.formatNumber(this.dataItem.cost100);
        };
        __egretProto__.setBtnSource = function () {
            var source = this.isCostGold(this.dataItem.cost) ? "btn_orange" : "btn_disabled";
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.setBtn10Source = function () {
            var source = this.isCostGold(this.dataItem.cost10) ? "btn_pop_orange" : "btn_pop_disabled";
            this.buyPopBtn1.setBtnSkinName(source);
        };
        __egretProto__.setBtn100Source = function () {
            var source = this.isCostGold(this.dataItem.cost100) ? "btn_pop_orange" : "btn_pop_disabled";
            this.buyPopBtn0.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return MasterPlayerItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.MasterPlayerItemRenderer = MasterPlayerItemRenderer;
    MasterPlayerItemRenderer.prototype.__class__ = "uiskins.MasterPlayerItemRenderer";
})(uiskins || (uiskins = {}));
