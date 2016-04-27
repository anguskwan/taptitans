/**
 *
 * @author 
 *
 */
class TopLayer extends egret.gui.SkinnableComponent {
    public topStageLy: TopStageTitleLayer;
    public progressBar: uiskins.TopHPProgressBar;
    public labelCoin: egret.gui.Label;
    public labelBoss: egret.gui.Label;
    public coinGroup: egret.gui.Group;
    public rankBtn:egret.gui.Button;
    public mailBtn:uiskins.StateButton;
    public achievementBtn:uiskins.StateButton;
    public challengeBossBtn:uiskins.StateButton;
    public bossTimeProgressBar:uiskins.TopBossTimeProgressBar;
    public bossTime:egret.Timer;
    public bossTimeLbl:egret.gui.Label;
    public tipAchieveImg:egret.gui.UIAsset;
    public tipMailImg:egret.gui.UIAsset;
    public stageGroup:egret.gui.Group;
    public handImg:egret.gui.UIAsset;
    public coinImg:egret.gui.UIAsset;
    public rankBestBtn:egret.gui.Button;
    public isChallengeBoss:boolean;
    public isEnterChallengeBoss:boolean;
    public midasTapGroup:egret.gui.Group;
    public midasTapLbl:egret.gui.BitmapLabel;
    public plusLbl:egret.gui.BitmapLabel;

    public constructor() {
        super();
        this.skinName = skins.mod.TopLayerSkin;
    }

    onRegister(){
        gm.registerMessage(consts.kMessageMonsterHPChange, this.refreshHPProgress, this);
        gm.registerMessage(consts.kMessageMissionComplete, this.refreshMissionLabel, this);
        //gm.registerMessage(consts.kMessageMissionComplete, this.changeChallengeBossBtn, this);
        gm.registerMessage(consts.kMessageKillDailyBoss, this.onSkillDailyBoss, this);
        gm.registerMessage(consts.kMessageOnBossEnter, this.changeChallengeBossBtn, this);
        gm.registerMessage(consts.kMessageBuyNewArtifact, this.refreshMissionLabel, this);
        gm.registerMessage(consts.kMessageDelArtifact, this.refreshMissionLabel, this);
        gm.registerMessage(consts.kMessageUpgradeArtifact, this.refreshMissionLabel, this);
        gm.registerMessage(consts.kMessageMoneyUpdate, this.refreshCoinLabel, this);
        gm.registerMessage(consts.kMessageGetAchievement, this.updateAchievementStatus, this);
        gm.registerMessage(consts.kMessagePrestige,this.onPrestige,this);
        gm.registerMessage(consts.kMessageOnMidasTap,this.onMidasTap,this);
        gm.registerMessage(consts.kMessageOnMidasTapFinish,this.onMidasTapFinish,this);
        gm.registerMessage(consts.kMessageIsUnReadMail,this.onSetMailStatus,this);
        gm.registerMessage(consts.kMessageNewMail,this.onNewMail,this);
    }

    onSkillDailyBoss(obj:any){
        this.leaveChallengeBoss(false);
        this.isChallengeBoss = false;
        if(obj && obj.data){
            switch (obj.data.type){
                case 'diamond':
                    this.showMessageDailyPanel("dialog_daily_diamond",obj.data.num);
                    break;
                case 'weapon':
                    this.showMessageDailyPanel("btn_weapon",1);
                    break;
            }
        }
    }

    showMessageDailyPanel(iconSource,num){
        var ly = new MessageDailyPanel(iconSource,num);
        gm.guiLayer.addElement(ly);
    }

