/**
 * Created by lhb on 15/12/7.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var schedule = require('pomelo-schedule');

var exp = module.exports;

exp.init = function() {
    log.info('guild service init.');
    schedule.scheduleJob("0 0 0 * * *", resetNewbie);
    schedule.scheduleJob("0 0 1 * * *", warFinish);
    schedule.scheduleJob("0 0 5 * * *", warMatch);
};

var warFinish = function() {
    async.waterfall(
        [
            function(cb) {
                Db.getDict("dailyFirstWar", cb);
            },
            function(id, cb) {
                Db.war.find({_id:{$gt:id}}, {createTime:1, guilds:1},cb);
            },
            function(wars, cb) {
                var tasks = [];
                _.each(wars, function(war) {
                    tasks.push(function(callback) {
                        calcWarResult(war, callback);
                    })
                });
                async.parallelLimit(tasks, 10, cb);
            }
        ], function(err) {
            if (err) {
                log.stats("公会战争结束", {ok:0, err:err})
            } else {
                log.stats("公会战争结束", {ok:1})
            }
        }
    )
};
var calcResultStatus = function(m, n) {
    if (m == n) {
        return 0;
    }
    if (m > n) {
        return 1;
    }
    if (m < n) {
        return -1;
    }
};

var calcWarResult = function(war, cb) {
    var ids = _.keys(war.guilds);
    var win1 = calcResultStatus(war.guilds[ids[0]].left, war.guilds[ids[1]].left);
    var win2 = -win1;
    async.parallel(
        [
            function(cb) {
                var obj = win1 > 0 ? {win:1} : {lose:1};
                Db.guild.update({_id:ids[0]}, {$inc:obj, $push: {battleMsg: {$each:[{id:war._id, time:war.createTime, isWin:win1}],$position:0, $slice:7}}}, cb);
            },
            function(cb) {
                var obj = win2 > 0? {win:1} : {lose:1};
                Db.guild.update({_id:ids[1]}, {$inc:obj, $push: {battleMsg: {$each:[{id:war._id, time:war.createTime, isWin:win2}],$position:0, $slice:7}}}, cb);
            }
        ], cb
    )
};

var resetNewbie = function() {
    Db.guild.update({}, {$set:{newbie:[]}}, {multi:true}, function(err) {
        if (err) {
            log.stats("reset newbie", {ok:0})
        } else {
            log.stats("reset newbie", {ok:1})
        }
    });
};

var warMatch = function() {
    log.info("war match start.");
    async.waterfall([
            function(cb) {
                Db.getCounter("war", cb);
            },
            function(id,cb) {
                Db.setDict("dailyFirstWar", id, function(err) { cb(err) });
            },
            function(cb) {
                Db.guild.update({}, {$set:{war:0}}, {multi:true}, function(err) { cb(err) });
            },
            function(cb) {
                Db.rds.rank.zrevrange(["rank-bp-guild", 0, -1], cb);
            },
            function(guilds, cb) {
                var pairs = [];
                var rand = 1;
                while (Util.randomRate(0.5)) {
                    rand++;
                }
                var length = Math.floor(guilds.length/(2*rand));
                for(var i = 0; i < length; i++) {
                    for (var k = 0; k < rand; k++) {
                        pairs.push({g1:guilds[i*2*rand+k], g2:guilds[i*2*rand+k+rand], id:i*rand+k+1});
                    }
                }
                async.eachLimit(pairs, 10, function(pair, callback) {
                    createWar(pair.g1, pair.g2, callback);
                }, cb)
            }
        ],
        function(err) {
            if (!err) {
                log.stats("匹配战争", {ok:1});
            } else {
                log.stats("匹配战争", {ok:0, err:err});
            }
        }
    );
};

var initWarMembers = function(guild) {
    var members = _.difference(guild.members, guild.newbie);
    var obj = {};
    _.each(members, function(m) {
        obj[m] = {
            heroes:"111111111111111111111111111111111",
            attacks:[],
            getReward : 0
        };
    });
    return obj;
};

var totalHeroes = function(guild) {
    var members = _.difference(guild.members, guild.newbie);
    return members.length * 33;
};

var createWar = function(g1, g2, callback) {
    var id;
    async.waterfall([
        function(cb) {
            Db.inc("war", cb);
        },
        function(count, cb) {
            id = count;
            Db.guild.findByIdsWithFields([g1, g2], ['members', 'newbie', 'war', 'battlePoint'], cb);
        },
        function(guilds, cb) {
            var war = Db.war.create(parseInt(id));
            war._id = id;
            war.createTime = new Date();
            war.guilds = {};
            war.guilds[g1] = initGuild(id, g1, g2, guilds[g1]);
            war.guilds[g2] = initGuild(id, g2, g1, guilds[g2]);
            war.save(cb);
        }
    ], callback)
};

var initGuild = function(wid, gid, oppId, dbObj) {
    dbObj.war = wid;
    dbObj.save();
    return {
        opponent: oppId,
        players: initWarMembers(dbObj),
        left: totalHeroes(dbObj),
        bp : dbObj.battlePoint
    }
};