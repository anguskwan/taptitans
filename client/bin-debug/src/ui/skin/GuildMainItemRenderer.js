var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildMainItemRenderer = (function (_super) {
        __extends(GuildMainItemRenderer, _super);
        function GuildMainItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildMainItemRendererSkin;
        }
        var __egretProto__ = GuildMainItemRenderer.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setWinAndLoseText();
            this.setTimeAndWarGroup();
        };
        __egretProto__.setWinAndLoseText = function () {
            var win = gm.dataManage.guild.win;
            var lose = gm.dataManage.guild.lose;
            this.winLbl.text = _.sprintf("胜 %d", win);
            this.loseLbl.text = _.sprintf("败 %d", lose);
        };
        __egretProto__.setTimeAndWarGroup = function () {
            if (Util.isTimePast(0, 9)) {
                this.timeRect.visible = true;
                this.timeLbl.visible = true;
                this.warGroup.visible = false;
                this.bgImg.source = "guild_main_item_close";
            }
            if (Util.isTimePast(9, 24)) {
                this.timeRect.visible = false;
                this.timeLbl.visible = false;
                this.warGroup.visible = true;
                this.bgImg.source = "guild_main_item_open";
            }
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.infoBtn) {
                //
                var ly = new GuildInfoPanel();
                gm.guiLayer.addElement(ly);
            }
            else {
                if (Util.isTimePast(9, 24)) {
                    this.onShowWarStartLayer();
                }
            }
        };
        __egretProto__.onShowWarStartLayer = function () {
            var warId = gm.dataManage.guild.war;
            if (warId == 0) {
                gm.postMessage(consts.kMessageShowToastLayer, "未匹配到对手");
                return;
            }
            gm.gameUI.showLoadingLayer();
            tt.GuildWarManage.warInfo(warId, function (obj) {
                var myId = gm.dataManage.data.guild;
                var oppId = parseInt(obj.guilds[myId].opponent);
                tt.GuildManage.queryById(myId, function (leftValue) {
                    tt.GuildManage.queryById(oppId, function (rightValue) {
                        Util.invokeCallback(this.data.delFunction);
                        var ly = new GuildWarStartLayer(obj, leftValue, rightValue);
                        gm.guiLayer.addElement(ly);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        return GuildMainItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildMainItemRenderer = GuildMainItemRenderer;
    GuildMainItemRenderer.prototype.__class__ = "uiskins.GuildMainItemRenderer";
})(uiskins || (uiskins = {}));
