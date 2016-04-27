var request = require("request");
var proxyquire = require("proxyquire");
var fakeRedis = require("fakeredis");
global.fs = require("fs");

global.APP_NAME = "test";
global.appRoot = require('path').resolve(__dirname);
global._ = require("underscore");

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

var scoreTable = [[1120,2028],[2020,3138],[1820,2487],[1920,3183],[1800,3124],[1680,2560],[2022,2952],[2120,3677.5],[2020,3270],[2520,4357.5],[1320,1957.5],[1820,2870],[2320,3907.5],[1920,3067.5],[2320,3907.5],[2320,3907.5],[2520,4357.5],[2520,4357.5],[2220,3690],[2220,3690],[2120,3477.5],[2420,4130],[2420,4130],[2520,4357.5],[2320,3907.5],[1820,2870],[2420,4130],[2020,3270],[2420,4130],[2020,3270],[2320,3907.5],[2220,3690],[2620,4590],[2620,4590],[2620,4590],[2720,4827.5],[2920,5317.5],[2620,4590],[2520,4357.5],[3020,5570],[2820,5070],[3020,5570],[2820,5070],[2820,5070],[2820,5070]];
var missionProbs = [];
_.times(1, function(){
    missionProbs = missionProbs.concat(_.range(1, 16));
});
_.times(1, function(){
    missionProbs = missionProbs.concat(_.range(16, 31));
});
_.times(1, function(){
    missionProbs = missionProbs.concat(_.range(31, 46));
});
// console.log(missionProbs.length);


before(function(done){
    resetStorage(done);
});

describe("添加数据", function(){
    it("添加假用户", function(done){
        log.debug(appRoot);
        var data = JSON.parse(fs.readFileSync(appRoot + "/scripts/fakeData.json"));
        log.debug("准备添加测试数据:" + data.length);
        var tasks = [];
        _.each(data, function(item, index){
            tasks.push(function(callback){
                
                async.waterfall([
                    function(callback) {
                        var params = {
                            loginType: 1,
                            uniqueId: "fake-user-" + index,
                            name: item.name,
                            avatar: item.avatar,
                            location: "北京市"
                        };
                        apiClient.post("/login", params, function(err, req, res, body){
                            log.debug("添加成功1个用户, id:" + body.data._id);
                            return callback(null, body.data._id);
                        });
                    },
                    function(playerId, callback) {
                        var maxMission = _.sample(missionProbs);
                        var subTasks = [];
                        _.each(_.range(1, maxMission), function(missionId){
                            var params = {
                                playerId: playerId,
                                missionId: missionId,
                                score: _.random(Math.round(scoreTable[missionId - 1][0]), Math.round(scoreTable[missionId - 1][1])),
                                maxMission: maxMission,
                                totalStars: _.random((maxMission - 1) * 2, (maxMission - 1) * 3)
                            };
                            subTasks.push(function(callback){
                                apiClient.post('/updateMissionScore', params, function(err, req, res, body){
                                    log.debug("提交关卡成绩成功, mission:"+ params.missionId + ", score:" + params.score);
                                    return callback(null, null);
                                });
                            });
                        });
                        if(maxMission > 18) {
                            subTasks.push(function(callback){
                                var params = {
                                    playerId: playerId,
                                    score: _.random(500, 5000)
                                };
                                apiClient.post('/updateChallengeScore', params, function(err, req, res, body){
                                    log.debug("提交挑战成绩成功, score:" + params.score);
                                    return callback(null, null);
                                });
                            });
                        }
                        if(maxMission >= 5) {
                            subTasks.push(function(callback){
                                var petId = [];
                                petId.push(_.sample([101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205]));
                                var pets = {};
                                pets[petId] = {level: _.sample(_.range(1, 4))};
                                var params = {
                                    playerId: playerId,
                                    lastTimeSync: 0,
                                    data: {
                                        petId: petId,
                                        pets: pets
                                    }
                                };
                                apiClient.post("/sync", params, function(err, req, res, body){
                                    log.debug("同步数据，添加宠物成功, petId:" + petId[0] + ", petLevel:" + pets[petId[0]]);
                                    return callback(null, null);
                                });
                            });
                        }
                        async.parallel(subTasks, callback);
                    }
                ], callback);

            });
        });
        async.series(tasks, done);
    });
    it("添加机器人", function(done){
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
            done();
        });
    });
});