/**
 * Created by joker on 15/7/22.
 */

exports.formatter = function(req, res, body) {
    if (body instanceof Error) {
        res.statusCode = body.statusCode || 500;
        // rest error
        if (body.body) {
            var tmp = {
                errcode: body.body.code,
                errmsg: body.body.message
            };
            if (body.extra) tmp.data = body.extra;
            body = tmp;
        } else {
            body = {
                errcode: constant.kErrorInternalError.code,
                errmsg: body.message
            };
        }
    } else if (Buffer.isBuffer(body)) {
        body = body.toString('base64');
    } else {
        body = {
            errcode: 0,
            errmsg: "",
            data: body
        }
    }

    var data = JSON.stringify(body);
    res.header('Content-Length', Buffer.byteLength(data));
    return (data);
};

exports.wrapper = function(handler) {
    return function(req, res, next) {
        var t = Date.now();
        var callback = function(err){
            //error handling
            if(!err || err instanceof RequestError || err instanceof LogicError || err instanceof SignError) {
                if(err) log.warn(_.sprintf("[%s][%s] body:%s error:%s", req.method, req.url, JSON.stringify(req.body), err.message));
                //profiling
                t = Date.now() - t;
                log.info("[%s][%s] body:%s, timing:%d ms", req.method, req.url, JSON.stringify(req.body), t);
                return next(err);
            }
            else {
                log.error(_.sprintf("[%s][%s] body:%s error:%s, stack:%s", req.method, req.url, JSON.stringify(req.body), err + "", err.stack));
                return next(new InternalError(err));
            }
        };
        handler(req, res, callback);
    }
};

var API_WHITE_LIST = [];
var generateSignSync = function(url, params, secret) {
    var str = _.sprintf("%s-%s-%s", url, JSON.stringify(params),secret);
    log.debug("sign body:" + str);
    log.debug("sign params:" + require('crypto').createHash('md5').update(JSON.stringify(params)).digest("hex"));
    return require('crypto').createHash('md5').update(str).digest("hex");
};

exports.signChecker = function(req, res, next) {
    //测试环境下不开sign检查，方便开发在
    // if (global.APP_NAME == "test") {
        return next();
    // }
    //对于某些api，要豁免
    var path = require("url").parse(req.url).pathname;
    if(_.indexOf(API_WHITE_LIST, path) != -1) {
        return next();
    }
    var signReceived = req.params._sig;
    delete req.params._sig;
    var sign = generateSignSync(path, req.params, Conf.get("auth:secret"));
    log.debug("correct sign:" + sign);
    log.debug("received sign:" + signReceived);
    if(signReceived != sign) {
        return next(new SignError());
    }
    next();
};