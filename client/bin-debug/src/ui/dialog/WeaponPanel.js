/**
 *
 * @author
 *
 */
var WeaponPanel = (function (_super) {
    __extends(WeaponPanel, _super);
    function WeaponPanel() {
        _super.call(this);
        this.skinName = skins.dialog.WeaponPanelSkin;
        this.selectIndex = -1;
        this.priceArr = [50, 50, 60, 60, 80, 80, 100];
    }
    var __egretProto__ = WeaponPanel.prototype;
    __egretProto__.setResetBtn = function (index) {
        this.selectIndex = index;
        var weaponLevel = gm.dataManage.data.heroWeapons[index] || 0;
        this.resetGroup.visible = weaponLevel != 0;
        this.resetGroupTotal.visible = weaponLevel != 0;
        var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
        var idx = Math.min(6, resetWeapon);
        var price = this.priceArr[idx];
        this.crystalLbl.text = price + "";
    };
    __egretProto__.updateResetStatus = function () {
        this.setResetBtn(this.selectIndex);
        for (var i = 1; i <= 33; i++) {
            var weaponLevel = gm.dataManage.data.heroWeapons[i] || 0;
            this["selectItem" + i].dataItem.isSelect = (this.selectIndex == i);
            this["selectItem" + i].dataItem.lv = "" + weaponLevel;
            this["selectItem" + i].changeDataItem();
        }
        var minLv = 0;
        var newArray = _.filter(gm.dataManage.data.heroWeapons, function (num) {
            return num != 0;
        }.bind(this));
        if (_.size(newArray) == 33) {
            minLv = _.min(newArray);
        }
        this.currLevelLbl.text = minLv + "";
        this.currDPSLbl.text = _.sprintf("英雄DPS x%d", minLv * 10);
        this.nextLevelLbl.text = (minLv + 1) + "";
        this.nextDPSLbl.text = _.sprintf("英雄DPS x%d", (minLv + 1) * 10);
        var crystal = gm.dataManage.data.crystal;
        this.lblTotal.text = _.sprintf("%d", crystal);
    };
    __egretProto__.onResetWeapon = function () {
        if (this.selectIndex == -1) {
            return;
        }
        var resetWeapon = gm.dataManage.data.dailyEvent.resetWeapon || 0;
        var idx = Math.min(6, resetWeapon);
        var price = this.priceArr[idx];
        if (!gm.dataManage.costMoney(price, 'crystal')) {
            gm.postMessage(consts.kMessageShowToastLayer, "水晶不足");
            return false;
        }
        gm.gameUI.showLoadingLayer();
        var wid = this.selectIndex;
        gm.dataManage.resetWeapon(wid, function () {
            gm.dataManage.useWeaponItem(function () {
                this.updateResetStatus();
                gm.postMessage(consts.kMessageAddWeapon);
            }.bind(this));
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.setTitle = function () {
        //this.lblTitle1.text="请选择要洗的武器";
        //this.lblTitle1.text="牺牲1个现有的武器，你可以重新获得1次抽取\n武器的机会。";
    };
    __egretProto__.addBgRectColorAndCenter = function () {
        var width = gm.guiLayer.width;
        var height = gm.guiLayer.height;
        this.bgRect = new egret.gui.Rect();
        this.bgRect.width = width;
        this.bgRect.height = height;
        this.bgRect.fillColor = 0x000000;
        this.bgRect.fillAlpha = 0.5;
        this.skin.addElementAt(this.bgRect, 0);
        this.width = width;
        this.height = height;
    };
    Object.defineProperty(__egretProto__, "dataItem", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.addBgRectColorAndCenter();
        this.initAllElement();
        //this.cacheAsBitmap = true;
        var crystal = gm.dataManage.data.crystal;
        this.lblTotal.text = _.sprintf("%d", crystal);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        else if (target == this.resetBtn) {
            this.onResetWeapon();
        }
        this.selectItemChangeStatus(target);
    };
    __egretProto__.setSelectItem = function (index) {
        this.selectGroup.visible = true;
        this.unSelectLbl.visible = false;
        //hero skill level
        var weaponLevel = gm.dataManage.data.heroWeapons[index] || 0;
        this.levelLbl.text = _.sprintf("武器升级：%d", weaponLevel);
        this.nameLbl.text = Conf.hero[index].name;
        this.dpsLbl.text = _.sprintf("+%d%%攻击力", weaponLevel * 50);
        this.weaponImg.source = "heroskill" + index + "_1";
        this.heroImg.source = "hero" + index;
        this.setResetBtn(index);
    };
    __egretProto__.selectItemChangeStatus = function (target) {
        var index = -1;
        for (var i = 1; i <= 33; i++) {
            if (target == this["selectItem" + i]) {
                //select target
                index = i;
                this.setSelectItem(index);
            }
        }
        if (index != -1) {
            for (var i = 1; i <= 33; i++) {
                this["selectItem" + i].dataItem.isSelect = (index == i);
                this["selectItem" + i].changeDataItem();
            }
        }
    };
    __egretProto__.initAllElement = function () {
        var data;
        for (var i = 1; i <= 33; i++) {
            var weaponLevel = gm.dataManage.data.heroWeapons[i] || 0;
            data = {
                isSelect: false,
                iconSource: "heroskill" + i + "_1",
                lv: "" + weaponLevel
            };
            this["selectItem" + i].dataItem = data;
            this["selectItem" + i].changeDataItem();
        }
        var minLv = 0;
        var newArray = _.filter(gm.dataManage.data.heroWeapons, function (num) {
            return num != 0;
        }.bind(this));
        if (_.size(newArray) == 33) {
            minLv = _.min(newArray);
        }
        this.currLevelLbl.text = minLv + "";
        this.currDPSLbl.text = _.sprintf("英雄DPS x%d", minLv * 10);
        this.nextLevelLbl.text = (minLv + 1) + "";
        this.nextDPSLbl.text = _.sprintf("英雄DPS x%d", (minLv + 1) * 10);
    };
    __egretProto__.changeItemStatus = function () {
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return WeaponPanel;
})(egret.gui.SkinnableContainer);
WeaponPanel.prototype.__class__ = "WeaponPanel";
