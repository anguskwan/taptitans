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
    Db.Player._getModel("").find({highestStage: {$gte: 5}}, "id uniqueId", function(err, players){
        var tasks = [];
        _.each(players, function(p){
            tasks.push(function(callback){
                log.info("send push to:" + p.uniqueId);
                api.sendImage(p.uniqueId, "Xz3LUkzSMU3MTPaScGuhoQXcdVMV56LWmOSWpZ8bZIc", function(err){
                    if(err) log.info("send push failed, err:" + err);
                    return callback();
                });
            });
        });
        async.series(tasks, function(){});
    });
}

Db.on("ready", function() {
    startServer();
});


