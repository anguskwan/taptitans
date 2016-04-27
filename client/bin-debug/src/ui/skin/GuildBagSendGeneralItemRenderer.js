var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildBagSendGeneralItemRenderer = (function (_super) {
        __extends(GuildBagSendGeneralItemRenderer, _super);
        function GuildBagSendGeneralItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildBagSendGeneralItemRendererSkin;
        }
        var __egretProto__ = GuildBagSendGeneralItemRenderer.prototype;
        __egretProto__.isTouchSend = function () {
            var cost = Conf.redEnvelope[1].cost;
            var diamond = gm.dataManage.data.diamond;
            var envelope = gm.dataManage.data.dailyEvent.envelope;
            if (diamond >= cost && envelope <= 2) {
                return true;
            }
            return false;
        };
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.sendBtn && this.sendBtn.enabled) {
                this.sendBtn.enabled = false;
                gm.gameUI.showLoadingLayer();
                tt.GuildManage.redEnvelope(1, function (data) {
                    var ly = new MessageGetRewardPanel("获得红包奖励", [{ type: "crystal", num: data.num }]);
                    gm.guiLayer.addElement(ly);
                    Util.invokeCallback(this.data.updateFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setCostText();
            this.setCrystalText();
            this.setSendText();
            this.setTitleText();
            this.setSendBtn();
        };
        __egretProto__.setCostText = function () {
            var cost = Conf.redEnvelope[1].cost;
            this.costLbl.text = _.sprintf("%d", cost);
        };
        __egretProto__.setCrystalText = function () {
            var crystal = Conf.redEnvelope[1].crystal;
            this.crystalLbl.text = _.sprintf("%d", crystal);
        };
        __egretProto__.setSendText = function () {
            var diamond = Conf.redEnvelope[1].diamond;
            this.sendLbl.text = _.sprintf("%d", diamond);
        };
        __egretProto__.setTitleText = function () {
            var num = Conf.redEnvelope[1].num;
            this.titleLbl.text = _.sprintf("普通钻石红包%d个", num);
        };
        __egretProto__.setSendBtn = function () {
            if (this.isTouchSend()) {
                this.sendBtn.enabled = true;
            }
            else {
                this.sendBtn.enabled = false;
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildBagSendGeneralItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildBagSendGeneralItemRenderer = GuildBagSendGeneralItemRenderer;
    GuildBagSendGeneralItemRenderer.prototype.__class__ = "uiskins.GuildBagSendGeneralItemRenderer";
})(uiskins || (uiskins = {}));
