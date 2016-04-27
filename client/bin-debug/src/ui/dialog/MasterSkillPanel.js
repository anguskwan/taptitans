/**
 *
 * @author
 *
 */
var MasterSkillPanel = (function (_super) {
    __extends(MasterSkillPanel, _super);
    function MasterSkillPanel(data) {
        _super.call(this);
        this.value = data;
        this.skinName = skins.dialog.MasterSkillPanelSkin;
    }
    var __egretProto__ = MasterSkillPanel.prototype;
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
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.nameLbl.text = this.value.name;
        this.iconImg.source = this.value.iconSource;
        this.iconDisabled.visible = this.value.isUnlock ? ((this.value.lv == 0) ? true : false) : true;
        this.lvGroup.visible = this.value.isUnlock;
        this.unlockLbl.visible = !this.value.isUnlock;
        this.unlockLbl.text = this.value.unlockDesc;
        this.lvLbl.text = this.value.lv;
        this.explainLbl1.text = this.value.explainDesc1;
        this.explainLbl2.text = this.value.explainDesc2;
        this.addBgRectColorAndCenter();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            //            egret.gui.PopUpManager.removePopUp(this);
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MasterSkillPanel;
})(egret.gui.SkinnableContainer);
MasterSkillPanel.prototype.__class__ = "MasterSkillPanel";
