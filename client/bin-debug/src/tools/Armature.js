/**
 * Created by lhb on 15/10/26.
 */
var tt;
(function (tt) {
    var dbFactory = null;
    function getDBFactory() {
        if (!dbFactory) {
            dbFactory = new dragonBones.EgretFactory();
        }
        return dbFactory;
    }
    var Armature = (function (_super) {
        __extends(Armature, _super);
        function Armature(name) {
            _super.call(this);
            this.FRAME_EVENT = "ttArmatureFrameEvent";
            this.ANIM_END = "ttArmatureAnimEnd";
            this._show_body = true;
            this._name = name;
            this._token_src = null;
            this._sub_armatures = null;
            this.autoRecycle = false;
            this._token_anchor = new egret.Point(0.5, 0.5);
            this._token_offset = new egret.Point(0, 0);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }
        var __egretProto__ = Armature.prototype;
        Object.defineProperty(__egretProto__, "defaultAnimation", {
            get: function () {
                return this._defaultAnim;
            },
            set: function (name) {
                this._defaultAnim = name;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.onAddToStage = function () {
            this._live = true;
            var groupName = this.getGroupName();
            if (RES.isGroupLoaded(groupName)) {
                this.buildArmature();
            }
            else {
                this.addToken();
                this.createResGroup();
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.loadGroup(groupName);
            }
        };
        __egretProto__.loadChildArmatureGroup = function (nameArr, cb, override) {
            var _this = this;
            if (override === void 0) { override = false; }
            var group = [];
            var groupName = this._name + "_child_arm";
            _.each(nameArr, function (name) {
                group.push(name + "/skeleton_json", name + "/texture_json", name + "/texture_png");
            });
            RES.createGroup(groupName, group, override);
            var func = function (event) {
                if (event.groupName != groupName) {
                    return;
                }
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, func, _this);
                Util.invokeCallback(cb);
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, func, this);
            RES.loadGroup(groupName);
        };
        __egretProto__.onRemovedFromStage = function () {
            this._live = false;
            if (this._armature) {
                dragonBones.WorldClock.clock.remove(this._armature);
                if (this._sub_armatures) {
                    for (var b in this._sub_armatures)
                        dragonBones.WorldClock.clock.remove(this._sub_armatures[b]);
                    this._sub_armatures = null;
                }
            }
            if (this.autoRecycle) {
                pool.recycleArmature(this);
            }
        };
        __egretProto__.onResourceLoadComplete = function (event) {
            if (event.groupName != this.getGroupName()) {
                return;
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            if (!this._live) {
                return;
            }
            this.buildArmature();
            if (this._token) {
                this.removeChild(this._token);
                this._token = null;
            }
        };
        __egretProto__.loadArmature = function (name) {
            var dragonbonesData = RES.getRes(name + "/skeleton_json");
            var textureData = RES.getRes(name + "/texture_json");
            var texture = RES.getRes(name + "/texture_png");
            var dbFactory = getDBFactory();
            dbFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData), name);
            dbFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData), name);
            return dragonbonesData.armature[0].name;
        };
        __egretProto__.buildArmature = function () {
            var self = this;
            function comp() {
                if (self._defaultAnim && !self.autoRemove) {
                    self._defaultAnim && self.play(self._defaultAnim, true);
                }
                var e = new egret.Event(self.ANIM_END);
                self.dispatchEvent(e);
                if (self.autoRemove) {
                    self.parent.removeChild(self);
                }
            }
            this.loadArmature(this._name);
            this._armature = getDBFactory().buildArmature(this._name);
            if (null != this._armature) {
                this.addChildAt(this._armature.display, 0);
                dragonBones.WorldClock.clock.add(this._armature);
                this._armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, comp, null);
                this.preprocess();
                this._pendingAnim && this.invokeAnimation();
                if (!this._show_body) {
                    this._armature.display.visible = false;
                }
            }
        };
        __egretProto__.getGroupName = function () {
            return this._name + "_arm";
        };
        __egretProto__.createResGroup = function () {
            RES.createGroup(this.getGroupName(), [
                this._name + "/skeleton_json",
                this._name + "/texture_json",
                this._name + "/texture_png"
            ]);
        };
        __egretProto__.setCustomToken = function (src, anchorX, anchorY, offsetX, offsetY) {
            if (anchorX === void 0) { anchorX = 0.5; }
            if (anchorY === void 0) { anchorY = 0.5; }
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            this._token_src = src;
            this._token_anchor.x = anchorX;
            this._token_anchor.y = anchorY;
            this._token_offset.x = offsetX;
            this._token_offset.y = offsetY;
        };
        __egretProto__.currentAnimation = function () {
            return this._currAnimName;
        };
        __egretProto__.addChildArmature = function (boneName, armatureName, animationName) {
            var bone = this._armature.getBone(boneName);
            if (bone) {
                var slot = bone.slot;
                this.loadArmature(armatureName);
                var child = getDBFactory().buildArmature(armatureName);
                slot.childArmature = child;
                this._sub_armatures = this._sub_armatures || [];
                this._sub_armatures.push(child);
                child.animation.gotoAndPlay(animationName, -1, -1, 0);
            }
        };
        __egretProto__.hasAnimation = function (animName) {
            return this._armature ? this._armature.animation.hasAnimation(animName) : false;
        };
        __egretProto__.play = function (animName, loop) {
            if (loop === void 0) { loop = false; }
            this._pendingAnim = true;
            this._currAnimName = animName;
            this._currAnimLoop = loop;
            this.invokeAnimation();
        };
        __egretProto__.stop = function (animName, time) {
            time = time || 0;
            if (null != this._armature) {
                this._armature.animation.gotoAndStop(animName, time);
            }
        };
        __egretProto__.preprocess = function () {
        };
        __egretProto__.invokeAnimation = function () {
            if (null != this._armature) {
                var playTimes = 1;
                if (this._currAnimLoop) {
                    playTimes = 0;
                }
                var state = this._armature.animation.gotoAndPlay(this._currAnimName, -1, -1, playTimes);
                state.autoTween = false;
                this._pendingAnim = false;
            }
        };
        __egretProto__.addToken = function () {
            if (!this._token_src) {
                return;
            }
            this._token = new egret.Bitmap();
            this._token.texture = RES.getRes(this._token_src);
            this._token.anchorX = this._token_anchor.x;
            this._token.anchorY = this._token_anchor.y;
            this._token.x = this._token_offset.x;
            this._token.y = this._token_offset.y;
            this.addChild(this._token);
        };
        return Armature;
    })(egret.DisplayObjectContainer);
    tt.Armature = Armature;
    Armature.prototype.__class__ = "tt.Armature";
})(tt || (tt = {}));
