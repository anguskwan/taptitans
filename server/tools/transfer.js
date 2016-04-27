/**
 * Created by hortor on 16/4/5.
 */
var program = require('commander');
var cliff = require('cliff');
var redis = require('redis');
var async = require('async');
var fs = require('fs');
var countDownLatch = require('./../util/countDownLatch');

var COMMAND_ERROR = 'Illegal command format. Use `./transfer --help` to get more info.\n'.red;
var OPENID_PATTERN = '';
for (var i = 0; i < 32; ++i){
    OPENID_PATTERN += '[a-fA-F0-9]';
}

program.version('0.0.1');

program.command('export')
    .description('export redis openid data')
    .option('-h, --host <host>', 'the redis host', 'localhost')
    .option('-p, --port <port>', 'enable the redis port', 6379)
    .option('-u, --user <user>', 'the redis user', '')
    .option('-a, --areaId <areaId>', 'the area id', 'testing')
    .action(function(opts) {
        exportData(opts);
    });

program.command('import')
    .description('import redis openid data')
    .option('-h, --host <host>', 'the redis host', 'localhost')
    .option('-p, --port <port>', 'enable the redis port', 6379)
    .option('-u, --user <user>', 'the redis user', '')
    .option('-f, --filepath <filepath>', 'the data file path', './temp.json')
    .option('-a, --areaId <areaId>', 'the area id', 'testing')
    .action(function(opts) {
        importData(opts);
    });

program.command('corrected')
    .description('corrected redis openid data')
    .option('-h, --host <host>', 'the redis host', 'localhost')
    .option('-p, --port <port>', 'enable the redis port', 6379)
    .option('-u, --user <user>', 'the redis user', '')
    .option('-a, --areaId <areaId>', 'the area id', 'testing')
    .action(function(opts) {
        corrected(opts);
    });

program.command('del')
    .description('corrected redis openid data')
    .action(function(opts) {
        del(opts);
    });

program.command('*')
    .action(function() {
        console.log(COMMAND_ERROR);
    });

program.parse(process.argv);

function initRedis(opts, next) {
    console.warn('connect to %s:%s redis server.', opts.host, opts.port);
    var options = {};
    if(!!opts.user) {
        options.auth_pass = opts.user;
    }
    var client = redis.createClient(opts.port, opts.host, options);

    client.once("ready", function() {
        console.info("redis %s:%s connected", opts.host, opts.port);
        next(null, client);
    });
    client.on("error", function(err) {
        console.error("redis %s:%s connect error, stack:%j" , opts.host, opts.port, err);
        next('error', null);
    });
}

function abort(str) {
    console.error(str);
    process.exit(1);
}

function isOpenId(client, aKey, next){
    async.waterfall([
        function(callback){
            client.send_command('type', [aKey], callback);
        }
    ], function(err, type){
        next(err, type === 'zset' ? aKey : null);
    });
}

function readFile(filepath, next){
    var data = fs.readFileSync(filepath);
    try{
        data = JSON.parse(data);
        next(null, data);
    }catch(e){
        next(e, null);
    }
}

function writeFile(filepath, openids, next){
    var fd = fs.openSync(filepath, 'w+');
    if (!fd){
        next('error', null);
        return;
    }
    fs.writeSync(fd, JSON.stringify(openids));
    next(null, null);
}

var count = 0;
var curScan = 0;

function exp(client, client1){
    if (count % 1000 == 0){
        console.warn('当前数量：' + count);
    }
    client.send_command('scan', [curScan], function(err, data){
        if (!!err){
            console.error("redis send command occur error:%j" , err);
            return;
        }
        var scan = Number(data[0]);
        if (isNaN(scan)){
            abort('export data error.');
        }
        curScan = scan;
        if (!data[1] || !data[1].length){
            if (!curScan){
                abort('export data success.');
            }
            console.warn("not need export any data.");
            exp(client, client1);
        } else {
            //console.info("begin export data...");

            //var openids = [];

            var latch = countDownLatch.createCountDownLatch(data[1].length, function(){
                if (!curScan)
                    abort('export data success.');
                else
                    exp(client, client1);
            });

            for (var i = 0, j = data[1].length; i < j; ++i){
                isOpenId(client, data[1][i], function(err, key){
                    if (!!err){
                        abort('export error.');
                    }
                    if (!!key) {
                        if (key.indexOf(':') >= 0){
                            console.warn('key 包含冒号:%', key);
                            latch.done();
                        } else {
                            //console.info("get open id:%s", key);
                            //openids.push(key);
                            //console.info("import open id:[%s]", key);
                            client1.exists('area:' + key, function(err, exist){
                                if (!!err){
                                    abort('import error.');
                                }
                                if (!exist){
                                    client1.zadd('area:' + key, Date.now(), 'area-1', function(err){
                                        if (!!err){
                                            abort('import error.');
                                        }
                                        ++count;
                                        latch.done();
                                    });
                                } else {
                                    latch.done();
                                }
                            });
                        }
                    } else {
                        latch.done();
                    }
                });
            }
        }
    });
};

