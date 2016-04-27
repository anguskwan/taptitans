/**
 *
 * @author
 *
 */
var GuildGoldLayer = (function (_super) {
    __extends(GuildGoldLayer, _super);
    function GuildGoldLayer(value) {
        _super.call(this);
        this.timeoutIndex = -1;
        this.value = value;
        this.skinName = skins.dialog.GuildGoldLayerSkin;
    }
    var __egretProto__ = GuildGoldLayer.prototype;
    __egretProto__.isPass = function () {
        var curTime = gm.timeManage.getCurrentTime();
        var time = gm.gameUI.getGuildGoldSource(this.value.id).time;
        var currTime = moment(curTime).hour();
        if (currTime >= time[0] && currTime < time[1]) {
            return true;
        }
        return false;
    };
    __egretProto__.getZodiacId = function () {
        var zodiacId = gm.dataManage.data.zodiacId;
        var curTime = gm.timeManage.getCurrentTime();
        var timeFormat = moment(curTime).format('YYYY-MM-DD');
        var id = _.strRightBack(zodiacId, timeFormat);
        return parseInt(id);
    };
    __egretProto__.getHourTime = function (hour) {
        var curTime = gm.timeManage.getCurrentTime();
        var baseTime = moment(curTime);
        baseTime.set('hour', hour);
        baseTime.set('minute', 0);
        baseTime.set('second', 0);
        baseTime.set('millisecond', 0);
        return baseTime;
    };
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        this._guildGoldItem = new egret.gui.ClassFactory(uiskins.GuildGoldItemRenderer);
        this._guildGoldLineItem = new egret.gui.ClassFactory(uiskins.GuildGoldLineItemRenderer);
        this.goldData = [];
        this.loadList();
        this.setBtnStatus();
        this.setTitleText();
        this.onSetTime();
        this.setBtnText();
    };
    __egretProto__.loadList = function () {
        var data;
        var line;
        var isAddLine = false;
        _.each(this.value.list, function (v, i) {
            var index = i + 1;
            data = {
                type: consts.kItemRendererGuildGold,
                value: v
            };
            if (index != v.rank + 1) {
                if (!isAddLine) {
                    line = {
                        type: consts.kItemRendererGuildGoldLine
                    };
                    this.goldData.push(line);
                    isAddLine = true;
                }
                this.goldData.push(data);
            }
            else {
                this.goldData.push(data);
            }
        }.bind(this));
        this.addList("gold");
    };
    __egretProto__.addList = function (name) {
        var collection = this[name + "Collection"] = new egret.gui.ArrayCollection(this[name + "Data"]);
        this[name + "List"].dataProvider = collection;
        this[name + "List"].itemRendererFunction = function (item) {
            return this.getItemRender(item);
        }.bind(this);
    };
    __egretProto__.getItemRender = function (event) {
        if (event.type == consts.kItemRendererGuildGold) {
            return this._guildGoldItem;
        }
        if (event.type == consts.kItemRendererGuildGoldLine) {
            return this._guildGoldLineItem;
        }
    };
    __egretProto__.onTouchLayer = function (event) {
        event.stopPropagation();
        if (event.target == this.closeBtn) {
            this.onCloseLayer();
        }
        if (event.target == this.attBtn) {
            //att layer
            if (gm.dataManage.data.dailyEvent.zodiacTimes > 11) {
                gm.postMessage(consts.kMessageShowToastLayer, "今日的次数用完了");
                return;
            }
            gm.gameUI.showLoadingLayer();
            var id = this.value.id;
            tt.BattleManage.fightZodiacOpponent(id, function (data) {
                this.onCloseLayer();
                data["goldId"] = id;
                var ly = new GuildGoldPKCompleteLayer(data);
                gm.guiLayer.addElement(ly);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    };
    __egretProto__.onSetTime = function () {
        var time = gm.gameUI.getGuildGoldSource(this.value.id).time;
        var currTime = moment().valueOf();
        var baseTime = this.getHourTime(time[1]).valueOf();
        var offsetTime = baseTime - currTime;
        this.timeoutIndex = egret.setTimeout(function () {
            this.setBtnStatus();
        }.bind(this), this, offsetTime);
    };
    __egretProto__.setBtnStatus = function () {
        if (this.isPass() && this.getZodiacId() == this.value.id) {
            this.goldList.bottom = 80;
            this.attGroup.visible = true;
            this.attRect.visible = true;
        }
        else {
            this.attGroup.visible = false;
            this.attRect.visible = false;
            this.goldList.bottom = 0;
        }
    };
    __egretProto__.setTitleText = function () {
        var name = gm.gameUI.getGuildGoldSource(this.value.id).name;
        this.titleLbl.text = name + "排行榜";
    };
    __egretProto__.setBtnText = function () {
        var zodiacTimes = 12 - gm.dataManage.data.dailyEvent.zodiacTimes;
        this.attText.text = _.sprintf("匹配对手:(%d)", zodiacTimes);
    };
    __egretProto__.onCloseLayer = function () {
        if (this.timeoutIndex != -1) {
            egret.clearTimeout(this.timeoutIndex);
        }
        gm.guiLayer.removeElement(this);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    return GuildGoldLayer;
})(egret.gui.SkinnableComponent);
GuildGoldLayer.prototype.__class__ = "GuildGoldLayer";
