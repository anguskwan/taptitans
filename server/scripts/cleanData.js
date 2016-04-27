var request = require("request");
var proxyquire = require("proxyquire");
var fakeRedis = require("fakeredis");
global.fs = require("fs");

global.APP_NAME = "taptitans-web";
global.appRoot = require('path').resolve(__dirname);

global.should = require("should");

global.resetStorage = function(done) {
    async.series([
        function(callback) {
            Db.Player.remove({}, callback);
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

describe("清除所有数据", function(){
    it("清除所有数据", function(done){
        Db.rds.counter.get("taptitans-web:counter:player", function(err, id){
            done();
        });
    });
});