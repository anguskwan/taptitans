/**
 *
 * @author
 *
 */
var GuildSettingLayer = (function (_super) {
    __extends(GuildSettingLayer, _super);
    function GuildSettingLayer(closeFunction) {
        _super.call(this);
        this._closeFunction = closeFunction;
        this.needReq = gm.dataManage.guild.setting.needReq;
        this.currLimitAtt = gm.dataManage.guild.setting.bpLimit;
        var icon = gm.dataManage.guild.icon;
        this.index = parseInt(Util.getRelace(icon, /[^0-9]/ig, ""));
        this.skinName = skins.dialog.GuildSettingLayerSkin;
    }
    var __egretProto__ = GuildSettingLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.setCurrLimitAtt();
        this.setIconImg();
        this.setNameText();
        this.initAllElement();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            Util.invokeCallback(this._closeFunction);
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.setRect) {
            var setLy = new GuildSetAttPanel(function (data) {
                this.currLimitAtt = data;
                this.setCurrLimitAtt();
            }.bind(this));
            gm.guiLayer.addElement(setLy);
        }
        if (event.target == this.iconImg) {
            var ly = new GuildBadgePanel(this.index, function (data) {
                this.index = data;
                this.setIconImg();
            }.bind(this));
            gm.guiLayer.addElement(ly);
        }
        if (event.target == this.rightBtn) {
            gm.gameUI.showLoadingLayer();
            var gid = gm.dataManage.data.guild;
            var icon = "guild_badge" + this.index;
            var needReq = this.needReq;
            var bpLimit = this.currLimitAtt;
            tt.GuildManage.setting(gid, icon, needReq, bpLimit, function () {
                gm.dataManage.guild.setting.needReq = needReq;
                gm.dataManage.guild.setting.bpLimit = bpLimit;
                gm.dataManage.guild.icon = icon;
                Util.invokeCallback(this._closeFunction);
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        this.selectItemChangeStatus(event.target);
    };
    __egretProto__.initAllElement = function () {
        for (var i = 1; i <= 2; i++) {
            var data = {
                isSelect: i == 1 ? this.needReq : !this.needReq
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
    __egretProto__.setNameText = function () {
        this.nameLbl.text = gm.dataManage.guild.name || "公会";
    };
    __egretProto__.setCurrLimitAtt = function () {
        this.attLbl.text = Util.formatNumber(this.currLimitAtt);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildSettingLayer;
})(egret.gui.SkinnableComponent);
GuildSettingLayer.prototype.__class__ = "GuildSettingLayer";