    addMidasTap(){
        var icon = new egret.gui.UIAsset;
        icon.source = "btn_skill6";
        icon.scaleX = 0.5;
        icon.scaleY = 0.5;
        var plusLbl = this.plusLbl = new egret.gui.BitmapLabel();
        plusLbl.font = RES.getRes("font_yellow_fnt");
        plusLbl.text = "";
        var midasTapLbl = this.midasTapLbl = new egret.gui.BitmapLabel();
        midasTapLbl.font = RES.getRes("font_yellow_fnt");
        midasTapLbl.text = "" + gm.dataManage.tapsOfMidas;
        var group = this.midasTapGroup = new egret.gui.Group;
        var layout = new egret.gui.HorizontalLayout;
        group.layout = layout;
        group.horizontalCenter = 0;
        layout.gap = 3;
        layout.horizontalAlign = "center";
        layout.verticalAlign = "middle";
        group.addElement(plusLbl);
        group.addElement(icon);
        group.addElement(midasTapLbl);
        this.skin.addElement(group);
        group.x = this.x /2;
        group.y = 420;
        //group.x = -(20*_.size(num.toString()) + 25)/2;
        //group.y = btn.y;
        //Util.labelGoUpAndRemoveGUI(group, -30, 2000,function(){
        //    btn.parent.skin.removeElement(group);
        //}.bind(this));
    }

    addMidasTapAni(gold){
        egret.Tween.get(this.midasTapGroup)
            .wait(1000)
            .to({y:470},200)
            .to({y:this.coinGroup.y},400)
            .to({alpha:0},400)
            .call(function(){
                this.skin.removeElement(this.midasTapGroup);
                gm.dataManage.addMoney(gm.dataManage.midasGold, 'gold');
                gm.dataManage.midasGold = 0;
            }.bind(this));
    }

    onMidasTapFinish(obj:any){
        if(obj && obj.data){
            this.plusLbl.text = "+";
            this.midasTapLbl.text = Util.formatNumber(obj.data);
            this.addMidasTapAni(obj.data);
        }
    }

    onMidasTap(){
        if(gm.dataManage.tapsOfMidas == 1){
            this.addMidasTap();
        }
        this.midasTapLbl.text = "" + gm.dataManage.tapsOfMidas;
    }

    onPrestige(){
        this.init();
    }

