/**
 * Created by joker on 15/7/22.
 */
if(!global.APP_NAME){
    global.APP_NAME = "taptitans-push";
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

process.on("uncaughtException", function(err) {
    log.error("[global uncaughtException] stack:" + err.stack, {err:err.msg});
});

var OAuth = require("wechat-oauth");
var API = require("wechat-api");

var getAccessToken = function(callback) {
    Db.rds.wechat.get("accessToken", function(err, accessToken){
        if(accessToken) {
            return callback(null, {
                accessToken: accessToken,
                expireTime: new Date().getTime() + 600
            })
        }
        else {
            return callback(null, null);
        }
    });
}

var saveAccessToken = function(token, callback) {
    //不存储，wxauth服务已经负责刷新和管理了
    return callback();
}

var getTicketToken = function(type, callback) {
    var ticketToken;
    var expireTime;
    async.waterfall([
        function(callback) {
            Db.rds.wechat.get("ticketToken", callback);
        },
        function(token, callback) {
            ticketToken = token;
            Db.rds.wechat.get("ticketToken:expireTime", callback);
        }
    ], function(err, result){
        expireTime = parseInt(result);
        if(err || !ticketToken) return callback(null, null); 
        return callback(null, {
            ticket: ticketToken,
            expireTime: expireTime
        })
    });
}

var saveTicketToken = function(type, ticket, callback) {
    async.series([
        function(callback) {
            Db.rds.wechat.set("ticketToken", ticket.ticket, callback);
        },
        function(callback) {
            Db.rds.wechat.set("ticketToken:expireTime", ticket.expireTime, callback);
        }
    ], callback);
}

var client = new OAuth(Conf.get("auth:wechat_app_id"), Conf.get("auth:wechat_app_secret"));
var api = new API(Conf.get("auth:wechat_app_id"), Conf.get("auth:wechat_app_secret"), getAccessToken, saveAccessToken);

api.registerTicketHandle(getTicketToken, saveTicketToken);

function startServer() {
    var day1 = "daily-active-"+moment().subtract(2, 'days').format('YYYY-MM-DD');
    var day2 = "daily-active-"+moment().subtract(1, 'days').format('YYYY-MM-DD');
    var day3 = "daily-active-"+moment().subtract(0, 'days').format('YYYY-MM-DD');
    var totalCount = 0;
    var failedCount = 0;
    Db.rds.dailyActive.sunion([day1, day2, day3], function(err, openIds){
        totalCount = openIds.length;
        openIds = [""];
        var tasks = [];
        _.each(openIds, function(openId){
            tasks.push(function(callback){
                log.info("send push to:" + openId);
                api.sendText(openId, "【疯狂打怪兽】\n刚刚更新一波内容，修复了一些bug，优化了游戏流畅性。还增加了一个\n至尊月卡\n至尊月卡\n至尊月卡\n送大家妥妥的100钻。\n↓↓↓", function(err){
                    if(err) {
                        log.info("send push failed, err:" + err);
                        failedCount++;
                    }
                    return callback();
                });
            });
        });
        async.series(tasks, function(){
            log.info("total count:" + totalCount + ", failed:" + failedCount);
            process.exit(0);
        });
    });
}

Db.on("ready", function() {
    startServer();
});


