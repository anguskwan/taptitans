/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/4/11.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */

var winston = require("winston");
var graylog2 = require("winston-graylog2");
var path = require('path');

var myCustomLevels = {
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3,
        stats: 4
    },
    colors: {
        debug: 'white',
        info: 'yellow',
        warn: 'red',
        error: 'red',
        stats: 'red'
    }
};

var remoteLogger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    transports: [
        /*new (winston.transports.Console)({
            level: "warn",
            colorize: true,
            timestamp: global.env == "development",
            json: false
        }),*/
        new (graylog2)({
            name: 'graylog',
            silent: !Conf.get("logger:enable"),
            level: "warn",
            graylog: {
                facility: APP_NAME,
                servers: [{
                    host: Conf.get("logger:host"),
                    port: Conf.get("logger:port")
                }]
            }
        })
    ],
    exitOnError: false
});
winston.addColors(myCustomLevels.colors);

var Logger = require('pomelo-logger');
Logger.configure("./config/log4js.json", {serverId : global.app ? app.getServerId() : "test", base: appRoot});
var localLogger = Logger.getLogger('app');

localLog = function(level, args) {
    // prepend serverId info
    if (global.app && _.isString(args[0])) {
        args[0] = '[' + app.getServerId() + '] ' + args[0];
    }
    // stringfigy object arg, prevent it is serialized by logger
    var lastArg = _.last(args);
    if (global.all && _.isObject(lastArg)) {
        if (lastArg.stack) {
            args[args.length - 1] = lastArg.message + "\n" + lastArg.stack;
        } else {
            lastArg.serverId = app.getServerId();
            args[args.length - 1] = JSON.stringify(lastArg);
        }
    }
    localLogger[level].apply(localLogger, args);
};

remoteLog = function(level, args) {
    if (!Conf.get("logger:enable")) {return;}
    if (global.app) {
        var lastArg = _.last(args);
        if (_.isObject(lastArg)) {
            lastArg.serverId = app.getServerId();
        }
    }
    remoteLogger[level].apply(remoteLogger, args);
};

module.exports = {
    debug: function() {
        localLog("debug", arguments);
    },
    info: function() {
        localLog("info", arguments);
    },
    warn: function(msg, data) {
        remoteLog('warn', arguments);
        localLog("warn", arguments);
    },
    error: function(msg, data) {
        remoteLog("error", arguments);
        localLog("error", arguments);
    },
    stats: function(msg, data) {
        remoteLog("stats", arguments);
        localLog("info", arguments);
    },
    apiLogger: function(req, res, next) {
        log.info("[%s][%s] body:%s ip:%s cookie:%s user-agent:%s", req.method, req.url, JSON.stringify(req.body), req.get("X-Forwarded-For"), JSON.stringify(req.cookies), req.get("user-agent"));
        next();
    },
    errorLogger:function(req, res, route, err) {
        if (!res.headersSent) {
            res.send(new InternalError(err));
        }
        log.error(_.sprintf("[%s] error:%s, stack:%s", req.url, err.message, err.stack));
        return true;
    }
};


