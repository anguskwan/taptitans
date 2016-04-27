var heapdump = require('heapdump');
global.APP_NAME = 'taptitans-pomelo';

global._ = require("underscore");
_.str = require("underscore.string");
_.mixin(_.str.exports());
global.async = require('async');
global.UUID = require("uuid-js");

global.Util = require('./util');
global.appRoot = require('path').resolve(__dirname);
global.Const = require('./shared.js');
global.helper = require("./util/helper.js");
global.moment = require('moment');

var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
var app = global.app = pomelo.createApp();
var guildService = require('./app/services/guildService');
global.env = app.get('env');
global.Conf = require('./util/config.js');
global.log = require('./util/log.js');

if(env == "qq") {
    APP_NAME = 'taptitans-pomelo-qq'
}

app.set('name', 'taptitans-server');
app.set('errorHandler', function(err, msg, resp, session, next) {
    log.error(msg, {uid: session.uid, err: err, stack: err.stack});
    next({code: 500, error: true, msg: msg});
});

app.set('globalErrorHandler', function(err, msg, resp, session, next) {
    log.error(msg, {uid: session.uid, err: err, stack: err.stack});
    next({code: 500, error: true, msg: msg});
});


app.set('rpcErrorHandler', function(err, serverId, msg, opt) {
    log.error("[rpcErrorHandler] " + msg, {serverId: serverId, err: err, stack: err.stack, opt: opt});
    next({code: 500, error: true, msg: msg});
});


// app configuration
app.configure('all', 'connector', function() {
    app.set('connectorConfig', {
        connector: pomelo.connectors.hybridconnector,
        heartbeat: 3,
        timeout: 60,
        disconnectOnTimeout: true,
        useDict: true,
        useProtobuf: true
    });
});

app.configure('all', 'gate', function() {
    app.set('connectorConfig', {
        connector: pomelo.connectors.hybridconnector,
        useProtobuf: true
    });

});

app.configure('all', 'manage', function() {

    guildService.init();
});


var filter = require("./util/filter");
// app configure
app.configure('all', function() {
    // route configures
    app.route('player', routeUtil.player);
    app.route('pk', routeUtil.pk);
    app.route('connector', routeUtil.connector);
    app.route('guild', routeUtil.guild);
    // filter configures
    app.filter(filter.timeout());
    app.rpcFilter(filter.rpcTimeout());
    //app.rpcFilter(pomelo.rpcFilters.rpcLog());
    app.enable('systemMonitor');
    var onlineUser = require("./app/monitor/onlineUser");
    app.registerAdmin(onlineUser, {app: app});
});

// start app

var serverType = app.get("serverType");
if (serverType == 'connector' || serverType == 'rank' || serverType == "player" || serverType == "pk" || serverType == "guild" || serverType == "manage"
    || serverType == "activity") {
    global.Db = require('./db');
    app.dbModule = Db;
    Db.on("ready", function() {
        app.start();
        log.info("server started.");
    });
} else {
    app.start();
    log.info("server started.");
}

process.on('uncaughtException', function(err) {
    log.error('Caught exception: ', err.message, err.stack);
});

process.on('SIGTERM', function() {
    //app.stop(true);
});

