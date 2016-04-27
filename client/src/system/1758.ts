/**
 * Created by hortor on 16/3/31.
 */
class Channel_1758 {
    /**
     * 分享链接
     */
    public onShareTimeline(){
        if (Util.isJuHe()) return;
        alert('分享链接');
        gm.network.sendAction("gainShareReward", {}, (data) => {
            gm.dataManage.addMoney(data.awardVal, data.awardType);
            gm.dataManage.data.dailyEvent.shareTimeline = true;

            gm.dataManage.isNotFirstShared=true;
            gm.dataManage.shareTimes=data.shareTimes;
            gm.dataManage.lastShareTime =data.lastShareTime;

            if (gm.dataManage.shareTimes==1)
                gm.dataManage.timeRemain= Conf.shareReward[3].duration;
        });
    }

    /**
     * 分享给好友
     */
    public onShareFriend(){
        if (Util.isJuHe()) return;
        alert('分享给好友');
    }
}