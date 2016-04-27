/**
 * Created by lhb on 15/12/8.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var formula = require("../../../consts/formula");
var gameUtil = require("../../../util/gameUtil");
module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;


handler.warInfo = function(msg, session, next) {
    var wid = msg.wid;
    if(!wid) {
        return next(null, {code:10000, msg:"获取战争信息失败"});
    }
    async.waterfall([
        function(cb) {
            Db.war.findById(wid, cb);
        }
    ], function(err, war) {
        if (err) {
            return next(null, {code:10000, msg:"获取战争信息失败"});
        }
        return next(null, Util.packageRes(war.toObject()));
    });
};

handler.warPlayerInfo = function(msg, session, next) {
    var pid = msg.pid;
    var ret = [];
    Db.Player.findByIdWithFields(pid, ['heroWeapons', 'artifacts', '_id', 'id', 'equipValues'], function(err, player) {
        if (err) {
            return next(null, {code:10000, msg:"war player info failed!"});
        }
        for(var i = 1; i <=33; i++) {
            var bp = formula.heroFightValue(player, i, true);
            ret.push({bp:bp, weapons: player.heroWeapons[i]});
        }
        return next(null, Util.packageRes(ret));
    });
};

var calcFight = function(attacker, defender) {
    var result = {
        alive:""
    };
    for (var i = 1; i <= _.size(Conf.hero); i ++) {
        var p1dps = formula.heroFightValue(attacker, i, true);
        var p2dps = formula.heroFightValue(defender, i, true);
        if (p1dps <= p2dps) {
            result.alive += "1";
        } else {
            result.alive += "0";
        }
    }
    return result;
};

handler.fightEnemy = function(msg, session, next) {
    var uid = session.uid;
    var gid = msg.gid;
    var eid = msg.eid;
    var warInfo, oppGuild, player;
    var hour = moment().hour();
    if (hour<12) {
        return next(null, {code:10000, show:true, msg:"不在有效时间内"});
    }
    async.waterfall(
        [
            function(cb) {
                Db.guild.findByIdWithFields(gid, ['_id', 'members', 'war'], cb);
            },
            function(guild, cb) {
                if (guild.members.indexOf(uid) == -1) {
                    return cb("玩家不在公会中")
                }
                if (!guild.war) {
                    return cb("战争尚未开启");
                }
                Db.war.findById(guild.war, cb);
            },
            function(war, cb) {
                warInfo = war;
                _.each(war.guilds, function(v, k) {
                    if (k != gid) {oppGuild = k}
                });
                var player = war.guilds[gid].players[uid];
                if (player.attacks.length > 1) {
                    return cb("攻击次数不足");
                }
                if (!warInfo.guilds[oppGuild].players[eid]) {
                    return cb("对手不存在");
                }
                Db.Player.findByIdWithFields(uid, ['heroes', 'heroWeapons', 'artifacts', 'id', 'equips','equipValues'], cb);
            },
            function(p, cb) {
                player = p;
                Db.Player.findByIdWithFields(eid, ['heroWeapons', 'artifacts', 'equips', 'equipValues'], cb);
            }
        ],
        function(err, enemey) {
            if (err) {
                return next(null, {code:10000, show:true, msg:err})
            }
            var result = gameUtil.pk(player, enemey);
            var heroes = warInfo.guilds[oppGuild].players[eid].heroes;
            var left = Util.countOne(heroes);
            heroes = Util.calcAlive(heroes, result.alive);
            var diff = left - Util.countOne(heroes);
            warInfo.guilds[oppGuild].players[eid].heroes = heroes;
            warInfo.guilds[oppGuild].left -= diff;
            warInfo.guilds[gid].players[uid].attacks.push({enemy:eid, count:diff});
            Db.war.update({_id:warInfo._id}, {$set:{guilds:warInfo.guilds}}, function(err) {
                if (err) {
                    log.stats("fight enemy fail!", err);
                }
                return next(null, Util.packageRes({result:result}));
            });
        }
    )
};