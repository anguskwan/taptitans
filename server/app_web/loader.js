/**
 * Created by hortor on 16/3/23.
 */
var fs = require('fs');
var path = require('path');

module.exports.loadConfigBaseApp = function (context, key, val, env, reload, onload) {
    if (!env) {
        env = 'development';
    }
    var presentPath = path.join(__dirname, '..', 'config', env, path.basename(val));
    var realPath;
    if(fs.existsSync(presentPath)) {
        realPath = presentPath;
        context[key] = require(presentPath);

        if (!!onload)
            onload();
    } else {
        throw new Error('invalid configuration with file path:'+presentPath);
    }
    if(!!realPath && !!reload) {
        fs.watch(realPath, function (event) {
            delete require.cache[require.resolve(realPath)];
            module.exports.loadConfigBaseApp(context, key, val, env, event === 'rename', onload);
        });
    }
};

module.exports.load = function(mpath, context) {
    if(!mpath) {
        throw new Error('opts or opts.path should not be empty.');
    }

    try {
        mpath = fs.realpathSync(mpath);
    } catch(err) {
        throw err;
    }

    if(!isDir(mpath)) {
        throw new Error('path should be directory.');
    }

    return loadPath(mpath, context);
};

var loadFile = function(fp, context) {
    var m = requireUncached(fp);

    if(!m) {
        return;
    }

    if(typeof m === 'function') {
        // if the module provides a factory function
        // then invoke it to get a instance
        m = m(context);
    }

    return m;
};

var loadPath = function(path, context) {
    var files = fs.readdirSync(path);
    if(files.length === 0) {
        console.warn('path is empty, path:' + path);
        return;
    }

    if(path.charAt(path.length - 1) !== '/') {
        path += '/';
    }

    var fp, fn, m, res = {};
    for(var i=0, l=files.length; i<l; i++) {
        fn = files[i];
        fp = path + fn;

        if(!isFile(fp) || !checkFileType(fn, '.js')) {
            // only load js file type
            continue;
        }

        m = loadFile(fp, context);

        if(!m) {
            continue;
        }

        var name = m.name || getFileName(fn, '.js'.length);
        res[name] = m;
    }

    return res;
};

var checkFileType = function(fn, suffix) {
    if(suffix.charAt(0) !== '.') {
        suffix = '.' + suffix;
    }

    if(fn.length <= suffix.length) {
        return false;
    }

    var str = fn.substring(fn.length - suffix.length).toLowerCase();
    suffix = suffix.toLowerCase();
    return str === suffix;
};

var isFile = function(path) {
    return fs.statSync(path).isFile();
};

var isDir = function(path) {
    return fs.statSync(path).isDirectory();
};

var getFileName = function(fp, suffixLength) {
    var fn = path.basename(fp);
    if(fn.length > suffixLength) {
        return fn.substring(0, fn.length - suffixLength);
    }

    return fn;
};

var requireUncached = function(module){
    delete require.cache[require.resolve(module)];
    return require(module)
};
