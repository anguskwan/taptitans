/**
 * Created by hortor on 16/3/23.
 */
var channelHub = require('./channelHub');
var areaServices = require('./areaServices');
var weekUtil = require("./../util/weekUtil");
var sysutil = require("util");
var http = require('./../util/http');
var tokenUtil = require('./../util/token');
var querystring = require('querystring');
var moment = require('moment');

/**
 * 获取debug标示；
 * @returns {*}
 */
var getDebugFlag = function(){
    switch (env){
        case 'testing':
            return '2';
        case 'development':
            return '1';
        default :
            return '';
    }
};

var list = [
    "221.122.36.42"
];

module.exports = function(server) {
    /**
     * 初始化;
     */
    var initialize = function(server){
        server.channelHub = new channelHub(server, {
            reload : true,
            logger : log,
            funs : {
                hortor : {
                    getErrorOpenIdSubscribed : function(openid, callback){
                        Db.rds.route.get('errorUID:' + openid, function(err, status){
                            if (!!err){
                                callback(err, null);
                                return;
                            }
                            callback(null, status);
                        });
                    },
                    getUserAccessToken : function(openid, callback){
                        //log.info("getUserAccessToken openid:" + openid);
                        Db.rds.route.get("wechat:uaToken:" + openid, function(err, token){
                            if (!!err){
                                callback(err, null);
                                return;
                            }
                            try{
                                callback(null, JSON.parse(token));
                            } catch(e) {
                                callback(e, null);
                            }
                        });
                    },
                    saveUserAccessToken : function(openid, token, callback){
                        //log.info("saveUserAccessToken openid:" + openid + " token:" + JSON.stringify(token));
                        Db.rds.route.set("wechat:uaToken:" + openid, JSON.stringify(token), callback);
                    },
                    getAccessToken : function(callback) {
                        Db.rds.wechat.get("accessToken", function(err, accessToken){
                            if(accessToken) {
                                return callback(null, {
                                    accessToken: accessToken,
                                    expireTime: new Date().getTime() + 600
                                })
                            }
                            else {
                                return callback(null, null);
                            }
                        });
                    },
                    saveAccessToken : function(token, callback) {
                        //不存储，wxauth服务已经负责刷新和管理了
                        return callback();
                    },
                    getTicketToken : function(type, callback) {
                        var ticketToken;
                        var expireTime;
                        async.waterfall([
                            function(callback) {
                                Db.rds.wechat.get("ticketToken", callback);
                            },
                            function(token, callback) {
                                ticketToken = token;
                                Db.rds.wechat.get("ticketToken:expireTime", callback);
                            }
                        ], function(err, result){
                            expireTime = parseInt(result);
                            if(err || !ticketToken) return callback(null, null);
                            return callback(null, {
                                ticket: ticketToken,
                                expireTime: expireTime
                            })
                        });
                    },
                    saveTicketToken : function(type, ticket, callback) {
                        async.series([
                            function(callback) {
                                Db.rds.wechat.set("ticketToken", ticket.ticket, callback);
                            },
                            function(callback) {
                                Db.rds.wechat.set("ticketToken:expireTime", ticket.expireTime, callback);
                            }
                        ], callback);
                    }
                }
            }
        });
        server.channelHub.initialize();

        server.areaServices = new areaServices(server, {
            reload : true,
            logger : log,
            delOpenIdAreaId : function(openId){
                Db.rds.route.del('area:' + openId);
            },
            saveOpenIdAreaId : function(openId, score, areaId, next){
                var self = this;
                async.waterfall([
                    function(callback){
                        Db.rds.route.zadd('area:' + openId, score, areaId, callback);
                    },
                    function(count, callback){
                        Db.rds.route.zcard('area:' + openId, callback);
                    },
                    function(count, callback){
                        if (count >= self.maxCount){
                            // 干掉分数最低的一个;
                            Db.rds.route.zremrangebyrank('area:' + openId, 0, 0);
                        }
                        callback(null, null);
                    }
                ], function(err){
                    next(err, null);
                });
            },
            getAreaIdNearest : function(openId, next){
                Db.rds.route.zrange('area:' + openId, 0, 0, function(err, result){
                    if (!!err || !result) {
                        next(err, null);
                        return;
                    }
                    next(null, result[0]);
                });
            },
            getPerDayAmount : function(areaId, next){
                Db.rds.route.get('area:count:' + areaId, function(err, result){
                    if (!!err) {
                        next(err, null);
                        return;
                    }
                    if (!result){
                        next(null, 0);
                        return;
                    }
                    next(null, parseInt(result));
                });
            },
            incrPerDayAmount : function(areaId, next){
                Db.rds.route.incr('area:count:' + areaId);
                Db.rds.route.pexpireat('area:count:' + areaId, weekUtil.getClockTime(new Date(), 0) + 86400000);
                next(null, null);
            }
        });
        server.areaServices.initialize();
    };
    initialize(server);

    /**
     * 统计
     * @param goodsId
     * @param channel
     */
    var statistic = function(goodsId, channel){
        var meta = Conf.payment[goodsId];
        if (!meta) return;
        var cost = meta.cost;
        if (!cost || isNaN(parseInt(cost))) return;
        Db.incBy("gross-"+moment().format('YYYY-MM-DD'), cost);
        if (!!channel)
            Db.incBy("gross-"+moment().format('YYYY-MM-DD') + "-" + channel, cost);
    };

    /**
     * 向服务器增加商品
     * @param areaId    服务器ID
     * @param openId    用户
     * @param goodsId   商品
     * @param next      回调
     */
    var addGoods = function(areaId, openId, goodsId, next){
        server.areaServices.request(areaId, "post", "/taptitans/add-goods", {
            openId : openId,
            goodsId : goodsId
        }, next);
    };

    /**
     * 更新关注
     * @param openId    用户
     * @param status    状态
     * @param next      回调
     */
    var updateSubscribe = function(openId, status, next){
        server.areaServices.broadcast("post", "/taptitans/update-subscribe", {
            openId : openId,
            status : status
        }, next);
    };

    /**
     * 加密openid
     * @param openId
     * @param channel
     */
    var encryptOpenIdAndChannel = function(openId, channel){
        if (!openId || !channel){
            return sysutil.format("encryptedOId=%s;max-age=7200;", "");
        }
        return sysutil.format("encryptedOId=%s;max-age=7200;", helper.encryptCookie(JSON.stringify({
            openId : openId,
            channel : channel
        })));
    };

    /**
     * 通过token获取openid，channel
     * @param next
     * @param token
     */
    var getOpenIdByToken = function(token, next){
        var tokenInfo = tokenUtil.parse(token, Conf.get("web:route_secret"));
        if (!tokenInfo) {
            next("token不合法", null);
            return;
        }
        if (Date.now() - tokenInfo.timestamp > 60000){
            // 过期
            next("token过期", null);
            return;
        }
        next(null, {
            openId : tokenInfo.uid,
            channel : tokenInfo.channel
        });
    };

    /**
     * 设置cookie
     */
    server.get('/taptitans-route/cookie', function(req, res, next) {
        var channel = req.query.channel;
        if (!channel){
            channel = 'hortor';
        }
        if (!channel || !req.query.openId){
            next(new MissingParamError("openId or channel"));
            return;
        }
        res.header("Set-Cookie", encryptOpenIdAndChannel(req.query.openId, channel));
        res.sendStatus(200);
        next();
    });

    /**
     * 清除cookie
     */
    server.get('/taptitans-route/remove-cookie', function(req, res, next) {
        res.header("Set-Cookie", encryptOpenIdAndChannel("", ""));
        res.sendStatus(200);
        next();
    });

    /**
     * 聚合入口
     */
    server.get('/taptitans-route/juhe/index', function(req, res, next) {
        // 进入客户端;
        var channel = server.channelHub.conversionChannel(server.channelHub.technologyType.juhe, req.query.juhesdk_channel_id);
        res.header("Location", server.channelHub.getClientUrl(server.channelHub.technologyType.juhe, Conf.get("auth:client_ver"), Conf.get("auth:client_domain"), getDebugFlag(), req.query, '', channel));
        res.sendStatus(302);
        //log.info(sysutil.format("[RouteIndex] 授权完毕，进入客户端, ip:%s", req.get('X-Forwarded-For') || req.ip));
        next();
    });

    /**
     * 路由入口
     */
    server.get('/taptitans-route/index', function(req, res, next) {
        if (!req.query.channel){
            res.sendStatus(401);
            log.info(sysutil.format("[RouteIndex] 必须指定渠道号, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
            return;
        }
        var channel = req.query.channel;
        var technologyType = server.channelHub.getTechnologyType(channel);
        var needAuth = server.channelHub.needAuthorize(technologyType);
        if (!req.query.code && !!needAuth){
            var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
            var location = server.channelHub.getAuthorizeURL(technologyType, route_url + "/index", req.query, 'snsapi_userinfo');
            //log.info('---Location:'+location);
            res.header("Location", location);
            res.sendStatus(302);
            //log.info(sysutil.format("[RouteIndex] 跳转授权, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
            return
        }
        var openId = null;
        async.waterfall([
            function(callback){
                if (!!needAuth){
                    server.channelHub.getOpenId(technologyType, req.query.code, callback);
                } else {
                    callback(null, null);
                }
            }
        ], function(err, oId){
            if (!!err){
                res.sendStatus(401);
                log.info(sysutil.format("[RouteIndex] 发生错误:%j, ip:%s", err, req.get('X-Forwarded-For') || req.ip));
                next();
                return;
            }

            openId = oId;

            // 进入客户端;
            var token = tokenUtil.create(openId, channel, req.query.code, Date.now(), Conf.get("web:route_secret"));
            if (!!openId){
                res.header("Set-Cookie", encryptOpenIdAndChannel(openId, channel));

                //var userAgent = req.get("user-agent");
                //if(userAgent.indexOf("Android") > -1 && userAgent.indexOf("MQQBrowser") == -1) {
                //    //需要临时token
                //    token = saveOpenIdToken(channel, openId);
                //}
            }
            res.header("Location", server.channelHub.getClientUrl(technologyType, Conf.get("auth:client_ver"), Conf.get("auth:client_domain"), getDebugFlag(), req.query, token, channel));
            res.sendStatus(302);
            //log.info(sysutil.format("[RouteIndex] 授权完毕，进入客户端, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
        });

    });

    /**
     * 分享
     */
    server.get('/taptitans-route/share', function(req, res, next) {
        var channel = req.query.channel;
        if (!channel){
            channel = server.channelHub.technologyType.hortor;
        }
        if(!!req.cookies.encryptedOId) {
            var obj = null;
            try{
                obj = JSON.parse(helper.decryptCookie(req.cookies.encryptedOId));
            } catch(e){
                res.sendStatus(401);
                log.info(sysutil.format("[RouteShare] 解析cookie错误, ip:%s", req.get('X-Forwarded-For') || req.ip));
                next();
                return;
            }

            // 查看是否为老用户;
            server.areaServices.getAreaIdNearest(obj.openId, function(err, areaId){
                if (!!err){
                    res.sendStatus(401);
                    log.info(sysutil.format("[RouteShare] 解析cookie错误, ip:%s", req.get('X-Forwarded-For') || req.ip));
                    next();
                    return;
                }
                if (!areaId){
                    // 新用户;
                    var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
                    res.header("Location", sysutil.format("%s/index?scode=%s&channel=%s&shareCode=%s", route_url, req.query.scode || "", channel || server.channelHub.technologyType.hortor, req.query.shareCode || ""));
                    res.sendStatus(302);
                    //log.info(sysutil.format("[RouteShare] 跳转授权到index, ip:%s", req.get('X-Forwarded-For') || req.ip));
                    next();
                    return;
                }
                //log.info(sysutil.format("channel=%s openId:%s", obj.channel, obj.openId));
                var token = tokenUtil.create(obj.openId, obj.channel, req.cookies.encryptedOId, Date.now(), Conf.get("web:route_secret"));
                //log.info(sysutil.format("channel=%s token:%s", obj.channel, token));
                res.header("Location", server.channelHub.getClientUrl(
                    server.channelHub.getTechnologyType(obj.channel), Conf.get("auth:client_ver"), Conf.get("auth:client_domain"), getDebugFlag(), req.query, token, obj.channel));
                res.sendStatus(302);
                //log.info(sysutil.format("[RouteShare] cookie存在，直接进入客户端, ip:%s", req.get('X-Forwarded-For') || req.ip));
                next();
            });
            return;
        }
        if (!!req.query.juhesdk_token){
            channel = server.channelHub.technologyType.juhe;
        }
        if (!channel){
            res.sendStatus(401);
            log.info(sysutil.format("[RouteShare] 必须指定渠道号, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
            return;
        }
        var technologyType = server.channelHub.getTechnologyType(channel);
        var needAuth = server.channelHub.needAuthorize(technologyType);
        //log.info('technologyType:'+technologyType);
        //log.info('needAuth:'+needAuth);
        if (!req.query.code && !!needAuth){
            //log.info('route_url:'+Conf.get("web:route_url"));
            var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
            var location = server.channelHub.getAuthorizeURL(technologyType, route_url + "/share", req.query);
            //log.info('Location:'+location);
            res.header("Location", location);
            res.sendStatus(302);
            //log.info(sysutil.format("[RouteShare] 跳转授权, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
            return
        }
        //console.info("~~~~~~~~");
        var openId = null;
        async.waterfall([
            function(callback){
                if (!!needAuth){
                    server.channelHub.getOpenId(technologyType, req.query.code, callback);
                } else {
                    callback(null, null);
                }
            },
            function(oId, callback){
                openId = oId;
                if (!openId){
                    res.sendStatus(401);
                    log.info(sysutil.format("[RouteShare] 发生错误:%j, ip:%s", err, req.get('X-Forwarded-For') || req.ip));
                    next();
                    return;
                }
                // 查看是否为老用户;
                server.areaServices.getAreaIdNearest(openId, callback);
            }
        ], function(err, areaId){
            if (!!err){
                res.sendStatus(401);
                log.info(sysutil.format("[RouteShare] 发生错误:%j, ip:%s", err, req.get('X-Forwarded-For') || req.ip));
                next();
                return;
            }
            if (!areaId){
                // 新用户;
                var route_url = !!Conf.get("web:route_root_url") ? Conf.get("web:route_root_url") : Conf.get("web:route_url");
                res.header("Location", sysutil.format("%s/index?scode=%s&channel=%s&shareCode=%s", route_url, req.query.scode || "", channel || server.channelHub.technologyType.hortor, req.query.shareCode || ""));
                res.sendStatus(302);
                //log.info(sysutil.format("[RouteShare] 跳转授权到index, ip:%s", req.get('X-Forwarded-For') || req.ip));
                next();
                return;
            }


            // 进入客户端;
            var token = tokenUtil.create(openId, channel, req.query.code, Date.now(), Conf.get("web:route_secret"));
            if (!!openId){
                res.header("Set-Cookie", encryptOpenIdAndChannel(openId, channel));

                //var userAgent = req.get("user-agent");
                //if(userAgent.indexOf("Android") > -1 && userAgent.indexOf("MQQBrowser") == -1) {
                //    //需要临时token
                //    token = saveOpenIdToken(channel, openId);
                //}
            }
            res.header("Location", server.channelHub.getClientUrl(technologyType, Conf.get("auth:client_ver"), Conf.get("auth:client_domain"), getDebugFlag(), req.query, token, channel));
            res.sendStatus(302);
            //log.info(sysutil.format("[RouteShare] 授权完毕，进入客户端, ip:%s", req.get('X-Forwarded-For') || req.ip));
            next();
        });
    });

    /**
     * 获取用户信息
     */
    server.post('/taptitans-route/getUserInfo', function(req, res, next) {
        var channel = req.body.channel;
        //log.info(JSON.stringify(req.body));
        if (!channel){
            res.send({});
            next(new InternalError("NOT_CHANNEL"));
            return;
        }
        server.channelHub.getUser(server.channelHub.getTechnologyType(channel), req.body, function(err, info){
            if (!!err || !info){
                server.areaServices.delOpenIdAreaId(req.body.openId);
                res.send({});
                next(new InternalError(err));
                return;
            }
            res.send(info);
            next();
        });
    });

    /**
     * 路由定位区信息
     */
    server.get('/taptitans-route/locate', function(req, res, next) {
        var openId = null;
        var channel = null;
        var technologyType = null;
        var channelToken = null;

        async.waterfall([
            function(callback){
                if (!!req.query.openId && req.query.openId !== 'null' && req.query.openId !== 'undefined' && !!req.query.channel){
                    openId = req.query.openId;
                    channel = req.query.channel;
                    channelToken = req.query.channelToken;
                    callback(null, null);
                } else if(!!req.cookies.encryptedOId) {
                    try{
                        var obj = JSON.parse(helper.decryptCookie(req.cookies.encryptedOId));
                        openId = obj.openId;
                        channel = obj.channel;
                        callback(null, null);
                    } catch(e){
                        callback("解析错误", null);
                    }
                } else if (!!req.query.token){
                    getOpenIdByToken(req.query.token, callback);
                } else {
                    callback("无法定位", null);
                }
            },
            function(info, callback){
                if (!!info){
                    openId = info.openId;
                    channel = info.channel;
                }
                if (!openId){
                    res.sendStatus(401);
                    log.info(sysutil.format("[RouteLocate] 没有指定open id, ip:%s", req.get('X-Forwarded-For') || req.ip));
                    next();
                    return;
                }
                technologyType = server.channelHub.getTechnologyType(channel);
                var needVerifyToken = server.channelHub.needVerifyToken(technologyType);
                if (!!needVerifyToken){
                    server.channelHub.verifyToken(technologyType, openId, channelToken, callback);
                } else {
                    callback(null, true);
                }
            },
            function(success, callback){
                if (success === true || success == 'true'){
                    //log.info('openId:'+openId);
                    server.areaServices.locateArea(channel, req.query.areaId, openId, callback);
                } else {
                    // 不合法;
                    res.sendStatus(401);
                    log.info(sysutil.format("[RouteLocate] 不合法的token, ip:%s", req.get('X-Forwarded-For') || req.ip));
                    next();
                    return;
                }
            }
        ], function(err, areaInfo){
            if (!!err || !areaInfo || !openId || !channel){
                next(err);
                return;
            }
            // 生成登陆token;
            areaInfo.userToken = tokenUtil.create(openId, channel,  channelToken, Date.now(), Conf.get("web:route_secret"));
            res.send(areaInfo);
            next();
        });
    });

    /**
     * 增加商品
     */
    server.post('/taptitans-route/add-goods', function(req, res, next) {
        var areaId = req.body.ext;
        if (!areaId){
            next(new MissingParamError("ext"));
            return;
        }
        var openId = req.get("X-SESSION-ID");
        var goodsId = req.body.goodsId;
        if (!openId || !goodsId){
            next(new MissingParamError("openId or goodsId"));
            return;
        }
        statistic(goodsId, server.channelHub.technologyType.hortor);
        addGoods(areaId, openId, goodsId, function(err, data){
            if (!!err){
                next(new InternalError(err));
                return;
            }
            res.send(data);
            next();
        });
    });

    /**
     * 聚合回调
     */
    server.get('/taptitans-route/juhe/purchase', function(req, res, next){
        var goodsId = null;
        async.waterfall([
            function(callback){
                server.channelHub.verifyOrder(server.channelHub.technologyType.juhe, req.query, callback);
            },
            function(data, callback){
                goodsId = data.goodsId;
                addGoods(data.areaId, data.openId, data.goodsId, callback);
            }
        ], function(err){
            if (!!err){
                res.send('fail');
                next();
                return;
            }
            statistic(goodsId, server.channelHub.technologyType.juhe);
            res.send('success');
            next();
        });
    });

    /**
     * 关注，过期
     */
    server.post('/taptitans-route/update-subscribe', function(req, res, next) {
        next();
        //var openId = req.get("X-SESSION-ID");
        //var status = req.body.status;
        //if(!openId || !status) {
        //    next(new MissingParamError("openId or status"));
        //    return;
        //}
        //updateSubscribe(openId, status, function(err, rep){
        //    if (!!err){
        //        next(new InternalError(err));
        //        return;
        //    }
        //    res.send(rep);
        //    next();
        //});
    });

    /**
     * 获取配置信息
     */
    server.get('/taptitans-route/get-config', function(req, res, next){
        if(!req.query.url) {
            return next(new MissingParamError("url"));
        }
        var channel = server.channelHub.technologyType.hortor;
        server.channelHub.getConfig(channel, req.query, function(err, result){
            res.send(result);
            next(err);
        });
    });

    /**
     * 1758邀请
     */
    server.post('/taptitans-route/1758/invite', function(req, res, next){
        // todo;
        res.send('success');
        next();
    });

    /**
     * 是否关注
     */
    server.post('/taptitans-route/isSubscribed', function(req, res, next){
        var channel = req.body.channel;
        if(!channel) {
            next();
            return;
        }
        server.channelHub.isSubscribed(server.channelHub.getSubscribedType(channel), req.body, function(err, result){
            if (!!err){
                self.hub.println(sysutil.format("[isSubscribed] %s渠道获取是否关注失败，发生错误:%j.info:%j", channel, err, req.body));
            }
            res.send(result);
            next();
        });
    });

    server.get('/taptitans-route/subscribed', function(req, res, next){
        var ip = req.get('X-Forwarded-For') || req.ip;
        if (!ip){
            res.sendStatus(302);
            next();
            return;
        }
        if (list.indexOf(ip) < 0){
            res.sendStatus(302);
            next();
            return;
        }
        var token = req.query.token;
        if (!token){
            next("非法");
            return;
        }
        var tokenInfo = tokenUtil.parse(token, Conf.get("web:route_secret"));
        if (!tokenInfo || !tokenInfo.uid) {
            next("非法");
            return;
        }
        var key = 'errorUID:' + tokenInfo.uid;
        Db.rds.route.set(key, 1);
        Db.rds.route.expire(key, 60 * 60 * 24);
        next("ok");
    });

    server.get('/taptitans-route/parseToken', function(req, res, next){
        var ip = req.get('X-Forwarded-For') || req.ip;
        if (!ip){
            res.sendStatus(302);
            next();
            return;
        }
        if (list.indexOf(ip) < 0){
            res.sendStatus(302);
            next();
            return;
        }
        var token = req.query.token;
        if (!token){
            next("非法");
            return;
        }
        var tokenInfo = tokenUtil.parse(token, Conf.get("web:route_secret"));
        if (!tokenInfo || !tokenInfo.uid) {
            next("非法");
            return;
        }
        next(JSON.stringify(tokenInfo));
    });
};