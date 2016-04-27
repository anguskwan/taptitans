var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var EquipExpProgressBar = (function (_super) {
        __extends(EquipExpProgressBar, _super);
        function EquipExpProgressBar() {
            _super.call(this);
            this.skinName = skins.components.EquipExpProgressBarSkin;
        }
        var __egretProto__ = EquipExpProgressBar.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return EquipExpProgressBar;
    })(egret.gui.ProgressBar);
    uiskins.EquipExpProgressBar = EquipExpProgressBar;
    EquipExpProgressBar.prototype.__class__ = "uiskins.EquipExpProgressBar";
})(uiskins || (uiskins = {}));
