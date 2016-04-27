var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildBagGetHighItemRenderer = (function (_super) {
        __extends(GuildBagGetHighItemRenderer, _super);
        function GuildBagGetHighItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildBagGetHighItemRendererSkin;
        }
        var __egretProto__ = GuildBagGetHighItemRenderer.prototype;
        __egretProto__.isGetedRedEnvelope = function () {
            var idx = this.itemIndex;
            var id = gm.dataManage.data.id;
            var envelope = gm.dataManage.guild.redEnvelope[idx];
            if (envelope.list[id]) {
                return true;
            }
            return false;
        };
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.selectImg) {
                var idx = this.itemIndex;
                var id = gm.dataManage.data.id;
                var gid = gm.dataManage.data.guild;
                var envelope = gm.dataManage.guild.redEnvelope[idx];
                if (envelope.list[id]) {
                    //红包已领过
                    this.showGuildBagGetPanel();
                    return;
                }
                if (_.size(envelope.diamond) < 1) {
                    //红包已领完
                    this.showGuildBagGetPanel();
                    return;
                }
                //
                gm.gameUI.showLoadingLayer();
                tt.GuildManage.getEnvelope(idx, function () {
                    tt.GuildManage.envelopeList(gid, function () {
                        this.showGuildBagGetPanel();
                        Util.invokeCallback(this.data.updateFunction);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
        };
        __egretProto__.showGuildBagGetPanel = function () {
            var idx = this.itemIndex;
            var ly = new GuildBagGetPanel(idx);
            gm.guiLayer.addElement(ly);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setRedNumText();
            this.setIconImg();
            this.setGetedImg();
            this.setTimeText();
        };
        __egretProto__.setRedNumText = function () {
            var meta = gm.dataManage.guild.redEnvelope[this.itemIndex];
            this.redNumLbl.text = _.sprintf("剩余红包：%d", _.size(meta.diamond));
        };
        __egretProto__.setIconImg = function () {
            var meta = gm.dataManage.guild.redEnvelope[this.itemIndex];
            var avatar = meta.avatar || "";
            if (avatar != "") {
                Util.setIconImg(avatar, this.iconImg, 96);
            }
            else {
                this.iconImg.source = "icon_default";
            }
        };
        __egretProto__.setGetedImg = function () {
            if (this.isGetedRedEnvelope()) {
                this.getedImg.visible = true;
            }
            else {
                this.getedImg.visible = false;
            }
        };
        __egretProto__.setTimeText = function () {
            var idx = this.itemIndex;
            var envelope = gm.dataManage.guild.redEnvelope[idx];
            this.timeLbl.text = moment(envelope.time).format("HH:MM");
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildBagGetHighItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildBagGetHighItemRenderer = GuildBagGetHighItemRenderer;
    GuildBagGetHighItemRenderer.prototype.__class__ = "uiskins.GuildBagGetHighItemRenderer";
})(uiskins || (uiskins = {}));
