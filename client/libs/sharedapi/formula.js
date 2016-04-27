/**
 * Created by lhb on 15/9/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

(function() {
    var root = this;

    var f = {};

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = f;
        }
        exports.formula = f;
    } else {
        root.formula = f;
    }

    var sumOfGeometric = function(a1, q, n) {
        var sn;
        if (q == 1) {
            sn = a1 * n;
        } else {
            sn = a1 * (1 - Math.pow(q, n)) / (1 - q);
        }
        return sn;
    };

    var binarySearch = function(start, end, predicate) {
        while(start <= end) {
            var m = Math.floor((start + end) / 2);
            var dest = predicate(m);
            if (dest == 0) {
                return m;
            }
            if (dest < 0) {
                start = m + 1;
            } else {
                end = m -1;
            }
        }
        return false;
    };

    f.findNFromGeoMetricSum = function(sum, a1, q) {
        var sum1000 = sumOfGeometric(a1, q, 1000);
        if (sum >= sum1000) {return 1000}
        var sum100 = sumOfGeometric(a1, q, 100);
        if (sum >= sum100) {return 100}
        return binarySearch(1, 100, function(n) {
            var d1 = sumOfGeometric(a1, q, n) - sum;
            if (d1 == 0) {return 0}
            var d2 = sumOfGeometric(a1, q, n+1) - sum;
            if (d2 == 0) {return -1}
            return d1/Math.abs(d1) + d2/Math.abs(d2);
        })
    };

    f.bossRatio = function(stage) {
        var bossRatio = [10,2,4,6,7];
        return bossRatio[stage % 5];
    };

    var findInObjectById = function(obj, id) {
        return _.find(obj, {id: id});
    };

    f.maxMorale = function(player) {
        var bc = f.artifactValue(player, consts.kArtifactsBattleCall);
        return 100 * (1 + bc.effect);
    };

    // --------------------- 神器相关 ----------------------

    f.artifactValue = function(player, artifactNameOrId, level) {
        var meta;
        if (isNaN(parseInt(artifactNameOrId))) {
            meta = _.find(Conf.artifacts, {enName: artifactNameOrId});
        } else {
            meta = Conf.artifacts[artifactNameOrId];
        }

        if (!meta) {
            log.error("神器名称输入错误", artifactNameOrId);
        }
        var data = _.find(player.artifacts, {id : meta.id});
        if (!data) {
            return {effect:0, damage:0};
        }
        level = level || data.level;
        return {
            effect: level * meta.effect,
            damage: (level+1) * meta.damage / 2
        }
    };

    f.artifactValueStatic = function(artifactNameOrId) {
        var meta;
        meta = Conf.artifacts[artifactNameOrId];

        if (!meta) {
            log.error("神器ID输入错误", artifactNameOrId);
        }

        level = 1;
        return {
            effect: level * meta.effect,
            damage: (level+1) * meta.damage / 2
        }
    };


    f.damageBuffByArtifacts = function(player) {
        var dmg = 0;
        _.each(player.artifacts, function(v) {
            var value = f.artifactValue(player, v.id);
            dmg += value.damage;
        });
        return dmg;
    };

    f.artifactUpgradeCost = function(player, id, level) {
        var meta = Conf.artifacts[id];
        var data = _.find(player.artifacts, {id:id});
        if (!data) {return Number.MAX_VALUE}

        var lv = level || data.level;
        if (lv == meta.maxLevel) {return 0}
        var expo = meta.expo;
        return Math.round(meta.co * Math.pow(lv + 1, expo));
    };

    f.randomArtifact = function(player) {
        var pool = _.pluck(Conf.artifacts, "id");
        var has = _.pluck(player.artifacts, "id");
        pool = _.difference(pool, has);
        return _.sample(pool);
    };

    f.newArtifactCost = function(player, num) {
        var param = num || player.artifacts.length + 1;
        return Math.floor(param * Math.pow(1.35, param));
    };

    f.artifactTotalCost = function(player, id, level) {
        var data = _.find(player.artifacts, {id:id});
        level = level || data.level;
        var cost = 0;
        for (var i = 1; i <= level-1; i++) {
            cost += f.artifactUpgradeCost(player, id, i);
        }
        return cost;
    };

    f.resetArtifactRelics = function(player, id) {
        var basic = f.newArtifactCost(player, player.artifacts.length);
        var cost = f.artifactTotalCost(player, id);
        return basic+cost;
    };

    f.resetArtifactCost = function(player, id) {
        var data = _.find(player.artifacts, {id:id});
        var num = player.artifacts.length;
        var basic = 34 * Math.pow(2.7, 0.18*num);
        return Math.ceil(basic + data.level);
    };

    f.numOfMonstersEachStage = function(player) {
        var value = f.artifactValue(player, "WorldyIlluminator");
        return 10 - value.effect;
    };

    f.isBoss = function(player) {
        return player.mission >= f.numOfMonstersEachStage(player);
    };

    // 关卡基础黄金
    f.stageBasicGold = function(player) {
        var hp = f.monsterHP(player, true);
        return hp * (0.02 + (0.00045 * Math.min(player.stage, 150)));
    };

    f.basicMonsterGold = function(stage) {
        var hp = f.basicHP(stage);
        return hp * (0.02 + (0.00045 * Math.min(stage, 150)));
    };

    // 天降黄金
    f.goldRain = function(player) {
        var isBoss = player.isBoss;
        player.isBoss = false;
        var basic = f.stageBasicGold(player);
        player.isBoss = isBoss;
        return 5000 * basic;
    };

    f.goldByMidas = function(player) {
        var basic = f.stageBasicGold(player) * f.masterSkillValue(player,consts.kMasterSkillTypeHandOfMidas);
        if (player.isChest && player.stage < 900) {
            basic *= 10;
        }
        var aotv = f.artifactValue(player, "AmuletOfTheValrunes");
        var ce = f.artifactValue(player, "CraftersElixir");
        var ff = f.artifactValue(player, "FuturesFortune");
        return Math.ceil(basic * (1 + ce.effect) * (1 + ff.effect) * (1 + aotv.effect));
    };

    f.goldByPKBonus = function(player) {
        var basic = f.basicMonsterGold(player.stage);
        var ce = f.artifactValue(player, "CraftersElixir");
        var ff = f.artifactValue(player, "FuturesFortune");
        return Math.ceil(basic * (1 + ce.effect) * (1 + ff.effect)) * 30;
    };

    f.relicByPKBonus = function(player) {
        return f.relicsByStage(player) / 30;
    };

    // 怪物掉落金钱
    f.goldByMonster = function(player) {
        var basic = f.stageBasicGold(player);
        var ret = 0;
        var heroBuffs = player.heroBuffs;
        if (player.isBoss) { // Boss
            var ks = f.artifactValue(player, "KnightsShield");
            ret = basic * (1 + ks.effect);
        } else if (player.isChest) { // 宝箱
            var coc = f.artifactValue(player, "ChestOfContentment");
            var equipChest = f.masterEquipBuff(player, consts.kMasterEquipTypeChestGold);

            ret = basic * 10 * (1 + coc.effect) * (1 + equipChest)
                * Math.ceil( 1 + heroBuffs[consts.kHeroSkillTypeTreasureGold]);
        } else { // 一般怪物
            var aotv = f.artifactValue(player, "AmuletOfTheValrunes");
            var dc = player.isDivineChalice ? 10 : 1;
            ret = Math.ceil(basic) * (1 + aotv.effect) * dc;
        }
        var ce = f.artifactValue(player, "CraftersElixir");
        var ff = f.artifactValue(player, "FuturesFortune");
        var equipGoldDropped = f.masterEquipBuff(player, consts.kMasterEquipTypeGoldDropped);
        return Math.ceil(ret * (1 + ce.effect) * (1 + ff.effect) * (1 + equipGoldDropped + heroBuffs[consts.kHeroSkillTypeDropGold]));
    };

    // 是否激活神圣酒杯
    f.isDivineChalice = function(player) {
        var dc = f.artifactValue(player, consts.kArtifactsDivineChalice);
        var rate = dc.effect;
        return Math.random() < rate;
    };

    // 是否生成宝箱怪
    f.isChest = function(player) {
        var basic = 0.02;
        var ce = f.artifactValue(player, consts.kArtifactsCrownEgg);
        var rate = basic * (1 + ce.effect);

        return Math.random() < rate;
    };

    f.basicHP = function(stage) {
        return Math.pow(1.57, Math.min(stage, 156)) * 18.5 * Math.pow(1.17, Math.max(stage-156, 0));
    };

    // 怪物血量
    f.monsterHP = function(player, disableArtifact, stage, isBoss) {
        stage = stage || player.stage;
        var hp = Math.pow(1.57, Math.min(stage, 156)) * 18.5 * Math.pow(1.17, Math.max(stage-156, 0));
        if (isBoss || player.isBoss) {
            hp *= f.bossRatio(stage);
            if (!disableArtifact) {
                var dcol = f.artifactValue(player, "DarkCloakOfLife");
                hp *= (1 - dcol.effect);
            }
        }
        return hp;
    };

    f.getHeroUpgradeCostIndex = function(player) {
        return _.startsWith(player.contestId, 'hard-') ? 1000000: 1;
    };

    f.isHardContest = function(player) {
        return _.startsWith(player.contestId, 'hard-');
    };

    // ----------------------  英雄相关  -----------------------
    // 英雄升级花费
    f.heroUpgradeCost = function(player, id, from, upgrades, disableArtifact, multi) {
        multi = multi || 1;
        var hero = player.heroes[id];
        if (isNaN(parseInt(from))) {
            from = hero ? player.heroes[id].level : 0;
        }

        upgrades = upgrades || 1;
        var basic = Conf.hero[id].cost * multi;
        var a1 = basic * Math.pow(1.075, from);
        var sum = sumOfGeometric(a1, 1.075, upgrades);
        sum *= from >= 1000 ? 10 : 1;
        if (!disableArtifact) {
            var rowc = f.artifactValue(player, "RingOfWonderousCharm");
            sum *= (1 - rowc.effect);
        }
        return sum;
    };

    f.heroUnlockSkillCost = function(player, hid, sid) {
        var basic = Conf.hero[hid].cost;
        var unlockLevel = consts.kHeroSkillUnlockLevelArr[sid];
        var a1 = basic * Math.pow(1.075, unlockLevel);
        return a1 * 5;
    };

    // 英雄在不超过当前黄金的情况下，能升级的最大级数
    f.heroUpgradesLimit = function(player, id, multi) {
        var a1 = f.heroUpgradeCost(player, id, null, 1, false, multi);
        return f.findNFromGeoMetricSum(player.gold, a1, 1.075);
    };

    // 英雄基础伤害
    f.basicHeroDPS = function(player, id, level) {
        if (!level || level == 0) {return 0;}
        var dps;
        var cost = f.heroUpgradeCost(player, id, level -1, 1, true);
        if (level > 1000) {
            dps = Math.pow(0.904, level - 1001) * Math.pow(0.715, id + 33) * (Math.pow(1.075, level - 1000) - 1) * cost / 0.75;
        } else {
            dps = Math.pow(0.904, level - 1) * Math.pow(1 - 0.019 * Math.min(id, 15), id) * (Math.pow(1.075, level) - 1) * cost / 0.75;
        }
        return dps;
    };

    // 统计所有英雄技能的影响
    f.heroSkillBuffs = function(player) {
        var buffs = [void 0, [], 0, 0, 0, 0,0,0,0,0];
        var heroSkillMeta = Conf.heroSkill;
        _.each(player.heroes, function(hero, id) {
            if (!hero) {return;}
            if (f.isHeroDead(player, id)) {return;}
            var skillIdx = hero.skill;
            var skills = heroSkillMeta[id];
            for (var i = 1; i <= skillIdx; i++) {
                var meta = skills[i];
                var skill = meta.skill;
                var value = meta.value;
                if (skill == consts.kHeroSkillTypeHeroDamage) {
                    var buff = buffs[consts.kHeroSkillTypeHeroDamage];
                    buff[id] = buff[id] || 0;
                    buff[id] += value;
                } else {
                    buffs[skill] += value;
                }
            }
        });
        return buffs;
    };

    f.addHeroBuff = function(player, heroId, skillIndex) {
        if (f.isHeroDead(player, heroId)) {return;}
        var buffs = player.heroBuffs;
        var meta = Conf.heroSkill[heroId][skillIndex];
        var skill = meta.skill;
        var value = meta.value;
        if (skill == consts.kHeroSkillTypeHeroDamage) {
            var buff = buffs[consts.kHeroSkillTypeHeroDamage];
            buff[heroId] = buff[heroId] || 0;
            buff[heroId] += value;
        } else {
            buffs[skill] += value;
        }
    };

    // 英雄武器套数
    f.heroWeaponSets = function(player) {
        var weapons = _.without(player.heroWeapons, 0);
        return weapons.length < _.size(Conf.hero) ?0:_.min(weapons);
    };

    f.isHeroDead = function(player, id) {
        var hero = player.heroes[id];
        if (!hero) {return false}
        return moment().isBefore(moment(hero.revivalTime));
    };

    // 英雄实际伤害
    f.heroDPS = function(player, id, level) {
        if (level == 0) {return 0}
        if (f.isHeroDead(player, id)) {return 0}
        var basic = f.basicHeroDPS(player, id, level);
        var buffs = player.heroBuffs;
        var heroDmgBuff = buffs[consts.kHeroSkillTypeHeroDamage][id] || 0;
        var artifactsBuff = f.damageBuffByArtifacts(player);
        var weapons = player.heroWeapons[id] || 0;
        var tm = f.artifactValue(player, consts.kArtifactsTinctureOfTheMaker);
        var sets = f.heroWeaponSets(player);
        var equip = f.masterEquipBuff(player, consts.kMasterEquipTypeAllDamage);
        return basic * (1 + buffs[consts.kHeroSkillTypeAllDamage] + artifactsBuff) * (1 + heroDmgBuff)
            * (1 + weapons * 0.5) * Math.max(1, sets * 10) * (1 + tm.effect) * (1 + equip);
    };

    f.heroDPSRatio = function(player) {
        var buffs = player.heroBuffs;
        var artifactsBuff = f.damageBuffByArtifacts(player);
        var tm = f.artifactValue(player, consts.kArtifactsTinctureOfTheMaker);
        var sets = f.heroWeaponSets(player);
        var equip = f.masterEquipBuff(player, consts.kMasterEquipTypeAllDamage);
        return (1 + buffs[consts.kHeroSkillTypeAllDamage] + artifactsBuff)
             * Math.max(1, sets * 10) * (1 + tm.effect) * (1 + equip);
    };

    f.heroFightValue = function(player, id, ignoreDead) {
        if (!ignoreDead && f.isHeroDead(player, id)) {return 0}
        var artifactsBuff = f.damageBuffByArtifacts(player);
        var weapons = player.heroWeapons[id] || 0;
        var tm = f.artifactValue(player, consts.kArtifactsTinctureOfTheMaker);
        var sets = f.heroWeaponSets(player);
        var equip = f.masterEquipBuff(player, consts.kMasterEquipTypeAllDamage);
        return (1 + artifactsBuff)
            * (1 + weapons * 0.5) * Math.max(1, sets * 10) * (1 + equip) * (1 + tm.effect);
    };

    f.maxFightValue = function(player) {
        var all = 0;
        for (var i = 1; i <= _.size(Conf.hero); i++) {
            all += f.heroFightValue(player, i, true);
        }
        return Math.ceil(all);
    };

    f.totalFightValue = function(player) {
        var all = 0;
        _.each(player.heroes, function(hero, id) {
            if(hero && hero.level){
                all += f.heroFightValue(player, id);
            }
        });
        return Math.ceil(all);
    };

    // 所有英雄总DPS
    f.allHeroesDPS = function(player) {
        var all = 0;
        _.each(player.heroes, function(hero, id) {
            if(hero && hero.level){
                all += f.heroDPS(player, id,hero.level);
            }
        });
        return all;
    };
    // ------------------- 主角相关-----------------
    // 主角升级花费
    f.masterUpgradeCost = function(from, upgrades) {
        upgrades = upgrades || 1;
        if (from <= 22) {
            var a = from + 3;
            return Math.floor(a * Math.pow(1.065, a));
        } else {
            var q = 1.074;
            var a1 = 120.5 * Math.pow(q, from - 22);
            return Math.round(sumOfGeometric(a1, q, upgrades));
        }
    };

    // 主角升级限制
    f.masterUpgradesLimit = function(player) {
        var lv = player.masterLevel;
        if (lv <= 22) {return 0}
        var a1 = 120.5 * Math.pow(1.074, lv - 22);
        return f.findNFromGeoMetricSum(player.gold, a1, 1.074);
    };

    // 主角技能升级花费   不准确
    f.masterSkillUpgradeCost = function(player, id) {
        var lv = player.masterSkills[id].level;
        var meta = Conf.masterSkill[id];
        return Math.pow(meta.ratio, lv) * meta.cost;
    };

    f.masterSkillValue = function(player, sid) {
        var meta = Conf.masterSkill[sid];
        var lv = player.masterSkills[sid].level;
        if (lv == 0) {return 0}
        return meta.origin + (lv - 1) * meta.upgrade
    };

    f.masterSkillDuration = function(player, sid) {
        var meta = Conf.masterSkill[sid];
        var aid = meta.durationArtifact;
        if (meta == null) {
            console.log("yby error !!!sid" + sid);
            return;
        }          
        if (!aid) {return meta.duration;}
        var artifact = f.artifactValue(player, aid);
        return meta.duration * (1 + artifact.effect);
    };

    f.masterSkillCoolDown = function(player, sid) {
        var meta = Conf.masterSkill[sid];
        var aid = meta.cooldownArtifact;
        if (!aid) {return meta.cd;}
        var artifact = f.artifactValue(player, aid);
        return meta.cd * (1 - artifact.effect);
    };

    // 点击伤害
    f.tapDamage = function(player, lv, isBoss) {
        var level = lv || player.masterLevel;
        var basic = level * Math.pow(1.05, level);
        var heroBuffs = player.heroBuffs;
        var toBoss = isBoss ? heroBuffs[consts.kHeroSkillTypeDamageToBoss] : 0;
        var heroDPS = f.allHeroesDPS(player);
        var artifactsBuff = f.damageBuffByArtifacts(player);
        var dh = f.artifactValue(player, consts.kArtifactsDrunkenHammer);
        var equipTapDmg = f.masterEquipBuff(player, consts.kMasterEquipTypeTapDamage);
        var equipAllDmg = f.masterEquipBuff(player, consts.kMasterEquipTypeAllDamage);
        var masterBuff = player.masterBuffs[consts.kMasterSkillTypeBerserkerRage] ? f.masterSkillValue(player, consts.kMasterSkillTypeBerserkerRage) : 0;
        return (basic * (1 + heroBuffs[consts.kHeroSkillTypeAllDamage] + artifactsBuff + equipAllDmg) *
            (1 + heroBuffs[consts.kHeroSkillTypeTapDamage] + equipTapDmg + dh.effect)
            + (heroDPS * heroBuffs[consts.kHeroSkillTypeHeroDPSToTapDamage])) * (1 + masterBuff) * (1 + toBoss);
    };

    // 蜕变获得圣物数量
    f.relicsByPrestige = function(player) {
        var basic = f.relicsByHeroesLevel(player) + f.relicsByStage(player);
        if (f.isAllHeroesAlive(player)) {
            basic *= 2;
        }
        var ua = f.artifactValue(player, "UnreadAura");
        return basic * (1 + ua.effect);
    };

    f.isAllHeroesAlive = function(player) {
        var heroes = player.heroes;
        var ret = _.find(heroes, function(v, idx) {
            return v && f.isHeroDead(player, idx);
        });
        return !ret;
    };

    // 蜕变英雄等级额奖励
    f.relicsByHeroesLevel = function(player) {
        var heroes = player.heroes;
        var sum = _.reduce(heroes, function(memo, hero) {
            if (!hero) {
                return memo;
            }
            return memo + hero.level || 0});
        var vipInfo = Conf.vip[player.vip];
        return sum / 1000 * (1 + vipInfo.relicByHero);
    };

    // 蜕变通关奖励
    f.relicsByStage = function(player) {
        var stage = player.stage;
        return Math.pow(Math.max(0, stage - 75) / 15, 1.7);
    };

    // 重击概率
    f.criticalChance = function(player) {
        var heroBuff = player.heroBuffs[consts.kHeroSkillTypeCriticalChance];
        var ds = f.artifactValue(player, consts.kArtifactsDeathSeeker);
        var equip = f.masterEquipBuff(player, consts.kMasterEquipTypeCriticalChance);
        var masterBuff = player.masterBuffs[consts.kMasterSkillTypeCriticalStrike] ? f.masterSkillValue(player, consts.kMasterSkillTypeCriticalStrike) : 0;
        return 0.01 + heroBuff + equip + ds.effect + masterBuff;
    };

    // 重击伤害倍数
    f.criticalMultiplier = function(player) {
        var heroBuff = player.heroBuffs[consts.kHeroSkillTypeCriticalDamage];
        var ht = f.artifactValue(player, consts.kArtifactsHerosThrust);
        var equip = f.masterEquipBuff(player, consts.kMasterEquipTypeCriticalDamage);
        var masterBuff = player.masterBuffs[consts.kMasterSkillTypeWarCry] ? f.masterSkillValue(player, consts.kMasterSkillTypeWarCry) : 0;
        return 10 * (1 + heroBuff + ht.effect + equip + masterBuff);
    };

    // 主角个性定制装备
    f.masterEquipBuff = function(player, type) {
        if(!player.equipValues) {return 0}
        if(!player.equipValues[type]) {return 0}
        return player.equipValues[type] / 100;
    };

    f.masterEquipExp = function(player, idx, lv) {
        var meta = Conf.equipMeta[idx];
        var coe = [void 0, 0.5, 0.7, 1];
        return coe[meta.rare] * Math.pow(lv+1, 2);
    };

    f.skillRefreshCost = function(player) {
        var skills = player.masterSkills;
        var ret = 0;
        for(var i = 1; i < 7; i++) {
            var s = skills[i];
            var lt = new Date(s.lastTimeUse);
            var now = new Date();
            var cd = f.masterSkillCoolDown(player, i) * 1000;
            var remain = cd - (now - lt);
            if (remain > 0) {
                ret += (remain / 1000 / 60 * 2);
            }
        }
        return Math.floor(ret);
    };

}.call(this));