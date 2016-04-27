/**
 * Created by Li Jie (lijie@hortorgames.com) on 15/4/13.
 * Copyright (c) 2015 Hortor Games. All rights reserved.
 */


var DEFAULT_TIMEOUT = 3000;
var DEFAULT_SIZE = 5000;

module.exports.timeout = function(timeout, maxSize) {
    return new Filter(timeout || DEFAULT_TIMEOUT, maxSize || DEFAULT_SIZE);
};

var Filter = function(timeout, maxSize) {
    this.timeout = timeout;
    this.maxSize = maxSize;
    this.timeouts = {};
    this.curId = 0;
};

Filter.prototype.before = function(msg, session, next) {
    var count = _.size(this.timeouts);
    if (count > this.maxSize) {
        log.error('timeout filter is out of range, current size is %s, max size is %s', count, this.maxSize);
        next();
        return;
    }
    session.__timeouts__ = session.__timeouts__ || {};
    if (!session.__timeouts__[msg.__route__]) {
        this.curId++;
        session.__timeouts__[msg.__route__] = this.curId;
        this.timeouts[this.curId] = setTimeout(function() {
            log.error('request timeout', { route: msg.__route__ });
            var reqId = session.__timeouts__[msg.__route__];
            delete session.__timeouts__[msg.__route__];
            delete this.timeouts[reqId];

        }.bind(this), this.timeout);
    }
    next();
};

Filter.prototype.after = function(err, msg, session, resp, next) {
    if (session.__timeouts__) {
        var reqId = session.__timeouts__[msg.__route__];
        if (reqId) {
            var timerId = this.timeouts[reqId];
            if (timerId) {
                clearTimeout(timerId);
                delete session.__timeouts__[msg.__route__];
                delete this.timeouts[reqId];
            }
        }
    }
    next(err);
};


module.exports.rpcTimeout = function(timeout, maxSize) {
    return new RpcFilter(timeout || DEFAULT_TIMEOUT,  maxSize || DEFAULT_SIZE);
};

var RpcFilter = function(timeout, maxSize) {
    this.timeout = timeout;
    this.maxSize = maxSize;
    this.timeouts = {};
    this.curId = 0;
};

RpcFilter.prototype.name = 'rpcTimeoutFilter';

/**
 * Before filter for rpc
 */

RpcFilter.prototype.before = function(serverId, msg, opts, next) {
    var count = _.size(this.timeouts);
    if (count > this.maxSize) {
        log.error('rpc timeout filter is out of range, current size is %s, max size is %s', count, this.maxSize);
        next();
        return;
    }
    if (!opts) return;
    opts.__rpctimeouts__ = opts.__rpctimeouts__ || {};
    if (!opts.__rpctimeouts__[msg.service + msg.method]) {
        this.curId++;
        opts.__rpctimeouts__[msg.service + msg.method] = this.curId;
        this.timeouts[this.curId] = setTimeout(function(id) {
            var arg = "";
            if (!!msg.args[0]){
                if (_.isObject(msg.args[0]))
                    arg = JSON.stringify(msg.args[0]);
                else
                    arg = msg.args[0];
            }
            log.error('rpc timeout', { service: msg.service, mothod: msg.method, rpcArgs: arg});
            delete opts.__rpctimeouts__[msg.service + msg.method];
            delete this.timeouts[id];
        }.bind(this, this.curId), this.timeout);
        opts = opts || {};
    }
    next();
};

/**
 * After filter for rpc
 */
RpcFilter.prototype.after = function(serverId, msg, opts, next) {
    if (!!opts && !!opts.__rpctimeouts__) {
        var reqId = opts.__rpctimeouts__[msg.service + msg.method];
        if (reqId) {
            var timeout = this.timeouts[reqId];
            if (timeout) {
                clearTimeout(timeout);
                delete opts.__rpctimeouts__[msg.service + msg.method];
                delete this.timeouts[reqId];
            }
        }
    }
    next();
};



var toobusy = null;

module.exports.toobusyRpc = function(maxLag) {
    return new RpcToobusyFilter(maxLag || DEFAULT_MAXLAG);
};

var RpcToobusyFilter = function(maxLag) {
    try {
        toobusy = require('toobusy');
    } catch(e) {
    }
    if(!!toobusy) {
        toobusy.maxLag(maxLag);
    }
};

RpcToobusyFilter.prototype.name = 'toobusy';

/**
 * Before filter for rpc
 */
RpcToobusyFilter.prototype.before = function(serverId, msg, opts, next) {
    opts = opts||{};
    if (!!toobusy && toobusy()) {
        logger.warn('Server too busy for rpc request, serverId:' + serverId + ' msg: ' + msg);
        var err =  new Error('server ' + serverId + ' is too busy now!');
        err.code = 500;
        next(err);
    } else {
        next();
    }
};