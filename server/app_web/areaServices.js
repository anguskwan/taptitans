/**
 * Created by hortor on 16/3/23.
 */
var sysutil = require("util");
var loader = require("./loader");
var weekUtil = require("./../util/weekUtil");
var http = require('./../util/http');
var countDownLatch = require('./../util/countDownLatch');

module.exports = function(app, opts) {
    return new Services(app, opts);
};

var Services = function(app, opts) {
    this.app = app;
    this.opts = opts;
    this.areaInfo = {};                     // area id --- area info, map
    this.maxCount = opts.maxCount || 5;

    var self = this;
    // log
    this.logger = opts.logger || console;

    // map
    // open id ---- [area id]
    this.openIdAreaIdMap = {};
    this.delOpenIdAreaId = opts.delOpenIdAreaId || function(openId){
            delete self.openIdAreaIdMap[openId];
        };
    this.saveOpenIdAreaId = opts.saveOpenIdAreaId || function (openId, score, areaId, next) {
            if (!self.openIdAreaIdMap[openId]){
                self.openIdAreaIdMap[openId] = {};
                self.openIdAreaIdMap[openId].count = 0;
            }

            // 查看是否有这个areaId，有则干掉;
            for (var sco in self.openIdAreaIdMap[openId]){
                if (!self.openIdAreaIdMap[openId].hasOwnProperty(sco)) continue;
                if (!self.openIdAreaIdMap[openId][sco]) continue;
                if (!Array.isArray(self.openIdAreaIdMap[openId][sco])) continue;
                var index = self.openIdAreaIdMap[openId][sco].indexOf(areaId);
                if (index < 0) continue;
                self.openIdAreaIdMap[openId].count --;
                self.openIdAreaIdMap[openId][sco].splice(index, 1);
                if (!self.openIdAreaIdMap[openId][sco].length){
                    delete self.openIdAreaIdMap[openId][sco];
                }
                break;
            }

            // 如果数量大于最大数，则需要干掉分数小的;
            if (self.openIdAreaIdMap[openId].count >= self.maxCount){
                var scores = Object.keys(self.openIdAreaIdMap[openId]);
                scores.sort();
                if (!!scores.length){
                    self.openIdAreaIdMap[openId].count --;
                    self.openIdAreaIdMap[openId][scores[0]].pop();
                    if (!self.openIdAreaIdMap[openId][scores[0]].length){
                        delete self.openIdAreaIdMap[openId][scores[0]];
                    }
                }
            }
            if (!self.openIdAreaIdMap[openId][score]){
                self.openIdAreaIdMap[openId][score] = [];
            }
            self.openIdAreaIdMap[openId][score].unshift(areaId);
            self.openIdAreaIdMap[openId].count ++;
            next(null, null);
        };
    this.getAreaIdNearest = opts.getAreaIdNearest || function (openId, next) {
            var areaId = null;
            if (!!self.openIdAreaIdMap[openId]){
                var scores = Object.keys(self.openIdAreaIdMap[openId]);
                if (!!scores.length){
                    scores.sort(function(a, b){
                        if (isNaN(parseInt(a))) return 1;
                        if (isNaN(parseInt(b))) return -1;
                        return b - a;
                    });
                    areaId = self.openIdAreaIdMap[openId][scores[0]][0];
                }
            }
            next(null, areaId);
        };

    // area id ---- amount
    this.perDayAmount = {};
    this.getPerDayAmount = opts.getPerDayAmount || function(areaId, next){
            next(null, !self.perDayAmount[areaId] ? 0 : self.perDayAmount[areaId]);
        };
    this.incrPerDayAmount = opts.incrPerDayAmount || function(areaId, next){
            if (!self.perDayAmount[areaId]) self.perDayAmount[areaId] = 0;
            var now = weekUtil.getClockTime(new Date(), 0);
            if (now !== self.days){
                self.perDayAmount[areaId] = 0;
            }
            self.days = now;
            ++self.perDayAmount[areaId];
            next(null, null);
        };

};

/**
 * 初始化
 */
Services.prototype.initialize = function(){
    loader.loadConfigBaseApp(this, 'areaInfo', 'area.json', env, this.opts.reload, parser.bind(null, this));
    return this;
};

/**
 * 解析
 */
