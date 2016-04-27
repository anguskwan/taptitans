/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/4/9.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(opts) {
    return new OnlineUser(opts);
};

var moduleId = "OnlineUser";

module.exports.moduleId = moduleId;

var OnlineUser = function(opts) {
    this.app = opts.app;
    this.type = 'pull';
    this.interval = 10;
};

OnlineUser.prototype.monitorHandler = function(agent, msg) {
    var app = this.app, sessionService = app.get('sessionService');
    var data = _.map(sessionService.service.sessions, function(session) {
        return app.userInfo[session.uid];
    });
    agent.notify(moduleId, {serverId: agent.id, data: data});
};

var updateOnlineUser;
OnlineUser.prototype.masterHandler = function(agent, msg) {
    var connectors = agent.typeMap["connector"];
    if (!msg) {
        if (connectors && connectors.length > 0)
            agent.notifyByType("connector", moduleId);
    }
    else {
        agent.set(msg.serverId + moduleId, msg.data);
        updateOnlineUser = updateOnlineUser || _.debounce(function() {
            var userCount = 0;
            _.each(connectors, function(conn) {
                var data = agent.get(conn.id + moduleId);
                if (data && !isNaN(parseInt(data.length)))
                    userCount += data.length;
            });
            var multiplier = Conf.onlineUserMultiplier;
            var calc = Math.ceil(userCount * multiplier) + Conf.onlineUserBase + _.random(0, Math.ceil(multiplier));
            log.info("[OnlineUser] total: " + userCount + " calc: " + calc);
            fs.writeFile(path.join(appRoot, "online_users"), calc);
            updateOnlineUser = null;
        }, 1000);
        updateOnlineUser();
    }
};

OnlineUser.prototype.clientHandler = function(agent, msg, cb) {
    var connectors = this.app.getServersByType('connector');
    var allUsers = {};
    _.each(connectors, function(conn) {
        allUsers[conn.id] = agent.get(conn.id + moduleId);
    });
    cb(null, allUsers);
};
