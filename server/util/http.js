/**
 * Created by hortor on 16/3/24.
 */
var http = require("http");
var querystring = require('querystring');
var URL = require('url');

exports.resolve = function(urlStr, path){
    return URL.resolve.apply(URL, [].slice.call(arguments));
};

exports.request = function(urlStr, opts, next){
    opts = opts || {};
    opts.data = opts.data || {};
    opts.method = (opts.method || 'get').toUpperCase();
    opts.dataType = (opts.dataType || 'json').toUpperCase();
    if (opts.method === 'GET'){
        exports.request_get(urlStr, opts, next)
    } else if (opts.method === 'POST'){
        exports.request_post(urlStr, opts, next)
    }
};

exports.request_get = function(urlStr, opts, next){
    http.get(URL.format({pathname : urlStr, query : opts.data}), function(res) {
        if (res.statusCode == 200){
            var size = 0;
            var chunks = [];
            res.on('data', function(chunk){
                size += chunk.length;
                chunks.push(chunk);
            });
            res.on('end', function(){
                parser(opts, Buffer.concat(chunks, size), next);
            });
        } else {
            next(res.statusCode);
        }
    }).on('error', function(e) {
        next(e);
    });
};

var parser = function(opts, buf, next) {
    try {
        if (opts.dataType === 'JSON') {
            next(null, JSON.parse(buf));
        } else if (opts.dataType === 'TEXT') {
            next(null, buf.toString());
        }
    } catch (e){
        next(e);
    }
};

exports.request_post = function(urlStr, opts, next){
    var urlObj = URL.parse(urlStr);
    var data = querystring.stringify(opts.data);

    opts.headers = opts.headers || {};
    opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/x-www-form-urlencoded";
    opts.headers["Content-Length"] = data.length;

    var opt = {
        method: "POST",
        host: urlObj.hostname,
        port: urlObj.port || 80,
        path: urlObj.path || '',
        headers: opts.headers
    };
    var request = http.request(opt, function (res) {
        if (res.statusCode == 200) {
            var size = 0;
            var chunks = [];
            res.on('data', function (chunk) {
                size += chunk.length;
                chunks.push(chunk);
            }).on('end', function () {
                parser(opts, Buffer.concat(chunks, size), next);
            });
        } else {
            next(res.statusCode);
        }
    });

    request.on('error', function (e) {
        next(e);
    });

    request.write(data);
    request.end();
};