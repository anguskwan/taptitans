/**
 * Created by lhb on 15/11/30.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var util = require("util");

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.findGuild = function(msg, session, next) {
    var name = msg.name;
    Db.guild.findOne({name:name},{_id:1, name:1,setting:1, icon:1, members:1,level:1, presidentName:1, battlePoint:1}, function(err, guild) {
        if (err || !guild) {
            return next(null, {code:10000, show:true, msg:"公会不存在"});
        }
        guild = guild.toObject();
        guild.id = guild._id;
        guild.memberCount = guild.members.length;
        delete guild.members;
        return next(null, Util.packageRes(guild));
    }.bind(this))
};

handler.queryById = function(msg, session, next) {
    var gid = msg.gid;
    Db.guild.findById(gid, function(err, guild) {

        if (err || !guild) {
            return next(null, {code:10000, show:true, msg:"公会不存在"});
        }
        return next(null, Util.packageRes(guild.toObject()));
    }.bind(this));
};

handler.modifyNotice = function(msg, session, next) {
    var gid = msg.gid;
    var text = msg.text;
    Db.guild.findByIdAndUpdate(gid, {$set:{notice:text}}, function(err) {
        next(null, Util.packageRes());
    })
};

handler.randomTenGuild = function(msg, session, next) {

    async.waterfall(
        [
            function(cb) {
                Db.rds.counter.get("counter:guild", cb);
            },
            function(total, cb) {
                var arr = _.range(1, total);
                var sample = _.sample(arr, 10);
                Db.guild.findByIdsWithFields(sample, ["name", 'members', 'setting','icon', '_id', 'presidentName', 'level'], cb);
            }
        ],
        function(err, guilds) {
            if (err) {
                return next(null, {code:10000, msg:err})
            }
            var list = _.map(guilds, function(guild) {
                guild = guild ? guild.toObject() : {};
                guild.id = guild._id;
                guild.memberCount = guild.members.length;
                delete guild.members;
                return guild;
            });
            return next(null, Util.packageRes(list));
        }
    )
};

handler.joinGuildWithoutReq = function(msg, session, next) {
    var uid = session.uid;
    var gid = msg.gid;
    Db.guild.findByIdWithFields(gid, ['setting'], function(err, guild) {
        if (err || !guild) {
            return next(null, {code:10000, msg:""});
        }
        if (guild.setting.needReq) {
            return next(null, {code:10000, msg:""});
        }
        Db.rds.rank.zscore("rank-bp-world", uid, function(err, score) {
            if (err || !score || score < guild.setting.bpLimit) {
                return next(null, {code:10000, msg:"战斗力不足"});
            }
            addMember(gid, uid, function(err, result) {
                if (err) {
                    return next(null, {code:10000, msg:err});
                }
                next(null, Util.packageRes({result:result}));
            })
        })
    })
};

handler.joinGuild = function(msg, session, next) {
    var gid = msg.gid;
    var uid = session.uid;

    Db.guild.findByIdAndUpdate(gid, {$addToSet:{joinReq: parseInt(uid)}}, function(err) {
        if (err) {
            return next(null, {code:10000, show:true, msg:"请求发送失败"});
        }
        return next(null, Util.packageRes());
    });
};

handler.createGuild = function(msg, session, next) {
    var name = msg.name;
    var uid = session.uid;
    var icon = msg.icon;
    var playerName = "";
    async.waterfall([
        function(cb) {
            Db.Player.findOne({_id:uid}, {guild:1, diamond:1, name:1}, cb);
        },
        function(player, cb) {
            if (player.guild) {
                return cb("已经有公会了");
            }
            if (player.diamond < Conf.createGuildCost) {
                return cb("钻石不足");
            }
            playerName = player.name;
            Db.guild.findOne({name:name}, function(err, guild) {
                if (guild) {
                    return cb("公会名字已存在");
                }
                return cb();
            })
        },
        function(cb) {
            Db.inc("guild", cb);
        }
    ], function(err, id) {
        if (err) {
            return next(null, {code:10000, msg:err, show:true});
        }
        var guild = Db.guild.create(parseInt(id));
        guild._id = id;
        guild.id = id;
        guild.creator = uid;
        guild.president = uid;
        guild.presidentName = playerName;
        guild.members = [uid];
        guild.name = name;
        guild.icon = icon;
        guild.createTime = new Date();
        guild.contribution = {};
        guild.setting = {
            needReq : msg.needReq,
            bpLimit : msg.bpLimit
        };
        guild.upgrades = {
            2:{exp:0, level:1},
            3:{exp:0, level:1},
            4:{exp:0, level:1}
        };
        Db.Player.findByIdAndUpdate({_id:uid}, {$set:{guild: id}}, function(err) {});
        guild.save(function(err) {
            if (err) {
                log.info("%j", err);
                return next(null, {code:10000, msg:"创建公会失败", show:true});
            }
            Db.updateGuildBPRank(id, function() {});
            return next(null, Util.packageRes({id:id}));
        });
    });
};

/**
 * 快速加入公会
 * @param msg
 * @param session
 * @param next
 */
