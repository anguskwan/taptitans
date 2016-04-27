/**
 * Created by hortor on 16/3/23.
 */
var fs = require("fs");
var path = require("path");
var sysutil = require("util");
var loader = require("./loader");

module.exports = function(app, opts) {
    return new channelHub(app, opts);
};

var channelHub = function(app, opts) {
    this.app = app;
    this.opts = opts;
    this.channels = {};             // 所有渠道脚本Map
    this.channelInfo = {};          // 所有渠道信息
    this.conversion = {};           // 渠道转化表
    this.version = {};

    // log
    this.logger = opts.logger || console;
    this.funs = opts.funs || {};
};

/**
 * 渠道函数名
 * @type {{}}
 */
channelHub.prototype.channelFunName = {
    GET_OPEN_ID : 'getOpenId',
    GENERATE_SIGN : 'genSign',
    VERIFY_ORDER : 'verifyOrder',
    GET_AUTHORIZE_URL : "getAuthorizeURL",
    NEED_AUTHORIZE : 'needAuthorize',
    GET_USER : "getUser",
    GET_CONFIG : "getConfig",
    VERIFY_TOKEN : "verifyToken",
    NEED_VERIFY_TOKEN : "needVerifyToken",
    GET_CLIENT_URL : 'getClientUrl',
    IS_SUBSCRIBED : 'isSubscribed'
};

/**
 * 接入技术类型
 */
channelHub.prototype.technologyType = {
    hortor : 'hortor',
    juhe : 'juhe'
};

/**
 * 初始化
 */
channelHub.prototype.initialize = function(){
    loader.loadConfigBaseApp(this, 'channelInfo', 'channel.json', env, this.opts.reload);
    loader.loadConfigBaseApp(this, 'conversion', 'conversion.json', env, this.opts.reload);
    loader.loadConfigBaseApp(this, 'version', 'version.json', env, this.opts.reload);

    var channelDir = path.join(__dirname, "channel");
    if (!fs.existsSync(channelDir)) {
        return;
    }
    this.loadChannels(channelDir, this.opts.reload);
    return this;
};

/**
 * 获取接入技术类型
 * @param channel
 */
channelHub.prototype.getTechnologyType = function(channel){
    if (channel == '1758'){
       return this.technologyType.juhe;
    }
    var technologyType = this.technologyType[channel];
    if (!technologyType) technologyType = this.technologyType.hortor;
    return technologyType;
};

/**
 * 获取关注类型
 * @param channel
 */
channelHub.prototype.getSubscribedType = function(channel){
    if (channel == '1758'){
        return channel;
    }
    return this.technologyType.hortor;
};

/**
 * 生成md5
 * @param str
 * @returns {*}
 */
channelHub.prototype.generateMD5 = function (str) {
    var md5sum = require('crypto').createHash("md5");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
};

/**
 * 校验sign
 * @param channel       渠道
 * @param data          数据对象
 * @param sign          验证标签
 * @returns {boolean}   正确返回true，错误返回false
 */
channelHub.prototype.verifySign = function(channel, data, sign){
    return this.callChannelScript(channel, this.channelFunName.GENERATE_SIGN, data) === sign;
};

/**
 * 校验token
 * @param channel
 * @param openId
 * @param token
 * @param next
 */
channelHub.prototype.verifyToken = function(channel, openId, token, next){
    return this.callChannelScript(channel, this.channelFunName.VERIFY_TOKEN, openId, token, next);
};

/**
 * 是否需要校验token
 * @param channel
 */
channelHub.prototype.needVerifyToken = function(channel){
    return this.callChannelScript(channel, this.channelFunName.NEED_VERIFY_TOKEN);
};


/**
 * 校验order
 * @param channel       渠道
 * @param data          数据对象
 * @param next          回调
 */
channelHub.prototype.verifyOrder = function(channel, data, next){
    this.callChannelScript(channel, this.channelFunName.VERIFY_ORDER, data, next);
};

