/**
 *
 * @author
 *
 */
var MailMessagePanel = (function (_super) {
    __extends(MailMessagePanel, _super);
    function MailMessagePanel(data, cb) {
        _super.call(this);
        this._value = data;
        this._getRewardFunction = cb;
        this.skinName = skins.dialog.MailMessagePanelSkin;
    }
    var __egretProto__ = MailMessagePanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setNameText();
        this.setReward();
        this.setGetRewardBtn();
        this.setContentText();
        this.setTitleText();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rightBtn) {
            if (this._value.value.getGoods == 0) {
                gm.gameUI.showLoadingLayer();
                gm.network.getMailAttachments(this._value.index, function () {
                    this._value.value.getGoods = 1;
                    _.each(this._value.value.attachments, function (v) {
                        gm.dataManage.addItem(v.num, v.type);
                    }.bind(this));
                    this.setGetRewardBtn();
                    Util.invokeCallback(this._getRewardFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        }
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.setTitleText = function () {
        this.titleLbl.text = this._value.value.title;
    };
    __egretProto__.setContentText = function () {
        this.contentLbl.text = this._value.value.message;
    };
    __egretProto__.setGetRewardBtn = function () {
        if (this._value.value.getGoods == 0) {
            if (_.isEmpty(this._value.value.attachments)) {
                this.rightGroup.visible = false;
            }
            else {
                this.rightGroup.visible = true;
            }
        }
        else {
            this.rightGroup.visible = false;
        }
    };
    __egretProto__.onAddRewardItem = function (v) {
        var item = new uiskins.MailRewardElement(v);
        this.rewardGroup.addElement(item);
    };
    __egretProto__.setReward = function () {
        _.each(this._value.value.attachments, function (v) {
            this.onAddRewardItem(v);
        }.bind(this));
    };
    __egretProto__.setNameText = function () {
        this.nameLbl.text = this._value.value.from || "疯狂管理员";
    };
    return MailMessagePanel;
})(egret.gui.SkinnableContainer);
MailMessagePanel.prototype.__class__ = "MailMessagePanel";