handler.fasterJoinGuild = function(msg, session, next){
    var uid = session.uid;
    if (!uid){
        return next(null, {code:10000, msg:"未找到匹配的公会", show:true});
    }
    var guildId = null;
    async.waterfall([
        function(callback){
            Db.rds.rank.zscore("rank-bp-world", uid, callback);
        },
        function(score, callback){
            if (!score) score= 0;
            score = parseInt(score);
            var queryStr = util.format("this.setting.needReq == false && (this.setting.bpLimit == false || (!!this.setting.bpLimit && this.setting.bpLimit <= %d)) && this.members.length < 9 + this.level", score);
            log.info("the query conditions:%s", queryStr);
            Db.guild.findAllByCond({$where:queryStr}, callback);
        },
        function(guilds, callback){
            if (!guilds || !guilds.length) {
                return next(null, {code:10000, msg:"未找到匹配的公会", show:true});
            }
            var list = _.sortBy(guilds, function(v) {return -v.level});
            for (var i = 0, j = list.length; i < j; ++i){
                if (!list[i] || !list[i]._id) continue;
                guildId = list[i]._id;
                break;
            }
            if (!guildId){
                return next(null, {code:10000, msg:"未找到匹配的公会", show:true});
            }
            addMember(guildId, uid, callback);
        }
    ], function(err, success){
        if (!!err || !success){
            return next(null, {code:10000, msg:"未找到匹配的公会", show:true});
        }
        return next(null, Util.packageRes({id:guildId}));
    });
};

handler.listGuilds = function(msg, session, next) {
    var start = msg.start;
    var n = Conf.rankListLength;
    Db.getGuildBPRankByRange(start, start+n-1, function(err, list) {
        Db.guild.findByIdsWithFields(_.pluck(list, "id"), ["_id", "name", "icon","setting", "members", "presidentName", 'level'], function(err, guilds) {
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
                guild.memberCount = guild.members.length;

                return guild;
            });
            next(null, Util.packageRes(ranklist));
        });
    });

};

var addMember = function(gid, pid, cb) {
    Db.guild.findOne({_id:gid}, {members:1, level:1,newbie:1}, function(err, guild) {
        var limit = 9 + guild.level;
        if (guild.members.length < limit && guild.members.indexOf(pid) == -1) {
            Db.Player.findOne({_id: pid}, {id:1, guild: 1}, function (err, player) {
                if (err || player.guild) {
                    return cb("玩家已经加入了公会");
                } else {
                    guild.members.push(pid);
                    guild.newbie.push(pid);
                    player.guild = gid;
                    player.save();
                    guild.save(function() {
                        Db.updateGuildBPRank(gid, function(){});
                    });
                    cb(null, true);
                }
            });
        } else {
            return cb("加入失败");
        }
    })
};

