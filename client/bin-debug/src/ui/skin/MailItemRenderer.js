var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var MailItemRenderer = (function (_super) {
        __extends(MailItemRenderer, _super);
        function MailItemRenderer() {
            _super.call(this);
            this.isPlayingAni = false;
            this.skinName = skins.components.MailItemRendererSkin;
        }
        var __egretProto__ = MailItemRenderer.prototype;
        __egretProto__.isDelMail = function () {
            if (this.data.value.read == 1) {
                if (_.isEmpty(this.data.value.attachments)) {
                    return true;
                }
                else {
                    if (this.data.value.getGoods == 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.openBtn) {
                if (this.isDelMail()) {
                    var id = this.data.value.id;
                    var read = this.data.value.read;
                    var getGoods = this.data.value.getGoods;
                    gm.gameUI.showLoadingLayer();
                    gm.network.delMail(id, getGoods, read, function () {
                        Util.invokeCallback(this.data.delFunction, this.itemIndex);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
                else {
                    this.showMailMessagePanel();
                }
            }
            else {
                this.showMailMessagePanel();
            }
        };
        __egretProto__.showMailMessagePanel = function () {
            if (this.data.value.read == 0) {
                gm.gameUI.showLoadingLayer();
                gm.network.readMail(this.itemIndex, function () {
                    gm.dataManage.mails[this.itemIndex].read = 1;
                    this.data.value.read = 1;
                    this.setNewTipImg();
                    gm.postMessage(consts.kMessageIsUnReadMail);
                    this.showMailMessage();
                    this.setBtnStatus();
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
            else {
                this.showMailMessage();
            }
        };
        __egretProto__.showMailMessage = function () {
            var dialog = new MailMessagePanel({ value: this.data.value, index: this.itemIndex }, function () {
                gm.dataManage.mails[this.itemIndex].getGoods = 1;
                this.data.value.getGoods = 1;
                this.setBtnStatus();
            }.bind(this));
            gm.guiLayer.addElement(dialog);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNewTipImg();
            this.setIconImg();
            this.setTitleText();
            this.setBtnStatus();
        };
        __egretProto__.setNewTipImg = function () {
            if (this.data.value.read == 0) {
                this.newTipImg.visible = true;
                if (!this.isPlayingAni) {
                    this.playNewTipAni();
                    this.isPlayingAni = true;
                }
            }
            else {
                this.newTipImg.visible = false;
                this.stopNewTipAni();
                this.isPlayingAni = false;
            }
        };
        __egretProto__.playNewTipAni = function () {
            this.newTipImg.scaleX = 0.8;
            this.newTipImg.scaleY = 0.8;
            var tw = egret.Tween.get(this.newTipImg, { loop: true });
            tw.to({ scaleX: 0.9, scaleY: 0.9 }, 300).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
        };
        __egretProto__.stopNewTipAni = function () {
            egret.Tween.removeTweens(this.newTipImg);
        };
        __egretProto__.setIconImg = function () {
            var source;
            if (_.isEmpty(this.data.value.attachments)) {
                source = "icon_mail_default";
            }
            else {
                var elementTypeSource = gm.gameUI.getElementTypeSource(this.data.value.attachments[0].type);
                source = elementTypeSource.icon;
            }
            this.iconImg.source = source;
        };
        __egretProto__.setTitleText = function () {
            this.titleLbl.text = this.data.value.title;
        };
        __egretProto__.setBtnStatus = function () {
            this.openBtn.textLabel.size = 18;
            if (this.isDelMail()) {
                this.openBtn.textLabel.text = "删除";
                this.openBtn.setBtnSkinName("dialog_btn_red");
            }
            else {
                this.openBtn.textLabel.text = "查看";
                this.openBtn.setBtnSkinName("dialog_btn_blue");
            }
        };
        return MailItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.MailItemRenderer = MailItemRenderer;
    MailItemRenderer.prototype.__class__ = "uiskins.MailItemRenderer";
})(uiskins || (uiskins = {}));
