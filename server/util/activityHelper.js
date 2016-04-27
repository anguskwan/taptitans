/**
 * Created by hortor on 16/3/10.
 * 用于活动配置管理;
 */

var exp = module.exports;

/**
 * 活动配置类型，增加新的活动类型，请增加新类型常量;
 * @type {{}}
 */
exp.activityType = {
    LIFE_CARD : 1,                      // 终生月卡;
    CAT_GO : 2,                         // 招财猫;
    BLACK_MARKET : 3,                   // 黑市;
    SMASHING_GOLDEN_EGGS : 4,           // 砸金蛋;
    TOTAL_DIAMOND_CONSUMPTION : 5,      // 钻石消耗累计;
    FIRST_RECHARGE_DOUBLE_DIAMOND : 6,  // 首充双倍;
    CHRISTMAS_DOUBLE_MONEY : 7,         // 圣诞双倍;
    RECHARGE_GIFT : 8,                  // 累积充值;
    FIRST_RECHARGE_GIFT : 9,            // 首充3元礼包;
    MONTH_CARD : 10,                    // 月卡活动;
    GROWTH_FUND : 11,                   // 成长基金;
    TREASURE_CHEST : 12,                // 超值宝箱;
};

/**
 * 活动默认值;
 * @type {{}}
 */
exp.defaultVal = {
    GoldenEggs_Exchange_From : 12,
    GoldenEggs_Exchange_To : 1,
    GoldenEggs_Max_Hammer : 0,
    GoldenEggs_Consume_Diamond : 0,
    GoldenEggs_Consume_Hammer : 1,
    First_Recharge_Max_Cost : 3,
    Growth_Fund_Min_RMB : 68,
    Treasure_Chest_Max_Times : 10,
};

/**
 * 获取活动配置;
 * @returns {activity|{}|*}
 */
exp.getActivityConfig = function(){
    return Conf.simpleActivity;
};

/**
 * 获取活动信息
 * @param type 即activityType
 * @returns {*}
 */
exp.getActivityInfo = function(type){
    if (!Conf || !Conf.activity) return null;
    return Conf.activity[type];
};

/**
 * 是否匹配版本
 * @param type          即activityType
 * @param currentVer    当前版本
 * @returns {boolean}   true为版本匹配，false为版本不匹配
 */
exp.isMatchVersion = function(type, currentVer){
    return currentVer == exp.getVersion(type);
};

/**
 * 获取版本
 * @param type        即activityType
 * @returns {*}       版本号
 */
exp.getVersion = function(type){
    if (!Conf || !Conf.activity) return 0;
    var activity = Conf.activity[type];
    if (!activity || !activity.version) return 0;
    return activity.version;
};

/**
 * 活动是否开启;
 * @param type 即activityType
 * @returns {boolean}   true为开启，false为关闭
 */
exp.hasActivityOpened = function(type){
    if (!Conf || !Conf.activity) return false;
    var activity = Conf.activity[type];
    if (!activity) return false;
    var now = Date.now();
    if (!!activity.beginTime){
        // 还未开始;
        if (now < new Date(activity.beginTime).getTime()) return false;
    }
    if (!!activity.endTime){
        // 已结束;
        if (now >= new Date(activity.endTime).getTime()) return false;
    }
    return true;
};

/**
 * 获取角色能刷新活动信息(招财猫，累积充值，累积消耗)
 * @param uid    角色ID
 * @param type   活动类型
 * @param next   回调
 */
exp.getPlayerRefreshActivityInfo = function(uid, type, next){
    var actInfo = null;
    async.waterfall([
        function(callback){
            Db.activity.findOrCreate({_id:uid}, {cat:{times:0, version:0},purchase:{count:0,got:[], version:0}, diamond:{count:0,got:[], version:0},growthFund:{purchase:0,statusArr:[], version:0}}, callback);
        },
        function(activity, created, callback){
            if (!activity) {
                return next(null, null);
            }
            actInfo = activity;
            if (!!created){
                callback(null, null);
            } else {
                if (type == exp.activityType.CAT_GO){
                    if (!activity.cat || !exp.isMatchVersion(type, activity.cat.version)){
                        activity.cat = {};
                        activity.cat.times = 0;
                        activity.cat.version = exp.getVersion(type);
                        activity.markModified('cat');
                        activity.save(callback);
                    } else {
                        callback(null, null);
                    }
                } else if (type == exp.activityType.RECHARGE_GIFT){
                    if (!activity.purchase || !exp.isMatchVersion(type, activity.purchase.version)){
                        activity.purchase = {};
                        activity.purchase.count = 0;
                        activity.purchase.got = [];
                        activity.purchase.version = exp.getVersion(type);
                        activity.markModified('purchase');
                        activity.save(callback);
                    } else {
                        callback(null, null);
                    }
                } else if (type == exp.activityType.TOTAL_DIAMOND_CONSUMPTION) {
                    if (!activity.diamond || !exp.isMatchVersion(type, activity.diamond.version)) {
                        activity.diamond = {};
                        activity.diamond.count = 0;
                        activity.diamond.got = [];
                        activity.diamond.version = exp.getVersion(type);
                        activity.markModified('diamond');
                        activity.save(callback);
                    } else {
                        callback(null, null);
                    }
                } else if (type == exp.activityType.GROWTH_FUND){
                    if (!activity.growthFund || !exp.isMatchVersion(type, activity.growthFund.version)) {
                        activity.growthFund = {};
                        activity.growthFund.purchase = 0;
                        activity.growthFund.statusArr = [];
                        activity.growthFund.version = exp.getVersion(type);
                        activity.markModified('growthFund');
                        activity.save(callback);
                    } else {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            }
        }
    ], function(err){
        if (!!err || !actInfo) {
            return next(null, null);
        } else {
            return next(null, actInfo);
        }
    });
};