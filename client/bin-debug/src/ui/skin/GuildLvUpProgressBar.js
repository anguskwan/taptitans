var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildLvUpProgressBar = (function (_super) {
        __extends(GuildLvUpProgressBar, _super);
        function GuildLvUpProgressBar() {
            _super.call(this);
            this.skinName = skins.components.GuildLvUpProgressBarSkin;
        }
        var __egretProto__ = GuildLvUpProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildLvUpProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.GuildLvUpProgressBar = GuildLvUpProgressBar;
    GuildLvUpProgressBar.prototype.__class__ = "uiskins.GuildLvUpProgressBar";
})(uiskins || (uiskins = {}));
