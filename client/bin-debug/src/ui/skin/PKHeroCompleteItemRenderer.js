var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var PKHeroCompleteItemRenderer = (function (_super) {
        __extends(PKHeroCompleteItemRenderer, _super);
        function PKHeroCompleteItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.PKHeroCompleteItemRendererSkin;
        }
        var __egretProto__ = PKHeroCompleteItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setTitleImg(this.data);
            this.setMorale(this.data);
            this.setFragmentText(this.data);
            this.setEquipExpText(this.data);
        };
        __egretProto__.setFragmentText = function (data) {
            var fragment = data.fragment;
            this.fragmentLbl.text = "" + fragment;
        };
        __egretProto__.setEquipExpText = function (data) {
            var exp = data.exp;
            this.equipExpLbl.text = "" + exp;
        };
        __egretProto__.setMorale = function (data) {
            var moraleCost = data.moraleCost;
            this.moraleLbl.text = "-" + moraleCost;
        };
        __egretProto__.setTitleImg = function (data) {
            this.titleImg.source = data.isWin ? "pk_complete_victory" : "pk_complete_lose";
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return PKHeroCompleteItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.PKHeroCompleteItemRenderer = PKHeroCompleteItemRenderer;
    PKHeroCompleteItemRenderer.prototype.__class__ = "uiskins.PKHeroCompleteItemRenderer";
})(uiskins || (uiskins = {}));
