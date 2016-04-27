var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMessageItemRenderer = (function (_super) {
        __extends(GuildMessageItemRenderer, _super);
        function GuildMessageItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMessageItemRendererSkin;
        }
        var __egretProto__ = GuildMessageItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setTitleText();
            this.setIconImg();
        };
        __egretProto__.onTouchBtnClick = function (event) {
            this.data["index"] = this.itemIndex;
            var ly = new GuildMessageInfoPanel(this.data);
            gm.guiLayer.addElement(ly);
        };
        __egretProto__.setIconImg = function () {
            var avatar = this.data.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
        };
        __egretProto__.setTitleText = function () {
            var name = this.data.name || "英雄";
            this.titleLbl.text = name + " 加入申请";
        };
        return GuildMessageItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMessageItemRenderer = GuildMessageItemRenderer;
    GuildMessageItemRenderer.prototype.__class__ = "uiskins.GuildMessageItemRenderer";
})(uiskins || (uiskins = {}));
