/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/5/5.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */

global.APP_NAME = 'lianliankan-pomelo-addrobot';
global.env = require('optimist').argv.env || "development";
global._ = require("underscore");
_.str = require("underscore.string");
_.mixin(_.str.exports());
global.async = require('async');
global.UUID = require("uuid-js");

global.Util = require('../util');
global.appRoot = require('path').resolve(__dirname);
global.Const = require('../shared.js');
global.Conf = require('../util/config.js');
//global.log = require('../util/log.js');

global.log = { info: console.log, error: console.error };

global.Db = require('../db');
Db.on("ready", function() {
    console.log("Start Processing.");
    var toAdd = [
        {iq: 4.3, num: 5, score: -40},
        {iq: 4.6, num: 5, score: -20},
        {iq: 5.5, num: 5, score: 2},
        {iq: 6.5, num: 5, score: 26},
        {iq: 7.5, num: 5, score: 63},
        {iq: 11, num: 2, score: 110},
        {iq: 12, num: 2, score: 120},
        {iq: 13, num: 2, score: 130},
        {iq: 14, num: 1, score: 140},
        {iq: 15, num: 1, score: 150}
    ];

    var tasks = [];
    toAdd.forEach(function(info) {
        for (var i = 0; i < info.num; ++i) {
            tasks.push(function(cb) {
                var robot = Db.Robot.create();
                _.extend(robot, {
                    IQ: info.iq,
                    pvp: {
                        score: info.score
                    }
                });
                robot.markModified('pvp');
                robot.save(cb);
            });
        }
    });
    async.parallelLimit(tasks, 5, function(err) {
        if (err) console.log(err);
        else console.log("DONE");
        process.exit(0);
    });
});


