var should = require("should");

describe("player.js", function() {
    var guest1;
    var guest2;
    var guest3;
    var newGuest;
    describe("#/login", function() {
        before(function(done) {
            Db.createPlayer(FakeData.guest1_params, false, function(err, player) {
                if(err) log.debug(err);
                guest1 = player; 
                done();
            });
        });
        before(function(done) {
            Db.createPlayer(FakeData.guest2_params, false, function(err, player) {
                if(err) log.debug(err);
                guest2 = player; 
                done();
            });
        });
        before(function(done) {
            Db.createPlayer(FakeData.guest3_params, false, function(err, player) {
                if(err) log.debug(err);
                guest3 = player; 
                done();
            });
        });
        it("已存在的玩家", function(done) {
            apiClient.post("/login", FakeData.guest1_params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                var player = body.data;
                player.should.have.properties({
                    _id: guest1._id,
                });
                done();
            });
        });
        it("新建玩家", function(done) {
            apiClient.post("/login", FakeData.newGuest_params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                var player = body.data;
                newGuest = player;
                player.friendsInGame.length.should.be.exactly(3);
                done();
            });
        });
    });
    describe("#/bind", function() {
        it("绑定", function(done){
            apiClient.post("/bind", FakeData.bindParams, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.isBind.should.be.exactly(true);
                done();
            });
        });
        it("用新账号登陆", function(done){
            var newParams = {
                loginType: 1,
                uniqueId: FakeData.bindParams.to,
                name: FakeData.bindParams.name,
                avatar: FakeData.bindParams.avatar
            };
            apiClient.post("/login", newParams, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data._id.should.be.exactly(newGuest._id);
                done();
            });
        });
        // it("试图绑定到另一个账号上", function(done){
        //     var params = {
        //         fromLoginType: 0,
        //         toLoginType: 1,
        //         from: FakeData.guest1_params.uniqueId,
        //         to: FakeData.bindParams.to,
        //         name: "QQ-USER",
        //         avatar: "xxxx"
        //     };
        //     apiClient.post("/bind", params, function(err, req, res, body) {
        //         body.errcode.should.be.exactly(0);
        //         body.data.isBind.should.be.exactly(false);
        //         body.data.player._id.should.be.exactly(newGuest._id);
        //         done();
        //     });
        // });

        it("选档", function(done){
            var params = {
                playerId: 1,
                loginType: 1,
                uniqueId: FakeData.bindParams.to,
                name: "QQ-USER",
                avatar: "xxxx"
            };
            apiClient.post("/bind/select", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });

        it("用账号登陆，应该是用户1", function(done){
            var newParams = {
                loginType: 1,
                uniqueId: FakeData.bindParams.to,
                name: FakeData.bindParams.name,
                avatar: FakeData.bindParams.avatar
            };
            apiClient.post("/login", newParams, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data._id.should.be.exactly(1);
                done();
            });
        });

    });

    describe("#/sync", function() {
        var lastTimeSync;

        it("用户1首次同步存档", function(done){
            var params = {
                playerId: 1,
                lastTimeSync: null,
                data: {
                    val: 1001
                }
            };
            apiClient.post("/sync", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.isSync.should.be.exactly(true);
                lastTimeSync = body.data.lastTimeSync;
                Db.Player.findById(1, function(err, p){
                    p.data.val.should.be.exactly(params.data.val);
                    done();
                });
            });
        });

        it("用户1第二次同步存档", function(done){
            var params = {
                playerId: 1,
                lastTimeSync: lastTimeSync,
                data: {
                    val: 1002
                }
            };
            apiClient.post("/sync", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.isSync.should.be.exactly(true);
                lastTimeSync = body.data.lastTimeSync;
                Db.Player.findById(1, function(err, p){
                    p.data.val.should.be.exactly(params.data.val);
                    done();
                });
            });
        });

        it("用户1同步一个落后的存档", function(done){
            var params = {
                playerId: 1,
                lastTimeSync: lastTimeSync - 100,
                data: {
                    val: 1000
                }
            };
            apiClient.post("/sync", params, function(err, req, res, body){
                log.debug(body.data.player);
                body.errcode.should.be.exactly(0);
                body.data.isSync.should.be.exactly(false);
                body.data.player.val.should.be.exactly(1002);
                done();
            });
        });
    });
});