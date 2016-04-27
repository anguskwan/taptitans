var dispatcher = require('../../../util/dispatcher');
var loader = require("../../../util/loader");

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
	this.entryList = [];
	if (env != 'development' && env != 'testing'){
		loader.loadConfigBaseApp(this, 'entryList', 'entry.json', env, true);
	}
	loader.loadConfigBaseApp(this, 'version', 'version.json', env, true);
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */

handler.queryEntry = function(msg, session, next) {
	if (!msg.playerId) {
//		log.info('缺少playerId参数');
//		next(null, { code: 500, error: true, msg: 'missing playerId' });
//      return;
	}
    var showPKButton = app.get("showPKButton");
    if (app.get("serverStatus") != 1 && !entryPlayerList(this, msg.playerId)) {
        next(null, {code:500});
    }
	log.info("连接到gate", {playerId: msg.playerId});

	// get all connectors
	var connectors = this.app.getServersByType('connector');
	if (!connectors || connectors.length === 0) {
		log.error('找不到可用的connector');
		next(null, { code: 500, error: true, msg: 'no available connector' });
		return;
	}
	var res = dispatcher.dispatch(msg.playerId || 1, connectors);
	log.info("用户连接到gate", {playerId: msg.playerId, params: msg, connectorId: res.id});
	next(null, {
		code: 200,
		host: res.clientHost,
		port: res.clientPort,
        showPKButton: showPKButton == void 0 ? true : showPKButton,
		ver : getVersion(this)
	});
};

var entryPlayerList = function(self, id) {
    if (env == 'development' || env == 'testing') {
        return true;
    }
    //var list = ['1','2','9','5','1064333'];
    return self.entryList.indexOf(id) != -1;
};

var getVersion = function(self) {
	return self.version.v;
};
