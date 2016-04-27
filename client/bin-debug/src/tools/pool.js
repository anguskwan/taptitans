/**
 * Created by lhb on 15/10/26.
 */
var pool;
(function (pool) {
    var bitmapPool = {};
    var bitmapTextPool = {};
    var movieClipPool = {};
    var armaturePool = {};
    function createBitmap(name) {
        var obj;
        if (bitmapPool[name]) {
            obj = bitmapPool[name].pop();
        }
        if (!obj) {
            obj = new egret.Bitmap();
            obj.texture = RES.getRes(name);
            obj.__pool = name;
        }
        return obj;
    }
    pool.createBitmap = createBitmap;
    function recycleBitmap(obj) {
        var name = obj.__pool;
        if (name) {
            if (!bitmapPool[name]) {
                bitmapPool[name] = new egret.Recycler();
            }
            bitmapPool[name].push(obj);
        }
        else {
            console.warn("pool.recycle: Not recyclable.");
        }
    }
    pool.recycleBitmap = recycleBitmap;
    function createBitmapText(name) {
        var obj;
        if (bitmapTextPool[name]) {
            obj = bitmapTextPool[name].pop();
        }
        if (!obj) {
            obj = new egret.BitmapText();
            obj.font = RES.getRes(name);
            obj.__pool = name;
        }
        return obj;
    }
    pool.createBitmapText = createBitmapText;
    function recycleBitmapText(obj) {
        var name = obj.__pool;
        if (name) {
            if (!bitmapTextPool[name]) {
                bitmapTextPool[name] = new egret.Recycler();
            }
            bitmapTextPool[name].push(obj);
        }
        else {
            console.warn("pool.recycle: Not recyclable.");
        }
    }
    pool.recycleBitmapText = recycleBitmapText;
    function createMovieClip(name) {
        var obj;
        if (movieClipPool[name]) {
            obj = movieClipPool[name].pop();
        }
        if (!obj) {
            obj = new tt.MovieClip(name);
            obj.autoRecycle = true;
            obj.__pool = name;
        }
        return obj;
    }
    pool.createMovieClip = createMovieClip;
    function recycleMovieClip(obj) {
        var name = obj.__pool;
        if (name) {
            if (!movieClipPool[name]) {
                movieClipPool[name] = new egret.Recycler();
            }
            movieClipPool[name].push(obj);
        }
        else {
            console.warn("pool.recycle: Not recyclable.");
        }
    }
    pool.recycleMovieClip = recycleMovieClip;
    function createArmature(name) {
        var obj;
        if (armaturePool[name]) {
            obj = armaturePool[name].pop();
        }
        if (!obj) {
            obj = new tt.Armature(name);
            obj.autoRecycle = true;
            obj.__pool = name;
        }
        return obj;
    }
    pool.createArmature = createArmature;
    function recycleArmature(obj) {
        var name = obj.__pool;
        if (name) {
            if (!armaturePool[name]) {
                armaturePool[name] = new egret.Recycler();
            }
            armaturePool[name].push(obj);
        }
        else {
            console.warn("pool.recycle: Not recyclable.");
        }
    }
    pool.recycleArmature = recycleArmature;
})(pool || (pool = {}));
