/**
 * Created by hortor on 16/4/25.
 */
var countDownLatch = require('./../../util/countDownLatch');
var formula = require('./../consts/formula');
var exp = module.exports;

/**
 * 创建宠物
 * @param player
 * @param notify
 */
exp.createPet = function(player, notify) {
    if (player.highestStage < Conf.openPetStage) return;
    if (!!player.pet && !!player.pet.typeId) return;      // 每人一个宠物
    var ids = Object.keys(Conf.petType);
    var petTypeId = ids[Util.randomInt(0, ids.length - 1)];
    if (!petTypeId || isNaN(parseInt(petTypeId))) return;
    var petMeta = Conf.petType[petTypeId];
    if (!petMeta || !petMeta.ranks || !petMeta.ranks.length) return;

    player.pet.typeId = parseInt(petTypeId);
    player.pet.level = 1;
    player.pet.exp = 0;
    player.pet.soul = 0;
    player.pet.grade = parseInt(petMeta.ranks[0]);

    async.waterfall([
        function(callback){
            // 更新数据库;
            Db.Player.update({_id : player.id}, {$set:{"pet.typeId" : player.pet.typeId, "pet.grade" : player.pet.grade, "pet.rank" : player.pet.rank}}, function(err){callback(err)});
        },
        function(callback){
            // 加入排行榜;
            Db.updatePetPKRank(player.id, Conf.initCups, function(err){callback(err)});
        }
    ], function(err){
        if (!!notify) {
            var user = {uid: player.id, sid: player.frontendId};
            app.channelService.pushMessageByUids("onGetPet", {
                pet : {
                    typeId : player.pet.typeId,  		// 宠物类型id
                    level : player.pet.level,			// 宠物等级
                    exp : player.pet.exp,			    // 宠物品价
                    soul : player.pet.soul,      		// 宠物经验
                    grade : player.pet.grade            // 宠物当前魂石
                },
                lastPetPKTime : 0
            }, [user]);
        }
    });
};

/**
 * 获取宠物详细
 * @param id
 * @param next
 */
exp.getDetailsInfo = function(id, next){
    Db.Player.findByIdWithFields({"_id" : id}, ['id', 'name', 'avatar', 'pet.typeId', 'pet.level', 'pet.exp', 'pet.soul', 'pet.grade'], function(err, player){
        if (!!err){
            next("获取宠物信息出现错误", null);
            return;
        }
        if (!player){
            next("找不到宠物信息", null);
            return;
        }
        next(null, {
            id : player.id,
            name : player.name,
            avatar : player.avatar,
            typeId : player.pet.typeId,
            level : player.pet.level,
            exp : player.pet.exp,
            soul : player.pet.soul,
            grade : player.pet.grade
        });
    });
};

/**
 * 通过排行获取玩家宠物信息
 * @param rank
 * @param next
 */
var getPlayerInfoByRank = function(rank, next){
    async.waterfall([
        function(callback){
            Db.rds.rank.zrevrange(["rank-pet-world", rank, rank], callback);
        },
        function(res, callback){
            exp.getDetailsInfo(res[0], callback);
        }
    ], function(err, info){
        if (!!err){
            next(err, null);
            return;
        }
        next(null, info);
    });
};

/**
 * 获取宠物列表
 * @param player
 * @param next
 */
exp.getPetPKList = function(player, next){
    if (!player.pet.typeId){
        next('没有宠物', null);
        return;
    }
    Db.petWar.findOne({_id : player.id}, function(err, petWar){
        if (!!err || !petWar || !petWar.enemies.length){
            next("没有宠物PK列表", null);
            return;
        }
        var len = petWar.enemies.length;
        if (!len){
            next("没有宠物PK列表", null);
            return;
        }

        var players = [];
        var latch = countDownLatch.createCountDownLatch(len, function(){
            next(null, {
                lastPetPKTime : player.lastPetPKTime,
                pkPets : players
            });
        });
        for (var i = 0; i < len; ++i){
            var enemy = petWar.enemies[i];
            if (!enemy){
                latch.done();
                continue;
            }
            exp.getDetailsInfo(enemy.id, function(err, info){
                if (!!err){
                    next('没有宠物PK列表', null);
                    return
                }
                players.push(info);
                latch.done();
            });
        }
    });
};

/**
 * 刷新PK列表
 */
