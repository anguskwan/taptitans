/**
 * Created by lhb on 15/10/26.
 */
var tt;
(function (tt) {
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(name) {
            _super.call(this);
            this.autoRemove = true;
            this._isLoop = this.autoRecycle = false;
            if (name) {
                this.load(name);
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }
        var __egretProto__ = MovieClip.prototype;
        MovieClip.unload = function (name) {
            this._mcFactories[name] = null;
        };
        MovieClip.preload = function (name) {
            if (!this._mcFactories[name]) {
                RES.getResAsync(name + "_json", dummy_func, null);
                RES.getResAsync(name + "_png", dummy_func, null);
            }
        };
        __egretProto__.load = function (name) {
            var factory = MovieClip.getFactory('mc');
            if (factory) {
                this._isDummy = false;
                var data = factory.generateMovieClipData(name);
                this._clip = new egret.MovieClip(data);
                this.addChild(this._clip);
                this._clip.addEventListener(egret.Event.COMPLETE, this.onAnimationComplete, this);
            }
            else {
                this._isDummy = true;
                egret.setTimeout(this.onAnimationComplete, this, 1000);
            }
        };
        Object.defineProperty(__egretProto__, "frameRate", {
            get: function () {
                return null == this._clip ? 0 : this._clip.frameRate;
            },
            set: function (rate) {
                if (null != this._clip) {
                    this._clip.frameRate = rate;
                }
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.play = function (loop, cb, cbTime) {
            if (loop === void 0) { loop = false; }
            if (null != this._clip) {
                this._isLoop = loop;
                this._clip.gotoAndPlay(-1, loop ? -1 : 1);
                if (cb) {
                    egret.setTimeout(function () {
                        Util.invokeCallback(cb);
                    }, this, this._clip.totalFrames / this._clip.frameRate * 1000 * cbTime);
                }
            }
        };
        __egretProto__.stop = function () {
            if (null != this._clip) {
                this._clip.stop();
            }
        };
        __egretProto__.setOfflineRender = function (isOffline) {
            if (this._clip) {
            }
        };
        __egretProto__.onRemovedFromStage = function () {
            if (this.autoRecycle && !this._isDummy) {
                pool.recycleMovieClip(this);
            }
        };
        __egretProto__.onAnimationComplete = function () {
            if (!this._isLoop) {
                if (this.autoRemove) {
                    if (this.parent instanceof egret.gui.UIAsset) {
                    }
                    else {
                        this.parent.removeChild(this);
                    }
                }
                var e = new egret.Event(MovieClip.COMPLETED_EVENT);
                this.dispatchEvent(e);
            }
        };
        MovieClip.getFactory = function (name) {
            var factory = MovieClip._mcFactories[name];
            if (!factory) {
                var jsonRes = RES.getRes(name + "_json");
                var pngRes = RES.getRes(name + "_png");
                if (null == jsonRes || null == pngRes) {
                    MovieClip.preload(name);
                }
                factory = new egret.MovieClipDataFactory(jsonRes, pngRes);
                MovieClip._mcFactories[name] = factory;
            }
            return factory;
        };
        MovieClip._mcFactories = {};
        MovieClip.COMPLETED_EVENT = "ttMovieClipCompleted";
        return MovieClip;
    })(egret.DisplayObjectContainer);
    tt.MovieClip = MovieClip;
    MovieClip.prototype.__class__ = "tt.MovieClip";
})(tt || (tt = {}));
