module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;


function queryRankList(uid, length, around, server, type, callback) {
    var funcName;
    switch (type) {
        case 'server':
            funcName = "getServerRankByRange";
            break;
        case 'contest':
            funcName = "getContestRankByRange";
            break;
        case 'bp':
            funcName = "getBattlePointRankByRange";
            break;
    }
    async.parallel({
        self: function(callback) {
            async.waterfall([
                function(cb) {
                    if (type == "server") {
                        Db.getPlayerRank(uid, server, cb)
                    } else if(type == "contest") {
                        Db.getPlayerContestRank(uid, server, cb);
                    } else if(type == "bp") {
                        Db.getPlayerBattlePointRank(uid, server,cb);
                    }
                },
                function(rank, cb) {
                    if (rank && rank + around >= length) {
                        var start = Math.max(length, rank - around);
                        Db[funcName](server, start, rank + around, function(err, list) {
                            cb(err, {rank: rank, around: list});
                        });
                    } else {
                        cb(null, {rank: rank});
                    }
                }
            ], callback);
        },
        top: function(callback) {
            Db[funcName](server, 0, length - 1, callback);
        }
    }, function(err, data) {
        if (err) {
            log.error("[getRankList] 查询数据库出错", err);
            return callback(err);
        }
        var list = data.top;
        if (data.self.around) list = list.concat(data.self.around);
        Db.Player.findByIdsWithFields(_.pluck(list, "id"), ["id", "name", "avatar", "stage", "artifacts"], function(err, players) {
            if (err) {
                log.error("[getRankList] getPlayersInfo出错", err);
                return callback(err)
            }
            var ranklist = _.map(list, function(item) {
                var player = players[item.id];
                player = player ? player.toObject() : {};
                player.rank = item.rank;
                player.score = item.score;
                if (player.artifacts) {
                    player.artifacts = player.artifacts.length;
                }
                if (player.id == uid) player.self = true;
                delete player.uniqueId;
                delete player.id;
                delete player._v;
                return player;
            });
            callback(null, ranklist);
        });
    });
}

handler.getRankList = function(data, session, next) {

    var n = Conf.rankListLength, around = Conf.rankListAround;
    queryRankList(session.uid, n, around, session.get("gameServerId"), "server", function(err, list) {
        if (err) return next(err);
        next(null, Util.packageRes(list));
    });
};

handler.getFriendsRankList = function(data, session, next) {
    var pid = session.uid;
    var list = [];
    Db.Player.findById(pid, function(err, player) {
        var ids = player.friends;
        list.push({id: player.id, avatar: player.avatar, score: player.highestStage, name : player.name, isSelf:true, stage: player.stage, artifacts: player.artifacts.length});
        Db.Player.findByIdsWithFields(ids, ["id", "name", "avatar", "highestStage", "stage", "artifacts"], function(err, players) {
            if (err) {
                log.error("[getFriendsRankList] getPlayersInfo出错", err);
                return next(err)
            }
            _.each(players, function(p) {
                list.push({id: p.id, avatar: p.avatar, score: p.highestStage, name : p.name, stage: p.stage, artifacts: p.artifacts.length});
            });
            list = _.sortBy(list, function(v) {return -v.score});
            _.each(list, function(v, k) {v.rank = k + 1});
            next(null, Util.packageRes(list));
        });
    });
};

handler.getContestRankList = function(data, session, next) {
    var n = 5, around = 1;
    queryRankList(session.uid, n, around, data.contestId, "contest", function(err, list) {
        if (err) return next(err);
        next(null, Util.packageRes(list));
    });
};

handler.getBattlePointRankList = function(data, session, next) {
    var n = Conf.rankListLength, around = Conf.rankListAround;
    queryRankList(session.uid, n, around, session.get("gameServerId"), "bp", function(err, list) {
        if (err) return next(err);
        next(null, Util.packageRes(list));
    });
};

handler.getGlobalBPList = function(msg, session, next) {
    var start = msg.start;
    var n = Conf.rankListLength;
    Db.getRankByRange("rank-bp-world", start, start+n-1, function(err, list) {
        Db.Player.findByIdsWithFields(_.pluck(list, "id"), ["_id", "name", "avatar", "highestStage", "heroWeapons"], function(err, players) {
            if (err) {
                log.error("[list globalbp] error", err);
                return next(null, {code:10000, msg:""});
            }
            var ranklist = _.map(list, function(item) {
                var player = players[item.id];
                player = player ? player.toObject() : {};
                player.rank = item.rank;
                player.score = item.score;
                player.heroWeapons = Util.arraySum(player.heroWeapons);
                delete player.id;
                delete player._v;
                return player;
            });
            next(null, Util.packageRes(ranklist));
        });
    }, false);

};