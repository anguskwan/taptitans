var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HalidomAllRenderer = (function (_super) {
        __extends(HalidomAllRenderer, _super);
        function HalidomAllRenderer() {
            _super.call(this);
            this.skinName = skins.components.HalidomAllSkin;
        }
        var __egretProto__ = HalidomAllRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
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
        };
        __egretProto__.onTouchBtnClick = function (event) {
            var layer = new ArtifactList();
            gm.guiLayer.addElement(layer);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return HalidomAllRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HalidomAllRenderer = HalidomAllRenderer;
    HalidomAllRenderer.prototype.__class__ = "uiskins.HalidomAllRenderer";
})(uiskins || (uiskins = {}));