var parser = function(self){
    if (!self.areaInfo) return;
    // 需要重新解析
    self.channelInfo = {};                  // channel --- area id, map
    self.totalRate = 0;                     // 总概率
    self.rateInfo = {};                     // rate --- area id, map
    self.defaultAreaId = 0;                 // 默认的服务器ID

    for (var areaId in self.areaInfo){
        if (!self.areaInfo.hasOwnProperty(areaId)) continue;
        var area = self.areaInfo[areaId];
        if (!area) continue;
        area.areaId = areaId;
        if (!!area.channel){
            if (typeof area.channel === 'string'){
                self.channelInfo[area.channel] = areaId;
                continue;
            } else if (Array.isArray(area.channel)){
                for (var i = 0, j = area.channel.length; i < j; ++i){
                    if (!area.channel[i]) continue;
                    self.channelInfo[area.channel[i]] = areaId;
                }
                continue;
            }
        }

        if (!!area.rate && !isNaN(parseInt(area.rate))){
            self.totalRate += parseInt(area.rate);
            self.rateInfo[self.totalRate] = areaId;
            continue;
        }
        if (!self.defaultAreaId && !!area.default){
            self.defaultAreaId = areaId;
        }
    }

    if (!self.defaultAreaId){
       throw new Error("解析Auth配置失败，请指定默认的Auth.");
    }
    //console.warn('channelInfo:%j', self.channelInfo);
    //console.warn('totalRate:%j', self.totalRate);
    self.println('rateInfo:'+JSON.stringify(self.rateInfo));
    //console.warn('defaultAreaId:%j', self.defaultAreaId);
};

/**
 * 错误函数
 * @param msg
 * @param next
 */
Services.prototype.error = function(msg, next){
    this.println(msg);
    next(new Error(msg));
};

/**
 * 打印
 * @param msg
 */
Services.prototype.println = function(msg){
    this.logger.info(msg);
};

/**
 * 获取服务器信息
 * @param areaId
 */
Services.prototype.get = function(areaId){
    return this.areaInfo[areaId];
};

/**
 * 获取所有服务器信息
 */
Services.prototype.all = function(){
    return this.areaInfo;
};


/**
 * 获取简单的服务器信息
 * @param areaId
 * @returns {＊}
 */
Services.prototype.getSimple = function(areaId){
    var area = this.get(areaId);
    if (!area) return null;
    return {
        areaId : area.areaId,
        authUrl : http.resolve(area.authUrl , "/taptitans/login"),
        payUrl : area.payUrl,
        areaHost : area.areaHost,
        areaPort : area.areaPort
    };
};

/**
 * 获取默认服务器
 * @returns {*}
 */
Services.prototype.getDefaultAreaId = function(){
    return this.defaultAreaId;
};

/**
 * 是否有某服务器
 * @param areaId
 * @returns {*}
 */
Services.prototype.has = function(areaId){
    return !!this.areaInfo[areaId];
};

/**
 * 渠道分配路由
 * @param channel
 * @param next
 */
Services.prototype.channelRouteArea = function(channel, next){
    var areaId = this.channelInfo[channel];
    if (!areaId){
        this.println(sysutil.format("[channelRouteArea] 渠道分配路由失败，没有这样的渠道服务器:%s", channel));
        next(null, null);
        return;
    }
    this.println(sysutil.format("[channelRouteArea] 渠道分配路由成功，渠道:%s, 渠道服务器:%s", channel, areaId));
    next(null, areaId);
};

/**
 * 百分比分配路由
 * @param next
 */
Services.prototype.percentRouteArea = function(next){
    if (this.totalRate <= 0){
        this.println("[percentRouteArea] 百分比分配路由失败，没有定义任何的百分比分配");
        next(null, null);
        return;
    }
    var areaId = null;
    var curRate = Util.randomInt(0, this.totalRate);
    this.println("curRate:"+curRate);
    for (var rate in this.rateInfo){
        if (!this.rateInfo.hasOwnProperty(rate)) continue;
        if (curRate <= rate){
            areaId = this.rateInfo[rate];
            break;
        }
    }
    if (!areaId){
        this.println("[percentRouteArea] 百分比分配路由失败，没有找到对应的服务器.");
        next(null, null);
        return;
    }

    var area = this.get(areaId);
    if (!area){
        this.println("[percentRouteArea] 百分比分配路由失败，没有找到对应的服务器.");
        next(null, null);
        return;
    }
    // 查看满了没;
    var self = this;
    async.waterfall([
        function(callback){
            if (!!area.limitPerDay){
                self.getPerDayAmount(areaId, callback);
            } else {
                callback(null, 0);
            }
        },
        function(amount, callback){
            if (!!area.limitPerDay){
                if (amount >= area.limitPerDay){
                    self.println(sysutil.format("[percentRouteArea] 百分比分配路由失败，%s 服务器的当日导入人数:%s 达到每日上限:%s.", areaId, amount, area.limitPerDay));
                    next(null, null);
                    return;
                }
                self.incrPerDayAmount(areaId, callback);
            } else {
                callback(null, null);
            }
        }
    ], function(err){
        if (!!err){
            self.println(sysutil.format("[percentRouteArea] 百分比分配路由失败，获取:%s 服务器当日导入人数:%s 失败.", areaId));
            next(null, null);
            return;
        }
        next(null, areaId);
    });
};

