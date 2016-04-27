/**
 *
 * @author
 *
 */
var GuildMessageLayer = (function (_super) {
    __extends(GuildMessageLayer, _super);
    function GuildMessageLayer(closeFunction) {
        _super.call(this);
        this._closeFunction = closeFunction;
        this.skinName = skins.dialog.GuildMessageLayerSkin;
    }
    var __egretProto__ = GuildMessageLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._guildMessageItemRenderer = new egret.gui.ClassFactory(uiskins.GuildMessageItemRenderer);
        this.messageData = [];
        this.initMessageList();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            Util.invokeCallback(this._closeFunction);
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.clearListBtn) {
            gm.gameUI.showLoadingLayer();
            var id = gm.dataManage.data.guild;
            tt.GuildManage.clearJoinReq(id, function () {
                this.messageCollection.removeAll();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.initMessageList = function () {
        gm.gameUI.showLoadingLayer();
        var ids = gm.dataManage.guild.joinReq;
        tt.GuildManage.playerList(ids, function (data) {
            _.each(data, function (v, i) {
                v["delFunction"] = function (data) {
                    var index = data;
                    this.messageCollection.removeItemAt(index);
                }.bind(this);
                this.messageData.push(v);
            }.bind(this));
            var collection = this.messageCollection = new egret.gui.ArrayCollection(this.messageData);
            this.messageList.dataProvider = collection;
            this.messageList.itemRendererFunction = function (item) {
                return this.getItemRender(item);
            }.bind(this);
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.getItemRender = function (event) {
        return this._guildMessageItemRenderer;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildMessageLayer;
})(egret.gui.SkinnableComponent);
GuildMessageLayer.prototype.__class__ = "GuildMessageLayer";
