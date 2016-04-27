var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildPlayerItemRenderer = (function (_super) {
        __extends(GuildPlayerItemRenderer, _super);
        function GuildPlayerItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildPlayerItemRendererSkin;
        }
        var __egretProto__ = GuildPlayerItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setItem();
        };
        __egretProto__.setItem = function () {
            this.setLeftItem();
            this.setRightItem();
        };
        __egretProto__.setLeftItem = function () {
            if (this.data["mine"]) {
                this.leftItem.visible = true;
                this.leftItem.updateItem(this.data["mine"]);
            }
            else {
                this.leftItem.visible = false;
            }
        };
        __egretProto__.setRightItem = function () {
            if (this.data["opp"]) {
                this.rightItem.visible = true;
                this.rightItem.updateItem(this.data["opp"]);
            }
            else {
                this.rightItem.visible = false;
            }
        };
        __egretProto__.onTouchItem = function (event) {
            if (event.target == this.rightItem) {
                this.onShowWarAttLayer();
            }
        };
        __egretProto__.onShowWarAttLayer = function () {
            var myInfo = gm.dataManage.guild["myInfo"];
            if (this.data["opp"] && myInfo) {
                Util.invokeCallback(this.data.delFunction);
                var ly = new GuildWarAttLayer(myInfo, this.data["opp"]);
                gm.guiLayer.addElement(ly);
            }
        };
        return GuildPlayerItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildPlayerItemRenderer = GuildPlayerItemRenderer;
    GuildPlayerItemRenderer.prototype.__class__ = "uiskins.GuildPlayerItemRenderer";
})(uiskins || (uiskins = {}));
