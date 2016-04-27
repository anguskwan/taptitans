/**
 * Created by lhb on 15/9/12.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var consts = typeof exports != 'undefined' ? exports : (consts || {});
consts.kArtifactsSaintlyShield = 1;
consts.kArtifactsOverseerLotion = 2;
consts.kArtifactsOgresGauntlet = 3;
consts.kArtifactsSacredScroll = 4;
consts.kArtifactsParchmentOfImportance = 5;
consts.kArtifactsHuntersOintment = 6;
consts.kArtifactsUniversalFissure = 7;
consts.kArtifactsBarbariansMettle = 8;
consts.kArtifactsAxeOfResolution = 9;
consts.kArtifactsLaborersPendant = 10;
consts.kArtifactsRingOfOpulence = 11;
consts.kArtifactsDeathSeeker = 12;
consts.kArtifactsDrunkenHammer = 13;
consts.kArtifactsHerosThrust = 14;
consts.kArtifactsRingOfWonderousCharm = 15;
consts.kArtifactsCraftersElixir = 16;
consts.kArtifactsAmuletOfTheValrunes = 17;
consts.kArtifactsFuturesFortune = 18;
consts.kArtifactsKnightsShield = 19;
consts.kArtifactsChestOfContentment = 20;
consts.kArtifactsCrownEgg = 21;
consts.kArtifactsDivineChalice = 22;
consts.kArtifactsOtherworldlyArmor = 23;
consts.kArtifactsUnreadAura = 24;
consts.kArtifactsWorldyIlluminator = 25;
consts.kArtifactsTinctureOfTheMaker = 26;
consts.kArtifactsWarriorsRevival = 27;
consts.kArtifactsDarkCloakOfLife = 28;
consts.kArtifactsSaviorShield = 29;
consts.kArtifactsBattleCall = 30;
consts.kHeroSkillTypeHeroDamage = 1;
consts.kHeroSkillTypeAllDamage = 2;
consts.kHeroSkillTypeCriticalDamage = 3;
consts.kHeroSkillTypeTapDamage = 4;
consts.kHeroSkillTypeHeroDPSToTapDamage = 5;
consts.kHeroSkillTypeDropGold = 6;
consts.kHeroSkillTypeTreasureGold = 7;
consts.kHeroSkillTypeCriticalChance = 8;
consts.kHeroSkillTypeDamageToBoss = 9;
consts.kHeroSkillUnlockLevelArr = [void 0, 10, 25, 50, 100, 200, 400, 800];
consts.kMasterEquipTypeAllDamage = 1;
consts.kMasterEquipTypeCriticalDamage = 2;
consts.kMasterEquipTypeGoldDropped = 3;
consts.kMasterEquipTypeChestGold = 4;
consts.kMasterEquipTypeCriticalChance = 5;
consts.kMasterEquipTypeTapDamage = 6;
consts.kMasterEquipNames = [void 0, "weapon", "cloak", "head", "wing", "body", "light"];
consts.kMasterSkillTypeHeavenlyStrike = 1;
consts.kMasterSkillTypeShadowClone = 2;
consts.kMasterSkillTypeCriticalStrike = 3;
consts.kMasterSkillTypeWarCry = 4;
consts.kMasterSkillTypeBerserkerRage = 5;
consts.kMasterSkillTypeHandOfMidas = 6;
consts.kMasterSkillTypePrestige = 7;
consts.kMoneyNames = [void 0, "gold", "diamond", "relic", "weaponItem", "crystal", "fragment"];
consts.kMoneyZNNames = [void 0, "金币", "钻石", "圣物", "武器道具", "水晶", "碎片"];
consts.kMoneyTypeGold = 1;
consts.kMoneyTypeDiamond = 2;
consts.kMoneyTypeRelic = 3;
consts.kMoneyTypeWeaponItem = 4;
consts.kMoneyTypeCrystal = 5;
consts.kMoneyTypeFragment = 6;
//master
consts.kItemRendererMasterPlayer = 1;
consts.kItemRendererMasterSkill = 2;
consts.kItemRendererMasterPrestige = 3;
//heroes
consts.kItemRendererHeroes = 1;
consts.kItemRendererHeroesBuyWeapon = 2;
//halidom
consts.kItemRendererHalidom = 1;
consts.kItemRendererHalidomBuyArtifact = 2;
consts.kItemRendererHalidomAll = 3;
//shop
consts.kItemRendererShopBuyDiamond = 1;
consts.kItemRendererShopBuyMonthCard = 2;
consts.kItemRendererShopBuySkill = 3;
consts.kItemRendererShopShare = 4;
consts.kItemRendererShopBuySupMonthCard = 5;
consts.kItemListTypeByPlayer = 1;
consts.kItemListTypeByMaster = 2;
consts.kItemListTypeByHeroes = 3;
consts.kItemListTypeByHalidom = 4;
consts.kItemListTypeByShop = 5;
consts.kItemListTypeByHalidomBuyArtifacts = 11;
consts.kItemListTypeByMasterPrestige = 10;
consts.kItemListTypeByWeaponUpgrade = 12;
consts.kItemButtonTypeDefault = 1;
consts.kItemButtonTypePrestige = 2;
consts.kItemButtonTypeWeapon = 3;
consts.kItemRendererGuildBagSendGeneral = 1;
consts.kItemRendererGuildBagSendHigh = 2;
consts.kItemRendererGuildBagGetGeneral = 3;
consts.kItemRendererGuildBagGetHigh = 4;
consts.kItemRendererGuildBagGet = 5;
consts.kItemRendererGuildMainWar = 1;
consts.kItemRendererGuildMainRedEnvelope = 2;
consts.kItemRendererGuildMainGold = 3;
consts.kItemRendererActivityBlackBox1 = 1;
consts.kItemRendererActivityBlackBox2 = 2;
consts.kItemRendererGuildLvUpMVPTitle = 1;
consts.kItemRendererGuildLvUpMVP = 2;
consts.kItemRendererGuildLvUp = 3;
consts.kItemRendererGuildGold = 1;
consts.kItemRendererGuildGoldLine = 2;
consts.kItemRendererGuildGoldScore = 3;
consts.kGuildUpgradeTypeMember = 1;
consts.kGuildUpgradeTypePKExp = 2;
consts.kGuildUpgradeTypePKFragment = 3;
consts.kGuildUpgradeTypePKCrystal = 4;
consts.kShopItemName = [void 0, 'goldRain', 'autoTap', 'doom', 'powerOfHolding', 'refreshSkill', 'tenTimes'];
consts.kShopItemGoldRain = 1; // 天将黄金
consts.kShopItemAutoTap = 2; // 自动攻击
consts.kShopItemDoom = 3; // 死亡末日
consts.kShopItemPowerOfHolding = 4; // 坚持神力
consts.kShopItemRefreshSkill = 5; // 技能刷新
consts.kShopItemTenTimes = 6; // 月光宝盒
consts.kGuildItemGoldRain = 1;
consts.kGuildItemBox1 = 2;
consts.kGuildItemBox2 = 3;
consts.kGuildItemBox3 = 4;
consts.kGuildItemResetWeapon = 5;
consts.kAchievementsRewards = [void 0, 15, 25, 50, 100, 200];
//tutorial
consts.kTutorialClickMaster = 0;
consts.kTutorialClickMasterUpgrade = 1;
consts.kTutorialClickHero = 2;
consts.kTutorialClickHeroUpgrade = 3;
consts.kTutorialOffOnLineCoin = 4;
consts.kTutorialKillBossPanel = 5;
consts.kTutorialKillBossHand = 6;
consts.kTutorialClickScreen = 7;
consts.kTutorialClickShopTabBar = 8;
consts.kServerStatusOn = 1;
consts.kServerStatusOff = 2;
consts.kContestDuration = 24; // 小时
consts.kMatchContestFinishTime = consts.kContestDuration * 60 * 60 * 1000;
//UI item renderer
consts.kItemRendererPKHero = 1;
consts.kItemRendererPKHeroComplete = 2;
consts.kItemRendererPKHeroLose = 3;
//news and opp item renderer
consts.kItemRendererPKPlayer = 1;
consts.kItemRendererPKUnlock = 2;
consts.kItemRendererPKOpponent = 1;
consts.kItemRendererPKOpponentLock = 2;
consts.kItemRendererPKOpponentSpace = 3;
//item
consts.kItemRendererRank = 1;
consts.kItemRendererRankLine = 2;
consts.kItemRendererRankInvite = 3;
consts.kItemRendererRankPK = 4;
//item renderer mail
consts.kItemRendererMail = 1;
consts.kItemRendererMailLast = 2;
//item renderer
consts.kItemRendererGuildWarAtt = 1;
consts.kItemRendererGuildWarAttComplete = 2;
//morale
consts.kMaxMorale = 100;
//buyTenTimes
consts.kBuyTenTimesRelic = "relic";
consts.kBuyTenTimesGold = "gold";
consts.kBuyTenTimesDiamond = "diamond";
consts.kBuyTenTimesWeaponItem = "weaponItem";
consts.kBuyTenTimesRefreshSkill = "refreshSkill";
consts.kBuyTenTimesPowerOfHolding = "powerOfHolding";
consts.kBuyTenTimesGoldRain = "goldRain";
consts.kBuyTenTimesAutoTap = "autoTap";
consts.kBuyTenTimesDoom = "doom";
//pk start type
consts.kPKStartDefault = 1;
consts.kPKStartRevenge = 2;
consts.kPKStartFightEnemy = 3;
//fragment
consts.kEquipCostFragmentArr = [0, 120, 140, 160, 180, 200];
// daily Task Refresh cost
consts.kDailyTaskRefreshCost = [200, 500];
consts.kGainStatus = {
    Not_Time_Yet: 0,
    Can_Gain: 1,
    Gained: 2,
    Expired: 3 // 过期;
};
consts.kSubscribedType = {
    UN_SUBSCRIBED: 0,
    SUBSCRIBED_NOT_GAINED: 1,
    SUBSCRIBED_HAS_GAINED: 2 // 关注已领奖;
};
consts.kGrowthFundStatus = {
    Not_Yet: 0,
    Can_Gain: 1,
    Gained: 2 // 已领取;
};
