var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildCreateGroup = (function (_super) {
        __extends(GuildCreateGroup, _super);
        function GuildCreateGroup(finishFunction) {
            _super.call(this);
            this.index = 1;
            this.currLimitAtt = 0;
            this.needReq = false;
            this.finishFunction = finishFunction;
            this.skinName = skins.components.GuildCreateGroupSkin;
        }
        var __egretProto__ = GuildCreateGroup.prototype;
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
            this.setIconImg();
            this.initAllElement();
        };
        __egretProto__.isAddGuild = function () {
            return gm.dataManage.data.guild != 0;
        };
        __egretProto__.onTouchLayer = function (event) {
            if (event.target == this.createBtn && this.createBtn.enabled) {
                console.log("Guild: Touch the create guild btn.");
                if (this.isAddGuild()) {
                    alert("你已经加入了工会。");
                    return;
                }
                if (!this.isRegExpCode(this.textInput.text)) {
                    alert("请输入工会名称。");
                    return;
                }
                var diamond = gm.dataManage.data.diamond;
                if (diamond < Conf.config.createGuildCost) {
                    gm.postMessage(consts.kMessageShowToastLayer, "钻石不足");
                    return;
                }
                gm.gameUI.showLoadingLayer();
                var needReq = this.needReq;
                var bpLimit = this.currLimitAtt;
                this.createBtn.enabled = false;
                tt.GuildManage.createGuild(this.textInput.text, "guild_badge" + this.index, needReq, bpLimit, function (data) {
                    gm.dataManage.costMoney(Conf.config.createGuildCost, "diamond");
                    Util.invokeCallback(this.finishFunction);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this), function () {
                    this.createBtn.enabled = true;
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }
            if (event.target == this.iconImg) {
                var ly = new GuildBadgePanel(this.index, function (data) {
                    this.index = data;
                    this.setIconImg();
                }.bind(this));
                gm.guiLayer.addElement(ly);
            }
            if (event.target == this.setRect) {
                var setLy = new GuildSetAttPanel(function (data) {
                    this.currLimitAtt = data;
                    this.setCurrLimitAtt();
                }.bind(this));
                gm.guiLayer.addElement(setLy);
            }
            this.selectItemChangeStatus(event.target);
        };
        __egretProto__.initAllElement = function () {
            for (var i = 1; i <= 2; i++) {
                var data = {
                    isSelect: (i == 2)
                };
                this["selectItem" + i].dataItem = data;
                this["selectItem" + i].changeDataItem();
            }
        };
        __egretProto__.selectItemChangeStatus = function (target) {
            var index = -1;
            for (var i = 1; i <= 2; i++) {
                if (target == this["selectItem" + i]) {
                    index = i;
                    if (index == 1) {
                        this.needReq = true;
                    }
                    else {
                        this.needReq = false;
                    }
                }
            }
            if (index != -1) {
                for (var i = 1; i <= 2; i++) {
                    this["selectItem" + i].dataItem.isSelect = (index == i);
                    this["selectItem" + i].changeDataItem();
                }
            }
        };
        __egretProto__.setIconImg = function () {
            var name = gm.dataManage.data.name || "英雄会长";
            var data = {
                iconSource: "guild_badge" + this.index,
                name: name[0]
            };
            this.iconImg.dataItem = data;
            this.iconImg.changeDataItem();
        };
        __egretProto__.setCurrLimitAtt = function () {
            this.attLbl.text = Util.formatNumber(this.currLimitAtt);
        };
        __egretProto__.isRegExpCode = function (str) {
            var re = new RegExp("^[a-zA-Z0-9\\u4e00-\\u9fa5][a-zA-Z0-9\\u4e00-\\u9fa5]{1,10}$");
            return (str.search(re) != -1);
        };
        __egretProto__.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        __egretProto__.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return GuildCreateGroup;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildCreateGroup = GuildCreateGroup;
    GuildCreateGroup.prototype.__class__ = "uiskins.GuildCreateGroup";
})(uiskins || (uiskins = {}));