handler.approve = function(msg, session, next) {
    var gid = msg.gid;
    var reqId = msg.reqId;
    Db.guild.findOne({_id:gid}, {joinReq:1, members:1, level:1,newbie:1}, function(err, guild) {
        var idx = guild.joinReq.indexOf(reqId);
        var limit = 9 + guild.level;
        if (guild.members.length < limit && idx != -1 && guild.members.indexOf(reqId) == -1) {
            Db.Player.findOne({_id: reqId}, {id:1, guild: 1}, function (err, player) {
                if (err || player.guild) {
                    return next(null, {code:10000, msg:"玩家已经加入了公会", show:true});
                } else {
                    guild.joinReq.splice(idx, 1);
                    guild.members.push(reqId);
                    guild.newbie.push(reqId);
                    player.guild = gid;
                    player.save();
                    guild.save(function() {
                        Db.updateGuildBPRank(gid, function(){});
                    });
                    app.rpc.player.playerRemote.pushMessageToClient(reqId, reqId, "approved", {gid:gid}, function() {});
                    return next(null, Util.packageRes({result: true}));
                }
            });
        } else {
            return next(null, Util.packageRes({result: false}));
        }
    })
};

handler.reject = function(msg, session, next) {
    var gid = msg.gid;
    var reqId = msg.reqId;
    Db.guild.findOne({_id:gid}, {joinReq:1}, function(err, guild) {
        var idx = guild.joinReq.indexOf(reqId);
        if (idx != -1) {
            guild.joinReq.splice(idx, 1);
            guild.save();
            return next(null, Util.packageRes({result: true}));
        } else {
            return next(null, Util.packageRes({result: false}));
        }
    })
};

handler.playerList = function(msg, session, next) {
    var playerIds = msg.playerIds;
    async.waterfall(
        [
            function( cb) {
                Db.Player.findByIdsWithFields(playerIds, ['id','name', 'avatar', 'highestStage', 'heroWeapons', 'artifacts'], cb);
            }
        ],
        function(err, players) {
            if (err) {
                return next(null, {code:10000, msg:err});
            }
            var list = [];
            async.each(players, function(player, cb) {
                player = player ? player.toObject() : {};
                player.heroWeapons = _.reduce(player.heroWeapons, function(memo, value){return memo+value}, 0) || 0;
                player.artifacts = player.artifacts.length;
                list.push(player);
                Db.rds.rank.zscore("rank-bp-world", player.id, function(err, score) {
                    player.battlePoint = score || 0;
                    cb();
                })
            }, function(err) {
                return next(err, Util.packageRes(list));
            })
        }
    )
};

/**
 * 解散
 * @param guild
 * @param next
 */
var dissolve = function(guild, next){
    async.parallel([
        function(cb) {
            Db.guild.remove({_id: guild._id}, cb);
        },
        function(cb) {
            Db.rds.rank.zrem("rank-bp-guild", guild._id, cb);
        },
        function(cb) {
            Db.rds.rank.zrem("rank-rate-guild", guild._id, cb);
        }
    ], function(err){
        next(err, null);
    });
};

handler.quit = function(msg, session, next){
    var uid = session.uid;
    var player = null;
    async.waterfall([
        function(callback){
            Db.Player.findByIdWithFields(uid, ['id', 'guild'], callback);
        },
        function(p, callback){
            if (!p){
                next(null, {code:10000, msg:"找不到该玩家"});
                return;
            }
            player = p;
            var gid = player.guild;
            if (!gid){
                next(null, {code:10000, msg:"玩家不在公会中"});
                return;
            }
            Db.guild.findOne({_id:gid}, {_id:1, members:1, president:1}, callback);
        },
        function(guild, callback){
            if (!guild){
                next(null, {code:10000, msg:"没有这个公会"});
                return;
            }
            if (guild.members.length > 1 && guild.president == uid) {
                next(null, {code:10000, msg:"会长不能退出"});
                return;
            }
            uid = parseInt(uid);
            if (isNaN(uid)){
                next(null, {code:10000, msg:"找不到该玩家"});
                return;
            }

            var idx = guild.members.indexOf(uid);
            if (idx < 0){
                callback(null, null);
            } else {
                guild.members.splice(idx, 1);
                if (guild.members.length == 0) {
                    dissolve(guild, function(err){
                        if (!!err){
                            next(null, {code:10000, msg:"退出失败"});
                            return;
                        }
                        callback(null, null);
                    });
                } else {
                    guild.save(function(err) {
                        if (!!err){
                            next(null, {code:10000, msg:"退出失败"});
                            return;
                        }
                        Db.updateGuildBPRank(guild._id, function(){});
                        callback(null, null);
                    });
                }
            }
        },
        function(flag, callback){
            player.guild = 0;
            player.save(callback);
        }
    ], function(err){
        if (err) {
            next(null, {code:10000, msg:"退出失败"});
            return
        }
        next(null, Util.packageRes());
    });
};

