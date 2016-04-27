/**
 *
 * @author
 *
 */
var GuildBagLayer = (function (_super) {
    __extends(GuildBagLayer, _super);
    function GuildBagLayer() {
        _super.call(this);
        this.arrName = ["send", "get"];
        this.toggleBtns = [];
        this.skinName = skins.dialog.GuildBagLayerSkin;
    }
    var __egretProto__ = GuildBagLayer.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._sendGeneralItem = new egret.gui.ClassFactory(uiskins.GuildBagSendGeneralItemRenderer);
        this._sendHighItem = new egret.gui.ClassFactory(uiskins.GuildBagSendHighItemRenderer);
        this._getGeneralItem = new egret.gui.ClassFactory(uiskins.GuildBagGetGeneralItemRenderer);
        this._getHighItem = new egret.gui.ClassFactory(uiskins.GuildBagGetHighItemRenderer);
        this.initCurrData();
        this.updateAllText();
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.btnBack) {
            gm.guiLayer.removeElement(this);
        }
    };
    __egretProto__.initCurrData = function () {
        _.each(this.arrName, function (name) {
            this[name + "IsInit"] = true;
            this[name + "Data"] = [];
            this[name + "ToggleBtn"].addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
            this.toggleBtns.push(this[name + "ToggleBtn"]);
            this.changeList(name, name == "send");
        }.bind(this));
    };
    __egretProto__.updateAllText = function () {
        var redNum = 3 - gm.dataManage.data.dailyEvent.envelope;
        var crystal = gm.dataManage.data.crystal;
        var diamond = gm.dataManage.data.diamond;
        this.redNumLbl.text = _.sprintf("%d", redNum);
        this.crystalLbl.text = _.sprintf("%d", crystal);
        this.diamondLbl.text = _.sprintf("%d", diamond);
    };
    __egretProto__.toggleChangeHandler = function (evt) {
        for (var i = 0; i < this.toggleBtns.length; i++) {
            this.changeList(this.arrName[i], (this.toggleBtns[i] == evt.target));
        }
    };
    __egretProto__.changeList = function (name, isShow) {
        this[name + "List"].visible = isShow;
        this[name + "ToggleBtn"].selected = isShow;
        if (isShow) {
            if (name != "get") {
                this.currLbl.visible = false;
            }
            this.initAndUpdateList(name);
        }
    };
    __egretProto__.addList = function (name) {
        var collection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
        this[name + "List"].dataProvider = collection;
        this[name + "List"].itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        if (event.type == consts.kItemRendererGuildBagSendGeneral) {
            return this._sendGeneralItem;
        }
        if (event.type == consts.kItemRendererGuildBagSendHigh) {
            return this._sendHighItem;
        }
        if (event.type == consts.kItemRendererGuildBagGetGeneral) {
            return this._getGeneralItem;
        }
        if (event.type == consts.kItemRendererGuildBagGetHigh) {
            return this._getHighItem;
        }
    };
    __egretProto__.initAndUpdateList = function (name) {
        if (this[name + "IsInit"]) {
            this[name + "InitList"]();
            this[name + "IsInit"] = false;
        }
        else {
            this[name + "UpdateList"]();
        }
    };
    __egretProto__.sendInitList = function () {
        var data;
        data = {
            type: consts.kItemRendererGuildBagSendGeneral,
            updateFunction: function () {
                this.updateAllText();
                this.updateListData("send");
            }.bind(this)
        };
        this.sendData.push(data);
        data = {
            type: consts.kItemRendererGuildBagSendHigh,
            updateFunction: function () {
                this.updateAllText();
                this.updateListData("send");
            }.bind(this)
        };
        this.sendData.push(data);
        this.addList("send");
    };
    __egretProto__.sendUpdateList = function () {
    };
    __egretProto__.getInitList = function () {
        gm.gameUI.showLoadingLayer();
        var gid = gm.dataManage.data.guild;
        tt.GuildManage.envelopeList(gid, function (obj) {
            _.each(obj, function (v, i) {
                var data = {
                    type: v.type == 1 ? consts.kItemRendererGuildBagGetGeneral : consts.kItemRendererGuildBagGetHigh,
                    updateFunction: function () {
                        this.updateAllText();
                        this.updateListData("get");
                    }.bind(this)
                };
                this.getData.push(data);
            }.bind(this));
            this.addList("get");
            this.setCurrLblStatus();
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.getUpdateList = function () {
        gm.gameUI.showLoadingLayer();
        var gid = gm.dataManage.data.guild;
        tt.GuildManage.envelopeList(gid, function (obj) {
            this.getData = [];
            _.each(obj, function (v, i) {
                var data = {
                    type: v.type == 1 ? consts.kItemRendererGuildBagGetGeneral : consts.kItemRendererGuildBagGetHigh,
                    updateFunction: function () {
                        this.updateAllText();
                        this.updateListData("get");
                    }.bind(this)
                };
                this.getData.push(data);
            }.bind(this));
            this.getCollection.replaceAll(this.getData);
            this.setCurrLblStatus();
            gm.gameUI.hideLoadingLayer();
        }.bind(this), function () {
            gm.gameUI.hideLoadingLayer();
        }.bind(this));
    };
    __egretProto__.setCurrLblStatus = function () {
        if (_.size(this.getData) == 0) {
            this.currLbl.visible = true;
        }
        else {
            this.currLbl.visible = false;
        }
    };
    __egretProto__.updateListData = function (name) {
        _.each(this[name + "Collection"].source, function (v) {
            this[name + "Collection"].itemUpdated(v);
        }.bind(this));
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildBagLayer;
})(egret.gui.SkinnableComponent);
GuildBagLayer.prototype.__class__ = "GuildBagLayer";
