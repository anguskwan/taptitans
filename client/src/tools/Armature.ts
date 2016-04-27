/**
 * Created by lhb on 15/10/26.
 */

module tt {

    var dbFactory = null;
    function getDBFactory() {
        if (!dbFactory) {
            dbFactory = new dragonBones.EgretFactory();
        }
        return dbFactory;
    }

    export class Armature extends egret.DisplayObjectContainer {

        private _live:boolean;
        private _name: string;
        private _token: egret.Bitmap;
        private _armature:dragonBones.Armature;
        private _defaultAnim: string;
        public autoRecycle:boolean;
        public autoRemove:boolean;
        public FRAME_EVENT = "ttArmatureFrameEvent";
        public ANIM_END = "ttArmatureAnimEnd";
        private _show_body = true;
        private _pendingAnim: boolean;
        private _currAnimName:string;
        private _currAnimLoop:boolean;
        private _token_src: string;
        private _sub_armatures: any;
        private _token_anchor: egret.Point;
        private _token_offset: egret.Point;


        constructor(name) {
            super();
            this._name = name;
            this._token_src = null;
            this._sub_armatures = null;
            this.autoRecycle = false;
            this._token_anchor = new egret.Point(0.5, 0.5);
            this._token_offset = new egret.Point(0,0);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
        }

        public set defaultAnimation(name:string) {
            this._defaultAnim = name;
        }

        public get defaultAnimation():string {
            return this._defaultAnim;
        }

        private onAddToStage() {
            this._live = true;
            var groupName = this.getGroupName();
            if (RES.isGroupLoaded(groupName)) {
                this.buildArmature();
            } else {
                this.addToken();
                this.createResGroup();
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.loadGroup(groupName);
            }
        }

        public loadChildArmatureGroup(nameArr, cb,override = false) {
            var group = [];
            var groupName = this._name+"_child_arm";
            _.each(nameArr, (name) => {
                group.push(name+"/skeleton_json", name+"/texture_json", name+"/texture_png")
            });
            RES.createGroup(groupName, group,override);
            var func = (event) => {
                if (event.groupName != groupName) {return;}
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, func, this);
                Util.invokeCallback(cb);
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, func, this);
            RES.loadGroup(groupName);
        }

        private onRemovedFromStage() {
            this._live = false;
            if (this._armature) {
                dragonBones.WorldClock.clock.remove(this._armature);
                if (this._sub_armatures) {
                    for (var b in this._sub_armatures)
                        dragonBones.WorldClock.clock.remove(this._sub_armatures[b]);
                    this._sub_armatures = null
                }
            }
            if (this.autoRecycle) {
                pool.recycleArmature(this);
            }
        }

        private onResourceLoadComplete(event) {
            if (event.groupName != this.getGroupName()) {return;}
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            if (!this._live) {return;}
            this.buildArmature();
            if (this._token) {
                this.removeChild(this._token);
                this._token = null;
            }
        }

        private loadArmature(name) {
            var dragonbonesData = RES.getRes(name + "/skeleton_json");
            var textureData = RES.getRes(name + "/texture_json");
            var texture = RES.getRes(name + "/texture_png");

            var dbFactory = getDBFactory();
            dbFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData), name);
            dbFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData), name);
            return dragonbonesData.armature[0].name;
        }

        private buildArmature() {
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
                this._armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, comp, null );
                this.preprocess();
                this._pendingAnim && this.invokeAnimation();
                if (!this._show_body) {
                    this._armature.display.visible = false;
                }
            }
        }

        private getGroupName() {
            return this._name + "_arm";
        }
        private createResGroup() {
            RES.createGroup(this.getGroupName(), [
                    this._name+"/skeleton_json",
                    this._name +"/texture_json",
                    this._name +"/texture_png"
            ]);
        }

        public setCustomToken(src, anchorX = 0.5, anchorY = 0.5, offsetX = 0, offsetY = 0) {
            this._token_src = src;
            this._token_anchor.x = anchorX;
            this._token_anchor.y = anchorY;
            this._token_offset.x = offsetX;
            this._token_offset.y = offsetY;
        }

        public currentAnimation() {
            return this._currAnimName;
        }

        public addChildArmature(boneName, armatureName, animationName) {
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
        }

        public hasAnimation(animName) {
            return this._armature ? this._armature.animation.hasAnimation(animName) : false;
        }

        public play(animName, loop = false) {
            this._pendingAnim = true;
            this._currAnimName = animName;
            this._currAnimLoop = loop;
            this.invokeAnimation();
        }

        public stop(animName, time) {
            time = time || 0;
            if (null != this._armature) {
                this._armature.animation.gotoAndStop(animName, time);
            }
        }

        private preprocess() {

        }

        private invokeAnimation() {
            if (null  != this._armature) {
                var playTimes = 1;
                if (this._currAnimLoop) {
                    playTimes = 0;
                }
                var state = this._armature.animation.gotoAndPlay(this._currAnimName,
                    -1, -1, playTimes);
                state.autoTween = false;
                this._pendingAnim = false;
            }
        }

        private addToken() {
            if (!this._token_src) {return;}
            this._token = new egret.Bitmap();
            this._token.texture = RES.getRes(this._token_src);
            this._token.anchorX = this._token_anchor.x;
            this._token.anchorY = this._token_anchor.y;
            this._token.x = this._token_offset.x;
            this._token.y = this._token_offset.y;
            this.addChild(this._token)
        }
    }

}