var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MailRewardElement = (function (_super) {
        __extends(MailRewardElement, _super);
        function MailRewardElement(data) {
            _super.call(this);
            this._value = data;
            this.skinName = skins.components.MailRewardElementSkin;
        }
        var __egretProto__ = MailRewardElement.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.setIconImg();
            this.setNumText();
        };
        __egretProto__.setIconImg = function () {
            var elementTypeSource = gm.gameUI.getElementTypeSource(this._value.type);
            this.iconImg.source = elementTypeSource.icon;
        };
        __egretProto__.setNumText = function () {
            this.numLbl.text = Util.formatNumber(this._value.num);
        };
        return MailRewardElement;
    })(egret.gui.SkinnableComponent);
    uiskins.MailRewardElement = MailRewardElement;
    MailRewardElement.prototype.__class__ = "uiskins.MailRewardElement";
})(uiskins || (uiskins = {}));
