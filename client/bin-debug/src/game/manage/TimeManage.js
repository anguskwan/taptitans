/**
 * Created by hortor on 16/4/6.
 */
var TimeManage = (function (_super) {
    __extends(TimeManage, _super);
    function TimeManage(data, syncFun) {
        _super.call(this);
        this.currentTime = data.sysTime;
        this.egretTime = egret.getTimer();
        this.syncCB = syncFun;
        if (!!this.syncCB) {
            var timer = new egret.Timer(1000 * 60 * 10); // 10分钟从服务器同步一次时间
            timer.addEventListener(egret.TimerEvent.TIMER, this.syncTime, this);
            timer.start();
        }
    }
    var __egretProto__ = TimeManage.prototype;
    /**
     * 获取当前时间
     * @returns {number}
     */
    __egretProto__.getCurrentTime = function () {
        var sysTime = egret.getTimer();
        this.currentTime += sysTime - this.egretTime;
        this.egretTime = sysTime;
        return this.currentTime;
    };
    /**
     * 同步服务器时间
     */
    __egretProto__.syncTime = function () {
        var self = this;
        this.syncCB(function (data) {
            if (!data)
                return;
            self.currentTime = new Date(data).getTime();
            self.egretTime = egret.getTimer();
        });
    };
    return TimeManage;
})(egret.EventDispatcher);
TimeManage.prototype.__class__ = "TimeManage";
