/**
 * Created by Li Jie (lijie@hortorgames.com) on 14-5-30.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var restify = require('restify');
var util = require('util');

var LogicError = exports.LogicError = function(err, extra) {
    restify.RestError.call(this, {
        statusCode: 200,
        restCode: err.code,
        message: err.msg,
        constructorOpt: LogicError
    });
    this.name = 'LogicError';
    this.extra = extra;
};
util.inherits(LogicError, restify.RestError);


var RequestError = exports.RequestError = function(err) {
    if (typeof err === "string") {
        err = { code: -1, msg: err };
    }
    restify.RestError.call(this, {
        statusCode: 400,
        restCode: err.code,
        message: err.msg,
        constructorOpt: RequestError
    });
    this.name = 'RequestError';
};
util.inherits(RequestError, restify.RestError);


var InvalidParamError = exports.InvalidParamError = function(paramName) {
    var err = Const.kErrorInvalidParam;
    restify.RestError.call(this, {
        statusCode: 400,
        restCode: err.code,
        message: _.sprintf(err.msg, paramName),
        constructorOpt: InvalidParamError
    });
    this.name = 'InvalidParamError';
};
util.inherits(InvalidParamError, RequestError);


var MissingParamError = exports.MissingParamError = function(paramName) {
    var err = Const.kErrorMissingParam;
    restify.RestError.call(this, {
        statusCode: 400,
        restCode: err.code,
        message: _.sprintf(err.msg, paramName),
        constructorOpt: MissingParamError
    });
    this.name = 'MissingParamError';
};
util.inherits(MissingParamError, RequestError);

var InternalError = exports.InternalError = function(e) {
    var err = Const.kErrorInternalError;
    restify.RestError.call(this, {
        statusCode: 500,
        restCode: err.code,
        message: e.message || JSON.stringify(e),
        constructorOpt: InternalError
    });
    this.name = 'InternalError';
};
util.inherits(InternalError, RequestError);

var SignError = exports.SignError = function() {
    restify.RestError.call(this, {
        statusCode: 400, // should NOT use "401 Unauthorized"
        restCode: Const.kErrorSignError.code,
        message: Const.kErrorSignError.msg,
        constructorOpt: SignError
    });
    this.name = 'SignError';
};
util.inherits(SignError, RequestError);

var AuthError = exports.AuthError = function() {
    restify.RestError.call(this, {
        statusCode: 401,
        restCode: Const.kErrorAuthError.code,
        message: Const.kErrorAuthError.msg,
        constructorOpt: AuthError
    });
    this.name = 'AuthError';
};
util.inherits(AuthError, RequestError);