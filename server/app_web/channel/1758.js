/**
 * Created by hortor on 16/4/1.
 */
var http = require('./../../util/http');
var sysutil = require("util");

module.exports = function(hub) {
    return new Channel(hub);
};

var Channel = function(hub) {
    this.hub = hub;
    this.name = "1758";
    this.info = this.hub.channelInfo[this.name] || {};
    if (!this.hub.funs[this.name]) this.hub.funs[this.name] = {};

    this.appKey =  this.info.appKey || '';
    this.appSecret = this.info.appSecret || '';

    this.queryUrl = "http://wx.1758.com/game/platform/v1.0/user/query";
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
        if (key === "sign" || key === "sign_type") {
            continue;
        }
        var value = data[key];
        if (!value) {
            sign += ((i == 0 ? "" : "&") + key + "=");
        } else {
            sign += ((i == 0 ? "" : "&") + key + "=" + value);
        }
    }
    return this.hub.generateMD5(sign + this.appSecret);

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
        appKey : this.appKey,
        gid : info.openId
    };
    data.sign = this.genSign(data);

    var self = this;
    http.request(this.queryUrl, {
        method: 'POST',
        data : data
    }, function(err, rep){
        if (!!err){
            next(null, {
                openId : info.openId,
                subscribe : 0
            });
            return;
        }
        if (!rep || rep.code || !rep.userInfo){
            next(null, {
                openId : info.openId,
                subscribe : 0
            });
            return;
        }
        next(null, {
            openId : rep.userInfo.gid,
            subscribe : rep.userInfo.subscribe
        });
    });
};