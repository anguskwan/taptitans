/**
 * Created by joker on 15/7/22.
 */
if(!global.APP_NAME){
    global.APP_NAME = "taptitans-admin";
}
global.appRoot = require('path').resolve(__dirname);
console.log(appRoot)

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

_.extend(global, require("./app_web/error.js"));
global.validate = require("./app_web/validator.js");

var restify = require('restify');
var wrapper = require("./app_web/wrapper.js");
var server = restify.createServer({
    name: "taptitans-admin",
    formatters: {
        'application/json;': wrapper.formatter
    }
});

server.use(restify.queryParser({ mapParams: true }));
server.use(restify.bodyParser({ mapParams: true }));
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS({
    credentials: true,
    origins: [
        "localhost:8080"
    ]
}));
server.use(restify.fullResponse());
server.use(function(req, res, next) {
    res.charSet("utf-8");
    next();
});
// server.use(log.apiLogger);
// server.use(wrapper.signChecker);
server.on("uncaughtException", log.errorLogger);

process.on("uncaughtException", function(err) {
    log.error("[global uncaughtException] stack:" + err.stack, {err:err.msg});
});

var wrappedServer = {
    get: function(url, handler) {
        server.get(url, wrapper.wrapper(handler));
    },
    post: function(url, handler) {
        server.post(url, wrapper.wrapper(handler));
    }
};

process.on("uncaughtException", function(err) {
    log.error("[global uncaughtException] stack:" + err.stack, {err:err.msg});
});

require("./app_web/admin.js")(wrappedServer);
wrappedServer.get(/\/static\/?.*/, restify.serveStatic({
  directory: appRoot,
  default: 'index.html'
}));
function startServer() {
    server.listen(Conf.get("web:admin_port"), function() {
        log.info('[express] server listening at %s:%s', server.address().address, server.address().port);
    });
}

Db.on("ready", function() {
    startServer();
});