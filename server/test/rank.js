var should = require("should");

describe("rank.js", function() {
    // before(resetStorage);

    describe("#/updateMissionScore", function() {
        it("提交用户1的闯关成绩", function(done){
            var params = {
                playerId: 1,
                missionId: 2,
                score: 1000,
                maxMission: 2,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户2的闯关成绩", function(done){
            var params = {
                playerId: 2,
                missionId: 2,
                score: 2000,
                maxMission: 3,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户3的闯关成绩", function(done){
            var params = {
                playerId: 3,
                missionId: 2,
                score: 3000,
                maxMission: 4,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户4的闯关成绩", function(done){
            var params = {
                playerId: 4,
                missionId: 2,
                score: 1500,
                maxMission: 5,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });

        it("查看用户4的好友列表, 好友应该按照闯关进度排序", function(done){
            apiClient.get("/friends/4", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                for (var i = 1; i < body.data.friendsInGame.length; i++) {
                    body.data.friendsInGame[i].pve.maxMission.should.be.below(body.data.friendsInGame[i-1].pve.maxMission);
                };
                done();
            });
        });
    });

    describe("#/missionRank/:playerId/:missionId", function(){
        var result;
        it("查看用户4的闯关排行", function(done){
            apiClient.get("/missionRank/4/2", function(err, req, res, body){
                // log.debug(JSON.stringify(body.data.ranks));
                body.errcode.should.be.exactly(0);
                result = body.data;
                result.ranks.length.should.be.exactly(4);
                done();
            });
        });

        it("第一名应该是用户3", function(done){
            result.ranks[0].name.should.be.exactly(FakeData.guest3_params.name);
            done();
        });
        it("用户4的名次应该是第3", function(done){
            result.myRank.should.be.exactly(3-1);
            done();
        });
    });

    describe("#/allMissionRanks/:playerId/", function(){
        it("提交用户4的闯关成绩", function(done){
            var params = {
                playerId: 4,
                missionId: 1,
                score: 1500,
                maxMission: 5,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户4的闯关成绩", function(done){
            var params = {
                playerId: 4,
                missionId: 3,
                score: 1500,
                maxMission: 5,
                totalStars: 10
            }
            apiClient.post("/updateMissionScore", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("查看用户4在所有关卡中的排行, 第1和第3关应该是第一名，第2关是第三名", function(done){
            apiClient.get("/allMissionRanks/4", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                _.size(body.data.ranks).should.be.exactly(3);
                body.data.ranks["2"].should.be.exactly(2);
                body.data.ranks["1"].should.be.exactly(0);
                body.data.ranks["3"].should.be.exactly(0);
                done();
            });
        });

    });

    describe("#/updateChallengeScore", function(){
        it("提交用户1的挑战成绩", function(done){
            var params = {
                playerId: 1,
                score: 1000
            };
            apiClient.post('/updateChallengeScore', params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户1的挑战成绩, 故意比上一次小", function(done){
            var params = {
                playerId: 1,
                score: 900
            };
            apiClient.post('/updateChallengeScore', params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户2的挑战成绩", function(done){
            var params = {
                playerId: 2,
                score: 1500
            };
            apiClient.post('/updateChallengeScore', params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("提交用户3的挑战成绩", function(done){
            var params = {
                playerId: 3,
                score: 2000
            };
            apiClient.post('/updateChallengeScore', params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("查看用户4的挑战好友榜, 排名第4", function(done){
            apiClient.get('/challenge/friendsRank/4', function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.top.length.should.be.exactly(4);
                body.data.aroundMe.length.should.be.exactly(0);
                body.data.myRank.should.be.exactly(3);
                body.data.top[2].score.should.be.exactly(1000);
                done();
            });
        });
        it("查看用户4的挑战世界榜", function(done){
            apiClient.get('/challenge/worldRank/4', function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.top.length.should.be.exactly(3);
                body.data.aroundMe.length.should.be.exactly(0);
                body.data.myRank.should.be.exactly(-1);
                body.data.top[2].score.should.be.exactly(1000);
                done();
            });
        });
        it("添加30个用户，提交挑战成绩,并把他们加为用户4的好友", function(done){
            var tasks = [];
            _.times(30, function(index){
                tasks.push(function(callback){
                    var params = {
                        loginType: 0,
                        uniqueId: "uniqueId-fake-" + index,
                        name: "name-fake-" + index,
                        avatar: "avatar-fake-" + index
                    };
                    apiClient.post("/login", params, callback);
                });
                tasks.push(function(callback){
                    var params = {
                        playerId: 5 + index,
                        score: _.random(1000, 10000)
                    };
                    apiClient.post("/updateChallengeScore", params, callback);
                });
                tasks.push(function(callback){
                    var params = {
                        from: 5 + index,
                        to: 4
                    };
                    apiClient.post("/friend/add", params, callback);
                });
            });

            async.series(tasks, done);
        });
        it("查看用户4的挑战好友榜, top榜为20， aroundMe为6个, 排名34", function(done){
            apiClient.get('/challenge/friendsRank/4', function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.top.length.should.be.exactly(20);
                body.data.aroundMe.length.should.be.exactly(6);
                body.data.aroundMe[5]._id.should.be.exactly(4);
                body.data.aroundMe[5].rank.should.be.exactly(33);
                body.data.myRank.should.be.exactly(33);
                done();
            });
        });

    });
    describe("#/pvp/weekScore/:playerId", function(){
        it("获取用户1的pvp周榜胜场数", function(done){
            apiClient.get('/pvp/weekScore/1', function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.score.should.be.exactly(0);
                done();
            });
        });
    });
});