exp.flushPetPKList = function(player, next){
    if (!player.pet.typeId){
        next('没有宠物', null);
        return;
    }
    var total = 0;
    var players = [];
    var targets = [];
    async.waterfall([
        function(callback){
            Db.rds.rank.zcard("rank-pet-world", callback);
        },
        function(num, callback){
            total = num;
            Db.rds.rank.zrevrank("rank-pet-world", player.id, callback);
        },
        function(rank, callback) {
            var start = Math.max(0, rank - 10);
            var end = Math.min(rank + 10, total-1);
            var amount = 1;

            var tar = [];
            var latch = countDownLatch.createCountDownLatch(amount, function(){
                callback(null);
            });

            for(var i = 0; i < 10; i++) {
                var target = Util.randomInt(start, end);
                if (tar.length >= amount) break;
                if (tar.indexOf(target) >= 0) continue;
                if (target == rank) continue;
                tar.push(target);
                getPlayerInfoByRank(target, function(err, p){
                    if (!!err){
                        next('error', null);
                        return
                    }
                    if (!!p){
                        players.push(p);
                        targets.push({
                            id : p.id,
                            done : 0
                        });
                    }
                    latch.done();
                });
            }
        },
        function(callback){
            Db.petWar.findOrCreate({_id : player.id}, {}, callback);
        }
    ], function(err, petWar){
        if (!!err || !petWar){
            next('error', null);
            return
        }
        petWar.enemies = targets;
        petWar.markModified('enemies');
        petWar.save();

        next(null, {
            lastPetPKTime : player.lastPetPKTime,
            pkPets : players
        });
    });
};

/**
 * 获取敌人
 * @param msg
 * @param player
 * @param next
 */
exp.getEnemy = function(msg, player, next){
    if (!msg.id && !msg.idx){
        next('参数错误', null);
        return;
    }
    if (!!msg.id){
        exp.getDetailsInfo(msg.id, next);
        return;
    }
    async.waterfall([
        function(callback){
            Db.petWar.findOne({_id : player.id}, function(err, petWar){
                if (!!err || !petWar){
                    next("没有宠物PK列表", null);
                    return;
                }
                callback(null, petWar);
            });
        },
        function(petWar, callback){
            if (!petWar){
                next("没有宠物PK列表", null);
                return;
            }
            var idx = parseInt(msg.idx) - 1;
            var enemy = petWar.enemies[idx];
            if (!enemy || !!enemy.done){
                next("已经战斗过", null);
                return;
            }
            exp.getDetailsInfo(enemy.id, callback);
        }
    ], function(err, info){
        if (!!err){
            next("没有宠物PK列表", null);
            return;
        }
        next(null, info);
    });
};

exp.WIN = 1;            // 赢;
exp.LOSE = 0;           // 输;
exp.TIED = 2;           // 平;

/**
 * 攻击
 * @param a
 * @param b
 * @param owner
 * @param dmgs
 */
exp.attack = function(a, b, owner, dmgs){
    var dmg = {
        owner : owner,
        dmg : a.attack,
        crit : 0
    };
    if (formula.isCrit()){
        dmg.dmg *= 2;   // 爆击
        dmg.crit = 1;
    }
    b.hp -= dmg.dmg;
    dmgs.push(dmg);
    return b.hp <= 0;
};

/**
 * 计算战斗结果
 * @param owner
 * @param enemy
 */
exp.calBattleResult = function(owner, enemy){
    var ownerBase = formula.getPetHpAndAttack(owner.level, owner.grade);
    var enemyBase = formula.getPetHpAndAttack(enemy.level, enemy.grade);
    owner.hp = ownerBase.hp;
    owner.attack = ownerBase.attack;
    enemy.hp = enemyBase.hp;
    enemy.attack = ownerBase.attack;
    var pets = [owner, enemy];

    // 计算先手;
    var first = Util.randomInt(0, pets.length - 1);
    var second = pets.length - 1 - first;
    var maxRound = Conf.maxPetPKRound;
    var win = exp.TIED;
    var dmgs = [];

    if (!maxRound) maxRound = 10;
    for (var i = 0; i < maxRound; ++i){
        if (exp.attack(pets[first], pets[second], first == 0, dmgs)) {
            win = first == 0 ? exp.WIN : exp.LOSE;
            break;
        }
        if (exp.attack(pets[second], pets[first], second == 0, dmgs)) {
            win = second == 0 ? exp.WIN : exp.LOSE;
            break;
        }
    }
    return {
        owner : {
            level : owner.level,
            grade : owner.grade
        },
        enemy : {
            level : enemy.level,
            grade : enemy.grade
        },
        dmgs : dmgs,
        win : win
    };
};

/**
 * 计算分数
 * @param win
 * @param ownerScore
 * @param ownerRank
 * @param enemyRank
 */
