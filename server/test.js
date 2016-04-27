/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/4/10.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */

var fs = require('fs');
var path = require('path');
global.app = {
    getServerType: function() { return "test"},
    getServerId: function() { return "test1"}
};
var Robot = require('pomelo-robot').Robot;
var config = require('./test/config.json');
global.appRoot = require('path').resolve(__dirname);

var robot = new Robot(config);

process.on('uncaughtException', function(err) {
    /* temporary code */
    console.error(' Caught exception: ' + err.stack);
    if (!!robot && !!robot.agent){
        robot.agent.socket.emit('crash', err.stack);
    }
    fs.appendFile('./log/.log', err.stack, function (err) {});
});


var mode = "master";
if (process.argv.length > 2) {
    mode = process.argv[2];
}
if (mode !== 'master' && mode !== 'client') {
    throw new Error(' mode must be master or client');
}

if (mode === 'master') {
    robot.runMaster(__filename);
} else {
    var script = path.join(process.cwd(), "test-client.js");
    robot.runAgent(script);
}
