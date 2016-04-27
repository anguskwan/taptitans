/**
 * Created by lhb on 15/9/9.
 */

var Conf: any = {};
class System {
    public static init() {
        _.extend(consts, constsLocal);

        egret.Ticker.getInstance().register(function (advancedTime) {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
        }, this);
        System.loadConfig();

        if (Util.isQAServer()) {
            window.onerror = function() {
                var msg = "";
                for (var i = 0, l = arguments.length; i < l; ++i) {
                    msg += arguments[i] + "\n";
                }
                console.log(arguments);
                console.log(msg);
                alert(msg);
                return true;
            };
        }
    }

    public static loadConfig() {
        Conf.config = RES.getRes("config_json");
        Conf.hero = RES.getRes("hero_json");
        Conf.heroSkillDesc = RES.getRes("heroSkillDesc_json");
        Conf.masterSkill = RES.getRes("masterSkill_json");
        Conf.artifacts = RES.getRes("artifacts_json");
        Conf.artifactsCost = RES.getRes("artifactsCost_json");
        Conf.shop = RES.getRes("shop_json");
        Conf.payment = RES.getRes("payment_json");
        Conf.achievements = RES.getRes("achievements_json");
        Conf.bossName = RES.getRes("bossName_json");
        Conf.contest = RES.getRes("contest_json");
        Conf.contestHard = RES.getRes("contestHard_json");
        Conf.vip = RES.getRes("vip_json");
        Conf.guildLevel = RES.getRes("guildLevel_json");
        Conf.activityCat = RES.getRes("activityCat_json");
        Conf.activityPurchase = RES.getRes("activityPurchase_json");
        Conf.activityDiamond = RES.getRes("activityDiamond_json");
        Conf.activityGrowthFund = RES.getRes("activityGrowthFund_json");
        Conf.equipMeta = RES.getRes("equipMeta_json");
        Conf.equipSkill = RES.getRes("equipSkill_json");
        Conf.everyDayReward = RES.getRes("everyDayReward_json");
        Conf.redEnvelope = RES.getRes("redEnvelope_json");
        Conf.market = RES.getRes("market_json");
        Conf.guildGoldScore = RES.getRes("guildGoldScore_json");

        Conf.heroSkill = RES.getRes("heroSkill_json");
        Conf.heroSkill = Util.groupBy(Conf.heroSkill, "hero", "index");
        Conf.treasureChest = RES.getRes("treasureChest_json");
        
        // 每日任务
        Conf.dailyTask = RES.getRes("dailyTask_json");
        Conf.shareReward = RES.getRes("shareReward_json");

        //宠物
        Conf.petType = RES.getRes("petType_json");
        Conf.petRank = RES.getRes("petRank_json");
    }
}