handler.kick = function(msg, session, next) {
    var memberId = msg.memberId;
    var gid = msg.gid;
    var uid = session.uid;
    async.waterfall(
        [
            function(cb) {
                Db.guild.findByIdWithFields(gid, ['president'], cb);
            },
            function(guild, cb) {
                if (guild.president != uid) {
                    return cb("权限不够");
                }
                cb()
            }
        ],
        function(err) {
            if (err) {
                return next(null, {code:10000, msg:err, show:true});
            }
            app.rpc.player.playerRemote.pushMessageToClient(memberId, memberId, "guildKicked", {}, function() {});
            Db.Player.update({_id:memberId}, {$set:{guild:0}}, function(){});
            Db.guild.update({_id:gid}, {$pull:{members:memberId}}, function() {
                Db.updateGuildBPRank(gid, function(){});
            });
            return next(null, Util.packageRes());
        }
    )
};

handler.clearJoinReq = function(msg, session, next) {
    var gid = msg.gid;
    Db.guild.update({_id:gid}, {$set:{joinReq:[]}}, function(err) {
        return next(null, Util.packageRes());
    })
};

handler.setting = function(msg, session, next) {
    var gid = msg.gid;
    var uid = session.uid;
    var icon = msg.icon;
    Db.guild.findByIdWithFields(gid, ['setting', 'president', 'icon'], function(err, guild) {
        if (err || !guild) {
            return next(null, {code:10000, msg:""})
        }
        if (guild.president != uid) {
            return next(null, {code:10000, msg:"不是会长"});
        }
        if (!icon ) {
            icon = guild.icon;
        }
        var setting = {
            needReq : msg.needReq,
            bpLimit: msg.bpLimit
        };
        Db.guild.update({_id:gid}, {$set:{setting:setting, icon:icon}}, function(){});
        next(null, Util.packageRes());
    })
};

handler.envelopeList = function(msg, session, next) {
    var gid = msg.gid;
    var date = moment().subtract(1, 'days').toDate();
    async.waterfall([
        function(cb) {
            Db.guild.update({_id:gid}, {$pull: {redEnvelope:{time:{$lt:date}}}}, function(){ cb()});
        },
        function(cb) {
            Db.guild.findByIdWithFields(gid, ['redEnvelope', '_id'], cb);
        }
    ], function(err, guild) {
        return next(null, Util.packageRes(guild.redEnvelope));
    });
};

handler.setPresident = function(msg, session, next) {
    var target = msg.pid;
    var gid = msg.gid;
    var uid = session.uid;
    var name = msg.name;
    if (!gid || !uid || !target || !name){
        next(null, Const.kErrorAssignment);
        return;
    }
    // 是否转让给自己?
    if (uid === target){
        next(null, Const.kErrorAssignment);
        return;
    }

    async.waterfall([
        function(calllback){
            // 转让的人是否是自己公会的;
            Db.Player.findByIdWithFields(target, ['id', 'guild'], calllback);
        },
        function(player, callback){
            if (!player){
                next(null, Const.kErrorAssignment);
                return;
            }
            if (!player.guild || player.guild !== gid){
                next(null, Const.kErrorNotSameGuild);
                return;
            }
            Db.guild.findOne({_id:gid}, {_id:1, president:1, presidentName:1}, callback);
        },
        function(guild, callback){
            if (!guild){
                next(null, Const.kErrorAssignment);
                return;
            }
            // 不是会长;
            if (guild.president !== uid){
                next(null, Const.kErrorNotGuildPresident);
                return;
            }
            guild.president = target;
            guild.presidentName = name;
            guild.save(callback);
        }
    ], function(err){
        if (!!err){
            next(null, Const.kErrorAssignment);
            return;
        }
        next(null, Util.packageRes());
    });
};