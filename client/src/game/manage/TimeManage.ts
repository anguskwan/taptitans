/**
 * Created by hortor on 16/4/6.
 */
class TimeManage extends egret.EventDispatcher {
    private currentTime:number;
    private egretTime:number;
    private syncCB:any;

    public constructor(data, syncFun) {
        super();
        this.currentTime = data.sysTime;
        this.egretTime = egret.getTimer();
        this.syncCB = syncFun;
        if (!!this.syncCB){
            var timer:egret.Timer = new egret.Timer(1000 * 60 * 10);                // 10分钟从服务器同步一次时间
            timer.addEventListener(egret.TimerEvent.TIMER,this.syncTime,this);
            timer.start();
        }
    }

    /**
     * 获取当前时间
     * @returns {number}
     */
    public getCurrentTime():number{
        var sysTime = egret.getTimer();
        this.currentTime += sysTime - this.egretTime;
        this.egretTime = sysTime;
        return this.currentTime;
    }

    /**
     * 同步服务器时间
     */
    syncTime(){
        var self = this;
        this.syncCB(function(data){
            if (!data) return;
            self.currentTime = new Date(data).getTime();
            self.egretTime = egret.getTimer();
        });
    }
}