var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var TopBossTimeProgressBar = (function (_super) {
        __extends(TopBossTimeProgressBar, _super);
        function TopBossTimeProgressBar() {
            _super.call(this);
            this.skinName = skins.components.BossTimeProgressBarSkin;
        }
        var __egretProto__ = TopBossTimeProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return TopBossTimeProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.TopBossTimeProgressBar = TopBossTimeProgressBar;
    TopBossTimeProgressBar.prototype.__class__ = "uiskins.TopBossTimeProgressBar";
})(uiskins || (uiskins = {}));
