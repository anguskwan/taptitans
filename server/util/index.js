/**
 * Created by silwings on 13-11-26.
 */

var activityHelper = require("./activityHelper");

exports.parseArgs = function(args) {
    var argsMap = {};
    var mainPos = 1;

    while (args[mainPos].indexOf('--') > 0) {
        mainPos++;
    }
    argsMap.main = args[mainPos];

    for (var i = (mainPos + 1); i < args.length; i++) {
        var arg = args[i];
        var sep = arg.indexOf('=');
        var key = arg.slice(0, sep);
        var value = arg.slice(sep + 1);
        if (!isNaN(Number(value)) && (value.indexOf('.') < 0)) {
            value = Number(value);
        }
        argsMap[key] = value;
    }

    return argsMap;
};

/**
 * Returns a random real number in [min, max)
 * @nosidesprites
 */
exports.randomReal = function(min, max) {
    return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer in [min, max]
 * Using Math.round() will give you a non-uniform distribution!
 * @nosidesprites
 */
exports.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * return true with given rate
 * @param rate: a [0, 1] rate
 */
exports.randomRate = function(rate) {
    return Math.random() < rate;
};

/**
 * random by given weight
 * @param {Array} array of weight
 * @returns {number} index of weight array
 */
exports.randomByWeights = function(weights) {
    var base = 0;
    for (var i = 0; i < weights.length; i++) {
        base += weights[i];
    }
    var r = this.randomReal(0, base);
    for (var j = 0, sum = 0; j < weights.length; j++) {
        if (r >= sum && r < sum + weights[j]) {
            return j;
        }
        sum += weights[j];
    }
    return -1;
};

/**
 * increment an object property as number
 * @param {Object} obj
 * @param {String} key
 * @param {Number} [count=1] count
 * @returns {Number}
 */
exports.incr = function(obj, key, count) {
    obj[key] = (obj[key] || 0) + (count || 1);
    return obj[key];
};

/**
 * setTimeout wrapper function, support random timeout
 * @param {Funciton} fn
 * @param {Number|Array}  timeout in second or an array of range
 * @param {Number} [timeoutMax=] if given, timeout random in [timeout, timeoutMax]
 * @returns {Object} timerId
 */
exports.scheduleOnce = function(fn, timeout, timeoutMax) {
    if (_.isArray(timeout)) {
        timeout = timeout[0];
        timeoutMax = timeout[1];
    }
    if (timeoutMax) {
        return setTimeout(fn, random.integer(Math.round(timeout * 1000), Math.round(timeoutMax * 1000)));
    } else {
        return setTimeout(fn, timeout * 1000);
    }
};

exports.arrayRemoveObject = function(arr, obj) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] == obj) {
            arr.splice(i, 1);
            break;
        }
    }
};

var vv2 = null;
exports.randomNormal = function(mean, stdev) {
    var u1, u2, v1, v2, s;
    if (mean === undefined) {
        mean = 0.0;
    }
    if (stdev === undefined) {
        stdev = 1.0;
    }
    if (vv2 === null) {
        do {
            u1 = Math.random();
            u2 = Math.random();

            v1 = 2 * u1 - 1;
            v2 = 2 * u2 - 1;
            s = v1 * v1 + v2 * v2;
        } while (s === 0 || s >= 1);

        vv2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
        return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
    }

    v2 = vv2;
    vv2 = null;
    return stdev * v2 + mean;
};


/**
 * Simply compares two string version values.
 *
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 *
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 *
 * @function
 * @param {String} left  Version #1
 * @param {String} right Version #2
 * @return {Integer|Boolean}
 * @author Alexey Bass (albass)
 * @since 2011-07-14
 */
exports.versionCompare = function(left, right) {
    if (typeof left + typeof right != 'stringstring')
        return false;

    var a = left.split('.')
        , b = right.split('.')
        , i = 0, len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }

    return 0;
};

exports.logPlayer = function(player) {
    if (!player) return {};
    player = _.pick(player, "uniqueId", "name", "uid");
    return player;
};

exports.getSkillsByPetId = function(petId, level) {
    var petMeta =  Conf.pet[petId];
    var levelMeta = Conf.petlevel[petId][level];
    var ret = [];
    for (var i = 1; i <= 2; i++) {
        var skillId = petMeta["skill" + i];
        if (skillId > 0) {
            ret.push({skillId: skillId, petId: petId, value: levelMeta["skill" + i]});
        }
    }
    return ret;
};

exports.parseJSON = function(jsonStr) {
    try {
        return JSON.parse(jsonStr);
    }
    catch (e) {
        return null;
    }
};

exports.remove_ids = function(obj) {
    if (!_.isObject(obj)) {return;}
    if (obj._id) {
        delete obj._id;
    }
    _.each(obj, function(v, k) {
        if (_.isArray(v) && v[1] && _.isObject(v[1])) {
            _.each(v, function(val, key) {
                if (val && val._id) {
                    delete val._id;
                }
            })
        }
    });
};

exports.packageRes = function(data) {
    this.remove_ids(data);
    return {
        code : 200,
        error : false,
        data : data ? data : void 0
    }
};

exports.toNumberArray = function(strArr) {
    _.each(strArr, function(v, k) {
        if (v){
            strArr[k] = parseInt(v);
        }
    });
};

exports.invokeCallback = function(cb) {
    if(!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};

exports.countOne = function(str) {
    return _.count(str, "1");
};

exports.log10 = function(val) {
    return Math.log(val) / Math.LN10;
};

exports.calcAlive = function(str1, str2) {
    var str = "";
    _.each(str1, function(v,k) {
        if (str2[k] == 0 || v == 0) {
            str += "0";
        } else {
            str += "1";
        }
    });
    return str;
};

exports.arraySum = function(arr) {
    return _.reduce(arr, function(memo, value){return memo+value}, 0) || 0;
};

exports.isChristmas = function() {
    //var day = moment().date();
    //var month = moment().month();
    //return month == 11 && day < 29 && day > 23;
    return activityHelper.hasActivityOpened(activityHelper.activityType.CHRISTMAS_DOUBLE_MONEY);
};

exports.isCatTime = function() {
    //var day = moment().date();
    //var month = moment().month();
    //return month == 1 && day < 13 && day > 6;
    return activityHelper.hasActivityOpened(activityHelper.activityType.CAT_GO);
};

exports.isDiamondTime = function() {
    //var day = moment().date();
    //var month = moment().month();
    //return month == 1 && day < 23 && day > 12;
    return activityHelper.hasActivityOpened(activityHelper.activityType.TOTAL_DIAMOND_CONSUMPTION);
};

var getPurchaseNum = function(count) {
    var meta = {
        311:18,
        301:12,
        302:30,
        303:68,
        304:168,
        305:328,
        306:648,
        312:6,
        313:88
    };
    var ret = 0;
    for (var k in count) {
        var val = meta[k] * count[k];
        ret += val;
    }
    return ret;
};