/**
 *
 * @author
 *
 */
var GuildWarAttLayer = (function (_super) {
    __extends(GuildWarAttLayer, _super);
    function GuildWarAttLayer(mineValue, oppValue) {
        _super.call(this);
        this._oppValue = oppValue;
        this._mineValue = mineValue;
        this._heroesArr = [];
        this._deadHero = 0;
        this.isAddAttCompleteItem = true;
        this.skinName = skins.dialog.GuildWarAttLayerSkin;
    }
    var __egretProto__ = GuildWarAttLayer.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._guildAttItemRenderer = new egret.gui.ClassFactory(uiskins.GuildHeroItemRenderer);
        this._guildAttCompleteItemRenderer = new egret.gui.ClassFactory(uiskins.GuildHeroCompleteItemRenderer);
        this.attData = [];
        this.setMineNameText();
        this.setMineIconImg();
        this.setOpponentNameText();
        this.setOpponentIconImg();
        this.setAttBtnText();
        this.setAttBtn();
        this.onSetHeroesDead("mine");
        this.onSetHeroesDead("opp");
        this.loadWarHeroesInfo();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.backBtn) {
            var warId = gm.dataManage.guild.war;
            if (warId == 0) {
                gm.postMessage(consts.kMessageShowToastLayer, "未匹配到对手");
                gm.guiLayer.removeElement(this);
                return;
            }
            gm.gameUI.showLoadingLayer();
            tt.GuildWarManage.warInfo(warId, function (obj) {
                var myId = gm.dataManage.data.guild;
                var oppId = parseInt(obj.guilds[myId].opponent);
                tt.GuildManage.queryById(myId, function (leftValue) {
                    tt.GuildManage.queryById(oppId, function (rightValue) {
                        var ly = new GuildWarStartLayer(obj, leftValue, rightValue);
                        gm.guiLayer.addElement(ly);
                        gm.guiLayer.removeElement(this);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this), function () {
                        gm.guiLayer.removeElement(this);
                        gm.gameUI.hideLoadingLayer();
                    }.bind(this));
                }.bind(this), function () {
                    gm.guiLayer.removeElement(this);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
        if (event.target == this.attBtn && this.attBtn.enabled) {
            // att
            gm.gameUI.showLoadingLayer();
            var gid = gm.dataManage.data.guild;
            var eid = this._oppValue.id;
            if (this._preData) {
                this.onSetAttOppComplete(this._preData);
                this.updateHeroList();
            }
            tt.GuildWarManage.fightEnemy(gid, eid, function (data) {
                this._preData = data;
                this.onSetAllIsAtt();
                this.setDeadHero(data);
                this.setMineValue();
                this.setAttBtnText();
                this.setAttBtn();
                this.setScoreText();
                this.setShowTitleAndScore();
                this.onAddAttCompleteItem();
                this.updateHeroList();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.initPlayersList = function () {
        _.each(this._heroesArr, function (v) {
            v["type"] = consts.kItemRendererGuildWarAtt;
            this.attData.push(v);
        }.bind(this));
        var collection = this.attCollection = new egret.gui.ArrayCollection(this.attData);
        this.attList.dataProvider = collection;
        this.attList.itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        if (event.type == consts.kItemRendererGuildWarAtt) {
            return this._guildAttItemRenderer;
        }
        if (event.type == consts.kItemRendererGuildWarAttComplete) {
            return this._guildAttCompleteItemRenderer;
        }
    };
    __egretProto__.loadWarHeroesInfo = function () {
        gm.gameUI.showLoadingLayer();
        var mineId = this._mineValue.id;
        tt.GuildWarManage.warPlayerInfo(mineId, function (mineObj) {
            _.each(mineObj, function (v, i) {
                this.onSetHeroesArr("mine", v, i);
            }.bind(this));
            var oppId = this._oppValue.id;
            tt.GuildWarManage.warPlayerInfo(oppId, function (oppObj) {
                _.each(oppObj, function (v, i) {
                    this.onSetHeroesArr("opp", v, i);
                }.bind(this));
                this.initPlayersList();
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.onSetHeroesArr = function (type, v, i) {
        if (!this._heroesArr[i]) {
            this._heroesArr[i] = {};
        }
        this._heroesArr[i][type] = v;
        this._heroesArr[i][type]["isDead"] = type == "opp" ? !parseInt(this[type + "HeroesDead"][i]) : false;
        this._heroesArr[i][type]["isAtt"] = false;
    };
    __egretProto__.onSetHeroesDead = function (type) {
        var heroesDead = _.toArray(this["_" + type + "Value"]["warInfo"]["heroes"]);
        var size = 33 - _.size(heroesDead);
        for (var j = 0; j < size; j++) {
            heroesDead.splice(0, 0, "0");
        }
        this[type + "HeroesDead"] = heroesDead;
    };
    __egretProto__.getOppHeroesAliveValue = function (data) {
        var alive = _.toArray(data.result.alive);
        var size = 33 - _.size(alive);
        for (var j = 0; j < size; j++) {
            alive.splice(0, 0, "0");
        }
        return alive;
    };
    __egretProto__.onSetOppHeroesDeadValue = function (data) {
        var alive = this.getOppHeroesAliveValue(data);
        var heroesDead = [];
        for (var i = 0; i < _.size(alive); i++) {
            var base = this.oppHeroesDead[i];
            var curr = alive[i];
            if (base == "1" && curr == "1") {
                heroesDead.push("1");
            }
            if (base == "0" && curr == "1") {
                heroesDead.push("0");
            }
            if (base == "1" && curr == "0") {
                heroesDead.push("0");
            }
            if (base == "0" && curr == "0") {
                heroesDead.push("0");
            }
        }
        this.oppHeroesDead = heroesDead;
    };
    __egretProto__.onSetAllIsAtt = function () {
        _.each(this.attData, function (v, i) {
            if (v.type == consts.kItemRendererGuildWarAttComplete) {
                return;
            }
            this.onSetIsAtt(v, true);
        }.bind(this));
    };
    __egretProto__.onSetAttOppComplete = function (data) {
        this.onSetOppHeroesDeadValue(data);
        _.each(this.attData, function (v, i) {
            if (v.type == consts.kItemRendererGuildWarAttComplete) {
                return;
            }
            this.onSetOppHeroDead(v, i);
        }.bind(this));
    };
    __egretProto__.onSetIsAtt = function (v, isAtt) {
        v["mine"]["isAtt"] = isAtt;
        v["opp"]["isAtt"] = isAtt;
    };
    __egretProto__.onSetOppHeroDead = function (v, i) {
        v["opp"]["isDead"] = !parseInt(this.oppHeroesDead[i]);
    };
    __egretProto__.onAddAttCompleteItem = function () {
        if (this.isAddAttCompleteItem) {
            var data;
            data = {
                type: consts.kItemRendererGuildWarAttComplete,
                killNum: this._deadHero
            };
            this.attCollection.addItem(data);
            this.isAddAttCompleteItem = false;
        }
        else {
            var len = _.size(this.attData);
            this.attData[len - 1].killNum = this._deadHero;
        }
    };
    __egretProto__.updateHeroList = function () {
        _.each(this.attCollection.source, function (v, i) {
            if (v.type == consts.kItemRendererGuildWarAtt) {
                v["detail"] = this._preData.result.detail[i];
            }
            this.attCollection.itemUpdated(v);
        }.bind(this));
    };
    __egretProto__.setMineNameText = function () {
        this.nameMineLbl.text = this._mineValue.name || "英雄";
    };
    __egretProto__.setMineIconImg = function () {
        var avatar = this._mineValue.avatar || "";
        if (avatar != "") {
            Util.setIconImg(avatar, this.mineImg, 96);
        }
        else {
            this.mineImg.source = "icon_default";
        }
    };
    __egretProto__.setScoreText = function () {
        this.scoreLbl.text = this._deadHero + "";
    };
    __egretProto__.setOpponentNameText = function () {
        this.nameOpponentLbl.text = this._oppValue.name || "英雄";
    };
    __egretProto__.setOpponentIconImg = function () {
        var avatar = this._oppValue.avatar || "";
        if (avatar != "") {
            Util.setIconImg(avatar, this.opponentImg, 96);
        }
        else {
            this.mineImg.source = "icon_default";
        }
    };
    __egretProto__.setAttBtnText = function () {
        var len = _.size(this._mineValue.warInfo.attacks);
        len = len >= 2 ? 2 : len;
        this.attLbl.text = _.sprintf("攻击 %d/2", len);
    };
    __egretProto__.setAttBtn = function () {
        var len = _.size(this._mineValue.warInfo.attacks);
        len = len >= 2 ? 2 : len;
        if (len < 2 && Util.isTimePast(12, 24)) {
            this.attBtn.enabled = true;
        }
        else {
            this.attBtn.enabled = false;
        }
    };
    __egretProto__.setShowTitleAndScore = function () {
        this.scoreLbl.visible = true;
        this.titleLbl.visible = true;
    };
    __egretProto__.setMineValue = function () {
        this._mineValue.warInfo.attacks.push({ count: this._deadHero, enemy: this._oppValue.id });
    };
    __egretProto__.setDeadHero = function (data) {
        var alive = this.getOppHeroesAliveValue(data);
        var heroesDead = [];
        for (var i = 0; i < _.size(alive); i++) {
            var base = this.oppHeroesDead[i];
            var curr = alive[i];
            if (base == "1" && curr == "1") {
                heroesDead.push("1");
            }
            if (base == "0" && curr == "1") {
                heroesDead.push("0");
            }
            if (base == "1" && curr == "0") {
                heroesDead.push("0");
            }
            if (base == "0" && curr == "0") {
                heroesDead.push("0");
            }
        }
        var diff1 = _.difference(heroesDead, ["0"]);
        var diff2 = _.difference(this.oppHeroesDead, ["0"]);
        this._deadHero = _.size(diff2) - _.size(diff1);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildWarAttLayer;
})(egret.gui.SkinnableComponent);
GuildWarAttLayer.prototype.__class__ = "GuildWarAttLayer";
