/**
 *
 * @author
 *
 */
var GuildMessagePKLayer = (function (_super) {
    __extends(GuildMessagePKLayer, _super);
    function GuildMessagePKLayer(closeFunction) {
        _super.call(this);
        this._closeFunction = closeFunction;
        this.skinName = skins.dialog.GuildMessagePKLayerSkin;
    }
    var __egretProto__ = GuildMessagePKLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._guildMessagePKItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMessagePKItemRenderer);
        this.messagePKData = [];
        this.initMessagePKList();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            Util.invokeCallback(this._closeFunction);
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.initMessagePKList = function () {
        var msg = gm.dataManage.guild.battleMsg;
        _.each(msg, function (v) {
            this.messagePKData.push(v);
        }.bind(this));
        var collection = this.messagePKCollection = new egret.gui.ArrayCollection(this.messagePKData);
        this.messagePKList.dataProvider = collection;
        this.messagePKList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        return this._guildMessagePKItemRenderer;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildMessagePKLayer;
})(egret.gui.SkinnableComponent);
GuildMessagePKLayer.prototype.__class__ = "GuildMessagePKLayer";
