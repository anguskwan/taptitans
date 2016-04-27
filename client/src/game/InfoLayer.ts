/**
 * Created by lhb on 15/10/13.
 */

class ArtifactInfoLayer extends egret.DisplayObjectContainer {

    public itemId:number;
    private artifactArm;
    private status : string;

    public constructor(id) {
        super();
        this.itemId = id;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTap,this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {

        this.showArtifactInfo()
    }

    private touchTap(event) {
        event.stopPropagation();
        if (this.status != "cycle") {return;}
        this.status = 'disappear';
        this.artifactArm.play('disappear');
        this.artifactArm.autoRemove = true;
        var timeout1 = egret.setTimeout(() => {
            Util.removeFromParent(this._icon);
            Util.removeFromParent(this._label);
            egret.clearTimeout(timeout1);
        }, this, 100);
        var timeout2 = egret.setTimeout(()=> {
            Util.removeFromParent(this);
            egret.clearTimeout(timeout2);
        }, this, 1000);
    }

    public showArtifactInfo() {
        gm.gameUI.showLoadingLayer();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onArtifactResourceLoadComplete, this);
        RES.loadGroup("getItemAnimation");

    }

    private _icon : egret.Bitmap;
    private _label : egret.TextField;

    private onArtifactResourceLoadComplete(event) {
        if (event.groupName == "getItemAnimation") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onArtifactResourceLoadComplete, this);
            gm.gameUI.hideLoadingLayer();
            this.status = "generation";
            var self =this;
            var armature = this.artifactArm = new tt.Armature('getItemAnimation');
            armature.play('generation');
            armature.defaultAnimation = 'cycle';
            this.addChild(armature);
            armature.x = gm.winSize.width / 2;
            armature.y = 300;

            egret.setTimeout(() => {
                self.status = 'cycle';
                var icon = this._icon = new egret.Bitmap();
                icon.texture = RES.getRes(this.getTextureName());
                icon.anchorX = icon.anchorY = 0.5;
                icon.x = -4;
                icon.y = -114;
                icon.scaleX = icon.scaleY = 1.6;
                armature.addChildAt(icon, 1);

                var name = this.getLabelName();
                var label = this._label = new egret.TextField();
                label.text = name;
                label.size = 30;
                label.textColor = 0xFF0000;
                label.anchorX = 0.5;
                label.y = 48;
                armature.addChildAt(label, 2);
            }, this, 350);
        }
    }

    getTextureName() {
        return "artifact"+ this.itemId
    }

    getLabelName() {
        return Conf.artifacts[this.itemId].name
    }
}

class HeroWeaponLayer extends ArtifactInfoLayer {

    constructor(id) {
        super(id);
    }
    getTextureName() {
        return "heroskill"+ this.itemId + "_1"
    }

    getLabelName() {
        return Conf.hero[this.itemId].name
    }
}

class StageInfoLayer extends egret.DisplayObjectContainer {
    private text: string;
    private textLbl:egret.TextField;
    static show(text) {
        var ly = new StageInfoLayer(text);
        gm.mainLayer.addChild(ly);
    }
    public constructor(text) {
        super();
        this.text = text;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("infoBoard");
    }

    private onResourceLoadComplete(event) {
        if (event.groupName != "infoBoard") {return;}
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);

        var armature = new tt.Armature('infoBoard');
        armature.play('infoBoard');
        armature.autoRemove = true;
        this.addChild(armature);
        armature.x = gm.winSize.width / 2;
        armature.y = 300;
        egret.setTimeout(function(){
            var label = this.textLbl = new egret.TextField();
            label.text = this.text;
            label.textColor = 0x000000;
            label.size = 30;
            label.anchorX = 0.5;
            label.y = -100;
            armature.addChild(label);
        }.bind(this),this ,350);

        egret.setTimeout(function(){
            if(this.textLbl){
                armature.removeChild(this.textLbl);
            }
        }.bind(this),this,1500);
    }
}