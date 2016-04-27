/**
 *
 * @author
 *
 */
var GuildMessagePKInfoLayer = (function (_super) {
    __extends(GuildMessagePKInfoLayer, _super);
    function GuildMessagePKInfoLayer(value) {
        _super.call(this);
        this._value = value;
        this._infoArr = [];
        this._infoValue = {};
        this._leftValue = {};
        this._rightValue = {};
        this.skinName = skins.dialog.GuildMessagePKInfoLayerSkin;
    }
    var __egretProto__ = GuildMessagePKInfoLayer.prototype;
    __egretProto__.isGuildWin = function () {
        return this._value.isWin;
    };
    __egretProto__.getLeftMaxMember = function () {
        var members = this._leftValue.level - 1;
        return 10 + members;
    };
    __egretProto__.getRightMaxMember = function () {
        var level = this._rightValue.level || 1;
        var members = level - 1;
        return 10 + members;
    };
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this.onInitData();
        this.setTitleText();
        this.loadingInfo();
    };
    __egretProto__.onInitData = function () {
        var upgrades = _.clone(gm.dataManage.guild.upgrades);
        var id = consts.kGuildUpgradeTypePKCrystal;
        if (!upgrades) {
            upgrades = {};
        }
        upgrades[id] = upgrades[id] || { exp: 0, level: 1 };
        this.currUpgrades = upgrades[id];
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            gm.guiLayer.removeElement(this);
        }
        if (event.target == this.getRewardBtn) {
            gm.gameUI.showLoadingLayer();
            var warId = this._value.id;
            var leftId = this._infoArr[0].gid;
            tt.GuildWarManage.getGuildWarReward(warId, leftId, function (data) {
                this.getRewardBtn.enabled = false;
                var ly = new MessageGetRewardPanel("获得物品", [{ num: data.crystal, type: "crystal" }]);
                gm.guiLayer.addElement(ly);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.loadingInfo = function () {
        gm.gameUI.showLoadingLayer();
        var warId = this._value.id;
        tt.GuildWarManage.warInfo(warId, function (infoValue) {
            this._infoValue = infoValue;
            this.initInfo();
            var leftId = this._infoArr[0].gid;
            var rightId = this._infoArr[1].gid;
            tt.GuildManage.queryById(leftId, function (leftValue) {
                this._leftValue = leftValue;
                this.onLeftInit();
                var warId = this._value.id;
                var level = this.currUpgrades.level;
                tt.GuildWarManage.getWarRewardNum(warId, leftId, level, function (data) {
                    this.setCrystalText(data.num);
                    tt.GuildManage.queryById(rightId, function (rightValue) {
                        this._rightValue = rightValue;
                        this.onRightInit();
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
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.initInfo = function () {
        this.initMineInfo();
        this.initOppInfo();
        this.setScoreText();
        this.setGetRewardBtn();
    };
    __egretProto__.initMineInfo = function () {
        var myId = gm.dataManage.data.guild;
        var myValue = this._infoValue.guilds[myId];
        var data;
        data = {
            gid: myId,
            value: myValue
        };
        this._infoArr.push(data);
    };
    __egretProto__.initOppInfo = function () {
        var myId = gm.dataManage.data.guild;
        var oppId = parseInt(this._infoValue.guilds[myId].opponent);
        var oppValue = this._infoValue.guilds[oppId];
        var data;
        data = {
            gid: oppId,
            value: oppValue
        };
        this._infoArr.push(data);
    };
    __egretProto__.setTitleText = function () {
        var text;
        if (this.isGuildWin() == 1) {
            text = "战争胜利";
        }
        if (this.isGuildWin() == 0) {
            text = "平局";
        }
        if (this.isGuildWin() == -1) {
            text = "战争失败";
        }
        this.titleLbl.text = text;
    };
    __egretProto__.setScoreText = function () {
        this.scoreLbl.text = _.sprintf("%d:%d", this._infoArr[0].value.left, this._infoArr[1].value.left);
    };
    __egretProto__.setCrystalText = function (num) {
        this.crystalLbl.text = "" + num;
    };
    __egretProto__.setGetRewardBtn = function () {
        var id = gm.dataManage.data.id;
        var player = this._infoArr[0].value.players[id];
        if (player) {
            var getReward = this._infoArr[0].value.players[id].getReward;
            if (getReward == 0) {
                this.getRewardBtn.enabled = true;
            }
            else {
                this.getRewardBtn.enabled = false;
            }
        }
        else {
            this.getRewardBtn.enabled = false;
        }
    };
    __egretProto__.onLeftInit = function () {
        this.setLeftName();
        this.setLeftIconImg();
        this.setMemberLeftText();
        this.setAliveHeroLeftText();
        this.setAttLeftText();
        this.setWarLeftText();
    };
    __egretProto__.setLeftName = function () {
        var value = this._leftValue;
        this.nameLeftLbl.text = value.name || "公会";
    };
    __egretProto__.setLeftIconImg = function () {
        var value = this._leftValue;
        var name = value.presidentName || "英雄会长";
        var data = {
            iconSource: value.icon,
            name: name[0]
        };
        this.iconLeftImg.dataItem = data;
        this.iconLeftImg.changeDataItem();
    };
    __egretProto__.setMemberLeftText = function () {
        var size = _.size(this._infoArr[0].value.players);
        this.memberLeftLbl.text = _.sprintf("%d/%d", size, this.getLeftMaxMember());
    };
    __egretProto__.setAliveHeroLeftText = function () {
        this.aliveHeroLeftLbl.text = this._infoArr[0].value.left + "";
    };
    __egretProto__.setAttLeftText = function () {
        var battlePoint = this._infoArr[0].value.bp;
        if (isNaN(parseInt(battlePoint))) {
            battlePoint = parseInt(battlePoint);
        }
        this.attLeftLbl.text = Util.formatNumber(battlePoint);
    };
    __egretProto__.setWarLeftText = function () {
        var text;
        var color;
        if (this.isGuildWin() == 1) {
            text = "胜利";
            color = 0xFF0000;
        }
        if (this.isGuildWin() == 0) {
            text = "平局";
            color = 0xB49268;
        }
        if (this.isGuildWin() == -1) {
            text = "战败";
            color = 0xB49268;
        }
        this.warLeftLbl.text = text;
        this.warLeftLbl.textColor = color;
    };
    __egretProto__.onRightInit = function () {
        this.setRightName();
        this.setRightIconImg();
        this.setMemberRightText();
        this.setAliveHeroRightText();
        this.setAttRightText();
        this.setWarRightText();
    };
    __egretProto__.setRightName = function () {
        var value = this._rightValue;
        this.nameRightLbl.text = value.name || "公会";
    };
    __egretProto__.setRightIconImg = function () {
        var value = this._rightValue;
        var name = value.presidentName || "英雄会长";
        var data = {
            iconSource: value.icon,
            name: name[0]
        };
        this.iconRightImg.dataItem = data;
        this.iconRightImg.changeDataItem();
    };
    __egretProto__.setMemberRightText = function () {
        var size = _.size(this._infoArr[1].value.players);
        this.memberRightLbl.text = _.sprintf("%d/%d", size, this.getRightMaxMember());
    };
    __egretProto__.setAliveHeroRightText = function () {
        this.aliveHeroRightLbl.text = this._infoArr[1].value.left + "";
    };
    __egretProto__.setAttRightText = function () {
        var battlePoint = this._infoArr[1].value.bp;
        if (isNaN(parseInt(battlePoint))) {
            battlePoint = parseInt(battlePoint);
        }
        this.attRightLbl.text = Util.formatNumber(battlePoint);
    };
    __egretProto__.setWarRightText = function () {
        var text;
        var color;
        if (this.isGuildWin() == 1) {
            text = "战败";
            color = 0xB49268;
        }
        if (this.isGuildWin() == 0) {
            text = "平局";
            color = 0xB49268;
        }
        if (this.isGuildWin() == -1) {
            text = "胜利";
            color = 0xFF0000;
        }
        this.warRightLbl.text = text;
        this.warRightLbl.textColor = color;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildMessagePKInfoLayer;
})(egret.gui.SkinnableComponent);
GuildMessagePKInfoLayer.prototype.__class__ = "GuildMessagePKInfoLayer";
