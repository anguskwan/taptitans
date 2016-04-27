var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var ActivityProgressBar = (function (_super) {
        __extends(ActivityProgressBar, _super);
        function ActivityProgressBar() {
            _super.call(this);
            this.skinName = skins.components.ActivityProgressBarSkin;
        }
        var __egretProto__ = ActivityProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return ActivityProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.ActivityProgressBar = ActivityProgressBar;
    ActivityProgressBar.prototype.__class__ = "uiskins.ActivityProgressBar";
})(uiskins || (uiskins = {}));
