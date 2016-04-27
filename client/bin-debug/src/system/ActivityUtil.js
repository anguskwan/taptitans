/**
 * Created by hortor on 16/3/30.
 */
/**
 * 活动类型
 */
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["LIFE_CARD"] = 1] = "LIFE_CARD";
    ActivityType[ActivityType["CAT_GO"] = 2] = "CAT_GO";
    ActivityType[ActivityType["BLACK_MARKET"] = 3] = "BLACK_MARKET";
    ActivityType[ActivityType["SMASHING_GOLDEN_EGGS"] = 4] = "SMASHING_GOLDEN_EGGS";
    ActivityType[ActivityType["TOTAL_DIAMOND_CONSUMPTION"] = 5] = "TOTAL_DIAMOND_CONSUMPTION";
    ActivityType[ActivityType["FIRST_RECHARGE_DOUBLE_DIAMOND"] = 6] = "FIRST_RECHARGE_DOUBLE_DIAMOND";
    ActivityType[ActivityType["CHRISTMAS_DOUBLE_MONEY"] = 7] = "CHRISTMAS_DOUBLE_MONEY";
    ActivityType[ActivityType["RECHARGE_GIFT"] = 8] = "RECHARGE_GIFT";
    ActivityType[ActivityType["FIRST_RECHARGE_GIFT"] = 9] = "FIRST_RECHARGE_GIFT";
    ActivityType[ActivityType["MONTH_CARD"] = 10] = "MONTH_CARD";
    ActivityType[ActivityType["GROWTH_FUND"] = 11] = "GROWTH_FUND";
    ActivityType[ActivityType["WORTHBOX"] = 12] = "WORTHBOX";
})(ActivityType || (ActivityType = {}));
;
/**
 * 活动工具类
 */
var ActivityUtil = (function () {
    function ActivityUtil() {
    }
    var __egretProto__ = ActivityUtil.prototype;
    /**
     * 活动是否开启
     * @param type
     * @returns {boolean}
     */
    ActivityUtil.hasActivityOpened = function (type) {
        if (!gm.dataManage.activityTime || !gm.dataManage.activityTime.activity[type]) {
            return false;
        }
        var serverTime = gm.timeManage.getCurrentTime();
        var beginTime = gm.dataManage.activityTime.activity[type].beginTime;
        var endTime = gm.dataManage.activityTime.activity[type].endTime;
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
    /**
     * 获取活动
     * @param type
     * @returns {any}
     */
    ActivityUtil.getActivityInfo = function (type) {
        if (!gm.dataManage.activityTime || !gm.dataManage.activityTime.activity[type]) {
            return null;
        }
        return gm.dataManage.activityTime.activity[type];
    };
    return ActivityUtil;
})();
ActivityUtil.prototype.__class__ = "ActivityUtil";
