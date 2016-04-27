var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MasterPrestigeItemRenderer = (function (_super) {
        __extends(MasterPrestigeItemRenderer, _super);
        function MasterPrestigeItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.MasterPrestigeItemRendererSkin;
        }
        var __egretProto__ = MasterPrestigeItemRenderer.prototype;
        __egretProto__.isUnlock = function () {
            //return gm.dataManage.isUnlockPrestige();
            return gm.dataManage.master.isUnlockSkill(this.data.id);
        };
        __egretProto__.onPrestigeSkillPanel = function () {
            var data = {
                isUnlock: this.isUnlock()
            };
            gm.guiLayer.addElement(new PrestigeSkillPanel(data));
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnItem) {
                if (this.isUnlock()) {
                    gm.guiLayer.addElement(new PrestigePanel());
                }
                return;
            }
            this.onPrestigeSkillPanel();
        };
        __egretProto__.onTouchBegin = function (event) {
            if (event.target == this.btnItem) {
            }
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setBtnCost();
            this.setIconDisabled();
            this.setBtnText();
            this.setBtnSource();
        };
        __egretProto__.setBtnCost = function () {
            this.btnItem.iconGroup.visible = false;
        };
        __egretProto__.setIconDisabled = function () {
            if (this.isUnlock()) {
                this.iconDisabled.visible = false;
            }
            else {
                this.iconDisabled.visible = true;
            }
        };
        __egretProto__.setBtnText = function () {
            var text;
            if (this.isUnlock()) {
                text = "蜕变";
            }
            else {
                text = _.sprintf("%d级解锁", Conf.masterSkill[this.data.id].unlock);
                ;
            }
            this.btnItem.textLbl.text = text;
        };
        __egretProto__.setBtnSource = function () {
            var source = this.isUnlock() ? "btn_orange" : "btn_disabled";
            this.btnItem.setBtnSkinName(source);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return MasterPrestigeItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.MasterPrestigeItemRenderer = MasterPrestigeItemRenderer;
    MasterPrestigeItemRenderer.prototype.__class__ = "uiskins.MasterPrestigeItemRenderer";
})(uiskins || (uiskins = {}));
