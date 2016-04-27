var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var PKHeroItemRenderer = (function (_super) {
        __extends(PKHeroItemRenderer, _super);
        function PKHeroItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.PKHeroItemRendererSkin;
        }
        var __egretProto__ = PKHeroItemRenderer.prototype;
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //item
            var p1Win = this.isLeftOrRightWin(this.data.value);
            var p2Win = p1Win == -1 ? -1 : (p1Win == 1 ? 0 : 1);
            var id = this.data.value.id;
            var meta = Conf.hero[id];
            this.onChangeItem("left", id, meta, this.data.value.p1, p1Win);
            this.onChangeItem("right", id, meta, this.data.value.p2, p2Win);
        };
        __egretProto__.isLeftOrRightWin = function (data) {
            var p1 = data.p1;
            var p2 = data.p2;
            if (p1.dps == p2.dps) {
                return -1;
            }
            if (p1.dps > p2.dps) {
                return 1;
            }
            return 0;
        };
        __egretProto__.onChangeItem = function (type, id, meta, data, isWin) {
            var dataItem;
            dataItem = {
                isWin: isWin,
                name: meta.name,
                heroImgSource: "hero" + id,
                dps: Util.formatNumber(data.dps),
                nerf: data.nerf,
                type: type
            };
            this[type + "Item"].dataItem = dataItem;
            this[type + "Item"].changeItemStatus();
        };
        return PKHeroItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.PKHeroItemRenderer = PKHeroItemRenderer;
    PKHeroItemRenderer.prototype.__class__ = "uiskins.PKHeroItemRenderer";
})(uiskins || (uiskins = {}));
