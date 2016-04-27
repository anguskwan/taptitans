/**
 *
 * @author
 *
 */
var MessageGetRewardPanel = (function (_super) {
    __extends(MessageGetRewardPanel, _super);
    function MessageGetRewardPanel(title, value) {
        _super.call(this);
        this._title = title;
        this._value = value;
        this.skinName = skins.dialog.MessageGetRewardPanelSkin;
    }
    var __egretProto__ = MessageGetRewardPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setTitleText();
        this.initItemReward();
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
    __egretProto__.setTitleText = function () {
        this.titleLbl.text = this._title;
    };
    __egretProto__.addItem = function (type, numCount) {
        var icon;
        var name;
        var currNum;
        if (type == "equip") {
            var meta = Conf.equipMeta[numCount];
            var typeName = gm.gameUI.getEquipTypeToName(meta.type);
            name = meta.name;
            icon = _.sprintf("equip_%s%d", typeName, meta.num);
            currNum = 1;
        }
        else {
            icon = gm.gameUI.getElementTypeSource(type).icon;
            name = gm.gameUI.getElementTypeSource(type).name;
            currNum = numCount;
        }
        var iconImg = new egret.gui.UIAsset();
        iconImg.width = 58;
        iconImg.height = 58;
        iconImg.source = icon;
        var group = new egret.gui.Group();
        group.width = 58;
        group.height = 58;
        var title = new egret.gui.Label();
        title.size = 18;
        title.fontFamily = "Arial";
        title.horizontalCenter = 0;
        title.verticalCenter = -42;
        title.text = name;
        var num = new egret.gui.Label();
        num.size = 18;
        num.fontFamily = "Arial";
        num.horizontalCenter = 0;
        num.verticalCenter = 42;
        num.text = Util.formatNumber(currNum);
        group.addElement(title);
        group.addElement(iconImg);
        group.addElement(num);
        this.getGroup.addElement(group);
    };
    __egretProto__.initItemReward = function () {
        _.each(this._value, function (v) {
            if (v.type == "equip") {
                this.addItem(v.type, v.id);
            }
            else {
                this.addItem(v.type, v.num);
            }
        }.bind(this));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return MessageGetRewardPanel;
})(egret.gui.SkinnableComponent);
MessageGetRewardPanel.prototype.__class__ = "MessageGetRewardPanel";
