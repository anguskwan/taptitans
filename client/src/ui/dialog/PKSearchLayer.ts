/**
 *
 * @author 
 *
 */
class PKSearchLayer extends egret.gui.SkinnableComponent {
    public btnBack: egret.gui.Button;
    public resetBtn:egret.gui.Button;
    public startBtn:egret.gui.Button;
    public startBigBtn:egret.gui.Button;
    public startGroup:egret.gui.Group;
    public startBigGroup:egret.gui.Group;
    public resetGroup:egret.gui.Group;
    public diamondGroup:egret.gui.Group;
    public bgImg:egret.gui.UIAsset;
    public iconSelfImg:egret.gui.UIAsset;
    public iconOppImg:egret.gui.UIAsset;
    public glassImg:egret.gui.UIAsset;
    public nameSelfLbl:egret.gui.Label;
    public nameOppLbl:egret.gui.Label;
    public attSelfLbl:egret.gui.Label;
    public attOppLbl:egret.gui.Label;
    public weaponSelfLbl:egret.gui.Label;
    public weaponOppLbl:egret.gui.Label;
    public coinOppLbl:egret.gui.Label;
    public relicOppLbl:egret.gui.Label;
    public progressGroup:uiskins.PKMoraleProgressGroup;
    public oppValue:any;

	public constructor(data) {
        super();
        this.oppValue = data;
        this.skinName = skins.dialog.PKSearchLayerSkin;
	}

    public childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchLayer,this);
        this.setBgImage();
        this.onSetSelf();
        this.onFindOpponent();
    }

    onShowGlassAni(){
        this.glassImg.visible = true;
        this.glassImg.x = 357;
        this.glassImg.y = 114;
        egret.Tween.get(this.glassImg,{loop:true}).to({x:347},200)
            .to({y:104},200)
            .to({x:357},200)
            .to({y:114},200);
    }

    onHideGlassAni(){
        egret.Tween.removeTweens(this.glassImg);
        this.glassImg.visible = false;
    }

    onFindOpponent(){
        if(!_.isEmpty(this.oppValue)){
            this.onSetOpponent();
            this.startGroup.visible = true;
            this.resetGroup.visible = true;
            this.startBtn.enabled = true;
            this.resetBtn.enabled = true;
        }
        else {
            this.onShowGlassAni();
            tt.BattleManage.findOpponent(function(data){
                if(data){
                    this.oppValue = data;
                    this.onSetOpponent();
                    this.startBtn.enabled = true;
                }
                else {
                    this.oppValue = {};
                    this.onSetOpponent();
                    this.startBtn.enabled = false;
                    var message = new MessageNotOpponentPanel();
                    gm.guiLayer.addElement(message);
                }
                tt.BattleManage.updateMorale(function(data){
                    this.resetBtn.enabled = true;
                    this.progressGroup.changeDataItem(data.morale,data.remain);
                }.bind(this));
                this.onHideGlassAni();
            }.bind(this),function(){}.bind(this));
        }
    }

    setIcon(type,avatar){
        if(avatar != ""){
            if(avatar == "icon_default"){
                this["icon" + type + "Img"].source = "icon_default";
            }
            else {
                var url = Util.getWechatUrlBySize(avatar,96);
                RES.getResByUrl(url, function(event:any) {
                    this["icon" + type + "Img"].source = event;
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
        }
    }

    setName(type,name){
        if(name != ""){
            this["name" + type + "Lbl"].text = name;
        }
    }

    setOppAttribute(){
        this.attOppLbl.text = Util.formatNumber(this.oppValue.fightValue || 0);
        this.weaponOppLbl.text = (this.oppValue.weapons || 0) + "";
    }

    setSelfAttribute(){
        this.attSelfLbl.text = Util.formatNumber(gm.dataManage.heroes.getFightValue());
        this.weaponSelfLbl.text = Util.formatNumber(gm.dataManage.heroes.getWeaponTotalNum());
    }

    onSetOpponent(){
        this.setIcon("Opp",this.oppValue.avatar || "icon_default");
        this.setName("Opp",this.oppValue.name || "英雄");
        this.setOppAttribute();
    }

    onSetSelf(){
        this.setIcon("Self",gm.dataManage.data.avatar || "");
        this.setName("Self",gm.dataManage.data.name || "英雄");
        this.setSelfAttribute();
    }

    setBgImage(){
        var url = Util.getImageUrl("pk_bg");
        RES.getResByUrl(url, function (event) {
            this.bgImg.source = event;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    onTouchLayer(event: egret.TouchEvent) {
        event.stopPropagation();
        if(event.target == this.btnBack) {
            this.progressGroup.onStopTime();
            gm.guiLayer.removeElement(this);
        }
        if(event.target == this.resetBtn && this.resetBtn.enabled){
            this.oppValue = {};
            this.startBtn.enabled = false;
            this.resetBtn.enabled = false;
            this.onSetOpponent();
            this.onFindOpponent();
        }
        if(event.target == this.startBtn && this.startBtn.enabled){
            if(this.isMoraleNotEnough()){
                alert("士气值不足。");
                return ;
            }
            gm.gameUI.showLoadingLayer();
            this.startBtn.enabled = false;
            tt.BattleManage.fightOpponent(this.oppValue.id,function(data){
                gm.dataManage.updateEquipValue(function(){
                    this.progressGroup.onStopTime();
                    gm.guiLayer.removeElement(this);
                    var ly = new PKCompleteLayer({
                        id:this.oppValue.id,
                        value:this.oppValue,
                        data:data
                    });
                    gm.guiLayer.addElement(ly);
                    gm.gameUI.hideLoadingLayer();
                }.bind(this),function(){
                    gm.gameUI.hideLoadingLayer();
                }.bind(this));
            }.bind(this),function(){
                gm.gameUI.hideLoadingLayer();
            }.bind(this));
        }
    }

    isMoraleNotEnough(){
        return gm.dataManage.data.morale <= 10;
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
    }

    public partRemoved(partName: string,instance: any): void {
        super.partRemoved(partName,instance);
    }
}
