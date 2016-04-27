module.exports = {
    _id : "Number",
    "id": {
        type : "Number",
        unique : true
    },
    "uniqueId": "String",           // 微信的OpenId
    "subChannelUid":"String",       // 子渠道OpenId
    "createTime": "Date",           // 创建时间
    loginType:"String",             // 登录类型,判断是否电脑登录
    "name": "String",               // 姓名
    "avatar": "String",             // 头像
    "location": "String",           // 地区
    "isSubscribed": "Boolean",      // 是否关注，老数据，分服之后不再使用
    subscribed : {                  // 关注，0为未关注，1为关注但未领取奖励，2为关注并且已领取奖励
        type : "Number",
        default : 0
    },
    shareCode : "String",           // 分享加好友
    channel: "String",              // 渠道来源
    serverId : {                    // 分服ID
        type : "Number",
        default : 1
    },
    highestStage: {                 // 最高关卡
        type:"Number",
        default:1
    },
    "gold" :{                       // 金币
        type : "Number",
        default:4
    },
    "diamond" :{                    // 钻石
        type : "Number",
        default:0
    },
    "isNewbiePackageBought": {      // 是否买过新手礼包
        type: "Boolean",
        default: false
    },
    "masterLevel" :{                // 主角等级
        type : "Number",
        default:1
    },
    "mission":{                     // 小关号
        type : "Number",
        default:0
    },
    "stage":{                       // 关卡号
        type : "Number",
        default:1
    },
    isChest:{                       // 是否宝箱
        type : "Boolean",
        default:false
    },
    isDivineChalice:{               // 是否触发神圣酒杯
        type : "Boolean",
        default:false
    },
//    "inviter": {
//        "type": "Number",
//        "index": true
//    },
    "masterSkills" : [{             // 主角技能
        id: "Number",
        level: "Number",
        lastTimeUse:"Date"
    }],
    lastMidasEndTime: {             // 上一次米达斯之手时间
        type : "Date",
        default: 0
    },
//    masterEquips : {
//        allDamage : ["Number"],
//        criticalDamage : ["Number"],
//        GoldDropped : ["Number"],
//        ChestGold : ["Number"],
//        CriticalHit : ["Number"],
//        TapDamage : ["Number"]
//    },
    masterEquips : ["Number"],      // 主角装备
    equipValues: ["Number"],        // 装备加成
    "heroes": [{                    // 拥有的英雄
        id : "Number",
        level: {                    // 英雄等级
            type:"Number",
            default: 0
        },
        skill: {                    // 英雄技能
            type:"Number",
            default:0
        },
        revivalTime: {              // 下次复活时间
            type:"Date",
            default:0
        }
    }],
    heroWeapons: ["Number"],        // 英雄武器数量
    relic:{                         // 圣物
        type : "Number",
        default:0
    },
    artifacts: [{                   // 神器
        id:"Number",
        level:{
            type:"Number",
            default:1
        }
    }],
    statistics : {},                // 统计,没用
    achievements : [{               // 成就
        id : "Number",
        value : {
            type : "Number",
            default:0
        },
        stars : {
            type : "Number",
            default:0
        }
    }],
    dailyBoss : {                   // 每日副本
        lastTime : {
            type:"Date",
            default:0
        },
        day : {
            type:"Number",
            default:1
        },
        stage : "Number"
    },
    weaponItem : {                  // 武器道具
        type : "Number",
        default : 0
    },
    friends : ["Number"],           // 好友ID列表
    offlineGold: {                  // 未领取的金币
        type : "Number",
        default : 0
    },
    offlineRelic: {                 // 未领取的圣物
        type : "Number",
        default : 0
    },
    supMonthCardTime: {             // 大月卡有效时间
        type:"Date",
        default:0
    },
    getSupMCDailyDiamondTime : {    // 上次获取大月卡钻石的时间
        type:"Date",
        default:0
    },
    monthCardTime : {               // 月卡有效时间
        type:"Date",
        default:0
    },
    getMCDailyDiamondTime : {       // 上次获取月卡钻石时间
        type:"Date",
        default:0
    },
    purchaseCount : {},             // 充值购买记录
    purchaseNum : {                 // 充值累计金额(元)
        type:"Number",
        default:0
    },
    growthFundPurchase : {          // 成长基金
        type:"Number",
        default:0
    },
    contestId : {                   // 比赛ID
        type:"String",
        default:"none"
    },
    crystal: {                      // 水晶
        type: "Number",
        default:0
    },
    contestStartTime: {             // 本次比赛的开始时间
        type :"Date",
        default:0
    },
    autoTapRemainTime: {            // 自动点击的剩余时间(秒)
        type :"Number",
        default:0
    },
    tutorials : ["Boolean"],        // 新手引导
    "lastTimeLogout": "Date",       // 上次退出时间
    "lastTimeLogin": "Date",        // 上次登录时间
    lastTimeKillTitan : "Date",     // 上次杀怪时间
    lastTimeMoraleRestore: {        // 上次士气恢复时间
        type : "Date",
        default:0
    },
    morale : {                      // pk中的士气
        type : "Number",
        default : 100
    },
    pkMessages: [],                 // pk消息
    protectExpire : {               // pk保护期
        type : "Date",
        default: 0
    },
    shopItems: ["Number"],          // 已购买的商店道具
    enemies : ["Number"],           // 不用
    enemyLimit : {                  // 不用
        type :"Number",
        default: 0
    },
    isBanned : {                    // 是否被封
        type : "Boolean",
        default: false
    },
    isBoughtLifeCard : {                    // 是否有购买过终身卡
        type : "Boolean",
        default: false
    },
    getLifeCardDailyDiamondTime : {    // 上次获取终身月卡钻石的时间
        type: "Date",
        default: 0
    },
    heroSize: {                    // 不用
        type: "Number",
        default: 0
    },
    mailbox: [],                    // 邮件

    guild: {                        // 公会
        type: "Number",
        default: 0
    },
    vip: {                          // vip等级
        type: "Number",
        default: 0
    },
    dailyEvent: {},                 // 每日事件
    purchaseTime: "Date",           // 上次充值时间
    vipGift: [],                    // vip礼物
    cheatLevel : {                  // 作弊等级
        type: "Number",
        default: 0
    },
    equips: {},                     // 装备
    fragment : {                    // 碎片(升级装备)
        type: "Number",
        default: 0
    },
    dailyReward:{},                 // 每日奖励
    zodiacId : {                    // 黄金十二宫ID
        type:"String",
        default: "none"
    },

    goldEggsHammersNum : {          // 金蛋锤子数
        type: "Number",
        default: 0
    },
    goldEggsPurchaseNum : {         // 当天充值金额(元)
        type:"Number",
        default:0
    },
    goldEggsRewardIdx : ["Number"], // 蛋的奖励下标，从1开始;
    goldEggs: [{                    // 命中的蛋集合;
        pos : "Number",             // 蛋的位置，从1开始;
        crystal: {                  // 获得的水晶;
            type:"Number",
            default: 0
        }
    }],
    unGainActDiamond:{              // 可领取的钻石返利项
        type:"Number",
        default:0
    },
    unGainActReward:{               // 可领取的累积充值项
        type:"Number",
        default:0
    },
    isNotFirstShard : {             // 是否不是第一次分享
        type : "Boolean",
        default: false
    },
    firstPurchaseGiftTime : {       // 首充三元礼包充值时间;
        type:"Number",
        default:0
    },
    firstPurchaseGainFlags : {      // 首充三元礼物领取标记
        type:"Number",
        default:0
    },
    hasGainedNewGiftBag : {         // 是否已经获取领取新手礼包;
        type : "Boolean",
        default: false
    },
    remainAttMulTime : {            // 剩余攻击双倍时间;
        type:"Number",
        default:0
    },
    pet:{                           // 宠物信息
        typeId : {
            type:"Number",
            default: 0
        },
        level : {
            type:"Number",
            default: 0
        },
        exp : {
            type:"Number",
            default: 0
        },
        soul : {
            type:"Number",
            default: 0
        },
        grade : {
            type:"Number",
            default: 0
        }
    },
    lastPetPKTime : {               // 上次宠物PK时间
        type:"Number",
        default:0
    }
};
