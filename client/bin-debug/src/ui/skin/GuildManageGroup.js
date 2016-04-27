var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildManageGroup = (function (_super) {
        __extends(GuildManageGroup, _super);
        function GuildManageGroup(closeFunction) {
            _super.call(this);
            this.closeFunction = closeFunction;
            this.skinName = skins.components.GuildManageGroupSkin;
        }
        var __egretProto__ = GuildManageGroup.prototype;
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.updateMemberList();
        };
        __egretProto__.updateMemberList = function () {
            this.onMessageBtn();
            this.onQuitGuildBtn();
        };
        __egretProto__.onMessageBtn = function () {
            var id = gm.dataManage.guild.president;
            var myId = gm.dataManage.data.id;
            if (id == myId) {
                this.settingGroup.visible = true;
                this.messageGroup.visible = true;
            }
            else {
                this.settingGroup.visible = false;
                this.messageGroup.visible = false;
            }
        };
        __egretProto__.onQuitGuildBtn = function () {
            var id = gm.dataManage.guild.president;
            var myId = gm.dataManage.data.id;
            var memberCount = _.size(gm.dataManage.guild.members);
            if (memberCount == 1) {
                this.guitGroup.visible = true;
            }
            else {
                if (id == myId) {
                    this.guitGroup.visible = false;
                }
                else {
                    this.guitGroup.visible = true;
                }
            }
        };
        __egretProto__.onTouchLayer = function (event) {
            //GuildMessageLayer
            if (event.target == this.messageBtn) {
                var ly = new GuildMessageLayer(function () {
                    this.updateMemberList();
                }.bind(this));
                gm.guiLayer.addElement(ly);
            }
            if (event.target == this.quitBtn) {
                var messageLy = new GuildMessagePanel("退出公会", "您确定退出公会么？", function (target) {
                    gm.gameUI.showLoadingLayer();
                    tt.GuildManage.quit(function () {
                        Util.invokeCallback(this.closeFunction);
                        gm.guiLayer.removeElement(target);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), null);
                gm.guiLayer.addElement(messageLy);
            }
            if (event.target == this.messagePKBtn) {
                var msgPKly = new GuildMessagePKLayer(function () {
                }.bind(this));
                gm.guiLayer.addElement(msgPKly);
            }
            if (event.target == this.levelUpBtn) {
                var lvUpLy = new GuildLevelUpLayer(function () {
                }.bind(this));
                gm.guiLayer.addElement(lvUpLy);
            }
            if (event.target == this.settingBtn) {
                var setLy = new GuildSettingLayer(function () {
                }.bind(this));
                gm.guiLayer.addElement(setLy);
            }
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildManageGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildManageGroup = GuildManageGroup;
    GuildManageGroup.prototype.__class__ = "uiskins.GuildManageGroup";
})(uiskins || (uiskins = {}));
