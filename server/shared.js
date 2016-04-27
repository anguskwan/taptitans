/**
 * Created by Li Jie (lijie@hortorgames.com) on 14-2-8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

(function(exports) {

    exports.kErrorClientVersionTooOld = 100001;
    exports.kErrorServerMaintainence = 100002;

    // Error definitions

    exports.kErrorSuccess       = { code: 0,    msg: "成功" };
    exports.kErrorInternalError = { code: 9999, refresh:true, msg: "服务器内部错误" };
    exports.kErrorDBDataRacing  = { code: 9999, msg: "数据库修改冲突" };

    // 400 Request Errors
    exports.kErrorSignError     = { code: 4000, msg: "请求签名错误" };
    exports.kErrorAuthError     = { code: 4001, refresh:true, msg: "用户尚未登录" };
    exports.kErrorMissingParam  = { code: 4002, msg: "缺少%s参数" };
    exports.kErrorInvalidParam  = { code: 4003, msg: "非法的%s参数" };
    exports.kErrorDuplicatedLoginError     = { code: 4004, refresh: true, msg: "用户重复登录" };

    // 200 Logic Error
    exports.kErrorPlayerNotExist = { code : 10001, refresh : true, msg : "玩家账号不存在" };
    exports.kErrorNotEnoughMoney = { code : 10002, msg : "金币不足" };
    exports.kErrorKillTitanFail = { code : 10003, msg : "网络异常，击杀Boss失败" };
    exports.kErrorLowPlayerLevel = { code : 10004, msg : "级别不够" };
    exports.kErrorHeroUpgrade = { code : 10005, msg : "英雄升级失败" };
    exports.kErrorHeroUnlockSkill = { code : 10006, msg : "英雄解锁技能失败" };
    exports.kErrorRandomArtifact = { code : 10007, msg : "购买随机神器失败" };
    exports.kErrorNotEnoughRelic = { code : 10008, msg : "圣物不足" };
    exports.kErrorArtifactUpgrade = { code : 10009, msg : "神器升级失败" };
    exports.kErrorSkillInCoolDown = { code : 10010, msg : "技能冷却中" };
    exports.kErrorAchievementReward = { code : 10011, msg : "获取成就奖励失败" };
    exports.kErrorNotEnoughWeaponItem = { code : 10012, msg : "武器道具不足" };
    exports.kErrorMonthCardExpire = { code : 10013, msg : "月卡过期" };
    exports.kErrorDuplicatedOpertaion = { code : 10014, msg : "重复操作" };
    exports.kErrorInvalidShareCode = { code : 10015, msg : "非法的Share code" };
    exports.kErrorInvalidDuration = { code : 10016, msg : "不在有效的时间内" };
    exports.kErrorInvalidCoupon = { code : 10017, msg : "兑换码无效" };
    exports.kErrorNotEnoughDiamond = { code : 10018, msg : "钻石不足" };
    exports.kErrorContestAlreadyExist = { code : 10019, msg : "已经在另一场比赛中" };
    exports.kErrorContestNotStart = { code : 10020, msg : "比赛还没有开始" };
    exports.kErrorContestGetRewardFailed = { code : 10021, msg : "获取比赛奖励失败" };
    exports.kErrorOpponentNotExist = { code : 10022, show:true, msg : "对手不存在" };
    exports.kErrorOpponentIsInProtect = { code : 10023, show:true, msg : "对手已开启了保护" };
    exports.kErrorPlayerIsInProtect = { code : 10023, show: true, msg : "您正处于保护中" };
    exports.kErrorOpponentIsLow = { code : 10024, show: true, msg : "对手级别太低" };
    exports.kErrorNoPlayerMatched = { code : 10025, show: true, msg : "独孤求败，继续闯关" };
    exports.kErrorLifeCardNotBought = { code : 10026, msg : "终身月卡未购买" };
    exports.kErrorMaxTimes = { code : 10027, msg : "次数达到上限" };
    exports.kErrorNotEnoughHammer = { code : 10028, msg : "锤子不足" };
    exports.kErrorNotSameGuild = {code : 10029, msg : "不是相同公会"};
    exports.kErrorNotGuildPresident = {code : 10030, msg : "不是会长"};
    exports.kErrorAssignment = {code : 10031, msg : "转让失败"};
    exports.kErrorNoneReward = {code : 10032, msg : "没有任何奖励"};
    exports.kErrorNotBought = {code : 10033, msg : "还未购买"};
    exports.kErrorHasGot = {code : 10034, msg : "已经领取过奖励"};

})(typeof exports != 'undefined' ? exports : Const);
