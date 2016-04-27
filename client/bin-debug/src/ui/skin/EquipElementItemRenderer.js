var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EquipElementItemRenderer = (function (_super) {
        __extends(EquipElementItemRenderer, _super);
        function EquipElementItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.EquipElementItemRendererSkin;
        }
        var __egretProto__ = EquipElementItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            event.stopPropagation();
            var value;
            for (var i = 1; i <= _.size(this.data); i++) {
                if (event.target == this["selectItem" + i]) {
                    var idx = i - 1;
                    value = this.data[idx];
                    var eid;
                    if (this.data[idx].meta) {
                        eid = this.data[idx].meta.id;
                    }
                    else {
                        eid = -1;
                    }
                    var equips = gm.dataManage.equips;
                    if (equips[eid] || eid == -1) {
                        gm.postMessage(consts.kMessageSelectEquip, { name: value.name, index: value.index, eid: eid });
                    }
                    else
                        gm.postMessage(consts.kMessageShowToastLayer, "公会商店获得");
                }
            }
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setSelectItems();
        };
        __egretProto__.setSelectItems = function () {
            for (var i = 0; i < 3; i++) {
                var index = i + 1;
                if (this.data[i]) {
                    this.setSelectItem(this.data[i], index);
                    this["selectItem" + index].visible = true;
                }
                else {
                    this["selectItem" + index].visible = false;
                }
            }
        };
        __egretProto__.setSelectItem = function (value, index) {
            this["selectItem" + index].dataItem = value;
            this["selectItem" + index].changeDataItem();
        };
        return EquipElementItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.EquipElementItemRenderer = EquipElementItemRenderer;
    EquipElementItemRenderer.prototype.__class__ = "uiskins.EquipElementItemRenderer";
})(uiskins || (uiskins = {}));
