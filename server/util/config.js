/**
 * Created by Li Jie (lijie@hortorgames.com) on 14-7-15.
 * Copyright (c) 2014 Hortor Games. All rights reserved.
 */

var fs = require("fs");
var path = require("path");
var later = require("later");

/**************************************
 *             init nconf             *
 **************************************/
var conf = module.exports = require("nconf");
if (!env) {
    console.log("usage: node [your app] --env [local|test|production]");
    process.exit(-1);
}


/**************************************
 *   load data conf in conf_shared    *
 **************************************/

var sched = later.parse.text('every 5 min');
later.setInterval(loadAllConf, sched);

function loadAllConf(isFirstLoad) {
    console.log("[Config] ******load all conf, env:" + env);
    // load nconf
    var appPath = path.join(__dirname, "..", "config", env, "app.json");
    if (fs.existsSync(appPath)){
        conf.file('server config', {
            file: appPath
        });
    }
    // load json configs
    var jsons = fs.readdirSync("./config_game");
    jsons = _.reject(jsons, function(n) {
        return path.extname(n) !== ".json" || n == "config.json";
    });
    _.each(jsons, function(fname) {
        var name = path.basename(fname, ".json");
        var json = fs.readFileSync(path.join("./config_game", fname), "utf-8");
        if (isFirstLoad && conf[name]) {
            console.log("[CONF] Warning overriding nconf's property: " + name);
        }
        conf[name] = JSON.parse(json);
    });

    // load config
    var config = fs.readFileSync("config_game/config.json", "utf-8");
    _.extend(conf, JSON.parse(config));

    conf.heroSkill = groupBy(conf.heroSkill, "hero", "index");
    conf.simpleActivity = pick(conf.activity, ["beginTime", "endTime"], function(time){
        return new Date(time).getTime();
    });
}

loadAllConf(true);

function pick(obj, fileds, cb){
    var ret = {};
    if (!!obj){
        for (var key in obj){
            if (!obj.hasOwnProperty(key)) continue;
            if (!obj[key]) continue;
            ret[key] = {};
            _.each(fileds, function(filed){
                ret[key][filed] = cb(obj[key][filed]);
            });
        }
    }
    return ret;
}

function groupBy(obj, key1, key2) {
    var ret = {};
    _.each(obj, function(meta) {
        ret[meta[key1]] = ret[meta[key1]] || {};
        ret[meta[key1]][meta[key2]] = meta;
    });
    return ret;
}
