/**
 * Created by lhb on 15/10/26.
 */

module pool {

    var bitmapPool = {};
    var bitmapTextPool = {};
    var movieClipPool = {};
    var armaturePool = {};

    export function createBitmap(name) {
        var obj : egret.Bitmap;
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

    export function recycleBitmap(obj) {
        var name = obj.__pool;
        if (name) {
            if (!bitmapPool[name]) {
                bitmapPool[name] = new egret.Recycler();
            }
            bitmapPool[name].push(obj);
        } else {
            console.warn("pool.recycle: Not recyclable.")
        }
    }

    export function createBitmapText(name) {
        var obj : egret.BitmapText;
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

    export function recycleBitmapText(obj) {
        var name = obj.__pool;
        if (name) {
            if (!bitmapTextPool[name]) {
                bitmapTextPool[name] = new egret.Recycler();
            }
            bitmapTextPool[name].push(obj);
        } else {
            console.warn("pool.recycle: Not recyclable.")
        }
    }

    export function createMovieClip(name) {
        var obj : tt.MovieClip;
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

    export function recycleMovieClip(obj) {
        var name = obj.__pool;
        if (name) {
            if (!movieClipPool[name]) {
                movieClipPool[name] = new egret.Recycler();
            }
            movieClipPool[name].push(obj);
        } else {
            console.warn("pool.recycle: Not recyclable.")
        }
    }

    export function createArmature(name) {
        var obj : tt.Armature;
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

    export function recycleArmature(obj) {
        var name = obj.__pool;
        if (name) {
            if (!armaturePool[name]) {
                armaturePool[name] = new egret.Recycler();
            }
            armaturePool[name].push(obj);
        } else {
            console.warn("pool.recycle: Not recyclable.")
        }
    }
}