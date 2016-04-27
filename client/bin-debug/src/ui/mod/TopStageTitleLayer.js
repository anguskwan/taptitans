/**
 *
 * @author
 *
 */
var TopStageTitleLayer = (function (_super) {
    __extends(TopStageTitleLayer, _super);
    function TopStageTitleLayer() {
        _super.call(this);
        this.skinName = skins.mod.TopStageTitleLayerSkin;
    }
    var __egretProto__ = TopStageTitleLayer.prototype;
    __egretProto__.onRegister = function () {
        gm.registerMessage(consts.kMessageStageComplete, this.nextMissionAni, this);
        gm.registerMessage(consts.kMessagePrestige, this.onPrestige, this);
    };
    __egretProto__.onPrestige = function () {
        this.initAniGroup(false);
        this.initMission(gm.dataManage.data.stage);
    };
    __egretProto__.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    __egretProto__.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onRegister();
        this.initAniGroup(false);
        this.initMission(gm.dataManage.data.stage);
    };
    __egretProto__.initAniGroup = function (visible) {
        this.currAniGroup.visible = visible;
        this.currAniGroup.x = this.currGroup.x;
        this.currAniGroup.y = this.currGroup.y;
        egret.Tween.removeTweens(this.currAniGroup);
        this.preAniGroup.visible = visible;
        this.preAniGroup.x = this.preGroup.x;
        this.preAniGroup.y = this.preGroup.y;
        egret.Tween.removeTweens(this.preAniGroup);
        this.nextAniGroup.visible = visible;
        this.nextAniGroup.x = this.nextGroup.x;
        this.nextAniGroup.y = this.nextGroup.y;
        egret.Tween.removeTweens(this.nextAniGroup);
    };
    __egretProto__.initGroup = function (visible) {
        this.currGroup.visible = visible;
        this.preGroup.visible = visible;
        this.nextGroup.visible = visible;
    };
    __egretProto__.getStageMission = function (stage) {
        var setId = Util.modByLimit(stage, 5);
        //console.log("stage" + stage + "setId" + setId);
        return setId;
    };
    __egretProto__.initMission = function (stage) {
        var setId = gm.dataManage.getStageSetId();
        if (stage == 1) {
            //stage == 1 stage
            this.currStage.text = stage.toString();
            this.nextStage.text = (stage + 1).toString();
            this.preGroup.visible = false;
            //stage img
            this.currImg.source = "submap" + setId + "_" + this.getStageMission(stage);
            this.nextImg.source = "submap" + setId + "_" + this.getStageMission(stage + 1);
        }
        else {
            //stage text
            this.currStage.text = stage.toString();
            this.preStage.text = (stage - 1).toString();
            this.nextStage.text = (stage + 1).toString();
            //stage img
            this.currImg.source = "submap" + setId + "_" + this.getStageMission(stage);
            this.preImg.source = "submap" + setId + "_" + this.getStageMission(stage - 1);
            this.nextImg.source = "submap" + setId + "_" + this.getStageMission(stage + 1);
        }
    };
    __egretProto__.initMissionAni = function (stage) {
        var setId = gm.dataManage.getStageSetId();
        if (stage == 1) {
            //stage == 1 stage
            this.currAniStage.text = stage.toString();
            this.nextAniStage.text = (stage + 1).toString();
            this.preAniGroup.visible = false;
            //stage img
            this.currAniImg.source = "submap" + setId + "_" + this.getStageMission(stage);
            this.nextAniImg.source = "submap" + setId + "_" + this.getStageMission(stage + 1);
        }
        else {
            this.currAniStage.text = stage.toString();
            this.preAniStage.text = (stage - 1).toString();
            this.nextAniStage.text = (stage + 1).toString();
            this.currAniImg.source = "submap" + setId + "_" + this.getStageMission(stage);
            this.preAniImg.source = "submap" + setId + "_" + this.getStageMission(stage - 1);
            this.nextAniImg.source = "submap" + setId + "_" + this.getStageMission(stage + 1);
        }
        //image
    };
    __egretProto__.nextMissionAni = function () {
        this.initAniGroup(true);
        this.initGroup(false);
        this.initMission(gm.dataManage.data.stage);
        this.initMissionAni(gm.dataManage.data.stage - 1);
        //next to next
        egret.Tween.get(this.nextGroup).wait(100).call(function () {
            this.nextGroup.visible = true;
        }, this);
        //next to curr
        egret.Tween.get(this.nextAniGroup).to({ x: this.currGroup.x }, 300).call(function () {
            this.currGroup.visible = true;
            this.nextAniGroup.visible = false;
        }, this);
        //curr to pre
        egret.Tween.get(this.currAniGroup).to({ x: this.preGroup.x }, 300).call(function () {
            this.preGroup.visible = true;
            this.currAniGroup.visible = false;
        }, this);
        //pre to pre.x - 100
        egret.Tween.get(this.preAniGroup).to({ x: this.preGroup.x - 30 }, 100).call(function () {
            this.preAniGroup.visible = false;
        }, this);
        //wait
    };
    return TopStageTitleLayer;
})(egret.gui.SkinnableComponent);
TopStageTitleLayer.prototype.__class__ = "TopStageTitleLayer";
