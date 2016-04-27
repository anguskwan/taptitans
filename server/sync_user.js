/**
 * Created by joker on 15/7/22.
 */
if(!global.APP_NAME){
    global.APP_NAME = "taptitans-sync-user";
}
global.appRoot = require('path').resolve(__dirname);

global._ = require("underscore");
_.str = require("underscore.string");
_.mixin(_.str.exports());
global.async = require('async');
global.UUID = require("uuid-js");
global.moment = require('moment');
var IPIP = require('ipip').IPIP;
global.ipip = new IPIP();
global.Util = require('./util');
global.env = require('optimist').argv.env || process.env.NODE_ENV || "development";
global.Const = require('./shared.js');
global.helper = require("./util/helper.js");
global.Conf = require('./util/config.js');
global.log = require('./util/log.js');
global.Db = require('./db');
global.request = require("request");

process.on("uncaughtException", function(err) {
    log.error("[global uncaughtException] stack:" + err.stack, {err:err.msg});
    process.exit(-1);
});

var fields = ["uniqueId", "isSubscribed", "name", "avatar", "friends"];

var totalInsertUserCount = 0;
var realInsertUserCount = 0;
var insertUserIndex = 0;

var authHost = env == "testing" ? "http://h5-api-test.secret-cn.com" : "http://wx.hortor.net";

log.info("auth host:" + authHost);

function syncUser(player, callback) {
    totalInsertUserCount++;
    var postData = {
        openId: player.uniqueId,
        sex: 0,
        HeadImgUrl: player.avatar,
        Province: "",
        City: "",
        Nickname: player.name,
        is_subscribe: player.isSubscribed ? "1" : "0",
        gameId: "taptitans"
    };
    request.post(authHost + "/gc/admin/creat-user", {form: postData}, function(err, response, body){
        if(err) {
            return callback(err);
        }
        var obj = Util.parseJSON(body);
        if(obj && obj.isCreated) realInsertUserCount++;
        return callback(null, obj.isCreated || false);
    });
}

function syncFriendship(player, friends, callback) {
    var postData = {
        openId: player.uniqueId,
        friendOpenIds: _.pluck(friends, "uniqueId").join(",")
    };
    request.post(authHost + "/gc/admin/make-friends", {form: postData}, function(err, response, body){
        if(err) {
            return callback(err);
        }
        var obj = Util.parseJSON(body);
        return callback();
    });
}

function startServer() {
    var days = [];
    for (var i = 0; i < 30; i++) {
        days.push("daily-active-"+moment().subtract(i, 'days').format('YYYY-MM-DD'));
    }
    
    Db.rds.dailyActive.sunion(days, function(err, openIds){
        var isInserted = false;
        var tasks = [];
        log.info("start sync! total count:" + openIds.length);
        _.each(openIds, function(openId){
            tasks.push(function(callback){
                var player;
                var friends;
                async.waterfall([
                    //取出来用户
                    function(callback) {
                        Db.Player._getModel("").find({uniqueId: openId}, fields.join(" "), callback);
                    },
                    //同步主用户
                    function(p, callback) {
                        player = p[0];
                        if(player == null) {
                            return callback("user not found");
                        }
                        syncUser(player, function(err, isInsert){
                            if(err) {
                                log.error(_.sprintf("sync user failed, openId:%s, err:%s", player.uniqueId, err));
                            }
                            isInserted = isInsert;
                            return callback(null, player);
                        });
                    },
                    //取出所有好友
                    function(player, callback) {
                        Db.Player.findByIdsWithFields(player.friends, fields.join(" "), callback);
                    },
                    //为所有好友创建用户
                    function(f, callback) {
                        friends = f;
                        var tasks = [];
                        _.each(friends, function(friend){
                            if(friend == null) {
                                return;
                            }
                            tasks.push(function(callback){
                                syncUser(friend, function(err, isInsert){
                                    if(err) {
                                        log.error("sync user friend failed, openId:%s, err:%s", friend.uniqueId, err);
                                    }
                                    isInserted = isInsert;
                                    return callback();
                                })
                            });
                        });
                        async.series(tasks, function(err){
                            return callback();
                        });
                    },
                    //同步好友关系
                    function(callback){
                        syncFriendship(player, friends, function(err){
                            if(err) {
                                log.error(_.sprintf("sync friendship failed, openId:%s, err:%s", player.uniqueId, err));
                            }
                            return callback();
                        });
                    }
                ], function(err){
                    insertUserIndex++;
                    if(err) {
                        log.error("sync user failed, err:" + err);
                    }
                    else {
                        log.info(_.sprintf("sync user progress:%d, openId:%s, friendsCount:%d", insertUserIndex, player.uniqueId, player.friends.length))
                    }
                    return callback();
                });
            });
        });
        async.series(tasks, function(err){
            if(err) log.error(err);
            log.info(_.sprintf("total insert count:%d, real insert count: %d", totalInsertUserCount, realInsertUserCount));
            process.exit(0);
        });
    });
}

Db.on("ready", function() {
    startServer();
});


