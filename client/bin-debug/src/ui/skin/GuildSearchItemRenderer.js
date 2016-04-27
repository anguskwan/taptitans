var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildSearchItemRenderer = (function (_super) {
        __extends(GuildSearchItemRenderer, _super);
        function GuildSearchItemRenderer() {
            _super.call(this);
            this.skinName = skins.components.GuildSearchItemRendererSkin;
        }
        var __egretProto__ = GuildSearchItemRenderer.prototype;
        __egretProto__.getMaxMember = function () {
            var members = this.data.level - 1;
            return 10 + members;
        };
        __egretProto__.getMaxFightValue = function () {
            return formula.maxFightValue(gm.dataManage.data);
        };
        __egretProto__.isFull = function () {
            return this.data.memberCount >= this.getMaxMember();
        };
        __egretProto__.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtnClick, this);
        };
        __egretProto__.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.setNameText();
            this.setIconImg();
            this.setMemberText();
            this.setFull();
            this.setLevelText();
        };
        __egretProto__.isAddGuild = function () {
            return gm.dataManage.data.guild != 0;
        };
        __egretProto__.onTouchBtnClick = function (event) {
            if (event.target == this.joinBtn) {
                if (this.isAddGuild()) {
                    alert("你已经加入了工会。");
                    return;
                }
                var setting = this.data.setting || {};
                var needReq = _.isUndefined(setting.needReq) ? true : setting.needReq;
                gm.gameUI.showLoadingLayer();
                if (needReq) {
                    this.joinGroup.visible = false;
                    tt.GuildManage.joinGuild(this.data.id, function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
                else {
                    this.joinGroup.visible = false;
                    tt.GuildManage.joinGuildWithoutReq(this.data.id, function () {
                        Util.invokeCallback(this.data.finishFunction);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }
            }
        };
        __egretProto__.setNameText = function () {
            this.nameLbl.text = this.data.name;
        };
        __egretProto__.setIconImg = function () {
            var name = this.data.presidentName || "英雄会长";
            var data = {
                iconSource: this.data.icon,
                name: name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        };
        __egretProto__.setMemberText = function () {
            this.memberLbl.text = _.sprintf("%d/%d", this.data.memberCount, this.getMaxMember());
            if (this.isFull()) {
                this.memberLbl.textColor = 0xF34627;
            }
            else {
                this.memberLbl.textColor = 0x25ff3a;
            }
        };
        __egretProto__.setLevelText = function () {
            var level = this.data.level || 1;
            this.lvLbl.text = _.sprintf("Lv.%d", level);
        };
        __egretProto__.setFull = function () {
            if (this.isFull()) {
                this.fullLbl.text = "已满员";
                this.fullLbl.visible = true;
                this.joinGroup.visible = false;
            }
            else {
                var setting = this.data.setting || {};
                var needReq = _.isUndefined(setting.needReq) ? true : setting.needReq;
                var bpLimit = setting.bpLimit || 0;
                var maxValue = this.getMaxFightValue();
                if (maxValue < bpLimit) {
                    this.fullLbl.text = "不满足要求";
                    this.fullLbl.visible = true;
                    this.joinGroup.visible = false;
                }
                else {
                    if (needReq) {
                        this.fullLbl.visible = false;
                        this.joinGroup.visible = true;
                        this.joinLbl.text = "请求";
                    }
                    else {
                        this.fullLbl.visible = false;
                        this.joinGroup.visible = true;
                        this.joinLbl.text = "加入";
                    }
                }
            }
        };
        return GuildSearchItemRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.GuildSearchItemRenderer = GuildSearchItemRenderer;
    GuildSearchItemRenderer.prototype.__class__ = "uiskins.GuildSearchItemRenderer";
})(uiskins || (uiskins = {}));
