
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
global.mysql = require("mysql");

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

var mysql_connection;
if(env == "production") {
	mysql_connection = mysql.createConnection("mysql://secret:Hortor_82345168@121.42.45.224:13306/order_db?charset=utf8");
}
else {
	mysql_connection = mysql.createConnection("root://root:Hortor_82345168@42.96.188.48:3308/order_db?charset=utf8");
}


function startServer() {
	var vipOpenIds = [];
	var totalCount = 0;
	var failedCount = 0;
	async.waterfall([
		function(cb) {
			api.getGroups(cb);
		},
		function(result, response, cb) {
			log.info(JSON.stringify(result.groups));
			mysql_connection.connect(cb);
		},
		function(results, cb) {
			mysql_connection.query({
				sql: "select `open_id`, IFNULL(SUM(`total_fee`), 0) as `sum` from `order_db`.`order` where `trade_state` = 'SUCCESS' group by `open_id` having sum(`total_fee`) >= ?"
			},
			[100000],
			cb
			);
		},
		function(results, response, cb) {
			vipOpenIds = _.pluck(results, "open_id")
			var tasks = [];
			totalCount = vipOpenIds.length;
			_.each(vipOpenIds, function(openId){
				tasks.push(function(callback){
					api.getUser(openId, function(err, result){
						if(err) {
							failedCount ++;
							return callback();
						}
						log.info(result.nickname);
						return callback();
					});
				});
			});
			async.series(tasks, cb);
		}
	], function(err){
		if(err) {
			console.log(err);
		}
		log.info("total count:" + totalCount);
		log.info("failed count:" + failedCount);
		process.exit(0);
	});
}

Db.on("ready", function() {
    startServer();
});




