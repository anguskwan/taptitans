/**
 * Created by Li Jie (lijie@hortorgames.com) on 14-5-28.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var fs = require('fs');
var events = require("events");
var redis = require('redis');
var exec = require('child_process').exec;
var os = require('os');
global.mongoose = new require('mongoose');
//mongoose.set("debug", true);

var STATE_INITED  = 1;  // app has inited
var STATE_START = 2;  // app start
var STATE_STARTED = 3;  // app has started
var STATE_STOPED  = 4;  // app has stoped
var totalConnections = 0;
var connectedConnections = 0;

var Db = module.exports = new events.EventEmitter();
Db.ready = false;

var hashString = function(str) {
    var hash = 0, i, chr, len;
    if (str.length == 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

function initRedis(name) {
    log.info("redis name: " + name);
    var hosts = Conf.get("main:redis_" + name);
    if (!hosts) return;
    log.info("host is: "+hosts);
    if (_.isArray(hosts)) {
        return (function() {
            var clients = _.map(hosts, createRedisClient);
            return function(id) {
                if (isNaN(parseInt(id))) {
                    id = hashString(id.toString());
                }
                return clients[id % clients.length];
            }
        })();
    } else {
        return createRedisClient(hosts);
    }
}

function createRedisClient(host) {
    var options = {};
    var parts = host.split("|");
    if(parts.length == 3) {
        options.auth_pass = parts[2];
    }
    var client = redis.createClient(parts[1], parts[0], options);

    totalConnections++;
    client.once("ready", function() {
        log.info("[DB][redis] " + host + " connected");
        onConnected();
    });
    client.on("error", function(err) {
        onDisconnected(client);
        log.error("[DB][redis] " + host + " connect error, stack:" + err.stack, err);
    });
    return client;
}

function onConnected() {
    connectedConnections++;
    if (connectedConnections == totalConnections) {
        log.info("[DB] All " + totalConnections + " connections successfully connected.");
        Db.ready = true;
        Db.emit("ready", {});
    }
}

function killSelf(){
    if (os.platform() === 'win32') {
        log.info("WIN平台下，无法自杀.");
    } else {
        var pid = process.pid;
        log.info("自杀,进程号:%d", pid);
        exec("kill -9 " + pid);
        process.exit(1);
    }
}

function onDisconnected(client){
    if (!client.times)
        client.times = 0;
    if ("undefined" == typeof app || !app) return;
    if (app.state == STATE_INITED){
        ++ client.times;
        log.info("服务器启动的时候，连接断开次数:%d，服务器自动关闭.", client.times);
        killSelf();
    } else if (app.state == STATE_STARTED){
        ++ client.times;
        log.info("服务器运行状态的时候，连接断开次数:%d", client.times);
    }
}


function Collection(name, uris) {
    var models = this._models = new Array(uris.length);
    var model = require(__dirname + '/model/' + name + ".js");
    log.info("[DB][mongo] load model: " + name);

    //读取JSON文件，得到schema
    var schema = new mongoose.Schema(model, {autoIndex: false, _id: false, id: false});

    var findOrCreate = require('mongoose-findorcreate');
    schema.plugin(findOrCreate);
    // post init hook, set auto-incremented id
    if (model.id && (model.id == "Number" || model.id.type == "Number")) {
        schema.pre('save', function(next) {
            if (this.id) {
                if (!this._id) {this._id = this.id;}
                return next()
            };
            Db.inc(name, function(err, newId) {
                if (err) return next(new Error("inc docId failed."));
                this.id = newId;
                this._id = newId;
                next();
            }.bind(this));
        }, true);
    }

    var dbName = Conf.get("main:mongodb_name");
    var isAliyunMongo = Conf.get("main:is_aliyun_mongo") || false;

    log.info("[DB][mongo]is aliyun mongo:", isAliyunMongo);

    _.each(uris, function(uri, index) {
        var conn = null;
        if (isAliyunMongo) {
            log.info("[DB][mongo] begin connect to aliyun mongo");
            conn = mongoose.createConnection("mongodb://" + uri);
        }
        else {
            var options = {
                server: {
                    poolSize: 5,
                    socketOptions: {keepAlive: 1}
                }
            };
            conn = mongoose.createConnection("mongodb://" + uri + "/" + dbName, options);
        }

        totalConnections++;
        conn.once('connected', function() {
            log.info('[DB][mongo] ' + uri + ' connected, model: ' + name);
            //根据schema生成模型 加载models定义文件
            var model = conn.model(name, schema);
            model.on('index', function(err) {
                if (err) log.error('[DB][mongo] model %s index error: %s', name, err);
                else log.info('[DB][mongo] model [%s] index success', name);
            });

            models[index] = model;
            onConnected();
        });
        conn.on('error', function(err) {
            onDisconnected(conn);
            log.error('[DB][mongo] ' + uri + " connect error: " + err);
        });
    });

    this._getModel = function(id) {
        return this._models[this._getShardId(id)];
    };

    this._getShardId = function(id) {
        if (id instanceof Number) {
            return id % this._models.length;
        } else {
            return hashString(id) % this._models.length;
        }
    };

    this.findById = function(id, callback) {
        this._getModel(id).findById(id, callback);
    };

    this.findByIdWithFields = function(id, fields, callback) {
        if (_.isArray(fields)) fields = fields.join(" ");
        this._getModel(id).findById(id, fields, callback);
    };

    this.findByIds = function(ids, callback) {
        if (_.isEmpty(ids)) return callback(null, {});
        this.findByIdsWithFields(ids, null, callback);
    };

    this.findByIdsWithFields = function(ids, fields, callback) {
        if (_.isEmpty(ids)) return callback(null, {});
        var db = this;
        // 将id按分片分组
        var shards = _.toArray(_.groupBy(ids, this._getShardId.bind(this)));
        var tasks = _.map(shards, function(ids) {
            return function(callback) {
                if (!fields) {
                    db._getModel(ids[0]).find({"_id": {$in: ids}}, callback);
                } else {
                    if (_.isArray(fields)) fields = fields.join(" ");
                    db._getModel(ids[0]).find({"_id": {$in: ids}}, fields, callback);
                }
            }
        });
        async.parallel(tasks, function(err, data) {
            if (err) return callback(err);
            var result = {};
            _.each(_.flatten(data), function(doc) {
                result[doc._id] = doc;
            });
            callback(null, result);
        });
    };

    this.findByFieldWithFields = function(field, values, fields, callback) {
        if (this._models.length > 1)
            throw new Error("findByFieldWithField performed on a sharded database but no docId specified.");
        if (_.isEmpty(values)) return callback(null, {});
        var cond = {};
        cond[field] = {$in: values};
        this._models[0].find(cond, fields, function(err, data) {
            if (err) return callback(err);
            var result = {};
            _.each(_.flatten(data), function(doc) {
                result[doc[field]] = doc;
            });
            callback(null, result);
        });
    };

    this.removeById = function(id, callback) {
        this._getModel(id).remove({"id": id}, callback);
    };

    this.create = function(id) {
        if (this._models.length == 1)
            return new this._models[0];
        var model = this._getModel(id);
        return new model;
    };

    this.find = function() {
        if (this._models.length > 1)
            throw new Error("find cannot be performed on a sharded database");
        var model = this._models[0];
        return model.find.apply(model, arguments);
    };

    this.findAllByFields = function(condition, callback) {
        var db = this;
        var ids = [];

        _.each(this._models, function(v, k) {
            ids.push(k);
        });

        var shards = _.toArray(_.groupBy(ids, this._getShardId.bind(this)));
        var tasks = _.map(shards, function(ids) {
            return function(callback) {
                db._getModel(ids[0]).find(condition, callback);
            }
        });
        async.parallel(tasks, function(err, data) {
            if (err) return callback(err);
            callback(null, _.flatten(data));
        });
    };

    this.findAll = function(callback) {
        var tasks = [];
        _.each(this._models, function(model) {
            tasks.push(function(callback) {
                model.find({}, callback);
            });
        });
        async.parallel(tasks, function(err, result) {
            callback(err, _.flatten(result));
        });
    };

    this.update = function(cond, operation, callback) {
        if (_.isUndefined(cond.id) && this._models.length > 1)
            throw new Error("update performed on a sharded database but no docId specified.");
        var model = _.isUndefined(cond.id) ? this._models[0] : this._getModel(cond.id);
        return model.update.apply(model, arguments);
    };

    var existCheck = function(cb) {
        return function(err, numAffected) {
            if (!err && numAffected == 0)
                err = new InternalError(constant.kErrorDBDataRacing);
            cb(err, numAffected);
        }
    };

    this.updateExist = function() {
        var len = arguments.length - 1, cb = arguments[len];
        if (_.isFunction(cb)) {
            arguments[len] = existCheck(cb);
        }
        this.update.apply(this, arguments);
    };

    this.findAllByCond = function(condition, callback) {
        var tasks = [];
        _.each(this._models, function(model) {
            tasks.push(function(callback) {
                model.find(condition, callback);
            });
        });
        async.parallel(tasks, function(err, result) {
            callback(err, _.flatten(result));
        });
    };

    this.count = function(condition, callback) {
        var tasks = [];
        _.each(this._models, function(model) {
            tasks.push(function(callback) {
                model.count(condition, callback);
            });
        });
        async.parallel(tasks, function(err, result) {
            callback(err, _.flatten(result));
        });
    };

    this.remove = function() {
        if (this._models.length > 1)
            throw new Error("remove cannot be performed on a sharded database");
        return this._models[0].remove.apply(this._models[0], arguments);
    };

    this.findOrCreate = function() {
        if (this._models.length > 1)
            throw new Error("findOrCreate cannot be performed on a sharded database");
        return this._models[0].findOrCreate.apply(this._models[0], arguments);
    };

    this.findOne = function() {
        if (this._models.length > 1)
            throw new Error("findOrCreate cannot be performed on a sharded database");
        return this._models[0].findOne.apply(this._models[0], arguments);
    };

    this.findByIdAndUpdate = function(id, update, options, callback) {
        if (this._models.length > 1)
            throw new Error("findByIdAndUpdate cannot be performed on a sharded database");
        var model = this._getModel(id);
        model.findByIdAndUpdate.apply(model, arguments);
    };
}

Db.getCounter = function(name, callback) {
    rds.counter.get("counter:"+name, callback);
};

Db.inc = function(name, callback) {
    rds.counter.incr("counter:" + name, function(err, result) {
        callback(err, parseInt(result));
    });
};

Db.incBy = function(name, num, callback) {
    rds.counter.incrby("counter:"+name, num, callback);
};

Db.getDict = function(name, callback) {
    rds.dict.get("dict:"+name, callback);
};

Db.setDict = function(name, value, callback) {
    rds.dict.set("dict:"+name, value, callback);
};

Db.setnx = function(name, value, callback) {
    rds.dict.setnx("dict:"+name, value, callback);
};

var rds = {
    counter: initRedis("counter"),
    rank: initRedis("rank"),
    login: initRedis("login"),
    share: initRedis("share"),
    dict: initRedis("dict"),
    dailyActive: initRedis("dailyActive"),
    wechat: initRedis("wechat"),
    route : initRedis("route")
};

var mongoConf = {
    Player: Conf.get("main:mongodb"),
    mail: Conf.get("main:mongodb"),
    guild: Conf.get("main:mongodb"),
    war: Conf.get("main:mongodb"),
    activity: Conf.get("main:mongodb"),
    petWar : Conf.get("main:mongodb")
};

_.each(mongoConf, function(uris, name) {
    if (!!uris)
        Db[name] = new Collection(name, uris);
});

Db.rds = rds;

require("./player.js")(Db, rds);