function _corrected(client1){
    if (count % 1000 == 0){
        if (!!count)
            console.warn('当前数量：' + count);
    }
    client1.send_command('scan', [curScan], function(err, data){
        if (!!err){
            console.error("redis send command occur error:%j" , err);
            return;
        }
        var scan = Number(data[0]);
        if (isNaN(scan)){
            abort('export data error.');
        }
        curScan = scan;
        if (!data[1] || !data[1].length){
            if (!curScan){
                abort('export data success--.');
            }
            console.warn("not need corrected any data.");
            _corrected(client1);
        } else {
            var latch = countDownLatch.createCountDownLatch(data[1].length, function(){
                if (!curScan)
                    abort('export data success.');
                else
                    _corrected(client1);
            });

            for (var i = 0, j = data[1].length; i < j; ++i){
                isOpenId(client1, data[1][i], function(err, key){
                    if (!!err){
                        abort('export error.');
                    }
                    if (!!key) {
                        if (key.indexOf('area:') >= 0){
                            __corrected(client1, key, function(err){
                                if (!!err){
                                    abort('export error.');
                                }
                                latch.done();
                            });
                        } else {
                            latch.done();
                        }
                    } else {
                        latch.done();
                    }
                });
            }
        }
    });
}

function __corrected(client1, key, callback){
    client1.exists(key, function(err, exist){
        if (!!err){
            abort('import error.');
        }
        if (!!exist){
            client1.ZRANGE(key, 0, -1, 'WITHSCORES', function(err, result){
                if (!!err){
                    abort('import error.');
                }
                if (!result || !result.length){
                    callback();
                    return;
                }
                if (result[0] === 'area-2'){
                    console.warn('%j------2区', key);
                    client1.del(key, function(err){
                        if (!!err){
                            abort('import error.');
                        }
                        client1.zadd(key, Date.now(), 'area-1', function(err){
                            if (!!err){
                                abort('import error.');
                            }
                            ++count;
                            callback();
                        });
                    });
                } else {
                    //console.warn('%j------1区', key);
                    callback();
                }
            });
        } else {
            callback();
        }
    });
}

function corrected(opts){
    initRedis({
        "user" : "7bc3e024afec4e69:Hortor2014",
        host : "7bc3e024afec4e69.m.cnqda.kvstore.aliyuncs.com",
        port : 6379
    }, function(err, client1){
        _corrected(client1);
    });
}

