/**
 *
 * @author
 *
 */
var MatchRewardLayer = (function (_super) {
    __extends(MatchRewardLayer, _super);
    function MatchRewardLayer() {
        _super.call(this);
        this.kSubTag = 1;
        this.kNameTag = 0;
        this.kDiamondTag = 1;
        this.kWeaponTag = 2;
        this.kDiamondNumTag = 1;
        this.kWeaponNumTag = 1;
        this.skinName = skins.dialog.MatchRewardLayerSkin;
    }
    var __egretProto__ = MatchRewardLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initShowRankReward();
        this.cacheAsBitmap = true;
    };
    __egretProto__.initShowRankReward = function () {
        var meta = Conf.contest;
        for (var i = 1; i <= 11; i++) {
            var itemGroup = this["group" + i].getElementAt(this.kSubTag);
            var diamondGroup = itemGroup.getElementAt(this.kDiamondTag);
            var weaponGroup = itemGroup.getElementAt(this.kWeaponTag);
            var nameLbl = itemGroup.getElementAt(this.kNameTag);
            var diamondLbl = diamondGroup.getElementAt(this.kDiamondNumTag);
            var weaponLbl = weaponGroup.getElementAt(this.kWeaponNumTag);
            nameLbl.text = this.getRangeToName(meta[i].range);
            diamondLbl.text = _.sprintf("%d钻石", meta[i].diamond);
            weaponLbl.text = _.sprintf("%d武器升级", meta[i].weapon);
        }
    };
    __egretProto__.getRangeToName = function (range) {
        var min = range[0];
        var max = range[1];
        if (min == max) {
            return _.sprintf("第%d名", min);
        }
        else {
            return _.sprintf("第%d-%d名", min, max);
        }
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
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MatchRewardLayer;
})(egret.gui.SkinnableComponent);
MatchRewardLayer.prototype.__class__ = "MatchRewardLayer";
var MatchHardRewardLayer = (function (_super) {
    __extends(MatchHardRewardLayer, _super);
    function MatchHardRewardLayer() {
        _super.call(this);
        this.kCrystalTag = 3;
        this.kCrystalNumTag = 1;
        this.skinName = skins.dialog.MatchHardRewardLayerSkin;
    }
    var __egretProto__ = MatchHardRewardLayer.prototype;
    __egretProto__.initShowRankReward = function () {
        var meta = Conf.contestHard;
        for (var i = 1; i <= 11; i++) {
            var itemGroup = this["group" + i].getElementAt(this.kSubTag);
            var diamondGroup = itemGroup.getElementAt(this.kDiamondTag);
            var weaponGroup = itemGroup.getElementAt(this.kWeaponTag);
            var crystalGroup = itemGroup.getElementAt(this.kCrystalTag);
            var nameLbl = itemGroup.getElementAt(this.kNameTag);
            var diamondLbl = diamondGroup.getElementAt(this.kDiamondNumTag);
            var weaponLbl = weaponGroup.getElementAt(this.kWeaponNumTag);
            var crystalLbl = crystalGroup.getElementAt(this.kCrystalNumTag);
            nameLbl.text = this.getRangeToName(meta[i].range);
            diamondLbl.text = _.sprintf("%d钻石", meta[i].diamond);
            weaponLbl.text = _.sprintf("%d武器升级", meta[i].weapon);
            crystalLbl.text = _.sprintf("%d水晶", meta[i].crystal);
        }
    };
    return MatchHardRewardLayer;
})(MatchRewardLayer);
MatchHardRewardLayer.prototype.__class__ = "MatchHardRewardLayer";
