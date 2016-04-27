/**
 * Created by hortor on 16/3/25.
 */
var sysutil = require("util");
var http = require('./../../util/http');
var querystring = require('querystring');

module.exports = function(hub) {
    return new Channel(hub);
};

var Channel = function(hub) {
    this.hub = hub;
    this.name = "juhe";
    this.info = this.hub.channelInfo[this.name] || {};

    this.appid =  this.info.appid || '';
    this.appSecret = this.info.appSecret || '';

    this.verifyTokenUrl = "http://open.juhesdk.twan.cn/token.check/verify";
    this.verifyOrderUrl = "http://open.juhesdk.twan.cn/order.check/verify";
    this.getUserUrl = "http://open.juhesdk.twan.cn/user.info/verify";
};

/**
 * 获取客户端URL
 * @param ver
 * @param clientDomain
 * @param debug
 * @param data
 * @param token
 * @param ex
 * @returns {*}
 */
Channel.prototype.getClientUrl = function(ver, clientDomain, debug, data, token, ex) {
    var clientUrl = sysutil.format("%s/taptitans.html?v=%s&d=%s&channel=%s&channelType=%s%s",
        clientDomain,  ver, debug, !!ex ? ex : this.name, this.hub.getTechnologyType(this.name), !!data ? ('&' + querystring.stringify(data)) : '');
    //log.info("[clientUrl] url=" + clientUrl);
    return clientUrl;
};

/**
 * 是否需要授权
 */
Channel.prototype.needAuthorize = function(){
    return false;
};

/**
 * 是否需要校验token
 */
Channel.prototype.needVerifyToken = function(){
    return true;
};


/**
 * 生成sign
 * @param data
 * @returns {*}
 */
Channel.prototype.genSign = function(data){
    if (!data) return null;
    var keys = Object.keys(data);
    keys.sort();

    var sign = "";
    for (var i = 0, j = keys.length; i < j; ++i){
        var key = keys[i];
        if (key === "sign" || key === "sign_type" || key === "appid") {
            continue;
        }
        var value = data[key];
        if (!value) {
            sign += "";
        } else {
            sign += value;
        }
    }
    return this.hub.generateMD5(this.appid + sign + this.appSecret);

};


/**
 * 校验TOKEN
 * @param openId    聚合返回给客户端的
 * @param token     聚合返回给客户端的
 * @param next      回调
 */
Channel.prototype.verifyToken = function(openId, token, next){
    if (!openId){
        this.hub.error(sysutil.format("[verifyToken] %s渠道校验token:%s 失败，没有指定open id:%s", this.name, token, openId), next);
        return;
    }
    if (!token){
        this.hub.error(sysutil.format("[verifyToken] %s渠道校验token:%s 失败，没有指定token.open id:%s", this.name, token, openId), next);
        return;
    }
    var sign = this.genSign({
        token : token,
        uid : openId
    });

    var self = this;
    http.request(this.verifyTokenUrl, {
        method: 'GET',
        data: {
            token : token,
            uid : openId,
            appid : this.appid,
            sign : sign
        }
    }, function(err, rep){
        if (!!err){
            self.hub.error(sysutil.format("[verifyToken] %s渠道校验token:%s 失败，发生错误:%j.open id:%s", self.name, token, err, openId), next);
            return;
        }
        if (!rep){
            self.hub.error(sysutil.format("[verifyToken] %s渠道校验token:%s 失败，没接受到任何消息.open id:%s", self.name, token, openId), next);
            return;
        }
        //self.hub.println(sysutil.format("[verifyToken] %s渠道token:%s成功，open id:%j,校验结果:%j.", self.name, token, openId, rep));
        next(null, rep.result);
    });
};

/**
 * 校验订单
 * @param orderId   订单号
 * @param next      回调
 */
