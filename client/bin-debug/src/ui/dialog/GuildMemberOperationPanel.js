/**
 *
 * @author
 *
 */
var GuildMemberOperationPanel = (function (_super) {
    __extends(GuildMemberOperationPanel, _super);
    function GuildMemberOperationPanel(value) {
        _super.call(this);
        this._value = value;
        this.skinName = skins.dialog.GuildMemberOperationPanelSkin;
    }
    var __egretProto__ = GuildMemberOperationPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.initData();
    };
    __egretProto__.initData = function () {
        this.setNameText();
        this.setIconImg();
        this.setAttText();
        this.setCurrText();
        this.setHighestStageText();
    };
    __egretProto__.setNameText = function () {
        var name = this._value.name || "英雄";
        this.nameLbl.text = name;
    };
    __egretProto__.setIconImg = function () {
        var avatar = this._value.avatar || "";
        if (avatar != "") {
            Util.setIconImg(avatar, this.iconImg, 96);
        }
    };
    __egretProto__.setAttText = function () {
        var battlePoint = this._value.battlePoint;
        if (isNaN(parseInt(battlePoint))) {
            battlePoint = parseInt(battlePoint);
        }
        this.attLbl.text = Util.formatNumber(parseFloat(battlePoint));
    };
    __egretProto__.setCurrText = function () {
        this.currLbl.text = _.sprintf("武器：%d    神器：%d", this._value.heroWeapons, this._value.artifacts);
    };
    __egretProto__.setHighestStageText = function () {
        this.highestStageLbl.text = _.sprintf("历史最高关卡：%d", this._value.highestStage);
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.rejectBtn && this.rejectBtn.enabled) {
            gm.gameUI.showLoadingLayer();
            var guildId = gm.dataManage.data.guild;
            var repId = this._value.id;
            this.approveBtn.enabled = false;
            this.rejectBtn.enabled = false;
            tt.GuildManage.kick(guildId, repId, function () {
                Util.invokeCallback(this._value.delFunction, this._value.index);
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                this.approveBtn.enabled = true;
                this.rejectBtn.enabled = true;
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        if (event.target == this.approveBtn && this.approveBtn.enabled) {
            gm.gameUI.showLoadingLayer();
            var guildId = gm.dataManage.data.guild;
            var repId = this._value.id;
            var name = this._value.name || "英雄";
            this.approveBtn.enabled = false;
            this.rejectBtn.enabled = false;
            tt.GuildManage.setPresident(guildId, repId, name, function () {
                Util.invokeCallback(this._value.updateFunction);
                gm.guiLayer.removeElement(this);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                this.approveBtn.enabled = true;
                this.rejectBtn.enabled = true;
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
    };
    return GuildMemberOperationPanel;
})(egret.gui.SkinnableContainer);
GuildMemberOperationPanel.prototype.__class__ = "GuildMemberOperationPanel";
