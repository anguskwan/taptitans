
declare class formula {
    static maxMorale(player: Object): number;
    /**
     * 获取神器的数值
     * @param player 对象
     * @param artifactNameOrId 神器的名称或id
     * @param level 神器的级别
     * @return 返回一个Object，里面有effect和damage两个key,用来表示神器的效果和增加所有攻击力的值
     */
    static artifactValue(player: Object, artifactNameOrId: any, level?:number): Object;
    static artifactValueStatic( artifactNameOrId: any): Object;

    /**
     * 获取全部神器对攻击力的加成
     * @param player 对象
     * @return 攻击力加成
     */
    static damageBuffByArtifacts(player: Object): number;

    static artifactUpgradeCost(player: Object, id: number, level?:number): number;

    static newArtifactCost(player:Object, num?:number):number;

    static artifactTotalCost(player:Object, id:number, level?:number):number;

    static resetArtifactRelics(player:Object, id:number):number;

    static resetArtifactCost(player:Object, id:number):number;
    /**
     * 获取每关中的怪物数
     * @param player 对象
     * @return 怪物数 5~10
     */
    static numOfMonstersEachStage(player: Object):number;

    /**
     * 判断当前关是否为Boss关
     * @param player 对象
     * @return true or false
     */
    static isBoss(player: Object):boolean;

    /**
     * 每关基础黄金（一般用不到）
     * @param player 对象
     * @return 黄金数
     */
    static stageBasicGold(player: Object):number;

    /**
     * 天降黄金
     * @param player 对象
     * @return 黄金数
     */
    static goldRain(player: Object):number;

    static goldByPKBonus(player: Object);
    static relicByPKBonus(player: Object);
    /**
     * 每关实际获得黄金数（前端用不到）
     * @param player 对象
     * @return 黄金数
     */
    static goldByMonster(player: Object):number;

    /**
     * 怪物血量
     * @param player 对象
     * @param disableArtifact 是否启用神器效果
     * @return 血量
     */
    static monsterHP(player:Object, disableArtifact?: boolean):number;

    /**
     * 英雄升级花费
     * @param player 对象
     * @param id 英雄id
     * @param from 英雄级别
     * @param upgrades 升级数
     * @param disableArtifact 是否启用神器效果
     * @return 花费黄金数
     * @param multi
     */
    static heroUpgradeCost(player:Object, id:number, from?:number, upgrades?:number, disableArtifact?:boolean, multi?:number): number;

    static getHeroUpgradeCostIndex(player:Object);
    /**
     * 英雄解锁技能消耗
     * @param player 对象
     * @param hid 英雄id
     * @param sid 技能id
     * @return 花费黄金数
     */
    static heroUnlockSkillCost(player: Object, hid:number, sid:number):number;

    /**
     * 根据当前黄金数，算出升级上限，如果黄金数支持升级1000以上，则返回1000，如果黄金数支持升级100~999，则返回100，
     * 否则返回1~100
     * @param player 对象
     * @param id 英雄id
     * @return 级别数
     * @param multi
     */
    static heroUpgradesLimit(player:Object, id:number, multi?:number):number;

    /**
     * 英雄基础伤害
     * @param player 对象
     * @param id 英雄id
     * @param level 英雄级别
     * @return 伤害
     */
    static basicHeroDPS(player:Object, id: number, level:number):number;
    static heroDPSRatio(player:Object);
    /**
     * 所有英雄技能的buff
     * @param player 对象
     * @return 数组 buff
     */
    static heroSkillBuffs(player:Object):Object;

    static addHeroBuff(player, heroId, skillIndex):void;
    /**
     * 英雄武器套装数
     * @param player 对象
     * @return 套装数
     */
    static heroWeaponSets(player:Object):number;

    /**
     * 英雄实际dps，经过各种buff加成之后的最终值
     * @param player 对象
     * @param id 英雄id
     * @param level 英雄级别
     * @return dps
     */
    static heroDPS(player:Object, id:number, level: number):number;

    /**
     * 所有英雄的总dps
     * @param player 对象
     * @return dps
     */
    static allHeroesDPS(player:Object): number;

    static totalFightValue(player:Object): number;
    static maxFightValue(player:Object): number;
    /**
     * 主角升级花费
     * @param from 主角当前级别
     * @param upgrades 升级数
     * @return 花费黄金数
     */
    static masterUpgradeCost(from:number, upgrades?:number):number;

    /**
     * 根据当前黄金数，算出升级上限，如果黄金数支持升级1000以上，则返回1000，如果黄金数支持升级100~999，则返回100，
     * @param player 对象
     * @return 怪物数 5~10
     */
    static masterUpgradesLimit(player:Object):number;

    /**
     * 主角技能升级花费
     * @param player 对象
     * @param id 技能id
     * @return 花费黄金数
     */
    static masterSkillUpgradeCost(player:Object, id:number):number;

    static masterSkillValue(player: Object, sid:number):number;
    static masterSkillDuration(player:Object, sid:number):number;
    static masterSkillCoolDown(player:Object, sid:number):number;

    /**
     * 点击伤害
     * @param player 对象
     * @param level 级别
     * @return 伤害
     * @param isBoss
     */
    static tapDamage(player:Object, level?:number, isBoss?:boolean): number;

    /**
     * 通过转生获得的圣物数
     * @param player 对象
     * @return 圣物数
     */
    static relicsByPrestige(player:Object): number;

    /**
     * 是否全部英雄都存活
     * @param player 对象
     * @return true or false
     */
    static isAllHeroesAlive(player: Object):boolean;

    /**
     * 转生时，通过英雄级别获取的圣物数
     * @param player 对象
     * @return 圣物数
     */
    static relicsByHeroesLevel(player: Object):number;

    /**
     * 转生时，通过闯关获取的圣物数
     * @param player 对象
     * @return 圣物数
     */
    static relicsByStage(player: Object):number;

    /**
     * 重击几率
     * @param player 对象
     * @return 几率
     */
    static criticalChance(player: Object):number;
    /**
     * 重击加成倍数
     * @param player 对象
     * @return 倍数
     */
    static criticalMultiplier(player:Object): number;

    static masterEquipBuff(player:Object, type:number):number;

    static masterEquipExp(player:Object, idx: number, lv:number):number;

    static skillRefreshCost(player:Object):number;
}

