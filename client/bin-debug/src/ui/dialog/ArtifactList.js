/**
 *
 * @author
 *
 */
var ArtifactList = (function (_super) {
    __extends(ArtifactList, _super);
    function ArtifactList() {
        _super.call(this);
        this.skinName = skins.dialog.ArtifactListSkin;
    }
    var __egretProto__ = ArtifactList.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.halidomData = [];
        this.initData();
    };
    __egretProto__.initData = function () {
        _.each(Conf.artifacts, function (v) {
            this.addHalidomData(v.id);
        }.bind(this));
        var collection = new egret.gui.ArrayCollection(this.halidomData);
        this.halidomList.dataProvider = collection;
        this.halidomList.itemRenderer = new egret.gui.ClassFactory(uiskins.HalidomItemGalleryRenderer);
    };
    __egretProto__.addHalidomData = function (i) {
        var index = parseInt(i);
        var data;
        data = {
            type: consts.kItemRendererHalidom,
            id: index,
            level: 1
        };
        this.halidomData.push(data);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return ArtifactList;
})(egret.gui.SkinnableComponent);
ArtifactList.prototype.__class__ = "ArtifactList";