/**
 * 系统路由，返回auth服务器id
 * @param channel       渠道
 * @param openId            open id
 * @param next              回调
 */
Services.prototype.systemRouteArea = function(channel, openId, next){
    var self = this;
    async.waterfall([
        function(callback){
            if (!!channel){
                // 1.如果指定了渠道，则优先定位服务器。
                self.channelRouteArea(channel, callback);
            } else {
                callback(null, null);
            }
        },
        function(aId, callback){
            if (!aId){
                // 2.否则按百分比定位服务器。
                self.percentRouteArea(callback);
            } else {
                callback(null, aId);
            }
        }
    ], function(err, aId){
        if (!!err){
            next(err, null);
            return;
        }
        if (!aId){
            // 3.都不满足，去默认服务器。
            aId = self.getDefaultAreaId();
        }
        next(err, aId);
    });
};

/**
 * 定位服务器
 * @param channel           渠道
 * @param areaId            服务器区id
 * @param openId            open id
 * @param next              回调
 */
Services.prototype.locateArea = function(channel, areaId, openId, next){
    if (!openId) {
        this.error("[locateArea] 定位服务器失败，没有指定openId", next);
        return;
    }

    var areaInfo = null;
    var self = this;
    async.waterfall([
        function(callback){
            // 如果指定了服务器，并且合法，直接返回区域服务器.
            if (!!areaId && self.has(areaId)){
                callback(null, areaId);
            } else {
                self.getAreaIdNearest(openId, callback);
            }
        },
        function(aId, callback){
            if (!aId){
                // 第一次，如果没有指定任何服务器，那么交给系统路由;
                self.systemRouteArea(channel, openId, callback);
            } else {
                callback(null, aId);
            }
        },
        function(aId, callback){
            areaInfo = self.getSimple(aId);
            if (!areaInfo){
                self.error("[locateArea] 定位服务器失败，系统无法定位任何Area", next);
                return;
            }
            self.saveOpenIdAreaId(openId, Date.now(), aId, callback);
        }
    ], function(err){
        if (!!err){
            self.error(sysutil.format("[locateArea] 定位服务器失败，失败信息:%s", next, err.stack));
            return;
        }
        self.println(sysutil.format("[locateArea] 定位服务器成功，Area信息:%j", areaInfo));
        next(null, areaInfo);
    });
};

/**
 * 发送请求
 * @param areaId        服务器ID
 * @param method        方法，get或者post
 * @param path          路径
 * @param data          请求数据
 * @param next          回调
 */
Services.prototype.request = function(areaId, method, path, data, next){
    var self = this;
    var area = self.getSimple(areaId);
    if (!area || !area.authUrl){
        this.error(sysutil.format("[sendRequest] 向服务器:%s 的路径:%s 发送%s请求:%j 失败，系统无法定位任何Area", areaId, path, method, data), next);
        return;
    }
    http.request(http.resolve(area.authUrl , path), {
        method : method,
        data : data
    }, function(err, rep){
        if(!!err) {
            self.error(sysutil.format("[sendRequest] 向服务器:%s 的路径:%s 发送%s请求:%j 失败，发生错误:%j", areaId, path, method, data, err), next);
            return;
        }
        next(null, rep);
    });
};

/**
 * 广播
 * @param method        方法，get或者post
 * @param path          路径
 * @param data          请求数据
 * @param next          回调
 */
Services.prototype.broadcast = function(method, path, data, next){
    var self = this;
    var areas = self.all();
    if (!areas){
        self.error(sysutil.format("[broadcast] 向服务器广播 的路径:%s 发送%s请求:%j 失败，系统无法定位任何Area", path, method, data), next);
        return;
    }
    var keys = Object.keys(areas);
    if (!keys.length){
        self.error(sysutil.format("[broadcast] 向服务器广播 的路径:%s 发送%s请求:%j 失败，系统无法定位任何Area", path, method, data), next);
        return;
    }
    var result = null;
    var latch = countDownLatch.createCountDownLatch(keys.length, {timeout: 60000}, function(isTimeout) {
        if (!isTimeout) {
            self.error(sysutil.format("[broadcast] 向服务器广播 的路径:%s 发送%s请求:%j 失败，有服务器超时", path, method, data), next);
        } else {
            next(null, !!result ? result : {});
        }
    });

    for (var key in areas){
        if (!areas.hasOwnProperty(key)) continue;
        self.request(areas[key].areaId, method, path, data, function(err, rep){
            if (!!rep) result = rep;
            latch.done();
        });
    }
};
