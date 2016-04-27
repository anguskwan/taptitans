var should = require("should");

/*
{ "_id" : 1, "friendsInSocial" : [ ], "friendsInGame" : [ 2 ] }
{ "_id" : 2, "friendsInSocial" : [ 3 ], "friendsInGame" : [ 1 ] }
{ "_id" : 3, "friendsInSocial" : [ 2 ], "friendsInGame" : [ ] }
{ "_id" : 4, "friendsInSocial" : [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34 ], "friendsInGame" : [ 3, 2 ] }
 */

describe("social.js", function() {
    var message;
    describe("#/friend/request", function() {
        it("用户1好友列表为空", function(done){
            apiClient.get("/friends/1", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(0);
                done();
            });
        });
        it("用户2好友列表为空", function(done){
            apiClient.get("/friends/2", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(0);
                done();
            });
        });
        it("用户3好友列表为空", function(done){
            apiClient.get("/friends/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(0);
                done();
            });
        });
        it("用户2请求加用户1为好友", function(done) {
            var params = {
                from: 2,
                to: 1,
                name: FakeData.guest2_params.name,
                avatar: FakeData.guest2_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
    });
    describe("#/messages/:playerId", function() {
        it("用户1的消息列表里出现用户2的好友请求", function(done) {
            apiClient.get("/messages/1", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                message = body.data.messages[0];
                message.from.should.be.exactly(2);
                message.type.should.be.exactly(Const.kMessageTypeFriendRequest);
                done();
            });
        });
    });
    describe("#/friend/accept", function() {
        it("用户1同意用户2的好友请求", function(done){
            var params = {
                messageId: message._id,
                playerId: 1
            };
            apiClient.post("/friend/accept", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.newFriend._id.should.be.exactly(2);
                done();
            });
        });
        it("用户1查看自己的消息列表，此条好友请求消失", function(done){
            apiClient.get("/messages/1", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(0);
                done();
            });
        });
        it("用户1查看好友列表，游戏内好友出现用户2", function(done){
            apiClient.get("/friends/1", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(1);
                body.data.friendsInGame[0]._id.should.be.exactly(2);
                done();
            });
        });
        it("用户2查看好友列表，游戏内好友出现用户1", function(done){
            apiClient.get("/friends/2", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(1);
                body.data.friendsInGame[0]._id.should.be.exactly(1);
                done();
            });
        });
        it("用户3查看好友列表，游戏内好友应该还是0", function(done){
            apiClient.get("/friends/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInGame.length.should.be.exactly(0);
                done();
            });
        });
        it("用户2请求加用户1为好友, 这时提示已经是好友", function(done) {
            var params = {
                from: 2,
                to: 1,
                name: FakeData.guest2_params.name,
                avatar: FakeData.guest2_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorAlreadyFriend.code);
                done();
            });
        });
        it("用户1请求加用户4为好友, 这时提示自己好友数量已满", function(done) {
            var oldVal = Const.kFriendsInGameMaxLimit;
            Const.kFriendsInGameMaxLimit = 1;
            var params = {
                from: 1,
                to: 4,
                name: FakeData.guest1_params.name,
                avatar: FakeData.guest1_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorReachFriendsMaxLimitA.code);
                Const.kFriendsInGameMaxLimit = oldVal;
                done();
            });
        });
        it("用户3请求加用户1为好友, 这时提示对方好友数量已满", function(done) {
            var oldVal = Const.kFriendsInGameMaxLimit;
            Const.kFriendsInGameMaxLimit = 1;
            var params = {
                from: 3,
                to: 1,
                name: FakeData.guest3_params.name,
                avatar: FakeData.guest3_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorReachFriendsMaxLimitB.code);
                Const.kFriendsInGameMaxLimit = oldVal;
                done();
            });
        });
        it("用户2请求加用户3为好友", function(done) {
            var params = {
                from: 2,
                to: 3,
                name: FakeData.guest2_params.name,
                avatar: FakeData.guest2_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户3的消息列表里出现用户2的好友请求", function(done) {
            apiClient.get("/messages/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                message = body.data.messages[0];
                message.from.should.be.exactly(2);
                message.type.should.be.exactly(Const.kMessageTypeFriendRequest);
                done();
            });
        });
        it("用户2重复请求加用户3为好友，失败", function(done) {
            var params = {
                from: 2,
                to: 3,
                name: FakeData.guest2_params.name,
                avatar: FakeData.guest2_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorAlreadySentFriendRequest.code);
                done();
            });
        });
    });
    describe("#/friend/add", function() {
        it("用户2直接通过应用消息加用户3为好友", function(done){
            var params = {
                from: 2,
                to: 3
            };
            apiClient.post("/friend/add", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户2再次通过应用消息加用户3为好友，失败", function(done){
            var params = {
                from: 2,
                to: 3
            };
            apiClient.post("/friend/add", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorAlreadyFriend.code);
                done();
            });
        });
        it("用户2查看好友列表，微信好友出现用户3, 但是游戏好友里不再出现2", function(done){
            apiClient.get("/friends/2", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInSocial[0]._id.should.be.exactly(3);
                _.findIndex(body.data.friendsInGame, function(p){return p._id === 3;}).should.be.exactly(-1);
                done();
            });
        });
        it("用户3查看好友列表，微信好友出现用户2，并且用户2的邀请者是用户3", function(done){
            apiClient.get("/friends/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInSocial[0]._id.should.be.exactly(2);
                body.data.friendsInSocial[0].inviter.should.be.exactly(3);
                done();
            });
        });
        it("用户3同意用户2的好友请求", function(done){
            var params = {
                messageId: message._id,
                playerId: 3
            };
            apiClient.post("/friend/accept", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(Const.kErrorAlreadyFriend.code);
                done();
            });
        });
    });
    describe("#/milestone/add", function() {
        it("用户3提交邀请有礼的阶段性任务", function(done){
            var params = {
                playerId: 2,
                milestone: "test"
            };
            apiClient.post("/milestone/add", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户3查看好友列表，用户2的进度已更新", function(done){
            apiClient.get("/friends/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.friendsInSocial[0]._id.should.be.exactly(2);
                body.data.friendsInSocial[0].inviter.should.be.exactly(3);
                body.data.friendsInSocial[0].milestone[0].should.be.exactly("test");
                done();
            });
        });
    });
    describe("#/message/ignore", function() {
        it("用户1请求加用户3为好友", function(done) {
            var params = {
                from: 1,
                to: 3,
                name: FakeData.guest1_params.name,
                avatar: FakeData.guest1_params.avatar
            };
            apiClient.post("/friend/request", params, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户3查看消息中心，出现用户1的好友请求", function(done){
            apiClient.get("/messages/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                message = _.last(body.data.messages);
                message.from.should.be.exactly(1);
                message.type.should.be.exactly(Const.kMessageTypeFriendRequest);
                done();
            });
        });
        it("用户3忽略此条好友请求", function(done){
            apiClient.post("/message/ignore", {messageId: message._id}, function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户3查看消息中心，好友请求是空", function(done){
            apiClient.get("/messages/3", function(err, req, res, body) {
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                done();
            });
        });
    });

    // describe("#/player/:playerId/:myId", function(){
    //     it("用户1获取用户2的基本信息，应返回两者是好友", function(done){
    //         apiClient.get("/player/2/1", function(err, req, res, body){
    //             body.errcode.should.be.exactly(0);
    //             body.data.player._id.should.be.exactly(2);
    //             body.data.player.name.should.be.exactly(FakeData.guest2_params.name);
    //             body.data.isMyFriend.should.be.exactly(true);
    //             done();
    //         });
    //     });
    //     it("用户3获取用户1的基本信息，应返回两者不是好友", function(done){
    //         apiClient.get("/player/1/3", function(err, req, res, body){
    //             body.errcode.should.be.exactly(0);
    //             body.data.player._id.should.be.exactly(1);
    //             body.data.player.name.should.be.exactly(FakeData.guest1_params.name);
    //             body.data.isMyFriend.should.be.exactly(false);
    //             done();
    //         });
    //     });
    // });

    describe("#/energy/ask", function(){
        before(function(done){
            Db.Message.remove({}, done);
        });
        it("用户1向2和3索要体力", function(done){
            var params = {
                playerId: 1,
                friends: [2, 3]
            };
            apiClient.post("/energy/ask", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户2查看消息中心，有来自用户1的索要体力请求", function(done){
            apiClient.get("/messages/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergy);
                body.data.messages[0].from.should.be.exactly(1);
                done();
            });
        });
        it("用户3查看消息中心，有来自用户1的索要体力请求", function(done){
            apiClient.get("/messages/3", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergy);
                body.data.messages[0].from.should.be.exactly(1);
                done();
            });
        });
        it("用户1再次向2和3索要体力", function(done){
            var params = {
                playerId: 1,
                friends: [2, 3]
            };
            apiClient.post("/energy/ask", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户2查看消息中心，只有一条消息", function(done){
            apiClient.get("/messages/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergy);
                body.data.messages[0].from.should.be.exactly(1);
                message = body.data.messages[0];
                done();
            });
        });
    });
    describe("#/energy/agree", function(){
        it("用户2同意赠送用户1体力", function(done){
            var params = {
                playerId:2,
                messageId: message._id
            };
            apiClient.post("/energy/agree", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户2查看消息中心，没有消息", function(done){
            apiClient.get("/messages/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(0);
                done();
            });
        });
        it("用户1查看消息中心，收到一条可领取体力的消息", function(done){
            apiClient.get("/messages/1", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergySuccess);
                body.data.messages[0].from.should.be.exactly(2);
                done();
            });
        });
    });
    describe("#/energy/take", function(){
        it("用户1领取体力", function(done){
            var params = {
                playerId:1,
                messageId: message._id
            };
            apiClient.post("/energy/take", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户1查看消息中心，没有消息", function(done){
            apiClient.get("/messages/1", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(0);
                done();
            });
        });
        it("用户3查看消息中心，有来自用户1的索要体力请求", function(done){
            apiClient.get("/messages/3", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergy);
                body.data.messages[0].from.should.be.exactly(1);
                message = body.data.messages[0];
                done();
            });
        });
        it("用户3同意赠送用户1体力", function(done){
            var params = {
                playerId:3,
                messageId: message._id
            };
            apiClient.post("/energy/agree", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户1查看消息中心，收到一条可领取体力的消息", function(done){
            apiClient.get("/messages/1", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.messages.length.should.be.exactly(1);
                body.data.messages[0].type.should.be.exactly(Const.kMessageTypeAskForEnergySuccess);
                body.data.messages[0].from.should.be.exactly(3);
                message = body.data.messages[0];
                done();
            });
        });
        it("用户1领取体力, 无法领取，超过了当日上限", function(done){
            var oldVal = Const.kFreeEnergyMaxLimit;
            Const.kFreeEnergyMaxLimit = 1;
            var params = {
                playerId:1,
                messageId: message._id
            };
            apiClient.post("/energy/take", params, function(err, req, res, body){
                body.errcode.should.be.exactly(Const.kErrorFreeEnergyReachMaxLimit.code);
                Const.kFreeEnergyMaxLimit = oldVal;
                done();
            });
        });
        it("把用户1上次领取时间改为昨天，又可以正常领取", function(done){
            var oldVal = Const.kFreeEnergyMaxLimit;
            Const.kFreeEnergyMaxLimit = 1;
            var params = {
                playerId:1,
                messageId: message._id
            };
            async.waterfall([
                function(callback) {
                    Db.Player.findById(1, callback);
                },
                function(player, callback) {
                    player.social.lastTimeTakeEnergy = moment().subtract(1, 'days').unix();
                    player.markModified('social');
                    player.save(callback);
                },
                function(player, rows, callback) {
                    apiClient.post("/energy/take", params, function(err, req, res, body){
                        body.errcode.should.be.exactly(0);
                        Const.kFreeEnergyMaxLimit = oldVal;
                        callback(null, null);
                    });
                }
            ], done);

        });
    });

    describe('#/unlock/ask', function(){
        var message;
        it("用户1向2和3请求帮助解锁第2幕", function(done){
            var params = {
                playerId: 1,
                friends: [2, 3],
                stage: 2
            };
            apiClient.post("/unlock/ask", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户2查看消息中心，收到一条帮助解锁消息", function(done){
            apiClient.get("/messages/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                _.last(body.data.messages).type.should.be.exactly(Const.kMessageTypeAskForUnlock);
                _.last(body.data.messages).from.should.be.exactly(1);
                done();
            });
        });
        it("用户3查看消息中心，收到一条帮助解锁消息", function(done){
            apiClient.get("/messages/3", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                _.last(body.data.messages).type.should.be.exactly(Const.kMessageTypeAskForUnlock);
                _.last(body.data.messages).from.should.be.exactly(1);
                message = _.last(body.data.messages);
                done();
            });
        });
        it("用户1查看第2幕的解锁进度, 进度为0", function(done){
            apiClient.get("/unlock/1/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.stage.should.be.exactly(2);
                body.data.helpers.length.should.be.exactly(0);
                done();
            });
        });
        it("用户3同意帮助用户1解锁", function(done){
            var params = {
                playerId: 3,
                messageId: message._id
            };
            apiClient.post("/unlock/agree", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户1查看第2幕的解锁进度, 进度为1", function(done){
            apiClient.get("/unlock/1/2", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                body.data.stage.should.be.exactly(2);
                body.data.helpers.length.should.be.exactly(1);
                body.data.helpers[0]._id.should.be.exactly(3);
                body.data.helpers[0].name.should.be.exactly(FakeData.guest3_params.name);
                done();
            });
        });
    });

    describe('#/friend/delete', function(){
        it("用户4查看好友列表，有用户1", function(done){
            apiClient.get("/friends/4", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                var index = _.findIndex(body.data.friendsInGame, function(item){
                    return item._id == 1;
                });
                index.should.not.be.exactly(-1);
                done();
            });
        });
        it("用户4删除用户1", function(done){
            var params = {
                playerId: 4,
                friendId: 1
            };
            apiClient.post("/friend/delete", params, function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                done();
            });
        });
        it("用户4查看好友列表，没有用户1", function(done){
            apiClient.get("/friends/4", function(err, req, res, body){
                body.errcode.should.be.exactly(0);
                var index = _.findIndex(body.data.friendsInGame, function(item){
                    return item._id == 1;
                });
                index.should.be.exactly(-1);
                done();
            });
        });
    });
});