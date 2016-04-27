/**
 *
 * @author
 *
 */
var GuildBadgePanel = (function (_super) {
    __extends(GuildBadgePanel, _super);
    function GuildBadgePanel(index, cb) {
        _super.call(this);
        this._index = index;
        this._cb = cb;
        this.skinName = skins.dialog.GuildBadgePanelSkin;
    }
    var __egretProto__ = GuildBadgePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initAllElement();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rightBtn) {
            Util.invokeCallback(this._cb, this._index);
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        this.selectItemChangeStatus(event.target);
    };
    __egretProto__.selectItemChangeStatus = function (target) {
        var index = -1;
        for (var i = 0; i < 10; i++) {
            var item = this.selectGroup.getElementAt(i);
            if (target == item) {
                //select target
                index = i;
                this._index = index + 1;
            }
        }
        if (index != -1) {
            for (var i = 0; i < 10; i++) {
                var item = this.selectGroup.getElementAt(i);
                item.dataItem.isSelect = (index == i);
                item.changeDataItem();
            }
        }
    };
    __egretProto__.initAllElement = function () {
        var data;
        for (var i = 0; i < 10; i++) {
            var index = i + 1;
            var name = gm.dataManage.data.name || "英雄";
            data = {
                isSelect: (index == this._index),
                iconSource: "guild_badge" + index,
                name: name[0]
            };
            var item = this.selectGroup.getElementAt(i);
            item.dataItem = data;
            item.changeDataItem();
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildBadgePanel;
})(egret.gui.SkinnableContainer);
GuildBadgePanel.prototype.__class__ = "GuildBadgePanel";
