var uiskins;
(function (uiskins) {
    /**
     *
     * @author
     *
     */
    var GuildGoldItemSelect = (function (_super) {
        __extends(GuildGoldItemSelect, _super);
        function GuildGoldItemSelect() {
            _super.call(this);
            this.intervalIndex = -1;
            this.timeoutIndex = -1;
            this.skinName = skins.components.GuildBadgeItemSelectSkin;
        }
        var __egretProto__ = GuildGoldItemSelect.prototype;
        __egretProto__.isNewBie = function () {
            var id = gm.dataManage.data.id;
            var find = _.find(gm.dataManage.guild.newbie, function (v) {
                return v == id;
            }.bind(this));
            if (!_.isUndefined(find)) {
                return true;
            }
            return false;
        };
        __egretProto__.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLayer, this);
        };
        __egretProto__.onTouchLayer = function (event) {
            event.stopPropagation();
            this.touchItem();
        };
        __egretProto__.touchItem = function () {
            if (this.isPass == 0) {
                var curTime = gm.timeManage.getCurrentTime();
                var zodiacId = gm.dataManage.data.zodiacId;
                var timeFormat = moment(curTime).format('YYYY-MM-DD');
                var id = _.strRightBack(zodiacId, timeFormat);
                var minute = moment(curTime).minute();
                if (!_.startsWith(zodiacId, timeFormat) && !this.isNewBie()) {
                    //报名
                    if (minute < 30) {
                        gm.gameUI.showLoadingLayer();
                        gm.dataManage.joinZodiac(function () {
                            this.setUpdate();
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this), function () {
                            gm.gameUI.hideLoadingLayer();
                        }.bind(this));
                    }
                    else {
                        this.onShowGuildGoldLayer();
                    }
                }
                else if (parseInt(id) == this.value.id) {
                    //等待进入
                    var minute = moment(curTime).minute();
                    if (minute >= 30) {
                        this.onShowGuildGoldLayer();
                    }
                }
                else {
                    //等待进入
                    var minute = moment(curTime).minute();
                    if (minute >= 30) {
                        this.onShowGuildGoldLayer();
                    }
                }
            }
            else {
                if (this.isPass == -1) {
                }
                else {
                    this.onShowGuildGoldLayer();
                }
            }
        };
        __egretProto__.onShowGuildGoldLayer = function () {
            gm.gameUI.showLoadingLayer();
            var id = this.value.id;
            tt.BattleManage.zodiacPlayerRankingList(id, 0, function (list) {
                var data = {
                    list: list,
                    id: id
                };
                var ly = new GuildGoldLayer(data);
                gm.guiLayer.addElement(ly);
                gm.gameUI.hideLoadingLayer();
            }.bind(this), function () {
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        };
        __egretProto__.setIsPass = function () {
            var curTime = gm.timeManage.getCurrentTime();
            var time = gm.gameUI.getGuildGoldSource(this.value.id).time;
            var hour = moment(curTime).hour();
            if (hour < time[0]) {
                return this.isPass = -1;
            }
            if (hour >= time[1]) {
                return this.isPass = 1;
            }
            if (hour >= time[0] && hour < time[1]) {
                return this.isPass = 0;
            }
        };
        __egretProto__.changeData = function (value) {
            this.value = value;
            this.setIsPass();
            this.setUpdateTime();
            this.setUpdate();
        };
        __egretProto__.setUpdateTime = function () {
            if (this.isPass == 0) {
                var time = this.getSetOffTime();
                if (this.intervalIndex != -1) {
                    egret.clearInterval(this.intervalIndex);
                }
                if (this.timeoutIndex != -1) {
                    egret.clearTimeout(this.timeoutIndex);
                }
                if (time == 0) {
                    return;
                }
                this.intervalIndex = egret.setInterval(this.setBtnText, this, 1000);
                this.timeoutIndex = egret.setTimeout(function () {
                    this.setUpdate();
                    egret.clearInterval(this.intervalIndex);
                }.bind(this), this, time);
            }
            else {
                if (this.intervalIndex != -1) {
                    egret.clearInterval(this.intervalIndex);
                }
                if (this.timeoutIndex != -1) {
                    egret.clearTimeout(this.timeoutIndex);
                }
            }
        };
        __egretProto__.getSetOffTime = function () {
            var curTime = gm.timeManage.getCurrentTime();
            var currTime = moment(curTime).valueOf();
            var currHour = moment(curTime).hour();
            var nextHour = currHour + 1;
            var baseTime1 = this.getHourAndMinTime(currHour, 0).valueOf();
            var baseTime2 = this.getHourAndMinTime(currHour, 30).valueOf();
            var baseTime3 = this.getHourAndMinTime(nextHour, 0).valueOf();
            if (currTime >= baseTime1 && currTime < baseTime2) {
                return baseTime2 - currTime;
            }
            return 0;
        };
        __egretProto__.getHourAndMinTime = function (hour, minute) {
            var baseTime = moment(gm.timeManage.getCurrentTime());
            baseTime.set('hour', hour);
            baseTime.set('minute', minute);
            baseTime.set('second', 0);
            baseTime.set('millisecond', 0);
            return baseTime;
        };
        __egretProto__.setUpdate = function () {
            this.setIconImg();
            this.setTimeText();
            this.setBtnGroup();
            this.setBtnText();
            this.setBaseImg();
            this.setNameText();
        };
        __egretProto__.setIconImg = function () {
            var source;
            if (this.isPass == 0) {
                source = "guild_gold_item_on" + this.value.id;
            }
            else {
                if (this.isPass == -1) {
                    source = "guild_gold_item_off" + this.value.id;
                }
                else {
                    source = "guild_gold_item_on" + this.value.id;
                }
            }
            this.iconImg.source = source;
        };
        __egretProto__.setTimeText = function () {
            var text;
            var color;
            var zodiacId = gm.dataManage.data.zodiacId;
            var curTime = gm.timeManage.getCurrentTime();
            var timeFormat = moment(curTime).format('YYYY-MM-DD');
            var id = _.strRightBack(zodiacId, timeFormat);
            var minute = moment(curTime).minute();
            if (this.isPass == 0) {
                if (!_.startsWith(zodiacId, timeFormat) && !this.isNewBie()) {
                    if (minute < 30) {
                        text = "";
                        color = 0xFFFFFF;
                    }
                    else {
                        text = "当前激战中";
                        color = 0xE55D5D;
                    }
                }
                else if (parseInt(id) == this.value.id) {
                    text = "";
                    color = 0xFFFFFF;
                }
                else {
                    if (minute < 30) {
                        text = "当前报名中";
                        color = 0xE55D5D;
                    }
                    else {
                        text = "当前激战中";
                        color = 0xE55D5D;
                    }
                }
            }
            else {
                if (this.isPass == -1) {
                    var time = gm.gameUI.getGuildGoldSource(this.value.id).time;
                    text = _.sprintf("%d:00 - %d:00", time[0], time[1]);
                    color = 0xFFFFFF;
                }
                else {
                    if (!_.startsWith(zodiacId, timeFormat)) {
                        text = "";
                        color = 0xFFFFFF;
                    }
                    else if (parseInt(id) == this.value.id) {
                        text = "我的比赛";
                        color = 0xFFFFFF;
                    }
                    else {
                        text = "";
                        color = 0xFFFFFF;
                    }
                }
            }
            this.timeLbl.text = text;
            this.timeLbl.textColor = color;
        };
        __egretProto__.setBaseImg = function () {
            var source;
            var zodiacId = gm.dataManage.data.zodiacId;
            var timeFormat = moment(gm.timeManage.getCurrentTime()).format('YYYY-MM-DD');
            var id = _.strRightBack(zodiacId, timeFormat);
            if (this.isPass == 0) {
                if (!_.startsWith(zodiacId, timeFormat)) {
                    source = "guild_gold_item_base_red";
                }
                else if (parseInt(id) == this.value.id) {
                    source = "guild_gold_item_base_my";
                }
                else {
                    source = "guild_gold_item_base_red";
                }
            }
            else {
                if (this.isPass == -1) {
                    source = "guild_gold_item_base_disabled";
                }
                else {
                    if (!_.startsWith(zodiacId, timeFormat)) {
                        source = "guild_gold_item_base_common";
                    }
                    else if (parseInt(id) == this.value.id) {
                        source = "guild_gold_item_base_my";
                    }
                    else {
                        source = "guild_gold_item_base_common";
                    }
                }
            }
            this.baseImg.source = source;
        };
        __egretProto__.setNameText = function () {
            var name = gm.gameUI.getGuildGoldSource(this.value.id).name;
            var color;
            var zodiacId = gm.dataManage.data.zodiacId;
            var timeFormat = moment(gm.timeManage.getCurrentTime()).format('YYYY-MM-DD');
            var id = _.strRightBack(zodiacId, timeFormat);
            if (this.isPass == 0) {
                color = 0xffffff;
            }
            else {
                if (this.isPass == -1) {
                    color = 0x959595;
                }
                else {
                    if (!_.startsWith(zodiacId, timeFormat)) {
                        color = 0x56b5d4;
                    }
                    else if (parseInt(id) == this.value.id) {
                        color = 0xffffff;
                    }
                    else {
                        color = 0x56b5d4;
                    }
                }
            }
            this.nameLbl.text = name;
            this.nameLbl.textColor = color;
        };
        __egretProto__.setBtnGroup = function () {
            if (this.isPass == 0) {
                var zodiacId = gm.dataManage.data.zodiacId;
                var curTime = gm.timeManage.getCurrentTime();
                var timeFormat = moment(curTime).format('YYYY-MM-DD');
                var id = _.strRightBack(zodiacId, timeFormat);
                if (!_.startsWith(zodiacId, timeFormat) && !this.isNewBie()) {
                    var minute = moment(curTime).minute();
                    if (minute < 30) {
                        this.btnGroup.visible = true; // 过了30分钟隐藏
                    }
                    else {
                        this.btnGroup.visible = false;
                    }
                }
                else if (parseInt(id) == this.value.id) {
                    this.btnGroup.visible = true;
                }
                else {
                    this.btnGroup.visible = false;
                }
            }
            else {
                this.btnGroup.visible = false;
            }
        };
        __egretProto__.setBtnText = function () {
            if (this.isPass == 0) {
                var curTime = gm.timeManage.getCurrentTime();
                var minute = moment(curTime).minute();
                var zodiacId = gm.dataManage.data.zodiacId;
                var timeFormat = moment(curTime).format('YYYY-MM-DD');
                var id = _.strRightBack(zodiacId, timeFormat);
                if (!_.startsWith(zodiacId, timeFormat)) {
                    if (minute < 30) {
                        this.btnText.text = "报名";
                    }
                    else {
                        this.btnText.text = "";
                    }
                }
                else if (parseInt(id) == this.value.id) {
                    if (minute < 30) {
                        var time = this.getSetOffTime();
                        this.btnText.text = Util.formatTime(Math.floor(time / 1000), false);
                    }
                    else {
                        this.btnText.text = "开始";
                    }
                }
                else {
                    this.btnText.text = "";
                }
            }
            else {
                this.btnText.text = "";
            }
        };
        __egretProto__.closeLayer = function () {
            if (this.intervalIndex != -1) {
                egret.clearInterval(this.intervalIndex);
            }
            if (this.timeoutIndex != -1) {
                egret.clearTimeout(this.timeoutIndex);
            }
        };
        return GuildGoldItemSelect;
    })(egret.gui.SkinnableComponent);
    uiskins.GuildGoldItemSelect = GuildGoldItemSelect;
    GuildGoldItemSelect.prototype.__class__ = "uiskins.GuildGoldItemSelect";
})(uiskins || (uiskins = {}));
