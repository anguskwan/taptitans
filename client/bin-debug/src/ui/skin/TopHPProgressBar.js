var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var TopHPProgressBar = (function (_super) {
        __extends(TopHPProgressBar, _super);
        function TopHPProgressBar() {
            _super.call(this);
            this.skinName = skins.components.HPProgressBarSkin;
        }
        var __egretProto__ = TopHPProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return TopHPProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.TopHPProgressBar = TopHPProgressBar;
    TopHPProgressBar.prototype.__class__ = "uiskins.TopHPProgressBar";
})(uiskins || (uiskins = {}));
