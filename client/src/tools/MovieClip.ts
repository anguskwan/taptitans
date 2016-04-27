/**
 * Created by lhb on 15/10/26.
 */

module tt {

    export class MovieClip extends egret.DisplayObjectContainer {

        private static _mcFactories = {};
        public static COMPLETED_EVENT = "ttMovieClipCompleted";
        private _isLoop;
        public autoRecycle;
        public autoRemove = true;

        constructor(name) {
            super();
            this._isLoop = this.autoRecycle = false;
            if (name) {
                this.load(name);
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this)
        }

        static unload(name) {
            this._mcFactories[name] = null;
        }

        static preload(name) {
            if (!this._mcFactories[name]) {
                RES.getResAsync(name+"_json", dummy_func, null);
                RES.getResAsync(name+"_png", dummy_func, null);
            }
        }

        private _isDummy;
        private _clip;

        public load(name) {
            var factory = MovieClip.getFactory('mc');
            if (factory) {
                this._isDummy = false;
                var data = factory.generateMovieClipData(name);
                this._clip = new egret.MovieClip(data);
                this.addChild(this._clip);
                this._clip.addEventListener(egret.Event.COMPLETE, this.onAnimationComplete, this)
            } else {
                this._isDummy = true;
                egret.setTimeout(this.onAnimationComplete, this, 1000);
            }
        }

        public get frameRate() {
            return null  == this._clip ? 0 : this._clip.frameRate;
        }

        public set frameRate(rate:number) {
            if (null != this._clip) {
                this._clip.frameRate = rate;
            }
        }

        public play(loop = false, cb?, cbTime?) {
            if (null != this._clip) {
                this._isLoop = loop;
                this._clip.gotoAndPlay(-1, loop?-1:1);
                if (cb) {
                    egret.setTimeout(() => {
                        Util.invokeCallback(cb);
                    }, this, this._clip.totalFrames / this._clip.frameRate * 1000 * cbTime);
                }
            }
        }

        public stop() {
            if (null != this._clip) {
                this._clip.stop();
            }
        }

        public setOfflineRender(isOffline) {
            if (this._clip) {
//                this._clip._is
            }
        }

        private onRemovedFromStage() {
            if (this.autoRecycle && !this._isDummy) {
                pool.recycleMovieClip(this);
            }
        }

        private onAnimationComplete() {
            if (!this._isLoop) {
                if (this.autoRemove) {
                    if (this.parent instanceof egret.gui.UIAsset) {
//                        this.parent.source = null;
                    } else {
                        this.parent.removeChild(this);
                    }
                }

                var e = new egret.Event(MovieClip.COMPLETED_EVENT);
                this.dispatchEvent(e);
            }
        }

        static getFactory(name) {
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
        }
    }
}