function _del(client){
    var list = ["otVZyt80-4WYjs-BNrmaqKK2S2lw",
        "otVZyt8ku8hqEGTeoCloqulPIrdI",
        "otVZytydJSka7_pso3ZdQpMPuhOE",
        "otVZyt6p2IKUawgnryct8SJNuJSE",
        "otVZyt_q1gUk5m-Q4k8M0Q2pzB2E",
        "otVZytwuM5BtucV1YO830RBzABr0",
        "otVZyt-3qNm0ffgTXpeMpZy0O75o",
        "otVZyt-3qNm0ffgTXpeMpZy0O75o",
        "otVZyt2S1s-PSTvmRzdCaFFJEXRA",
        "otVZytz0GOqZIWWpm74B8DzTTkHw",
        "otVZyt4j4Wivn3YG-pYerKTTXLY8",
        "otVZyt293wMzsHAOFQ74SBjckcsU",
        "otVZytwbN-HpMsjbId5ObrcyoS5g",
        "otVZytwbN-HpMsjbId5ObrcyoS5g",
        "otVZyt53wLLlFwmfW44yWd1gEQD0",
        "otVZyt6UiW1wdGz0WLqBDB8BK_QU",
        "otVZyt_zoZbU4_Pkqxrq2la1qzY0",
        "otVZytz0GOqZIWWpm74B8DzTTkHw",
        "otVZyt_zoZbU4_Pkqxrq2la1qzY0",
        "otVZyt-KSCxDD-M6uIQnoOIV8xxE",
        "otVZyt-KSCxDD-M6uIQnoOIV8xxE",
        "otVZyt4kPEEspM838iR6xjJyskvY",
        "otVZytx_mCFHxaJ-5jI2oiZwgRLY",
        "otVZytx_mCFHxaJ-5jI2oiZwgRLY",
        "otVZytx_mCFHxaJ-5jI2oiZwgRLY",
        "otVZytx_mCFHxaJ-5jI2oiZwgRLY",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt7QT0xR8aNI1tYAfhvqV3ec",
        "otVZyt5z4kGQODba7akD7JQ8qIWI",
        "otVZytz1AyNvEafeaIBCahHCYJ1k",
        "otVZytzdIo4WJcIMs4K_549QPX48",
        "otVZyt4NSJA4fXzCYTlnXw30esX8",
        "otVZyt4NSJA4fXzCYTlnXw30esX8",
        "otVZytxKUCSS4pm9T6P21ynHksdM",
        "otVZytw3B30Sej9k2Y4-Q5UM3xT4",
        "otVZyt4SrZWCtbkZY7iZJ1cf2HaM",
        "otVZyt4SrZWCtbkZY7iZJ1cf2HaM",
        "otVZytw3B30Sej9k2Y4-Q5UM3xT4",
        "otVZyt4SrZWCtbkZY7iZJ1cf2HaM",
        "otVZyt0J55U2Zk2e5xP2oUxyUuYM",
        "otVZytw3B30Sej9k2Y4-Q5UM3xT4",
        "otVZyt4GPwCN-j8c8DoSqkBfRpu0",
        "otVZyt-EtWxm_a7_F2-aEhWyM-rU",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZytx1WArrSaTNfY-poz2KWHFo",
        "otVZyt6hnipBtsDMVcRio8PwNkfo",
        "otVZytwh9RI52IbNrQ05ZjsFRbtA",
        "otVZyt5tPldwztdutZyJUb5hAAIo",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt3nLoqHV1viw54iCjMAvu48",
        "otVZyt6PSjtyRIbU0geKEJ4cWjR4",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt-EtWxm_a7_F2-aEhWyM-rU",
        "otVZyt1cWS1Lj7GQfFv2tjbBiwd4",
        "otVZyt-EtWxm_a7_F2-aEhWyM-rU",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt6duXv4EZwR3za6kb4DKoXM",
        "otVZyt3M3sKWvZV6JGp9asb45Cho",
        "otVZyt9DEiVQmYHNHJHfNLhznYpc",
        "otVZyt9DEiVQmYHNHJHfNLhznYpc",
        "otVZyt1v6QiJ236WUV4W8AAX-lEM",
        "otVZyt1v6QiJ236WUV4W8AAX-lEM",
        "otVZyt4iURsaCG8-1WqVr-eh_4k4",
        "otVZyt367GYDYbGhBK3SLUUulOso",
        "otVZytwmlyKvjM23V-wYTGm5F5jQ",
        "otVZytwmlyKvjM23V-wYTGm5F5jQ",
        "otVZyt3lhStfXkRNJkpSyPPHA22w",
        "otVZyt5Yg_VCDYdYalMjQePVhtCY",
        "otVZyt5Yg_VCDYdYalMjQePVhtCY",
        "otVZyt5Yg_VCDYdYalMjQePVhtCY",
        "otVZyt-Lg47zk-FfxIEgIjTM_LdY",
        "otVZyt_BZMJa-pFDAEnMix8YuAks",
        "otVZyt_6_mUOALZOBKg8pz3IBSok",
        "otVZyt8H1kYYKRj9MhTsT6At9HHo",
        "otVZyt_J9aZhKEjMz66v4Co0VBlc",
        "otVZytw4Id4Z-LXIYW6hfvzWfTyU",
        "otVZyt9BK9JQlraTSdyWDY8yPSZg",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt13q85h27d0hJGM_ZRGlvdo",
        "otVZyt25H2P1EiYByGsukZclNccE",
        "otVZyt6rGAae1-9kJHmWPKvP6W4U",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt220T5leiqvcIMJz_kZWdrw",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt0IXFPvvag8ID4bUUcb3ZhI",
        "otVZyt1KExpTuAkTuH9iyNSi5Pkw",
        "otVZytz35d3JFSy26aZVRXq3jZLE",
        "otVZyt448-qcoDUEnTCkAzoF1sW0",
        "otVZytxRpcUQVHPXIWR19tzSIFvw",
        "otVZytxRpcUQVHPXIWR19tzSIFvw",
        "otVZyt4x8xYpFn1vjC0sE_mq9dmI",
        "otVZyt2pUrGfyh-M1t4jXkfH3uQU",
        "otVZyt2pUrGfyh-M1t4jXkfH3uQU",
        "otVZyt2pUrGfyh-M1t4jXkfH3uQU",
        "otVZyt4Ix_AENsV-S9l9Gtk-9mfg",
        "otVZyt4Ix_AENsV-S9l9Gtk-9mfg",
        "otVZytyH52kukyBsEc5msOySVUks",
        "otVZyt262DHW_4Ky4Kl3Of-s-3ds"
    ];

    var latch = countDownLatch.createCountDownLatch(list.length, function(){
        abort('del data success.');
    });

    for (var i = 0, j = list.length; i < j; ++i){
        var key = list[i];
        if (!!key) {
            __del(client, 'area:' + key, function(){
                latch.done();
            });
        } else {
            latch.done();
        }
    }
}

