var dispatcher = require('./dispatcher');

module.exports.player = function(session, msg, app, cb) {
    var playerServers = app.getServersByType('player');
    if (!playerServers || playerServers.length === 0) {
        log.error("no table server available", uid, msg);
        cb(new Error('can not find table servers.'));
        return;
    }
    var uid = _.isObject(session) ? session.uid : session;

    var serverId = dispatcher.dispatch(uid, playerServers).id;

    cb(null, serverId);
};

module.exports.pk = function(session, msg, app, cb) {
    var servers = app.getServersByType('pk');
    if (!servers || servers.length === 0) {
        log.error("no table server available", uid, msg);
        cb(new Error('can not find table servers.'));
        return;
    }
    var uid = _.isObject(session) ? session.uid : session;

    var serverId = dispatcher.dispatch(uid, servers).id;

    cb(null, serverId);
};

module.exports.guild = function(session, msg, app, cb) {
    var servers = app.getServersByType('guild');
    if (!servers || servers.length === 0) {
        log.error("no table server available", uid, msg);
        cb(new Error('can not find table servers.'));
        return;
    }
    var uid = _.isObject(session) ? session.uid : session;

    var serverId = dispatcher.dispatch(uid, servers).id;

    cb(null, serverId);
};

module.exports.connector = function(session, msg, app, cb) {
    if(!session) {
        cb(new Error('fail to route to connector server for session is empty'));
        return;
    }

    if(!session.frontendId) {
        cb(new Error('fail to find frontend id in session'));
        return;
    }

    cb(null, session.frontendId);
};