var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HalidomBuyArtifactItemRenderer = (function (_super) {
        __extends(HalidomBuyArtifactItemRenderer, _super);
        function HalidomBuyArtifactItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.HalidomBuyArtifactItemRendererSkin;
        }
        var __egretProto__ = HalidomBuyArtifactItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.btnBigItem.iconImg.source = "relic";
            this.btnBigItem.textLbl.text = "购买下一件神器";
        };
        __egretProto__.getArtifactCost = function () {
            return gm.dataManage.artifact.getArtifactCost();
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            //直接更改资源
            this.setBtnCost();
        };
        __egretProto__.setBtnCost = function () {
            this.btnBigItem.iconLbl.text = Util.formatNumber(this.getArtifactCost());
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.btnBigItem) {
                gm.dataManage.artifact.buyNewArtifact(function (obj) {
                    gm.postMessage(consts.kMessageBuyNewArtifact, obj.id);
                }.bind(this));
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HalidomBuyArtifactItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HalidomBuyArtifactItemRenderer = HalidomBuyArtifactItemRenderer;
    HalidomBuyArtifactItemRenderer.prototype.__class__ = "uiskins.HalidomBuyArtifactItemRenderer";
})(uiskins || (uiskins = {}));