Channel.prototype.verifyOrderId = function(orderId, next){
    if (!orderId){
        this.hub.error(sysutil.format("[verifyOrderId] %s渠道校验order:%s 失败，没有指定order id.", this.name, orderId), next);
        return;
    }
    var sign = this.genSign({
        orderid : orderId
    });

    var self = this;
    //self.hub.println(sysutil.format("[verifyOrderId] %s渠道order:%s.", self.name, orderId));
    http.request(this.verifyOrderUrl, {
        method: 'GET',
        data: {
            orderid : orderId,
            appid : this.appid,
            sign : sign
        }
    }, function(err, rep){
        if (!!err){
            self.hub.error(sysutil.format("[verifyOrderId] %s渠道校验order:%s 失败，发生错误:%j.", self.name, orderId, err), next);
            return;
        }
        if (!rep){
            self.hub.error(sysutil.format("[verifyOrderId] %s渠道校验order:%s 失败，没接受到任何消息.open id:%s", self.name, orderId), next);
            return;
        }
        //self.hub.println(sysutil.format("[verifyOrderId] %s渠道order:%s成功，校验结果:%j.", self.name, orderId, rep));
        next(null, rep.result);
    });
};


/**
 * 获取用户
 * @param info     聚合返回给客户端的
 * @param next      回调
 */
Channel.prototype.getUser = function(info, next){
    if (!info){
        this.hub.error(sysutil.format("[getUser] %s渠道获取用户失败，没有指定info:%j", this.name, info), next);
        return;
    }
    if (!info.openId){
        this.hub.error(sysutil.format("[getUser] %s渠道获取用户失败，token:%s，info没有指定open id:%s", this.name, info.userToken, info.openId), next);
        return;
    }
    if (!info.userToken){
        this.hub.error(sysutil.format("[getUser] %s渠道获取用户失败，token:%s，info没有指定token.open id:%s", this.name, info.userToken, info.openId), next);
        return;
    }
    var sign = this.genSign({
        token : info.userToken,
        uid : info.openId
    });
    var self = this;
    http.request(this.getUserUrl, {
        method: 'GET',
        data: {
            token : info.userToken,
            uid : info.openId,
            appid : this.appid,
            sign : sign
        }
    }, function(err, rep){
        var user = {
            uniqueId : info.openId,
            subChannelUid : '',
            name : '',
            avatar: '',
            location: '',
            subscribed : 0,
            channel: self.name
        };
        if (!!rep && !!rep.data){
            user.subChannelUid =  rep.data.channel_uid;
            user.name = rep.data.name;
            user.avatar = rep.data.logo;
            user.channel = self.hub.conversionChannel(self.name, rep.data.channel_id);
        }
        //self.hub.println(sysutil.format("[getUser] %s渠道获取用户成功，user:%j.", self.name, user));
        next(null, user);
    });
};

/**
 * 校验订单
 * @param orderInfo        充值信息
 * @param next             回调
 */
Channel.prototype.verifyOrder = function(orderInfo, next){
    this.hub.println(sysutil.format("[verifyOrder] %s渠道校验订单，orderInfo:%j.", this.name, orderInfo));
    if (!orderInfo){
        this.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，没有指定orderInfo.", this.name, orderInfo), next);
        return;
    }
    // 校验sign;
    if (!this.hub.verifySign(this.name, orderInfo, orderInfo.sign)){
        this.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，sign不合法.", this.name, orderInfo), next);
        return;
    }
    // 检查必须值;
    if (!orderInfo.order_id || !orderInfo.server_id
        || !orderInfo.item_id
        || !orderInfo.item_amount || !orderInfo.need_pay || !orderInfo.real_pay){
        this.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，缺少必要参数.", this.name, orderInfo), next);
        return;
    }
    var self = this;
    async.waterfall([
        function(callback){
            // 校验订单Id
            self.verifyOrderId(orderInfo.order_id, callback);
        }
    ], function(err, success){
        if (!!err){
            self.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，发生错误:%j.", self.name, orderInfo, err), next);
            return;
        }
        if (!success){
            self.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，订单不合法.", self.name, orderInfo), next);
            return;
        }

        if (typeof orderInfo.ext === 'string'){
            try{
                orderInfo.ext = JSON.parse(orderInfo.ext);
            } catch(e){
                self.hub.error(sysutil.format("[verifyOrder] %s渠道校验订单失败，orderInfo:%j，发生错误:%j.", self.name, orderInfo, e), next);
                return;
            }
        }
        var info = {};
        info.areaId = orderInfo.ext.areaId;
        info.openId = orderInfo.ext.uid;
        info.goodsId = orderInfo.item_id;
        //self.hub.println(sysutil.format("[verifyOrder] %s渠道校验订单成功，orderInfo:%j, info:%j.", self.name, orderInfo, info));
        next(null, info);
    });
};