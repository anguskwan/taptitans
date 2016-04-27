/**
 *
 * @author
 *
 */
var EquipLevelUpPanel = (function (_super) {
    __extends(EquipLevelUpPanel, _super);
    function EquipLevelUpPanel(currSelectItem, currEquipValue, nextEquipValue) {
        _super.call(this);
        this.currSelectItem = currSelectItem;
        this.currEquipValue = currEquipValue;
        this.nextEquipValue = nextEquipValue;
        this.arrName = ["weapon", "mantle", "headpiece", "wing", "armor", "sword"];
        this.skinName = skins.dialog.EquipLevelUpPanelSkin;
    }
    var __egretProto__ = EquipLevelUpPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInit();
    };
    __egretProto__.onInit = function () {
        this.setIconImg();
        this.setEquipText();
        this.setCurrSkillDescText();
        this.setNextSkill();
        this.setCurrStarGroup();
        this.setNextStarGroup();
    };
    __egretProto__.setIconImg = function () {
        var index = this.currSelectItem.type - 1;
        var name = this.arrName[index];
        var num = this.currSelectItem.num;
        this.iconImg.source = _.sprintf("equip_%s%d", name, num);
    };
    __egretProto__.setEquipText = function () {
        this.equipLbl.text = this.currSelectItem.name;
    };
    __egretProto__.setCurrSkillDescText = function () {
        var name;
        var desc;
        var meta = Conf.equipSkill[this.currEquipValue.skill];
        var rareStarArr = [0, 3, 4, 5];
        var rareInitStarArr = { 3: 0, 4: 1, 5: 2 };
        var star = rareStarArr[this.currSelectItem.rare];
        var step = rareInitStarArr[star] + this.currEquipValue.step;
        if (this.currEquipValue.skill == 9) {
            var heroMeta = Conf.hero[this.currEquipValue.target];
            name = meta.name + heroMeta.name;
            desc = _.sprintf(meta.desc, heroMeta.name, meta["lv" + step] * 100);
        }
        else {
            name = meta.name;
            desc = _.sprintf(meta.desc, meta["lv" + step] * 100);
        }
        Util.setStyleText(this.currSkillDescLbl, _.sprintf("<font color='%d'>%s</font>:%s", gm.gameUI.getEquipSkillColor(this.currEquipValue.skill), name, desc));
    };
    __egretProto__.setNextSkill = function () {
        var name;
        var desc;
        var meta = Conf.equipSkill[this.nextEquipValue.skill];
        var rareStarArr = [0, 3, 4, 5];
        var rareInitStarArr = { 3: 0, 4: 1, 5: 2 };
        var star = rareStarArr[this.currSelectItem.rare];
        var step = rareInitStarArr[star] + this.nextEquipValue.step;
        if (this.nextEquipValue.skill == 9) {
            var heroMeta = Conf.hero[this.nextEquipValue.target];
            name = meta.name + heroMeta.name;
            desc = _.sprintf(meta.desc, heroMeta.name, meta["lv" + step] * 100);
        }
        else {
            name = meta.name;
            desc = _.sprintf(meta.desc, meta["lv" + step] * 100);
        }
        this.nextSkillDescLbl.text = desc;
        this.nextSkillTitleLbl.text = name;
        this.nextSkillTitleLbl.textColor = gm.gameUI.getEquipSkillColor(this.nextEquipValue.skill);
    };
    __egretProto__.setCurrStarGroup = function () {
        var rareStarArr = [0, 3, 4, 5];
        var rareInitStarArr = { 3: 0, 4: 1, 5: 2 };
        var star = rareStarArr[this.currSelectItem.rare];
        var step = rareInitStarArr[star] + this.currEquipValue.step;
        for (var i = 0; i < step; i++) {
            var starImg = new egret.gui.UIAsset();
            starImg.source = "equip_icon_star_on";
            this.currStarGroup.addElement(starImg);
        }
    };
    __egretProto__.setNextStarGroup = function () {
        var rareStarArr = [0, 3, 4, 5];
        var rareInitStarArr = { 3: 0, 4: 1, 5: 2 };
        var star = rareStarArr[this.currSelectItem.rare];
        var step = rareInitStarArr[star] + this.nextEquipValue.step;
        for (var i = 0; i < step; i++) {
            var starImg = new egret.gui.UIAsset();
            starImg.source = "equip_icon_star_on";
            this.nextStarGroup.addElement(starImg);
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    return EquipLevelUpPanel;
})(egret.gui.SkinnableContainer);
EquipLevelUpPanel.prototype.__class__ = "EquipLevelUpPanel";
