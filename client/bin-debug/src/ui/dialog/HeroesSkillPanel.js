/**
 *
 * @author
 *
 */
var HeroesSkillPanel = (function (_super) {
    __extends(HeroesSkillPanel, _super);
    function HeroesSkillPanel(data) {
        _super.call(this);
        this.value = data;
        this.skinName = skins.dialog.HeroesSkillPanelSkin;
    }
    var __egretProto__ = HeroesSkillPanel.prototype;
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
        this.changeItemStatus();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.changeItemStatus = function () {
        this.nameLbl.text = this.value.name;
        this.lvLbl.text = this.value.lv;
        this.dpsLbl.text = this.value.dps;
        this.iconImg.source = this.value.iconSource;
        //skills
        //changeItemStatus(){
        //	this.lvLbl.text = this.value.unlockLv;
        //	this.nameLbl.text = this.value.name;
        //	this.descLbl.text = this.value.desc;
        //	this.iconImg.source = this.value.iconSource;
        //	this.unlockGroup.visible = !this.value.isUnlock;
        //	this.iconDisabled.visible = !this.value.isUnlock;
        //}
        //name : v["name"],
        //	skillType : v["skill"],
        //	value : v["value"],
        //	enabled : hero.skill >= id
        var data;
        _.each(this.value.skills, function (v, i) {
            var index = i + 1;
            data = {
                unlockLv: consts.kHeroSkillUnlockLevelArr[index].toString(),
                name: v.name,
                desc: this.getSkillDesc(v.skillType, v.value),
                iconSource: "heroskill" + this.value.id + "_" + index,
                isUnlock: v.enabled
            };
            this["skillItem" + index].dataItem = data;
            this["skillItem" + index].changeItemStatus();
        }.bind(this));
        //data = {
        //	unlockLv:"1000",
        //	name:"进化",
        //	desc:"重置这个英雄，并大幅度增加攻击力。",
        //	iconSource:"heroskill_evolution",
        //	isUnlock:false
        //};
        //this["skillItem8"].dataItem = data;
        //this["skillItem8"].changeItemStatus();
    };
    __egretProto__.getSkillDesc = function (skillType, value) {
        if (skillType == 5) {
            return _.sprintf(Conf.heroSkillDesc[skillType].desc, value * 100);
        }
        return _.sprintf(Conf.heroSkillDesc[skillType].desc, Math.floor(value * 100));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return HeroesSkillPanel;
})(egret.gui.SkinnableContainer);
HeroesSkillPanel.prototype.__class__ = "HeroesSkillPanel";
