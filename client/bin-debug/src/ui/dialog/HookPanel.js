/**
 *
 * @author
 *
 */
var HookPanel = (function (_super) {
    __extends(HookPanel, _super);
    function HookPanel() {
        _super.call(this);
        this.settingArr = [null, tt.Setting.isOpenAutoHook(), tt.Setting.isOpenAutoPrestige()];
        this.skinName = skins.dialog.HookPanelSkin;
    }
    var __egretProto__ = HookPanel.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.textInput.textDisplay.addEventListener(egret.Event.CHANGE, this.onChang.bind(this), this);
        this.onInitData();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        this.selectItemChangeStatus(target);
    };
    __egretProto__.onChang = function (event) {
        this.cancelBtn();
    };
    __egretProto__.onInitData = function () {
        this.initAllElement();
    };
    __egretProto__.initAllElement = function () {
        var data;
        for (var i = 1; i <= 2; i++) {
            if (this.settingArr[i]) {
                if (i == 1) {
                    this.hookLbl.textColor = 0x33db33;
                }
                else {
                    this.prestigeLbl.textColor = 0x33db33;
                }
            }
            else {
                if (i == 1) {
                    this.hookLbl.textColor = 0xFFFFFF;
                }
                else {
                    this.prestigeLbl.textColor = 0xFFFFFF;
                }
            }
            data = {
                isSelect: this.settingArr[i]
            };
            this["select" + i].dataItem = data;
            this["select" + i].changeDataItem();
        }
        this.textInput.text = "" + tt.Setting.getAutoPrestigeStage();
    };
    __egretProto__.selectItemChangeStatus = function (target) {
        var index = -1;
        for (var i = 1; i <= 2; i++) {
            if (target == this["select" + i]) {
                index = i;
                //select item
                if (this.settingArr[i]) {
                    if (i == 1) {
                        tt.Setting.setOpenAutoHook(false);
                        this.settingArr[i] = false;
                        this.hookLbl.textColor = 0xFFFFFF;
                    }
                    else {
                        tt.Setting.setOpenAutoPrestige(false);
                        this.settingArr[i] = false;
                        this.prestigeLbl.textColor = 0xFFFFFF;
                    }
                }
                else {
                    if (i == 1) {
                        tt.Setting.setOpenAutoHook(true);
                        this.settingArr[i] = true;
                        this.hookLbl.textColor = 0x33db33;
                    }
                    else {
                        var stage;
                        if (this.isRegExpCode(this.textInput.text)) {
                            stage = parseInt(this.textInput.text);
                            if (stage < 600) {
                                stage = 600;
                            }
                        }
                        else {
                            stage = 600;
                        }
                        tt.Setting.setAutoPrestigeStage(stage);
                        tt.Setting.setOpenAutoPrestige(true);
                        this.settingArr[i] = true;
                        this.prestigeLbl.textColor = 0x33db33;
                        this.textInput.text = "" + tt.Setting.getAutoPrestigeStage();
                    }
                }
            }
        }
        if (index != -1) {
            for (var i = 1; i <= 2; i++) {
                this["select" + i].dataItem.isSelect = this.settingArr[i];
                this["select" + i].changeDataItem();
            }
        }
    };
    __egretProto__.isRegExpCode = function (str) {
        var re = new RegExp("^[0-9][0-9]{1,5}$");
        return (str.search(re) != -1);
    };
    __egretProto__.cancelBtn = function () {
        tt.Setting.setOpenAutoPrestige(false);
        this.settingArr[2] = false;
        this.prestigeLbl.textColor = 0xFFFFFF;
        this["select2"].dataItem.isSelect = this.settingArr[2];
        this["select2"].changeDataItem();
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return HookPanel;
})(egret.gui.SkinnableContainer);
HookPanel.prototype.__class__ = "HookPanel";