function __del(client, key, callback){
    client.exists(key, function(err, exist){
        if (!!err){
            abort('del error.');
        }
        if (!!exist){
            client.del(key);
        }
        callback();
    });
}

function del(opts){
    initRedis({
        "user" : "7bc3e024afec4e69:Hortor2014",
        host : "7bc3e024afec4e69.m.cnqda.kvstore.aliyuncs.com",
        port : 6379
    }, function(err, client){
        _del(client);
    });
}

/**
 * 导出所有的open id数据
 * @param opts
 */
function exportData(opts) {

    initRedis(opts, function(err, client){
        if (!!err){
            return;
        }

        initRedis({
            "user" : "7bc3e024afec4e69:Hortor2014",
            host : "7bc3e024afec4e69.m.cnqda.kvstore.aliyuncs.com",
            port : 6379
        }, function(err, client1){
            exp(client, client1);
        });
    });
}

function importData(opts){
    if(!fs.existsSync(opts.filepath)) {
        abort(opts.filepath + ' does not exist.');
    }
    initRedis(opts, function(err, client){
        if (!!err){
            return;
        }

        readFile(opts.filepath, function(err, data){
            if (!!err){
                console.error("read data file occur error:%j" , err);
                return;
            }
            if (!data || !data.length){
                console.warn("not need import any data.");
                return;
            }
            console.info("begin import data...");

            var latch = countDownLatch.createCountDownLatch(data.length, function(){
                abort('import data success.');
            });

            for (var i = 0, j = data.length; i < j; ++i){
                if (!data[i]) {
                    latch.done();
                    continue;
                }
                console.info("import open id:[%s]", data[i]);
                client.zadd('area:' + data[i], Date.now(), opts.areaId, function(err){
                    if (!!err){
                        abort('import error.');
                    }
                    latch.done();
                });
            }
        });

        client.send_command('keys', [OPENID_PATTERN], function(err, data){
            if (!!err){
                console.error("redis send command occur error:%j" , err);
                return;
            }
            if (!data || !data.length){
                console.warn("not need export any data.");
                return;
            }

            console.info("begin export data...");

            var openids = [];

            var latch = countDownLatch.createCountDownLatch(data.length, function(){
                console.info("begin write data...");
                writeFile(opts.filepath, openids, function(err){
                    if (!!err){
                        abort('write error.');
                    }
                    console.info("write data end.");
                    abort('export data success.');
                });
            });

            for (var i = 0, j = data.length; i < j; ++i){
                isOpenId(client, data[i], function(err, key){
                    if (!!err){
                        abort('export error.');
                    }
                    if (!!key) {
                        console.info("get open id:%s", key);
                        openids.push(key);
                    }
                    latch.done();
                });
            }
        });
    });
}