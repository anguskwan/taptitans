/**
 *
 * @author
 *
 */
var MatchStartPanel = (function (_super) {
    __extends(MatchStartPanel, _super);
    function MatchStartPanel() {
        _super.call(this);
        this.kDiamondTag = 1;
        this.kWeaponTag = 2;
        this.kCrystalTag = 3;
        this.kDiamondNumTag = 1;
        this.kWeaponNumTag = 1;
        this.kCrystalNumTag = 1;
        this.skinName = skins.dialog.MatchStartPanelSkin;
    }
    var __egretProto__ = MatchStartPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initShowGeneralRankReward();
        //this.initShowHardRankReward();
        //this.onSetHardMatchStart();
    };
    __egretProto__.initShowGeneralRankReward = function () {
        var meta = Conf.contest;
        for (var i = 1; i <= 3; i++) {
            var itemGroup = this["group" + i];
            var diamondGroup = itemGroup.getElementAt(this.kDiamondTag);
            var weaponGroup = itemGroup.getElementAt(this.kWeaponTag);
            var diamondLbl = diamondGroup.getElementAt(this.kDiamondNumTag);
            var weaponLbl = weaponGroup.getElementAt(this.kWeaponNumTag);
            diamondLbl.text = _.sprintf("%d钻石", meta[i].diamond);
            weaponLbl.text = _.sprintf("%d武器升级", meta[i].weapon);
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        this.onTouchTarget(event.target);
    };
    __egretProto__.onTouchTarget = function (target) {
        var ly;
        var panel;
        if (target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (target == this.matchBtn) {
            gm.guiLayer.removeElement(this);
            panel = new MatchPrestigePanel(false);
            gm.guiLayer.addElement(panel);
        }
        if (target == this.touchGroup) {
            gm.guiLayer.removeElement(this);
            ly = new MatchRewardLayer();
            gm.guiLayer.addElement(ly);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MatchStartPanel;
})(egret.gui.SkinnableComponent);
MatchStartPanel.prototype.__class__ = "MatchStartPanel";
