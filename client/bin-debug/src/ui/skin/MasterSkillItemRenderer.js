var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MasterSkillItemRenderer = (function (_super) {
        __extends(MasterSkillItemRenderer, _super);
        function MasterSkillItemRenderer() {
            _super.call(this);
            this.isPlayingAni = false;
            this.dataItem = {};
            this.skinName = skins.components.MasterSkillItemRendererSkin;
        }
        var __egretProto__ = MasterSkillItemRenderer.prototype;
        __egretProto__.initData = function () {
            this.dataItem = {
                cost: this.getCost(),
                level: this.getSkillLevel(),
                value: this.getDescValue(),
                nextValue: this.getNextValue(),
                duration: this.getSkillDuration(),
                cd: this.getSkillCD()
            };
        };
        __egretProto__.getName = function () {
            return Conf.masterSkill[this.data.id].name;
        };
        __egretProto__.getCost = function () {
            return formula.masterSkillUpgradeCost(gm.dataManage.data, this.data.id);
        };
        __egretProto__.getDescValue = function () {
            return formula.masterSkillValue(gm.dataManage.data, this.data.id);
        };
        __egretProto__.getNextValue = function () {
            return Conf.masterSkill[this.data.id].upgrade;
        };
        __egretProto__.getSkillLevel = function () {
            return gm.dataManage.data.masterSkills[this.data.id].level;
        };
        __egretProto__.getSkillCD = function () {
            return formula.masterSkillCoolDown(gm.dataManage.data, this.data.id);
        };
        __egretProto__.getSkillDuration = function () {
            return formula.masterSkillDuration(gm.dataManage.data, this.data.id);
        };
        __egretProto__.isUnlock = function () {
            return gm.dataManage.master.isUnlockSkill(this.data.id);
        };
        __egretProto__.isCostGold = function (cost) {
            return gm.dataManage.data.gold >= cost;
        };
        __egretProto__.upgradeAddDmg = function (dmg, id) {
            var arr = [
                "",
                "+ %s",
                "+ %s",
                "+ %s%%",
                "+ %s%%",
                "+ %s%%",
                "+ %s%%"
            ];
            var showDmg = dmg;
            if (id > 2) {
                showDmg = showDmg * 100;
            }
            return _.sprintf(arr[id], showDmg);
        };
        __egretProto__.upgradeDesc = function (dmg, id) {
            var showDmg = dmg;
            if (id > 2) {
                showDmg = showDmg * 100;
            }
            return _.sprintf(Conf.masterSkill[id].desc, showDmg);
        };
        __egretProto__.masterSkillPanel = function () {
            var data = {
                name: this.getName(),
                iconSource: "icon_skill" + this.data.id,
                isUnlock: this.isUnlock(),
                lv: this.getSkillLevel(),
                unlockDesc: _.sprintf("%d级解锁", Conf.masterSkill[this.data.id].unlock),
                explainDesc1: this.upgradeDesc(this.dataItem.value, this.data.id),
                explainDesc2: _.sprintf("持续时间：%d秒钟 | 冷却：%d秒钟", Math.floor(this.dataItem.duration), Math.floor(this.dataItem.cd))
            };
            gm.guiLayer.addElement(new MasterSkillPanel(data));
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (this.isUnlock()) {
                    gm.dataManage.master.upgradeSkill(this.data.id);
                }
                return;
            }
            this.masterSkillPanel();
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            //直接更改资源
            this.setName();
            this.setIconImg();
            this.setNewTipImg();
            this.setIconDisabled();
            this.setLevel();
            this.setExplain();
            this.setBtnCost();
            this.setBtnAddDamage();
            this.setBtnText();
            this.setBtnSource();
        };
        __egretProto__.setNewTipImg = function () {
            if (this.isUnlock() && this.dataItem.level == 0 && this.isCostGold(this.dataItem.cost)) {
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
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "icon_skill" + this.data.id;
        };
        __egretProto__.setIconDisabled = function () {
            if (!this.isUnlock() || this.dataItem.level == 0) {
                this.iconDisabled.visible = true;
            }
            else {
                this.iconDisabled.visible = false;
            }
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = this.getName();
        };
        __egretProto__.setLevel = function () {
            this.lvLbl.text = this.dataItem.level + "";
        };
        __egretProto__.setExplain = function () {
            this.explainLbl.text = this.upgradeDesc(this.dataItem.value, this.data.id);
        };
        __egretProto__.setBtnCost = function () {
            if (this.isUnlock()) {
                this.btnItem.iconGroup.visible = true;
                this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
            }
            else {
                this.btnItem.iconGroup.visible = false;
            }
        };
        __egretProto__.setBtnAddDamage = function () {
            var text;
            if (this.isUnlock()) {
                text = this.upgradeAddDmg(this.dataItem.nextValue, this.data.id);
            }
            else {
                text = "";
            }
            this.btnItem.upgradeLbl.text = text;
        };
        __egretProto__.setBtnText = function () {
            var text;
            if (this.isUnlock()) {
                text = "等级提升";
            }
            else {
                text = _.sprintf("%d级解锁", Conf.masterSkill[this.data.id].unlock);
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnSource = function () {
            var source;
            if (this.isUnlock()) {
                source = this.isCostGold(this.dataItem.cost) ? "btn_orange" : "btn_disabled";
            }
            else {
                source = "btn_disabled";
            }
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return MasterSkillItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.MasterSkillItemRenderer = MasterSkillItemRenderer;
    MasterSkillItemRenderer.prototype.__class__ = "uiskins.MasterSkillItemRenderer";
})(uiskins || (uiskins = {}));
