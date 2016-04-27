global.APP_NAME = 'test';

global._ = require("underscore");
_.str = require("underscore.string");
_.mixin(_.str.exports());
global.async = require('async');
global.UUID = require("uuid-js");

global.Util = require('./util');
global.appRoot = require('path').resolve(__dirname);
global.Const = require('./shared.js');

global.env = "production";
global.Conf = require('./util/config.js');
global.log = require('./util/log.js');

global.Db = require('./db');
if(Db.ready) {
    fetchData();
}
else {
    Db.on("ready", function() {
        fetchData();
    });
}

var fetchData = function() {
    Db.Player._getModel(0).find({isRobot: {$exists: false}, loginType:1}, {name:1, avatar:1}).limit(100).exec(function(err, players){
        console.log(JSON.stringify(players));
    });
}

process.on('uncaughtException', function(err) {
    log.error('Caught exception: ', err.message, err.stack);
});

process.on('SIGTERM', function() {
    //app.stop(true);
});