/**
 * 加载
 * @param dir           加载目录
 * @param reload        是否更改重加载
 */
channelHub.prototype.loadChannels = function(dir, reload){
    this.channels = loader.load(dir, this);
    if (!!reload){
        var self = this;
        fs.watch(dir, function(event){
            if (event === 'change')
                self.loadChannels(dir);
        });
    }
};

/**
 * 获取渠道脚本
 * @param channel
 */
channelHub.prototype.getChannelScript = function(channel){
    return !channel ? null : this.channels[channel];
};

/**
 * 调用渠道脚本函数
 * @returns {*}
 */
channelHub.prototype.callChannelScript = function(){
    var args = [].slice.call(arguments);
    if (args.length < 2){
        throw new Error("[callChannelScript] 执行渠道脚本失败, 传入参数值必须有渠道和函数名");
    }
    var channel = args.shift();
    var funName = args.shift();
    var script = this.getChannelScript(channel);
    if (!script || !funName || typeof script[funName] !== 'function'){
        throw new Error(sysutil.format("[callChannelScript] 执行渠道脚本失败, script name:%s, script function name:%s", channel, funName));
    }
    return script[funName].apply(script, args);
};

/**
 * 错误函数
 * @param msg
 * @param next
 */
channelHub.prototype.error = function(msg, next){
    this.println(msg);
    next(new Error(msg));
};

/**
 * 打印
 * @param msg
 */
channelHub.prototype.println = function(msg){
    this.logger.info(msg);
};

/**
 * 转化渠道
 * @param channel
 * @param channeId 渠道ID
 */
channelHub.prototype.conversionChannel = function(channel, channeId){
    if (!!this.conversion && !!this.conversion[channel] && !!this.conversion[channel][channeId])
        return this.conversion[channel][channeId];
    return channel;
};

/**
 * 获取openId
 * @param channel       联运渠道号
 * @param code          用户码
 * @param next          回调
 */
channelHub.prototype.getOpenId = function(channel, code, next){
    this.callChannelScript(channel, this.channelFunName.GET_OPEN_ID, code, next);
};

/**
 * 是否需要授权
 * @param channel
 */
channelHub.prototype.needAuthorize = function(channel){
    return this.callChannelScript(channel, this.channelFunName.NEED_AUTHORIZE);
};

/**
 * 获取授权地址
 * @param channel       渠道
 * @param redirect      授权后要跳转的地址
 * @param authInfo      授权信息
 * @param style
 */
channelHub.prototype.getAuthorizeURL = function(channel, redirect, authInfo, style){
    return this.callChannelScript(channel, this.channelFunName.GET_AUTHORIZE_URL, redirect, authInfo, style);
};

/**
 * 获取用户信息
 * @param channel       渠道
 * @param info          信息
 * @param next          回调
 */
channelHub.prototype.getUser = function(channel, info, next){
    this.callChannelScript(channel, this.channelFunName.GET_USER, info, next);
};

/**
 * 获取配置
 * @param channel       渠道
 * @param info          信息
 * @param next          回调
 */
channelHub.prototype.getConfig = function(channel, info, next){
    this.callChannelScript(channel, this.channelFunName.GET_CONFIG, info, next);
};

/**
 * 获取客户端配置
 * @param channel       渠道
 * @param ver           版本号
 * @param clientDomain  客户端域
 * @param debug         调试标记
 * @param info          信息
 * @param token
 * @param ex
 */
channelHub.prototype.getClientUrl = function(channel, ver, clientDomain, debug, info, token, ex){
    if (!!this.version && !!this.version.v){
        ver = this.version.v;
    }
    return this.callChannelScript(channel, this.channelFunName.GET_CLIENT_URL, ver, clientDomain, debug, info, token, ex);
};

/**
 * 是否关注
 * @param channel       渠道
 * @param info
 * @param next
 */
channelHub.prototype.isSubscribed = function(channel, info, next){
    this.callChannelScript(channel, this.channelFunName.IS_SUBSCRIBED, info, next);
};