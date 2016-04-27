/**
 *
 * @author
 *
 */
var GuildWarStartLayer = (function (_super) {
    __extends(GuildWarStartLayer, _super);
    function GuildWarStartLayer(value, leftValue, rightValue) {
        _super.call(this);
        this._value = value;
        this._leftValue = leftValue;
        this._rightValue = rightValue;
        this._infoArr = [];
        this._playersArr = [];
        this._playersDisc = {};
        this.skinName = skins.dialog.GuildWarStartLayerSkin;
    }
    var __egretProto__ = GuildWarStartLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._guildPlayerItemRenderer = new egret.gui.ClassFactory(uiskins.GuildPlayerItemRenderer);
        this.playersData = [];
        this.initInfo();
        this.setMineName();
        this.setMineIconImg();
        this.setOpponentName();
        this.setOponentIconImg();
        this.setScoreText();
        this.onGetPlayersList();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.backBtn) {
            gm.guiLayer.removeElement(this);
            if (gm.dataManage.data.guild != 0) {
                gm.guiLayer.addElement(new GuildLayer());
            }
            else {
                gm.guiLayer.addElement(new GuildCreateLayer());
            }
        }
    };
    __egretProto__.onGetPlayersList = function () {
        gm.gameUI.showLoadingLayer();
        // player mine
        var mineMembers = this._infoArr[0].members;
        tt.GuildManage.playerList(mineMembers, function (mineObj) {
            _.each(mineObj, function (v, i) {
                this.onSetPlayerArr("mine", v, i);
                this.onSetPlayerDisc("opp", v);
            }.bind(this));
            var oppMembers = this._infoArr[1].members;
            tt.GuildManage.playerList(oppMembers, function (oppObj) {
                _.each(oppObj, function (v, i) {
                    this.onSetPlayerArr("opp", v, i);
                    this.onSetPlayerDisc("mine", v);
                }.bind(this));
                this.initPlayersList();
                this.initAttPlayer();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.onSetPlayerArr = function (type, v, i) {
        if (!this._playersArr[i]) {
            this._playersArr[i] = {};
        }
        this._playersArr[i][type] = v;
        var index;
        if (type == "mine") {
            index = 0;
        }
        else {
            index = 1;
        }
        this._playersArr[i][type]["warInfo"] = this._infoArr[index].value.players[v.id];
        if (v.id == gm.dataManage.data.id) {
            gm.dataManage.guild["myInfo"] = this._playersArr[i][type];
        }
    };
    __egretProto__.onSetPlayerDisc = function (type, v) {
        if (!this._playersDisc[type]) {
            this._playersDisc[type] = {};
        }
        this._playersDisc[type][v.id] = v;
    };
    __egretProto__.initInfo = function () {
        this.initMineInfo();
        this.initOppInfo();
    };
    __egretProto__.initMineInfo = function () {
        var myId = gm.dataManage.data.guild;
        var myValue = this._value.guilds[myId];
        var members = _.keys(myValue.players);
        var data;
        data = {
            gid: myId,
            value: myValue,
            members: members
        };
        this._infoArr.push(data);
    };
    __egretProto__.initOppInfo = function () {
        var myId = gm.dataManage.data.guild;
        var oppId = parseInt(this._value.guilds[myId].opponent);
        var oppValue = this._value.guilds[oppId];
        var members = _.keys(oppValue.players);
        var data;
        data = {
            gid: oppId,
            value: oppValue,
            members: members
        };
        this._infoArr.push(data);
    };
    __egretProto__.initPlayersList = function () {
        _.each(this._playersArr, function (v) {
            v["delFunction"] = function () {
                gm.guiLayer.removeElement(this);
            }.bind(this);
            this.playersData.push(v);
        }.bind(this));
        var collection = this.playersCollection = new egret.gui.ArrayCollection(this.playersData);
        this.playersList.dataProvider = collection;
        this.playersList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.initAttPlayer = function () {
        _.each(this._playersArr, function (v) {
            this.onAddAttPlayer(v, "mine", 0);
            this.onAddAttPlayer(v, "opp", 1);
        }.bind(this));
    };
    __egretProto__.onAddAttPlayer = function (v, type, index) {
        if (v[type]) {
            var attacks = this._infoArr[index].value.players[v[type].id]["attacks"];
            if (_.isEmpty(attacks)) {
                return;
            }
            for (var i = 0; i < 2; i++) {
                if (attacks[i]) {
                    var playerId = attacks[i].enemy;
                    var aIndex = i + 1;
                    v[type]["warInfo"]["attPlayer" + aIndex] = this._playersDisc[type][playerId];
                }
            }
        }
    };
    __egretProto__.setMineName = function () {
        var value = this._leftValue;
        this.nameMineLbl.text = value.name;
    };
    __egretProto__.setMineIconImg = function () {
        var value = this._leftValue;
        var name = value.presidentName || "英雄会长";
        var data = {
            iconSource: value.icon,
            name: name[0]
        };
        this.mineImg.dataItem = data;
        this.mineImg.changeDataItem();
    };
    __egretProto__.setScoreText = function () {
        this.scoreLbl.text = _.sprintf("%d:%d", this._infoArr[0].value.left, this._infoArr[1].value.left);
    };
    __egretProto__.setOpponentName = function () {
        var value = this._rightValue;
        this.nameOpponentLbl.text = value.name;
    };
    __egretProto__.setOponentIconImg = function () {
        var value = this._rightValue;
        var name = value.presidentName || "英雄会长";
        var data = {
            iconSource: value.icon,
            name: name[0]
        };
        this.opponentImg.dataItem = data;
        this.opponentImg.changeDataItem();
    };
    __egretProto__.getItemRender = function (event) {
        return this._guildPlayerItemRenderer;
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildWarStartLayer;
})(egret.gui.SkinnableComponent);
GuildWarStartLayer.prototype.__class__ = "GuildWarStartLayer";