exp.calScore = function(win, ownerScore, ownerRank, enemyRank){
    var ownerModScore = formula.getModScore(ownerScore, ownerRank, enemyRank);
    if (win == exp.WIN){
        // 赢了。需要把分数加上;
        if (!ownerModScore || isNaN(ownerModScore) || ownerModScore < 0){
            ownerModScore = 1;
        }
        if (!!Conf.maxModCups && ownerModScore > Conf.maxModCups){
            ownerModScore = Conf.maxModCups;
        }
    } else if (win == exp.LOSE){
        // 输了。需要减去分数;
        if (!ownerModScore || isNaN(ownerModScore) || ownerModScore > 0){
            ownerModScore = -1;
        }
        if (!!Conf.maxModCups && Math.abs(ownerModScore) > Conf.maxModCups){
            ownerModScore = Conf.maxModCups * -1;
        }
    }
    var tempOwnerScore = ownerScore;
    ownerScore += ownerModScore;

    if (ownerScore < 0) {
        ownerScore = 0;
        ownerModScore = tempOwnerScore * -1;
    }
    return {
        score : ownerScore,
        mod : ownerModScore
    };
};

/**
 * 战斗
 * @param msg
 * @param player
 * @param next
 */
exp.battle = function(msg, player, next){
    var enemyId = null;
    var enemy = null;
    var owner = null;
    var ret = null;
    var petWar = null;
    var ownerRank = null;
    var enemyRank = null;
    var ownerScore = null;
    var enemyScore = null;
    var ownerModScore = null;
    var enemyModScore = null;

    async.waterfall([
        function(callback){
            if (!!msg.id){
                enemyId = msg.id;
                callback(null);
            } else if (!!msg.idx){
                var idx = parseInt(msg.idx) - 1;
                Db.petWar.findOne({_id : player.id}, function(err, pw){
                    if (!!err || !pw){
                        next("没有宠物PK列表", null);
                        return;
                    }
                    if (!pw){
                        next("没有宠物PK列表", null);
                        return;
                    }
                    petWar = pw;
                    var enemy = pw.enemies[idx];
                    if (!enemy || !!enemy.done){
                        next("已经战斗过", null);
                        return;
                    }
                    enemyId = enemy.id;
                    callback(null);
                });
            }
        },
        function(callback){
            exp.getDetailsInfo(enemyId, callback);
        },
        function(e, callback){
            if (!e){
                next("找不到敌人", null);
                return;
            }
            enemy = e;
            exp.getDetailsInfo(player.id, callback);
        },
        function(pet, callback){
            if (!pet){
                next("没有宠物", null);
                return;
            }
            owner = pet;
            ret = exp.calBattleResult(pet, enemy);
            Db.rds.rank.zrevrank("rank-pet-world", player.id, callback);
        },
        function(rank, callback){
            ownerRank = parseInt(rank);
            Db.rds.rank.zrevrank("rank-pet-world", enemyId, callback);
        },
        function(rank, callback){
            enemyRank = parseInt(rank);
            Db.rds.rank.zscore("rank-pet-world", player.id, callback);
        },
        function(score, callback){
            if (!score) score = Conf.initCups;
            ownerScore = parseInt(score);
            Db.rds.rank.zscore("rank-pet-world", enemyId, callback);
        },
        function(score, callback){
            if (!score) score = Conf.initCups;
            enemyScore = parseInt(score);

            ownerModScore = exp.calScore(ret.win, ownerScore, ownerRank, enemyRank);
            if (ret.win == exp.WIN){
                enemyModScore = exp.calScore(exp.LOSE, enemyScore, enemyRank, ownerRank);
            } else if (ret.win == exp.LOSE){
                enemyModScore = exp.calScore(exp.WIN, enemyScore, enemyRank, ownerRank);
            }

            Db.updatePetPKRank(player.id, ownerModScore.score, callback);
        },
        function(flag, callback){
            if (!!enemyModScore){
                Db.updatePetPKRank(enemyId, enemyModScore.score, callback);
            } else {
                callback(null, null);
            }
        },
        function(flag, callback){

        },
        function(flag, callback){
            Db.rds.rank.zrevrank("rank-pet-world", player.id, callback);
        }
    ], function(err, rank){
        if (!!err || !petWar){
            next('error', null);
            return
        }
        ret.modCups = ownerModScore.mod;
        ret.curRank = parseInt(rank);
        ret.modRank = parseInt(rank) - ownerRank;
        ret.owner = owner;
        ret.enemy = enemy;
        next(null, ret);
    });
};