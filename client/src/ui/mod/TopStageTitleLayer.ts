/**
 *
 * @author 
 *
 */
class TopStageTitleLayer extends egret.gui.SkinnableComponent {
    public currGroup: egret.gui.Group;
    public preGroup: egret.gui.Group;
    public nextGroup: egret.gui.Group;

    public currStage: egret.gui.Label;
    public preStage: egret.gui.Label;
    public nextStage: egret.gui.Label;

    public currImg: egret.gui.UIAsset;
    public preImg: egret.gui.UIAsset;
    public nextImg: egret.gui.UIAsset;

    public currAniGroup: egret.gui.Group;
    public preAniGroup: egret.gui.Group;
    public nextAniGroup: egret.gui.Group;

    public currAniStage: egret.gui.Label;
    public preAniStage: egret.gui.Label;
    public nextAniStage: egret.gui.Label;

    public currAniImg: egret.gui.UIAsset;
    public preAniImg: egret.gui.UIAsset;
    public nextAniImg: egret.gui.UIAsset;

    public constructor() {
        super();
        this.skinName = skins.mod.TopStageTitleLayerSkin;
    }

    onRegister(){
        gm.registerMessage(consts.kMessageStageComplete, this.nextMissionAni, this);
        gm.registerMessage(consts.kMessagePrestige,this.onPrestige,this);
    }

    onPrestige(){
        this.initAniGroup(false);
        this.initMission(gm.dataManage.data.stage);
    }
    
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }
        
    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
        
    public childrenCreated() {
        super.childrenCreated();
        this.onRegister();
        this.initAniGroup(false);
        this.initMission(gm.dataManage.data.stage);
    }

    public initAniGroup(visible){
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
    }

    public initGroup(visible){
        this.currGroup.visible = visible;
        this.preGroup.visible = visible;
        this.nextGroup.visible = visible;
    }

    getStageMission(stage){
        var setId = Util.modByLimit(stage, 5);
        //console.log("stage" + stage + "setId" + setId);
        return setId;
    }

    public initMission(stage){
        var setId = gm.dataManage.getStageSetId();
        if(stage == 1){
            //stage == 1 stage
            this.currStage.text = stage.toString();
            this.nextStage.text = (stage + 1).toString();
            this.preGroup.visible = false;
            //stage img
            this.currImg.source = "submap" + setId + "_" + this.getStageMission(stage);
            this.nextImg.source = "submap" + setId + "_" + this.getStageMission(stage + 1);
        //public currImg: egret.gui.UIAsset;
        //public preImg: egret.gui.UIAsset;
        //public nextImg: egret.gui.UIAsset;
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
    }

    public initMissionAni(stage){
        var setId = gm.dataManage.getStageSetId();
        if(stage == 1){
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
    }

    public nextMissionAni(){
        this.initAniGroup(true);
        this.initGroup(false);
        this.initMission(gm.dataManage.data.stage);
        this.initMissionAni(gm.dataManage.data.stage - 1);

        //next to next
        egret.Tween.get(this.nextGroup).wait(100).call(function(){
            this.nextGroup.visible = true;
        },this);
        //next to curr
        egret.Tween.get(this.nextAniGroup).to({x:this.currGroup.x},300).call(function(){
            this.currGroup.visible = true;
            this.nextAniGroup.visible = false;
        },this);
        //curr to pre
        egret.Tween.get(this.currAniGroup).to({x:this.preGroup.x},300).call(function(){
            this.preGroup.visible = true;
            this.currAniGroup.visible = false;
        },this);
        //pre to pre.x - 100
        egret.Tween.get(this.preAniGroup).to({x:this.preGroup.x - 30},100).call(function(){
            this.preAniGroup.visible = false;
        },this);

        //wait
    }
}
