/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/4/10.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */
var path = require("path");
global.APP_NAME = "pomelo-performance-test";
global.appRoot = path.join(__dirname, "..");
var _ = global._ = require('lodash');
_.str = require("underscore.string");
_.mixin(_.str.exports());
global.async = require('async');
global.UUID = require("uuid-js");

global.env = "test";
global.Const = require(global.appRoot + '/shared.js');
global.Util = require(global.appRoot + '/util');
global.Conf = require(global.appRoot + '/util/config.js');
global.log = require(global.appRoot + '/util/log.js');
global.app = {getServerId: function() { return "test"; }};

var Pomelo = require(global.appRoot + "/test/pomelo-client.js");
var GameRobot = require(global.appRoot + "/app/servers/robot/Robot.js");

var connected = false;

var player = {
    id: "test-robot-" + Date.now() + _.random(0, 10000),
    name: "test-robot-" + Date.now(),
    IQ: _.random(1, 10),
    pvp: {
        stars: 0,
        level: _.random(1, 50),
        maxLevel: 1,
        score: 0, //_.random(-50, 50),
        winStreak: 0,
        loseStreak: 0,
        totalGame: 0,
        winGame: 0,
        loc: {city: 'matrix'}
    },
    temp: true
};

console.error("started");

var monitor = function(type, name, reqId) {
    actor.emit(type, name, reqId);
};

var param = {
    clientVersion: 2.0,
    platform: "iOS",
    uniqueId: player.id,
    loginType: 1
};

var pomelo = Pomelo.create();
queryEntry(function(host, port) {
    entry(host, port, function() {
        connected = true;
    });
});

function queryEntry(callback) {
    monitor('start', 'gate');
    pomelo.init({host: '127.0.0.1', port: 13014, log: true}, function() {
        pomelo.request('gate.gateHandler.queryEntry', param, function(data) {
            monitor('end', 'gate');
            pomelo.disconnect();
            if (data.code !== 200) {
                console.log('Servers error!');
                return;
            }
            callback(data.host, data.port);
        });
    });
}

function entry(host, port, callback) {
    param.name = player.name;
    param.pvp = player.pvp;
    monitor('start', 'enter');
    pomelo.init({host: host, port: port, log: true}, function() {
        pomelo.request('connector.entryHandler.enter', param, function(data) {
            monitor('end', 'enter');
            if (data.error) {
                console.log('Login Fail!');
                return;
            }
            if (callback) {
                callback(data.code);
            }
            afterLogin(data);
        });
    });
}

var afterLogin = function(data) {
    player.uid = data.uid;

    var initRobot = function(robot) {
        robot.sendEmotion = function(id, scale) {
            var msg = {id: id, emoScale: scale};
            pomelo.notify('table.tableHandler.sendEmotion', msg);
        };

        robot.nextSection = function() {
            //this.ai.stop();
            pomelo.notify('table.tableHandler.finishSection', {round: this._round});
        };

        robot.sendAction = function(name, data) {
            data = data || {};
            pomelo.notify('table.tableHandler.gameAction', { action: name, data: data });
        };

        robot.onNextSection = function(res) {
            GameRobot.prototype.onNextSection.call(this, res);
            this.ai.start();
        };

        robot.start = function() {
            GameRobot.prototype.start.call(this);
            this.ai.start();
        };

        robot.destroy = function() {
            this.ai.stop();
            this.timers.stop();
            pomelo.notify("table.tableHandler.leave", {});
        };
    };

    pomelo.request("match.matchHandler.match", { player: player, mode: 1 }, function() {
    });

    var ctx = {};
    ctx.robot = new GameRobot(player, null, null, function() {});
    initRobot(ctx.robot);

    var messages = [
        "PlayerEmotion", "PlayerAction",
        "GameStart", "NextSection", "RematchRequest"
    ];
    _.each(messages, function(msg) {
        pomelo.on(msg, function(data) {
            try {
                ctx.robot.onServerMessage(msg, data);
            } catch (e) {
                ctx.robot.destroy();
            }
        });
    });

    pomelo.on("GameEnd", function() {
        ctx.robot.destroy();
        ctx.robot = new GameRobot(player, null, null, function() {});
        initRobot(ctx.robot);
        pomelo.request("match.matchHandler.match", { player: player, mode: 1 }, function() {});
    });

    pomelo.on("GamePrepare", function(res) {
        var robot = ctx.robot;
        robot.onServerMessage("GamePrepare", res);
    });


};
