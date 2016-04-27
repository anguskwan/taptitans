/**
 * Created by lhb on 15/11/11.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var formula = require("../../../consts/formula.js");
var gameUtil = require("../../../util/gameUtil");
var petServices = require('./../../../services/petServices');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.findOpponent = function(msg, session,next) {
    var playerId = session.uid;
    var total = 0;
    async.waterfall([
        function(cb) {
            Db.rds.rank.zcard("rank-bp-world", cb);
        },
        function(num, cb) {
            total = num;
            Db.rds.rank.zrevrank("rank-bp-world", playerId, cb);
        },
        function(rank, cb) {
            var start = Math.max(0, rank-100);
            var end = Math.min(rank+100, total-1);
            var tar;
            for(var i = 0; i<10; i++) {
                tar = Util.randomInt(start, end);
                if (tar != rank) {break;}
            }
            Db.rds.rank.zrevrange(["rank-bp-world", tar, tar], cb);
        }
    ], function(err, res) {
        if (err) {
            return next(null, {code:10000, msg:err});
        }
        Db.Player.findOne({_id:res[0]}, {name:1, avatar:1, heroWeapons:1,
            equipValues:1, artifacts:1, id:1
        }, function(err, player) {
            var weapons = _.reduce(player.heroWeapons, function(memo, value){return memo+value}, 0) || 0;
            return next(null, Util.packageRes({
                id : player.id,
                name:player.name,
                avatar: player.avatar,
                fightValue : formula.maxFightValue(player),
                weapons: weapons
            }));
        }.bind(this));
    })
};

handler.queryOpponent = function(msg, session, next) {
    var oppId = msg.opponentId;
    if (!oppId) {
        return next(null, Const.kErrorInvalidParam);
    }
    Db.Player.findOne({_id:oppId}, {name:1, avatar:1, heroWeapons:1,
        equipValues:1, artifacts:1, id:1
    }, function(err, player) {
        if (err) {
            log.info("query opoonent error", {oppId: oppId});
            return next(null, Const.kErrorPlayerNotExist);
        }
        var weapons = _.reduce(player.heroWeapons, function(memo, value){return memo+value}, 0) || 0;
        return next(null, Util.packageRes({
            id : player.id,
            name:player.name,
            avatar: player.avatar,
            fightValue : formula.maxFightValue(player),
            weapons: weapons
        }));
    })
};

var calcHeroDead = function(player, result) {
    var oa = formula.artifactValue(player, consts.kArtifactsOtherworldlyArmor);
    var heroDeathRate = (100 - player.morale) / 100 * (1 -oa.effect);
    var isDeath = Util.randomRate(heroDeathRate);
    if (isDeath) {
        var deathNum = 0;
        var aliveHeroes = _.filter(player.heroes, function(hero, k) {
            if (hero && k < player.heroes.length - 2) {
                var isAlive = moment().isAfter(moment(hero.revivalTime));
                if (!isAlive) {
                    deathNum ++;
                }
                return isAlive && hero.level > 0;
            }
        }.bind(this));
        var dead = _.sample(aliveHeroes);
        if (!dead) {
            return 0;
        }

        var wr = formula.artifactValue(player, consts.kArtifactsWarriorsRevival);
        var idx = _.findIndex(player.heroes, {_id: dead._id});
        player.heroes[idx].revivalTime = moment().add(Conf.heroDeadDuration*(deathNum+1)* (1-wr.effect), 'h').toDate();
        result.deadId = idx;
        result.revivalTime = player.heroes[idx].revivalTime;
    } else {
        result.deadId = 0;
    }
};

handler.fightOpponent = function(msg, session, next) {
    var playerId = session.uid;
    var gid = msg.gid;
    if (!msg.opponentId) {
        return next(null, Const.kErrorOpponentNotExist);
    }
    var oppId = msg.opponentId;
    if (oppId == playerId) {
        log.error("fight opponent faild", {playerId: playerId, oppId: oppId});
        return next(null, Const.kErrorInvalidParam);
    }
    async.parallel([
            function(cb) {
                Db.Player.findByIdWithFields(oppId, ['heroWeapons', 'artifacts', 'equips', 'equipValues'], cb);
            },
            function(cb) {
                app.rpc.player.playerRemote.getPlayer(playerId, playerId, function(player) {
                    Db.Player.findByIdWithFields(playerId, ['equips'], function(err, data) {
                        player.equips = data.equips;
                        cb(null, player)
                    });
                });
            },
            function(cb) {
                if (gid) {
                    Db.guild.findByIdWithFields(gid, ['upgrades'], function(err,guild) {
                        guild.upgrades = guild.upgrades || {};
                        cb(null, guild.upgrades)
                    });
                } else {
                    cb(null, {});
                }
            }
        ],
        function(err, data) {

            var opponent = data[0];
            var player = data[1];
            var upgrades = data[2];
            if (err || !opponent) {
                log.info("fight opponent: ", err);
                return next(null, Const.kErrorOpponentNotExist);
            }
            if (player.morale <= 10) {
                return next(null, {code:10000, show:true, msg:"士气值不足"});
            }
            var fragmentLv = upgrades[consts.kGuildUpgradeTypePKFragment] ? upgrades[consts.kGuildUpgradeTypePKFragment].level:1;
            var expLv = upgrades[consts.kGuildUpgradeTypePKExp] ? upgrades[consts.kGuildUpgradeTypePKExp].level:1;
            var result = gameUtil.pk(player, opponent);
            var oppFV = formula.maxFightValue(opponent);
            var exp = Math.ceil(Util.log10(oppFV));
            var moraleCost;
            result.fragment = 0;
            if (Util.countOne(result.alive) < 17) {
                result.exp = exp + (expLv - 1)*2;
                moraleCost = Conf.moralePerBattle;
                if (Util.randomRate(0.5 + (fragmentLv-1)*0.05)) {
                    result.fragment = 1;
                }
                if (Util.randomRate(0.05)) {
                    result.fragment = Util.randomInt(1, exp);
                }
            } else {
                result.exp = Math.ceil(exp / 4);
                moraleCost = Conf.moralePerBattle * 2;
            }
            calcHeroDead(player, result);
            result.moraleCost = moraleCost;
            log.stats("fightOpponent", {playerId:playerId, opponentId: oppId, fragment:result.fragment, exp:exp});
            app.rpc.player.playerRemote.setAttackerPKResult(playerId, playerId, result, function() {});
            return next(null, Util.packageRes(result));
        }.bind(this));
};

handler.fightZodiacOpponent = function(msg, session, next) {
    var playerId = session.uid;
    var idx = msg.idx;

    var now = moment();
    var num = now.hour() - 8;

    if (idx != num){
        log.stats("黄金十二宫改时间", {playerId:playerId, idx: idx, num:num});
        return next(null, {code:10000, show:true, msg:"该星座未报名"});
    }

    if (now.minute() < 30) {
        log.stats("黄金十二宫改时间", {playerId:playerId, idx: idx, num:num});
        return {code:10000, msg:"比赛尚未开始", show:true};
    }
    if (num <= 0 || num > 12) {
        log.stats("黄金十二宫改时间", {playerId:playerId, idx: idx, num:num});
        return {code:10000, msg:"黄金十二宫尚未开启，或已经结束", show:true};
    }

    var day = moment().format('YYYY-MM-DD');
    var zodiacId = day + idx;
    var total = 0;
    var score = 0;
    var redisName = "rank-zodiac-"+zodiacId;
    var opponent;
    async.waterfall(
        [
            function(cb) {
                Db.rds.rank.zscore(redisName, playerId, cb);
            },
            function(ret, cb) {
                score = parseInt(ret);
                Db.rds.rank.zcard("rank-zodiac-bp-"+zodiacId, cb);
            },
            function(num, cb) {
                total = num;
                Db.rds.rank.zrevrank("rank-zodiac-bp-"+zodiacId, playerId, cb);
            },
            function(rank, cb) {
                var start = Math.max(0, rank-5);
                var end = Math.min(rank+10, total-1);
                var tar;
                for(var i = 0; i<10; i++) {
                    tar = Util.randomInt(start, end);
                    if (tar != rank) {break;}
                }
                Db.rds.rank.zrevrange(["rank-zodiac-bp-"+zodiacId, tar, tar], cb);
            },
            function(res, cb) {
                var oppId = res[0];
                Db.Player.findByIdWithFields(oppId, ['heroWeapons', 'artifacts', 'equips', 'equipValues', 'name', 'avatar'], cb);
            },
            function(opp, cb) {
                opponent = opp;
                app.rpc.player.playerRemote.getPlayer(playerId, playerId, function(player) {
                    Db.Player.findByIdWithFields(playerId, ['equips', 'guild'], function(err, data) {
                        player.equips = data.equips;
                        player.guild = data.guild;
                        cb(null, player)
                    });
                });
            }
        ], function(err, player) {
            if (err) {
                return next(null, {code:10000, msg:"挑战失败"});
            }
            if (player.zodiacId != zodiacId){
                return next(null, {code:10000, show:true, msg:"该星座未报名"});
            }
            if (player.dailyEvent.zodiacTimes && player.dailyEvent.zodiacTimes > 11) {
                return next(null, {code:10000, msg:"已经达到次数上限"});
            }

            var result = gameUtil.pk(player, opponent);
            var oppFV = formula.maxFightValue(opponent);
            var exp = 0;
            if (Util.countOne(result.alive) < 17) {
                exp = Math.ceil(Util.log10(oppFV));
                score += exp;
                app.rpc.player.playerRemote.incZodiacTimes(playerId, playerId, function(err) {
                    if (!!err){
                        return next(null, {code:10000, msg:"挑战失败"});
                    }
                    Db.updateGuildZodiacRank(player.guild, exp, function(){});
                    Db.updatePlayerZodiacRank(zodiacId, playerId, score, function() {});
                    result.exp = exp;
                    result.score = score;
                    result.oppName = opponent.name;
                    result.oppAvatar = opponent.avatar;
                    return next(null, Util.packageRes(result));
                });

            }else{
                app.rpc.player.playerRemote.incZodiacTimes(playerId, playerId, function() {});
                result.exp = exp;
                result.score = score;
                result.oppName = opponent.name;
                result.oppAvatar = opponent.avatar;
                return next(null, Util.packageRes(result));
            }
        }
    )
};

handler.zodiacGuildsRankingList = function(msg, session, next) {
    var start = msg.start;
    var n = 50;
    Db.getZodiacGuildRankByRange(start, start+n-1, function(err, list) {
        Db.guild.findByIdsWithFields(_.pluck(list, "id"), ["_id", "name", "icon", "members", "presidentName", 'level'], function(err, guilds) {
            if (err) {
                log.error("[list guild] error", err);
                return next(null, {code:10000, msg:""});
            }
            var ranklist = _.map(list, function(item) {
                var guild = guilds[item.id];
                guild = guild ? guild.toObject() : {};
                guild.id = guild._id;
                guild.rank = item.rank;
                guild.score = item.score;
//                guild.memberCount = guild.members.length;

                return guild;
            });
            next(null, Util.packageRes(ranklist));
        });
    });
};

handler.zodiacMyGuildRanking = function(msg, session, next) {
    var gid = msg.gid;
    Db.getZodiacGuildRank(gid, function(err, rank) {
        Db.getZodiacGuildScore(gid, function(err, score) {
            next(null, Util.packageRes({rank: rank, score:score}));
        });
    })
};

handler.zodiacPlayerRankingList = function(msg, session, next) {
    var day = moment().format('YYYY-MM-DD');
    var zodiacId = day + msg.idx;
    Db.getZodiacPlayerRankByRange(zodiacId, msg.start, msg.start+49, function(err, list) {
        Db.Player.findByIdsWithFields(_.pluck(list, "id"), ["_id", "name", "avatar", "guild"], function(err, players) {
            if (err) {
                log.error("[list globalbp] error", err);
                return next(null, {code:10000, msg:""});
            }
            var arr = [];
            async.each(list, function(item, cb) {
                var player = players[item.id];
                player = player ? player.toObject() : {};
                player.rank = item.rank;
                player.score = item.score;
                delete player._v;
                arr.push(player);
                Db.rds.rank.zscore("rank-bp-world", player._id, function(err, score) {
                    player.battlePoint = score || 0;
                    Db.guild.findByIdWithFields(player.guild, ['name', "_id"], function(err, guild) {
                        if (guild) {
                            player.guildName = guild.name;
                        } else {
                            player.guildName = "";
                        }
                        cb();
                    });
                })
            }, function(err) {
                return next(err, Util.packageRes(arr));
            })
        });
    })
};

handler.getPKPetInfo = function(msg, session, next){
    var playerId = session.uid;
    petServices.getEnemy(msg, {id : playerId}, function(err, info){
        if (!!err){
            next(null, {code:10000, msg:err});
            return;
        }
        delete info.id;
        next(err, Util.packageRes(info));
    })
};

handler.battle = function(msg, session, next){

};