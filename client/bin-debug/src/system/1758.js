/**
 * Created by hortor on 16/3/31.
 */
var Channel_1758 = (function () {
    function Channel_1758() {
    }
    var __egretProto__ = Channel_1758.prototype;
    /**
     * 分享链接
     */
    __egretProto__.onShareTimeline = function () {
        if (Util.isJuHe())
            return;
        alert('分享链接');
        gm.network.sendAction("gainShareReward", {}, function (data) {
            gm.dataManage.addMoney(data.awardVal, data.awardType);
            gm.dataManage.data.dailyEvent.shareTimeline = true;
            gm.dataManage.isNotFirstShared = true;
            gm.dataManage.shareTimes = data.shareTimes;
            gm.dataManage.lastShareTime = data.lastShareTime;
            if (gm.dataManage.shareTimes == 1)
                gm.dataManage.timeRemain = Conf.shareReward[3].duration;
        });
    };
    /**
     * 分享给好友
     */
    __egretProto__.onShareFriend = function () {
        if (Util.isJuHe())
            return;
        alert('分享给好友');
    };
    return Channel_1758;
})();
Channel_1758.prototype.__class__ = "Channel_1758";
