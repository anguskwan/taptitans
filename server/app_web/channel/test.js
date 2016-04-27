/**
 * Created by hortor on 16/4/1.
 */
/**
 * Created by hortor on 16/3/23.
 */
var OAuth = require("wechat-oauth");
var sysutil = require("util");
var API = require("wechat-api");
var http = require('./../../util/http');

module.exports = function(hub) {
    return new Channel(hub);
};

var Channel = function(hub) {
    this.hub = hub;
    this.name = "test";
    this.info = this.hub.channelInfo[this.name] || {};
    if (!this.hub.funs[this.name]) this.hub.funs[this.name] = {};

    this.appid =  this.info.appid || '';
    this.appSecret = this.info.appSecret || '';

    this.client = new OAuth(this.appid, this.appSecret, this.hub.funs['hortor'].getUserAccessToken, this.hub.funs['hortor'].saveUserAccessToken);
    this.api = new API(this.appid, this.appSecret, this.hub.funs['hortor'].getAccessToken, this.hub.funs['hortor'].saveAccessToken);
    this.api.registerTicketHandle(this.hub.funs['hortor'].getTicketToken, this.hub.funs['hortor'].saveTicketToken);
};

/**
 * 获取客户端URL
 * @param ver
 * @param clientDomain
 * @param debug
 * @param data
 * @param token
 * @returns {*}
 */
Channel.prototype.getClientUrl = function(ver, clientDomain, debug, data, token, ex) {
    var clientUrl = sysutil.format("%s/taptitans.html?v=%s&d=%s&scode=%s&channel=%s&shareCode=%s&token=%s&channelType=%s",
        clientDomain,  ver, debug, data.scode || "", !!ex ? ex : this.name, data.gcShareCode || "", token || "", this.hub.getTechnologyType(this.name));
    //log.info("[clientUrl] url=" + clientUrl);
    return clientUrl;
};

/**
 * 是否需要授权
 */
Channel.prototype.needAuthorize = function(){
    return true;
};

/**
 * 是否需要校验token
 */
Channel.prototype.needVerifyToken = function(){
    return false;
};


/**
 * 获取授权地址
 * @param redirect      授权后要跳转的地址
 * @param authInfo
 */
Channel.prototype.getAuthorizeURL = function(redirect, authInfo){
    return this.client.getAuthorizeURL(sysutil.format("%s?scode=%s&channel=%s&shareCode=%s", redirect, authInfo.scode || "", this.name, authInfo.shareCode || ""), '','snsapi_base');
};

/**
 * 获取openid
 * @param code  用户码
 * @param next  回调
 */
Channel.prototype.getOpenId = function(code, next){
    var self = this;
    if(!code) {
        // 未授权;
        self.hub.println(sysutil.format("[getOpenId] %s渠道获取open id失败，未授权，需要重定向.", self.name));
        next(null, null, true);
        return;
    }
    this.client.getAccessToken(code, function(err, result){
        if (!!err){
            self.hub.error(sysutil.format("[getOpenId] %s渠道获取open id失败:%s.", self.name, err.stack), next);
            return;
        }
        if (!result || !result.data){
            self.hub.error(sysutil.format("[getOpenId] %s渠道获取open id失败，获取的结果:%j.", self.name, result), next);
            return;
        }
        //self.hub.println(sysutil.format("[getOpenId] %s渠道获取open id成功，获取的open id:%j.", self.name, result.data.openid));
        next(null, result.data.openid);
    });
};

/**
 * 获取用户信息
 * @param info
 * @param next
 */
Channel.prototype.getUser = function(info, next){
    var self = this;
    if (!info){
        self.hub.error(sysutil.format("[getUser] %s渠道获取用户失败，没有指定info:%j", self.name, info), next);
        return;
    }
    if (!info.openId){
        this.hub.error(sysutil.format("[getUser] %s渠道获取用户失败，info没有指定open id:%s", this.name, info.openId), next);
        return;
    }
    var userInfo = null;
    async.waterfall([
        function(callback){
            self.client.getUser(info.openId, callback);
        },
        function(result, response, callback){
            userInfo = result;
            self.api.getUser(info.openId, callback);
        }
    ], function(err, result){
        if (!!err){
            self.hub.println(sysutil.format("[getUser] %s渠道获取用户失败，info:%j.", self.name, info));
            next('get user error', null);
            return;
        }
        var user = {
            uniqueId : info.openId,
            subChannelUid : '',
            name : '',
            avatar: '',
            location: '',
            subscribed : 0,
            channel: self.name
        };
        if (!!result){
            user.subscribe = !!result.subscribe ? result.subscribe : 0;
        }
        if (!!userInfo){
            user.name = !!userInfo.nickname ? userInfo.nickname : '';
            user.avatar = !!userInfo.headimgurl ? userInfo.headimgurl : '';
        }
        //self.hub.println(sysutil.format("[getUser] %s渠道获取用户成功，user:%j.", self.name, user));
        next(null, user);
    });
};

/**
 * 获取配置
 * @param info
 * @param next
 */
Channel.prototype.getConfig = function(info, next){
    var params = {
        debug: false,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'],
        url: decodeURIComponent(info.url)
    };
    this.api.getJsConfig(params, function(err, result){
        next(err, result);
    });
};

/**
 * 是否关注
 * @param info
 * @param next
 */
Channel.prototype.isSubscribed = function(info, next){
    if (!info){
        this.hub.error(sysutil.format("[isSubscribed] %s渠道获取是否关注失败，没有指定info:%j", this.name, info), next);
        return;
    }
    if (!info.openId){
        this.hub.error(sysutil.format("[isSubscribed] %s渠道获取是否关注失败，没有指定open id:%j", this.name, info), next);
        return;
    }
    var data = {
        openId : info.openId
    };
    var self = this;
    http.request(this.queryUrl, {
        method: 'GET',
        data : data
    }, function(err, userInfo){
        if (!!err){
            if (!!self.hub.funs[self.name].getErrorOpenIdSubscribed){
                self.hub.funs[self.name].getErrorOpenIdSubscribed(info.openId, function(err, status){
                    if (!!err){
                        next(null, {
                            openId : info.openId,
                            subscribe : 0
                        });
                    } else {
                        next(null, {
                            openId : info.openId,
                            subscribe : !!status ? 1 : 0
                        });
                    }
                });
            } else {
                next(null, {
                    openId : info.openId,
                    subscribe : 0
                });
            }
            return;
        }
        if (!userInfo || !userInfo.userInfo){
            next(null, {
                openId : info.openId,
                subscribe : 0
            });
            return;
        }
        next(null, {
            openId : userInfo.userInfo.openId,
            subscribe : !!userInfo.userInfo.isSubscribe ? 1 : 0
        });
    });
};
