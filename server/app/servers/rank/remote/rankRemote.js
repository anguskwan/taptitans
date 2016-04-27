module.exports = function(app) {
	return new RankRemote(app);
};

var RankRemote =  function(app) {
	this.app = app;
};

var proto = RankRemote.prototype;

proto.updateRank = function(player, cb) {
    async.waterfall([
        function(cb) {
            var score = player.highestStage;
            Db.updatePlayerRank(player.id, score, cb);
        },
        function(rank, cb) {
            Db.updatePlayerServerRank(player.serverId, player.id, player.highestStage, cb);
        }
    ], function(err, result) {
        if (err) {
            log.error('[updateRank] failed', {err: err, player: player});
            return cb();
        }
        log.info("更新排行信息成功", Util.logPlayer(player));
        cb(null, result);
    });
};