module uiskins {
	/**
	 *
	 * @author 
	 *
	 */
    export class MasterSkillItemRenderer extends egret.gui.ItemRenderer {
        public iconImg: egret.gui.UIAsset;
        public iconDisabled: egret.gui.Rect;
        public nameLbl: egret.gui.Label;
        public lvLbl: egret.gui.Label;
        public explainLbl: egret.gui.Label;
        public newTipImg:egret.gui.UIAsset;
        public btnItem: uiskins.CommonItemButton;
        public dataItem:any;
        public isPlayingAni:any;

        public constructor() {
            super();
            this.isPlayingAni = false;
            this.dataItem = {};
            this.skinName = skins.components.MasterSkillItemRendererSkin;
        }

        initData(){
            this.dataItem = {
                cost:this.getCost(),
                level:this.getSkillLevel(),
                value:this.getDescValue(),
                nextValue:this.getNextValue(),
                duration : this.getSkillDuration(),
                cd : this.getSkillCD()
            }
        }

        getName(){
            return Conf.masterSkill[this.data.id].name;
        }

        getCost(){
            return formula.masterSkillUpgradeCost(gm.dataManage.data, this.data.id);
        }

        getDescValue(){
            return formula.masterSkillValue(gm.dataManage.data, this.data.id);
        }

        getNextValue(){
            return Conf.masterSkill[this.data.id].upgrade;
        }

        getSkillLevel(){
            return gm.dataManage.data.masterSkills[this.data.id].level;
        }

        getSkillCD(){
            return formula.masterSkillCoolDown(gm.dataManage.data, this.data.id);
        }

        getSkillDuration(){
            return formula.masterSkillDuration(gm.dataManage.data,this.data.id);
        }

        isUnlock(){
            return gm.dataManage.master.isUnlockSkill(this.data.id);
        }

        isCostGold(cost){
            return gm.dataManage.data.gold >= cost;
        }

        upgradeAddDmg(dmg,id){
            var arr = [
                "",
                "+ %s",
                "+ %s",
                "+ %s%%",
                "+ %s%%",
                "+ %s%%",
                "+ %s%%"
            ];
            var showDmg = dmg;
            if(id > 2){
                showDmg = showDmg*100;
            }
            return _.sprintf(arr[id],showDmg);
        }

        upgradeDesc(dmg,id){
            var showDmg = dmg;
            if(id > 2){
                showDmg = showDmg*100;
            }
            return _.sprintf(Conf.masterSkill[id].desc,showDmg)
        }

        masterSkillPanel(){
            var data = {
                name:this.getName(),
                iconSource:"icon_skill" + this.data.id,
                isUnlock:this.isUnlock(),
                lv:this.getSkillLevel(),
                unlockDesc:_.sprintf("%d级解锁",Conf.masterSkill[this.data.id].unlock),
                explainDesc1:this.upgradeDesc(this.dataItem.value,this.data.id),
                explainDesc2:_.sprintf("持续时间：%d秒钟 | 冷却：%d秒钟",Math.floor(this.dataItem.duration),Math.floor(this.dataItem.cd))
            };
            gm.guiLayer.addElement(new MasterSkillPanel(data));
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchBtnClick,this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        }

        onTouchBtnClick(event:egret.TouchEvent){
            if(event.target == this.btnItem){
                if(this.isUnlock()){
                    gm.dataManage.master.upgradeSkill(this.data.id);
                }
                return ;
            }
            this.masterSkillPanel();
        }

        onTouchBegin(event:egret.TouchEvent) {
            if (event.target == this.btnItem) {
            }
        }

        dataChanged() {
            super.dataChanged();
            this.initData();
            //直接更改资源
            this.setName();
            this.setIconImg();
            this.setNewTipImg();
            this.setIconDisabled();
            this.setLevel();
            this.setExplain();
            this.setBtnCost();
            this.setBtnAddDamage();
            this.setBtnText();
            this.setBtnSource();
        }

        setNewTipImg(){
            if(this.isUnlock()
                && this.dataItem.level == 0
                && this.isCostGold(this.dataItem.cost)){
                this.newTipImg.visible = true;
                if(!this.isPlayingAni){
                    this.playNewTipAni();
                    this.isPlayingAni = true;
                }
            }
            else {
                this.newTipImg.visible = false;
                this.stopNewTipAni();
                this.isPlayingAni = false;
            }
        }

        playNewTipAni(){
            this.newTipImg.scaleX = 1;
            this.newTipImg.scaleY = 1;
            var tw = egret.Tween.get(this.newTipImg,{loop:true});
            tw.to({scaleX:1.1,scaleY:1.1},300).to({scaleX:1,scaleY:1},200);
        }

        stopNewTipAni(){
            egret.Tween.removeTweens(this.newTipImg);
        }

        setIconImg(){
            this.iconImg.source = "icon_skill" + this.data.id;
        }

        setIconDisabled(){
            if(!this.isUnlock() || this.dataItem.level == 0){
                this.iconDisabled.visible = true;
            }
            else {
                this.iconDisabled.visible = false;
            }
        }

        setName(){
            this.nameLbl.text = this.getName();
        }

        setLevel(){
            this.lvLbl.text = this.dataItem.level + "";
        }

        setExplain(){
            this.explainLbl.text = this.upgradeDesc(this.dataItem.value,this.data.id);
        }

        setBtnCost(){
            if(this.isUnlock()){
                this.btnItem.iconGroup.visible = true;
                this.btnItem.iconLbl.text = Util.formatNumber(this.dataItem.cost);
            }
            else {
                this.btnItem.iconGroup.visible = false;
            }
        }

        setBtnAddDamage(){
            var text:any;
            if(this.isUnlock()){
                text = this.upgradeAddDmg(this.dataItem.nextValue,this.data.id);
            }
            else {
                text = "";
            }
            this.btnItem.upgradeLbl.text = text;
        }

        setBtnText() {
            var text:any;
            if (this.isUnlock()) {
                text = "等级提升";
            }
            else {
                text = _.sprintf("%d级解锁",Conf.masterSkill[this.data.id].unlock);
            }
            this.btnItem.textLbl.text = text;
        }

        setBtnSource(){
            var source:any;
            if(this.isUnlock()){
                source = this.isCostGold(this.dataItem.cost) ? "btn_orange":"btn_disabled";
            }
            else {
                source = "btn_disabled";
            }
            this.btnItem.setBtnSkinName(source);
        }

        public partAdded(partName: string,instance: any): void {
            super.partAdded(partName,instance);
        }

        public partRemoved(partName: string,instance: any): void {
            super.partRemoved(partName,instance);
        }
    }
}
