var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var PKProgressBar = (function (_super) {
        __extends(PKProgressBar, _super);
        function PKProgressBar() {
            _super.call(this);
            this.skinName = skins.components.PKProgressBarSkin;
        }
        var __egretProto__ = PKProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return PKProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.PKProgressBar = PKProgressBar;
    PKProgressBar.prototype.__class__ = "uiskins.PKProgressBar";
})(uiskins || (uiskins = {}));
