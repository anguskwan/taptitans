/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/1/16.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */
var moment = require('moment');
var crypto = require('crypto');
var weekUtil = require("./../util/weekUtil");
module.exports = function(exports, rds) {
    var db = exports;

    db.PLAYER_BASIC_FIELDS = ["id", "name", "avatar", "location", "pvp", "pve"];
    db.FRIEND_BASIC_FIELDS = _.union(db.PLAYER_BASIC_FIELDS, ["inviter", "milestone", "data"]);


    db.createPlayer = function(params, callback) {
        var shareCode;
        var serverId;
        async.waterfall([
            function(callback) {
                if(params.uniqueId) {
                    return callback(null, null);
                }
                Db.rds.login.get(params.uniqueId, callback);
            },
            function(playerId, callback) {
                if(playerId) {
                    return callback("USER_ALREADY_EXISTS");
                }
                Db.rds.counter.get("counter:GameServer", function(err, sid) {
                    serverId = sid || 1;
                    callback();
                })
            },
            function(callback) {
                Db.inc("Player", callback);
            },
            function(playerId, callback) {
                if (params.uniqueId) {
                    shareCode = crypto.createHash('md5').update(params.uniqueId).digest("hex");
                    Db.rds.share.setnx(shareCode, playerId, function() {});
                    Db.rds.login.setnx(params.uniqueId, playerId, function(err, reply){
                        callback(err, playerId, reply);
                    });
                } else {
                    shareCode = crypto.createHash('md5').update(playerId+"").digest("hex");
                    Db.rds.share.setnx(shareCode, playerId, function() {});
                    callback(null, playerId, 1);
                }

            },
            function(playerId, isSet, callback) {
                if(isSet == 0) {
                    return callback("USER_ALREADY_EXISTS");
                }
                var player = Db.Player.create(parseInt(playerId));

                var achievements = [];
                for (var i = 1; i <= _.size(Conf.achievements); i++) {
                    achievements[i] = {
                        id : i,
                        value : 0,
                        stars : 0
                    }
                }
                var heroWeapons = [];
                for (var i = 0; i <= _.size(Conf.hero); i++) {
                    heroWeapons[i] = 0;
                }
//                var masterEquip = [0,0,0,0,0,0];
//                var equipName = ['weapon', 'cloak', 'head', 'wing', 'body', 'light'];
//                for (var i = 0; i < 6; i++) {
//                    masterEquip[equipName] = {};
//                    masterEquip[equipName][1] = {
//                        exp:0,
//                        skill:0,
//                        step: 1,
//                        fragment:0
//                    };
//                }
                _.extend(player, {
                    id: parseInt(playerId),
                    createTime: new Date(),
                    lastTimeLogout: new Date(),
                    achievements : achievements,
                    uniqueId: params.uniqueId,
                    subChannelUid : !!params.subChannelUid ? params.subChannelUid : "",
                    subscribed : !!params.subscribed ? params.subscribed : 0,
                    name: params.name,
                    loginType : "native",
                    avatar: params.avatar,
                    shareCode : shareCode,
                    channel: params.channel,
                    serverId : serverId,
                    location: params.location,
                    isSubscribed: params.isSubscribed,
                    contestId : "none",
                    heroWeapons: heroWeapons,
                    shopItems : [0,0,0,0,0,0,0],
                    mailbox:[],
                    purchaseCount: {
                        '301' : 0
                    },
                    masterEquips:[0,0,0,0,0,0,0],
                    equipValues:[0,0,0,0,0,0,0]
                });
                player.save(callback);
            }
        ], callback);
    };


    // ======= 排行榜 相关 ======= //

    db.getRankByRange = function(key, start, end, callback, decode) {

        rds.rank.zrevrange(key, start, end, "withscores", function(err, res) {
            if (err) return callback(err);
            var ret = [];
            for (var i = 0; i < res.length; i += 2) {
                var score = parseInt(res[i + 1]);
                if (decode) {
                    score = db.decodeScoreWithTime(score);
                }
                ret.push({ id: res[i], score: score, rank: start + Math.floor(i/2) });
            }
            callback(null, ret);
        });
    };

    db.getServerRankByRange = function(server, start, end, callback) {
        var key = server ? "rank-server-" + server : "rank-world";
        db.getRankByRange(key, start, end, callback, true);
    };

    db.getContestRankByRange = function(contestId, start, end, callback) {
        var key = "rank-contest-" + contestId;
        db.getRankByRange(key, start, end, callback, true);
    };

    db.getBattlePointRankByRange = function(server, start, end, callback) {
        var key = "rank-bp-" + server;
        db.getRankByRange(key, start, end, callback, false);
    };

    db.getGuildBPRankByRange = function(start, end, callback) {
        var key = "rank-bp-guild";
        db.getRankByRange(key, start, end, callback, false);
    };

    db.getZodiacGuildRankByRange = function(start, end, callback) {
        var day = moment().format('YYYY-MM-DD');
        var key = "rank-guild-zodiac-" + day;
        db.getRankByRange(key, start, end, callback, false);
    };

    db.getZodiacPlayerRankByRange = function(id, start, end, callback) {
        var key = "rank-zodiac-"+id;
        db.getRankByRange(key, start, end, callback, false);
    };

    db.getZodiacGuildRank = function(gid, callback) {
        var day = moment().format('YYYY-MM-DD');
        var key = "rank-guild-zodiac-" + day;
        rds.rank.zrevrank(key, gid, callback);
    };

    db.getPlayerRank = function(playerId, server, callback) {
        var key = server ? "rank-server-" + server : "rank-world";
        rds.rank.zrevrank(key, playerId, callback);
    };

    db.getPlayerContestRank = function(playerId, contestId, callback) {
        rds.rank.zrevrank("rank-contest-"+contestId, playerId, callback);
    };

    db.getPlayerBattlePointRank = function(playerId, server, callback) {
        var key = "rank-bp-" + server;
        rds.rank.zrevrank(key, playerId, callback);
    };

    db.getPlayerServerScore = function(playerId, server, callback) {
        var key = "rank-server-" + server;
        rds.rank.zscore(key, playerId, function(err, score){
            return callback(err, db.decodeScoreWithTime(score));
        });
    };

    db.getZodiacGuildScore = function(gid, callback) {
        var day = moment().format('YYYY-MM-DD');
        var redisName = "rank-guild-zodiac-" + day;
        rds.rank.zscore(redisName, gid, callback);
    };

    db.getZodiacGuildRank = function(gid, callback) {
        var day = moment().format('YYYY-MM-DD');
        var redisName = "rank-guild-zodiac-" + day;
        rds.rank.zrevrank(redisName, gid, callback);
    };

    db.updatePlayerRank = function(playerId, score, callback) {
        rds.rank.zadd("rank-world", score, playerId, function(err, added) {
            callback(err, added);
        });
    };

    db.updatePlayerServerRank = function(server, playerId,score, callback) {
        rds.rank.zadd("rank-server-" + server, db.encodeScoreWithTime(score), playerId, callback);
    };

    db.updatePlayerContestRank = function(contestId, playerId, score, callback) {
        if (contestId == "none") {
            return callback();
        }

        async.waterfall([
            function(cb) {
                rds.dict.get("dict:contest"+contestId, cb);
            },
            function(time, cb) {
                var diff = moment().diff(moment(new Date(time)), 'hours', true);
                if (diff < consts.kContestDuration) {
                    rds.rank.zadd("rank-contest-" + contestId, db.encodeScoreWithTime(score), playerId, cb);
                } else {
                    cb();
                }
            }
        ], callback);
    };

    db.updatePlayerZodiacBPRank = function(zodiacId, playerId,score, callback) {
        rds.rank.zadd("rank-zodiac-bp-" + zodiacId, score, playerId, callback);
    };

    db.updatePlayerZodiacRank = function(zodiacId, playerId, score, callback) {
        async.waterfall([
            function(cb) {
                rds.rank.zadd("rank-zodiac-"+zodiacId, score, playerId, cb);
            }
        ], callback)
    };

    db.updateGuildZodiacRank = function(gid, score, callback) {
        if (!gid) {
            return callback();
        }
        var day = moment().format('YYYY-MM-DD');
        var redisName = "rank-guild-zodiac-" + day;
        async.waterfall(
            [
                function(cb) {
                    rds.rank.zscore(redisName, gid, cb);
                },
                function(num, cb) {
                    num = num || 0;
                    rds.rank.zadd(redisName,parseInt(num)+score, gid, cb);
                }
            ],callback
        )
    };

    db.updatePlayerFightRank = function(server, playerId, score, callback) {
        rds.rank.zadd("rank-bp-" + server, score, playerId, callback);
    };

    db.updatePlayerBPRank = function(playerId, score, callback) {
        rds.rank.zadd("rank-bp-world", score, playerId, callback);
    };

    /**
     * 更新宠物排行榜
     * @param playerId
     * @param score
     * @param callback
     */
    db.updatePetPKRank = function(playerId, score, callback){
        var key = null;
        async.waterfall([
            function(cb){
                rds.rank.zadd("rank-pet-world", score, playerId, cb);
            },
            function(bp, cb){
                var day = moment().format('YYYY-MM-DD');
                key = "rank-pet-" + day;
                rds.rank.zadd(key, score, playerId, cb);
            }
        ], function(err){
            if (!!err){
                callback("更新宠物PK排行榜失败.");
                return;
            }
            rds.rank.pexpireat(key, weekUtil.getClockTime(new Date(), 0) + 86400000 * 2);
            callback(null, null);
        });
    };

    db.updateGuildBPRank = function(gid, callback) {
        var diff;
        async.waterfall([
                function(cb) {
                    Db.guild.findOne({_id:gid}, {members:1, win:1, lose:1}, cb);
                },
                function(guild, cb) {
                    if (!guild) {cb("公会不存在")}
                    diff = guild.win - guild.lose;
                    var members = guild.members;
                    async.reduce(members, 0, function(memo, item, rcb) {
                        rds.rank.zscore("rank-bp-world", item, function(err, score) {
                            rcb(err, memo+parseInt(score));
                        })
                    }, cb);
                },
                function(bp, cb) {
                    Db.guild.update({_id:gid}, {$set:{battlePoint:bp}}, function(){});
                    rds.rank.zadd("rank-bp-guild", bp, gid, function(err) {cb(err, bp)});

                },function(bp, cb) {
                    var bpScore = Math.ceil(Util.log10(bp) * 100);
                    rds.rank.zrevrank("rank-bp-guild", gid, function(err, rank) {
                        var score = (100000-rank + diff) * 100000 + bpScore;
                        rds.rank.zadd("rank-rate-guild", score, gid, cb);
                    });
                }
            ],
            callback
        )
    };

    // db.overridePlayerPVPWeekRank = function(week, playerId, rank, callback) {
    //     rds.rank.zadd("pvprank-week-" + week, db.encodeScoreWithTime(rank), playerId, callback);
    // };

    var MAGIC_NUMBER_FOR_SCORE = 10000000;
    var getElapsedSeconds = function() {
        var start = moment("2015 9 28", "YYYY MM DD");
        return moment().unix() - start.unix();
    };

    db.encodeScoreWithTime = function(score) {
        var val = score * MAGIC_NUMBER_FOR_SCORE + MAGIC_NUMBER_FOR_SCORE - (getElapsedSeconds() % MAGIC_NUMBER_FOR_SCORE);
        log.debug("encoded score:" + val);
        return val;
    };

    db.decodeScoreWithTime = function(val) {
        var score = Math.floor(val / MAGIC_NUMBER_FOR_SCORE);
        log.debug("decoded score:" + score);
        return score;
    };

    /**
     * 社交相关
     */
    
    db.transformPlayer = function(player) {
        var obj = _.isFunction(player.toObject) ? player.toObject() : player;
        _.extend(obj, obj.data);
        obj.lastTimeSync = obj.lastTimeSync ? obj.lastTimeSync.valueOf() : 0;
        delete obj.data;
        return obj;
    }
    db.findAllFriendsWithFields = function(player, fields, callback) {
        var tasks = [];
        tasks.push(function(callback){
            Db.Player.findByIdsWithFields(player.friendsInGame, fields, function(err, results){
                callback(err, _.map(_.toArray(results), Db.transformPlayer));
            });    
        });
        tasks.push(function(callback){
            Db.Player.findByIdsWithFields(player.friendsInSocial, fields, function(err, results){
                callback(err, _.map(_.toArray(results), Db.transformPlayer));
            });
        });
        async.parallel(tasks, function(err, results){
            callback(err, player, results);
        });
     };

     db.addFriendsToBothSide = function(from, to, friendType, callback) {
        async.parallel([
            function(callback) {
                var update = {$push: {}};
                update.$push[friendType] = to;
                Db.Player._getModel(from).findOneAndUpdate({id: from}, update, callback);
            },
            function(callback) {
                var update = {$push: {}};
                update.$push[friendType] = from;
                Db.Player._getModel(to).findOneAndUpdate({id: to}, update, callback);
            }
        ], callback);
     };

     db.delFriendsFromBothSide = function(from, to, callback) {
        async.parallel([
            function(callback) {
                Db.Player._getModel(from).findOneAndUpdate({id: from}, {$pull: {friendsInGame: to, friendsInSocial: to}}, callback);
            },
            function(callback) {
                Db.Player._getModel(to).findOneAndUpdate({id: to}, {$pull: {friendsInGame: from, friendsInSocial: from}}, callback);
            }
        ], callback);
     };
};
