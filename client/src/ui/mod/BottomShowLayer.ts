/**
 *
 * @author 
 *
 */
class BottomShowLayer extends egret.gui.SkinnableComponent {
    public currDps: egret.gui.Label;
    public heroDps: egret.gui.Label;
    public tapDamage:egret.gui.Label;

    public curRelic: egret.gui.Label;
    public curCrystal: egret.gui.Label;
    public curDiamond: egret.gui.Label;

    public tapCount:any;
    public isTapTouch:boolean;

    public groupTipsLabel:egret.gui.Group;
    public lbl_remainTime:egret.gui.Label;
    private timeoutTips = -1;
    private intervalEntry = -2;
    private intervalEntryTimeout = -3;
    
    public constructor() {
        super();
        this.tapCount = 0;
        this.isTapTouch = false;
        this.skinName = skins.mod.BottomShowLayerSkin;
    }   

    onRegister(){
        gm.registerMessage(consts.kMessageUpdateEquipValues, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageLevelUp, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageAddWeapon, this.refreshAllDamageLabel, this);
        gm.registerMessage(consts.kMessageUpgradeArtifact,this.refreshAllDamageLabel,this);
        gm.registerMessage(consts.kMessageBuyNewArtifact,this.refreshAllDamageLabel,this);
        gm.registerMessage(consts.kMessageDelArtifact,this.refreshAllDamageLabel,this);
        gm.registerMessage(consts.kMessageTapDamage,this.onTapDamage,this);
        gm.registerMessage(consts.kMessagePrestige,this.refreshAllDamageLabel,this);
        gm.registerMessage(consts.kMessageMasterSkillTypeBerserkerRage,this.refreshAllDamageLabel,this);
        
        gm.registerMessage(consts.kMessageRefreshFightLabelTIps,this.refreshLabelTips,this);

        gm.registerMessage(consts.kMessageMoneyUpdate,this.refreshUserInfoLabels,this);
    }   

    public refreshAllDamageLabel(){
        this.tapDamage.text = Util.formatNumber(gm.dataManage.master.updateTapDamage());
        this.heroDps.text = Util.formatNumber(gm.dataManage.heroes.getAllHeroDPS());
        this.onTapDamageTimer();
    }

    public refreshUserInfoLabels() {
        this.curDiamond.text = gm.dataManage.data.diamond;
        this.curCrystal.text = gm.dataManage.data.crystal;
        this.curRelic.text = Util.formatNumber(gm.dataManage.data.relic);
    }

    public onTapDamage(event){
        this.isTapTouch = true;
        this.tapCount += event.data;
        this.currDps.text = Util.formatNumber(this.tapCount + gm.dataManage.heroes.heroDpsCache);
    }

    /**
    所有子项和皮肤中的组件都已经创建完毕并完成测量，可以使用
            
    All the components in the children and skin have been
    created and measured, you can use them now.
    */
    public childrenCreated() {
        super.childrenCreated();
        this.onRegister();
        this.refreshAllDamageLabel();
        this.refreshUserInfoLabels();
        this.currDps.text = Util.formatNumber(gm.dataManage.heroes.heroDpsCache);

        //time
        var time = new egret.Timer(1000);
        time.addEventListener(egret.TimerEvent.TIMER,this.onTapDamageTimer,this);
        time.start();
        this.visible = true;

        //提示框
        this.refreshLabelTips();

    }

    public onTapDamageTimer(){
        if(this.tapCount < 1){
            this.isTapTouch = false;
        }
        if(this.isTapTouch){
            this.tapCount /= 2;
            this.currDps.text = Util.formatNumber(Math.floor(this.tapCount) + gm.dataManage.heroes.heroDpsCache);
        }
    }

    public refreshLabelTips() {
        this.groupTipsLabel.visible = false;
        var remainTime = gm.dataManage.data.remainAttMulTime;
        if (remainTime == 0) {
            return;
        }

        if (this.timeoutTips != - 1) {
            egret.clearTimeout(this.timeoutTips);
            egret.clearInterval(this.intervalEntry);
            egret.clearTimeout(this.intervalEntryTimeout);
            this.timeoutTips = -1;

        }

        this.groupTipsLabel.visible = true;
        this.timeoutTips = egret.setTimeout(function(){
            this.groupTipsLabel.visible = false;
        }.bind(this), this, remainTime); 

        //label
        this.intervalEntry = egret.setInterval(function () {
            gm.dataManage.data.remainAttMulTime = gm.dataManage.data.remainAttMulTime - 1000;
            var secNum =Math.floor( gm.dataManage.data.remainAttMulTime / 1000);
            var remainTimesStr = Util.formatTime(secNum, true);
            this.lbl_remainTime.text = remainTimesStr;
        }, this, 1000);   

        this.intervalEntryTimeout =  egret.setTimeout(()=>{
            this.groupTipsLabel.visible = false;
            gm.dataManage.data.remainAttMulTime = 0;
            egret.clearInterval(this.intervalEntry);
        }, this, remainTime);             
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
    
    public partRemoved(partName: string,instance: any): void {
        super.partRemoved(partName,instance);
    }
}