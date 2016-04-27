/**
 * Created by lhb on 15/10/13.
 */
var ArtifactInfoLayer = (function (_super) {
    __extends(ArtifactInfoLayer, _super);
    function ArtifactInfoLayer(id) {
        _super.call(this);
        this.itemId = id;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = ArtifactInfoLayer.prototype;
    __egretProto__.onAddToStage = function () {
        this.showArtifactInfo();
    };
    __egretProto__.touchTap = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.status != "cycle") {
            return;
        }
        this.status = 'disappear';
        this.artifactArm.play('disappear');
        this.artifactArm.autoRemove = true;
        var timeout1 = egret.setTimeout(function () {
            Util.removeFromParent(_this._icon);
            Util.removeFromParent(_this._label);
            egret.clearTimeout(timeout1);
        }, this, 100);
        var timeout2 = egret.setTimeout(function () {
            Util.removeFromParent(_this);
            egret.clearTimeout(timeout2);
        }, this, 1000);
    };
    __egretProto__.showArtifactInfo = function () {
        gm.gameUI.showLoadingLayer();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onArtifactResourceLoadComplete, this);
        RES.loadGroup("getItemAnimation");
    };
    __egretProto__.onArtifactResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "getItemAnimation") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onArtifactResourceLoadComplete, this);
            gm.gameUI.hideLoadingLayer();
            this.status = "generation";
            var self = this;
            var armature = this.artifactArm = new tt.Armature('getItemAnimation');
            armature.play('generation');
            armature.defaultAnimation = 'cycle';
            this.addChild(armature);
            armature.x = gm.winSize.width / 2;
            armature.y = 300;
            egret.setTimeout(function () {
                self.status = 'cycle';
                var icon = _this._icon = new egret.Bitmap();
                icon.texture = RES.getRes(_this.getTextureName());
                icon.anchorX = icon.anchorY = 0.5;
                icon.x = -4;
                icon.y = -114;
                icon.scaleX = icon.scaleY = 1.6;
                armature.addChildAt(icon, 1);
                var name = _this.getLabelName();
                var label = _this._label = new egret.TextField();
                label.text = name;
                label.size = 30;
                label.textColor = 0xFF0000;
                label.anchorX = 0.5;
                label.y = 48;
                armature.addChildAt(label, 2);
            }, this, 350);
        }
    };
    __egretProto__.getTextureName = function () {
        return "artifact" + this.itemId;
    };
    __egretProto__.getLabelName = function () {
        return Conf.artifacts[this.itemId].name;
    };
    return ArtifactInfoLayer;
})(egret.DisplayObjectContainer);
ArtifactInfoLayer.prototype.__class__ = "ArtifactInfoLayer";
var HeroWeaponLayer = (function (_super) {
    __extends(HeroWeaponLayer, _super);
    function HeroWeaponLayer(id) {
        _super.call(this, id);
    }
    var __egretProto__ = HeroWeaponLayer.prototype;
    __egretProto__.getTextureName = function () {
        return "heroskill" + this.itemId + "_1";
    };
    __egretProto__.getLabelName = function () {
        return Conf.hero[this.itemId].name;
    };
    return HeroWeaponLayer;
})(ArtifactInfoLayer);
HeroWeaponLayer.prototype.__class__ = "HeroWeaponLayer";
var StageInfoLayer = (function (_super) {
    __extends(StageInfoLayer, _super);
    function StageInfoLayer(text) {
        _super.call(this);
        this.text = text;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = StageInfoLayer.prototype;
    StageInfoLayer.show = function (text) {
        var ly = new StageInfoLayer(text);
        gm.mainLayer.addChild(ly);
    };
    __egretProto__.onAddToStage = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("infoBoard");
    };
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName != "infoBoard") {
            return;
        }
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        var armature = new tt.Armature('infoBoard');
        armature.play('infoBoard');
        armature.autoRemove = true;
        this.addChild(armature);
        armature.x = gm.winSize.width / 2;
        armature.y = 300;
        egret.setTimeout(function () {
            var label = this.textLbl = new egret.TextField();
            label.text = this.text;
            label.textColor = 0x000000;
            label.size = 30;
            label.anchorX = 0.5;
            label.y = -100;
            armature.addChild(label);
        }.bind(this), this, 350);
        egret.setTimeout(function () {
            if (this.textLbl) {
                armature.removeChild(this.textLbl);
            }
        }.bind(this), this, 1500);
    };
    return StageInfoLayer;
})(egret.DisplayObjectContainer);
StageInfoLayer.prototype.__class__ = "StageInfoLayer";
