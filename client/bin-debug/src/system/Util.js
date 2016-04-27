/**
 * Created by lhb on 15/9/2.
 */
var Util = (function () {
    function Util() {
    }
    var __egretProto__ = Util.prototype;
    Util.formatNumber = function (value) {
        value = Math.floor(value);
        var exp = Math.floor(Util.getExponent(value));
        var unitIt = Math.floor(exp / 3);
        var rem = exp % 3;
        var numStr = String(value / Math.pow(10, unitIt * 3)).substr(0, 4 + rem);
        return numStr + Util.getUnit(exp);
    };
    Util.getUnit = function (exp) {
        var unitIt = Math.floor(exp / 3);
        if (exp < 15) {
            return Util.unitArr[unitIt];
        }
        else if (exp < 93) {
            var code = 92 + unitIt;
            var unit = String.fromCharCode(code);
            return unit + unit;
        }
        else {
            var unitIt = Math.floor(exp / 3);
            return "e+" + unitIt * 3;
        }
    };
    Util.getExponent = function (value) {
        var exp = 0;
        while (value > 10) {
            exp++;
            value /= 10;
        }
        return exp;
    };
    Util.setCookie = function (c_name, value, expires) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + expires);
        document.cookie = c_name + "=" + encodeURIComponent(value) + ((expires == null) ? "" : ";expires=" + exdate.toUTCString());
    };
    Util.getCookie = function (c_name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1)
                    c_end = document.cookie.length;
                return decodeURIComponent(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    };
    Util.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    };
    Util.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    };
    Util.invokeCallback = function (cb, param) {
        if (!!cb && typeof cb === 'function') {
            cb.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    };
    Util.removeFromParent = function (obj) {
        if (!obj) {
            return;
        }
        if (obj.parent) {
            if (_.isFunction(obj.parent.removeElement)) {
                obj.parent.removeElement(obj);
            }
            else {
                obj.parent.removeChild(obj);
            }
        }
    };
    Util.testSkeleton = function (gui) {
        var armature = new tt.Armature('boss2');
        armature.defaultAnimation = 'idle';
        armature.play('idle', true);
        gui.addElement(armature);
        //armature.x = 0;
        //armature.y = 0;
    };
    Util.randomReal = function (min, max) {
        if (_.isArray(min)) {
            max = min[1];
            min = min[0];
        }
        return Math.random() * (max - min) + min;
    };
    Util.randomInt = function (min, max) {
        if (_.isArray(min)) {
            max = min[1];
            min = min[0];
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Util.randomRate = function (rate) {
        return Math.random() < rate;
    };
    Util.groupBy = function (obj, key1, key2) {
        var ret = {};
        _.each(obj, function (meta) {
            ret[meta[key1]] = ret[meta[key1]] || {};
            ret[meta[key1]][meta[key2]] = meta;
        });
        return ret;
    };
    Util.ReplaceFirstUper = function (str) {
        str = str.toLowerCase();
        return str.replace(/\b(\w)|\s(\w)/g, function (m) {
            return m.toUpperCase();
        });
    };
    Util.formatTime = function (sec, showHour) {
        var hour = Math.floor(sec / 3600);
        var second = Math.floor(sec % 3600);
        var minute = Math.floor(second / 60);
        second = second % 60;
        var hourToMinute = hour * 60;
        minute = showHour ? minute : (hourToMinute + minute);
        if (sec < 0) {
            return "0";
        }
        var str = "";
        if (showHour) {
            if (showHour != "auto" || hour != 0) {
                if (hour >= 10) {
                    str = hour.toString();
                }
                else {
                    str = "0" + hour;
                }
                str = str + ":";
            }
        }
        if (minute >= 10) {
            str = str + minute;
        }
        else {
            str = str + "0" + minute;
        }
        if (second >= 10) {
            str = str + ":" + second;
        }
        else {
            str = str + ":0" + second;
        }
        return str;
    };
    Util.modByLimit = function (num, limit) {
        return (num - 1) % limit + 1;
    };
    Util.isLocalServer = function () {
        return Util.getQueryString('d') == '1';
    };
    Util.isLocalClient = function () {
        return location.hostname == 'localhost';
    };
    Util.isQAServer = function () {
        return Util.getQueryString('d') == '2';
    };
    Util.isMultipleServer = function () {
        return Util.getQueryString('d') == '3';
    };
    Util.isOnlineServer = function () {
        return !Util.isLocalServer() && !Util.isQAServer();
    };
    Util.labelGoUpAndRemoveGUI = function (label, dy, duration, cb) {
        label.includeInLayout = false;
        var seq = new egret.gui.Sequence(label);
        var move = new egret.gui.Move();
        move.yBy = dy * 2 / 3;
        move.duration = duration * 2 / 3;
        var par = new egret.gui.Parallel(label);
        var move2 = new egret.gui.Move();
        move2.yBy = dy / 3;
        move2.duration = duration / 3;
        var fade = new egret.gui.Fade();
        fade.alphaTo = 0;
        fade.duration = duration / 3;
        par.children = [move2, fade];
        seq.children = [move, par];
        seq.play();
        egret.setTimeout(function () {
            if (cb) {
                Util.invokeCallback(cb);
            }
            else {
                Util.removeFromParent(label);
            }
        }, this, duration);
    };
    Util.initBtnAnchor = function (btn) {
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        btn.x = btn.x + btn.width / 2;
        btn.y = btn.y + btn.height / 2;
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
            btn.scaleX = 1;
            btn.scaleY = 1;
            egret.Tween.removeTweens(event.target);
            var tw = egret.Tween.get(event.target);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            //console.log("TOUCH_BEGIN");
        }.bind(this), this);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
            egret.Tween.removeTweens(event.target);
            var tw = egret.Tween.get(event.target);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            //console.log("TOUCH_END");
        }.bind(this), this);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function (event) {
            var tw = egret.Tween.get(event.target);
            tw.to({ scaleX: 1, scaleY: 1 }, 100);
            //console.log("TOUCH_RELEASE_OUTSIDE");
        }.bind(this), this);
    };
    Util.isMobile = function () {
        return egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE;
    };
    Util.getWechatUrlBySize = function (url, size) {
        return url.replace(/\/[0-9]+$/, "/" + size);
    };
    Util.getRelace = function (str, searchValue, replaceValue) {
        return str.replace(searchValue, replaceValue);
    };
    Util.setIconImg = function (avatar, iconImg, size) {
        if (gm.network.env == "qq") {
            size = 100;
        }
        var url = Util.getWechatUrlBySize(avatar, size);
        RES.getResByUrl(url, function (event) {
            iconImg.source = event;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    Util.isDouble11 = function () {
        //var d = new Date();
        //return d.getDate() == 22 && d.getMonth() == 1;
        return ActivityUtil.hasActivityOpened(6 /* FIRST_RECHARGE_DOUBLE_DIAMOND */);
    };
    Util.isChristmas = function () {
        //return true;
        var day = moment().date();
        var month = moment().month();
        return month == 0 && day < 25 && day >= 18;
    };
    Util.isOpenLifeCardActivity = function () {
        //var day = moment().date();
        //var month = moment().month() + 1;
        //return month == 3 && day <= 15;
        //var begin=gm.dataManage.activityTime.activity[1].beginTime;
        //var end=gm.dataManage.activityTime.activity[1].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(1 /* LIFE_CARD */);
    };
    Util.isOpenThreeActivity = function () {
        //var begin=gm.dataManage.activityTime.activity[9].beginTime;
        //var end=gm.dataManage.activityTime.activity[9].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(9 /* FIRST_RECHARGE_GIFT */);
    };
    Util.isOpenMonth = function () {
        //var begin=gm.dataManage.activityTime.activity[10].beginTime;
        //var end=gm.dataManage.activityTime.activity[10].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(10 /* MONTH_CARD */);
    };
    Util.isOpenEggActivity = function () {
        //var begin=gm.dataManage.activityTime.activity[4].beginTime;
        //var end=gm.dataManage.activityTime.activity[4].endTime;
        //console.log(`ActivityEgg: beginTime= ${begin}, endTime=${end}.`);
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(4 /* SMASHING_GOLDEN_EGGS */);
    };
    Util.isOpenGrowthActivity = function () {
        return ActivityUtil.hasActivityOpened(11 /* GROWTH_FUND */);
    };
    Util.isOpenWorthBoxActivity = function () {
        return ActivityUtil.hasActivityOpened(12 /* WORTHBOX */);
    };
    Util.isEveryDayDouble = function () {
        var day = moment().date();
        var month = moment().month();
        return month == 1 && day <= 22 && day >= 7;
    };
    Util.isBetweenTime = function (beginTime, endTime) {
        var serverTime = gm.dataManage.serverTimeWX;
        if (!!beginTime) {
            // 还未开始;,
            if (serverTime < new Date(beginTime).getTime())
                return false;
        }
        if (!!endTime) {
            // 已结束;
            if (serverTime >= new Date(endTime).getTime())
                return false;
        }
        return true;
    };
    Util.isOpenCat = function () {
        // var day = moment().date();
        //var month = moment().month();
        //return month == 1 && day <= 12 && day >= 7;
        //var begin=gm.dataManage.activityTime.activity[2].beginTime;
        //var end=gm.dataManage.activityTime.activity[2].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(2 /* CAT_GO */);
    };
    Util.isOpenBlack = function () {
        //var day = moment().date();
        //var month = moment().month();
        //return month == 1 && day <= 22 && day >= 13;
        //var begin=gm.dataManage.activityTime.activity[3].beginTime;
        //var end=gm.dataManage.activityTime.activity[3].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(3 /* BLACK_MARKET */);
    };
    Util.isOpenCostDiamond = function () {
        //var day = moment().date();
        //var month = moment().month();
        //return month == 1 && day <= 22 && day >= 13;
        //var begin=gm.dataManage.activityTime.activity[5].beginTime;
        //var end=gm.dataManage.activityTime.activity[5].endTime;
        //console.log("begin,end,serverTime"+begin,end,gm.dataManage.serverTimeWX);
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(5 /* TOTAL_DIAMOND_CONSUMPTION */);
    };
    Util.isOpenAccu = function () {
        //var begin=gm.dataManage.activityTime.activity[8].beginTime;
        //var end=gm.dataManage.activityTime.activity[8].endTime;
        //return Util.isBetweenTime(begin,end);
        return ActivityUtil.hasActivityOpened(8 /* RECHARGE_GIFT */);
        // return false;
    };
    Util.getImageUrl = function (name, image) {
        if (image === void 0) { image = "png"; }
        var prefix = "";
        if (!Util.isLocalServer() && !Util.isLocalClient()) {
            prefix = "taptitans/";
        }
        return prefix + "resource/image/" + name + "." + image;
    };
    Util.getResourceUrl = function (name) {
        var prefix = "";
        if (!Util.isLocalServer() && !Util.isLocalClient()) {
            prefix = "taptitans/";
        }
        return prefix + "resource/" + name;
    };
    Util.isTimePast = function (from, to) {
        var time = new Date();
        var fromTime = new Date();
        var toTime = new Date();
        fromTime.setHours(from, 0, 0, 0);
        toTime.setHours(to, 0, 0, 0);
        return time.getTime() >= fromTime.getTime() && time.getTime() <= toTime.getTime();
    };
    Util.setStyleText = function (label, str) {
        if (str === void 0) { str = ""; }
        var styleParser = new egret.HtmlTextParser();
        label.textFlow = styleParser.parser(str);
    };
    Util.getServerTime = function () {
        if (gm.dataManage.serverTime == 0) {
            return new Date().getTime();
        }
        var server = new Date(gm.dataManage.serverTime).getTime();
        var currTime = new Date().getTime();
        return currTime + (server - Util.time);
    };
    Util.getHourTime = function (hour) {
        var curTime = gm.timeManage.getCurrentTime();
        var baseTime = moment(curTime);
        baseTime.set('hour', hour);
        baseTime.set('minute', 0);
        baseTime.set('second', 0);
        baseTime.set('millisecond', 0);
        return baseTime;
    };
    Util.isJuHe = function () {
        //return true;
        return Util.getQueryString('channelType') === "juhe";
    };
    Util.isCheatingOpen = false;
    Util.unitArr = ["", "K", "M", "B", "T", "aa", "bb", "cc"];
    Util.formatActivityDate = function (beginTime, endTime) {
        return Util.formatDate(beginTime) + '--' + Util.formatDate(endTime);
    };
    Util.formatActivityDateThree = function (endTime) {
        return '截止日期:' + Util.formatDate(endTime);
    };
    Util.formatDate = function (time) {
        var str = "";
        if (!!time) {
            var timeDate = new Date(time);
            str += (timeDate.getMonth() + 1) + "月";
            str += timeDate.getDate() + "日";
        }
        return str;
    };
    Util.time = new Date().getTime();
    return Util;
})();
Util.prototype.__class__ = "Util";