    public childrenCreated() {
        super.childrenCreated();
        this.onRegister();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchDialog,this);
        this.progressBar.labelFunction = this.barLabelFunction;
        this.rankBtn.clickHandler = this.onRankBtnClick;
        this.rankBestBtn.clickHandler = this.onRankBestBtnClick;
        this.achievementBtn.clickHandler = this.onAchievementBtnClick;
        Util.initBtnAnchor(this.rankBtn);
        this.bossTime = new egret.Timer(1000,30);
        this.bossTime.addEventListener(egret.TimerEvent.TIMER,this.useBossTimeProgress,this);
        //skinName="@ButtonSkin('btn_task','btn_task','btn_task')"
        this.init();
        // mail
        this.onGetMails();
    }

    onGetMails(){
        gm.network.getMails(function(data){
            console.warn(data);
            gm.dataManage.mails = data;
            this.onSetMailStatus();
        }.bind(this))
    }

    isUnReadMail(){
        if(!_.isEmpty(gm.dataManage.mails)){
            var isRead = _.find(gm.dataManage.mails,function(v){return v.read == 0;}.bind(this));
            if(isRead){
                return true;
            }
            return false;
        }
        return false;
    }

    onSetMailStatus(){
        if(this.isUnReadMail()){
            this.tipMailImg.visible = true;
            this.mailBtn.setBtnSkinName("btn_mail_on");
        }
        else {
            this.tipMailImg.visible = false;
            this.mailBtn.setBtnSkinName("btn_mail_off");
        }
    }

    onNewMail(){
        this.tipMailImg.visible = true;
        this.mailBtn.setBtnSkinName("btn_mail_on");
    }

    init(){
        //is Challenge boss
        if(gm.dataManage.isBossStage()){
            this.initBossTimeStatus();
            this.leaveChallengeBoss(false);
            this.isEnterChallengeBoss = true;
        }
        else {
            this.initBossTimeStatus();
            this.initBossTimeProgress();
            this.hideHand();
            this.isEnterChallengeBoss = false;
        }
        this.refreshHPProgress();
        this.refreshCoinLabel();
        this.refreshMissionLabel();
        this.updateAchievementStatus();
        this.progressBar.nameLbl.text = this.getBossName();
    }

    changeChallengeBossBtn(){
        this.initBossTimeStatus();
        this.initBossTimeProgress();
        this.progressBar.nameLbl.text = this.getBossName();
    }

    updateAchievementStatus(){
        var isFind = _.find(Conf.achievements,function(v){
            return gm.dataManage.isAchievementRewardAvailable(v.id);
        }.bind(this));
        if(isFind){
            this.achievementBtn.setBtnSkinName("btn_task_hava");
            this.tipAchieveImg.visible = true;
        }
        else {
            this.achievementBtn.setBtnSkinName("btn_task");
            this.tipAchieveImg.visible = false;
        }
    }

    initBossTimeStatus(){
        if(gm.dataManage.isBossStage() || gm.dataManage.isDailyBoss){
            this.challengeBossBtn.visible = true;
            this.stageGroup.visible = false;
        }
        else {
            this.challengeBossBtn.visible = false;
            this.stageGroup.visible = true;
        }
    }

    initBossTimeProgress(){
        if(gm.dataManage.isBossStage() || gm.dataManage.isDailyBoss){
            if(gm.dataManage.isDailyBoss){ // is Daily boss
                this.isEnterChallengeBoss = false;
            }
            if(!this.isEnterChallengeBoss){
                this.challengeBoss(false);
                this.isChallengeBoss = true;
                this.isEnterChallengeBoss = true;
            }
        }
        else {
            this.leaveChallengeBoss(false);
            this.isEnterChallengeBoss = false;
        }
    }

    addBossTimeProgress(){
        var value = gm.dataManage.artifact.getArtifactValue(29);
        this.bossTimeProgressBar.maximum = Math.floor(300*(1 + value["effect"]));
        this.bossTimeProgressBar.value = Math.floor(300*(1 + value["effect"]));
        this.bossTimeProgressBar.cd = Math.floor(300*(1 + value["effect"]));
        this.bossTimeProgressBar.currCd = new Date().getTime();//Math.floor(300*(1 + value["effect"]));
        this.bossTimeProgressBar.slideDuration = 0;
        this.bossTime.delay = 100;
        this.bossTime.repeatCount = Math.floor(300*(1 + value["effect"]));
        this.bossTime.currentCount = 0;
        this.bossTimeLbl.text = _.sprintf("%.1f",300*(1 + value["effect"])/10);
        this.bossTime.reset();
        this.bossTime.start();
        //console.log("repeat count boss time" + Math.floor(300*(1 + value["effect"])));
    }

    useBossTimeProgress(event:egret.TimerEvent){
        //console.log( "start time " + new Date().getTime());
        var currTime = new Date().getTime();
        var cdTime = (currTime - this.bossTimeProgressBar.currCd)/100;
        var past = (this.bossTimeProgressBar.cd - cdTime)/10;
        this.bossTimeProgressBar.value = (this.bossTimeProgressBar.cd - cdTime);
        this.bossTimeLbl.text = _.sprintf("%.1f",past);
        if(past <= 0){
            this.bossTimeLbl.visible = false;
            this.leaveChallengeBoss(true);
            this.isChallengeBoss = false;
            if(gm.dataManage.isDailyBoss) {return ;}
            if(gm.dataManage.isBossStage() && this.isEnterChallengeBoss){
                if(!gm.dataManage.data.tutorials[consts.kTutorialKillBossPanel]){
                    var ly = new KillBossPanel();
                    gm.guiLayer.addElement(ly);
                    gm.dataManage.data.tutorials[consts.kTutorialKillBossPanel] = true;
                    //move hand
                }
            }
        }
        //console.log( "end time " + new Date().getTime());
    }

    tutorialMoveHand(){
        //if(gm.dataManage.isDailyBoss){return ;}
        if(gm.dataManage.isBossStage()){
            this.handImg.visible = true;
            egret.Tween.removeTweens(this.handImg);
            var tw = egret.Tween.get(this.handImg,{loop:true});
            tw.to({y:144},300).to({y:134},200);
        }
    }

    hideHand(){
        //if(gm.dataManage.isDailyBoss){return ;}
        this.handImg.visible = false;
        egret.Tween.removeTweens(this.handImg);
    }

    challengeBoss(isFightBoss?:any){
        this.challengeBossBtn.setBtnSkinName("btn_leave_war");
        if(isFightBoss){
            gm.dataManage.onFightBossEvent(true);
        }
        this.bossTimeLbl.visible = true;
        this.addBossTimeProgress();
        this.hideHand();
    }

    leaveChallengeBoss(isFightBoss?:any){
        this.challengeBossBtn.setBtnSkinName("btn_challenge_boss");
        if(isFightBoss){
            gm.dataManage.onFightBossEvent(false);
        }
        this.bossTimeProgressBar.value = 0;
        this.bossTimeProgressBar.slideDuration = 0;
        this.bossTime.reset();
        this.bossTimeLbl.visible = false;
        this.tutorialMoveHand();
    }

    changeChallengeBossBtnStatus(){
        if(this.isChallengeBoss){
            if(gm.dataManage.onFightBossEvent(false)){
                this.leaveChallengeBoss(false);
                this.tutorialMoveHand();
                this.isChallengeBoss = false;
            }
        }
        else {
            if(gm.dataManage.onFightBossEvent(true)){
                this.challengeBoss(false);
                this.isChallengeBoss = true;
            }
        }
    }

    onTouchDialog(event:egret.TouchEvent){
        event.stopPropagation();
        if(this.challengeBossBtn == event.target){
            this.changeChallengeBossBtnStatus();
        }
        if(this.rankBtn == event.target){
            //this.clickBtnAni(event.target);
        }
        if(this.mailBtn == event.target){
            this.showMailLayer();
        }
    }

    showMailLayer(){
        var ly = new MailLayer();
        gm.guiLayer.addElement(ly);
    }

    onAchievementBtnClick(event:egret.TouchEvent){
        event.stopPropagation();
        var ly = new AchievementLayer();
        gm.guiLayer.addElement(ly);
    }

    onRankBtnClick(event:egret.TouchEvent){
        event.stopPropagation();
        var ly = new RankLayer();
        gm.guiLayer.addElement(ly);
    }

    onRankBestBtnClick(event:egret.TouchEvent){
        event.stopPropagation();
        var ly = new RankBestLayer();
        gm.guiLayer.addElement(ly);
    }

    refreshHPProgress() {
        this.progressBar.maximum = gm.dataManage.isDailyBoss
            ? gm.dataManage.monsterMaxHp
            :gm.dataManage.getMonsterHPMax();
        this.progressBar.value = gm.dataManage.monsterHP;
    }

    getBossName(){
        var bossId = gm.gameScene.bossId;
        if(gm.dataManage.data.isChest){
            return "宝箱怪";
        }
        if (gm.dataManage.isDailyBoss) {
            return "牛头铠甲勇士";
        }
        return Conf.bossName[bossId].name
    }
    
    refreshMissionLabel() {
        this.labelBoss.text = gm.dataManage.data.mission + "/" + gm.dataManage.getMaxMission();
    }
    
    refreshCoinLabel(obj?:any) {
        if(obj && obj.data == "gold"){
            this.coinAni();
        }
        this.labelCoin.text = Util.formatNumber(gm.dataManage.data.gold);
    }

    coinAni(){
        egret.Tween.removeTweens(this.coinImg);
        this.scaleX = 1;
        this.scaleY = 1;
        var tw = egret.Tween.get(this.coinImg);
        tw.to({scaleX:1.6,scaleY:1.6},200)
            .to({scaleX:0.7,scaleY:0.7},100)
            .to({scaleX:1.3,scaleY:1.3},200)
            .to({scaleX:1,scaleY:1},200);
    }
    /**
    partAdded 是皮肤部件赋值到逻辑类的入口，你可以在这里进行
    必要的初始化操作。比如需要随屏幕改变组件的尺寸，写在这里
    可以避免写在 childrenCreated 中修改造成的多次测量。
            
            
    The method "partAdded" will be called just after the
    skin parts is assigned to the property. You can make
    changes will effect to the layout or other components.
    */
    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }
    
    public partRemoved(partName: string,instance: any): void{
        super.partRemoved(partName,instance);
    }
    
    private barLabelFunction(value:number, maximum:number):string {
        if (value <= 0) {
            return "0 HP";
        }
        if (value < 1) {
            return "0.5 HP"
        }
        return Util.formatNumber(value) + " HP";
    }
}
