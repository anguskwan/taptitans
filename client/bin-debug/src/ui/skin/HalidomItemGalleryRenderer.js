var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var HalidomItemGalleryRenderer = (function (_super) {
        __extends(HalidomItemGalleryRenderer, _super);
        function HalidomItemGalleryRenderer() {
            _super.call(this);
            this.dataItem = {};
            this.skinName = skins.components.HalidomItemGallerySkin;
        }
        var __egretProto__ = HalidomItemGalleryRenderer.prototype;
        __egretProto__.initData = function () {
            this.dataItem = {
                cost: this.getCost(),
                value: this.getArtifactValue()
            };
        };
        __egretProto__.getArtifactValue = function () {
            if (gm.dataManage.artifact.hasArtifact(this.data.id))
                return gm.dataManage.artifact.getArtifactValue(this.data.id);
            else
                return gm.dataManage.artifact.getArtifactValueStatic(this.data.id);
        };
        __egretProto__.getCost = function () {
            return formula.artifactUpgradeCost(gm.dataManage.data, this.data.id);
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.initData();
            //直接更改资源
            this.setIconImg();
            this.setName();
            this.setExplainText1();
            this.setExplainText2();
        };
        __egretProto__.onTouchBtnClick = function (event) {
        };
        __egretProto__.onTouchBegin = function (event) {
        };
        __egretProto__.setName = function () {
            this.nameLbl.text = Conf.artifacts[this.data.id].name;
        };
        __egretProto__.setIconImg = function () {
            this.iconImg.source = "artifact" + this.data.id;
            var artifact = gm.dataManage.artifact.hasArtifact(this.data.id);
            if (artifact) {
                this.isHave.source = "halidom_gallery_2";
                this.topMask.visible = false;
                this.lvLbl.text = artifact["level"] + "";
            }
            else {
                this.isHave.source = "halidom_gallery_1";
                this.topMask.visible = true;
                this.lvLbl.text = "1";
            }
        };
        __egretProto__.setExplainText1 = function () {
            var desc = Conf.artifacts[this.data.id].desc;
            var effect = this.dataItem.value.effect;
            this.explainLbl1.text = _.sprintf(desc, effect * 100);
        };
        __egretProto__.setExplainText2 = function () {
            var dmg = this.dataItem.value.damage;
            this.explainLbl2.text = _.sprintf("+%d%%总攻击力", dmg * 100);
        };
        return HalidomItemGalleryRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.HalidomItemGalleryRenderer = HalidomItemGalleryRenderer;
    HalidomItemGalleryRenderer.prototype.__class__ = "uiskins.HalidomItemGalleryRenderer";
})(uiskins || (uiskins = {}));
