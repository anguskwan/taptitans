/**
 * Created by hortor on 16/3/23.
 */
if(!global.APP_NAME){
    global.APP_NAME = "taptitans-route";
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

_.extend(global, require("./app_web/error.js"));
global.validate = require("./app_web/validator.js");

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(log.apiLogger);
app.on("uncaughtException", log.errorLogger);

process.on("uncaughtException", function(err) {
    log.error("[global uncaughtException] stack:" + err.stack, {err:err.msg});
});

require("./app_web/route.js")(app);

function startServer() {
    var server = app.listen(Conf.get("web:route_port"), function() {
        log.info('[express] server listening at %s:%s', server.address().address, server.address().port);
    });
}

Db.on("ready", function() {
    startServer();
});