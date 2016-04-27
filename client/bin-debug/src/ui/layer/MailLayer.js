/**
 *
 * @author
 *
 */
var MailLayer = (function (_super) {
    __extends(MailLayer, _super);
    function MailLayer() {
        _super.apply(this, arguments);
        this.skinName = skins.dialog.MailLayerSkin;
    }
    var __egretProto__ = MailLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this._mailItemRenderer = new egret.gui.ClassFactory(uiskins.MailItemRenderer);
        this._mailLastItemRenderer = new egret.gui.ClassFactory(uiskins.MailLastItemRenderer);
        this._mailData = [];
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setMailNumText();
        gm.gameUI.showLoadingLayer();
        gm.network.getMails(function (data) {
            gm.dataManage.mails = data;
            this.onMailList();
            gm.postMessage(consts.kMessageIsUnReadMail);
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.setMailNumText = function () {
        this.mailNumLbl.text = _.sprintf("%d/20", _.size(gm.dataManage.mails));
    };
    __egretProto__.onMailList = function () {
        var data;
        _.each(gm.dataManage.mails, function (v) {
            data = {
                type: consts.kItemRendererMail,
                value: v,
                delFunction: function (index) {
                    gm.dataManage.mails.splice(index, 1);
                    this._mailCollection.removeItemAt(index);
                    this.setMailNumText();
                }.bind(this)
            };
            this._mailData.push(data);
        }.bind(this));
        if (!_.isEmpty(gm.dataManage.mails)) {
            data = {
                type: consts.kItemRendererMailLast
            };
            this._mailData.push(data);
        }
        var collection = this._mailCollection = new egret.gui.ArrayCollection(this._mailData);
        this.mailList.dataProvider = collection;
        this.mailList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (item) {
        if (item.type == consts.kItemRendererMail) {
            return this._mailItemRenderer;
        }
        if (item.type == consts.kItemRendererMailLast) {
            return this._mailLastItemRenderer;
        }
    };
    return MailLayer;
})(egret.gui.SkinnableComponent);
MailLayer.prototype.__class__ = "MailLayer";
