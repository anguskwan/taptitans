/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/5/4.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */
load("../node_modules/lodash/lodash.js");

var now = new Date();
print(now.toLocaleDateString() + ' ' + now.toLocaleTimeString());

var csv = [];

////
statsPlayers();
statsRobots();
statsGameTimes();
outputCSV();


function statsGameTimes() {
    addColumn([]);
    var gameTimes = function(times) {
        var cursor = db.players.find({isRobot: {$exists: false}, 'pvp.totalGame': times}, {pvp: 1});
        var scores = {};
        while (cursor.hasNext()) {
            var score = cursor.next().pvp.score;
            scores[score] = scores[score] ? scores[score] + 1 : 1;
        }
        scores = _.sortBy(_.pairs(scores), function(p) { return -p[1] });
        addColumn(_.pluck(scores, 0), times + ' game');
        addColumn(_.pluck(scores, 1), '');
    };
    for (var i = 1; i <= 5; ++i) {
        gameTimes(i);
    }
}

function statsRobots() {
    var cursor = db.players.find({isRobot: true}, {IQ: 1, pvp: 1});
    var robots = [];
    while (cursor.hasNext()) {
        robots.push(cursor.next());
    }
    addColumn([]);
    addColumn(_.pluck(robots, '_id'), 'Robot ID');
    addColumn(_.pluck(robots, 'IQ'), 'IQ');
    var pvp = _.pluck(robots, 'pvp');
    addColumn(_.pluck(pvp, 'score'), 'PVP Score');
    addColumn(_.pluck(pvp, 'level'), 'PVP Level');
    addColumn(_.pluck(pvp, 'totalGame'), 'Total Game');
}

function statsPlayers() {
    var cursor = db.players.find({isRobot: {$exists: false}}, {pvp: 1});
    var levels = {}, scores = {}, counts = {};
    while (cursor.hasNext()) {
        var pvp = cursor.next().pvp;
        var level = pvp.level, score = pvp.score, count = pvp.totalGame;
        levels[level] = !levels[level] ? 1 : levels[level] + 1;
        scores[score] = !scores[score] ? 1 : scores[score] + 1;
        counts[count] = !counts[count] ? 1 : counts[count] + 1;
    }
    var output = function(obj, title) {
        var stats = _.chain(obj).pairs().sortBy(function(pair) {
            return parseFloat(pair[0]);
        }).value();
        for (var i = 0; i < 2; ++i) {
            var col = _.pluck(stats, i);
            addColumn(col, i == 0 ? title : '');
        }
    };
    output(scores, 'Score');
    output(levels, 'Level');
    output(counts, 'Total Game');
}

function addColumn(col, title) {
    if (!_.isUndefined(title)) col.unshift(title);
    csv.push(col);
}

function outputCSV() {
    var finished = false, cols = csv.length;
    for (var row = 0; !finished; ++row) {
        finished = true;
        var str = '';
        for (var col = 0; col < cols; ++col) {
            if (col != 0) str += ',';
            var val = csv[col][row];
            if (!_.isUndefined(val)) {
                finished = false;
                str += val;
            }
        }
        if (!finished) print(str);
    }
}
