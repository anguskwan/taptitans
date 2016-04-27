var request = require("request");
var proxyquire = require("proxyquire");
var fakeRedis = require("fakeredis");

global.APP_NAME = "test";

global.baseurl = "http://127.0.0.1:55555";
global.apiClient = require("restify").createJsonClient({ url: baseurl, version: '*' });

global.resetStorage = function(done) {
    async.series([
        function(callback) {
            Db.Player.remove({}, callback);
        },
        function(callback) {
            Db.Message.remove({}, callback);
        },
        function(callback) {
            Db.Robot.remove({}, callback);
        },
        function(callback) {
            Db.Unlock.remove({}, callback);
        },
        function(callback) {
            Db.rds.counter.flushall(callback);
        },
        function(callback) {
            Db.rds.login.flushall(callback);
        },
        function(callback) {
            Db.rds.rank.flushall(callback);
        }
    ], done);
};

// setup test environment
before(function(done) {
    // start api server
    var pqConf = { "newrelic": {} };
    proxyquire("../app_web.js", pqConf);
    Conf.set("web:api_port", 55555);
    // wait db to ready
    if (Db.ready) {
        done();
    } else {
        Db.on("ready", function() { 
            done(); 
        });
    }
});

before(function(done){
    resetStorage(done);
});

global.FakeData = require("./data.js");
require("./player.js");
require("./rank.js");
require("./social.js");