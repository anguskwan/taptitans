/**
 *
 * @author
 *
 */
var BuyTenTimesPanel = (function (_super) {
    __extends(BuyTenTimesPanel, _super);
    function BuyTenTimesPanel(data) {
        _super.call(this);
        this.kTagName = 0;
        this.kTagIconImg = 1;
        this.kTagReward = 3;
        this._value = data;
        this.skinName = skins.dialog.BuyTenTimesPanelSkin;
    }
    var __egretProto__ = BuyTenTimesPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInitRewradUI();
    };
    __egretProto__.onInitRewradUI = function () {
        _.each(this._value, function (v, i) {
            var elementTypeSource;
            if (v.type == "equip") {
                var meta = Conf.equipMeta[v.id];
                var name = gm.gameUI.getEquipTypeToName(meta.type);
                var icon = _.sprintf("equip_%s%d", name, meta.num);
                elementTypeSource = {
                    icon: icon,
                    name: meta.name,
                    num: 1
                };
            }
            else {
                elementTypeSource = gm.gameUI.getElementTypeSource(v.type);
                elementTypeSource["num"] = v.num;
            }
            this.setItemInfoUI(this["item" + i], elementTypeSource.icon, elementTypeSource.name, elementTypeSource.num);
        }.bind(this));
    };
    __egretProto__.setItemInfoUI = function (itemGroup, iconSource, name, num) {
        var iconImg = itemGroup.getElementAt(this.kTagIconImg);
        iconImg.source = iconSource;
        var nameLbl = itemGroup.getElementAt(this.kTagName);
        nameLbl.text = name;
        var numLbl = itemGroup.getElementAt(this.kTagReward);
        numLbl.text = Util.formatNumber(num);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rewardBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return BuyTenTimesPanel;
})(egret.gui.SkinnableComponent);
BuyTenTimesPanel.prototype.__class__ = "BuyTenTimesPanel";
